#!/usr/bin/env bun

/**
 * Basic Usage Examples for @laag/openapi
 * 
 * This example demonstrates the fundamental operations you can perform
 * with the modernized laag OpenAPI library, including:
 * - Creating and loading OpenAPI documents
 * - Basic document manipulation
 * - Type-safe property access
 * - Validation and error handling
 */

import { readFileSync } from 'fs';
import { join } from 'path';
import { Openapi } from '../../packages/openapi/src/index.js';
import type { InfoObject, OpenAPIDocument } from '../../packages/openapi/src/types.js';

console.log('🚀 Basic Usage Examples for @laag/openapi\n');

// Example 1: Creating an empty OpenAPI document
console.log('📝 Example 1: Creating an empty document');
const emptyApi = new Openapi();
console.log(`Created document with title: "${emptyApi.title}"`);
console.log(`OpenAPI version: ${emptyApi.getDocument().openapi}`);
console.log();

// Example 2: Creating from an object with full type safety
console.log('🏗️  Example 2: Creating from typed object');
const apiDoc: OpenAPIDocument = {
  openapi: '3.0.2',
  info: {
    title: 'My Awesome API',
    version: '1.0.0',
    description: 'A TypeScript-powered API built with laag',
    contact: {
      name: 'API Team',
      email: 'api-team@company.com',
      url: 'https://company.com/api-support'
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT'
    }
  },
  paths: {},
  servers: [
    {
      url: 'https://api.company.com/v1',
      description: 'Production server'
    }
  ]
};

const typedApi = new Openapi(apiDoc);
console.log(`✅ Created API: ${typedApi.title} v${typedApi.version}`);
console.log(`Description: ${typedApi.description}`);
console.log(`Contact: ${typedApi.contact.name} (${typedApi.contact.email})`);
console.log();

// Example 3: Loading from JSON file
console.log('📂 Example 3: Loading from JSON file');
try {
  const jsonPath = join(import.meta.dir, '../data/petstore-simple.json');
  const jsonData = readFileSync(jsonPath, 'utf8');
  const fileApi = new Openapi(jsonData);
  
  console.log(`✅ Loaded API: ${fileApi.title} v${fileApi.version}`);
  console.log(`Servers: ${fileApi.servers.length}`);
  console.log(`Paths: ${fileApi.getPathNames().length}`);
  console.log(`Tags: ${fileApi.tags.length}`);
  
  // Display all paths
  console.log('\n📍 Available paths:');
  for (const path of fileApi.getPathNames()) {
    console.log(`  ${path}`);
  }
} catch (error) {
  console.error('❌ Error loading file:', error);
}
console.log();

// Example 4: Document validation
console.log('✅ Example 4: Document validation');
const invalidApi = new Openapi({
  openapi: '3.0.2',
  // Missing required 'info' field
  paths: {}
} as any);

const validationResult = invalidApi.validate();
console.log(`Validation result: ${validationResult.valid ? '✅ Valid' : '❌ Invalid'}`);

if (!validationResult.valid) {
  console.log('Validation errors:');
  for (const error of validationResult.errors) {
    console.log(`  • ${error.path}: ${error.message} (${error.code})`);
  }
}
console.log();

// Example 5: Type-safe property manipulation
console.log('🔧 Example 5: Type-safe property manipulation');
const mutableApi = new Openapi();

// Set info properties with full type safety
const info: InfoObject = {
  title: 'User Management API',
  version: '2.1.0',
  description: 'Comprehensive user management system',
  termsOfService: 'https://company.com/terms',
  contact: {
    name: 'Development Team',
    email: 'dev@company.com'
  },
  license: {
    name: 'Apache 2.0',
    url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
  }
};

mutableApi.info = info;

// Add servers
mutableApi.servers = [
  {
    url: 'https://api.company.com/v2',
    description: 'Production server v2'
  },
  {
    url: 'https://staging-api.company.com/v2',
    description: 'Staging server v2'
  }
];

console.log(`✅ Updated API: ${mutableApi.title} v${mutableApi.version}`);
console.log(`Servers configured: ${mutableApi.servers.length}`);
console.log();

// Example 6: Working with extensions (x-* properties)
console.log('🔌 Example 6: Working with extensions');
const extendedApi = new Openapi();

// Set root-level extensions
extendedApi.rootExtensions = {
  'x-api-id': 'user-mgmt-api',
  'x-rate-limit': 1000,
  'x-custom-header': 'X-Company-API-Key'
};

// Set info-level extensions
extendedApi.infoExtensions = {
  'x-logo': {
    url: 'https://company.com/logo.png',
    altText: 'Company Logo'
  }
};

console.log('✅ Extensions added:');
console.log('Root extensions:', Object.keys(extendedApi.rootExtensions));
console.log('Info extensions:', Object.keys(extendedApi.infoExtensions));
console.log();

// Example 7: Getting document in different formats
console.log('📄 Example 7: Document output formats');
const outputApi = new Openapi({
  openapi: '3.0.2',
  info: { title: 'Output Example API', version: '1.0.0' },
  paths: {}
});

// Get as JavaScript object
const jsObject = outputApi.getDefinition('js');
console.log('✅ JavaScript object type:', typeof jsObject);

// Get as compact JSON
const compactJson = outputApi.getDefinition('json');
console.log('✅ Compact JSON length:', compactJson.length, 'characters');

// Get as pretty JSON
const prettyJson = outputApi.getDefinition('prettyjson');
console.log('✅ Pretty JSON (first 100 chars):', prettyJson.substring(0, 100) + '...');
console.log();

console.log('🎉 Basic usage examples completed successfully!');
console.log('💡 Next: Try running advanced-operations.ts for more complex examples');