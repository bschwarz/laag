/**
 * Basic usage example for @laag/smithy
 *
 * This example demonstrates how to:
 * - Create a Smithy instance
 * - Access model properties
 * - Work with shapes
 * - Query services and operations
 * - Use selectors
 */

import { Smithy } from '../src/smithy';
import type { SmithyModel } from '../src/types';

// Example Smithy model
const weatherModel: SmithyModel = {
  smithy: '2.0',
  metadata: {
    authors: ['example@example.com'],
  },
  shapes: {
    'example.weather#Weather': {
      type: 'service',
      version: '2006-03-01',
      operations: ['example.weather#GetWeather'],
      traits: {
        'smithy.api#documentation': 'Provides weather forecasts',
      },
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

// Create Smithy instance
console.log('Creating Smithy instance...\n');
const smithy = new Smithy(weatherModel);

// Access model properties
console.log('Model Properties:');
console.log('- Version:', smithy.version);
console.log('- Metadata:', smithy.metadata);
console.log('- Total shapes:', smithy.shapes.size);
console.log();

// Get all services
console.log('Services:');
const services = smithy.getServices();
for (const service of services) {
  console.log(`- Service version: ${service.version}`);
  const traits = smithy.getTraits('example.weather#Weather');
  if (traits) {
    const doc = traits.get('smithy.api#documentation');
    if (doc) {
      console.log(`  Documentation: ${doc}`);
    }
  }
}
console.log();

// Get operations for a service
console.log('Operations:');
const operations = smithy.getOperations('example.weather#Weather');
for (const operation of operations) {
  console.log(`- Operation type: ${operation.type}`);

  // Get HTTP binding
  const binding = smithy.getHttpBinding('example.weather#GetWeather');
  if (binding) {
    console.log(`  HTTP: ${binding.method} ${binding.uri}`);
    if (binding.labels) {
      console.log(`  Labels: ${binding.labels.join(', ')}`);
    }
  }
}
console.log();

// Query shapes by type
console.log('Structures:');
const structures = smithy.getShapesByType('structure');
console.log(`- Found ${structures.length} structures`);
console.log();

// Use selectors
console.log('Using Selectors:');
const readonlyOps = smithy.select('[trait|readonly]');
console.log(`- Readonly operations: ${readonlyOps.length}`);
for (const match of readonlyOps) {
  console.log(`  - ${match.shapeId}`);
}
console.log();

// Add a new shape
console.log('Adding new shape...');
smithy.addShape('example.weather#Temperature', {
  type: 'structure',
  members: {
    value: { target: 'smithy.api#Float' },
    unit: { target: 'smithy.api#String' },
  },
});
console.log(`- Total shapes now: ${smithy.shapes.size}`);
console.log();

// Serialize to JSON
console.log('Serialization:');
const json = smithy.toJSON();
console.log('- JSON keys:', Object.keys(json).join(', '));
console.log('- Compact JSON length:', smithy.toString().length);
console.log('- Pretty JSON length:', smithy.toString(true).length);
console.log();

console.log('Example complete!');
