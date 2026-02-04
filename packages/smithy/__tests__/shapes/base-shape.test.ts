/**
 * Tests for BaseShape
 */

import { describe, expect, test } from 'bun:test';
import { BaseShape } from '../../src/shapes/base-shape';

describe('BaseShape', () => {
  test('should create shape with type', () => {
    const shape = new BaseShape('string');
    expect(shape.type).toBe('string');
    expect(shape.traits).toBeUndefined();
  });

  test('should create shape with traits', () => {
    const traits = { 'smithy.api#required': {} };
    const shape = new BaseShape('string', traits);
    expect(shape.type).toBe('string');
    expect(shape.traits).toEqual(traits);
  });

  test('should get trait value', () => {
    const shape = new BaseShape('string', { 'smithy.api#documentation': 'Test doc' });
    expect(shape.getTrait('smithy.api#documentation')).toBe('Test doc');
  });

  test('should return undefined for non-existent trait', () => {
    const shape = new BaseShape('string');
    expect(shape.getTrait('smithy.api#nonexistent')).toBeUndefined();
  });

  test('should check if trait exists', () => {
    const shape = new BaseShape('string', { 'smithy.api#required': {} });
    expect(shape.hasTrait('smithy.api#required')).toBe(true);
    expect(shape.hasTrait('smithy.api#nonexistent')).toBe(false);
  });

  test('should set trait', () => {
    const shape = new BaseShape('string');
    shape.setTrait('smithy.api#required', {});
    expect(shape.hasTrait('smithy.api#required')).toBe(true);
  });

  test('should update existing trait', () => {
    const shape = new BaseShape('string', { 'smithy.api#documentation': 'Old doc' });
    shape.setTrait('smithy.api#documentation', 'New doc');
    expect(shape.getTrait('smithy.api#documentation')).toBe('New doc');
  });

  test('should remove trait', () => {
    const shape = new BaseShape('string', { 'smithy.api#required': {} });
    const removed = shape.removeTrait('smithy.api#required');
    expect(removed).toBe(true);
    expect(shape.hasTrait('smithy.api#required')).toBe(false);
  });

  test('should return false when removing non-existent trait', () => {
    const shape = new BaseShape('string');
    const removed = shape.removeTrait('smithy.api#nonexistent');
    expect(removed).toBe(false);
  });

  test('should get all trait IDs', () => {
    const shape = new BaseShape('string', {
      'smithy.api#required': {},
      'smithy.api#documentation': 'Test',
    });
    const traitIds = shape.getTraitIds();
    expect(traitIds).toHaveLength(2);
    expect(traitIds).toContain('smithy.api#required');
    expect(traitIds).toContain('smithy.api#documentation');
  });

  test('should get all traits', () => {
    const traits = {
      'smithy.api#required': {},
      'smithy.api#documentation': 'Test',
    };
    const shape = new BaseShape('string', traits);
    expect(shape.getTraits()).toEqual(traits);
  });

  test('should convert to object', () => {
    const shape = new BaseShape('string', { 'smithy.api#required': {} });
    const obj = shape.toObject();
    expect(obj.type).toBe('string');
    expect(obj.traits).toEqual({ 'smithy.api#required': {} });
  });

  test('should convert to object without traits', () => {
    const shape = new BaseShape('string');
    const obj = shape.toObject();
    expect(obj.type).toBe('string');
    expect(obj.traits).toBeUndefined();
  });
});
