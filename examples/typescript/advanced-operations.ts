#!/usr/bin/env bun

/**
 * Advanced Operations Examples for @laag/openapi
 * 
 * This example demonstrates advanced operations including:
 * - Working with paths and operations
 * - Component management and references
 * - Complex document transformations
 * - Operation analysis and utilities
 */

import { readFileSync } from 'fs';
import { join } from 'path';
import { Openapi } from '../../packages/openapi/src/index.js';
import type {
  ComponentsObject,
  PathItemObject,
  SchemaObject
} from '../../packages/openapi/src/types.js';

console.log('🚀 Advanced Operations Examples for @laag/openapi\n');

// Load the sample API for advanced operations
// const jsonPath = join(import.meta.dir, '../data/petstore-simple.json');
const jsonPath = join(import.meta.dir, '../../packages/openapi/examples/houses-openapi3.json');
const jsonData = readFileSync(jsonPath, 'utf8');
const api = new Openapi(jsonData);

console.log(`📋 Working with: ${api.title} v${api.version}\n`);

// Example 1: Analyzing paths and operations
console.log('🔍 Example 1: Path and operation analysis');
const paths = api.getPathNames();
console.log(`Total paths: ${paths.length}`);

for (const path of paths) {
  console.log(`\n📍 Path: ${path}`);
  const pathItem = api.getPath(path);
  
  // Check which HTTP methods are available
  const availableMethods = api.httpMethods.filter(method => 
    api.operationExists(path, method)
  );
  
  console.log(`  Methods: ${availableMethods.join(', ')}`);
  
  for (const method of availableMethods) {
    const operationId = api.getOperationId(path, method);
    const description = api.getOperationDescription(path, method);
    const deprecated = api.isOperationDeprecated(path, method);
    
    console.log(`    ${method.toUpperCase()}: ${operationId}`);
    if (description) console.log(`      Description: ${description}`);
    if (deprecated) console.log(`      ⚠️  DEPRECATED`);
    
    // Analyze status codes
    const statusCodes = api.getStatusCodes(path, method);
    console.log(`      Status codes: ${statusCodes.map(s => s.code).join(', ')}`);
    
    // Check media types
    const requestMedia = api.getOperationRequestMedia(path, method);
    const responseMedia = api.getOperationResponseMedia(path, method);
    
    if (requestMedia.length > 0) {
      console.log(`      Request media: ${requestMedia.join(', ')}`);
    }
    if (responseMedia.length > 0) {
      console.log(`      Response media: ${responseMedia.join(', ')}`);
    }
  }
}
console.log();

// Example 2: Adding new paths and operations
console.log('➕ Example 2: Adding new paths and operations');

// Create a new path for user management
const userPath: PathItemObject = {
  get: {
    summary: 'Get user profile',
    operationId: 'getUserProfile',
    tags: ['users'],
    parameters: [
      {
        name: 'userId',
        in: 'path',
        required: true,
        description: 'User ID',
        schema: { type: 'string' }
      }
    ],
    responses: {
      '200': {
        description: 'User profile retrieved successfully',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/User' }
          }
        }
      },
      '404': {
        description: 'User not found',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' }
          }
        }
      }
    }
  },
  put: {
    summary: 'Update user profile',
    operationId: 'updateUserProfile',
    tags: ['users'],
    parameters: [
      {
        name: 'userId',
        in: 'path',
        required: true,
        description: 'User ID',
        schema: { type: 'string' }
      }
    ],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/UserUpdate' }
        }
      }
    },
    responses: {
      '200': {
        description: 'User updated successfully',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/User' }
          }
        }
      },
      '400': {
        description: 'Invalid input',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' }
          }
        }
      },
      '404': {
        description: 'User not found',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' }
          }
        }
      }
    }
  }
};

api.appendPath('/users/{userId}', userPath);
console.log('✅ Added /users/{userId} path with GET and PUT operations');

// Add another path for user listing
const usersListPath: PathItemObject = {
  get: {
    summary: 'List all users',
    operationId: 'listUsers',
    tags: ['users'],
    parameters: [
      {
        name: 'page',
        in: 'query',
        description: 'Page number',
        schema: { type: 'integer', minimum: 1, default: 1 }
      },
      {
        name: 'limit',
        in: 'query',
        description: 'Items per page',
        schema: { type: 'integer', minimum: 1, maximum: 100, default: 20 }
      }
    ],
    responses: {
      '200': {
        description: 'Users retrieved successfully',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                users: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/User' }
                },
                pagination: { $ref: '#/components/schemas/Pagination' }
              }
            }
          }
        }
      }
    }
  }
};

