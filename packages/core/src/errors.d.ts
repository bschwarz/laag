/**
 * Error handling system for the laag library collection
 */
import { ErrorHandlingOptions } from './types.js';
/**
 * Base error class for all laag library errors
 */
export declare class LaagError extends Error {
    readonly code: string;
    readonly path?: string;
    readonly context?: Record<string, unknown>;
    constructor(message: string, code: string, path?: string, context?: Record<string, unknown>);
    /**
     * Get formatted error message with optional context
     */
    getFormattedMessage(options?: ErrorHandlingOptions): string;
    /**
     * Convert error to JSON representation
     */
    toJSON(): Record<string, unknown>;
}
/**
 * Error thrown when validation fails
 */
export declare class ValidationError extends LaagError {
    constructor(message: string, path: string, context?: Record<string, unknown>);
}
/**
 * Error thrown when parsing fails
 */
export declare class ParseError extends LaagError {
    constructor(message: string, context?: Record<string, unknown>);
}
/**
 * Error thrown when a required property or method is not found
 */
export declare class NotFoundError extends LaagError {
    constructor(message: string, path?: string, context?: Record<string, unknown>);
}
//# sourceMappingURL=errors.d.ts.map