/**
 * Core package exports for the laag library collection
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
