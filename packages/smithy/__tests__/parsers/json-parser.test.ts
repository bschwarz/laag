/**
 * Tests for JSON parser
 */

import { ParseError } from '@laag/core';
import { describe, expect, test } from 'bun:test';
import { JsonParser } from '../../src/parsers/json-parser.js';
import type { SmithyModel } from '../../src/types.js';

describe('JsonParser', () => {
  const parser = new JsonParser();

  describe('parse', () => {
    test('should parse valid JSON string', () => {
      const input = JSON.stringify({
        smithy: '2.0',
        shapes: {},
      });

      const result = parser.parse(input);

      expect(result).toBeDefined();
      expect(result.smithy).toBe('2.0');
      expect(result.shapes).toEqual({});
    });

    test('should parse valid object', () => {
      const input: SmithyModel = {
        smithy: '2.0',
        shapes: {},
      };

      const result = parser.parse(input);

      expect(result).toBeDefined();
      expect(result.smithy).toBe('2.0');
      expect(result.shapes).toEqual({});
    });

    test('should parse model with metadata', () => {
      const input = {
        smithy: '2.0',
        metadata: {
          authors: ['test@example.com'],
        },
        shapes: {},
      };

      const result = parser.parse(input);

      expect(result.metadata).toBeDefined();
      expect(result.metadata?.authors).toEqual(['test@example.com']);
    });

    test('should parse model with shapes', () => {
      const input = {
        smithy: '2.0',
        shapes: {
          'example.weather#Weather': {
            type: 'service',
            version: '2006-03-01',
          },
        },
      };

      const result = parser.parse(input);

      expect(result.shapes).toBeDefined();
      expect(result.shapes['example.weather#Weather']).toBeDefined();
    });

    test('should throw ParseError for invalid JSON string', () => {
      const input = '{ invalid json }';

      expect(() => parser.parse(input)).toThrow(ParseError);
    });

    test('should throw ParseError for non-object input', () => {
      expect(() => parser.parse(null as any)).toThrow(ParseError);
      expect(() => parser.parse(123 as any)).toThrow(ParseError);
      expect(() => parser.parse(true as any)).toThrow(ParseError);
    });

    test('should throw ParseError for missing smithy property', () => {
      const input = {
        shapes: {},
      };

      expect(() => parser.parse(input)).toThrow(ParseError);
    });

    test('should throw ParseError for missing shapes property', () => {
      const input = {
        smithy: '2.0',
      };

      expect(() => parser.parse(input)).toThrow(ParseError);
    });

    test('should throw ParseError for invalid smithy property type', () => {
      const input = {
        smithy: 2.0,
        shapes: {},
      };

      expect(() => parser.parse(input)).toThrow(ParseError);
    });

    test('should throw ParseError for invalid shapes property type', () => {
      const input = {
        smithy: '2.0',
        shapes: 'invalid',
      };

      expect(() => parser.parse(input)).toThrow(ParseError);
    });
  });

  describe('validateFormat', () => {
    test('should return true for valid model', () => {
      const input = {
        smithy: '2.0',
        shapes: {},
      };

      expect(parser.validateFormat(input)).toBe(true);
    });

    test('should return true for model with metadata', () => {
      const input = {
        smithy: '2.0',
        metadata: { test: 'value' },
        shapes: {},
      };

      expect(parser.validateFormat(input)).toBe(true);
    });

    test('should return false for non-object', () => {
      expect(parser.validateFormat(null)).toBe(false);
      expect(parser.validateFormat(undefined)).toBe(false);
      expect(parser.validateFormat('string')).toBe(false);
      expect(parser.validateFormat(123)).toBe(false);
    });

    test('should return false for missing smithy property', () => {
      const input = {
        shapes: {},
      };

      expect(parser.validateFormat(input)).toBe(false);
    });

    test('should return false for missing shapes property', () => {
      const input = {
        smithy: '2.0',
      };

      expect(parser.validateFormat(input)).toBe(false);
    });

    test('should return false for invalid smithy type', () => {
      const input = {
        smithy: 2.0,
        shapes: {},
      };

      expect(parser.validateFormat(input)).toBe(false);
    });

    test('should return false for invalid shapes type', () => {
      const input = {
        smithy: '2.0',
        shapes: 'invalid',
      };

      expect(parser.validateFormat(input)).toBe(false);
    });

    test('should return false for invalid metadata type', () => {
      const input = {
        smithy: '2.0',
        metadata: 'invalid',
        shapes: {},
      };

      expect(parser.validateFormat(input)).toBe(false);
    });
  });

  describe('isValidJson', () => {
    test('should return true for valid JSON', () => {
      expect(parser.isValidJson('{}')).toBe(true);
      expect(parser.isValidJson('[]')).toBe(true);
      expect(parser.isValidJson('{"key": "value"}')).toBe(true);
      expect(parser.isValidJson('null')).toBe(true);
      expect(parser.isValidJson('123')).toBe(true);
      expect(parser.isValidJson('"string"')).toBe(true);
    });

    test('should return false for invalid JSON', () => {
      expect(parser.isValidJson('{ invalid }')).toBe(false);
      expect(parser.isValidJson('undefined')).toBe(false);
      expect(parser.isValidJson('{key: value}')).toBe(false);
      expect(parser.isValidJson("{'key': 'value'}")).toBe(false);
    });
  });
});
