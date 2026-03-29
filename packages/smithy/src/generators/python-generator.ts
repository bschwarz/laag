/**
 * Python code generator for Smithy models
 * @module generators/python-generator
 */

import type {
  GeneratorOptions,
  MemberShape,
  OperationShape,
  ServiceShape,
  Shape,
  ShapeId,
  SmithyModel,
  StructureShape,
} from '../types';
import { ShapeGuards, ShapeIdUtils } from '../types';

/**
 * Generates Python code from Smithy models
 */
export class PythonGenerator {
  private indent: number;
  private includeComments: boolean;
  private includeExamples: boolean;

  constructor(options: GeneratorOptions = {}) {
    this.indent = options.indent ?? 4;
    this.includeComments = options.includeComments ?? true;
    this.includeExamples = options.includeExamples ?? false;
  }

  /**
   * Generate Python code for the entire model
   */
  generate(model: SmithyModel, options?: GeneratorOptions): string {
    const opts = { ...options };
    this.indent = opts.indent ?? this.indent;
    this.includeComments = opts.includeComments ?? this.includeComments;
    this.includeExamples = opts.includeExamples ?? this.includeExamples;

    const lines: string[] = [];

    // Header comment
    if (this.includeComments) {
      lines.push('"""');
      lines.push('Generated Python code from Smithy model');
      lines.push(`Smithy version: ${model.smithy}`);
      lines.push('"""');
      lines.push('');
    }

    // Imports
    lines.push('from typing import Optional, Dict, Any, List');
    lines.push('from dataclasses import dataclass');
    lines.push('import json');
    lines.push('import requests');
    lines.push('');

    // Generate classes for structures
    const structures: [ShapeId, StructureShape][] = [];
    const services: [ShapeId, ServiceShape][] = [];

    for (const [shapeId, shape] of Object.entries(model.shapes)) {
      if (ShapeGuards.isStructure(shape)) {
        structures.push([shapeId, shape]);
      } else if (ShapeGuards.isService(shape)) {
        services.push([shapeId, shape]);
      }
    }

    // Generate structure classes
    for (const [shapeId, shape] of structures) {
      lines.push(this.generateClass(shapeId, shape, model.shapes));
      lines.push('');
    }

    // Generate service clients
    for (const [shapeId, shape] of services) {
      lines.push(this.generateClient(shapeId, shape, model.shapes));
      lines.push('');
    }

    return lines.join('\n');
  }

  /**
   * Generate a Python class for a structure shape
   */
  generateClass(
    shapeId: ShapeId,
    shape: StructureShape,
    allShapes: Record<ShapeId, Shape>
  ): string {
    const lines: string[] = [];
    const name = this.getClassName(shapeId);

    // Documentation comment
    if (this.includeComments) {
      const doc = this.getDocumentation(shape);
      if (doc) {
        lines.push(`"""${doc}"""`);
      }
    }

    // Class declaration with dataclass decorator
    lines.push('@dataclass');
    lines.push(`class ${name}:`);

    // Docstring
    if (this.includeComments) {
      const doc = this.getDocumentation(shape);
      if (doc) {
        lines.push(`${this.spaces(1)}"""${doc}"""`);
      } else {
        lines.push(`${this.spaces(1)}"""${name} data class"""`);
      }
    }

    // Members
    if (shape.members && Object.keys(shape.members).length > 0) {
      for (const [memberName, member] of Object.entries(shape.members)) {
        const isRequired = this.isRequired(member);
        const pythonType = this.getPythonType(member.target, allShapes);
        const typeAnnotation = isRequired ? pythonType : `Optional[${pythonType}]`;
        const defaultValue = isRequired ? '' : ' = None';

        // Member documentation
        if (this.includeComments) {
          const memberDoc = this.getDocumentation(member);
          if (memberDoc) {
            lines.push(`${this.spaces(1)}# ${memberDoc}`);
          }
        }

        lines.push(`${this.spaces(1)}${memberName}: ${typeAnnotation}${defaultValue}`);
      }
    } else {
      // Empty class needs pass statement
      lines.push(`${this.spaces(1)}pass`);
    }

    return lines.join('\n');
  }

