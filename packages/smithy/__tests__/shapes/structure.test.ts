/**
 * Tests for StructureShape
 */

import { describe, expect, test } from 'bun:test';
import { StructureShape } from '../../src/shapes/structure';

describe('StructureShape', () => {
  test('should create empty structure', () => {
    const shape = new StructureShape();
    expect(shape.type).toBe('structure');
    expect(shape.members).toBeUndefined();
    expect(shape.mixins).toBeUndefined();
  });

  test('should create structure with members', () => {
    const members = {
      name: { target: 'smithy.api#String' },
    };
    const shape = new StructureShape(members);
    expect(shape.members).toEqual(members);
  });

  test('should get member', () => {
    const shape = new StructureShape({
      name: { target: 'smithy.api#String' },
    });
    const member = shape.getMember('name');
    expect(member).toBeDefined();
    expect(member?.target).toBe('smithy.api#String');
  });

  test('should check if member exists', () => {
    const shape = new StructureShape({
      name: { target: 'smithy.api#String' },
    });
    expect(shape.hasMember('name')).toBe(true);
    expect(shape.hasMember('age')).toBe(false);
  });

  test('should set member', () => {
    const shape = new StructureShape();
    shape.setMember('name', { target: 'smithy.api#String' });
    expect(shape.hasMember('name')).toBe(true);
  });

  test('should remove member', () => {
    const shape = new StructureShape({
      name: { target: 'smithy.api#String' },
    });
    const removed = shape.removeMember('name');
    expect(removed).toBe(true);
    expect(shape.hasMember('name')).toBe(false);
  });

  test('should get member names', () => {
    const shape = new StructureShape({
      name: { target: 'smithy.api#String' },
      age: { target: 'smithy.api#Integer' },
    });
    const names = shape.getMemberNames();
    expect(names).toHaveLength(2);
    expect(names).toContain('name');
    expect(names).toContain('age');
  });

  test('should add mixin', () => {
    const shape = new StructureShape();
    shape.addMixin('example#BaseMixin');
    expect(shape.mixins).toContain('example#BaseMixin');
  });

  test('should not add duplicate mixin', () => {
    const shape = new StructureShape();
    shape.addMixin('example#BaseMixin');
    shape.addMixin('example#BaseMixin');
    expect(shape.mixins).toHaveLength(1);
  });

  test('should remove mixin', () => {
    const shape = new StructureShape(undefined, ['example#BaseMixin']);
    const removed = shape.removeMixin('example#BaseMixin');
    expect(removed).toBe(true);
    expect(shape.mixins).toHaveLength(0);
  });

  test('should get mixins', () => {
    const mixins = ['example#Mixin1', 'example#Mixin2'];
    const shape = new StructureShape(undefined, mixins);
    expect(shape.getMixins()).toEqual(mixins);
  });

  test('should convert to object', () => {
    const shape = new StructureShape(
      { name: { target: 'smithy.api#String' } },
      ['example#BaseMixin'],
      { 'smithy.api#documentation': 'Test' }
    );
    const obj = shape.toObject();
    expect(obj.type).toBe('structure');
    expect(obj.members).toBeDefined();
    expect(obj.mixins).toBeDefined();
    expect(obj.traits).toBeDefined();
  });
});
