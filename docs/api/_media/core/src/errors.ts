/**
 * Error handling system for the laag library collection.
 *
 * @fileoverview This module provides a comprehensive error handling system with
 * typed error classes, context information, and configurable error formatting.
 * All errors in the laag library collection extend from these base classes.
 *
 * @module @laag/core/errors
 * @since 2.0.0
 */

import { ErrorHandlingOptions } from './types.js';

/**
 * Base error class for all laag library errors.
 *
 * This class extends the native JavaScript Error class with additional properties
 * for error codes, path information, and contextual data. It provides the foundation
 * for all error types in the laag library collection.
 *
 * @class LaagError
 * @extends Error
 * @since 2.0.0
 *
 * @example
 * ```typescript
 * import { LaagError } from '@laag/core';
 *
 * throw new LaagError(
 *   'Something went wrong',
 *   'CUSTOM_ERROR',
 *   'path.to.property',
 *   { additionalInfo: 'context data' }
 * );
 * ```
 */
export class LaagError extends Error {
  public readonly code: string;
  public readonly path?: string;
  public readonly context?: Record<string, unknown>;

  /**
   * Creates a new LaagError instance.
   *
   * @param message - Human-readable error message describing what went wrong.
   * @param code - Machine-readable error code for programmatic error handling.
   * @param path - Optional path to the location in the document where the error occurred.
   * @param context - Optional additional context information about the error.
   *
   * @example
   * ```typescript
   * const error = new LaagError(
   *   'Invalid property value',
   *   'INVALID_VALUE',
   *   'info.version',
   *   { expectedType: 'string', actualType: 'number' }
   * );
   * ```
   */
  constructor(message: string, code: string, path?: string, context?: Record<string, unknown>) {
    super(message);
    this.name = 'LaagError';
    this.code = code;
    this.path = path;
    this.context = context;

    // Maintain proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, LaagError);
    }
  }

  /**
   * Get a formatted error message with optional context information.
   *
   * This method formats the error message based on the provided options,
   * optionally including path information and context data for debugging.
   *
   * @param options - Configuration options for error message formatting.
   * @returns Formatted error message string.
   *
   * @since 2.0.0
   *
   * @example
   * ```typescript
   * const error = new LaagError('Invalid value', 'INVALID', 'info.title', { value: 123 });
   *
   * // Basic message
   * error.getFormattedMessage(); // 'Invalid value (at path: info.title)'
   *
   * // With context in development
   * error.getFormattedMessage({ development: true, includeContext: true });
   * // 'Invalid value (at path: info.title)\nContext: { "value": 123 }'
   * ```
   */
  getFormattedMessage(options: ErrorHandlingOptions = {}): string {
    let message = this.message;

    if (this.path && options.includeContext !== false) {
      message = `${message} (at path: ${this.path})`;
    }

    if (this.context && options.includeContext && options.development) {
      message = `${message}\nContext: ${JSON.stringify(this.context, null, 2)}`;
    }

    return message;
  }

  /**
   * Convert the error to a JSON-serializable representation.
   *
   * This method creates a plain object representation of the error that can be
   * safely serialized to JSON, useful for logging or API responses.
   *
   * @returns Plain object representation of the error.
   *
   * @since 2.0.0
   *
   * @example
   * ```typescript
   * const error = new LaagError('Test error', 'TEST_ERROR', 'test.path');
   * const json = error.toJSON();
   * console.log(JSON.stringify(json, null, 2));
   * // {
   * //   "name": "LaagError",
   * //   "message": "Test error",
   * //   "code": "TEST_ERROR",
   * //   "path": "test.path",
   * //   "context": undefined
   * // }
   * ```
   */
  toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      path: this.path,
      context: this.context,
    };
  }
}

/**
 * Error thrown when document or data validation fails.
 *
 * This error is used when the library detects invalid data structures,
 * missing required fields, or constraint violations in API specification documents.
 *
 * @class ValidationError
 * @extends LaagError
 * @since 2.0.0
 *
 * @example
 * ```typescript
 * import { ValidationError } from '@laag/core';
 *
 * throw new ValidationError(
 *   'Title is required',
 *   'info.title',
 *   { providedValue: undefined }
 * );
 * ```
 */
export class ValidationError extends LaagError {
  /**
   * Creates a new ValidationError instance.
   *
   * @param message - Human-readable description of the validation failure.
   * @param path - Path to the location in the document where validation failed.
   * @param context - Optional additional context about the validation failure.
   *
   * @example
   * ```typescript
   * const error = new ValidationError(
   *   'Version must be a string',
   *   'info.version',
   *   { expectedType: 'string', actualType: 'number', value: 1.0 }
   * );
   * ```
   */
  constructor(message: string, path: string, context?: Record<string, unknown>) {
    super(message, 'VALIDATION_ERROR', path, context);
    this.name = 'ValidationError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationError);
    }
  }
}

/**
 * Error thrown when document parsing fails.
 *
 * This error is used when the library cannot parse input data, such as
 * invalid JSON strings or malformed document structures.
 *
 * @class ParseError
 * @extends LaagError
 * @since 2.0.0
 *
 * @example
 * ```typescript
 * import { ParseError } from '@laag/core';
 *
 * throw new ParseError(
 *   'Invalid JSON syntax',
 *   { originalError: 'Unexpected token at position 10' }
 * );
 * ```
 */
export class ParseError extends LaagError {
  /**
   * Creates a new ParseError instance.
   *
   * @param message - Human-readable description of the parsing failure.
   * @param context - Optional additional context about the parsing failure.
   *
   * @example
   * ```typescript
   * const error = new ParseError(
   *   'Failed to parse JSON document',
   *   {
   *     originalError: 'Unexpected token } at position 15',
   *     inputLength: 100
   *   }
   * );
   * ```
   */
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'PARSE_ERROR', undefined, context);
    this.name = 'ParseError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ParseError);
    }
  }
}

/**
 * Error thrown when a required property, method, or resource is not found.
 *
 * This error is used when the library cannot locate expected elements in
 * the document structure, such as missing components, paths, or operations.
 *
 * @class NotFoundError
 * @extends LaagError
 * @since 2.0.0
 *
 * @example
 * ```typescript
 * import { NotFoundError } from '@laag/core';
 *
 * throw new NotFoundError(
 *   'Component schema not found',
 *   'components.schemas.User',
 *   { requestedSchema: 'User', availableSchemas: ['Pet', 'Order'] }
 * );
 * ```
 */
export class NotFoundError extends LaagError {
  /**
   * Creates a new NotFoundError instance.
   *
   * @param message - Human-readable description of what was not found.
   * @param path - Optional path to the location where the item was expected.
   * @param context - Optional additional context about what was being searched for.
   *
   * @example
   * ```typescript
   * const error = new NotFoundError(
   *   'Operation not found',
   *   'paths./users.get',
   *   {
   *     requestedPath: '/users',
   *     requestedMethod: 'get',
   *     availableMethods: ['post', 'put']
   *   }
   * );
   * ```
   */
  constructor(message: string, path?: string, context?: Record<string, unknown>) {
    super(message, 'NOT_FOUND_ERROR', path, context);
    this.name = 'NotFoundError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NotFoundError);
    }
  }
}
