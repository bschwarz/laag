/**
 * Tests for TraitManager
 */

import { beforeEach, describe, expect, test } from 'bun:test';
import { TraitManager } from '../../src/traits/trait-manager';
import type { OperationShape, Shape, StructureShape } from '../../src/types';
import { SMITHY_TRAITS } from '../../src/types';

describe('TraitManager', () => {
  let traitManager: TraitManager;
  let shapes: Record<string, Shape>;

  beforeEach(() => {
    shapes = {
      'example#MyStructure': {
        type: 'structure',
        members: {
          name: {
            target: 'smithy.api#String',
            traits: {
              [SMITHY_TRAITS.REQUIRED]: {},
            },
          },
        },
        traits: {
          [SMITHY_TRAITS.DOCUMENTATION]: 'A test structure',
        },
      } as StructureShape,
      'example#MyOperation': {
        type: 'operation',
        input: 'example#MyInput',
        output: 'example#MyOutput',
        traits: {
          [SMITHY_TRAITS.HTTP]: {
            method: 'GET',
            uri: '/test/{id}',
            code: 200,
          },
          [SMITHY_TRAITS.READONLY]: {},
        },
      } as OperationShape,
    };

    traitManager = new TraitManager(shapes);
  });

  describe('constructor', () => {
    test('should extract traits from shapes', () => {
      expect(traitManager.has('example#MyStructure', SMITHY_TRAITS.DOCUMENTATION)).toBe(true);
      expect(traitManager.has('example#MyOperation', SMITHY_TRAITS.HTTP)).toBe(true);
      expect(traitManager.has('example#MyOperation', SMITHY_TRAITS.READONLY)).toBe(true);
    });

    test('should handle empty shapes', () => {
      const emptyManager = new TraitManager({});
      expect(emptyManager.get('example#NonExistent')).toBeUndefined();
    });
  });

  describe('get', () => {
    test('should return all traits for a shape', () => {
      const traits = traitManager.get('example#MyOperation');
      expect(traits).toBeDefined();
      expect(traits?.size).toBe(2);
      expect(traits?.has(SMITHY_TRAITS.HTTP)).toBe(true);
      expect(traits?.has(SMITHY_TRAITS.READONLY)).toBe(true);
    });

    test('should return undefined for non-existent shape', () => {
      expect(traitManager.get('example#NonExistent')).toBeUndefined();
    });

    test('should return a copy of traits map', () => {
      const traits1 = traitManager.get('example#MyOperation');
      const traits2 = traitManager.get('example#MyOperation');
      expect(traits1).not.toBe(traits2);
    });
  });

  describe('has', () => {
    test('should return true for existing trait', () => {
      expect(traitManager.has('example#MyStructure', SMITHY_TRAITS.DOCUMENTATION)).toBe(true);
    });

    test('should return false for non-existent trait', () => {
      expect(traitManager.has('example#MyStructure', SMITHY_TRAITS.HTTP)).toBe(false);
    });

    test('should return false for non-existent shape', () => {
      expect(traitManager.has('example#NonExistent', SMITHY_TRAITS.DOCUMENTATION)).toBe(false);
    });
  });

  describe('add', () => {
    test('should add a valid trait', () => {
      traitManager.add('example#MyStructure', SMITHY_TRAITS.READONLY, {});
      expect(traitManager.has('example#MyStructure', SMITHY_TRAITS.READONLY)).toBe(true);
    });

    test('should add trait to new shape', () => {
      traitManager.add('example#NewShape', SMITHY_TRAITS.DOCUMENTATION, 'New documentation');
      expect(traitManager.has('example#NewShape', SMITHY_TRAITS.DOCUMENTATION)).toBe(true);
    });

    test('should throw error for invalid trait', () => {
      expect(() => {
        traitManager.add('example#MyStructure', SMITHY_TRAITS.HTTP, { method: 'INVALID' });
      }).toThrow();
    });

    test('should validate HTTP trait', () => {
      expect(() => {
        traitManager.add('example#MyOperation', SMITHY_TRAITS.HTTP, {
          method: 'POST',
          uri: '/test',
        });
      }).not.toThrow();
    });
  });

  describe('remove', () => {
    test('should remove existing trait', () => {
      expect(traitManager.remove('example#MyOperation', SMITHY_TRAITS.READONLY)).toBe(true);
      expect(traitManager.has('example#MyOperation', SMITHY_TRAITS.READONLY)).toBe(false);
    });

    test('should return false for non-existent trait', () => {
      expect(traitManager.remove('example#MyStructure', SMITHY_TRAITS.HTTP)).toBe(false);
    });

    test('should return false for non-existent shape', () => {
      expect(traitManager.remove('example#NonExistent', SMITHY_TRAITS.DOCUMENTATION)).toBe(false);
    });
  });

  describe('validateTrait', () => {
    test('should validate HTTP trait', () => {
      const result = traitManager.validateTrait(SMITHY_TRAITS.HTTP, {
        method: 'GET',
        uri: '/test',
      });
      expect(result.valid).toBe(true);
    });

    test('should reject invalid HTTP trait', () => {
      const result = traitManager.validateTrait(SMITHY_TRAITS.HTTP, {
        method: 'INVALID',
        uri: '/test',
      });
      expect(result.valid).toBe(false);
    });

    test('should validate documentation trait', () => {
      const result = traitManager.validateTrait(SMITHY_TRAITS.DOCUMENTATION, 'Test documentation');
      expect(result.valid).toBe(true);
    });

    test('should validate marker traits', () => {
      const result = traitManager.validateTrait(SMITHY_TRAITS.READONLY, {});
      expect(result.valid).toBe(true);
    });
  });

  describe('getHttpTrait', () => {
    test('should return HTTP trait', () => {
      const httpTrait = traitManager.getHttpTrait('example#MyOperation');
      expect(httpTrait).toBeDefined();
      expect(httpTrait?.method).toBe('GET');
      expect(httpTrait?.uri).toBe('/test/{id}');
      expect(httpTrait?.code).toBe(200);
    });

    test('should return undefined for shape without HTTP trait', () => {
      expect(traitManager.getHttpTrait('example#MyStructure')).toBeUndefined();
    });

    test('should return undefined for non-existent shape', () => {
      expect(traitManager.getHttpTrait('example#NonExistent')).toBeUndefined();
    });
  });

  describe('getDocumentation', () => {
    test('should return documentation string', () => {
      const doc = traitManager.getDocumentation('example#MyStructure');
      expect(doc).toBe('A test structure');
    });

    test('should return undefined for shape without documentation', () => {
      expect(traitManager.getDocumentation('example#MyOperation')).toBeUndefined();
    });

    test('should handle documentation as object', () => {
      traitManager.add('example#TestShape', SMITHY_TRAITS.DOCUMENTATION, 'Test doc');
      const doc = traitManager.getDocumentation('example#TestShape');
      expect(doc).toBe('Test doc');
    });
  });

  describe('isRequired', () => {
    test('should return true for required trait', () => {
      traitManager.add('example#TestShape', SMITHY_TRAITS.REQUIRED, {});
      expect(traitManager.isRequired('example#TestShape')).toBe(true);
    });

    test('should return false for shape without required trait', () => {
      expect(traitManager.isRequired('example#MyStructure')).toBe(false);
    });
  });

  describe('isReadonly', () => {
    test('should return true for readonly trait', () => {
      expect(traitManager.isReadonly('example#MyOperation')).toBe(true);
    });

    test('should return false for shape without readonly trait', () => {
      expect(traitManager.isReadonly('example#MyStructure')).toBe(false);
    });
  });

  describe('isIdempotent', () => {
    test('should return true for idempotent trait', () => {
      traitManager.add('example#TestOp', SMITHY_TRAITS.IDEMPOTENT, {});
      expect(traitManager.isIdempotent('example#TestOp')).toBe(true);
    });

    test('should return false for shape without idempotent trait', () => {
      expect(traitManager.isIdempotent('example#MyOperation')).toBe(false);
    });
  });

  describe('getHttpError', () => {
    test('should return HTTP error code', () => {
      traitManager.add('example#MyError', SMITHY_TRAITS.HTTP_ERROR, 404);
      expect(traitManager.getHttpError('example#MyError')).toBe(404);
    });

    test('should return undefined for shape without HTTP error trait', () => {
      expect(traitManager.getHttpError('example#MyStructure')).toBeUndefined();
    });
  });

  describe('getPaginated', () => {
    test('should return paginated trait', () => {
      const paginatedValue = {
        inputToken: 'nextToken',
        outputToken: 'nextToken',
        items: 'items',
      };
      traitManager.add('example#ListOp', SMITHY_TRAITS.PAGINATED, paginatedValue);
      const paginated = traitManager.getPaginated('example#ListOp');
      expect(paginated).toEqual(paginatedValue);
    });

    test('should return undefined for shape without paginated trait', () => {
      expect(traitManager.getPaginated('example#MyOperation')).toBeUndefined();
    });
  });

  describe('hasHttpLabel', () => {
    test('should return true for HTTP label trait', () => {
      traitManager.add('example#TestMember', SMITHY_TRAITS.HTTP_LABEL, {});
      expect(traitManager.hasHttpLabel('example#TestMember')).toBe(true);
    });

    test('should return false for shape without HTTP label trait', () => {
      expect(traitManager.hasHttpLabel('example#MyStructure')).toBe(false);
    });
  });

  describe('getHttpQuery', () => {
    test('should return HTTP query parameter name', () => {
      traitManager.add('example#TestMember', SMITHY_TRAITS.HTTP_QUERY, 'queryParam');
      expect(traitManager.getHttpQuery('example#TestMember')).toBe('queryParam');
    });

    test('should return undefined for shape without HTTP query trait', () => {
      expect(traitManager.getHttpQuery('example#MyStructure')).toBeUndefined();
    });
  });

  describe('getHttpHeader', () => {
    test('should return HTTP header name', () => {
      traitManager.add('example#TestMember', SMITHY_TRAITS.HTTP_HEADER, 'X-Custom-Header');
      expect(traitManager.getHttpHeader('example#TestMember')).toBe('X-Custom-Header');
    });

    test('should return undefined for shape without HTTP header trait', () => {
      expect(traitManager.getHttpHeader('example#MyStructure')).toBeUndefined();
    });
  });

  describe('hasHttpPayload', () => {
    test('should return true for HTTP payload trait', () => {
      traitManager.add('example#TestMember', SMITHY_TRAITS.HTTP_PAYLOAD, {});
      expect(traitManager.hasHttpPayload('example#TestMember')).toBe(true);
    });

    test('should return false for shape without HTTP payload trait', () => {
      expect(traitManager.hasHttpPayload('example#MyStructure')).toBe(false);
    });
  });

  describe('findShapesByTrait', () => {
    test('should find shapes with specific trait', () => {
      const shapes = traitManager.findShapesByTrait(SMITHY_TRAITS.READONLY);
      expect(shapes).toContain('example#MyOperation');
      expect(shapes.length).toBe(1);
    });

    test('should return empty array for non-existent trait', () => {
      const shapes = traitManager.findShapesByTrait('example#NonExistentTrait');
      expect(shapes).toEqual([]);
    });

    test('should find multiple shapes with same trait', () => {
      traitManager.add('example#AnotherOp', SMITHY_TRAITS.READONLY, {});
      const shapes = traitManager.findShapesByTrait(SMITHY_TRAITS.READONLY);
      expect(shapes.length).toBe(2);
    });
  });

  describe('getTrait', () => {
    test('should return specific trait value', () => {
      const httpTrait = traitManager.getTrait('example#MyOperation', SMITHY_TRAITS.HTTP);
      expect(httpTrait).toBeDefined();
      expect((httpTrait as any).method).toBe('GET');
    });

    test('should return undefined for non-existent trait', () => {
      expect(traitManager.getTrait('example#MyStructure', SMITHY_TRAITS.HTTP)).toBeUndefined();
    });
  });

  describe('clearShape', () => {
    test('should clear all traits for a shape', () => {
      traitManager.clearShape('example#MyOperation');
      expect(traitManager.get('example#MyOperation')).toBeUndefined();
    });

    test('should not affect other shapes', () => {
      traitManager.clearShape('example#MyOperation');
      expect(traitManager.has('example#MyStructure', SMITHY_TRAITS.DOCUMENTATION)).toBe(true);
    });
  });

  describe('clear', () => {
    test('should clear all traits', () => {
      traitManager.clear();
      expect(traitManager.get('example#MyStructure')).toBeUndefined();
      expect(traitManager.get('example#MyOperation')).toBeUndefined();
    });
  });

  describe('toObject', () => {
    test('should convert traits to plain object', () => {
      const obj = traitManager.toObject();
      expect(obj['example#MyStructure']).toBeDefined();
      expect(obj['example#MyStructure'][SMITHY_TRAITS.DOCUMENTATION]).toBe('A test structure');
      expect(obj['example#MyOperation']).toBeDefined();
      expect(obj['example#MyOperation'][SMITHY_TRAITS.HTTP]).toBeDefined();
    });

    test('should return empty object for empty manager', () => {
      const emptyManager = new TraitManager({});
      expect(emptyManager.toObject()).toEqual({});
    });
  });
});
