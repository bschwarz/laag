/**
 * Shared type definitions for the laag library collection
 */
/**
 * Extension object type for API specification extensions (x-* properties)
 */
export interface ExtensionObject {
  [key: `x-${string}`]: unknown;
}
/**
 * Result of a validation operation
 */
export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}
/**
 * Validation error details
 */
export interface ValidationError {
  path: string;
  message: string;
  code: string;
  context?: Record<string, unknown>;
}
/**
 * Base document interface that all API specification documents should extend
 */
export interface BaseDocument extends ExtensionObject {
  [key: string]: unknown;
}
/**
 * Configuration options for error handling
 */
export interface ErrorHandlingOptions {
  includeContext?: boolean;
  includeStack?: boolean;
  development?: boolean;
}
//# sourceMappingURL=types.d.ts.map
