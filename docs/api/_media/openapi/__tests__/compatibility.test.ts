/**
 * Compatibility tests to ensure the modernized OpenAPI package maintains backward compatibility
 */

import { describe, expect, test } from 'bun:test';
import { Openapi } from '../src/openapi.js';
import type { OpenAPIDocument } from '../src/types.js';

// Load example OpenAPI documents for testing
import housesExample from '../examples/houses-openapi3.json';
import petstoreExample from '../examples/petstore-openapi3.json';

describe('Backward Compatibility Tests', () => {
  describe('API Surface Compatibility', () => {
    test('should maintain all public methods from v1', () => {
      const api = new Openapi();

      // Core methods that should exist
      expect(typeof api.getDefinition).toBe('function');
      expect(typeof api.getPathNames).toBe('function');
      expect(typeof api.operationExists).toBe('function');
      expect(typeof api.pathExists).toBe('function');
      expect(typeof api.getAllHttpMethods).toBe('function');
      expect(typeof api.getStatusCodes).toBe('function');
      expect(typeof api.getAllStatusCodes).toBe('function');
      expect(typeof api.getSuccessCode).toBe('function');
      expect(typeof api.getOperationId).toBe('function');
      expect(typeof api.setOperationId).toBe('function');
      expect(typeof api.getOperationIds).toBe('function');
      expect(typeof api.isOperationDeprecated).toBe('function');
      expect(typeof api.getOperationDescription).toBe('function');
      expect(typeof api.getOperationData).toBe('function');
      expect(typeof api.getOperationRequestMedia).toBe('function');
      expect(typeof api.getOperationResponseMedia).toBe('function');
      expect(typeof api.getPath).toBe('function');
      expect(typeof api.appendPath).toBe('function');
      expect(typeof api.validate).toBe('function');
    });

    test('should maintain all public properties from v1', () => {
      const api = new Openapi();

      // Properties that should be accessible
      expect('title' in api).toBe(true);
      expect('version' in api).toBe(true);
      expect('description' in api).toBe(true);
      expect('info' in api).toBe(true);
      expect('paths' in api).toBe(true);
      expect('servers' in api).toBe(true);
      expect('components' in api).toBe(true);
      expect('security' in api).toBe(true);
      expect('tags' in api).toBe(true);
      expect('externalDocs' in api).toBe(true);
      expect('contact' in api).toBe(true);
      expect('license' in api).toBe(true);
      expect('httpMethods' in api).toBe(true);
      expect('docVersion' in api).toBe(true);
      expect('baseUri' in api).toBe(true);
      expect('protocols' in api).toBe(true);
    });

    test('should maintain extension methods from v1', () => {
      const api = new Openapi();

      // Extension methods
      expect('rootExtensions' in api).toBe(true);
      expect('infoExtensions' in api).toBe(true);
      expect('pathsExtensions' in api).toBe(true);
      expect(typeof api.appendRootExtension).toBe('function');
      expect(typeof api.appendInfoExtension).toBe('function');
      expect(typeof api.appendPathsExtension).toBe('function');
    });

    test('should maintain legacy alias methods', () => {
      const api = new Openapi();

      // Legacy aliases
      expect(typeof api.getDisplayName).toBe('function');
      expect(typeof api.setDisplayName).toBe('function');
    });
  });

  describe('Real-world Document Compatibility', () => {
    test('should handle houses example document', () => {
      const api = new Openapi(housesExample);

      // Basic functionality should work
      expect(api.validate().valid).toBe(true);
      expect(api.title).toBe('House API Example');
      expect(api.getPathNames().length).toBeGreaterThan(0);
      expect(api.getAllHttpMethods().length).toBeGreaterThan(0);

      // Should be able to access operations
      const pathNames = api.getPathNames();
      if (pathNames.length > 0) {
        const firstPath = pathNames[0];
        const methods = api.getAllHttpMethods();
        if (methods.length > 0) {
          const firstMethod = methods[0];
          if (api.operationExists(firstPath, firstMethod)) {
            expect(typeof api.getOperationId(firstPath, firstMethod)).toBe('string');
            expect(typeof api.getOperationDescription(firstPath, firstMethod)).toBe('string');
          }
        }
      }
    });

    test('should handle petstore example document', () => {
      const api = new Openapi(petstoreExample);

      // Basic functionality should work
      expect(api.validate().valid).toBe(true);
      expect(typeof api.title).toBe('string');
      expect(api.getPathNames().length).toBeGreaterThan(0);

      // Should handle components if they exist
      const components = api.components;
      expect(typeof components).toBe('object');

      // Should handle servers if they exist
      const servers = api.servers;
      expect(Array.isArray(servers)).toBe(true);
    });

    test('should handle documents with extensions', () => {
      const docWithExtensions: OpenAPIDocument = {
        openapi: '3.0.2',
        info: {
          title: 'Extended API',
          version: '1.0.0',
          'x-info-custom': 'info extension',
        },
        paths: {
          '/test': {
            get: {
              responses: {
                '200': {
                  description: 'OK',
                  'x-response-custom': 'response extension',
                },
              },
              'x-operation-custom': 'operation extension',
            },
            'x-path-custom': 'path extension',
          },
          'x-paths-custom': 'paths extension',
        },
        'x-root-custom': 'root extension',
      };

      const api = new Openapi(docWithExtensions);

      // Should preserve extensions
      expect(api.rootExtensions['x-root-custom']).toBe('root extension');
      expect(api.infoExtensions['x-info-custom']).toBe('info extension');
      expect(api.pathsExtensions['x-paths-custom']).toBe('paths extension');

      // Should validate successfully
      expect(api.validate().valid).toBe(true);
    });
  });

  describe('Migration Scenarios', () => {
    test('should handle v1 style document creation', () => {
      // Test creating document step by step like v1
      const api = new Openapi();

      api.title = 'Migration Test API';
      api.version = '1.0.0';
      api.description = 'Testing migration from v1 to v2';

      // Add contact info
      api.contact = {
        name: 'Test Contact',
        email: 'test@example.com',
      };

      // Add license
      api.license = {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      };

      // Add servers
      api.servers = [
        {
          url: 'https://api.example.com',
          description: 'Production server',
        },
      ];

      // Add paths
      api.appendPath('/users', {
        get: {
          operationId: 'getUsers',
          summary: 'Get all users',
          responses: {
            '200': {
              description: 'Success',
            },
          },
        },
      });

      // Verify everything works
      expect(api.title).toBe('Migration Test API');
      expect(api.version).toBe('1.0.0');
      expect(api.contact.name).toBe('Test Contact');
      expect(api.license.name).toBe('MIT');
      expect(api.servers).toHaveLength(1);
      expect(api.pathExists('/users')).toBe(true);
      expect(api.operationExists('/users', 'get')).toBe(true);
      expect(api.validate().valid).toBe(true);
    });

    test('should handle v1 style extension management', () => {
      const api = new Openapi();

      // Add root extensions
      api.rootExtensions = {
        'x-api-version': '2.0',
        'x-generator': 'laag-v2',
      };

      // Append additional root extension
      api.appendRootExtension('x-custom', 'custom-value');

      // Add info extensions
      api.title = 'Test API'; // Ensure info object exists
      api.infoExtensions = {
        'x-info-custom': 'info-value',
      };

      // Append additional info extension
      api.appendInfoExtension('x-info-another', 'another-value');

      // Add paths extensions
      api.pathsExtensions = {
        'x-paths-custom': 'paths-value',
      };

      // Append additional paths extension
      api.appendPathsExtension('x-paths-another', 'another-value');

      // Verify extensions are preserved
      expect(api.rootExtensions['x-api-version']).toBe('2.0');
      expect(api.rootExtensions['x-custom']).toBe('custom-value');
      expect(api.infoExtensions['x-info-custom']).toBe('info-value');
      expect(api.infoExtensions['x-info-another']).toBe('another-value');
      expect(api.pathsExtensions['x-paths-custom']).toBe('paths-value');
      expect(api.pathsExtensions['x-paths-another']).toBe('another-value');
    });

    test('should handle v1 style operation management', () => {
      const api = new Openapi();

      // Add a path with operations
      api.appendPath('/items', {
        get: {
          summary: 'Get items',
          responses: {
            '200': { description: 'Success' },
            '404': { description: 'Not found' },
          },
        },
        post: {
          summary: 'Create item',
          deprecated: true,
          responses: {
            '201': { description: 'Created' },
          },
        },
      });

      // Test operation queries
      expect(api.operationExists('/items', 'get')).toBe(true);
      expect(api.operationExists('/items', 'post')).toBe(true);
      expect(api.operationExists('/items', 'put')).toBe(false);

      // Test operation ID management
      const originalId = api.getOperationId('/items', 'get');
      expect(typeof originalId).toBe('string');

      api.setOperationId('/items', 'get', 'listItems');
      expect(api.getOperationId('/items', 'get')).toBe('listItems');

      // Test legacy display name aliases
      expect(api.getDisplayName('/items', 'get')).toBe('listItems');
      api.setDisplayName('/items', 'get', 'getAllItems');
      expect(api.getDisplayName('/items', 'get')).toBe('getAllItems');

      // Test deprecation check
      expect(api.isOperationDeprecated('/items', 'post')).toBe(true);
      expect(api.isOperationDeprecated('/items', 'get')).toBe(false);

      // Test status codes
      const getCodes = api.getStatusCodes('/items', 'get');
      expect(getCodes.length).toBeGreaterThan(0);
      expect(getCodes.some(c => c.code === '200')).toBe(true);

      const successCode = api.getSuccessCode('/items', 'get');
      expect(successCode).toBe('200');
    });
  });

  describe('Error Handling Compatibility', () => {
    test('should handle invalid documents gracefully', () => {
      // Test with minimal invalid document
      const invalidDoc = { openapi: '3.0.2' }; // Missing required fields
      const api = new Openapi(invalidDoc);

      // Should not throw, but validation should fail
      expect(() => api.validate()).not.toThrow();
      const result = api.validate();
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    test('should handle missing operations gracefully', () => {
      const api = new Openapi();

      // Should return empty/default values for non-existent operations
      expect(api.operationExists('/nonexistent', 'get')).toBe(false);
      expect(api.getOperationId('/nonexistent', 'get')).toBe('getNonexistent');
      expect(api.getOperationDescription('/nonexistent', 'get')).toBe('');
      expect(api.getStatusCodes('/nonexistent', 'get')).toEqual([]);
      expect(api.getSuccessCode('/nonexistent', 'get')).toBe('');
      expect(api.getOperationRequestMedia('/nonexistent', 'get')).toEqual([]);
      expect(api.getOperationResponseMedia('/nonexistent', 'get')).toEqual([]);
    });

    test('should handle missing paths gracefully', () => {
      const api = new Openapi();

      // Should return empty/default values for non-existent paths
      expect(api.pathExists('/nonexistent')).toBe(false);
      expect(api.getPath('/nonexistent')).toEqual({});
    });
  });

  describe('Type Safety with Backward Compatibility', () => {
    test('should maintain type safety while preserving v1 behavior', () => {
      const api = new Openapi();

      // Setting properties should work with proper types
      api.title = 'Typed API';
      api.version = '1.0.0';
      api.description = 'Type-safe API';

      // Getting properties should return expected types
      expect(typeof api.title).toBe('string');
      expect(typeof api.version).toBe('string');
      expect(typeof api.description).toBe('string');

      // Complex objects should maintain type safety
      api.contact = {
        name: 'Contact Name',
        email: 'contact@example.com',
        url: 'https://example.com',
      };

      expect(typeof api.contact).toBe('object');
      expect(typeof api.contact.name).toBe('string');
      expect(typeof api.contact.email).toBe('string');

      // Arrays should maintain type safety
      api.servers = [
        {
          url: 'https://api.example.com',
          description: 'Production',
        },
      ];

      expect(Array.isArray(api.servers)).toBe(true);
      expect(api.servers.length).toBe(1);
      expect(typeof api.servers[0].url).toBe('string');
    });

    test('should handle getDefinition format parameter types', () => {
      const api = new Openapi();
      api.title = 'Format Test';

      // Test different format parameters
      const jsResult = api.getDefinition('js');
      const jsonResult = api.getDefinition('json');
      const prettyResult = api.getDefinition('prettyjson');
      const defaultResult = api.getDefinition();

      expect(typeof jsResult).toBe('object');
      expect(typeof jsonResult).toBe('string');
      expect(typeof prettyResult).toBe('string');
      expect(typeof defaultResult).toBe('object');

      // Pretty JSON should have formatting
      expect(prettyResult.includes('\n')).toBe(true);
      expect(prettyResult.includes('  ')).toBe(true);
    });
  });

  describe('Performance Compatibility', () => {
    test('should handle large documents efficiently', () => {
      // Create a document with many paths
      const largePaths: Record<string, any> = {};
      for (let i = 0; i < 100; i++) {
        largePaths[`/path${i}`] = {
          get: {
            operationId: `getPath${i}`,
            responses: {
              '200': { description: 'Success' },
            },
          },
        };
      }

      const largeDoc: OpenAPIDocument = {
        openapi: '3.0.2',
        info: { title: 'Large API', version: '1.0.0' },
        paths: largePaths,
      };

      const startTime = Date.now();
      const api = new Openapi(largeDoc);
      const constructorTime = Date.now() - startTime;

      // Constructor should be reasonably fast (less than 100ms)
      expect(constructorTime).toBeLessThan(100);

      // Operations should still work efficiently
      const pathNames = api.getPathNames();
      expect(pathNames.length).toBe(100);

      const allMethods = api.getAllHttpMethods();
      expect(allMethods).toContain('get');

      const operationIds = api.getOperationIds();
      expect(operationIds.length).toBe(100);
    });
  });
});
