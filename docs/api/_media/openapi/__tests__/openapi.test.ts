/**
 * Comprehensive unit tests for the modernized OpenAPI TypeScript implementation
 */

import { ParseError, ValidationError } from '@laag/core';
import { beforeEach, describe, expect, test } from 'bun:test';
import { Openapi } from '../src/openapi.js';
import type {
  ContactObject,
  InfoObject,
  LicenseObject,
  OpenAPIDocument,
  ServerObject,
} from '../src/types.js';

// Sample OpenAPI document for testing
const sampleOpenAPIDocTemplate: OpenAPIDocument = {
  openapi: '3.0.2',
  info: {
    title: 'Test API',
    version: '1.0.0',
    description: 'A test API for unit testing',
    contact: {
      name: 'Test Contact',
      email: 'test@example.com',
    },
  },
  paths: {
    '/users': {
      get: {
        operationId: 'getUsers',
        summary: 'Get all users',
        description: 'Get all users',
        responses: {
          '200': {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { type: 'object' },
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
        },
      },
      post: {
        operationId: 'createUser',
        summary: 'Create a user',
        deprecated: true,
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { type: 'object' },
            },
          },
        },
        responses: {
          '201': {
            description: 'Created',
          },
        },
      },
    },
    '/users/{id}': {
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' },
        },
      ],
      get: {
        operationId: 'getUserById',
        responses: {
          '200': {
            description: 'Success',
          },
          '404': {
            description: 'Not Found',
          },
        },
      },
      delete: {
        operationId: 'deleteUser',
        responses: {
          '204': {
            description: 'No Content',
          },
        },
      },
    },
  },
  components: {
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
        },
      },
    },
  },
  'x-custom-extension': 'test-value',
};

// Helper function to get a fresh copy of the sample document
const getSampleDoc = (): OpenAPIDocument => JSON.parse(JSON.stringify(sampleOpenAPIDocTemplate));

