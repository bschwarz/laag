import { describe, expect, test } from 'bun:test';
import {
  createShapeId,
  equalsShapeId,
  equalsShapeIdWithNamespace,
  extractNamespaces,
  filterByNamespace,
  getName,
  getNamespace,
  isAbsoluteShapeId,
  isRelativeShapeId,
  isValidShapeId,
  matchesNamespace,
  parseShapeId,
  sortShapeIds,
  toAbsoluteShapeId,
} from '../../src/utils/shape-id';

describe('ShapeId Utilities', () => {
  describe('parseShapeId', () => {
    test('should parse absolute shape ID', () => {
      const result = parseShapeId('smithy.api#String');
      expect(result.namespace).toBe('smithy.api');
      expect(result.name).toBe('String');
      expect(result.original).toBe('smithy.api#String');
    });

    test('should parse relative shape ID', () => {
      const result = parseShapeId('MyShape');
      expect(result.namespace).toBeUndefined();
      expect(result.name).toBe('MyShape');
      expect(result.original).toBe('MyShape');
    });

    test('should handle multi-segment namespace', () => {
      const result = parseShapeId('example.weather.v2#GetWeather');
      expect(result.namespace).toBe('example.weather.v2');
      expect(result.name).toBe('GetWeather');
    });
  });

  describe('isValidShapeId', () => {
    test('should validate correct absolute shape IDs', () => {
      expect(isValidShapeId('smithy.api#String')).toBe(true);
      expect(isValidShapeId('example.weather#GetWeather')).toBe(true);
      expect(isValidShapeId('my.namespace_v2#Shape_Name')).toBe(true);
    });

    test('should validate correct relative shape IDs', () => {
      expect(isValidShapeId('MyShape')).toBe(true);
      expect(isValidShapeId('_PrivateShape')).toBe(true);
      expect(isValidShapeId('Shape123')).toBe(true);
    });

    test('should reject invalid shape IDs', () => {
      expect(isValidShapeId('')).toBe(false);
      expect(isValidShapeId('#NoNamespace')).toBe(false);
      expect(isValidShapeId('Invalid#Name#')).toBe(false);
      expect(isValidShapeId('123Invalid')).toBe(false);
      expect(isValidShapeId('invalid-name')).toBe(false);
    });
  });

  describe('isAbsoluteShapeId', () => {
    test('should identify absolute shape IDs', () => {
      expect(isAbsoluteShapeId('smithy.api#String')).toBe(true);
      expect(isAbsoluteShapeId('example#Shape')).toBe(true);
    });

    test('should identify relative shape IDs', () => {
      expect(isAbsoluteShapeId('MyShape')).toBe(false);
    });
  });

  describe('isRelativeShapeId', () => {
    test('should identify relative shape IDs', () => {
      expect(isRelativeShapeId('MyShape')).toBe(true);
    });

    test('should identify absolute shape IDs', () => {
      expect(isRelativeShapeId('smithy.api#String')).toBe(false);
    });
  });

  describe('getNamespace', () => {
    test('should extract namespace from absolute shape ID', () => {
      expect(getNamespace('smithy.api#String')).toBe('smithy.api');
      expect(getNamespace('example.weather#GetWeather')).toBe('example.weather');
    });

    test('should return undefined for relative shape ID', () => {
      expect(getNamespace('MyShape')).toBeUndefined();
    });
  });

  describe('getName', () => {
    test('should extract name from absolute shape ID', () => {
      expect(getName('smithy.api#String')).toBe('String');
    });

    test('should extract name from relative shape ID', () => {
      expect(getName('MyShape')).toBe('MyShape');
    });
  });

  describe('createShapeId', () => {
    test('should create absolute shape ID', () => {
      expect(createShapeId('smithy.api', 'String')).toBe('smithy.api#String');
      expect(createShapeId('example', 'MyShape')).toBe('example#MyShape');
    });
  });

  describe('toAbsoluteShapeId', () => {
    test('should convert relative to absolute', () => {
      expect(toAbsoluteShapeId('MyShape', 'example')).toBe('example#MyShape');
    });

    test('should keep absolute shape ID unchanged', () => {
      expect(toAbsoluteShapeId('smithy.api#String', 'example')).toBe('smithy.api#String');
    });
  });

  describe('equalsShapeId', () => {
    test('should compare shape IDs for equality', () => {
      expect(equalsShapeId('smithy.api#String', 'smithy.api#String')).toBe(true);
      expect(equalsShapeId('MyShape', 'MyShape')).toBe(true);
      expect(equalsShapeId('smithy.api#String', 'MyShape')).toBe(false);
    });
  });

  describe('equalsShapeIdWithNamespace', () => {
    test('should compare with default namespace', () => {
      expect(equalsShapeIdWithNamespace('MyShape', 'example#MyShape', 'example')).toBe(true);
      expect(equalsShapeIdWithNamespace('MyShape', 'other#MyShape', 'example')).toBe(false);
    });
  });

  describe('matchesNamespace', () => {
    test('should match namespace', () => {
      expect(matchesNamespace('smithy.api#String', 'smithy.api')).toBe(true);
      expect(matchesNamespace('example#MyShape', 'smithy.api')).toBe(false);
      expect(matchesNamespace('MyShape', 'smithy.api')).toBe(false);
    });
  });

  describe('extractNamespaces', () => {
    test('should extract unique namespaces', () => {
      const shapeIds = [
        'smithy.api#String',
        'example.weather#GetWeather',
        'example.weather#City',
        'MyShape',
      ];
      const namespaces = extractNamespaces(shapeIds);
      expect(namespaces).toContain('smithy.api');
      expect(namespaces).toContain('example.weather');
      expect(namespaces.length).toBe(2);
    });
  });

  describe('filterByNamespace', () => {
    test('should filter by namespace', () => {
      const shapeIds = ['smithy.api#String', 'example.weather#GetWeather', 'example.weather#City'];
      const filtered = filterByNamespace(shapeIds, 'example.weather');
      expect(filtered).toEqual(['example.weather#GetWeather', 'example.weather#City']);
    });
  });

  describe('sortShapeIds', () => {
    test('should sort shape IDs alphabetically', () => {
      const shapeIds = [
        'example.weather#City',
        'MyShape',
        'smithy.api#String',
        'example.weather#GetWeather',
      ];
      const sorted = sortShapeIds(shapeIds);
      expect(sorted).toEqual([
        'MyShape',
        'example.weather#City',
        'example.weather#GetWeather',
        'smithy.api#String',
      ]);
    });
  });
});
