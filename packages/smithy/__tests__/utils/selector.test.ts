import { describe, expect, test } from 'bun:test';
import type { Shape, ShapeId } from '../../src/types';
import {
  createSelectorQuery,
  isValidSelector,
  matchSelector,
  parseSelector,
  selectByNamespace,
  selectByTrait,
  selectByType,
  selectShapes,
} from '../../src/utils/selector';

describe('Selector Utilities', () => {
  // Test fixtures
  const testShapes = new Map<ShapeId, Shape>([
    [
      'example#MyStructure',
      {
        type: 'structure',
        members: {
          name: { target: 'smithy.api#String' },
        },
        traits: {
          'smithy.api#required': {},
        },
      },
    ],
    [
      'example#MyService',
      {
        type: 'service',
        version: '1.0',
        operations: ['example#GetData'],
      },
    ],
    [
      'example#GetData',
      {
        type: 'operation',
        input: { target: 'example#GetDataInput' },
        output: { target: 'example#GetDataOutput' },
        traits: {
          'smithy.api#readonly': {},
          'smithy.api#http': {
            method: 'GET',
            uri: '/data',
          },
        },
      },
    ],
    [
      'smithy.api#String',
      {
        type: 'string',
      },
    ],
  ]);

  describe('parseSelector', () => {
    test('should parse wildcard selector', () => {
      const tokens = parseSelector('*');
      expect(tokens).toHaveLength(1);
      expect(tokens[0].type).toBe('wildcard');
    });

    test('should parse type selector', () => {
      const tokens = parseSelector('structure');
      expect(tokens).toHaveLength(1);
      expect(tokens[0].type).toBe('type');
      expect(tokens[0].value).toBe('structure');
    });

    test('should parse trait selector', () => {
      const tokens = parseSelector('[trait|required]');
      expect(tokens).toHaveLength(1);
      expect(tokens[0].type).toBe('trait');
      expect(tokens[0].value).toBe('required');
    });

    test('should parse attribute selector', () => {
      const tokens = parseSelector('[id|namespace = example]');
      expect(tokens).toHaveLength(1);
      expect(tokens[0].type).toBe('attribute');
      expect(tokens[0].value).toBe('namespace');
      expect(tokens[0].operator).toBe('=');
      expect(tokens[0].argument).toBe('example');
    });
  });

  describe('matchSelector', () => {
    test('should match wildcard selector', () => {
      const shape: Shape = { type: 'structure' };
      const result = matchSelector(shape, 'example#MyShape', '*', { shapes: testShapes });
      expect(result).toBe(true);
    });

    test('should match type selector', () => {
      const shape: Shape = { type: 'structure' };
      const result = matchSelector(shape, 'example#MyShape', 'structure', { shapes: testShapes });
      expect(result).toBe(true);
    });

    test('should not match wrong type', () => {
      const shape: Shape = { type: 'structure' };
      const result = matchSelector(shape, 'example#MyShape', 'service', { shapes: testShapes });
      expect(result).toBe(false);
    });

    test('should match trait selector', () => {
      const shape: Shape = {
        type: 'structure',
        traits: { 'smithy.api#required': {} },
      };
      const result = matchSelector(shape, 'example#MyShape', '[trait|required]', {
        shapes: testShapes,
      });
      expect(result).toBe(true);
    });

    test('should not match missing trait', () => {
      const shape: Shape = { type: 'structure' };
      const result = matchSelector(shape, 'example#MyShape', '[trait|required]', {
        shapes: testShapes,
      });
      expect(result).toBe(false);
    });
  });

  describe('selectShapes', () => {
    test('should select all shapes with wildcard', () => {
      const results = selectShapes('*', testShapes);
      expect(results).toHaveLength(4);
    });

    test('should select shapes by type', () => {
      const results = selectShapes('structure', testShapes);
      expect(results).toHaveLength(1);
      expect(results[0].shape.type).toBe('structure');
    });

    test('should select shapes by trait', () => {
      const results = selectShapes('[trait|readonly]', testShapes);
      expect(results).toHaveLength(1);
      expect(results[0].shapeId).toBe('example#GetData');
    });
  });

  describe('selectByType', () => {
    test('should select structures', () => {
      const results = selectByType('structure', testShapes);
      expect(results).toHaveLength(1);
      expect(results[0].shape.type).toBe('structure');
    });

    test('should select services', () => {
      const results = selectByType('service', testShapes);
      expect(results).toHaveLength(1);
      expect(results[0].shape.type).toBe('service');
    });

    test('should select operations', () => {
      const results = selectByType('operation', testShapes);
      expect(results).toHaveLength(1);
      expect(results[0].shape.type).toBe('operation');
    });
  });

  describe('selectByTrait', () => {
    test('should select shapes with required trait', () => {
      const results = selectByTrait('required', testShapes);
      expect(results).toHaveLength(1);
      expect(results[0].shapeId).toBe('example#MyStructure');
    });

    test('should select shapes with readonly trait', () => {
      const results = selectByTrait('readonly', testShapes);
      expect(results).toHaveLength(1);
      expect(results[0].shapeId).toBe('example#GetData');
    });
  });

  describe('selectByNamespace', () => {
    test('should select shapes in example namespace', () => {
      const results = selectByNamespace('example', testShapes);
      expect(results).toHaveLength(3);
    });

    test('should select shapes in smithy.api namespace', () => {
      const results = selectByNamespace('smithy.api', testShapes);
      expect(results).toHaveLength(1);
      expect(results[0].shapeId).toBe('smithy.api#String');
    });
  });

  describe('createSelectorQuery', () => {
    test('should filter by type', () => {
      const query = createSelectorQuery(testShapes);
      const results = query.type('structure').execute();
      expect(results).toHaveLength(1);
      expect(results[0].shape.type).toBe('structure');
    });

    test('should filter by trait', () => {
      const query = createSelectorQuery(testShapes);
      const results = query.trait('readonly').execute();
      expect(results).toHaveLength(1);
      expect(results[0].shapeId).toBe('example#GetData');
    });

    test('should filter by namespace', () => {
      const query = createSelectorQuery(testShapes);
      const results = query.namespace('example').execute();
      expect(results).toHaveLength(3);
    });

    test('should chain multiple filters', () => {
      const query = createSelectorQuery(testShapes);
      const results = query.type('operation').trait('readonly').execute();
      expect(results).toHaveLength(1);
      expect(results[0].shapeId).toBe('example#GetData');
    });

    test('should get shape IDs only', () => {
      const query = createSelectorQuery(testShapes);
      const shapeIds = query.type('structure').shapeIds();
      expect(shapeIds).toEqual(['example#MyStructure']);
    });

    test('should get count', () => {
      const query = createSelectorQuery(testShapes);
      const count = query.type('structure').count();
      expect(count).toBe(1);
    });

    test('should get first match', () => {
      const query = createSelectorQuery(testShapes);
      const first = query.type('structure').first();
      expect(first?.shapeId).toBe('example#MyStructure');
    });
  });

  describe('isValidSelector', () => {
    test('should validate correct selectors', () => {
      expect(isValidSelector('*')).toBe(true);
      expect(isValidSelector('structure')).toBe(true);
      expect(isValidSelector('[trait|required]')).toBe(true);
    });

    test('should reject empty selector', () => {
      expect(isValidSelector('')).toBe(false);
    });
  });
});
