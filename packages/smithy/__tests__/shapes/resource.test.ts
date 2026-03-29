/**
 * Tests for ResourceShape
 */

import { describe, expect, test } from 'bun:test';
import { ResourceShape } from '../../src/shapes/resource';

describe('ResourceShape', () => {
  test('should create empty resource', () => {
    const shape = new ResourceShape();
    expect(shape.type).toBe('resource');
    expect(shape.identifiers).toBeUndefined();
  });

  test('should create resource with identifiers', () => {
    const identifiers = { id: 'smithy.api#String' };
    const shape = new ResourceShape(identifiers);
    expect(shape.identifiers).toEqual(identifiers);
  });

  test('should set lifecycle operation', () => {
    const shape = new ResourceShape();
    shape.setLifecycleOperation('create', 'example#CreateOp');
    expect(shape.create).toBe('example#CreateOp');
  });

  test('should get lifecycle operation', () => {
    const shape = new ResourceShape();
    shape.setLifecycleOperation('read', 'example#ReadOp');
    expect(shape.getLifecycleOperation('read')).toBe('example#ReadOp');
  });

  test('should add instance operation', () => {
    const shape = new ResourceShape();
    shape.addOperation('example#CustomOp');
    expect(shape.operations).toContain('example#CustomOp');
  });

  test('should remove instance operation', () => {
    const shape = new ResourceShape();
    shape.addOperation('example#CustomOp');
    const removed = shape.removeOperation('example#CustomOp');
    expect(removed).toBe(true);
    expect(shape.operations).toHaveLength(0);
  });

  test('should add collection operation', () => {
    const shape = new ResourceShape();
    shape.addCollectionOperation('example#ListOp');
    expect(shape.collectionOperations).toContain('example#ListOp');
  });

  test('should remove collection operation', () => {
    const shape = new ResourceShape();
    shape.addCollectionOperation('example#ListOp');
    const removed = shape.removeCollectionOperation('example#ListOp');
    expect(removed).toBe(true);
    expect(shape.collectionOperations).toHaveLength(0);
  });

  test('should add child resource', () => {
    const shape = new ResourceShape();
    shape.addResource('example#ChildResource');
    expect(shape.resources).toContain('example#ChildResource');
  });

  test('should remove child resource', () => {
    const shape = new ResourceShape();
    shape.addResource('example#ChildResource');
    const removed = shape.removeResource('example#ChildResource');
    expect(removed).toBe(true);
    expect(shape.resources).toHaveLength(0);
  });

  test('should convert to object', () => {
    const shape = new ResourceShape({ id: 'smithy.api#String' }, { name: 'smithy.api#String' });
    shape.setLifecycleOperation('create', 'example#CreateOp');
    shape.addOperation('example#CustomOp');
    const obj = shape.toObject();
    expect(obj.type).toBe('resource');
    expect(obj.identifiers).toBeDefined();
    expect(obj.properties).toBeDefined();
    expect(obj.create).toBe('example#CreateOp');
    expect(obj.operations).toBeDefined();
  });
});
