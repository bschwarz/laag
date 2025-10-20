#!/usr/bin/env bun

/**
 * Sample Generation Examples for @laag/openapi
 * 
 * This example demonstrates the sample generation capabilities including:
 * - JSON payload generation from schemas
 * - Code generation for Python, JavaScript, and TypeScript
 * - curl command generation
 */

import { Openapi } from '../../packages/openapi/src/index.js';

console.log('🚀 Sample Generation Examples for @laag/openapi\n');

// Create a comprehensive API document for testing
const apiDoc = {
  openapi: '3.0.2',
  info: {
    title: 'User Management API',
    version: '1.0.0',
    description: 'A comprehensive user management system for sample generation'
  },
  servers: [
    {
      url: 'https://api.example.com/v1',
      description: 'Production server'
    },
    {
      url: 'https://staging-api.example.com/v1',
      description: 'Staging server'
    }
  ],
  paths: {
    '/users': {
      get: {
        summary: 'List all users',
        operationId: 'listUsers',
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
      },
      post: {
        summary: 'Create a new user',
        operationId: 'createUser',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreateUserRequest' }
            }
          }
        },
        responses: {
          '201': {
            description: 'User created successfully',
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
          }
        }
      }
    },
    '/users/{userId}': {
      get: {
        summary: 'Get user by ID',
        operationId: 'getUserById',
        parameters: [
          {
            name: 'userId',
            in: 'path',
            required: true,
            description: 'User ID',
            schema: { type: 'string', format: 'uuid' }
          }
        ],
        responses: {
          '200': {
            description: 'User found',
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
        summary: 'Update user',
        operationId: 'updateUser',
        parameters: [
          {
            name: 'userId',
            in: 'path',
            required: true,
            description: 'User ID',
            schema: { type: 'string', format: 'uuid' }
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UpdateUserRequest' }
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
          }
        }
      }
    }
  },
  components: {
    schemas: {
      User: {
        type: 'object',
        required: ['id', 'email', 'name', 'createdAt'],
        properties: {
          id: { 
            type: 'string', 
            format: 'uuid',
            example: '123e4567-e89b-12d3-a456-426614174000'
          },
          email: { 
            type: 'string', 
            format: 'email',
            example: 'john.doe@example.com'
          },
          name: { 
            type: 'string',
            example: 'John Doe'
          },
          avatar: { 
            type: 'string', 
            format: 'uri',
            example: 'https://example.com/avatars/john.jpg'
          },
          role: {
            type: 'string',
            enum: ['admin', 'user', 'moderator'],
            example: 'user'
          },
          isActive: {
            type: 'boolean',
            example: true
          },
          metadata: {
            type: 'object',
            additionalProperties: true,
            example: { department: 'Engineering', level: 'Senior' }
          },
          createdAt: { 
            type: 'string', 
            format: 'date-time',
            example: '2023-01-01T00:00:00Z'
          },
          updatedAt: { 
            type: 'string', 
            format: 'date-time',
            example: '2023-01-01T00:00:00Z'
          }
        }
      },
      CreateUserRequest: {
        type: 'object',
        required: ['email', 'name'],
        properties: {
          email: { 
            type: 'string', 
            format: 'email',
            example: 'jane.smith@example.com'
          },
          name: { 
            type: 'string',
            example: 'Jane Smith'
          },
          avatar: { 
            type: 'string', 
            format: 'uri',
            example: 'https://example.com/avatars/jane.jpg'
          },
          role: {
            type: 'string',
            enum: ['admin', 'user', 'moderator'],
            default: 'user',
            example: 'user'
          }
        }
      },
      UpdateUserRequest: {
        type: 'object',
        properties: {
          name: { 
            type: 'string',
            example: 'Jane Smith Updated'
          },
          avatar: { 
            type: 'string', 
            format: 'uri',
            example: 'https://example.com/avatars/jane-new.jpg'
          },
          role: {
            type: 'string',
            enum: ['admin', 'user', 'moderator'],
            example: 'moderator'
          },
          isActive: {
            type: 'boolean',
            example: false
          }
        }
      },
      Pagination: {
        type: 'object',
        required: ['page', 'limit', 'total'],
        properties: {
          page: { 
            type: 'integer', 
            minimum: 1,
            example: 1
          },
          limit: { 
            type: 'integer', 
            minimum: 1,
            example: 20
          },
          total: { 
            type: 'integer', 
            minimum: 0,
            example: 150
          },
          hasNext: { 
            type: 'boolean',
            example: true
          },
          hasPrev: { 
            type: 'boolean',
            example: false
          }
        }
      },
      Error: {
        type: 'object',
        required: ['code', 'message'],
        properties: {
          code: { 
            type: 'string',
            example: 'VALIDATION_ERROR'
          },
          message: { 
            type: 'string',
            example: 'The provided data is invalid'
          },
          details: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                field: { type: 'string', example: 'email' },
                error: { type: 'string', example: 'Invalid email format' }
              }
            }
          }
        }
      }
    }
  }
};

