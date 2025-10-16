/**
 * Shared type definitions for the laag library collection.
 *
 * @fileoverview This module contains TypeScript type definitions that are shared
 * across all packages in the laag library collection. These types provide the
 * foundation for type safety and consistent interfaces.
 *
 * @module @laag/core/types
 * @since 2.0.0
 */

/**
 * Extension object type for API specification extensions (x-* properties).
 *
 * Most API specification formats allow custom extensions that start with 'x-'.
 * This type ensures type safety while allowing any extension property.
 *
 * @interface ExtensionObject
 * @since 2.0.0
 *
 * @example
 * ```typescript
 * const extensions: ExtensionObject = {
 *   'x-custom-property': 'value',
 *   'x-vendor-extension': { nested: 'object' },
 *   'x-feature-flags': ['flag1', 'flag2']
 * };
 * ```
 */
export interface ExtensionObject {
  [key: `x-${string}`]: unknown;
}

/**
 * Result of a document validation operation.
 *
 * This interface represents the outcome of validating an API specification document,
 * including whether the validation passed and any errors that were found.
 *
 * @interface ValidationResult
 * @since 2.0.0
 *
 * @example
 * ```typescript
 * const result: ValidationResult = {
 *   valid: false,
 *   errors: [
 *     {
 *       path: 'info.title',
 *       message: 'Title is required',
 *       code: 'REQUIRED_FIELD_MISSING'
 *     }
 *   ]
 * };
 * ```
 */
export interface ValidationResult {
  /** Whether the validation passed without any errors */
  valid: boolean;
  /** Array of validation errors found during validation */
  errors: ValidationError[];
}

/**
 * Detailed information about a validation error.
 *
 * This interface provides structured information about validation failures,
 * including the location of the error, a human-readable message, and a
 * machine-readable error code.
 *
 * @interface ValidationError
 * @since 2.0.0
 *
 * @example
 * ```typescript
 * const error: ValidationError = {
 *   path: 'paths./users.get.responses.200',
 *   message: 'Response description is required',
 *   code: 'MISSING_DESCRIPTION',
 *   context: {
 *     statusCode: '200',
 *     operation: 'get',
 *     path: '/users'
 *   }
 * };
 * ```
 */
export interface ValidationError {
  /** Path to the location in the document where the validation error occurred */
  path: string;
  /** Human-readable description of the validation error */
  message: string;
  /** Machine-readable error code for programmatic handling */
  code: string;
  /** Optional additional context information about the error */
  context?: Record<string, unknown>;
}

/**
 * Base document interface that all API specification documents should extend.
 *
 * This interface provides the foundation for all API specification document types,
 * ensuring they support extension properties while allowing flexible content.
 *
 * @interface BaseDocument
 * @extends ExtensionObject
 * @since 2.0.0
 *
 * @example
 * ```typescript
 * interface MyApiDocument extends BaseDocument {
 *   version: string;
 *   title: string;
 *   // Inherits extension property support from ExtensionObject
 * }
 *
 * const doc: MyApiDocument = {
 *   version: '1.0.0',
 *   title: 'My API',
 *   'x-custom': 'extension value'
 * };
 * ```
 */
export interface BaseDocument extends ExtensionObject {
  [key: string]: unknown;
}

/**
 * Configuration options for error handling behavior.
 *
 * These options control how errors are formatted and what information is included
 * in error messages and context data.
 *
 * @interface ErrorHandlingOptions
 * @since 2.0.0
 *
 * @example
 * ```typescript
 * const options: ErrorHandlingOptions = {
 *   includeContext: true,    // Include context data in error messages
 *   includeStack: false,     // Don't include stack traces
 *   development: true        // Use development-friendly error formatting
 * };
 *
 * const spec = new MyApiSpec(document, options);
 * ```
 */
export interface ErrorHandlingOptions {
  /** Whether to include context information in error messages. Defaults to true. */
  includeContext?: boolean;
  /** Whether to include stack traces in error output. Defaults to false. */
  includeStack?: boolean;
  /** Whether to use development-friendly error formatting. Auto-detected from NODE_ENV. */
  development?: boolean;
}
