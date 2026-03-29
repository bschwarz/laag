/**
 * Unit tests for OpenAPI TypeScript type definitions
 */

import { describe, expect, test } from 'bun:test';
import type {
  ComponentsObject,
  ContactObject,
  HttpMethod,
  HttpStatusCode,
  InfoObject,
  LicenseObject,
  MediaType,
  OpenAPIDocument,
  OperationObject,
  ParameterObject,
  PathsObject,
  RequestBodyObject,
  ResponseObject,
  SchemaObject,
  ServerObject,
} from '../src/types.js';

describe('OpenAPI Type Definitions', () => {
  describe('OpenAPIDocument', () => {
    test('should accept valid OpenAPI document structure', () => {
      const doc: OpenAPIDocument = {
        openapi: '3.0.2',
        info: {
          title: 'Test API',
          version: '1.0.0',
        },
        paths: {},
        'x-custom-extension': 'test-value',
      };

      expect(doc.openapi).toBe('3.0.2');
      expect(doc.info.title).toBe('Test API');
      expect(doc.paths).toEqual({});
      expect(doc['x-custom-extension']).toBe('test-value');
    });

    test('should accept complete OpenAPI document with all optional fields', () => {
      const doc: OpenAPIDocument = {
        openapi: '3.0.2',
        info: {
          title: 'Complete API',
          version: '1.0.0',
          description: 'A complete API example',
          termsOfService: 'https://example.com/terms',
          contact: {
            name: 'API Support',
            email: 'support@example.com',
          },
          license: {
            name: 'MIT',
          },
        },
        paths: {
          '/users': {
            get: {
              responses: {
                '200': {
                  description: 'Success',
                },
              },
            },
          },
        },
        servers: [
          {
            url: 'https://api.example.com',
          },
        ],
        components: {
          schemas: {
            User: {
              type: 'object',
            },
          },
        },
        security: [
          {
            ApiKeyAuth: [],
          },
        ],
        tags: [
          {
            name: 'users',
          },
        ],
        externalDocs: {
          url: 'https://example.com/docs',
        },
      };

      expect(doc.info.description).toBe('A complete API example');
      expect(doc.servers?.[0].url).toBe('https://api.example.com');
      expect(doc.components?.schemas?.User).toBeDefined();
    });
  });

  describe('InfoObject', () => {
    test('should require title and version', () => {
      const info: InfoObject = {
        title: 'Test API',
        version: '1.0.0',
      };

      expect(info.title).toBe('Test API');
      expect(info.version).toBe('1.0.0');
    });

    test('should accept all optional properties', () => {
      const info: InfoObject = {
        title: 'Test API',
        version: '1.0.0',
        description: 'A test API',
        termsOfService: 'https://example.com/terms',
        contact: {
          name: 'Support Team',
        },
        license: {
          name: 'MIT',
        },
        'x-custom': 'extension',
      };

      expect(info.description).toBe('A test API');
      expect(info.contact?.name).toBe('Support Team');
      expect(info['x-custom']).toBe('extension');
    });
  });

  describe('ContactObject', () => {
    test('should accept all optional contact properties', () => {
      const contact: ContactObject = {
        name: 'John Doe',
        url: 'https://johndoe.com',
        email: 'john@example.com',
        'x-social': 'twitter',
      };

      expect(contact.name).toBe('John Doe');
      expect(contact.url).toBe('https://johndoe.com');
      expect(contact.email).toBe('john@example.com');
      expect(contact['x-social']).toBe('twitter');
    });

    test('should accept empty contact object', () => {
      const contact: ContactObject = {};
      expect(Object.keys(contact)).toHaveLength(0);
    });
  });

  describe('LicenseObject', () => {
    test('should require name property', () => {
      const license: LicenseObject = {
        name: 'MIT',
      };

      expect(license.name).toBe('MIT');
    });

    test('should accept optional url and extensions', () => {
      const license: LicenseObject = {
        name: 'Apache 2.0',
        url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
        'x-spdx-id': 'Apache-2.0',
      };

      expect(license.url).toBe('https://www.apache.org/licenses/LICENSE-2.0.html');
      expect(license['x-spdx-id']).toBe('Apache-2.0');
    });
  });

  describe('ServerObject', () => {
    test('should require url property', () => {
      const server: ServerObject = {
        url: 'https://api.example.com',
      };

      expect(server.url).toBe('https://api.example.com');
    });

    test('should accept description and variables', () => {
      const server: ServerObject = {
        url: 'https://{environment}.example.com/{basePath}',
        description: 'The production API server',
        variables: {
          environment: {
            default: 'api',
            enum: ['api', 'api.dev', 'api.staging'],
          },
          basePath: {
            default: 'v2',
          },
        },
      };

      expect(server.description).toBe('The production API server');
      expect(server.variables?.environment.default).toBe('api');
      expect(server.variables?.basePath.default).toBe('v2');
    });
  });

  describe('PathsObject', () => {
    test('should accept path items and extensions', () => {
      const paths: PathsObject = {
        '/users': {
          get: {
            responses: {
              '200': {
                description: 'Success',
              },
            },
          },
        },
        '/posts/{id}': {
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string' },
            },
          ],
        },
        'x-path-extension': 'custom-value',
      };

      expect(paths['/users']?.get).toBeDefined();
      expect(paths['/posts/{id}']?.parameters).toHaveLength(1);
      expect(paths['x-path-extension']).toBe('custom-value');
    });
  });

  describe('OperationObject', () => {
    test('should require responses property', () => {
      const operation: OperationObject = {
        responses: {
          '200': {
            description: 'Success',
          },
        },
      };

      expect(operation.responses['200']).toBeDefined();
    });

    test('should accept all optional properties', () => {
      const operation: OperationObject = {
        tags: ['users'],
        summary: 'Get user by ID',
        description: 'Retrieve a single user by their unique identifier',
        operationId: 'getUserById',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        ],
        responses: {
          '200': {
            description: 'User found',
          },
          '404': {
            description: 'User not found',
          },
        },
        deprecated: false,
        security: [
          {
            ApiKeyAuth: [],
          },
        ],
      };

      expect(operation.tags).toContain('users');
      expect(operation.operationId).toBe('getUserById');
      expect(operation.deprecated).toBe(false);
    });
  });

  describe('ParameterObject', () => {
    test('should require name and in properties', () => {
      const parameter: ParameterObject = {
        name: 'userId',
        in: 'path',
      };

      expect(parameter.name).toBe('userId');
      expect(parameter.in).toBe('path');
    });

    test('should accept all parameter locations', () => {
      const queryParam: ParameterObject = { name: 'limit', in: 'query' };
      const headerParam: ParameterObject = { name: 'X-API-Key', in: 'header' };
      const pathParam: ParameterObject = { name: 'id', in: 'path' };
      const cookieParam: ParameterObject = { name: 'session', in: 'cookie' };

      expect(queryParam.in).toBe('query');
      expect(headerParam.in).toBe('header');
      expect(pathParam.in).toBe('path');
      expect(cookieParam.in).toBe('cookie');
    });

    test('should accept schema and examples', () => {
      const parameter: ParameterObject = {
        name: 'limit',
        in: 'query',
        description: 'Number of items to return',
        required: false,
        schema: {
          type: 'integer',
          minimum: 1,
          maximum: 100,
          default: 20,
        },
        example: 10,
      };

      expect(parameter.schema?.type).toBe('integer');
      expect(parameter.example).toBe(10);
    });
  });

  describe('RequestBodyObject', () => {
    test('should require content property', () => {
      const requestBody: RequestBodyObject = {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
      };

      expect(requestBody.content['application/json']).toBeDefined();
    });

    test('should accept description and required flag', () => {
      const requestBody: RequestBodyObject = {
        description: 'User data to create',
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                email: { type: 'string' },
              },
            },
          },
          'application/xml': {
            schema: {
              type: 'object',
            },
          },
        },
      };

      expect(requestBody.description).toBe('User data to create');
      expect(requestBody.required).toBe(true);
      expect(Object.keys(requestBody.content)).toHaveLength(2);
    });
  });

  describe('ResponseObject', () => {
    test('should require description property', () => {
      const response: ResponseObject = {
        description: 'Successful response',
      };

      expect(response.description).toBe('Successful response');
    });

    test('should accept headers, content, and links', () => {
      const response: ResponseObject = {
        description: 'User created successfully',
        headers: {
          'X-Rate-Limit': {
            description: 'Calls per hour allowed by the user',
            schema: {
              type: 'integer',
            },
          },
        },
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                name: { type: 'string' },
              },
            },
          },
        },
      };

      expect(response.headers?.['X-Rate-Limit']).toBeDefined();
      expect(response.content?.['application/json']).toBeDefined();
    });
  });

  describe('SchemaObject', () => {
    test('should accept primitive types', () => {
      const stringSchema: SchemaObject = {
        type: 'string',
        minLength: 1,
        maxLength: 100,
        pattern: '^[a-zA-Z]+$',
      };

      const numberSchema: SchemaObject = {
        type: 'number',
        minimum: 0,
        maximum: 100,
        multipleOf: 0.01,
      };

      const booleanSchema: SchemaObject = {
        type: 'boolean',
      };

      expect(stringSchema.type).toBe('string');
      expect(numberSchema.type).toBe('number');
      expect(booleanSchema.type).toBe('boolean');
    });

    test('should accept object schemas', () => {
      const objectSchema: SchemaObject = {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
          },
          name: {
            type: 'string',
            minLength: 1,
          },
          age: {
            type: 'integer',
            minimum: 0,
          },
        },
        required: ['id', 'name'],
        additionalProperties: false,
      };

      expect(objectSchema.type).toBe('object');
      expect(objectSchema.properties?.id.type).toBe('string');
      expect(objectSchema.required).toContain('id');
      expect(objectSchema.additionalProperties).toBe(false);
    });

    test('should accept array schemas', () => {
      const arraySchema: SchemaObject = {
        type: 'array',
        items: {
          type: 'string',
        },
        minItems: 1,
        maxItems: 10,
        uniqueItems: true,
      };

      expect(arraySchema.type).toBe('array');
      expect((arraySchema.items as SchemaObject)?.type).toBe('string');
      expect(arraySchema.uniqueItems).toBe(true);
    });

    test('should accept composition schemas', () => {
      const allOfSchema: SchemaObject = {
        allOf: [
          { type: 'object', properties: { name: { type: 'string' } } },
          { type: 'object', properties: { age: { type: 'integer' } } },
        ],
      };

      const oneOfSchema: SchemaObject = {
        oneOf: [{ type: 'string' }, { type: 'number' }],
      };

      expect(allOfSchema.allOf).toHaveLength(2);
      expect(oneOfSchema.oneOf).toHaveLength(2);
    });
  });

  describe('ComponentsObject', () => {
    test('should accept all component types', () => {
      const components: ComponentsObject = {
        schemas: {
          User: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
            },
          },
        },
        responses: {
          NotFound: {
            description: 'Resource not found',
          },
        },
        parameters: {
          PageLimit: {
            name: 'limit',
            in: 'query',
            schema: { type: 'integer' },
          },
        },
        securitySchemes: {
          ApiKeyAuth: {
            type: 'apiKey',
            in: 'header',
            name: 'X-API-Key',
          },
        },
      };

      expect(components.schemas?.User).toBeDefined();
      expect(components.responses?.NotFound).toBeDefined();
      expect(components.parameters?.PageLimit).toBeDefined();
      expect(components.securitySchemes?.ApiKeyAuth).toBeDefined();
    });
  });

  describe('Type Unions', () => {
    test('should accept valid HTTP methods', () => {
      const methods: HttpMethod[] = [
        'get',
        'post',
        'put',
        'delete',
        'patch',
        'head',
        'options',
        'trace',
      ];

      methods.forEach(method => {
        expect(['get', 'post', 'put', 'delete', 'patch', 'head', 'options', 'trace']).toContain(
          method
        );
      });
    });

    test('should accept valid HTTP status codes', () => {
      const statusCodes: HttpStatusCode[] = ['200', '201', '400', '404', '500', 'default'];

      statusCodes.forEach(code => {
        expect(typeof code).toBe('string');
      });
    });

    test('should accept valid media types', () => {
      const mediaTypes: MediaType[] = [
        'application/json',
        'application/xml',
        'text/plain',
        'multipart/form-data',
        'custom/media-type',
      ];

      mediaTypes.forEach(mediaType => {
        expect(typeof mediaType).toBe('string');
      });
    });
  });

  describe('Extension Support', () => {
    test('should support extensions in all extensible objects', () => {
      const docWithExtensions: OpenAPIDocument = {
        openapi: '3.0.2',
        info: {
          title: 'API',
          version: '1.0.0',
          'x-info-extension': 'info-value',
        },
        paths: {
          '/test': {
            get: {
              responses: {
                '200': {
                  description: 'OK',
                  'x-response-extension': 'response-value',
                },
              },
              'x-operation-extension': 'operation-value',
            },
            'x-path-extension': 'path-value',
          },
          'x-paths-extension': 'paths-value',
        },
        'x-root-extension': 'root-value',
      };

      expect(docWithExtensions['x-root-extension']).toBe('root-value');
      expect(docWithExtensions.info['x-info-extension']).toBe('info-value');
      expect(docWithExtensions.paths['x-paths-extension']).toBe('paths-value');
    });
  });

  describe('Reference Objects', () => {
    test('should support $ref in various contexts', () => {
      const docWithRefs: OpenAPIDocument = {
        openapi: '3.0.2',
        info: { title: 'API', version: '1.0.0' },
        paths: {
          '/users': {
            get: {
              parameters: [{ $ref: '#/components/parameters/PageLimit' }],
              responses: {
                '200': { $ref: '#/components/responses/UserList' },
                '404': { $ref: '#/components/responses/NotFound' },
              },
            },
          },
        },
        components: {
          parameters: {
            PageLimit: {
              name: 'limit',
              in: 'query',
              schema: { type: 'integer' },
            },
          },
          responses: {
            UserList: {
              description: 'List of users',
            },
            NotFound: {
              description: 'Resource not found',
            },
          },
        },
      };

      const getOperation = docWithRefs.paths['/users']?.get;
      expect(getOperation?.parameters?.[0]).toHaveProperty('$ref');
      expect(getOperation?.responses['200']).toHaveProperty('$ref');
    });
  });

  describe('Real-world Usage Patterns', () => {
    test('should support complete API specification', () => {
      const petStoreAPI: OpenAPIDocument = {
        openapi: '3.0.2',
        info: {
          title: 'Swagger Petstore',
          description: 'This is a sample server Petstore server.',
          version: '1.0.0',
          license: {
            name: 'MIT',
          },
        },
        servers: [
          {
            url: 'https://petstore.swagger.io/v2',
          },
        ],
        paths: {
          '/pet': {
            post: {
              tags: ['pet'],
              summary: 'Add a new pet to the store',
              operationId: 'addPet',
              requestBody: {
                description: 'Pet object that needs to be added to the store',
                required: true,
                content: {
                  'application/json': {
                    schema: { $ref: '#/components/schemas/Pet' },
                  },
                },
              },
              responses: {
                '405': {
                  description: 'Invalid input',
                },
              },
              security: [
                {
                  petstore_auth: ['write:pets', 'read:pets'],
                },
              ],
            },
          },
        },
        components: {
          schemas: {
            Pet: {
              type: 'object',
              required: ['name', 'photoUrls'],
              properties: {
                id: {
                  type: 'integer',
                  format: 'int64',
                },
                name: {
                  type: 'string',
                  example: 'doggie',
                },
                photoUrls: {
                  type: 'array',
                  items: {
                    type: 'string',
                  },
                },
                status: {
                  type: 'string',
                  enum: ['available', 'pending', 'sold'],
                },
              },
            },
          },
          securitySchemes: {
            petstore_auth: {
              type: 'oauth2',
              flows: {
                implicit: {
                  authorizationUrl: 'https://petstore.swagger.io/oauth/authorize',
                  scopes: {
                    'write:pets': 'modify pets in your account',
                    'read:pets': 'read your pets',
                  },
                },
              },
            },
          },
        },
      };

      expect(petStoreAPI.info.title).toBe('Swagger Petstore');
      expect(petStoreAPI.paths['/pet']?.post?.operationId).toBe('addPet');
      expect(petStoreAPI.components?.schemas?.Pet.type).toBe('object');
      expect(petStoreAPI.components?.securitySchemes?.petstore_auth.type).toBe('oauth2');
    });
  });
});
