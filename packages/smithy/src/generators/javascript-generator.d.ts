/**
 * JavaScript code generator for Smithy models
 * @module generators/javascript-generator
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
 * Generates JavaScript code from Smithy models
 */
export declare class JavaScriptGenerator {
  private indent;
  private includeComments;
  private includeExamples;
  private outputFormat;
  constructor(options?: GeneratorOptions);
  /**
   * Generate JavaScript code for the entire model
   */
  generate(model: SmithyModel, options?: GeneratorOptions): string;
  /**
   * Generate a JavaScript class for a structure shape
   */
  generateClass(
    shapeId: ShapeId,
    shape: StructureShape,
    _allShapes: Record<ShapeId, Shape>
  ): string;
  /**
   * Generate a JavaScript client for a service shape
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
   * Get a clean class name from a shape ID
   */
  private getClassName;
  /**
   * Get a clean method name from an operation ID
   */
  private getMethodName;
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
//# sourceMappingURL=javascript-generator.d.ts.map
