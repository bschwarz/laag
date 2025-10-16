#!/usr/bin/env node

/**
 * Basic Usage Examples for @laag/openapi (CommonJS)
 *
 * This example demonstrates how to use the laag OpenAPI library
 * with CommonJS (require/module.exports) in Node.js.
 */

const { readFileSync } = require('fs');
const { join } = require('path');
const { Openapi } = require('../../../packages/openapi/dist/cjs/index.js');

console.log('🚀 Basic Usage Examples for @laag/openapi (CommonJS)\n');

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
    title: 'My CommonJS API',
    version: '1.0.0',
    description: 'An API created with CommonJS',
    contact: {
      name: 'CommonJS Team',
      email: 'cjs@company.com',
    },
  },
  paths: {},
  servers: [
    {
      url: 'https://api.company.com/cjs/v1',
      description: 'CommonJS API server',
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
  const paths = fileApi.getPathNames();
  for (let i = 0; i < paths.length; i++) {
    console.log(`  ${paths[i]}`);
  }
} catch (error) {
  console.error('❌ Error loading file:', error.message);
}
console.log();

// Example 4: Working with operations
console.log('🔧 Example 4: Working with operations');
try {
  const jsonPath = join(__dirname, '../../data/petstore-simple.json');
  const jsonData = readFileSync(jsonPath, 'utf8');
  const operationApi = new Openapi(jsonData);

  const paths = operationApi.getPathNames();
  console.log('📊 Operation analysis:');

  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];
    console.log(`\n📍 Path: ${path}`);

    const methods = ['get', 'post', 'put', 'delete', 'patch'];
    for (let j = 0; j < methods.length; j++) {
      const method = methods[j];
      if (operationApi.operationExists(path, method)) {
        const operationId = operationApi.getOperationId(path, method);
        const description = operationApi.getOperationDescription(path, method);
        console.log(`  ${method.toUpperCase()}: ${operationId}`);
        if (description) {
          console.log(`    Description: ${description}`);
        }
      }
    }
  }
} catch (error) {
  console.error('❌ Error analyzing operations:', error.message);
}
console.log();

// Example 5: Document manipulation
console.log('🔧 Example 5: Document manipulation');
const manipulationApi = new Openapi();

// Set basic info
manipulationApi.title = 'Manipulation Example';
manipulationApi.version = '1.0.0';
manipulationApi.description = 'Demonstrating document manipulation';

// Add contact info
manipulationApi.contact = {
  name: 'API Support',
  email: 'support@example.com',
  url: 'https://example.com/support',
};

// Add servers
manipulationApi.servers = [
  {
    url: 'https://api.example.com/v1',
    description: 'Production server',
  },
  {
    url: 'https://staging.example.com/v1',
    description: 'Staging server',
  },
];

console.log(`✅ Configured API: ${manipulationApi.title}`);
console.log(`Contact: ${manipulationApi.contact.name}`);
console.log(`Servers: ${manipulationApi.servers.length}`);
console.log();

// Example 6: Validation
console.log('✅ Example 6: Document validation');
const validationApi = new Openapi({
  openapi: '3.0.2',
  info: { title: 'Valid CommonJS API', version: '1.0.0' },
  paths: {},
});

const result = validationApi.validate();
console.log(`Validation: ${result.valid ? '✅ Valid' : '❌ Invalid'}`);

if (!result.valid) {
  console.log('Errors:');
  for (let i = 0; i < result.errors.length; i++) {
    const error = result.errors[i];
    console.log(`  • ${error.path}: ${error.message}`);
  }
}
console.log();

console.log('🎉 CommonJS examples completed successfully!');
console.log('💡 This demonstrates CommonJS usage with require/module.exports syntax');
