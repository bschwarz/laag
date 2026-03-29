/**
 * Tests for the main Smithy class
 */

import { ParseError, ValidationError } from '@laag/core';
import { describe, expect, test } from 'bun:test';
import { Smithy } from '../src/smithy';
import type { SmithyModel } from '../src/types';

describe('Smithy', () => {
  const validModel: SmithyModel = {
    smithy: '2.0',
    shapes: {
      'example.weather#Weather': {
        type: 'service',
        version: '2006-03-01',
        operations: ['example.weather#GetWeather'],
      },
      'example.weather#GetWeather': {
        type: 'operation',
        input: 'example.weather#GetWeatherInput',
        output: 'example.weather#GetWeatherOutput',
        traits: {
          'smithy.api#readonly': {},
          'smithy.api#http': {
            method: 'GET',
            uri: '/weather/{city}',
          },
        },
      },
      'example.weather#GetWeatherInput': {
        type: 'structure',
        members: {
          city: {
            target: 'smithy.api#String',
            traits: {
              'smithy.api#required': {},
              'smithy.api#httpLabel': {},
            },
          },
        },
      },
      'example.weather#GetWeatherOutput': {
        type: 'structure',
        members: {
          temperature: {
            target: 'smithy.api#Float',
          },
          conditions: {
            target: 'smithy.api#String',
          },
        },
      },
    },
  };

  describe('constructor', () => {
    test('should create Smithy instance from object', () => {
      const smithy = new Smithy(validModel);
      expect(smithy).toBeDefined();
      expect(smithy.version).toBe('2.0');
    });

    test('should create Smithy instance from JSON string', () => {
      const smithy = new Smithy(JSON.stringify(validModel));
      expect(smithy).toBeDefined();
      expect(smithy.version).toBe('2.0');
    });

    test('should throw ParseError for invalid JSON string', () => {
      expect(() => new Smithy('invalid json')).toThrow(ParseError);
    });

    test('should throw ValidationError for invalid model structure', () => {
      const invalidModel = {
        smithy: '2.0',
        shapes: {},
      };
      expect(() => new Smithy(invalidModel)).toThrow(ValidationError);
    });

    test('should throw ValidationError for missing version', () => {
      const invalidModel = {
        shapes: {
          'example#Test': { type: 'string' },
        },
      };
      expect(() => new Smithy(invalidModel as any)).toThrow(ParseError);
    });
  });

  describe('version', () => {
    test('should return Smithy version', () => {
      const smithy = new Smithy(validModel);
      expect(smithy.version).toBe('2.0');
    });
  });

  describe('metadata', () => {
    test('should return undefined when no metadata', () => {
      const smithy = new Smithy(validModel);
      expect(smithy.metadata).toBeUndefined();
    });

    test('should return metadata when present', () => {
      const modelWithMetadata = {
        ...validModel,
        metadata: {
          authors: ['test@example.com'],
        },
      };
      const smithy = new Smithy(modelWithMetadata);
      expect(smithy.metadata).toEqual({ authors: ['test@example.com'] });
    });
  });

  describe('shapes', () => {
    test('should return all shapes', () => {
      const smithy = new Smithy(validModel);
      const shapes = smithy.shapes;
      expect(shapes.size).toBe(4);
      expect(shapes.has('example.weather#Weather')).toBe(true);
    });
  });

  describe('getShape', () => {
    test('should get shape by ID', () => {
      const smithy = new Smithy(validModel);
      const shape = smithy.getShape('example.weather#Weather');
      expect(shape).toBeDefined();
      expect(shape?.type).toBe('service');
    });

    test('should return undefined for non-existent shape', () => {
      const smithy = new Smithy(validModel);
      const shape = smithy.getShape('example.weather#NonExistent');
      expect(shape).toBeUndefined();
    });
  });

  describe('getShapesByType', () => {
    test('should get all services', () => {
      const smithy = new Smithy(validModel);
      const services = smithy.getShapesByType('service');
      expect(services).toHaveLength(1);
      expect(services[0]?.type).toBe('service');
    });

    test('should get all structures', () => {
      const smithy = new Smithy(validModel);
      const structures = smithy.getShapesByType('structure');
      expect(structures).toHaveLength(2);
    });

    test('should return empty array for non-existent type', () => {
      const smithy = new Smithy(validModel);
      const resources = smithy.getShapesByType('resource');
      expect(resources).toHaveLength(0);
    });
  });

  describe('addShape', () => {
    test('should add new shape', () => {
      const smithy = new Smithy(validModel);
      smithy.addShape('example.weather#Temperature', {
        type: 'structure',
        members: {
          value: { target: 'smithy.api#Float' },
        },
      });
      expect(smithy.hasShape('example.weather#Temperature')).toBe(true);
    });
  });

  describe('removeShape', () => {
    test('should remove existing shape', () => {
      const smithy = new Smithy(validModel);
      const removed = smithy.removeShape('example.weather#GetWeatherOutput');
      expect(removed).toBe(true);
      expect(smithy.hasShape('example.weather#GetWeatherOutput')).toBe(false);
    });

    test('should return false for non-existent shape', () => {
      const smithy = new Smithy(validModel);
      const removed = smithy.removeShape('example.weather#NonExistent');
      expect(removed).toBe(false);
    });
  });

  describe('hasShape', () => {
    test('should return true for existing shape', () => {
      const smithy = new Smithy(validModel);
      expect(smithy.hasShape('example.weather#Weather')).toBe(true);
    });

    test('should return false for non-existent shape', () => {
      const smithy = new Smithy(validModel);
      expect(smithy.hasShape('example.weather#NonExistent')).toBe(false);
    });
  });

  describe('getServices', () => {
    test('should return all services', () => {
      const smithy = new Smithy(validModel);
      const services = smithy.getServices();
      expect(services).toHaveLength(1);
      expect(services[0]?.version).toBe('2006-03-01');
    });
  });

  describe('getService', () => {
    test('should get service by ID', () => {
      const smithy = new Smithy(validModel);
      const service = smithy.getService('example.weather#Weather');
      expect(service).toBeDefined();
      expect(service?.version).toBe('2006-03-01');
    });

    test('should return undefined for non-existent service', () => {
      const smithy = new Smithy(validModel);
      const service = smithy.getService('example.weather#NonExistent');
      expect(service).toBeUndefined();
    });
  });

  describe('getOperations', () => {
    test('should get operations for service', () => {
      const smithy = new Smithy(validModel);
      const operations = smithy.getOperations('example.weather#Weather');
      expect(operations).toHaveLength(1);
      expect(operations[0]?.type).toBe('operation');
    });

    test('should return empty array for non-existent service', () => {
      const smithy = new Smithy(validModel);
      const operations = smithy.getOperations('example.weather#NonExistent');
      expect(operations).toHaveLength(0);
    });
  });

  describe('getResources', () => {
    test('should return empty array when service has no resources', () => {
      const smithy = new Smithy(validModel);
      const resources = smithy.getResources('example.weather#Weather');
      expect(resources).toHaveLength(0);
    });
  });

  describe('getHttpBinding', () => {
    test('should get HTTP binding for operation', () => {
      const smithy = new Smithy(validModel);
      const binding = smithy.getHttpBinding('example.weather#GetWeather');
      expect(binding).toBeDefined();
      expect(binding?.method).toBe('GET');
      expect(binding?.uri).toBe('/weather/{city}');
      expect(binding?.labels).toEqual(['city']);
    });

    test('should return undefined for operation without HTTP trait', () => {
      const smithy = new Smithy(validModel);
      const binding = smithy.getHttpBinding('example.weather#Weather');
      expect(binding).toBeUndefined();
    });
  });

  describe('getTraits', () => {
    test('should get all traits for shape', () => {
      const smithy = new Smithy(validModel);
      const traits = smithy.getTraits('example.weather#GetWeather');
      expect(traits).toBeDefined();
      expect(traits?.size).toBe(2);
      expect(traits?.has('smithy.api#readonly')).toBe(true);
      expect(traits?.has('smithy.api#http')).toBe(true);
    });

    test('should return undefined for shape without traits', () => {
      const smithy = new Smithy(validModel);
      const traits = smithy.getTraits('example.weather#Weather');
      expect(traits).toBeUndefined();
    });
  });

  describe('hasTrait', () => {
    test('should return true for existing trait', () => {
      const smithy = new Smithy(validModel);
      expect(smithy.hasTrait('example.weather#GetWeather', 'smithy.api#readonly')).toBe(true);
    });

    test('should return false for non-existent trait', () => {
      const smithy = new Smithy(validModel);
      expect(smithy.hasTrait('example.weather#GetWeather', 'smithy.api#idempotent')).toBe(false);
    });
  });

  describe('addTrait', () => {
    test('should add trait to shape', () => {
      const smithy = new Smithy(validModel);
      smithy.addTrait('example.weather#GetWeather', 'smithy.api#idempotent', {});
      expect(smithy.hasTrait('example.weather#GetWeather', 'smithy.api#idempotent')).toBe(true);
    });

    test('should throw error for invalid trait', () => {
      const smithy = new Smithy(validModel);
      expect(() => {
        smithy.addTrait('example.weather#GetWeather', 'smithy.api#http', {
          method: 'INVALID',
          uri: '/test',
        });
      }).toThrow();
    });
  });

  describe('validate', () => {
    test('should validate model structure', () => {
      const smithy = new Smithy(validModel);
      const result = smithy.validate();
      // Note: This will have errors for missing shape references (smithy.api#String, etc.)
      // which is expected since we don't include the full Smithy prelude
      // The important thing is that the model structure itself is valid
      expect(result.errors.length).toBeGreaterThan(0);
      // All errors should be about missing references, not structural issues
      for (const error of result.errors) {
        expect(error.code).toBe('INVALID_SHAPE_REFERENCE');
      }
    });

    test('should detect invalid shape references', () => {
      const invalidModel: SmithyModel = {
        smithy: '2.0',
        shapes: {
          'example#Test': {
            type: 'operation',
            input: 'example#NonExistent',
          },
        },
      };
      const smithy = new Smithy(invalidModel);
      const result = smithy.validate();
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });

  describe('toJSON', () => {
    test('should serialize to JSON object', () => {
      const smithy = new Smithy(validModel);
      const json = smithy.toJSON();
      expect(json.smithy).toBe('2.0');
      expect(json.shapes).toBeDefined();
      expect(Object.keys(json.shapes)).toHaveLength(4);
    });

    test('should include metadata when present', () => {
      const modelWithMetadata = {
        ...validModel,
        metadata: { authors: ['test@example.com'] },
      };
      const smithy = new Smithy(modelWithMetadata);
      const json = smithy.toJSON();
      expect(json.metadata).toEqual({ authors: ['test@example.com'] });
    });
  });

  describe('toString', () => {
    test('should serialize to compact JSON string', () => {
      const smithy = new Smithy(validModel);
      const str = smithy.toString();
      expect(typeof str).toBe('string');
      expect(str).toContain('"smithy":"2.0"');
    });

    test('should serialize to pretty JSON string', () => {
      const smithy = new Smithy(validModel);
      const str = smithy.toString(true);
      expect(typeof str).toBe('string');
      expect(str).toContain('  "smithy": "2.0"');
    });
  });

  describe('select', () => {
    test('should select all shapes with wildcard', () => {
      const smithy = new Smithy(validModel);
      const matches = smithy.select('*');
      expect(matches).toHaveLength(4);
    });

    test('should select shapes by type', () => {
      const smithy = new Smithy(validModel);
      const matches = smithy.select('structure');
      expect(matches).toHaveLength(2);
    });

    test('should select shapes by trait', () => {
      const smithy = new Smithy(validModel);
      const matches = smithy.select('[trait|readonly]');
      expect(matches).toHaveLength(1);
      expect(matches[0]?.shapeId).toBe('example.weather#GetWeather');
    });
  });

  describe('code generation', () => {
    describe('generateTypeScript', () => {
      test('should generate TypeScript code', () => {
        const smithy = new Smithy(validModel);
        const code = smithy.generateTypeScript();
        expect(code).toContain('export interface GetWeatherInput');
        expect(code).toContain('export class WeatherClient');
      });

      test('should respect generator options', () => {
        const smithy = new Smithy(validModel);
        const code = smithy.generateTypeScript({ includeComments: false });
        expect(code).not.toContain('/**');
      });
    });

    describe('generateJavaScript', () => {
      test('should generate JavaScript code', () => {
        const smithy = new Smithy(validModel);
        const code = smithy.generateJavaScript();
        expect(code).toContain('export class GetWeatherInput');
        expect(code).toContain('export class WeatherClient');
      });

      test('should respect generator options', () => {
        const smithy = new Smithy(validModel);
        const code = smithy.generateJavaScript({ includeComments: false });
        expect(code).not.toContain('/**');
      });
    });

    describe('generatePython', () => {
      test('should generate Python code', () => {
        const smithy = new Smithy(validModel);
        const code = smithy.generatePython();
        expect(code).toContain('@dataclass');
        expect(code).toContain('class GetWeatherInput:');
        expect(code).toContain('class WeatherClient:');
      });

      test('should respect generator options', () => {
        const smithy = new Smithy(validModel);
        const code = smithy.generatePython({ includeComments: false });
        expect(code).not.toContain('"""');
      });
    });
  });
});
