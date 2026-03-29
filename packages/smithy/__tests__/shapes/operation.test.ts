/**
 * Tests for OperationShape
 */

import { describe, expect, test } from 'bun:test';
import { OperationShape } from '../../src/shapes/operation';

describe('OperationShape', () => {
  test('should create empty operation', () => {
    const shape = new OperationShape();
    expect(shape.type).toBe('operation');
    expect(shape.input).toBeUndefined();
    expect(shape.output).toBeUndefined();
  });

  test('should create operation with input and output', () => {
    const shape = new OperationShape('example#Input', 'example#Output');
    expect(shape.input).toBe('example#Input');
    expect(shape.output).toBe('example#Output');
  });

  test('should set input', () => {
    const shape = new OperationShape();
    shape.setInput('example#Input');
    expect(shape.getInput()).toBe('example#Input');
  });

  test('should set output', () => {
    const shape = new OperationShape();
    shape.setOutput('example#Output');
    expect(shape.getOutput()).toBe('example#Output');
  });

  test('should add error', () => {
    const shape = new OperationShape();
    shape.addError('example#BadRequestError');
    expect(shape.errors).toContain('example#BadRequestError');
  });

  test('should not add duplicate error', () => {
    const shape = new OperationShape();
    shape.addError('example#BadRequestError');
    shape.addError('example#BadRequestError');
    expect(shape.errors).toHaveLength(1);
  });

  test('should remove error', () => {
    const shape = new OperationShape(undefined, undefined, ['example#BadRequestError']);
    const removed = shape.removeError('example#BadRequestError');
    expect(removed).toBe(true);
    expect(shape.errors).toHaveLength(0);
  });

  test('should get errors', () => {
    const errors = ['example#Error1', 'example#Error2'];
    const shape = new OperationShape(undefined, undefined, errors);
    expect(shape.getErrors()).toEqual(errors);
  });

  test('should convert to object', () => {
    const shape = new OperationShape('example#Input', 'example#Output', ['example#Error1']);
    const obj = shape.toObject();
    expect(obj.type).toBe('operation');
    expect(obj.input).toBe('example#Input');
    expect(obj.output).toBe('example#Output');
    expect(obj.errors).toBeDefined();
  });
});
