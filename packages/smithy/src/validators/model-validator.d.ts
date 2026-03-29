/**
 * Model validator for Smithy models
 * @module validators/model-validator
 */
import type { ValidationResult } from '@laag/core';
import type { SmithyModel } from '../types.js';
/**
 * Validates Smithy models according to the Smithy specification
 */
export declare class ModelValidator {
  /**
   * Validate a complete Smithy model
   * @param model - The Smithy model to validate
   * @returns Validation result with any errors found
   */
  validate(model: SmithyModel): ValidationResult;
  /**
   * Validate the Smithy version
   * @param version - The version string to validate
   * @returns Validation result
   */
  validateVersion(version: string): ValidationResult;
  /**
   * Validate model metadata
   * @param metadata - The metadata object to validate
   * @returns Validation result
   */
  validateMetadata(metadata: Record<string, unknown>): ValidationResult;
  /**
   * Validate the shapes collection
   * @param shapes - The shapes object to validate
   * @returns Validation result
   */
  validateShapes(shapes: Record<string, unknown>): ValidationResult;
  /**
   * Validate a shape ID format
   * @param shapeId - The shape ID to validate
   * @returns True if valid, false otherwise
   */
  private isValidShapeId;
}
//# sourceMappingURL=model-validator.d.ts.map
