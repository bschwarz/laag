/**
 * Python code generator for Smithy models
 * @module generators/python-generator
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
 * Generates Python code from Smithy models
 */
export declare class PythonGenerator {
  private indent;
  private includeComments;
  private includeExamples;
  constructor(options?: GeneratorOptions);
  /**
   * Generate Python code for the entire model
   */
  generate(model: SmithyModel, options?: GeneratorOptions): string;
  /**
   * Generate a Python class for a structure shape
   */
  generateClass(shapeId: ShapeId, shape: StructureShape, allShapes: Record<ShapeId, Shape>): string;
  /**
   * Generate a Python client for a service shape
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
   * Get Python type for a shape ID
   */
  private getPythonType;
  /**
   * Get a clean class name from a shape ID
   */
  private getClassName;
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
//# sourceMappingURL=python-generator.d.ts.map
