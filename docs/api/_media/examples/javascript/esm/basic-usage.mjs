#!/usr/bin/env node

/**
 * Basic Usage Examples for @laag/openapi (ESM)
 *
 * This example demonstrates how to use the laag OpenAPI library
 * with ES Modules (import/export syntax) in Node.js.
 */

import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { Openapi } from '../../../packages/openapi/dist/esm/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Basic Usage Examples for @laag/openapi (ESM)\n');

// Example 1: Creating an empty OpenAPI document
console.log('📝 Example 1: Creating an empty document');
const emptyApi = new Openapi();
console.log(`Created document with title: "${emptyApi.title}"`);
console.log(`OpenAPI version: ${emptyApi.getDocument().openapi}`);
console.log();

// Example 2: Creating from an object
console.log('🏗️  Example 2: Creating from object');
const apiDoc = {
  openapi: '3.0.2',
  info: {
    title: 'My ESM API',
    version: '1.0.0',
    description: 'An API created with ES Modules',
    contact: {
      name: 'ESM Team',
      email: 'esm@company.com',
    },
  },
  paths: {},
  servers: [
    {
      url: 'https://api.company.com/esm/v1',
      description: 'ESM API server',
    },
  ],
};

const typedApi = new Openapi(apiDoc);
console.log(`✅ Created API: ${typedApi.title} v${typedApi.version}`);
console.log(`Description: ${typedApi.description}`);
console.log();

// Example 3: Loading from JSON file
console.log('📂 Example 3: Loading from JSON file');
try {
  const jsonPath = join(__dirname, '../../data/petstore-simple.json');
  const jsonData = readFileSync(jsonPath, 'utf8');
  const fileApi = new Openapi(jsonData);

  console.log(`✅ Loaded API: ${fileApi.title} v${fileApi.version}`);
  console.log(`Paths: ${fileApi.getPathNames().length}`);

  // Display all paths
  console.log('\n📍 Available paths:');
  for (const path of fileApi.getPathNames()) {
    console.log(`  ${path}`);
  }
} catch (error) {
  console.error('❌ Error loading file:', error.message);
}
console.log();

// Example 4: Working with paths
console.log('🛣️  Example 4: Working with paths');
const pathApi = new Openapi();
pathApi.title = 'Path Example API';
pathApi.version = '1.0.0';

// Add a simple path
const simplePath = {
  get: {
    summary: 'Get items',
    operationId: 'getItems',
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: { type: 'string' },
            },
          },
        },
      },
    },
  },
};

pathApi.appendPath('/items', simplePath);
console.log('✅ Added /items path');
console.log(`Total paths: ${pathApi.getPathNames().length}`);
console.log();

// Example 5: Document validation
console.log('✅ Example 5: Document validation');
const validApi = new Openapi({
  openapi: '3.0.2',
  info: { title: 'Valid API', version: '1.0.0' },
  paths: {},
});

const validationResult = validApi.validate();
console.log(`Validation result: ${validationResult.valid ? '✅ Valid' : '❌ Invalid'}`);
console.log();

// Example 6: Extensions
console.log('🔌 Example 6: Working with extensions');
const extApi = new Openapi();
extApi.title = 'Extended API';
extApi.version = '1.0.0';

// Add root extensions
extApi.rootExtensions = {
  'x-api-version': '2024.1',
  'x-environment': 'production',
};

console.log('✅ Extensions added:');
console.log('Root extensions:', Object.keys(extApi.rootExtensions));
console.log();

console.log('🎉 ESM examples completed successfully!');
console.log('💡 This demonstrates ES Module usage with import/export syntax');