const api = new Openapi(apiDoc);

console.log(`📋 Working with: ${api.info.title} v${api.info.version}\n`);

// Example 1: JSON Sample Generation
console.log('🔧 Example 1: JSON Sample Generation');
console.log('=====================================\n');

// Generate request samples
console.log('📤 Request Samples:');
const createUserRequest = api.generateJsonSample('/users', 'post', 'request');
console.log('POST /users request body:');
console.log(JSON.stringify(createUserRequest, null, 2));
console.log();

const updateUserRequest = api.generateJsonSample('/users/{userId}', 'put', 'request');
console.log('PUT /users/{userId} request body:');
console.log(JSON.stringify(updateUserRequest, null, 2));
console.log();

// Generate response samples
console.log('📥 Response Samples:');
const getUserResponse = api.generateJsonSample('/users/{userId}', 'get', 'response');
console.log('GET /users/{userId} response:');
console.log(JSON.stringify(getUserResponse, null, 2));
console.log();

const listUsersResponse = api.generateJsonSample('/users', 'get', 'response');
console.log('GET /users response:');
console.log(JSON.stringify(listUsersResponse, null, 2));
console.log();

// Example 2: curl Command Generation
console.log('🌐 Example 2: curl Command Generation');
console.log('=====================================\n');

const curlCommands = api.getCurlCommands('/users', 'post');
console.log('curl commands for POST /users:');
for (const cmd of curlCommands) {
  console.log(`# ${cmd.description}`);
  console.log(cmd.command);
  console.log();
}

// Example 3: Python Code Generation
console.log('🐍 Example 3: Python Code Generation');
console.log('====================================\n');

const pythonCode = api.getPythonCode('/users', 'post');
console.log('Python code for POST /users:');
console.log(pythonCode);
console.log();

// Example 4: JavaScript Code Generation
console.log('📜 Example 4: JavaScript Code Generation');
console.log('========================================\n');

const jsCodeAsync = api.getJavaScriptCode('/users', 'post', true);
console.log('JavaScript (async/await) code for POST /users:');
console.log(jsCodeAsync);
console.log();

const jsCodePromise = api.getJavaScriptCode('/users/{userId}', 'get', false);
console.log('JavaScript (promises) code for GET /users/{userId}:');
console.log(jsCodePromise);
console.log();

// Example 5: TypeScript Code Generation
console.log('📘 Example 5: TypeScript Code Generation');
console.log('========================================\n');

const tsCode = api.getTypeScriptCode('/users', 'post');
console.log('TypeScript code for POST /users:');
console.log(tsCode);
console.log();

// Example 6: Multiple Operations
console.log('🔄 Example 6: Multiple Operations');
console.log('=================================\n');

const operations = [
  { path: '/users', method: 'get' },
  { path: '/users', method: 'post' },
  { path: '/users/{userId}', method: 'get' },
  { path: '/users/{userId}', method: 'put' }
];

console.log('Sample generation for all operations:');
for (const op of operations) {
  console.log(`\n${op.method.toUpperCase()} ${op.path}:`);
  
  // Request sample
  const requestSample = api.generateJsonSample(op.path, op.method, 'request');
  if (requestSample) {
    console.log('  Request:', JSON.stringify(requestSample));
  }
  
  // Response sample
  const responseSample = api.generateJsonSample(op.path, op.method, 'response');
  if (responseSample) {
    console.log('  Response:', JSON.stringify(responseSample));
  }
}

console.log('\n🎉 Sample generation examples completed successfully!');
console.log('💡 These methods can be used to generate documentation, tests, and client code');
console.log('📄 All generated samples are based on the OpenAPI schema definitions');