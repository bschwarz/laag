/**
 * Tests for ModelValidator
 */

import { describe, expect, test } from 'bun:test';
import type { SmithyModel } from '../../src/types.js';
import { ModelValidator } from '../../src/validators/model-validator.js';

describe('ModelValidator', () => {
  const validator = new ModelValidator();

  describe('validate', () => {
    test('should validate a valid model', () => {
      const model: SmithyModel = {
        smithy: '2.0',
        shapes: {
          'example.weather#String': {
            type: 'string',
          },
        },
      };

      const result = validator.validate(model);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should validate a model with metadata', () => {
      const model: SmithyModel = {
        smithy: '2.0',
        metadata: {
          authors: ['test@example.com'],
        },
        shapes: {
          'example.weather#String': {
            type: 'string',
          },
        },
      };

      const result = validator.validate(model);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should fail for invalid version', () => {
      const model = {
        smithy: '3.0',
        shapes: {
          'example.weather#String': {
            type: 'string',
          },
        },
      } as SmithyModel;

      const result = validator.validate(model);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors[0]?.code).toBe('UNSUPPORTED_VERSION');
    });

    test('should fail for missing shapes', () => {
      const model = {
        smithy: '2.0',
      } as unknown as SmithyModel;

      const result = validator.validate(model);
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.code === 'MISSING_SHAPES')).toBe(true);
    });

    test('should fail for invalid metadata', () => {
      const model = {
        smithy: '2.0',
        metadata: 'invalid',
        shapes: {
          'example.weather#String': {
            type: 'string',
          },
        },
      } as unknown as SmithyModel;

      const result = validator.validate(model);
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.code === 'INVALID_METADATA_TYPE')).toBe(true);
    });
  });

  describe('validateVersion', () => {
    test('should accept version 1.0', () => {
      const result = validator.validateVersion('1.0');
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should accept version 2.0', () => {
      const result = validator.validateVersion('2.0');
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should reject missing version', () => {
      const result = validator.validateVersion('');
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe('MISSING_VERSION');
    });

    test('should reject non-string version', () => {
      const result = validator.validateVersion(2.0 as unknown as string);
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe('INVALID_VERSION_TYPE');
    });

    test('should reject invalid version format', () => {
      const result = validator.validateVersion('2');
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe('INVALID_VERSION_FORMAT');
    });

    test('should reject unsupported version', () => {
      const result = validator.validateVersion('3.0');
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe('UNSUPPORTED_VERSION');
    });
  });

  describe('validateMetadata', () => {
    test('should accept valid metadata object', () => {
      const metadata = {
        authors: ['test@example.com'],
        custom: 'value',
      };
      const result = validator.validateMetadata(metadata);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should accept empty metadata object', () => {
      const result = validator.validateMetadata({});
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should reject non-object metadata', () => {
      const result = validator.validateMetadata('invalid' as unknown as Record<string, unknown>);
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe('INVALID_METADATA_TYPE');
    });

    test('should reject null metadata', () => {
      const result = validator.validateMetadata(null as unknown as Record<string, unknown>);
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe('INVALID_METADATA_TYPE');
    });

    test('should reject array metadata', () => {
      const result = validator.validateMetadata([] as unknown as Record<string, unknown>);
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe('INVALID_METADATA_TYPE');
    });
  });

  describe('validateShapes', () => {
    test('should accept valid shapes object', () => {
      const shapes = {
        'example.weather#String': {
          type: 'string',
        },
        'example.weather#GetWeather': {
          type: 'operation',
        },
      };
      const result = validator.validateShapes(shapes);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should accept relative shape IDs', () => {
      const shapes = {
        MyString: {
          type: 'string',
        },
      };
      const result = validator.validateShapes(shapes);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should reject missing shapes', () => {
      const result = validator.validateShapes(undefined as unknown as Record<string, unknown>);
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe('MISSING_SHAPES');
    });

    test('should reject non-object shapes', () => {
      const result = validator.validateShapes('invalid' as unknown as Record<string, unknown>);
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe('INVALID_SHAPES_TYPE');
    });

    test('should reject null shapes', () => {
      const result = validator.validateShapes(null as unknown as Record<string, unknown>);
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe('INVALID_SHAPES_TYPE');
    });

    test('should reject array shapes', () => {
      const result = validator.validateShapes([] as unknown as Record<string, unknown>);
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe('INVALID_SHAPES_TYPE');
    });

    test('should reject empty shapes object', () => {
      const result = validator.validateShapes({});
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe('EMPTY_SHAPES');
    });

    test('should reject invalid shape ID format', () => {
      const shapes = {
        'invalid#shape#id': {
          type: 'string',
        },
      };
      const result = validator.validateShapes(shapes);
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.code === 'INVALID_SHAPE_ID')).toBe(true);
    });

    test('should reject shape ID starting with number', () => {
      const shapes = {
        '123Invalid': {
          type: 'string',
        },
      };
      const result = validator.validateShapes(shapes);
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.code === 'INVALID_SHAPE_ID')).toBe(true);
    });

    test('should reject non-object shape value', () => {
      const shapes = {
        'example.weather#String': 'invalid',
      };
      const result = validator.validateShapes(shapes);
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.code === 'INVALID_SHAPE_TYPE')).toBe(true);
    });

    test('should accept shape IDs with dots in namespace', () => {
      const shapes = {
        'com.example.weather#String': {
          type: 'string',
        },
      };
      const result = validator.validateShapes(shapes);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should accept shape IDs with underscores', () => {
      const shapes = {
        'example_weather#My_String': {
          type: 'string',
        },
      };
      const result = validator.validateShapes(shapes);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });
});
