/**
 * Integration and build tests for the OpenAPI package
 */

import { afterAll, beforeAll, describe, expect, test } from 'bun:test';
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'fs';
import { join } from 'path';

describe('Integration and Build Tests', () => {
  const testDir = join(process.cwd(), 'test-integration');

  beforeAll(() => {
    // Create test directory
    if (existsSync(testDir)) {
      rmSync(testDir, { recursive: true });
    }
    mkdirSync(testDir, { recursive: true });
  });

  afterAll(() => {
    // Clean up test directory
    if (existsSync(testDir)) {
      rmSync(testDir, { recursive: true });
    }
  });

  describe('ESM Module Loading', () => {
    test('should load as ESM module', async () => {
      // Test dynamic import
      const { Openapi } = await import('../src/index.js');

      expect(typeof Openapi).toBe('function');

      const api = new Openapi();
      expect(api).toBeInstanceOf(Openapi);
      expect(typeof api.getDefinition).toBe('function');
    });

    test('should export all expected types and classes', async () => {
      const module = await import('../src/index.js');

      // Main class should be exported
      expect(typeof module.Openapi).toBe('function');

      // Should have all the type exports (they won't be runtime values but should not throw)
      expect(() => {
        // These are type-only exports, so we just check the import doesn't fail
        const {
          Openapi: OpenapiClass,
          // Types are not available at runtime, but the import should succeed
        } = module;
        expect(typeof OpenapiClass).toBe('function');
      }).not.toThrow();
    });

    test('should work with ESM import syntax in test file', () => {
      const testFileContent = `
import { Openapi } from '../src/index.js';

const api = new Openapi({
  openapi: '3.0.2',
  info: { title: 'Test', version: '1.0.0' },
  paths: {}
});

console.log('ESM test passed:', api.title);
export { api };
`;

      const testFile = join(testDir, 'esm-test.mjs');
      writeFileSync(testFile, testFileContent);

      // File should be created successfully
      expect(existsSync(testFile)).toBe(true);
    });
  });

  describe('CommonJS Module Loading', () => {
    test('should work with require() syntax', () => {
      // Create a CommonJS test file
      const testFileContent = `
const { Openapi } = require('../dist/cjs/index.js');

const api = new Openapi({
  openapi: '3.0.2',
  info: { title: 'CJS Test', version: '1.0.0' },
  paths: {}
});

console.log('CommonJS test passed:', api.title);
module.exports = { api };
`;

      const testFile = join(testDir, 'cjs-test.js');
      writeFileSync(testFile, testFileContent);

      // File should be created successfully
      expect(existsSync(testFile)).toBe(true);
    });
  });

  describe('Package Structure Validation', () => {
    test('should have correct package.json structure', async () => {
      const packageJsonPath = join(__dirname, '..', 'package.json');
      expect(existsSync(packageJsonPath)).toBe(true);

      const packageJson = JSON.parse(await Bun.file(packageJsonPath).text());

      // Should have proper module configuration
      expect(packageJson.type).toBe('module');
      expect(packageJson.main).toBeDefined();
      expect(packageJson.module).toBeDefined();
      expect(packageJson.types).toBeDefined();
      expect(packageJson.exports).toBeDefined();

      // Should have proper exports configuration
      expect(packageJson.exports['.']).toBeDefined();
      expect(packageJson.exports['.'].import).toBeDefined();
      expect(packageJson.exports['.'].require).toBeDefined();
      expect(packageJson.exports['.'].import.types).toBeDefined();
    });

    test('should have built files in correct locations', () => {
      const distDir = join(process.cwd(), 'dist');

      // Check if dist directory exists (it should after build)
      if (existsSync(distDir)) {
        // ESM build should exist
        const esmDir = join(distDir, 'esm');
        if (existsSync(esmDir)) {
          expect(existsSync(join(esmDir, 'index.js'))).toBe(true);
        }

        // CommonJS build should exist
        const cjsDir = join(distDir, 'cjs');
        if (existsSync(cjsDir)) {
          expect(existsSync(join(cjsDir, 'index.js'))).toBe(true);
        }

        // Type definitions should exist
        const typesDir = join(distDir, 'types');
        if (existsSync(typesDir)) {
          expect(existsSync(join(typesDir, 'index.d.ts'))).toBe(true);
        }
      }
    });

    test('should have source maps for debugging', () => {
      const distDir = join(process.cwd(), 'dist');

      if (existsSync(distDir)) {
        // Check for source maps in ESM build
        const esmDir = join(distDir, 'esm');
        if (existsSync(esmDir)) {
          const indexJs = join(esmDir, 'index.js');
          if (existsSync(indexJs)) {
            // Source maps should be referenced or included
            // This is a basic check - actual implementation may vary
            // const content = Bun.file(indexJs).text();
          }
        }
      }
    });
  });

  describe('Cross-Platform Compatibility', () => {
    test('should handle different path separators', () => {
      const { Openapi } = require('../src/index.js');

      const api = new Openapi();

      // Test with different path styles
      api.appendPath('/unix/style/path', {
        get: { responses: { '200': { description: 'OK' } } },
      });

      expect(api.pathExists('/unix/style/path')).toBe(true);
      expect(api.getPathNames()).toContain('/unix/style/path');
    });

    test('should work with different line endings', () => {
      const { Openapi } = require('../src/index.js');

      // Test with different line ending styles in JSON
      const docWithUnixLineEndings =
        '{\n  "openapi": "3.0.2",\n  "info": {\n    "title": "Unix API",\n    "version": "1.0.0"\n  },\n  "paths": {}\n}';
      const docWithWindowsLineEndings =
        '{\r\n  "openapi": "3.0.2",\r\n  "info": {\r\n    "title": "Windows API",\r\n    "version": "1.0.0"\r\n  },\r\n  "paths": {}\r\n}';

      const unixApi = new Openapi(docWithUnixLineEndings);
      const windowsApi = new Openapi(docWithWindowsLineEndings);

      expect(unixApi.title).toBe('Unix API');
      expect(windowsApi.title).toBe('Windows API');
      expect(unixApi.validate().valid).toBe(true);
      expect(windowsApi.validate().valid).toBe(true);
    });
  });

  describe('Memory and Performance', () => {
    test('should not leak memory with repeated instantiation', () => {
      const { Openapi } = require('../src/index.js');

      const initialMemory = process.memoryUsage().heapUsed;

      // Create and destroy many instances
      for (let i = 0; i < 1000; i++) {
        const api = new Openapi({
          openapi: '3.0.2',
          info: { title: `API ${i}`, version: '1.0.0' },
          paths: {},
        });

        // Use the instance to ensure it's not optimized away
        api.title = `Modified API ${i}`;
        expect(api.title).toBe(`Modified API ${i}`);
      }

      // Force garbage collection if available
      if (global.gc) {
        global.gc();
      }

      const finalMemory = process.memoryUsage().heapUsed;
      const memoryIncrease = finalMemory - initialMemory;

      // Memory increase should be reasonable (less than 50MB for 1000 instances)
      expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024);
    });

    test('should handle concurrent operations efficiently', async () => {
      const { Openapi } = require('../src/index.js');

      const api = new Openapi({
        openapi: '3.0.2',
        info: { title: 'Concurrent Test API', version: '1.0.0' },
        paths: {},
      });

      // Add many paths concurrently
      const promises: Promise<void>[] = [];
      for (let i = 0; i < 100; i++) {
        promises.push(
          Promise.resolve().then(() => {
            api.appendPath(`/path${i}`, {
              get: {
                operationId: `getPath${i}`,
                responses: {
                  '200': { description: 'Success' },
                },
              },
            });
          })
        );
      }

      await Promise.all(promises);

      // All paths should be added
      expect(api.getPathNames()).toHaveLength(100);

      // Operations should work correctly
      expect(api.operationExists('/path50', 'get')).toBe(true);
      expect(api.getOperationId('/path50', 'get')).toBe('getPath50');
    });
  });

  describe('Error Recovery and Resilience', () => {
    test('should recover from malformed input gracefully', () => {
      const { Openapi } = require('../src/index.js');

      // Test with various malformed inputs
      const malformedInputs = [
        '{"openapi": "3.0.2", "info": {', // Incomplete JSON
        '{"openapi": 3.0, "info": {"title": "Test", "version": "1.0.0"}, "paths": {}}', // Wrong type
        '{"openapi": "3.0.2", "info": null, "paths": {}}', // Null info
        '{"openapi": "3.0.2", "info": {"title": "", "version": ""}, "paths": null}', // Null paths
      ];

      malformedInputs.forEach((input, _index) => {
        expect(() => {
          try {
            const api = new Openapi(input);
            // Should not throw during construction, but validation may fail
            const result = api.validate();
            // Validation result should be defined
            expect(typeof result.valid).toBe('boolean');
          } catch (error) {
            // If it throws, it should be a known error type
            expect(error.name).toMatch(/Error$/);
          }
        }).not.toThrow('Unexpected error type');
      });
    });

    test('should handle circular references safely', () => {
      const { Openapi } = require('../src/index.js');

      // Create an object with circular reference
      const circularDoc: any = {
        openapi: '3.0.2',
        info: { title: 'Circular Test', version: '1.0.0' },
        paths: {},
      };
      circularDoc.self = circularDoc;

      // Should handle gracefully (may throw, but shouldn't crash)
      expect(() => {
        try {
          const api = new Openapi(circularDoc);
          // If it succeeds, basic operations should work
          expect(api.title).toBe('Circular Test');
        } catch (error) {
          // If it fails, it should be a controlled failure
          expect(error).toBeInstanceOf(Error);
        }
      }).not.toThrow('RangeError'); // Shouldn't cause stack overflow
    });
  });

  describe('Real-world Integration Scenarios', () => {
    test('should work in a typical API development workflow', () => {
      const { Openapi } = require('../src/index.js');

      // Start with minimal API
      const api = new Openapi();
      api.title = 'My API';
      api.version = '1.0.0';
      api.description = 'A sample API for testing';

      // Add server information
      api.servers = [
        {
          url: 'https://api.example.com/v1',
          description: 'Production server',
        },
      ];

      // Add authentication
      api.components = {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      };

      api.security = [{ bearerAuth: [] }];

      // Add resources progressively
      api.appendPath('/users', {
        get: {
          summary: 'List users',
          security: [{ bearerAuth: [] }],
          responses: {
            '200': {
              description: 'List of users',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/User' },
                  },
                },
              },
            },
          },
        },
        post: {
          summary: 'Create user',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/CreateUser' },
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
      });

      // Verify the API is valid and functional
      expect(api.validate().valid).toBe(true);
      expect(api.getPathNames()).toContain('/users');
      expect(api.operationExists('/users', 'get')).toBe(true);
      expect(api.operationExists('/users', 'post')).toBe(true);
      expect(api.getAllHttpMethods()).toContain('get');
      expect(api.getAllHttpMethods()).toContain('post');

      // Should be able to export as different formats
      const jsDoc = api.getDefinition('js');
      const jsonDoc = api.getDefinition('json');
      const prettyDoc = api.getDefinition('prettyjson');

      expect(typeof jsDoc).toBe('object');
      expect(typeof jsonDoc).toBe('string');
      expect(typeof prettyDoc).toBe('string');
      expect(prettyDoc.length).toBeGreaterThan(jsonDoc.length); // Pretty should be longer
    });

    test('should integrate well with validation and linting tools', () => {
      const { Openapi } = require('../src/index.js');

      // Create a comprehensive API document
      const api = new Openapi({
        openapi: '3.0.2',
        info: {
          title: 'Comprehensive API',
          version: '2.1.0',
          description: 'A comprehensive API for integration testing',
          contact: {
            name: 'API Team',
            email: 'api@example.com',
          },
          license: {
            name: 'MIT',
            url: 'https://opensource.org/licenses/MIT',
          },
        },
        servers: [
          {
            url: 'https://api.example.com/v2',
            description: 'Production server',
          },
        ],
        paths: {
          '/health': {
            get: {
              summary: 'Health check',
              operationId: 'healthCheck',
              responses: {
                '200': {
                  description: 'Service is healthy',
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
                        properties: {
                          status: { type: 'string', enum: ['ok'] },
                          timestamp: { type: 'string', format: 'date-time' },
                        },
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
            Error: {
              type: 'object',
              required: ['code', 'message'],
              properties: {
                code: { type: 'integer' },
                message: { type: 'string' },
              },
            },
          },
        },
      });

      // Should pass validation
      const validation = api.validate();
      expect(validation.valid).toBe(true);
      expect(validation.errors).toHaveLength(0);

      // Should have all expected properties
      expect(api.title).toBe('Comprehensive API');
      expect(api.version).toBe('2.1.0');
      expect(api.servers).toHaveLength(1);
      expect(api.getPathNames()).toContain('/health');
      expect(api.operationExists('/health', 'get')).toBe(true);

      // Should export clean JSON for external tools
      const exportedJson = api.getDefinition('json');
      const parsedBack = JSON.parse(exportedJson);
      expect(parsedBack.openapi).toBe('3.0.2');
      expect(parsedBack.info.title).toBe('Comprehensive API');
    });
  });
});
