/**
 * Unit tests for type definitions and validation
 */

import { describe, expect, test } from 'bun:test';
import type {
  BaseDocument,
  ErrorHandlingOptions,
  ExtensionObject,
  ValidationError,
  ValidationResult,
} from '../src/types.js';

describe('Type definitions', () => {
  describe('ExtensionObject', () => {
    test('should accept valid extension keys', () => {
      const extensions: ExtensionObject = {
        'x-custom': 'value',
        'x-another-extension': { nested: 'object' },
        'x-123': 123,
        'x-boolean': true,
        'x-array': [1, 2, 3],
      };

      expect(extensions['x-custom']).toBe('value');
      expect(extensions['x-another-extension']).toEqual({ nested: 'object' });
      expect(extensions['x-123']).toBe(123);
      expect(extensions['x-boolean']).toBe(true);
      expect(extensions['x-array']).toEqual([1, 2, 3]);
    });

    test('should handle empty extension object', () => {
      const extensions: ExtensionObject = {};
      expect(Object.keys(extensions)).toHaveLength(0);
    });

    test('should allow any value type for extensions', () => {
      const extensions: ExtensionObject = {
        'x-string': 'text',
        'x-number': 42,
        'x-boolean': false,
        'x-null': null,
        'x-undefined': undefined,
        'x-object': { key: 'value' },
        'x-array': ['item1', 'item2'],
        'x-function': () => 'test',
      };

      expect(typeof extensions['x-string']).toBe('string');
      expect(typeof extensions['x-number']).toBe('number');
      expect(typeof extensions['x-boolean']).toBe('boolean');
      expect(extensions['x-null']).toBeNull();
      expect(extensions['x-undefined']).toBeUndefined();
      expect(typeof extensions['x-object']).toBe('object');
      expect(Array.isArray(extensions['x-array'])).toBe(true);
      expect(typeof extensions['x-function']).toBe('function');
    });
  });

  describe('ValidationResult', () => {
    test('should represent successful validation', () => {
      const result: ValidationResult = {
        valid: true,
        errors: [],
      };

      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should represent failed validation with errors', () => {
      const errors: ValidationError[] = [
        {
          path: 'info.title',
          message: 'Title is required',
          code: 'REQUIRED_FIELD',
        },
        {
          path: 'paths',
          message: 'At least one path is required',
          code: 'REQUIRED_FIELD',
          context: { available: [] },
        },
      ];

      const result: ValidationResult = {
        valid: false,
        errors,
      };

      expect(result.valid).toBe(false);
      expect(result.errors).toHaveLength(2);
      expect(result.errors[0].path).toBe('info.title');
      expect(result.errors[1].context).toEqual({ available: [] });
    });
  });

  describe('ValidationError', () => {
    test('should contain required properties', () => {
      const error: ValidationError = {
        path: 'test.path',
        message: 'Validation failed',
        code: 'VALIDATION_ERROR',
      };

      expect(error.path).toBe('test.path');
      expect(error.message).toBe('Validation failed');
      expect(error.code).toBe('VALIDATION_ERROR');
    });

    test('should support optional context', () => {
      const error: ValidationError = {
        path: 'test.path',
        message: 'Type mismatch',
        code: 'TYPE_ERROR',
        context: {
          expected: 'string',
          actual: 'number',
          value: 42,
        },
      };

      expect(error.context).toEqual({
        expected: 'string',
        actual: 'number',
        value: 42,
      });
    });

    test('should handle complex context objects', () => {
      const error: ValidationError = {
        path: 'complex.path',
        message: 'Complex validation error',
        code: 'COMPLEX_ERROR',
        context: {
          nested: {
            object: {
              with: ['array', 'values'],
            },
          },
          metadata: {
            timestamp: new Date().toISOString(),
            version: '1.0.0',
          },
        },
      };

      expect(error.context?.nested).toBeDefined();
      expect(error.context?.metadata).toBeDefined();
    });
  });

  describe('BaseDocument', () => {
    test('should extend ExtensionObject', () => {
      const doc: BaseDocument = {
        title: 'Test Document',
        version: '1.0.0',
        'x-custom': 'extension value',
      };

      expect(doc.title).toBe('Test Document');
      expect(doc.version).toBe('1.0.0');
      expect(doc['x-custom']).toBe('extension value');
    });

    test('should allow any properties', () => {
      const doc: BaseDocument = {
        anyProperty: 'any value',
        nested: {
          object: {
            deeply: 'nested',
          },
        },
        array: [1, 2, 3],
        'x-extension': true,
      };

      expect(doc.anyProperty).toBe('any value');
      expect(doc.nested).toBeDefined();
      expect(Array.isArray(doc.array)).toBe(true);
      expect(doc['x-extension']).toBe(true);
    });

    test('should handle empty document', () => {
      const doc: BaseDocument = {};
      expect(Object.keys(doc)).toHaveLength(0);
    });
  });

  describe('ErrorHandlingOptions', () => {
    test('should have all optional properties', () => {
      const options: ErrorHandlingOptions = {};
      expect(options).toEqual({});
    });

    test('should accept partial configuration', () => {
      const options1: ErrorHandlingOptions = {
        includeContext: true,
      };

      const options2: ErrorHandlingOptions = {
        development: false,
      };

      const options3: ErrorHandlingOptions = {
        includeStack: true,
        includeContext: false,
      };

      expect(options1.includeContext).toBe(true);
      expect(options2.development).toBe(false);
      expect(options3.includeStack).toBe(true);
      expect(options3.includeContext).toBe(false);
    });

    test('should accept full configuration', () => {
      const options: ErrorHandlingOptions = {
        includeContext: true,
        includeStack: false,
        development: true,
      };

      expect(options.includeContext).toBe(true);
      expect(options.includeStack).toBe(false);
      expect(options.development).toBe(true);
    });
  });
});

