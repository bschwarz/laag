/**
 * Trait validator for Smithy traits
 * @module validators/trait-validator
 */

import type { ValidationResult } from '@laag/core';
import type { HttpTrait, PaginatedTrait } from '../types.js';
import { SMITHY_TRAITS } from '../types.js';

/**
 * Validates Smithy traits according to the Smithy specification
 */
export class TraitValidator {
  /**
   * Validate a trait application
   * @param traitId - The trait ID
   * @param value - The trait value
   * @returns Validation result
   */
  validate(traitId: string, value: unknown): ValidationResult {
    const errors: Array<{ path: string; message: string; code: string }> = [];

    // Validate trait ID format
    if (!traitId || typeof traitId !== 'string') {
      errors.push({
        path: 'trait',
        message: 'Trait ID must be a non-empty string',
        code: 'INVALID_TRAIT_ID',
      });
      return { valid: false, errors };
    }

    // Validate standard traits
    let result: ValidationResult;
    switch (traitId) {
      case SMITHY_TRAITS.HTTP:
        result = this.validateHttpTrait(value);
        break;
      case SMITHY_TRAITS.HTTP_ERROR:
        result = this.validateHttpErrorTrait(value);
        break;
      case SMITHY_TRAITS.HTTP_QUERY:
        result = this.validateHttpQueryTrait(value);
        break;
      case SMITHY_TRAITS.HTTP_HEADER:
        result = this.validateHttpHeaderTrait(value);
        break;
      case SMITHY_TRAITS.REQUIRED:
        result = this.validateRequiredTrait(value);
        break;
      case SMITHY_TRAITS.DOCUMENTATION:
        result = this.validateDocumentationTrait(value);
        break;
      case SMITHY_TRAITS.PAGINATED:
        result = this.validatePaginatedTrait(value);
        break;
      case SMITHY_TRAITS.HTTP_LABEL:
      case SMITHY_TRAITS.HTTP_PAYLOAD:
      case SMITHY_TRAITS.READONLY:
      case SMITHY_TRAITS.IDEMPOTENT:
        // These traits are marker traits (empty objects)
        result = this.validateMarkerTrait(value);
        break;
      default:
        // Custom trait - basic validation only
        result = this.validateCustomTrait(value);
    }

    if (!result.valid) {
      errors.push(...result.errors);
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate HTTP trait
   * @param value - The trait value
   * @returns Validation result
   */
  validateHttpTrait(value: unknown): ValidationResult {
    const errors: Array<{ path: string; message: string; code: string }> = [];

    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
      errors.push({
        path: SMITHY_TRAITS.HTTP,
        message: 'HTTP trait must be an object',
        code: 'INVALID_HTTP_TRAIT_TYPE',
      });
      return { valid: false, errors };
    }

    const httpTrait = value as Partial<HttpTrait>;

    // Validate method is required
    if (!httpTrait.method) {
      errors.push({
        path: `${SMITHY_TRAITS.HTTP}.method`,
        message: 'HTTP method is required',
        code: 'MISSING_HTTP_METHOD',
      });
    } else if (typeof httpTrait.method !== 'string') {
      errors.push({
        path: `${SMITHY_TRAITS.HTTP}.method`,
        message: 'HTTP method must be a string',
        code: 'INVALID_HTTP_METHOD_TYPE',
      });
    } else {
      // Validate method is a valid HTTP method
      const validMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'];
      if (!validMethods.includes(httpTrait.method.toUpperCase())) {
        errors.push({
          path: `${SMITHY_TRAITS.HTTP}.method`,
          message: `Invalid HTTP method: "${httpTrait.method}". Must be one of: ${validMethods.join(', ')}`,
          code: 'INVALID_HTTP_METHOD',
        });
      }
    }

    // Validate uri is required
    if (!httpTrait.uri) {
      errors.push({
        path: `${SMITHY_TRAITS.HTTP}.uri`,
        message: 'HTTP URI is required',
        code: 'MISSING_HTTP_URI',
      });
    } else if (typeof httpTrait.uri !== 'string') {
      errors.push({
        path: `${SMITHY_TRAITS.HTTP}.uri`,
        message: 'HTTP URI must be a string',
        code: 'INVALID_HTTP_URI_TYPE',
      });
    } else if (!httpTrait.uri.startsWith('/')) {
      errors.push({
        path: `${SMITHY_TRAITS.HTTP}.uri`,
        message: 'HTTP URI must start with "/"',
        code: 'INVALID_HTTP_URI_FORMAT',
      });
    }

    // Validate code if present
    if (httpTrait.code !== undefined) {
      if (typeof httpTrait.code !== 'number') {
        errors.push({
          path: `${SMITHY_TRAITS.HTTP}.code`,
          message: 'HTTP code must be a number',
          code: 'INVALID_HTTP_CODE_TYPE',
        });
      } else if (httpTrait.code < 100 || httpTrait.code > 599) {
        errors.push({
          path: `${SMITHY_TRAITS.HTTP}.code`,
          message: 'HTTP code must be between 100 and 599',
          code: 'INVALID_HTTP_CODE_RANGE',
        });
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate HTTP error trait
   * @param value - The trait value
   * @returns Validation result
   */
  validateHttpErrorTrait(value: unknown): ValidationResult {
    const errors: Array<{ path: string; message: string; code: string }> = [];

    if (typeof value !== 'number') {
      errors.push({
        path: SMITHY_TRAITS.HTTP_ERROR,
        message: 'HTTP error trait must be a number',
        code: 'INVALID_HTTP_ERROR_TYPE',
      });
      return { valid: false, errors };
    }

    if (value < 400 || value > 599) {
      errors.push({
        path: SMITHY_TRAITS.HTTP_ERROR,
        message: 'HTTP error code must be between 400 and 599',
        code: 'INVALID_HTTP_ERROR_RANGE',
      });
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate HTTP query trait
   * @param value - The trait value
   * @returns Validation result
   */
  validateHttpQueryTrait(value: unknown): ValidationResult {
    const errors: Array<{ path: string; message: string; code: string }> = [];

    if (typeof value !== 'string') {
      errors.push({
        path: SMITHY_TRAITS.HTTP_QUERY,
        message: 'HTTP query trait must be a string',
        code: 'INVALID_HTTP_QUERY_TYPE',
      });
      return { valid: false, errors };
    }

    if (value.length === 0) {
      errors.push({
        path: SMITHY_TRAITS.HTTP_QUERY,
        message: 'HTTP query parameter name cannot be empty',
        code: 'EMPTY_HTTP_QUERY',
      });
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate HTTP header trait
   * @param value - The trait value
   * @returns Validation result
   */
  validateHttpHeaderTrait(value: unknown): ValidationResult {
    const errors: Array<{ path: string; message: string; code: string }> = [];

    if (typeof value !== 'string') {
      errors.push({
        path: SMITHY_TRAITS.HTTP_HEADER,
        message: 'HTTP header trait must be a string',
        code: 'INVALID_HTTP_HEADER_TYPE',
      });
      return { valid: false, errors };
    }

    if (value.length === 0) {
      errors.push({
        path: SMITHY_TRAITS.HTTP_HEADER,
        message: 'HTTP header name cannot be empty',
        code: 'EMPTY_HTTP_HEADER',
      });
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate required trait
   * @param value - The trait value
   * @returns Validation result
   */
  validateRequiredTrait(value: unknown): ValidationResult {
    const errors: Array<{ path: string; message: string; code: string }> = [];

    // Required trait should be an empty object or undefined
    if (
      value !== undefined &&
      (typeof value !== 'object' || value === null || Array.isArray(value))
    ) {
      errors.push({
        path: SMITHY_TRAITS.REQUIRED,
        message: 'Required trait must be an empty object',
        code: 'INVALID_REQUIRED_TRAIT',
      });
      return { valid: false, errors };
    }

    // If it's an object, it should be empty
    if (value !== undefined && typeof value === 'object' && Object.keys(value).length > 0) {
      errors.push({
        path: SMITHY_TRAITS.REQUIRED,
        message: 'Required trait must be an empty object',
        code: 'INVALID_REQUIRED_TRAIT',
      });
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate documentation trait
   * @param value - The trait value
   * @returns Validation result
   */
  validateDocumentationTrait(value: unknown): ValidationResult {
    const errors: Array<{ path: string; message: string; code: string }> = [];

    if (typeof value !== 'string') {
      errors.push({
        path: SMITHY_TRAITS.DOCUMENTATION,
        message: 'Documentation trait must be a string',
        code: 'INVALID_DOCUMENTATION_TYPE',
      });
      return { valid: false, errors };
    }

    if (value.length === 0) {
      errors.push({
        path: SMITHY_TRAITS.DOCUMENTATION,
        message: 'Documentation cannot be empty',
        code: 'EMPTY_DOCUMENTATION',
      });
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate paginated trait
   * @param value - The trait value
   * @returns Validation result
   */
  validatePaginatedTrait(value: unknown): ValidationResult {
    const errors: Array<{ path: string; message: string; code: string }> = [];

    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
      errors.push({
        path: SMITHY_TRAITS.PAGINATED,
        message: 'Paginated trait must be an object',
        code: 'INVALID_PAGINATED_TRAIT_TYPE',
      });
      return { valid: false, errors };
    }

    const paginated = value as Partial<PaginatedTrait>;

    // Validate optional string fields
    const stringFields = ['inputToken', 'outputToken', 'items', 'pageSize'] as const;
    for (const field of stringFields) {
      if (paginated[field] !== undefined && typeof paginated[field] !== 'string') {
        errors.push({
          path: `${SMITHY_TRAITS.PAGINATED}.${field}`,
          message: `Paginated ${field} must be a string`,
          code: 'INVALID_PAGINATED_FIELD_TYPE',
        });
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate marker trait (empty object)
   * @param value - The trait value
   * @returns Validation result
   */
  validateMarkerTrait(value: unknown): ValidationResult {
    const errors: Array<{ path: string; message: string; code: string }> = [];

    // Marker traits should be empty objects or undefined
    if (
      value !== undefined &&
      (typeof value !== 'object' || value === null || Array.isArray(value))
    ) {
      errors.push({
        path: 'trait',
        message: 'Marker trait must be an empty object',
        code: 'INVALID_MARKER_TRAIT',
      });
      return { valid: false, errors };
    }

    // If it's an object, it should be empty
    if (value !== undefined && typeof value === 'object' && Object.keys(value).length > 0) {
      errors.push({
        path: 'trait',
        message: 'Marker trait must be an empty object',
        code: 'INVALID_MARKER_TRAIT',
      });
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

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
  validateCustomTrait(value: unknown): ValidationResult {
    const errors: Array<{ path: string; message: string; code: string }> = [];

    // Check for non-serializable types
    const checkResult = this.checkJsonSerializable(value);
    if (!checkResult.valid) {
      errors.push(...checkResult.errors);
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Check if a value is JSON-serializable
   * @param value - The value to check
   * @param path - The current path (for nested objects)
   * @returns Validation result
   */
  private checkJsonSerializable(value: unknown, path: string = 'trait'): ValidationResult {
    const errors: Array<{ path: string; message: string; code: string }> = [];

    // Reject functions
    if (typeof value === 'function') {
      errors.push({
        path,
        message: 'Custom trait value cannot be a function',
        code: 'INVALID_CUSTOM_TRAIT_TYPE',
      });
      return { valid: false, errors };
    }

    // Reject symbols
    if (typeof value === 'symbol') {
      errors.push({
        path,
        message: 'Custom trait value cannot be a symbol',
        code: 'INVALID_CUSTOM_TRAIT_TYPE',
      });
      return { valid: false, errors };
    }

    // Check for circular references
    try {
      if (value !== undefined) {
        JSON.stringify(value);
      }
    } catch {
      errors.push({
        path,
        message: 'Custom trait value must be JSON-serializable (no circular references)',
        code: 'INVALID_CUSTOM_TRAIT_VALUE',
      });
      return { valid: false, errors };
    }

    // Recursively check objects and arrays
    if (value !== null && typeof value === 'object') {
      if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          const itemResult = this.checkJsonSerializable(value[i], `${path}[${i}]`);
          if (!itemResult.valid) {
            errors.push(...itemResult.errors);
          }
        }
      } else {
        for (const [key, val] of Object.entries(value)) {
          const propResult = this.checkJsonSerializable(val, `${path}.${key}`);
          if (!propResult.valid) {
            errors.push(...propResult.errors);
          }
        }
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}
