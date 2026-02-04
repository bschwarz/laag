/**
 * Example: Code Generation from Smithy Models
 *
 * This example demonstrates how to generate TypeScript, JavaScript, and Python
 * code from a Smithy model using the @laag/smithy library.
 */

import { Smithy, type SmithyModel } from '../src/index';

// Define a simple weather service model
const weatherModel: SmithyModel = {
  smithy: '2.0',
  shapes: {
    'example.weather#Weather': {
      type: 'service' as const,
      version: '2006-03-01',
      operations: ['example.weather#GetWeather'],
      traits: {
        'smithy.api#documentation': 'A simple weather service',
      },
    },
    'example.weather#GetWeather': {
      type: 'operation' as const,
      input: 'example.weather#GetWeatherInput',
      output: 'example.weather#GetWeatherOutput',
      traits: {
        'smithy.api#readonly': {},
        'smithy.api#http': {
          method: 'GET',
          uri: '/weather/{city}',
        },
        'smithy.api#documentation': 'Get current weather for a city',
      },
    },
    'example.weather#GetWeatherInput': {
      type: 'structure' as const,
      members: {
        city: {
          target: 'smithy.api#String',
          traits: {
            'smithy.api#required': {},
            'smithy.api#httpLabel': {},
            'smithy.api#documentation': 'The city name',
          },
        },
      },
      traits: {
        'smithy.api#documentation': 'Input for getting weather',
      },
    },
    'example.weather#GetWeatherOutput': {
      type: 'structure' as const,
      members: {
        temperature: {
          target: 'smithy.api#Float',
          traits: {
            'smithy.api#documentation': 'Temperature in Celsius',
          },
        },
        conditions: {
          target: 'smithy.api#String',
          traits: {
            'smithy.api#documentation': 'Weather conditions',
          },
        },
        humidity: {
          target: 'smithy.api#Integer',
          traits: {
            'smithy.api#documentation': 'Humidity percentage',
          },
        },
      },
      traits: {
        'smithy.api#documentation': 'Weather information',
      },
    },
  },
};

// Create a Smithy instance
const smithy = new Smithy(weatherModel);

console.log('=== Code Generation Example ===\n');

// Generate TypeScript code
console.log('--- TypeScript Code ---');
const tsCode = smithy.generateTypeScript({
  includeComments: true,
  indent: 2,
});
console.log(tsCode);
console.log('\n');

// Generate JavaScript code
console.log('--- JavaScript Code ---');
const jsCode = smithy.generateJavaScript({
  includeComments: true,
  indent: 2,
});
console.log(jsCode);
console.log('\n');

// Generate Python code
console.log('--- Python Code ---');
const pyCode = smithy.generatePython({
  includeComments: true,
  indent: 4,
});
console.log(pyCode);
console.log('\n');

// Generate code without comments
console.log('--- TypeScript Code (No Comments) ---');
const tsCodeNoComments = smithy.generateTypeScript({
  includeComments: false,
  indent: 2,
});
console.log(tsCodeNoComments);