describe('Openapi', () => {
  let api: Openapi;

  beforeEach(() => {
    api = new Openapi();
  });

  describe('constructor', () => {
    test('should create empty OpenAPI document when no input provided', () => {
      const doc = api.getDefinition() as OpenAPIDocument;
      expect(doc.openapi).toBe('3.0.2');
      expect(doc.info.title).toBe('');
      expect(doc.info.version).toBe('1.0.0');
      expect(doc.paths).toEqual({});
    });

    test('should initialize with provided OpenAPI document object', () => {
      const openapi = new Openapi(getSampleDoc());
      const doc = openapi.getDefinition() as OpenAPIDocument;
      expect(doc.info.title).toBe('Test API');
      expect(doc.paths['/users']).toBeDefined();
    });

    test('should parse JSON string document', () => {
      const jsonString = JSON.stringify(getSampleDoc());
      const openapi = new Openapi(jsonString);
      const doc = openapi.getDefinition() as OpenAPIDocument;
      expect(doc.info.title).toBe('Test API');
    });

    test('should throw ParseError for invalid JSON string', () => {
      expect(() => {
        new Openapi('invalid json {');
      }).toThrow(ParseError);
    });

    test('should preserve extensions in constructor', () => {
      const openapi = new Openapi(getSampleDoc());
      const doc = openapi.getDefinition() as OpenAPIDocument;
      expect(doc['x-custom-extension']).toBe('test-value');
    });
  });

  describe('validation', () => {
    test('should validate complete OpenAPI document', () => {
      const openapi = new Openapi(getSampleDoc());
      const result = openapi.validate();
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should fail validation for missing openapi version', () => {
      // Create an instance and manually remove the openapi field after construction
      const openapi = new Openapi(getSampleDoc());
      delete (openapi as any).doc.openapi;
      const result = openapi.validate();
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.path === 'openapi')).toBe(true);
    });

    test('should fail validation for missing info object', () => {
      // Create an instance and manually remove the info field after construction
      const openapi = new Openapi(getSampleDoc());
      delete (openapi as any).doc.info;
      const result = openapi.validate();
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.path === 'info')).toBe(true);
    });

    test('should fail validation for missing info.title', () => {
      const openapi = new Openapi(getSampleDoc());
      delete ((openapi as any).doc.info as any).title;
      const result = openapi.validate();
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.path === 'info.title')).toBe(true);
    });

    test('should fail validation for missing info.version', () => {
      const openapi = new Openapi(getSampleDoc());
      delete ((openapi as any).doc.info as any).version;
      const result = openapi.validate();
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.path === 'info.version')).toBe(true);
    });

    test('should fail validation for missing paths object', () => {
      const openapi = new Openapi(getSampleDoc());
      delete (openapi as any).doc.paths;
      const result = openapi.validate();
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.path === 'paths')).toBe(true);
    });
  });

  describe('getDefinition', () => {
    test('should return JavaScript object by default', () => {
      api.title = 'Test API';
      const def = api.getDefinition();
      expect(typeof def).toBe('object');
      expect((def as OpenAPIDocument).info.title).toBe('Test API');
    });

    test('should return JSON string when format is "json"', () => {
      api.title = 'Test API';
      const def = api.getDefinition('json');
      expect(typeof def).toBe('string');
      const parsed = JSON.parse(def as string);
      expect(parsed.info.title).toBe('Test API');
    });

    test('should return pretty JSON when format is "prettyjson"', () => {
      api.title = 'Test API';
      const def = api.getDefinition('prettyjson');
      expect(typeof def).toBe('string');
      expect((def as string).includes('\n')).toBe(true);
      expect((def as string).includes('  ')).toBe(true);
    });
  });

  describe('info object management', () => {
    test('should get and set info object', () => {
      const info: InfoObject = {
        title: 'My API',
        version: '2.0.0',
        description: 'Test description',
      };
      api.info = info;
      expect(api.info.title).toBe('My API');
      expect(api.info.version).toBe('2.0.0');
      expect(api.info.description).toBe('Test description');
    });

    test('should filter out invalid properties when setting info', () => {
      const info = {
        title: 'My API',
        version: '2.0.0',
        invalidProperty: 'should be filtered',
        'x-custom': 'should be kept',
      };
      api.info = info as InfoObject;
      expect(api.info.title).toBe('My API');
      expect((api.info as any).invalidProperty).toBeUndefined();
      expect((api.info as any)['x-custom']).toBe('should be kept');
    });

    test('should get and set title', () => {
      api.title = 'New Title';
      expect(api.title).toBe('New Title');
    });

    test('should get and set description', () => {
      api.description = 'New Description';
      expect(api.description).toBe('New Description');
    });

    test('should get and set version', () => {
      api.version = '3.0.0';
      expect(api.version).toBe('3.0.0');
    });

    test('should get and set termsOfService', () => {
      api.termsOfService = 'https://example.com/terms';
      expect(api.termsOfService).toBe('https://example.com/terms');
    });

    test('should return null for missing properties', () => {
      // Create a fresh instance without any data
      const freshApi = new Openapi();
      expect(freshApi.title).toBe(''); // Constructor initializes with empty string
      expect(freshApi.description).toBeNull();
      expect(freshApi.version).toBe('1.0.0'); // Constructor initializes with default version
      expect(freshApi.termsOfService).toBeNull();
    });
  });

  describe('contact object management', () => {
    test('should get and set contact object', () => {
      const contact: ContactObject = {
        name: 'John Doe',
        email: 'john@example.com',
        url: 'https://example.com',
      };
      api.contact = contact;
      expect(api.contact.name).toBe('John Doe');
      expect(api.contact.email).toBe('john@example.com');
      expect(api.contact.url).toBe('https://example.com');
    });

    test('should filter out invalid properties when setting contact', () => {
      const contact = {
        name: 'John Doe',
        email: 'john@example.com',
        invalidProperty: 'should be filtered',
        'x-custom': 'should be kept',
      };
      api.contact = contact as ContactObject;
      expect(api.contact.name).toBe('John Doe');
      expect((api.contact as any).invalidProperty).toBeUndefined();
      expect((api.contact as any)['x-custom']).toBe('should be kept');
    });

    test('should return empty object for missing contact', () => {
      expect(api.contact).toEqual({});
    });
  });

  describe('license object management', () => {
    test('should get and set license object', () => {
      const license: LicenseObject = {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      };
      api.license = license;
      expect(api.license.name).toBe('MIT');
      expect(api.license.url).toBe('https://opensource.org/licenses/MIT');
    });

    test('should filter out invalid properties when setting license', () => {
      const license = {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
        invalidProperty: 'should be filtered',
        'x-custom': 'should be kept',
      };
      api.license = license as LicenseObject;
      expect(api.license.name).toBe('MIT');
      expect((api.license as any).invalidProperty).toBeUndefined();
      expect((api.license as any)['x-custom']).toBe('should be kept');
    });

    test('should ensure name property exists', () => {
      const license = { url: 'https://example.com' };
      api.license = license as LicenseObject;
      expect(api.license.name).toBe('');
    });
  });

  describe('servers management', () => {
    test('should get and set servers array', () => {
      const servers: ServerObject[] = [
        {
          url: 'https://api.example.com',
          description: 'Production server',
        },
        {
          url: 'https://staging.example.com',
          description: 'Staging server',
        },
      ];
      api.servers = servers;
      expect(api.servers).toHaveLength(2);
      expect(api.servers[0].url).toBe('https://api.example.com');
      expect(api.servers[1].description).toBe('Staging server');
    });

    test('should append server', () => {
      const server: ServerObject = {
        url: 'https://api.example.com',
        description: 'Production server',
      };
      api.appendServer(server);
      expect(api.servers).toHaveLength(1);
      expect(api.servers[0].url).toBe('https://api.example.com');
    });

    test('should filter out invalid properties when setting servers', () => {
      const servers = [
        {
          url: 'https://api.example.com',
          description: 'Production server',
          invalidProperty: 'should be filtered',
          'x-custom': 'should be kept',
        },
      ];
      api.servers = servers as ServerObject[];
      expect(api.servers[0].url).toBe('https://api.example.com');
      expect((api.servers[0] as any).invalidProperty).toBeUndefined();
      expect((api.servers[0] as any)['x-custom']).toBe('should be kept');
    });

    test('should return empty array for missing servers', () => {
      expect(api.servers).toEqual([]);
    });
  });

  describe('paths management', () => {
    test('should get path names', () => {
      const openapi = new Openapi(getSampleDoc());
      const pathNames = openapi.getPathNames();
      expect(pathNames).toContain('/users');
      expect(pathNames).toContain('/users/{id}');
      expect(pathNames).toHaveLength(2);
    });

    test('should get path names sorted', () => {
      const doc = {
        ...getSampleDoc(),
        paths: {
          '/zebra': {},
          '/alpha': {},
          '/beta': {},
        },
      };
      const openapi = new Openapi(doc);
      const pathNames = openapi.getPathNames();
      expect(pathNames).toEqual(['/alpha', '/beta', '/zebra']);
    });

    test('should exclude extension properties from path names', () => {
      const doc = {
        ...getSampleDoc(),
        paths: {
          '/users': {},
          'x-extension': 'value',
        },
      };
      const openapi = new Openapi(doc);
      const pathNames = openapi.getPathNames();
      expect(pathNames).toEqual(['/users']);
    });

    test('should get specific path', () => {
      const openapi = new Openapi(getSampleDoc());
      const path = openapi.getPath('/users');
      expect(path.get).toBeDefined();
      expect(path.post).toBeDefined();
    });

    test('should return empty object for non-existent path', () => {
      const openapi = new Openapi(getSampleDoc());
      const path = openapi.getPath('/nonexistent');
      expect(path).toEqual({});
    });

    test('should check if path exists', () => {
      const openapi = new Openapi(getSampleDoc());
      expect(openapi.pathExists('/users')).toBe(true);
      expect(openapi.pathExists('/nonexistent')).toBe(false);
    });

    test('should append path with leading slash', () => {
      api.appendPath('test', { get: { responses: { '200': { description: 'OK' } } } });
      expect(api.pathExists('/test')).toBe(true);
    });

    test('should append path without modifying existing leading slash', () => {
      api.appendPath('/test', { get: { responses: { '200': { description: 'OK' } } } });
      expect(api.pathExists('/test')).toBe(true);
    });
  });

  describe('operation management', () => {
    test('should check if operation exists', () => {
      const openapi = new Openapi(getSampleDoc());
      expect(openapi.operationExists('/users', 'get')).toBe(true);
      expect(openapi.operationExists('/users', 'put')).toBe(false);
      expect(openapi.operationExists('/nonexistent', 'get')).toBe(false);
    });

    test('should get all HTTP methods', () => {
      const openapi = new Openapi(getSampleDoc());
      const methods = openapi.getAllHttpMethods();
      expect(methods).toContain('get');
      expect(methods).toContain('post');
      expect(methods).toContain('delete');
      expect(methods).not.toContain('put');
    });

    test('should get operation ID', () => {
      const openapi = new Openapi(getSampleDoc());
      expect(openapi.getOperationId('/users', 'get')).toBe('getUsers');
      expect(openapi.getOperationId('/users/{id}', 'get')).toBe('getUserById');
    });

    test('should generate operation ID when not present', () => {
      api.appendPath('/test', {
        get: {
          responses: { '200': { description: 'OK' } },
        },
      });
      const operationId = api.getOperationId('/test', 'get');
      expect(operationId).toBe('getTest');
    });

    test('should set operation ID', () => {
      const docCopy = getSampleDoc();
      const openapi = new Openapi(docCopy);
      const result = openapi.setOperationId('/users', 'get', 'listAllUsers');
      expect(result).toBe('listAllUsers');
      expect(openapi.getOperationId('/users', 'get')).toBe('listAllUsers');
    });

    test('should return empty string when setting operation ID on non-existent operation', () => {
      const result = api.setOperationId('/nonexistent', 'get', 'test');
      expect(result).toBe('');
    });

    test('should get all operation IDs', () => {
      const openapi = new Openapi(getSampleDoc());
      const operationIds = openapi.getOperationIds();
      expect(operationIds).toHaveLength(4);
      expect(operationIds.some(op => op.id === 'getUsers')).toBe(true);
      expect(operationIds.some(op => op.id === 'createUser')).toBe(true);
    });

    test('should check if operation is deprecated', () => {
      const openapi = new Openapi(getSampleDoc());
      expect(openapi.isOperationDeprecated('/users', 'post')).toBe(true);
      expect(openapi.isOperationDeprecated('/users', 'get')).toBe(false);
    });

    test('should get operation description', () => {
      const openapi = new Openapi(getSampleDoc());
      expect(openapi.getOperationDescription('/users', 'get')).toBe('Get all users');
    });

    test('should get operation data', () => {
      const openapi = new Openapi(getSampleDoc());
      const operationData = openapi.getOperationData('/users', 'get');
      expect(operationData.operationId).toBe('getUsers');
      expect(operationData.summary).toBe('Get all users');
    });
  });

  describe('status codes management', () => {
    test('should get status codes for operation', () => {
      const openapi = new Openapi(getSampleDoc());
      const statusCodes = openapi.getStatusCodes('/users', 'get');
      expect(statusCodes).toHaveLength(2);
      expect(statusCodes.some(sc => sc.code === '200')).toBe(true);
      expect(statusCodes.some(sc => sc.code === '400')).toBe(true);
    });

    test('should get all status codes', () => {
      const openapi = new Openapi(getSampleDoc());
      const allStatusCodes = openapi.getAllStatusCodes();
      expect(allStatusCodes).toContain('200');
      expect(allStatusCodes).toContain('201');
      expect(allStatusCodes).toContain('204');
      expect(allStatusCodes).toContain('400');
      expect(allStatusCodes).toContain('404');
    });

    test('should get success code for operation', () => {
      const openapi = new Openapi(getSampleDoc());
      expect(openapi.getSuccessCode('/users', 'get')).toBe('200');
      expect(openapi.getSuccessCode('/users', 'post')).toBe('201');
      expect(openapi.getSuccessCode('/users/{id}', 'delete')).toBe('204');
    });

    test('should return empty string for operation without success code', () => {
      api.appendPath('/test', {
        get: {
          responses: {
            '400': { description: 'Bad Request' },
          },
        },
      });
      expect(api.getSuccessCode('/test', 'get')).toBe('');
    });
  });

  describe('media type management', () => {
    test('should get operation request media types', () => {
      const openapi = new Openapi(getSampleDoc());
      const requestMedia = openapi.getOperationRequestMedia('/users', 'post');
      expect(requestMedia).toContain('application/json');
    });

    test('should return empty array for operation without request body', () => {
      const openapi = new Openapi(getSampleDoc());
      const requestMedia = openapi.getOperationRequestMedia('/users', 'get');
      expect(requestMedia).toEqual([]);
    });

    test('should get operation response media types', () => {
      const openapi = new Openapi(getSampleDoc());
      const responseMedia = openapi.getOperationResponseMedia('/users', 'get');
      expect(responseMedia).toContain('application/json');
    });

    test('should return empty array for operation without response content', () => {
      const openapi = new Openapi(getSampleDoc());
      const responseMedia = openapi.getOperationResponseMedia('/users/{id}', 'delete');
      expect(responseMedia).toEqual([]);
    });
  });

  describe('extension management', () => {
    test('should get and set root extensions', () => {
      const extensions = { 'x-custom': 'value', 'x-another': 'test' };
      api.rootExtensions = extensions;
      expect(api.rootExtensions['x-custom']).toBe('value');
      expect(api.rootExtensions['x-another']).toBe('test');
    });

    test('should append root extension', () => {
      api.appendRootExtension('x-test', 'test-value');
      expect(api.rootExtensions['x-test']).toBe('test-value');
    });

    test('should not append non-extension properties to root', () => {
      api.appendRootExtension('invalid-key', 'value');
      expect((api.getDocument() as any)['invalid-key']).toBeUndefined();
    });

    test('should get and set info extensions', () => {
      api.title = 'Test'; // Ensure info object exists
      const extensions = { 'x-info-custom': 'info-value' };
      api.infoExtensions = extensions;
      expect(api.infoExtensions['x-info-custom']).toBe('info-value');
    });

    test('should append info extension', () => {
      api.title = 'Test'; // Ensure info object exists
      api.appendInfoExtension('x-info-test', 'info-test-value');
      expect(api.infoExtensions['x-info-test']).toBe('info-test-value');
    });

    test('should get and set paths extensions', () => {
      const extensions = { 'x-paths-custom': 'paths-value' };
      api.pathsExtensions = extensions;
      expect(api.pathsExtensions['x-paths-custom']).toBe('paths-value');
    });

    test('should append paths extension', () => {
      api.appendPathsExtension('x-paths-test', 'paths-test-value');
      expect(api.pathsExtensions['x-paths-test']).toBe('paths-test-value');
    });
  });

  describe('components management', () => {
    test('should get and set components', () => {
      const components = {
        schemas: {
          User: { type: 'object' as const },
        },
      };
      api.components = components;
      expect(api.components.schemas?.User).toBeDefined();
    });

    test('should get components schemas', () => {
      const openapi = new Openapi(getSampleDoc());
      const schemas = openapi.componentsSchemas;
      expect(schemas.User).toBeDefined();
    });

    test('should return empty object for missing components', () => {
      expect(api.components).toEqual({});
      expect(api.componentsSchemas).toEqual({});
    });
  });

  describe('security management', () => {
    test('should get and set security requirements', () => {
      const security = [{ ApiKeyAuth: [] }];
      api.security = security;
      expect(api.security).toHaveLength(1);
      expect(api.security[0].ApiKeyAuth).toEqual([]);
    });

    test('should return empty array for missing security', () => {
      expect(api.security).toEqual([]);
    });
  });

  describe('tags management', () => {
    test('should get and set tags', () => {
      const tag = { name: 'users', description: 'User operations' };
      api.tags = tag;
      expect(api.tags).toHaveLength(1);
      expect(api.tags[0].name).toBe('users');
    });

    test('should return empty array for missing tags', () => {
      expect(api.tags).toEqual([]);
    });
  });

  describe('external docs management', () => {
    test('should get and set external docs', () => {
      const externalDocs = { url: 'https://example.com/docs', description: 'API Documentation' };
      api.externalDocs = externalDocs;
      expect(api.externalDocs.url).toBe('https://example.com/docs');
      expect(api.externalDocs.description).toBe('API Documentation');
    });

    test('should ensure url property exists', () => {
      const externalDocs = { description: 'API Documentation' };
      api.externalDocs = externalDocs as any;
      expect(api.externalDocs.url).toBe('');
    });
  });

  describe('legacy compatibility', () => {
    test('should manage HTTP methods', () => {
      const methods = ['get', 'post'] as const;
      api.httpMethods = [...methods];
      expect(api.httpMethods).toEqual(['get', 'post']);
    });

    test('should manage document version', () => {
      api.docVersion = '3.1.0';
      expect(api.docVersion).toBe('3.1.0');
    });

    test('should manage base URI', () => {
      api.baseUri = 'https://api.example.com';
      expect(api.baseUri).toBe('https://api.example.com');
    });

    test('should manage protocols', () => {
      api.protocols = ['https', 'http'];
      expect(api.protocols).toEqual(['https', 'http']);
    });

    test('should append protocol', () => {
      api.protocols = ['https'];
      api.appendProtocol('http');
      expect(api.protocols).toEqual(['https', 'http']);
    });

    test('should get display name (alias for operation ID)', () => {
      const openapi = new Openapi(getSampleDoc());
      expect(openapi.getDisplayName('/users', 'get')).toBe('getUsers');
    });

    test('should set display name (alias for operation ID)', () => {
      const docCopy = getSampleDoc();
      const openapi = new Openapi(docCopy);
      const result = openapi.setDisplayName('/users', 'get', 'listUsers');
      expect(result).toBe('listUsers');
      expect(openapi.getDisplayName('/users', 'get')).toBe('listUsers');
    });
  });

  describe('error handling', () => {
    test('should handle invalid extension keys in setExtensions', () => {
      expect(() => {
        api.rootExtensions = { 'invalid-key': 'value' } as any;
      }).toThrow(ValidationError);
    });

    test('should handle invalid level path in setExtensions', () => {
      expect(() => {
        (api as any).setExtensions({ 'x-test': 'value' }, 'nonexistent.path');
      }).toThrow(ValidationError);
    });

    test('should return empty objects for missing data gracefully', () => {
      expect(api.getPath('/nonexistent')).toEqual({});
      expect(api.getOperationData('/nonexistent', 'get')).toEqual({});
      expect(api.getOperationRequest('/nonexistent', 'get')).toEqual({});
      expect(api.getOperationResponse('/nonexistent', 'get', '200')).toEqual({});
    });
  });

  describe('type safety', () => {
    test('should maintain type safety for OpenAPI document', () => {
      const doc: OpenAPIDocument = api.getDefinition() as OpenAPIDocument;
      expect(typeof doc.openapi).toBe('string');
      expect(typeof doc.info).toBe('object');
      expect(typeof doc.paths).toBe('object');
    });

    test('should maintain type safety for info object', () => {
      api.title = 'Test API';
      api.version = '1.0.0';
      const info: InfoObject = api.info;
      expect(typeof info.title).toBe('string');
      expect(typeof info.version).toBe('string');
    });

    test('should handle undefined values gracefully', () => {
      expect(api.description).toBeNull();
      expect(api.termsOfService).toBeNull();
      expect(api.contact).toEqual({});
    });
  });
});
