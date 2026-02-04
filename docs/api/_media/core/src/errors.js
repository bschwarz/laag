/**
 * Error handling system for the laag library collection
 */
/**
 * Base error class for all laag library errors
 */
export class LaagError extends Error {
    code;
    path;
    context;
    constructor(message, code, path, context) {
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
     * Get formatted error message with optional context
     */
    getFormattedMessage(options = {}) {
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
     * Convert error to JSON representation
     */
    toJSON() {
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
 * Error thrown when validation fails
 */
export class ValidationError extends LaagError {
    constructor(message, path, context) {
        super(message, 'VALIDATION_ERROR', path, context);
        this.name = 'ValidationError';
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ValidationError);
        }
    }
}
/**
 * Error thrown when parsing fails
 */
export class ParseError extends LaagError {
    constructor(message, context) {
        super(message, 'PARSE_ERROR', undefined, context);
        this.name = 'ParseError';
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ParseError);
        }
    }
}
/**
 * Error thrown when a required property or method is not found
 */
export class NotFoundError extends LaagError {
    constructor(message, path, context) {
        super(message, 'NOT_FOUND_ERROR', path, context);
        this.name = 'NotFoundError';
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, NotFoundError);
        }
    }
}
//# sourceMappingURL=errors.js.map