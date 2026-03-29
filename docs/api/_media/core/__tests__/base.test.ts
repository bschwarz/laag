/**
 * Unit tests for LaagBase class
 */

import { beforeEach, describe, expect, test } from 'bun:test';
import { LaagBase } from '../src/base.js';
import { ParseError, ValidationError } from '../src/errors.js';
import type { ValidationResult } from '../src/types.js';

// Concrete implementation for testing the abstract LaagBase class
class TestLaagBase extends LaagBase {
  validate(): ValidationResult {
    return {
      valid: true,
      errors: [],
    };
  }

  // Expose protected methods for testing
  public testDictKeysExists(obj: Record<string, any>, ...keys: string[]): boolean {
    return this.dictKeysExists(obj, ...keys);
  }

  public testGetExtensions(level?: string) {
    return this.getExtensions(level);
  }

  public testSetExtensions(values: Record<string, any>, level?: string) {
    return this.setExtensions(values, level);
  }

  public testGetNestedValue(obj: Record<string, any>, path: string) {
    return this.getNestedValue(obj, path);
  }

  public testSetNestedValue(obj: Record<string, any>, path: string, value: any) {
    return this.setNestedValue(obj, path, value);
  }
}

describe('LaagBase', () => {
  let instance: TestLaagBase;

  beforeEach(() => {
    instance = new TestLaagBase();
  });

  describe('constructor', () => {
    test('should initialize with empty document when no input provided', () => {
      const base = new TestLaagBase();
      expect(base.getDocument()).toEqual({});
    });

    test('should initialize with provided object document', () => {
      const doc = { test: 'value', nested: { key: 'value' } };
      const base = new TestLaagBase(doc);
      expect(base.getDocument()).toEqual(doc);
    });

    test('should parse JSON string document', () => {
      const doc = { test: 'value', number: 42 };
      const jsonString = JSON.stringify(doc);
      const base = new TestLaagBase(jsonString);
      expect(base.getDocument()).toEqual(doc);
    });

    test('should throw ParseError for invalid JSON string', () => {
      expect(() => {
        new TestLaagBase('invalid json {');
      }).toThrow(ParseError);
    });

    test('should include original error context in ParseError', () => {
      try {
        new TestLaagBase('invalid json {');
      } catch (error) {
        expect(error).toBeInstanceOf(ParseError);
        expect((error as ParseError).context).toBeDefined();
        expect((error as ParseError).context?.originalError).toBeDefined();
      }
    });

    test('should accept error handling options', () => {
      const options = { includeContext: false, development: false };
      const base = new TestLaagBase({}, options);
      expect(base).toBeInstanceOf(TestLaagBase);
    });
  });

  describe('dictKeysExists', () => {
    test('should return true when all keys exist', () => {
      const obj = { a: 1, b: 2, c: { d: 3 } };
      expect(instance.testDictKeysExists(obj, 'a', 'b')).toBe(true);
    });

    test('should return false when any key is missing', () => {
      const obj = { a: 1, b: 2 };
      expect(instance.testDictKeysExists(obj, 'a', 'c')).toBe(false);
    });

    test('should handle nested keys with dot notation', () => {
      const obj = { a: { b: { c: 'value' } } };
      expect(instance.testDictKeysExists(obj, 'a.b.c')).toBe(true);
      expect(instance.testDictKeysExists(obj, 'a.b.d')).toBe(false);
    });

    test('should return false for null or undefined objects', () => {
      expect(instance.testDictKeysExists(null as any, 'key')).toBe(false);
      expect(instance.testDictKeysExists(undefined as any, 'key')).toBe(false);
    });

    test('should return false for non-object values', () => {
      expect(instance.testDictKeysExists('string' as any, 'key')).toBe(false);
      expect(instance.testDictKeysExists(123 as any, 'key')).toBe(false);
    });

    test('should handle empty key list', () => {
      const obj = { a: 1 };
      expect(instance.testDictKeysExists(obj)).toBe(true);
    });

    test('should handle mixed simple and nested keys', () => {
      const obj = { a: 1, b: { c: 2 } };
      expect(instance.testDictKeysExists(obj, 'a', 'b.c')).toBe(true);
      expect(instance.testDictKeysExists(obj, 'a', 'b.d')).toBe(false);
    });
  });

  describe('getExtensions', () => {
    test('should return empty object when no extensions exist', () => {
      const base = new TestLaagBase({ regular: 'property' });
      expect(base.testGetExtensions()).toEqual({});
    });

    test('should return all x-* properties from root level', () => {
      const doc = {
        regular: 'property',
        'x-custom': 'value',
        'x-another': { nested: 'value' },
      };
      const base = new TestLaagBase(doc);
      const extensions = base.testGetExtensions();

      expect(extensions).toEqual({
        'x-custom': 'value',
        'x-another': { nested: 'value' },
      });
    });

    test('should return extensions from specific level', () => {
      const doc = {
        info: {
          title: 'API',
          'x-info-ext': 'info extension',
        },
        'x-root-ext': 'root extension',
      };
      const base = new TestLaagBase(doc);
      const extensions = base.testGetExtensions('info');

      expect(extensions).toEqual({
        'x-info-ext': 'info extension',
      });
    });

    test('should return empty object for invalid level path', () => {
      const base = new TestLaagBase({ info: { title: 'API' } });
      expect(base.testGetExtensions('nonexistent')).toEqual({});
    });

    test('should return empty object for non-object level', () => {
      const base = new TestLaagBase({ info: 'string value' });
      expect(base.testGetExtensions('info')).toEqual({});
    });
  });

  describe('setExtensions', () => {
    test('should set extensions at root level', () => {
      const base = new TestLaagBase({ existing: 'property' });
      base.testSetExtensions({ 'x-custom': 'value' });

      const doc = base.getDocument();
      expect(doc['x-custom']).toBe('value');
      expect(doc.existing).toBe('property');
    });

    test('should set extensions at specific level', () => {
      const base = new TestLaagBase({ info: { title: 'API' } });
      base.testSetExtensions({ 'x-info-ext': 'value' }, 'info');

      const doc = base.getDocument();
      expect((doc.info as any)['x-info-ext']).toBe('value');
      expect((doc.info as any).title).toBe('API');
    });

    test('should throw ValidationError for invalid extension keys', () => {
      const base = new TestLaagBase();

      expect(() => {
        base.testSetExtensions({ 'invalid-key': 'value' });
      }).toThrow(ValidationError);
    });

    test('should throw ValidationError for invalid level path', () => {
      const base = new TestLaagBase();

      expect(() => {
        base.testSetExtensions({ 'x-valid': 'value' }, 'nonexistent');
      }).toThrow(ValidationError);
    });

    test('should overwrite existing extensions', () => {
      const base = new TestLaagBase({ 'x-existing': 'old value' });
      base.testSetExtensions({ 'x-existing': 'new value' });

      expect(base.getDocument()['x-existing']).toBe('new value');
    });
  });

  describe('getNestedValue', () => {
    test('should get simple property', () => {
      const obj = { a: 'value' };
      expect(instance.testGetNestedValue(obj, 'a')).toBe('value');
    });

    test('should get nested property', () => {
      const obj = { a: { b: { c: 'deep value' } } };
      expect(instance.testGetNestedValue(obj, 'a.b.c')).toBe('deep value');
    });

    test('should return undefined for non-existent path', () => {
      const obj = { a: { b: 'value' } };
      expect(instance.testGetNestedValue(obj, 'a.c')).toBeUndefined();
    });

    test('should return undefined for path through non-object', () => {
      const obj = { a: 'string' };
      expect(instance.testGetNestedValue(obj, 'a.b')).toBeUndefined();
    });

    test('should handle null values in path', () => {
      const obj = { a: null };
      expect(instance.testGetNestedValue(obj, 'a.b')).toBeUndefined();
    });
  });

  describe('setNestedValue', () => {
    test('should set simple property', () => {
      const obj = {};
      instance.testSetNestedValue(obj, 'a', 'value');
      expect(obj).toEqual({ a: 'value' });
    });

    test('should set nested property', () => {
      const obj = {};
      instance.testSetNestedValue(obj, 'a.b.c', 'deep value');
      expect(obj).toEqual({ a: { b: { c: 'deep value' } } });
    });

    test('should create intermediate objects', () => {
      const obj = { existing: 'value' };
      instance.testSetNestedValue(obj, 'new.nested.prop', 'value');
      expect(obj).toEqual({
        existing: 'value',
        new: { nested: { prop: 'value' } },
      });
    });

    test('should overwrite existing values', () => {
      const obj = { a: { b: 'old' } };
      instance.testSetNestedValue(obj, 'a.b', 'new');
      expect(obj.a.b).toBe('new');
    });

    test('should throw ValidationError for empty path', () => {
      const obj = {};
      expect(() => {
        instance.testSetNestedValue(obj, '', 'value');
      }).toThrow(ValidationError);
    });

    test('should replace non-object intermediate values', () => {
      const obj = { a: 'string' };
      instance.testSetNestedValue(obj, 'a.b', 'value');
      expect(obj).toEqual({ a: { b: 'value' } });
    });
  });

  describe('getDocument', () => {
    test('should return copy of document', () => {
      const original = { a: 1, b: { c: 2 } };
      const base = new TestLaagBase(original);
      const copy = base.getDocument();

      expect(copy).toEqual(original);
      expect(copy).not.toBe(original); // Should be a different object
    });

    test('should return empty object for empty document', () => {
      const base = new TestLaagBase();
      expect(base.getDocument()).toEqual({});
    });
  });

  describe('getDocumentAsJson', () => {
    test('should return minified JSON by default', () => {
      const doc = { a: 1, b: { c: 2 } };
      const base = new TestLaagBase(doc);
      const json = base.getDocumentAsJson();

      expect(json).toBe('{"a":1,"b":{"c":2}}');
    });

    test('should return pretty-printed JSON when requested', () => {
      const doc = { a: 1, b: { c: 2 } };
      const base = new TestLaagBase(doc);
      const json = base.getDocumentAsJson(true);

      expect(json).toBe('{\n  "a": 1,\n  "b": {\n    "c": 2\n  }\n}');
    });

    test('should handle empty document', () => {
      const base = new TestLaagBase();
      expect(base.getDocumentAsJson()).toBe('{}');
    });
  });

  describe('validate', () => {
    test('should call abstract validate method', () => {
      const result = instance.validate();
      expect(result).toEqual({ valid: true, errors: [] });
    });
  });
});
