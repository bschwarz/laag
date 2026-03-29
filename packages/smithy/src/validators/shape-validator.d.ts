/**
 * Shape validator for Smithy shapes
 * @module validators/shape-validator
 */
import type { ValidationResult } from '@laag/core';
import type {
  ListShape,
  MapShape,
  OperationShape,
  ResourceShape,
  ServiceShape,
  SetShape,
  Shape,
  ShapeId,
  StructureShape,
  UnionShape,
} from '../types.js';
/**
 * Validates Smithy shapes according to the Smithy specification
 */
export declare class ShapeValidator {
  private shapeIds;
  /**
   * Create a new ShapeValidator
   * @param shapeIds - Set of all valid shape IDs in the model (for reference validation)
   */
  constructor(shapeIds?: Set<ShapeId>);
  /**
   * Validate a shape
   * @param shapeId - The shape ID
   * @param shape - The shape to validate
   * @returns Validation result
   */
  validate(shapeId: ShapeId, shape: Shape): ValidationResult;
  /**
   * Validate a structure shape
   * @param shapeId - The shape ID
   * @param shape - The structure shape
   * @returns Validation result
   */
  validateStructure(shapeId: ShapeId, shape: StructureShape): ValidationResult;
  /**
   * Validate a service shape
   * @param shapeId - The shape ID
   * @param shape - The service shape
   * @returns Validation result
   */
  validateService(shapeId: ShapeId, shape: ServiceShape): ValidationResult;
  /**
   * Validate an operation shape
   * @param shapeId - The shape ID
   * @param shape - The operation shape
   * @returns Validation result
   */
  validateOperation(shapeId: ShapeId, shape: OperationShape): ValidationResult;
  /**
   * Validate a resource shape
   * @param shapeId - The shape ID
   * @param shape - The resource shape
   * @returns Validation result
   */
  validateResource(shapeId: ShapeId, shape: ResourceShape): ValidationResult;
  /**
   * Validate a union shape
   * @param shapeId - The shape ID
   * @param shape - The union shape
   * @returns Validation result
   */
  validateUnion(shapeId: ShapeId, shape: UnionShape): ValidationResult;
  /**
   * Validate a list shape
   * @param shapeId - The shape ID
   * @param shape - The list shape
   * @returns Validation result
   */
  validateList(shapeId: ShapeId, shape: ListShape): ValidationResult;
  /**
   * Validate a set shape
   * @param shapeId - The shape ID
   * @param shape - The set shape
   * @returns Validation result
   */
  validateSet(shapeId: ShapeId, shape: SetShape): ValidationResult;
  /**
   * Validate a map shape
   * @param shapeId - The shape ID
   * @param shape - The map shape
   * @returns Validation result
   */
  validateMap(shapeId: ShapeId, shape: MapShape): ValidationResult;
  /**
   * Validate a member shape
   * @param shapeId - The parent shape ID
   * @param memberName - The member name
   * @param member - The member shape
   * @returns Validation result
   */
  private validateMember;
  /**
   * Validate a shape reference
   * @param shapeId - The parent shape ID
   * @param field - The field name
   * @param reference - The shape reference
   * @returns Validation result
   */
  private validateShapeReference;
  /**
   * Validate an array of shape references
   * @param shapeId - The parent shape ID
   * @param field - The field name
   * @param references - The array of shape references
   * @returns Validation result
   */
  private validateShapeReferenceArray;
  /**
   * Validate a map of shape references
   * @param shapeId - The parent shape ID
   * @param field - The field name
   * @param references - The map of shape references
   * @returns Validation result
   */
  private validateShapeReferenceMap;
}
//# sourceMappingURL=shape-validator.d.ts.map
