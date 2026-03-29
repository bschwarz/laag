/**
 * @laag/raml - TypeScript library for interfacing with RAML documents
 *
 * This is a placeholder implementation for the RAML package.
 * Full implementation will be added in future releases.
 */

export { LaagBase, LaagError, ParseError, ValidationError } from '@laag/core';

/**
 * Placeholder RAML class
 * @deprecated This is a placeholder implementation
 */
export class Raml {
  constructor() {
    throw new Error('RAML implementation is not yet available. This is a placeholder package.');
  }
}

// Re-export core types for convenience
export type {
  BaseDocument,
  ErrorHandlingOptions,
  ExtensionObject,
  ValidationErrorType,
  ValidationResult,
} from '@laag/core';
