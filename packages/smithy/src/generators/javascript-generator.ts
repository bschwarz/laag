/**
 * JavaScript code generator for Smithy models
 * @module generators/javascript-generator
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
 * Generates JavaScript code from Smithy models
 */
export class JavaScriptGenerator {
  private indent: number;
  private includeComments: boolean;
  private includeExamples: boolean;
  private outputFormat: 'module' | 'class' | 'functional';

  constructor(options: GeneratorOptions = {}) {
    this.indent = options.indent ?? 2;
    this.includeComments = options.includeComments ?? true;
    this.includeExamples = options.includeExamples ?? false;
    this.outputFormat = options.outputFormat ?? 'class';
  }

  /**
   * Generate JavaScript code for the entire model
   */
  generate(model: SmithyModel, options?: GeneratorOptions): string {
    const opts = { ...options };
    this.indent = opts.indent ?? this.indent;
    this.includeComments = opts.includeComments ?? this.includeComments;
    this.includeExamples = opts.includeExamples ?? this.includeExamples;
    this.outputFormat = opts.outputFormat ?? this.outputFormat;

    const lines: string[] = [];

    // Header comment
    if (this.includeComments) {
      lines.push('/**');
      lines.push(' * Generated JavaScript code from Smithy model');
      lines.push(` * Smithy version: ${model.smithy}`);
      lines.push(' */');
      lines.push('');
    }

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
   * Generate a JavaScript class for a structure shape
   */
  generateClass(
    shapeId: ShapeId,
    shape: StructureShape,
    _allShapes: Record<ShapeId, Shape>
  ): string {
    const lines: string[] = [];
    const name = this.getClassName(shapeId);

    // Documentation comment
    if (this.includeComments) {
      const doc = this.getDocumentation(shape);
      lines.push('/**');
      lines.push(` * ${name} class`);
      if (doc) {
        lines.push(` * ${doc}`);
      }
      lines.push(' */');
    }

    // Class declaration
    lines.push(`export class ${name} {`);

    // Constructor
    if (this.includeComments) {
      lines.push(`${this.spaces(1)}/**`);
      lines.push(`${this.spaces(1)} * Create a new ${name} instance`);
      if (shape.members) {
        for (const [memberName, member] of Object.entries(shape.members)) {
          const memberDoc = this.getDocumentation(member);
          const paramDoc = memberDoc ?? memberName;
          lines.push(`${this.spaces(1)} * @param {*} ${memberName} - ${paramDoc}`);
        }
      }
      lines.push(`${this.spaces(1)} */`);
    }

    const params = shape.members ? Object.keys(shape.members).join(', ') : '';
    lines.push(`${this.spaces(1)}constructor(${params}) {`);

    if (shape.members) {
      for (const memberName of Object.keys(shape.members)) {
        lines.push(`${this.spaces(2)}this.${memberName} = ${memberName};`);
      }
    }

    lines.push(`${this.spaces(1)}}`);

    // toJSON method
    lines.push('');
    if (this.includeComments) {
      lines.push(`${this.spaces(1)}/**`);
      lines.push(`${this.spaces(1)} * Convert to JSON object`);
      lines.push(`${this.spaces(1)} * @returns {Object} JSON representation`);
      lines.push(`${this.spaces(1)} */`);
    }
    lines.push(`${this.spaces(1)}toJSON() {`);
    lines.push(`${this.spaces(2)}return {`);

    if (shape.members) {
      const memberNames = Object.keys(shape.members);
      for (let i = 0; i < memberNames.length; i++) {
        const memberName = memberNames[i];
        const comma = i < memberNames.length - 1 ? ',' : '';
        lines.push(`${this.spaces(3)}${memberName}: this.${memberName}${comma}`);
      }
    }

    lines.push(`${this.spaces(2)}};`);
    lines.push(`${this.spaces(1)}}`);

    lines.push('}');

    return lines.join('\n');
  }

  /**
   * Generate a JavaScript client for a service shape
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
      lines.push('/**');
      lines.push(` * Client for ${name} service`);
      if (doc) {
        lines.push(` * ${doc}`);
      }
      lines.push(` * @version ${service.version}`);
      lines.push(' */');
    }

    // Client class
    lines.push(`export class ${clientName} {`);

    // Constructor
    if (this.includeComments) {
      lines.push(`${this.spaces(1)}/**`);
      lines.push(`${this.spaces(1)} * Create a new ${clientName} instance`);
      lines.push(`${this.spaces(1)} * @param {string} baseUrl - Base URL for the service`);
      lines.push(`${this.spaces(1)} */`);
    }
    lines.push(`${this.spaces(1)}constructor(baseUrl) {`);
    lines.push(`${this.spaces(2)}this.baseUrl = baseUrl;`);
    lines.push(`${this.spaces(1)}}`);

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

    lines.push('}');

    return lines.join('\n');
  }

  /**
   * Generate a method for an operation
   */
  private generateOperationMethod(
    operationId: ShapeId,
    operation: OperationShape,
    _allShapes: Record<ShapeId, Shape>
  ): string {
    const lines: string[] = [];
    const methodName = this.getMethodName(operationId);

    // Method documentation
    if (this.includeComments) {
      const doc = this.getDocumentation(operation);
      lines.push(`${this.spaces(1)}/**`);
      if (doc) {
        lines.push(`${this.spaces(1)} * ${doc}`);
      } else {
        lines.push(`${this.spaces(1)} * ${methodName} operation`);
      }
      if (operation.input) {
        lines.push(`${this.spaces(1)} * @param {Object} input - Operation input`);
      }
      lines.push(
        `${this.spaces(1)} * @returns {Promise<Object>} Promise resolving to operation output`
      );
      lines.push(`${this.spaces(1)} */`);
    }

    // Method signature
    const inputParam = operation.input ? 'input' : '';
    lines.push(`${this.spaces(1)}async ${methodName}(${inputParam}) {`);

    // Method body
    const httpTrait = this.getHttpTrait(operation);
    if (httpTrait) {
      const { method, uri } = httpTrait;
      lines.push(`${this.spaces(2)}const url = \`\${this.baseUrl}${uri}\`;`);
      lines.push(`${this.spaces(2)}const response = await fetch(url, {`);
      lines.push(`${this.spaces(3)}method: '${method}',`);
      if (operation.input && method !== 'GET') {
        lines.push(`${this.spaces(3)}headers: { 'Content-Type': 'application/json' },`);
        lines.push(`${this.spaces(3)}body: JSON.stringify(input),`);
      }
      lines.push(`${this.spaces(2)}});`);
      lines.push(`${this.spaces(2)}if (!response.ok) {`);
      lines.push(`${this.spaces(3)}throw new Error(\`HTTP error! status: \${response.status}\`);`);
      lines.push(`${this.spaces(2)}}`);
      if (operation.output) {
        lines.push(`${this.spaces(2)}return await response.json();`);
      } else {
        lines.push(`${this.spaces(2)}return;`);
      }
    } else {
      lines.push(`${this.spaces(2)}throw new Error('Operation not implemented');`);
    }

    lines.push(`${this.spaces(1)}}`);

    return lines.join('\n');
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
    // Convert PascalCase to camelCase
    return name.charAt(0).toLowerCase() + name.slice(1);
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