describe('Type compatibility and usage patterns', () => {
  test('should work with real-world document structures', () => {
    const openApiDoc: BaseDocument = {
      openapi: '3.0.2',
      info: {
        title: 'Test API',
        version: '1.0.0',
      },
      paths: {},
      'x-custom-extension': {
        generator: 'laag',
        version: '2.0.0',
      },
    };

    expect(openApiDoc.openapi).toBe('3.0.2');
    expect(openApiDoc['x-custom-extension']).toBeDefined();
  });

  test('should support validation result patterns', () => {
    const createValidationResult = (errors: ValidationError[]): ValidationResult => ({
      valid: errors.length === 0,
      errors,
    });

    const successResult = createValidationResult([]);
    const failureResult = createValidationResult([
      { path: 'test', message: 'Error', code: 'TEST_ERROR' },
    ]);

    expect(successResult.valid).toBe(true);
    expect(failureResult.valid).toBe(false);
    expect(failureResult.errors).toHaveLength(1);
  });

  test('should support extension manipulation patterns', () => {
    const addExtensions = (doc: BaseDocument, extensions: ExtensionObject): BaseDocument => ({
      ...doc,
      ...extensions,
    });

    const filterExtensions = (doc: BaseDocument): ExtensionObject => {
      const extensions: ExtensionObject = {};
      for (const [key, value] of Object.entries(doc)) {
        if (key.startsWith('x-')) {
          extensions[key as `x-${string}`] = value;
        }
      }
      return extensions;
    };

    const originalDoc: BaseDocument = {
      title: 'Test',
      'x-existing': 'value',
    };

    const newExtensions: ExtensionObject = {
      'x-new': 'new value',
    };

    const updatedDoc = addExtensions(originalDoc, newExtensions);
    const extractedExtensions = filterExtensions(updatedDoc);

    expect(updatedDoc['x-new']).toBe('new value');
    expect(extractedExtensions).toEqual({
      'x-existing': 'value',
      'x-new': 'new value',
    });
  });
});
