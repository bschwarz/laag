/**
 * Tests for ShapeManager
 */

import { beforeEach, describe, expect, test } from 'bun:test';
import { ShapeManager } from '../../src/shapes/shape-manager';
import type { OperationShape, Shape, StructureShape } from '../../src/types';

describe('ShapeManager', () => {
  let manager: ShapeManager;

  const testShapes: Record<string, Shape> = {
    'example.test#String': {
      type: 'string',
    },
    'example.test#Integer': {
      type: 'integer',
    },
    'example.test#MyStructure': {
      type: 'structure',
      members: {
        name: {
          target: 'example.test#String',
          traits: {
            'smithy.api#required': {},
          },
        },
        age: {
          target: 'example.test#Integer',
        },
      },
      traits: {
        'smithy.api#documentation': 'A test structure',
      },
    },
    'example.test#MyService': {
      type: 'service',
      version: '1.0',
      operations: ['example.test#MyOperation'],
    },
    'example.test#MyOperation': {
      type: 'operation',
      input: 'example.test#MyStructure',
      traits: {
        'smithy.api#http': {
          method: 'POST',
          uri: '/test',
        },
      },
    },
  };

  beforeEach(() => {
    manager = new ShapeManager(testShapes);
  });

  describe('constructor', () => {
    test('should initialize with shapes', () => {
      expect(manager.size()).toBe(5);
    });

    test('should initialize with empty shapes', () => {
      const emptyManager = new ShapeManager();
      expect(emptyManager.size()).toBe(0);
    });
  });

  describe('get', () => {
    test('should retrieve existing shape', () => {
      const shape = manager.get('example.test#String');
      expect(shape).toBeDefined();
      expect(shape?.type).toBe('string');
    });

    test('should return undefined for non-existent shape', () => {
      const shape = manager.get('example.test#NonExistent');
      expect(shape).toBeUndefined();
    });
  });

  describe('getAll', () => {
    test('should return all shapes', () => {
      const allShapes = manager.getAll();
      expect(allShapes.size).toBe(5);
      expect(allShapes.has('example.test#String')).toBe(true);
      expect(allShapes.has('example.test#MyStructure')).toBe(true);
    });

    test('should return a copy of the map', () => {
      const allShapes = manager.getAll();
      allShapes.clear();
      expect(manager.size()).toBe(5);
    });
  });

  describe('getByType', () => {
    test('should filter shapes by type', () => {
      const structures = manager.getByType('structure');
      expect(structures.length).toBe(1);
      expect(structures[0]?.type).toBe('structure');
    });

    test('should return empty array for non-existent type', () => {
      const resources = manager.getByType('resource');
      expect(resources.length).toBe(0);
    });

    test('should return multiple shapes of same type', () => {
      manager.add('example.test#AnotherString', { type: 'string' });
      const strings = manager.getByType('string');
      expect(strings.length).toBe(2);
    });
  });

  describe('add', () => {
    test('should add new shape', () => {
      const newShape: Shape = { type: 'boolean' };
      manager.add('example.test#Boolean', newShape);
      expect(manager.has('example.test#Boolean')).toBe(true);
      expect(manager.size()).toBe(6);
    });

    test('should overwrite existing shape', () => {
      const newShape: Shape = { type: 'long' };
      manager.add('example.test#String', newShape);
      const retrieved = manager.get('example.test#String');
      expect(retrieved?.type).toBe('long');
      expect(manager.size()).toBe(5);
    });
  });

  describe('remove', () => {
    test('should remove existing shape', () => {
      const removed = manager.remove('example.test#String');
      expect(removed).toBe(true);
      expect(manager.has('example.test#String')).toBe(false);
      expect(manager.size()).toBe(4);
    });

    test('should return false for non-existent shape', () => {
      const removed = manager.remove('example.test#NonExistent');
      expect(removed).toBe(false);
      expect(manager.size()).toBe(5);
    });
  });

  describe('has', () => {
    test('should return true for existing shape', () => {
      expect(manager.has('example.test#String')).toBe(true);
    });

    test('should return false for non-existent shape', () => {
      expect(manager.has('example.test#NonExistent')).toBe(false);
    });
  });

  describe('resolveTarget', () => {
    test('should resolve shape by ID', () => {
      const shape = manager.resolveTarget('example.test#String');
      expect(shape).toBeDefined();
      expect(shape?.type).toBe('string');
    });

    test('should return undefined for non-existent target', () => {
      const shape = manager.resolveTarget('example.test#NonExistent');
      expect(shape).toBeUndefined();
    });
  });

  describe('getMembers', () => {
    test('should get members of structure', () => {
      const members = manager.getMembers('example.test#MyStructure');
      expect(members).toBeDefined();
      expect(members?.size).toBe(2);
      expect(members?.has('name')).toBe(true);
      expect(members?.has('age')).toBe(true);
    });

    test('should return empty map for structure with no members', () => {
      manager.add('example.test#EmptyStructure', {
        type: 'structure',
      });
      const members = manager.getMembers('example.test#EmptyStructure');
      expect(members).toBeDefined();
      expect(members?.size).toBe(0);
    });

    test('should return undefined for non-structure shape', () => {
      const members = manager.getMembers('example.test#String');
      expect(members).toBeUndefined();
    });

    test('should return undefined for non-existent shape', () => {
      const members = manager.getMembers('example.test#NonExistent');
      expect(members).toBeUndefined();
    });

    test('should get members of union', () => {
      manager.add('example.test#MyUnion', {
        type: 'union',
        members: {
          stringValue: { target: 'example.test#String' },
          intValue: { target: 'example.test#Integer' },
        },
      });
      const members = manager.getMembers('example.test#MyUnion');
      expect(members).toBeDefined();
      expect(members?.size).toBe(2);
    });
  });

  describe('findShapesByTrait', () => {
    test('should find shapes with specific trait', () => {
      const shapesWithDoc = manager.findShapesByTrait('smithy.api#documentation');
      expect(shapesWithDoc.length).toBe(1);
      expect((shapesWithDoc[0] as StructureShape).type).toBe('structure');
    });

    test('should find shapes with http trait', () => {
      const shapesWithHttp = manager.findShapesByTrait('smithy.api#http');
      expect(shapesWithHttp.length).toBe(1);
      expect((shapesWithHttp[0] as OperationShape).type).toBe('operation');
    });

    test('should return empty array for non-existent trait', () => {
      const shapes = manager.findShapesByTrait('smithy.api#nonexistent');
      expect(shapes.length).toBe(0);
    });

    test('should find multiple shapes with same trait', () => {
      manager.add('example.test#AnotherStructure', {
        type: 'structure',
        traits: {
          'smithy.api#documentation': 'Another structure',
        },
      });
      const shapesWithDoc = manager.findShapesByTrait('smithy.api#documentation');
      expect(shapesWithDoc.length).toBe(2);
    });
  });

  describe('getShapeHierarchy', () => {
    test('should return single shape for shape without mixins', () => {
      const hierarchy = manager.getShapeHierarchy('example.test#String');
      expect(hierarchy).toEqual(['example.test#String']);
    });

    test('should return hierarchy for structure with mixins', () => {
      manager.add('example.test#BaseMixin', {
        type: 'structure',
        members: {
          id: { target: 'example.test#String' },
        },
      });
      manager.add('example.test#DerivedStructure', {
        type: 'structure',
        mixins: ['example.test#BaseMixin'],
        members: {
          name: { target: 'example.test#String' },
        },
      });
      const hierarchy = manager.getShapeHierarchy('example.test#DerivedStructure');
      expect(hierarchy).toEqual(['example.test#BaseMixin', 'example.test#DerivedStructure']);
    });

    test('should handle multiple mixins', () => {
      manager.add('example.test#Mixin1', {
        type: 'structure',
      });
      manager.add('example.test#Mixin2', {
        type: 'structure',
      });
      manager.add('example.test#DerivedStructure', {
        type: 'structure',
        mixins: ['example.test#Mixin1', 'example.test#Mixin2'],
      });
      const hierarchy = manager.getShapeHierarchy('example.test#DerivedStructure');
      expect(hierarchy.length).toBe(3);
      expect(hierarchy).toContain('example.test#Mixin1');
      expect(hierarchy).toContain('example.test#Mixin2');
      expect(hierarchy[hierarchy.length - 1]).toBe('example.test#DerivedStructure');
    });

    test('should handle nested mixins', () => {
      manager.add('example.test#BaseMixin', {
        type: 'structure',
      });
      manager.add('example.test#MiddleMixin', {
        type: 'structure',
        mixins: ['example.test#BaseMixin'],
      });
      manager.add('example.test#DerivedStructure', {
        type: 'structure',
        mixins: ['example.test#MiddleMixin'],
      });
      const hierarchy = manager.getShapeHierarchy('example.test#DerivedStructure');
      expect(hierarchy).toEqual([
        'example.test#BaseMixin',
        'example.test#MiddleMixin',
        'example.test#DerivedStructure',
      ]);
    });

    test('should return single shape for non-existent shape', () => {
      const hierarchy = manager.getShapeHierarchy('example.test#NonExistent');
      expect(hierarchy).toEqual(['example.test#NonExistent']);
    });
  });

  describe('getShapeIds', () => {
    test('should return all shape IDs', () => {
      const ids = manager.getShapeIds();
      expect(ids.length).toBe(5);
      expect(ids).toContain('example.test#String');
      expect(ids).toContain('example.test#MyStructure');
    });
  });

  describe('size', () => {
    test('should return correct size', () => {
      expect(manager.size()).toBe(5);
    });

    test('should update after add', () => {
      manager.add('example.test#NewShape', { type: 'string' });
      expect(manager.size()).toBe(6);
    });

    test('should update after remove', () => {
      manager.remove('example.test#String');
      expect(manager.size()).toBe(4);
    });
  });

  describe('clear', () => {
    test('should remove all shapes', () => {
      manager.clear();
      expect(manager.size()).toBe(0);
      expect(manager.getShapeIds().length).toBe(0);
    });
  });

  describe('toObject', () => {
    test('should convert to plain object', () => {
      const obj = manager.toObject();
      expect(Object.keys(obj).length).toBe(5);
      expect(obj['example.test#String']).toBeDefined();
      expect(obj['example.test#String']?.type).toBe('string');
    });

    test('should return empty object for empty manager', () => {
      const emptyManager = new ShapeManager();
      const obj = emptyManager.toObject();
      expect(Object.keys(obj).length).toBe(0);
    });
  });
});
