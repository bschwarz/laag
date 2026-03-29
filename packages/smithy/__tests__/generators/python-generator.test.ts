/**
 * Tests for Python generator
 */

import { describe, expect, test } from 'bun:test';
import { PythonGenerator } from '../../src/generators/python-generator';
import type { SmithyModel } from '../../src/types';

describe('PythonGenerator', () => {
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
            method: 'GET',
            uri: '/weather/{city}',
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

  test('should generate Python code', () => {
    const generator = new PythonGenerator();
    const code = generator.generate(simpleModel);

    expect(code).toContain('from typing import Optional');
    expect(code).toContain('@dataclass');
    expect(code).toContain('class GetWeatherInput:');
    expect(code).toContain('city: str');
    expect(code).toContain('class WeatherClient:');
  });

  test('should generate dataclass with required and optional fields', () => {
    const generator = new PythonGenerator();
    const code = generator.generate(simpleModel);

    // Required field (no Optional)
    expect(code).toContain('city: str');
    // Optional field (with Optional)
    expect(code).toContain('temperature: Optional[float] = None');
  });

  test('should generate client with operation methods', () => {
    const generator = new PythonGenerator();
    const code = generator.generate(simpleModel);

    expect(code).toContain('class WeatherClient:');
    expect(code).toContain('def get_weather(self, input: GetWeatherInput) -> GetWeatherOutput:');
    expect(code).toContain('requests.get(url)');
  });

  test('should convert PascalCase to snake_case for method names', () => {
    const generator = new PythonGenerator();
    const code = generator.generate(simpleModel);

    expect(code).toContain('def get_weather(');
  });

  test('should include docstrings when enabled', () => {
    const generator = new PythonGenerator({ includeComments: true });
    const code = generator.generate(simpleModel);

    expect(code).toContain('"""');
    expect(code).toContain('Args:');
    expect(code).toContain('Returns:');
  });

  test('should exclude docstrings when disabled', () => {
    const generator = new PythonGenerator({ includeComments: false });
    const code = generator.generate(simpleModel);

    expect(code).not.toContain('"""');
    expect(code).not.toContain('Args:');
  });

  test('should respect custom indentation', () => {
    const generator = new PythonGenerator({ indent: 2 });
    const code = generator.generate(simpleModel);

    // Check for 2-space indentation (Python typically uses 4)
    expect(code).toContain('  city: str');
  });
});
