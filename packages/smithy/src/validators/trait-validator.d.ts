/**
 * Trait validator for Smithy traits
 * @module validators/trait-validator
 */
import type { ValidationResult } from '@laag/core';
/**
 * Validates Smithy traits according to the Smithy specification
 */
export declare class TraitValidator {
  /**
   * Validate a trait application
   * @param traitId - The trait ID
   * @param value - The trait value
   * @returns Validation result
   */
  validate(traitId: string, value: unknown): ValidationResult;
  /**
   * Validate HTTP trait
   * @param value - The trait value
   * @returns Validation result
   */
  validateHttpTrait(value: unknown): ValidationResult;
  /**
   * Validate HTTP error trait
   * @param value - The trait value
   * @returns Validation result
   */
  validateHttpErrorTrait(value: unknown): ValidationResult;
  /**
   * Validate HTTP query trait
   * @param value - The trait value
   * @returns Validation result
   */
  validateHttpQueryTrait(value: unknown): ValidationResult;
  /**
   * Validate HTTP header trait
   * @param value - The trait value
   * @returns Validation result
   */
  validateHttpHeaderTrait(value: unknown): ValidationResult;
  /**
   * Validate required trait
   * @param value - The trait value
   * @returns Validation result
   */
  validateRequiredTrait(value: unknown): ValidationResult;
  /**
   * Validate documentation trait
   * @param value - The trait value
   * @returns Validation result
   */
  validateDocumentationTrait(value: unknown): ValidationResult;
  /**
   * Validate paginated trait
   * @param value - The trait value
   * @returns Validation result
   */
  validatePaginatedTrait(value: unknown): ValidationResult;
  /**
   * Validate marker trait (empty object)
   * @param value - The trait value
   * @returns Validation result
   */
  validateMarkerTrait(value: unknown): ValidationResult;
  /**
   * Validate custom trait
   * @param value - The trait value
   * @returns Validation result
   *
   * Custom traits can have any JSON-serializable value. This method performs
   * basic structural validation to ensure the trait value is valid.
   *
   * In a production implementation, you would validate against trait shape
   * definitions from the model, but for now we ensure the value is at least
   * a valid JSON-serializable type.
   */
  validateCustomTrait(value: unknown): ValidationResult;
  /**
   * Check if a value is JSON-serializable
   * @param value - The value to check
   * @param path - The current path (for nested objects)
   * @returns Validation result
   */
  private checkJsonSerializable;
}
//# sourceMappingURL=trait-validator.d.ts.map
