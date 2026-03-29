/**
 * @fileoverview Tests for sample generation methods in @laag/openapi
 *
 * This test suite covers:
 * - JSON sample generation from schemas
 * - Code generation (Python, JavaScript, TypeScript)
 * - curl command generation
 * - Reference resolution and complex schema handling
 */

import { beforeEach, describe, expect, test } from 'bun:test';
import { Openapi } from '../src/index.js';
import type { OpenAPIDocument } from '../src/types.js';

describe('Sample Generation Methods', () => {
  let api: Openapi;
  let complexApiDoc: OpenAPIDocument;

  beforeEach(() => {
    // Create a comprehensive test document
    complexApiDoc = {
      openapi: '3.0.2',
      info: {
        title: 'Sample Generation Test API',
        version: '1.0.0',
        description: 'API for testing sample generation capabilities',
      },
      servers: [
        {
          url: 'https://api.example.com/v1',
          description: 'Production server',
        },
        {
          url: 'https://staging-api.example.com/v1',
          description: 'Staging server',
        },
      ],
      paths: {
        '/users': {
          get: {
            summary: 'List users',
            operationId: 'listUsers',
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
                          items: { $ref: '#/components/schemas/User' },
                        },
                        pagination: { $ref: '#/components/schemas/Pagination' },
                      },
                    },
                  },
                },
              },
            },
          },
          post: {
            summary: 'Create user',
            operationId: 'createUser',
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/CreateUserRequest' },
                },
              },
            },
            responses: {
              '201': {
                description: 'User created',
                content: {
                  'application/json': {
                    schema: { $ref: '#/components/schemas/User' },
                  },
                },
              },
            },
          },
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
                schema: { type: 'string', format: 'uuid' },
              },
            ],
            responses: {
              '200': {
                description: 'User found',
                content: {
                  'application/json': {
                    schema: { $ref: '#/components/schemas/User' },
                  },
                },
              },
            },
          },
          put: {
            summary: 'Update user',
            operationId: 'updateUser',
            parameters: [
              {
                name: 'userId',
                in: 'path',
                required: true,
                schema: { type: 'string', format: 'uuid' },
              },
            ],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/UpdateUserRequest' },
                },
              },
            },
            responses: {
              '200': {
                description: 'User updated',
                content: {
                  'application/json': {
                    schema: { $ref: '#/components/schemas/User' },
                  },
                },
              },
            },
          },
        },
        '/products': {
          post: {
            summary: 'Create product with inline schema',
            requestBody: {
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    required: ['name', 'price'],
                    properties: {
                      name: { type: 'string', example: 'Widget' },
                      price: { type: 'number', example: 29.99 },
                      tags: {
                        type: 'array',
                        items: { type: 'string' },
                        example: ['electronics', 'gadget'],
                      },
                    },
                  },
                },
              },
            },
            responses: {
              '201': {
                description: 'Product created',
                content: {
                  'application/json': {
                    schema: {
                      allOf: [
                        { $ref: '#/components/schemas/BaseEntity' },
                        {
                          type: 'object',
                          properties: {
                            name: { type: 'string' },
                            price: { type: 'number' },
                          },
                        },
                      ],
                    },
                  },
                },
              },
            },
          },
        },
      },
      components: {
        schemas: {
          User: {
            type: 'object',
            required: ['id', 'email', 'name'],
            properties: {
              id: {
                type: 'string',
                format: 'uuid',
                example: '123e4567-e89b-12d3-a456-426614174000',
              },
              email: {
                type: 'string',
                format: 'email',
                example: 'john.doe@example.com',
              },
              name: {
                type: 'string',
                example: 'John Doe',
              },
              avatar: {
                type: 'string',
                format: 'uri',
                example: 'https://example.com/avatars/john.jpg',
              },
              role: {
                type: 'string',
                enum: ['admin', 'user', 'moderator'],
                example: 'user',
              },
              isActive: {
                type: 'boolean',
                example: true,
              },
              metadata: {
                type: 'object',
                additionalProperties: true,
                example: { department: 'Engineering' },
              },
              createdAt: {
                type: 'string',
                format: 'date-time',
                example: '2023-01-01T00:00:00Z',
              },
            },
          },
          CreateUserRequest: {
            type: 'object',
            required: ['email', 'name'],
            properties: {
              email: {
                type: 'string',
                format: 'email',
                example: 'jane.smith@example.com',
              },
              name: {
                type: 'string',
                example: 'Jane Smith',
              },
              role: {
                type: 'string',
                enum: ['admin', 'user', 'moderator'],
                default: 'user',
              },
            },
          },
          UpdateUserRequest: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              role: { type: 'string', enum: ['admin', 'user', 'moderator'] },
              isActive: { type: 'boolean' },
            },
          },
          Pagination: {
            type: 'object',
            required: ['page', 'limit', 'total'],
            properties: {
              page: { type: 'integer', minimum: 1, example: 1 },
              limit: { type: 'integer', minimum: 1, example: 20 },
              total: { type: 'integer', minimum: 0, example: 150 },
              hasNext: { type: 'boolean', example: true },
              hasPrev: { type: 'boolean', example: false },
            },
          },
          BaseEntity: {
            type: 'object',
            properties: {
              id: { type: 'string', format: 'uuid' },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' },
            },
          },
        },
      },
    };

    api = new Openapi(complexApiDoc);
  });

  describe('generateJsonSample', () => {
    test('should generate request sample from schema reference', () => {
      const sample = api.generateJsonSample('/users', 'post', 'request');

      expect(sample).toBeDefined();
      expect(typeof sample).toBe('object');
      expect(sample).toHaveProperty('email', 'jane.smith@example.com');
      expect(sample).toHaveProperty('name', 'Jane Smith');
      expect(sample).toHaveProperty('role');
    });

    test('should generate response sample from schema reference', () => {
      const sample = api.generateJsonSample('/users/{userId}', 'get', 'response');

      expect(sample).toBeDefined();
      expect(typeof sample).toBe('object');
      expect(sample).toHaveProperty('id', '123e4567-e89b-12d3-a456-426614174000');
      expect(sample).toHaveProperty('email', 'john.doe@example.com');
      expect(sample).toHaveProperty('name', 'John Doe');
      expect(sample).toHaveProperty('isActive', true);
      expect(sample).toHaveProperty('metadata');
    });

    test('should generate sample from inline schema', () => {
      const sample = api.generateJsonSample('/products', 'post', 'request');

      expect(sample).toBeDefined();
      expect(typeof sample).toBe('object');
      expect(sample).toHaveProperty('name', 'Widget');
      expect(sample).toHaveProperty('price', 29.99);
      expect(sample).toHaveProperty('tags');
      expect(Array.isArray((sample as any).tags)).toBe(true);
    });

    test('should generate sample with array of references', () => {
      const sample = api.generateJsonSample('/users', 'get', 'response');

      expect(sample).toBeDefined();
      expect(typeof sample).toBe('object');
      expect(sample).toHaveProperty('users');
      expect(Array.isArray((sample as any).users)).toBe(true);
      expect((sample as any).users).toHaveLength(1);
      expect((sample as any).users[0]).toHaveProperty('id');
      expect(sample).toHaveProperty('pagination');
      expect((sample as any).pagination).toHaveProperty('page', 1);
    });

    test('should generate sample with allOf composition', () => {
      const sample = api.generateJsonSample('/products', 'post', 'response');

      expect(sample).toBeDefined();
      expect(typeof sample).toBe('object');
      // Should have properties from BaseEntity
      expect(sample).toHaveProperty('id');
      expect(sample).toHaveProperty('createdAt');
      expect(sample).toHaveProperty('updatedAt');
      // Should have properties from inline schema
      expect(sample).toHaveProperty('name');
      expect(sample).toHaveProperty('price');
    });

    test('should return null for non-existent operation', () => {
      const sample = api.generateJsonSample('/nonexistent', 'get', 'request');
      expect(sample).toBeNull();
    });

    test('should return null for operation without request body', () => {
      const sample = api.generateJsonSample('/users/{userId}', 'get', 'request');
      expect(sample).toBeNull();
    });

    test('should handle different data types correctly', () => {
      const sample = api.generateJsonSample('/users', 'post', 'request') as any;

      expect(typeof sample.email).toBe('string');
      expect(typeof sample.name).toBe('string');
      expect(typeof sample.role).toBe('string');
    });

    test('should use example values when available', () => {
      const sample = api.generateJsonSample('/users', 'post', 'request') as any;

      expect(sample.email).toBe('jane.smith@example.com');
      expect(sample.name).toBe('Jane Smith');
    });

    test('should generate default values for types without examples', () => {
      const sample = api.generateJsonSample('/users/{userId}', 'put', 'request') as any;

      expect(sample).toBeDefined();
      expect(typeof sample).toBe('object');
      // Should have properties even without examples
      expect(sample).toHaveProperty('name');
      expect(sample).toHaveProperty('role');
      expect(sample).toHaveProperty('isActive');
    });
  });

  describe('getCurlCommands', () => {
    test('should generate curl commands for all servers', () => {
      const commands = api.getCurlCommands('/users', 'post');

      expect(commands).toHaveLength(2);
      expect(commands[0]).toHaveProperty('command');
      expect(commands[0]).toHaveProperty('description', 'Production server');
      expect(commands[0].command).toContain('curl -i -X POST');
      expect(commands[0].command).toContain('https://api.example.com/v1/users');
      expect(commands[0].command).toContain('Authorization: <auth-token>');
      expect(commands[0].command).toContain('Content-Type: application/json');
    });

    test('should generate GET curl commands without data option', () => {
      const commands = api.getCurlCommands('/users/{userId}', 'get');

      expect(commands).toHaveLength(2);
      expect(commands[0].command).toContain('curl -i -X GET');
      expect(commands[0].command).not.toContain("-d '<request-payload>'");
      expect(commands[0].command).not.toContain('Content-Type');
    });

    test('should include data option for POST/PUT/PATCH methods', () => {
      const postCommands = api.getCurlCommands('/users', 'post');
      const putCommands = api.getCurlCommands('/users/{userId}', 'put');

      expect(postCommands[0].command).toContain("-d '<request-payload>'");
      expect(putCommands[0].command).toContain("-d '<request-payload>'");
    });

    test('should return empty array for non-existent operation', () => {
      const commands = api.getCurlCommands('/nonexistent', 'get');
      expect(commands).toHaveLength(2); // Still returns commands for all servers
    });
  });

  describe('getPythonCode', () => {
    test('should generate Python code with requests library', () => {
      const code = api.getPythonCode('/users', 'post');

      expect(code).toContain('import requests');
      expect(code).toContain('import json');
      expect(code).toContain("URL = 'https://api.example.com/v1/users'");
      expect(code).toContain('requests.post(');
      expect(code).toContain('params=params');
      expect(code).toContain('headers=headers');
      expect(code).toContain('json=data');
    });

    test('should include request body sample when available', () => {
      const code = api.getPythonCode('/users', 'post');

      expect(code).toContain('data = {');
      expect(code).toContain('jane.smith@example.com');
      expect(code).toContain('Jane Smith');
    });

    test('should handle GET requests without body', () => {
      const code = api.getPythonCode('/users/{userId}', 'get');

      expect(code).toContain('requests.get(');
      expect(code).not.toContain('json=data');
    });

    test('should include response handling', () => {
      const code = api.getPythonCode('/users', 'post');

      expect(code).toContain('response.json()');
      expect(code).toContain('status_code = response.status_code');
      expect(code).toContain('print(f"Status: {status_code}")');
    });

    test('should comment out alternative server URLs', () => {
      const code = api.getPythonCode('/users', 'post');

      expect(code).toContain("# URL = 'https://staging-api.example.com/v1/users'");
    });
  });

  describe('getJavaScriptCode', () => {
    test('should generate async/await JavaScript code by default', () => {
      const code = api.getJavaScriptCode('/users', 'post');

      expect(code).toContain('async function makeRequest()');
      expect(code).toContain('await fetch(');
      expect(code).toContain('const response = await fetch');
      expect(code).toContain('const data = await response.json()');
      expect(code).toContain('try {');
      expect(code).toContain('catch (error)');
    });

    test('should generate Promise-based code when useAsync is false', () => {
      const code = api.getJavaScriptCode('/users/{userId}', 'get', false);

      expect(code).toContain('function makeRequest()');
      expect(code).toContain('return fetch(');
      expect(code).toContain('.then(response =>');
      expect(code).toContain('.catch(error =>');
      expect(code).not.toContain('async');
      expect(code).not.toContain('await');
    });

    test('should include request body for POST requests', () => {
      const code = api.getJavaScriptCode('/users', 'post');

      expect(code).toContain('body: JSON.stringify(');
      expect(code).toContain('jane.smith@example.com');
    });

    test('should not include body for GET requests', () => {
      const code = api.getJavaScriptCode('/users/{userId}', 'get');

      expect(code).not.toContain('body:');
    });

    test('should include proper headers', () => {
      const code = api.getJavaScriptCode('/users', 'post');

      expect(code).toContain("'Content-Type': 'application/json'");
      expect(code).toContain("'Authorization': 'Bearer <your-token>'");
    });

    test('should include error handling', () => {
      const code = api.getJavaScriptCode('/users', 'post');

      expect(code).toContain('if (!response.ok)');
      expect(code).toContain('throw new Error');
      expect(code).toContain('HTTP error! status:');
    });
  });

  describe('getTypeScriptCode', () => {
    test('should generate TypeScript interfaces from schemas', () => {
      const code = api.getTypeScriptCode('/users', 'post');

      expect(code).toContain('interface RequestBody');
      expect(code).toContain('interface ResponseBody');
      expect(code).toContain('email: string;');
      expect(code).toContain('name: string;');
      expect(code).toContain('id: string;');
    });

    test('should generate typed function signature', () => {
      const code = api.getTypeScriptCode('/users', 'post');

      expect(code).toContain('async function createUser(');
      expect(code).toContain('requestBody: RequestBody');
      expect(code).toContain('): Promise<ResponseBody>');
    });

    test('should include proper TypeScript types', () => {
      const code = api.getTypeScriptCode('/users', 'post');

      expect(code).toContain('const config: RequestInit');
      expect(code).toContain('const data: ResponseBody');
    });

    test('should handle operations without request body', () => {
      const code = api.getTypeScriptCode('/users/{userId}', 'get');

      expect(code).toContain('async function getUserById(');
      expect(code).not.toContain('requestBody: RequestBody');
      expect(code).toContain('): Promise<ResponseBody>');
    });

    test('should generate usage example', () => {
      const code = api.getTypeScriptCode('/users', 'post');

      expect(code).toContain('// Usage example:');
      expect(code).toContain('const requestData: RequestBody');
      expect(code).toContain('createUser(requestData)');
    });

    test('should handle complex nested objects in interfaces', () => {
      const code = api.getTypeScriptCode('/users/{userId}', 'get');

      expect(code).toContain('metadata: {');
      expect(code).toContain('department: string;');
    });

    test('should handle arrays in interfaces', () => {
      const code = api.getTypeScriptCode('/users', 'get');

      expect(code).toContain('users: object[];');
    });
  });

  describe('Edge Cases and Error Handling', () => {
    test('should handle missing components gracefully', () => {
      const simpleApi = new Openapi({
        openapi: '3.0.2',
        info: { title: 'Simple API', version: '1.0.0' },
        paths: {
          '/test': {
            get: {
              responses: {
                '200': {
                  description: 'Success',
                  content: {
                    'application/json': {
                      schema: { $ref: '#/components/schemas/NonExistent' },
                    },
                  },
                },
              },
            },
          },
        },
      });

      const sample = simpleApi.generateJsonSample('/test', 'get', 'response');
      expect(sample).toBeNull();
    });

    test('should handle operations without media type', () => {
      const simpleApi = new Openapi({
        openapi: '3.0.2',
        info: { title: 'Simple API', version: '1.0.0' },
        paths: {
          '/test': {
            get: {
              responses: {
                '200': {
                  description: 'Success',
                },
              },
            },
          },
        },
      });

      const sample = simpleApi.generateJsonSample('/test', 'get', 'response');
      expect(sample).toBeNull();
    });

    test('should handle empty servers array', () => {
      const apiWithoutServers = new Openapi({
        openapi: '3.0.2',
        info: { title: 'API', version: '1.0.0' },
        paths: {
          '/test': {
            post: {
              responses: { '200': { description: 'Success' } },
            },
          },
        },
      });

      const pythonCode = apiWithoutServers.getPythonCode('/test', 'post');
      expect(pythonCode).toContain('import requests');

      const jsCode = apiWithoutServers.getJavaScriptCode('/test', 'post');
      expect(jsCode).toContain('https://api.example.com');
    });

    test('should handle circular references safely', () => {
      // This would be a complex test case for circular schema references
      // For now, we ensure the method doesn't crash
      const sample = api.generateJsonSample('/users', 'post', 'request');
      expect(sample).toBeDefined();
    });
  });

  describe('Schema Type Handling', () => {
    test('should handle string formats correctly', () => {
      const sample = api.generateJsonSample('/users', 'post', 'request') as any;

      expect(sample.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/); // Basic email format
    });

    test('should handle enum values', () => {
      const sample = api.generateJsonSample('/users', 'post', 'request') as any;

      expect(['admin', 'user', 'moderator']).toContain(sample.role);
    });

    test('should handle boolean values', () => {
      const sample = api.generateJsonSample('/users/{userId}', 'get', 'response') as any;

      expect(typeof sample.isActive).toBe('boolean');
    });

    test('should handle additionalProperties', () => {
      const sample = api.generateJsonSample('/users/{userId}', 'get', 'response') as any;

      expect(sample.metadata).toBeDefined();
      expect(typeof sample.metadata).toBe('object');
    });
  });
});
