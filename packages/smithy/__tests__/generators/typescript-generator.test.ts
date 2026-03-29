/**
 * Tests for TypeScript generator
 */

import { describe, expect, test } from 'bun:test';
import { TypeScriptGenerator } from '../../src/generators/typescript-generator';
import type { SmithyModel } from '../../src/types';

describe('TypeScriptGenerator', () => {
  const simpleModel: SmithyModel = {
    smithy: '2.0',
    shapes: {
      'example.weather#GetWeatherInput': {
        type: 'structure',
        members: {
          city: {
            target: 'smithy.api#String',
            traits: {
              'smithy.api#required': {},
            },
          },
        },
        traits: {
          'smithy.api#documentation': 'Input for getting weather',
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
      'example.weather#GetWeather': {
        type: 'operation',
        input: 'example.weather#GetWeatherInput',
        output: 'example.weather#GetWeatherOutput',
        traits: {
          'smithy.api#http': {
            method: 'GET',
            uri: '/weather/{city}',
          },
        },
      },
      'example.weather#Weather': {
        type: 'service',
        version: '2006-03-01',
        operations: ['example.weather#GetWeather'],
        traits: {
          'smithy.api#documentation': 'Weather service',
        },
      },
    },
  };

  test('should generate TypeScript code', () => {
    const generator = new TypeScriptGenerator();
    const code = generator.generate(simpleModel);

    expect(code).toContain('export interface GetWeatherInput');
    expect(code).toContain('city: string;');
    expect(code).toContain('export interface GetWeatherOutput');
    expect(code).toContain('temperature?: number;');
    expect(code).toContain('export class WeatherClient');
  });

  test('should generate interface with required and optional members', () => {
    const generator = new TypeScriptGenerator();
    const code = generator.generate(simpleModel);

    // Required member (no ?)
    expect(code).toContain('city: string;');
    // Optional members (with ?)
    expect(code).toContain('temperature?: number;');
    expect(code).toContain('conditions?: string;');
  });

  test('should generate client with operation methods', () => {
    const generator = new TypeScriptGenerator();
    const code = generator.generate(simpleModel);

    expect(code).toContain('class WeatherClient');
    expect(code).toContain('async getWeather(input: GetWeatherInput): Promise<GetWeatherOutput>');
    expect(code).toContain("method: 'GET'");
  });

  test('should include comments when enabled', () => {
    const generator = new TypeScriptGenerator({ includeComments: true });
    const code = generator.generate(simpleModel);

    expect(code).toContain('/**');
    expect(code).toContain('Input for getting weather');
    expect(code).toContain('Weather service');
  });

  test('should exclude comments when disabled', () => {
    const generator = new TypeScriptGenerator({ includeComments: false });
    const code = generator.generate(simpleModel);

    expect(code).not.toContain('/**');
    expect(code).not.toContain('Input for getting weather');
  });

  test('should respect custom indentation', () => {
    const generator = new TypeScriptGenerator({ indent: 4 });
    const code = generator.generate(simpleModel);

    // Check for 4-space indentation
    expect(code).toContain('    city: string;');
  });
});
