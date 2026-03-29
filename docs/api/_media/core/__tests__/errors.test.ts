/**
 * Unit tests for error handling classes
 */

import { describe, expect, test } from 'bun:test';
import { LaagError, NotFoundError, ParseError, ValidationError } from '../src/errors.js';
import type { ErrorHandlingOptions } from '../src/types.js';

describe('LaagError', () => {
  test('should create error with basic properties', () => {
    const error = new LaagError('Test message', 'TEST_CODE');

    expect(error.message).toBe('Test message');
    expect(error.code).toBe('TEST_CODE');
    expect(error.name).toBe('LaagError');
    expect(error.path).toBeUndefined();
    expect(error.context).toBeUndefined();
  });

  test('should create error with path and context', () => {
    const context = { key: 'value', number: 42 };
    const error = new LaagError('Test message', 'TEST_CODE', 'test.path', context);

    expect(error.message).toBe('Test message');
    expect(error.code).toBe('TEST_CODE');
    expect(error.path).toBe('test.path');
    expect(error.context).toEqual(context);
  });

  test('should be instance of Error', () => {
    const error = new LaagError('Test', 'CODE');
    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(LaagError);
  });

  describe('getFormattedMessage', () => {
    test('should return basic message without options', () => {
      const error = new LaagError('Test message', 'CODE');
      expect(error.getFormattedMessage()).toBe('Test message');
    });

    test('should include path when available', () => {
      const error = new LaagError('Test message', 'CODE', 'test.path');
      expect(error.getFormattedMessage()).toBe('Test message (at path: test.path)');
    });

    test('should exclude path when includeContext is false', () => {
      const error = new LaagError('Test message', 'CODE', 'test.path');
      const options: ErrorHandlingOptions = { includeContext: false };
      expect(error.getFormattedMessage(options)).toBe('Test message');
    });

    test('should include context in development mode', () => {
      const context = { key: 'value' };
      const error = new LaagError('Test message', 'CODE', 'test.path', context);
      const options: ErrorHandlingOptions = { includeContext: true, development: true };
      const formatted = error.getFormattedMessage(options);

      expect(formatted).toContain('Test message (at path: test.path)');
      expect(formatted).toContain('Context:');
      expect(formatted).toContain('"key": "value"');
    });

    test('should exclude context in production mode', () => {
      const context = { key: 'value' };
      const error = new LaagError('Test message', 'CODE', 'test.path', context);
      const options: ErrorHandlingOptions = { includeContext: true, development: false };
      const formatted = error.getFormattedMessage(options);

      expect(formatted).toBe('Test message (at path: test.path)');
      expect(formatted).not.toContain('Context:');
    });

    test('should handle missing context gracefully', () => {
      const error = new LaagError('Test message', 'CODE', 'test.path');
      const options: ErrorHandlingOptions = { includeContext: true, development: true };
      expect(error.getFormattedMessage(options)).toBe('Test message (at path: test.path)');
    });
  });

  describe('toJSON', () => {
    test('should serialize error to JSON object', () => {
      const context = { key: 'value' };
      const error = new LaagError('Test message', 'TEST_CODE', 'test.path', context);
      const json = error.toJSON();

      expect(json).toEqual({
        name: 'LaagError',
        message: 'Test message',
        code: 'TEST_CODE',
        path: 'test.path',
        context: context,
      });
    });

    test('should handle missing optional properties', () => {
      const error = new LaagError('Test message', 'TEST_CODE');
      const json = error.toJSON();

      expect(json).toEqual({
        name: 'LaagError',
        message: 'Test message',
        code: 'TEST_CODE',
        path: undefined,
        context: undefined,
      });
    });
  });
});

