/**
 * Tests for TraitValidator
 */

import { describe, expect, test } from 'bun:test';
import { SMITHY_TRAITS } from '../../src/types.js';
import { TraitValidator } from '../../src/validators/trait-validator.js';

describe('TraitValidator', () => {
  const validator = new TraitValidator();

  describe('validate', () => {
    test('should validate a valid trait', () => {
      const result = validator.validate(SMITHY_TRAITS.DOCUMENTATION, 'This is documentation');
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should fail for invalid trait ID', () => {
      const result = validator.validate('', 'value');
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe('INVALID_TRAIT_ID');
    });

    test('should validate custom traits', () => {
      const result = validator.validate('custom.namespace#myTrait', { custom: 'value' });
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('validateHttpTrait', () => {
    test('should validate a valid HTTP trait', () => {
      const httpTrait = {
        method: 'GET',
        uri: '/users/{id}',
      };
      const result = validator.validateHttpTrait(httpTrait);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should validate HTTP trait with code', () => {
      const httpTrait = {
        method: 'POST',
        uri: '/users',
        code: 201,
      };
      const result = validator.validateHttpTrait(httpTrait);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should fail for non-object HTTP trait', () => {
      const result = validator.validateHttpTrait('invalid');
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe('INVALID_HTTP_TRAIT_TYPE');
    });

    test('should fail for missing method', () => {
      const httpTrait = {
        uri: '/users',
      };
      const result = validator.validateHttpTrait(httpTrait);
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.code === 'MISSING_HTTP_METHOD')).toBe(true);
    });

    test('should fail for invalid method type', () => {
      const httpTrait = {
        method: 123,
        uri: '/users',
      };
      const result = validator.validateHttpTrait(httpTrait);
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.code === 'INVALID_HTTP_METHOD_TYPE')).toBe(true);
    });

    test('should fail for invalid HTTP method', () => {
      const httpTrait = {
        method: 'INVALID',
        uri: '/users',
      };
      const result = validator.validateHttpTrait(httpTrait);
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.code === 'INVALID_HTTP_METHOD')).toBe(true);
    });

    test('should fail for missing URI', () => {
      const httpTrait = {
        method: 'GET',
      };
      const result = validator.validateHttpTrait(httpTrait);
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.code === 'MISSING_HTTP_URI')).toBe(true);
    });

    test('should fail for invalid URI type', () => {
      const httpTrait = {
        method: 'GET',
        uri: 123,
      };
      const result = validator.validateHttpTrait(httpTrait);
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.code === 'INVALID_HTTP_URI_TYPE')).toBe(true);
    });

    test('should fail for URI not starting with /', () => {
      const httpTrait = {
        method: 'GET',
        uri: 'users',
      };
      const result = validator.validateHttpTrait(httpTrait);
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.code === 'INVALID_HTTP_URI_FORMAT')).toBe(true);
    });

    test('should fail for invalid code type', () => {
      const httpTrait = {
        method: 'GET',
        uri: '/users',
        code: '200',
      };
      const result = validator.validateHttpTrait(httpTrait);
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.code === 'INVALID_HTTP_CODE_TYPE')).toBe(true);
    });

    test('should fail for code out of range', () => {
      const httpTrait = {
        method: 'GET',
        uri: '/users',
        code: 99,
      };
      const result = validator.validateHttpTrait(httpTrait);
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.code === 'INVALID_HTTP_CODE_RANGE')).toBe(true);
    });

    test('should accept case-insensitive HTTP methods', () => {
      const httpTrait = {
        method: 'get',
        uri: '/users',
      };
      const result = validator.validateHttpTrait(httpTrait);
      expect(result.valid).toBe(true);
    });
  });

  describe('validateHttpErrorTrait', () => {
    test('should validate a valid HTTP error code', () => {
      const result = validator.validateHttpErrorTrait(404);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should fail for non-number HTTP error', () => {
      const result = validator.validateHttpErrorTrait('404');
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe('INVALID_HTTP_ERROR_TYPE');
    });

    test('should fail for error code below 400', () => {
      const result = validator.validateHttpErrorTrait(200);
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe('INVALID_HTTP_ERROR_RANGE');
    });

    test('should fail for error code above 599', () => {
      const result = validator.validateHttpErrorTrait(600);
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe('INVALID_HTTP_ERROR_RANGE');
    });
  });

  describe('validateHttpQueryTrait', () => {
    test('should validate a valid query parameter name', () => {
      const result = validator.validateHttpQueryTrait('page');
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should fail for non-string query parameter', () => {
      const result = validator.validateHttpQueryTrait(123);
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe('INVALID_HTTP_QUERY_TYPE');
    });

    test('should fail for empty query parameter name', () => {
      const result = validator.validateHttpQueryTrait('');
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe('EMPTY_HTTP_QUERY');
    });
  });

  describe('validateHttpHeaderTrait', () => {
    test('should validate a valid header name', () => {
      const result = validator.validateHttpHeaderTrait('X-Custom-Header');
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should fail for non-string header name', () => {
      const result = validator.validateHttpHeaderTrait(123);
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe('INVALID_HTTP_HEADER_TYPE');
    });

    test('should fail for empty header name', () => {
      const result = validator.validateHttpHeaderTrait('');
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe('EMPTY_HTTP_HEADER');
    });
  });

  describe('validateRequiredTrait', () => {
    test('should validate empty object', () => {
      const result = validator.validateRequiredTrait({});
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should validate undefined', () => {
      const result = validator.validateRequiredTrait(undefined);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should fail for non-object value', () => {
      const result = validator.validateRequiredTrait('required');
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe('INVALID_REQUIRED_TRAIT');
    });

    test('should fail for non-empty object', () => {
      const result = validator.validateRequiredTrait({ value: true });
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe('INVALID_REQUIRED_TRAIT');
    });
  });

  describe('validateDocumentationTrait', () => {
    test('should validate valid documentation', () => {
      const result = validator.validateDocumentationTrait('This is documentation');
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should fail for non-string documentation', () => {
      const result = validator.validateDocumentationTrait(123);
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe('INVALID_DOCUMENTATION_TYPE');
    });

    test('should fail for empty documentation', () => {
      const result = validator.validateDocumentationTrait('');
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe('EMPTY_DOCUMENTATION');
    });
  });

  describe('validatePaginatedTrait', () => {
    test('should validate valid paginated trait', () => {
      const paginated = {
        inputToken: 'nextToken',
        outputToken: 'nextToken',
        items: 'items',
        pageSize: 'maxResults',
      };
      const result = validator.validatePaginatedTrait(paginated);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should validate empty paginated trait', () => {
      const result = validator.validatePaginatedTrait({});
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should fail for non-object paginated trait', () => {
      const result = validator.validatePaginatedTrait('invalid');
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe('INVALID_PAGINATED_TRAIT_TYPE');
    });

    test('should fail for invalid field type', () => {
      const paginated = {
        inputToken: 123,
      };
      const result = validator.validatePaginatedTrait(paginated);
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.code === 'INVALID_PAGINATED_FIELD_TYPE')).toBe(true);
    });
  });

  describe('validateMarkerTrait', () => {
    test('should validate empty object', () => {
      const result = validator.validateMarkerTrait({});
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should validate undefined', () => {
      const result = validator.validateMarkerTrait(undefined);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should fail for non-object value', () => {
      const result = validator.validateMarkerTrait('marker');
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe('INVALID_MARKER_TRAIT');
    });

    test('should fail for non-empty object', () => {
      const result = validator.validateMarkerTrait({ value: true });
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe('INVALID_MARKER_TRAIT');
    });
  });

  describe('validateCustomTrait', () => {
    test('should accept JSON-serializable values', () => {
      expect(validator.validateCustomTrait('string').valid).toBe(true);
      expect(validator.validateCustomTrait(123).valid).toBe(true);
      expect(validator.validateCustomTrait({ key: 'value' }).valid).toBe(true);
      expect(validator.validateCustomTrait([1, 2, 3]).valid).toBe(true);
      expect(validator.validateCustomTrait(null).valid).toBe(true);
      expect(validator.validateCustomTrait(undefined).valid).toBe(true);
      expect(validator.validateCustomTrait(true).valid).toBe(true);
      expect(validator.validateCustomTrait(false).valid).toBe(true);
    });

    test('should accept nested objects and arrays', () => {
      const complexValue = {
        nested: {
          array: [1, 2, { deep: 'value' }],
          object: { key: 'value' },
        },
      };
      expect(validator.validateCustomTrait(complexValue).valid).toBe(true);
    });

    test('should reject functions', () => {
      const result = validator.validateCustomTrait(() => {});
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe('INVALID_CUSTOM_TRAIT_TYPE');
    });

    test('should reject symbols', () => {
      const result = validator.validateCustomTrait(Symbol('test'));
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe('INVALID_CUSTOM_TRAIT_TYPE');
    });

    test('should reject circular references', () => {
      const circular: any = { a: 1 };
      circular.self = circular;
      const result = validator.validateCustomTrait(circular);
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe('INVALID_CUSTOM_TRAIT_VALUE');
    });

    test('should reject objects with non-serializable values', () => {
      const withFunction = { fn: () => {} };
      const result = validator.validateCustomTrait(withFunction);
      expect(result.valid).toBe(false);
    });
  });
});
