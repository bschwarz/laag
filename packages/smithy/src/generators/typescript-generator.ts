/**
 * TypeScript code generator for Smithy models
 * @module generators/typescript-generator
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
 * Generates TypeScript code from Smithy models
 */
export class TypeScriptGenerator {
  private indent: number;
  private includeComments: boolean;
  private includeExamples: boolean;

  constructor(options: GeneratorOptions = {}) {
    this.indent = options.indent ?? 2;
    this.includeComments = options.includeComments ?? true;
    this.includeExamples = options.includeExamples ?? false;
  }

  /**
   * Generate TypeScript code for the entire model
   */
  generate(model: SmithyModel, options?: GeneratorOptions): string {
    const opts = { ...options };
    this.indent = opts.indent ?? this.indent;
    this.includeComments = opts.includeComments ?? this.includeComments;
    this.includeExamples = opts.includeExamples ?? this.includeExamples;

    const lines: string[] = [];

    // Header comment
    if (this.includeComments) {
      lines.push('/**');
      lines.push(' * Generated TypeScript types from Smithy model');
      lines.push(` * Smithy version: ${model.smithy}`);
      lines.push(' */');
      lines.push('');
    }

    // Generate interfaces for structures
    const structures: [ShapeId, StructureShape][] = [];
    const services: [ShapeId, ServiceShape][] = [];

    for (const [shapeId, shape] of Object.entries(model.shapes)) {
      if (ShapeGuards.isStructure(shape)) {
        structures.push([shapeId, shape]);
      } else if (ShapeGuards.isService(shape)) {
        services.push([shapeId, shape]);
      }
    }

    // Generate structure interfaces
    for (const [shapeId, shape] of structures) {
      lines.push(this.generateInterface(shapeId, shape, model.shapes));
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
   * Generate a TypeScript interface for a structure shape
   */
  generateInterface(
    shapeId: ShapeId,
    shape: StructureShape,
    allShapes: Record<ShapeId, Shape>
  ): string {
    const lines: string[] = [];
    const name = this.getTypeName(shapeId);

    // Documentation comment
    if (this.includeComments) {
      const doc = this.getDocumentation(shape);
      if (doc) {
        lines.push('/**');
        lines.push(` * ${doc}`);
        lines.push(' */');
      }
    }

    // Interface declaration
    lines.push(`export interface ${name} {`);

    // Members
    if (shape.members) {
      for (const [memberName, member] of Object.entries(shape.members)) {
        const isRequired = this.isRequired(member);
        const memberType = this.getTypeScriptType(member.target, allShapes);
        const optional = isRequired ? '' : '?';

        // Member documentation
        if (this.includeComments) {
          const memberDoc = this.getDocumentation(member);
          if (memberDoc) {
            lines.push(`${this.spaces(1)}/** ${memberDoc} */`);
          }
        }

        lines.push(`${this.spaces(1)}${memberName}${optional}: ${memberType};`);
      }
    }

    lines.push('}');

    return lines.join('\n');
  }

  /**
   * Generate a TypeScript client for a service shape
   */
  generateClient(
    serviceId: ShapeId,
    service: ServiceShape,
    allShapes: Record<ShapeId, Shape>
  ): string {
    const lines: string[] = [];
    const name = this.getTypeName(serviceId);
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
    lines.push(`${this.spaces(1)}private baseUrl: string;`);
    lines.push('');
    lines.push(`${this.spaces(1)}constructor(baseUrl: string) {`);
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
    allShapes: Record<ShapeId, Shape>
  ): string {
    const lines: string[] = [];
    const methodName = this.getMethodName(operationId);
    const inputType = operation.input ? this.getTypeScriptType(operation.input, allShapes) : 'void';
    const outputType = operation.output
      ? this.getTypeScriptType(operation.output, allShapes)
      : 'void';

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
        lines.push(`${this.spaces(1)} * @param input - Operation input`);
      }
      lines.push(`${this.spaces(1)} * @returns Promise resolving to operation output`);
      lines.push(`${this.spaces(1)} */`);
    }

    // Method signature
    const inputParam = operation.input ? `input: ${inputType}` : '';
    lines.push(`${this.spaces(1)}async ${methodName}(${inputParam}): Promise<${outputType}> {`);

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
   * Get TypeScript type for a shape ID
   */
  private getTypeScriptType(shapeId: ShapeId, allShapes: Record<ShapeId, Shape>): string {
    // Handle built-in Smithy types
    const name = ShapeIdUtils.getName(shapeId);
    const namespace = ShapeIdUtils.getNamespace(shapeId);

    if (namespace === 'smithy.api') {
      switch (name) {
        case 'String':
          return 'string';
        case 'Integer':
        case 'Long':
        case 'Short':
        case 'Byte':
        case 'Float':
        case 'Double':
        case 'BigInteger':
        case 'BigDecimal':
          return 'number';
        case 'Boolean':
          return 'boolean';
        case 'Timestamp':
          return 'Date';
        case 'Blob':
          return 'Uint8Array';
        case 'Document':
          return 'unknown';
        default:
          return 'unknown';
      }
    }

    // Handle user-defined types
    const shape = allShapes[shapeId];
    if (shape) {
      if (ShapeGuards.isList(shape) || ShapeGuards.isSet(shape)) {
        const memberType = this.getTypeScriptType(shape.member.target, allShapes);
        return `${memberType}[]`;
      } else if (ShapeGuards.isMap(shape)) {
        const keyType = this.getTypeScriptType(shape.key.target, allShapes);
        const valueType = this.getTypeScriptType(shape.value.target, allShapes);
        return `Record<${keyType}, ${valueType}>`;
      }
    }

    // Return the type name
    return this.getTypeName(shapeId);
  }

  /**
   * Get a clean type name from a shape ID
   */
  private getTypeName(shapeId: ShapeId): string {
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
