/**
 * @laag/core - Core functionality for the laag library collection.
 *
 * This package provides the foundational classes, types, and utilities that are
 * shared across all laag library packages. It includes the base class for API
 * specification implementations, error handling system, and common type definitions.
 *
 * @packageDocumentation
 * @module @laag/core
 * @version 2.0.0
 *
 * @example
 * ```typescript
 * import { LaagBase, ValidationError } from '@laag/core';
 *
 * class MyApiSpec extends LaagBase {
 *   validate() {
 *     // Implementation-specific validation
 *     return { valid: true, errors: [] };
 *   }
 * }
 * ```
 */

// Base class
export { LaagBase } from './base.js';

// Error classes
export { LaagError, NotFoundError, ParseError, ValidationError } from './errors.js';

// Type definitions
export type {
  BaseDocument,
  ErrorHandlingOptions,
  ExtensionObject,
  ValidationError as ValidationErrorType,
  ValidationResult,
} from './types.js';