describe('ValidationError', () => {
  test('should create validation error with correct properties', () => {
    const error = new ValidationError('Validation failed', 'field.path');

    expect(error.message).toBe('Validation failed');
    expect(error.code).toBe('VALIDATION_ERROR');
    expect(error.path).toBe('field.path');
    expect(error.name).toBe('ValidationError');
  });

  test('should create validation error with context', () => {
    const context = { expected: 'string', actual: 'number' };
    const error = new ValidationError('Type mismatch', 'field.path', context);

    expect(error.context).toEqual(context);
  });

  test('should be instance of LaagError', () => {
    const error = new ValidationError('Test', 'path');
    expect(error).toBeInstanceOf(LaagError);
    expect(error).toBeInstanceOf(ValidationError);
  });

  test('should serialize correctly', () => {
    const error = new ValidationError('Validation failed', 'field.path');
    const json = error.toJSON();

    expect(json.name).toBe('ValidationError');
    expect(json.code).toBe('VALIDATION_ERROR');
    expect(json.path).toBe('field.path');
  });
});

describe('ParseError', () => {
  test('should create parse error with correct properties', () => {
    const error = new ParseError('Parse failed');

    expect(error.message).toBe('Parse failed');
    expect(error.code).toBe('PARSE_ERROR');
    expect(error.name).toBe('ParseError');
    expect(error.path).toBeUndefined();
  });

  test('should create parse error with context', () => {
    const context = { line: 5, column: 10 };
    const error = new ParseError('JSON syntax error', context);

    expect(error.context).toEqual(context);
  });

  test('should be instance of LaagError', () => {
    const error = new ParseError('Test');
    expect(error).toBeInstanceOf(LaagError);
    expect(error).toBeInstanceOf(ParseError);
  });

  test('should serialize correctly', () => {
    const error = new ParseError('Parse failed');
    const json = error.toJSON();

    expect(json.name).toBe('ParseError');
    expect(json.code).toBe('PARSE_ERROR');
    expect(json.path).toBeUndefined();
  });
});

describe('NotFoundError', () => {
  test('should create not found error with correct properties', () => {
    const error = new NotFoundError('Resource not found');

    expect(error.message).toBe('Resource not found');
    expect(error.code).toBe('NOT_FOUND_ERROR');
    expect(error.name).toBe('NotFoundError');
    expect(error.path).toBeUndefined();
  });

  test('should create not found error with path', () => {
    const error = new NotFoundError('Property not found', 'object.property');

    expect(error.path).toBe('object.property');
  });

  test('should create not found error with context', () => {
    const context = { available: ['prop1', 'prop2'] };
    const error = new NotFoundError('Property not found', 'object.property', context);

    expect(error.context).toEqual(context);
  });

  test('should be instance of LaagError', () => {
    const error = new NotFoundError('Test');
    expect(error).toBeInstanceOf(LaagError);
    expect(error).toBeInstanceOf(NotFoundError);
  });

  test('should serialize correctly', () => {
    const error = new NotFoundError('Resource not found', 'path');
    const json = error.toJSON();

    expect(json.name).toBe('NotFoundError');
    expect(json.code).toBe('NOT_FOUND_ERROR');
    expect(json.path).toBe('path');
  });
});

describe('Error inheritance and stack traces', () => {
  test('should maintain proper prototype chain', () => {
    const validation = new ValidationError('Test', 'path');
    const parse = new ParseError('Test');
    const notFound = new NotFoundError('Test');

    expect(validation instanceof Error).toBe(true);
    expect(validation instanceof LaagError).toBe(true);
    expect(validation instanceof ValidationError).toBe(true);

    expect(parse instanceof Error).toBe(true);
    expect(parse instanceof LaagError).toBe(true);
    expect(parse instanceof ParseError).toBe(true);

    expect(notFound instanceof Error).toBe(true);
    expect(notFound instanceof LaagError).toBe(true);
    expect(notFound instanceof NotFoundError).toBe(true);
  });

  test('should have stack traces', () => {
    const error = new LaagError('Test', 'CODE');
    expect(error.stack).toBeDefined();
    expect(typeof error.stack).toBe('string');
  });

  test('should be throwable and catchable', () => {
    expect(() => {
      throw new ValidationError('Test validation error', 'test.path');
    }).toThrow(ValidationError);

    expect(() => {
      throw new ParseError('Test parse error');
    }).toThrow(ParseError);

    expect(() => {
      throw new NotFoundError('Test not found error');
    }).toThrow(NotFoundError);
  });
});