  /**
   * Generate a Python client for a service shape
   */
  generateClient(
    serviceId: ShapeId,
    service: ServiceShape,
    allShapes: Record<ShapeId, Shape>
  ): string {
    const lines: string[] = [];
    const name = this.getClassName(serviceId);
    const clientName = `${name}Client`;

    // Documentation comment
    if (this.includeComments) {
      const doc = this.getDocumentation(service);
      lines.push('"""');
      lines.push(`Client for ${name} service`);
      if (doc) {
        lines.push(doc);
      }
      lines.push(`Version: ${service.version}`);
      lines.push('"""');
    }

    // Client class
    lines.push(`class ${clientName}:`);

    // Docstring
    if (this.includeComments) {
      const doc = this.getDocumentation(service);
      lines.push(`${this.spaces(1)}"""${doc ?? `Client for ${name} service`}"""`);
      lines.push('');
    }

    // Constructor
    lines.push(`${this.spaces(1)}def __init__(self, base_url: str):`);
    if (this.includeComments) {
      lines.push(`${this.spaces(2)}"""Initialize the client with a base URL"""`);
    }
    lines.push(`${this.spaces(2)}self.base_url = base_url`);

    // Generate methods for operations
    if (service.operations) {
      for (const operationId of service.operations) {
        const operation = allShapes[operationId];
        if (operation && ShapeGuards.isOperation(operation)) {
          lines.push('');
          lines.push(this.generateOperationMethod(operationId, operation, allShapes));
        }
      }
    }

    return lines.join('\n');
  }

  /**
   * Generate a method for an operation
   */
  private generateOperationMethod(
    operationId: ShapeId,
    operation: OperationShape,
    allShapes: Record<ShapeId, Shape>
  ): string {
    const lines: string[] = [];
    const methodName = this.getMethodName(operationId);
    const inputType = operation.input ? this.getPythonType(operation.input, allShapes) : 'None';
    const outputType = operation.output ? this.getPythonType(operation.output, allShapes) : 'None';

    // Method signature
    const inputParam = operation.input ? `input: ${inputType}` : '';
    const params = inputParam ? `self, ${inputParam}` : 'self';
    lines.push(`${this.spaces(1)}def ${methodName}(${params}) -> ${outputType}:`);

    // Method docstring
    if (this.includeComments) {
      const doc = this.getDocumentation(operation);
      lines.push(`${this.spaces(2)}"""`);
      if (doc) {
        lines.push(`${this.spaces(2)}${doc}`);
      } else {
        lines.push(`${this.spaces(2)}${methodName} operation`);
      }
      if (operation.input) {
        lines.push(`${this.spaces(2)}`);
        lines.push(`${this.spaces(2)}Args:`);
        lines.push(`${this.spaces(3)}input: Operation input`);
      }
      lines.push(`${this.spaces(2)}`);
      lines.push(`${this.spaces(2)}Returns:`);
      lines.push(`${this.spaces(3)}Operation output`);
      lines.push(`${this.spaces(2)}"""`);
    }

    // Method body
    const httpTrait = this.getHttpTrait(operation);
    if (httpTrait) {
      const { method, uri } = httpTrait;
      lines.push(`${this.spaces(2)}url = f"{self.base_url}${uri}"`);

      if (operation.input && method !== 'GET') {
        lines.push(`${this.spaces(2)}response = requests.${method.toLowerCase()}(`);
        lines.push(`${this.spaces(3)}url,`);
        lines.push(
          `${this.spaces(3)}json=input.__dict__ if hasattr(input, '__dict__') else input,`
        );
        lines.push(`${this.spaces(3)}headers={'Content-Type': 'application/json'}`);
        lines.push(`${this.spaces(2)})`);
      } else {
        lines.push(`${this.spaces(2)}response = requests.${method.toLowerCase()}(url)`);
      }

      lines.push(`${this.spaces(2)}response.raise_for_status()`);

      if (operation.output) {
        const outputTypeName = this.getClassName(operation.output);
        lines.push(`${this.spaces(2)}data = response.json()`);
        lines.push(`${this.spaces(2)}return ${outputTypeName}(**data)`);
      } else {
        lines.push(`${this.spaces(2)}return None`);
      }
    } else {
      lines.push(`${this.spaces(2)}raise NotImplementedError('Operation not implemented')`);
    }

    return lines.join('\n');
  }

