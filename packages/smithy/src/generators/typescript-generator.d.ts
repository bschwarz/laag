/**
 * TypeScript code generator for Smithy models
 * @module generators/typescript-generator
 */
import type {
  GeneratorOptions,
  ServiceShape,
  Shape,
  ShapeId,
  SmithyModel,
  StructureShape,
} from '../types';
/**
 * Generates TypeScript code from Smithy models
 */
export declare class TypeScriptGenerator {
  private indent;
  private includeComments;
  private includeExamples;
  constructor(options?: GeneratorOptions);
  /**
   * Generate TypeScript code for the entire model
   */
  generate(model: SmithyModel, options?: GeneratorOptions): string;
  /**
   * Generate a TypeScript interface for a structure shape
   */
  generateInterface(
    shapeId: ShapeId,
    shape: StructureShape,
    allShapes: Record<ShapeId, Shape>
  ): string;
  /**
   * Generate a TypeScript client for a service shape
   */
  generateClient(
    serviceId: ShapeId,
    service: ServiceShape,
    allShapes: Record<ShapeId, Shape>
  ): string;
  /**
   * Generate a method for an operation
   */
  private generateOperationMethod;
  /**
   * Get TypeScript type for a shape ID
   */
  private getTypeScriptType;
  /**
   * Get a clean type name from a shape ID
   */
  private getTypeName;
  /**
   * Get a clean method name from an operation ID
   */
  private getMethodName;
  /**
   * Check if a member is required
   */
  private isRequired;
  /**
   * Get documentation from traits
   */
  private getDocumentation;
  /**
   * Get HTTP trait from a shape
   */
  private getHttpTrait;
  /**
   * Generate indentation spaces
   */
  private spaces;
}
//# sourceMappingURL=typescript-generator.d.ts.map