api.appendPath('/users', usersListPath);
console.log('✅ Added /users path with GET operation');
console.log();

// Example 3: Working with components
console.log('🧩 Example 3: Managing components');

// Get current components
const currentComponents = api.components;
console.log(`Current component schemas: ${Object.keys(currentComponents.schemas || {}).length}`);

// Add new schemas
const newSchemas: Record<string, SchemaObject> = {
  User: {
    type: 'object',
    required: ['id', 'email', 'name'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      email: { type: 'string', format: 'email' },
      name: { type: 'string', minLength: 1, maxLength: 100 },
      avatar: { type: 'string', format: 'uri' },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' }
    }
  },
  UserUpdate: {
    type: 'object',
    properties: {
      name: { type: 'string', minLength: 1, maxLength: 100 },
      avatar: { type: 'string', format: 'uri' }
    }
  },
  Pagination: {
    type: 'object',
    required: ['page', 'limit', 'total'],
    properties: {
      page: { type: 'integer', minimum: 1 },
      limit: { type: 'integer', minimum: 1 },
      total: { type: 'integer', minimum: 0 },
      hasNext: { type: 'boolean' },
      hasPrev: { type: 'boolean' }
    }
  }
};

// Update components
const updatedComponents: ComponentsObject = {
  ...currentComponents,
  schemas: {
    ...currentComponents.schemas,
    ...newSchemas
  }
};

api.components = updatedComponents;
console.log(`✅ Added ${Object.keys(newSchemas).length} new schemas`);
console.log(`Total schemas now: ${Object.keys(api.components.schemas || {}).length}`);
console.log();

// Example 4: Operation utilities and analysis
console.log('📊 Example 4: Operation utilities');

// Get all operation IDs
const operationIds = api.getOperationIds();
console.log(`Total operations: ${operationIds.length}`);
console.log('Operation IDs:');
for (const op of operationIds) {
  console.log(`  ${op.method.toUpperCase()} ${op.path} → ${op.id}`);
}
console.log();

// Analyze all HTTP methods used
const allMethods = api.getAllHttpMethods();
console.log(`HTTP methods used: ${allMethods.join(', ')}`);

// Analyze all status codes used
const allStatusCodes = api.getAllStatusCodes();
console.log(`Status codes used: ${allStatusCodes.join(', ')}`);
console.log();

// Example 5: Working with tags
console.log('🏷️  Example 5: Managing tags');

// Add new tags
api.tags = [
  ...api.tags,
  {
    name: 'users',
    description: 'User management operations',
    externalDocs: {
      description: 'User API documentation',
      url: 'https://docs.company.com/api/users'
    }
  }
];

console.log(`✅ Updated tags (${api.tags.length} total):`);
for (const tag of api.tags) {
  console.log(`  • ${tag.name}: ${tag.description || 'No description'}`);
}
console.log();

// Example 6: Advanced extension usage
console.log('🔌 Example 6: Advanced extension usage');

// Add path-level extensions
api.pathsExtensions = {
  'x-rate-limit-global': 10000,
  'x-cache-ttl': 300
};

// Add custom extensions to specific operations
const userProfilePath = api.getPath('/users/{userId}');
if (userProfilePath.get) {
  (userProfilePath.get as any)['x-cache-enabled'] = true;
  (userProfilePath.get as any)['x-auth-required'] = true;
}

console.log('✅ Added extensions:');
console.log('  Paths extensions:', Object.keys(api.pathsExtensions));
console.log('  Operation extensions added to GET /users/{userId}');
console.log();

// Example 7: Document transformation and output
console.log('🔄 Example 7: Document transformation');

// Get the final document
const finalDoc = api.getDefinition('js');
console.log(`✅ Final document statistics:`);
console.log(`  Paths: ${Object.keys(finalDoc.paths).length}`);
console.log(`  Schemas: ${Object.keys(finalDoc.components?.schemas || {}).length}`);
console.log(`  Tags: ${finalDoc.tags?.length || 0}`);
console.log(`  Servers: ${finalDoc.servers?.length || 0}`);

// Validate the final document
const finalValidation = api.validate();
console.log(`  Validation: ${finalValidation.valid ? '✅ Valid' : '❌ Invalid'}`);

if (!finalValidation.valid) {
  console.log('  Validation errors:');
  for (const error of finalValidation.errors) {
    console.log(`    • ${error.path}: ${error.message}`);
  }
}
console.log();

console.log('🎉 Advanced operations examples completed successfully!');
console.log('💡 The API document has been enhanced with new paths, operations, and components');
console.log('📄 You can export this enhanced document using getDefinition() methods');