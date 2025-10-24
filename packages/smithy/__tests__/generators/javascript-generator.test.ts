/**
 * Tests for JavaScript generator
 */

import { describe, expect, test } from 'bun:test';
import { JavaScriptGenerator } from '../../src/generators/javascript-generator';
import type { SmithyModel } from '../../src/types';

describe('JavaScriptGenerator', () => {
  const simpleModel: SmithyModel = {
    smithy: '2.0',
    shapes: {
      'example.weather#GetWeatherInput': {
        type: 'structure',
        members: {
          city: {
            target: 'smithy.api#String',
          },
        },
      },
      'example.weather#GetWeatherOutput': {
        type: 'structure',
        members: {
          temperature: {
            target: 'smithy.api#Float',
          },
        },
      },
      'example.weather#GetWeather': {
        type: 'operation',
        input: 'example.weather#GetWeatherInput',
        output: 'example.weather#GetWeatherOutput',
        traits: {
          'smithy.api#http': {
            method: 'POST',
            uri: '/weather',
          },
        },
      },
      'example.weather#Weather': {
        type: 'service',
        version: '2006-03-01',
        operations: ['example.weather#GetWeather'],
      },
    },
  };

  test('should generate JavaScript code', () => {
    const generator = new JavaScriptGenerator();
    const code = generator.generate(simpleModel);

    expect(code).toContain('export class GetWeatherInput');
    expect(code).toContain('this.city = city;');
    expect(code).toContain('export class WeatherClient');
  });

  test('should generate class with constructor', () => {
    const generator = new JavaScriptGenerator();
    const code = generator.generate(simpleModel);

    expect(code).toContain('constructor(city)');
    expect(code).toContain('this.city = city;');
  });

  test('should generate toJSON method', () => {
    const generator = new JavaScriptGenerator();
    const code = generator.generate(simpleModel);

    expect(code).toContain('toJSON()');
    expect(code).toContain('return {');
    expect(code).toContain('city: this.city');
  });

  test('should generate client with operation methods', () => {
    const generator = new JavaScriptGenerator();
    const code = generator.generate(simpleModel);

    expect(code).toContain('class WeatherClient');
    expect(code).toContain('async getWeather(input)');
    expect(code).toContain("method: 'POST'");
  });

  test('should include comments when enabled', () => {
    const generator = new JavaScriptGenerator({ includeComments: true });
    const code = generator.generate(simpleModel);

    expect(code).toContain('/**');
    expect(code).toContain('* @param');
  });

  test('should exclude comments when disabled', () => {
    const generator = new JavaScriptGenerator({ includeComments: false });
    const code = generator.generate(simpleModel);

    expect(code).not.toContain('/**');
  });
});