  /**
   * Get Python type for a shape ID
   */
  private getPythonType(shapeId: ShapeId, allShapes: Record<ShapeId, Shape>): string {
    // Handle built-in Smithy types
    const name = ShapeIdUtils.getName(shapeId);
    const namespace = ShapeIdUtils.getNamespace(shapeId);

    if (namespace === 'smithy.api') {
      switch (name) {
        case 'String':
          return 'str';
        case 'Integer':
        case 'Long':
        case 'Short':
        case 'Byte':
          return 'int';
        case 'Float':
        case 'Double':
        case 'BigDecimal':
          return 'float';
        case 'BigInteger':
          return 'int';
        case 'Boolean':
          return 'bool';
        case 'Timestamp':
          return 'str';
        case 'Blob':
          return 'bytes';
        case 'Document':
          return 'Any';
        default:
          return 'Any';
      }
    }

    // Handle user-defined types
    const shape = allShapes[shapeId];
    if (shape) {
      if (ShapeGuards.isList(shape) || ShapeGuards.isSet(shape)) {
        const memberType = this.getPythonType(shape.member.target, allShapes);
        return `List[${memberType}]`;
      } else if (ShapeGuards.isMap(shape)) {
        const keyType = this.getPythonType(shape.key.target, allShapes);
        const valueType = this.getPythonType(shape.value.target, allShapes);
        return `Dict[${keyType}, ${valueType}]`;
      }
    }

    // Return the class name
    return this.getClassName(shapeId);
  }

  /**
   * Get a clean class name from a shape ID
   */
  private getClassName(shapeId: ShapeId): string {
    return ShapeIdUtils.getName(shapeId);
  }

  /**
   * Get a clean method name from an operation ID
   */
  private getMethodName(operationId: ShapeId): string {
    const name = ShapeIdUtils.getName(operationId);
    // Convert PascalCase to snake_case
    return name.replace(/([A-Z])/g, (match, p1, offset) => {
      return offset > 0 ? `_${p1.toLowerCase()}` : p1.toLowerCase();
    });
  }

  /**
   * Check if a member is required
   */
  private isRequired(member: MemberShape): boolean {
    return member.traits?.['smithy.api#required'] !== undefined;
  }

  /**
   * Get documentation from traits
   */
  private getDocumentation(shape: Shape | MemberShape): string | undefined {
    const traits = 'traits' in shape ? shape.traits : undefined;
    const doc = traits?.['smithy.api#documentation'];
    return typeof doc === 'string' ? doc : undefined;
  }

  /**
   * Get HTTP trait from a shape
   */
  private getHttpTrait(shape: Shape): { method: string; uri: string; code?: number } | undefined {
    const httpTrait = shape.traits?.['smithy.api#http'];
    if (httpTrait && typeof httpTrait === 'object' && httpTrait !== null) {
      const trait = httpTrait as Record<string, unknown>;
      if (typeof trait.method === 'string' && typeof trait.uri === 'string') {
        return {
          method: trait.method,
          uri: trait.uri,
          code: typeof trait.code === 'number' ? trait.code : undefined,
        };
      }
    }
    return undefined;
  }

  /**
   * Generate indentation spaces
   */
  private spaces(level: number): string {
    return ' '.repeat(this.indent * level);
  }
}
