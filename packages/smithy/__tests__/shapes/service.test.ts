/**
 * Tests for ServiceShape
 */

import { describe, expect, test } from 'bun:test';
import { ServiceShape } from '../../src/shapes/service';

describe('ServiceShape', () => {
  test('should create service with version', () => {
    const shape = new ServiceShape('1.0');
    expect(shape.type).toBe('service');
    expect(shape.version).toBe('1.0');
  });

  test('should add operation', () => {
    const shape = new ServiceShape('1.0');
    shape.addOperation('example#GetWeather');
    expect(shape.operations).toContain('example#GetWeather');
  });

  test('should not add duplicate operation', () => {
    const shape = new ServiceShape('1.0');
    shape.addOperation('example#GetWeather');
    shape.addOperation('example#GetWeather');
    expect(shape.operations).toHaveLength(1);
  });

  test('should remove operation', () => {
    const shape = new ServiceShape('1.0', ['example#GetWeather']);
    const removed = shape.removeOperation('example#GetWeather');
    expect(removed).toBe(true);
    expect(shape.operations).toHaveLength(0);
  });

  test('should get operations', () => {
    const operations = ['example#Op1', 'example#Op2'];
    const shape = new ServiceShape('1.0', operations);
    expect(shape.getOperations()).toEqual(operations);
  });

  test('should add resource', () => {
    const shape = new ServiceShape('1.0');
    shape.addResource('example#WeatherResource');
    expect(shape.resources).toContain('example#WeatherResource');
  });

  test('should remove resource', () => {
    const shape = new ServiceShape('1.0', undefined, ['example#WeatherResource']);
    const removed = shape.removeResource('example#WeatherResource');
    expect(removed).toBe(true);
    expect(shape.resources).toHaveLength(0);
  });

  test('should add error', () => {
    const shape = new ServiceShape('1.0');
    shape.addError('example#BadRequestError');
    expect(shape.errors).toContain('example#BadRequestError');
  });

  test('should remove error', () => {
    const shape = new ServiceShape('1.0', undefined, undefined, ['example#BadRequestError']);
    const removed = shape.removeError('example#BadRequestError');
    expect(removed).toBe(true);
    expect(shape.errors).toHaveLength(0);
  });

  test('should convert to object', () => {
    const shape = new ServiceShape(
      '1.0',
      ['example#Op1'],
      ['example#Resource1'],
      ['example#Error1']
    );
    const obj = shape.toObject();
    expect(obj.type).toBe('service');
    expect(obj.version).toBe('1.0');
    expect(obj.operations).toBeDefined();
    expect(obj.resources).toBeDefined();
    expect(obj.errors).toBeDefined();
  });
});
