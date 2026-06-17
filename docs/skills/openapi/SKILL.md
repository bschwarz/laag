---
name: openapi
description: Working with OpenAPI/Swagger documents using @laag/openapi. Use when parsing, reading, creating, or modifying OpenAPI specs.
---

# @laag/openapi — Working with OpenAPI Documents

## Installation & Import

```typescript
import { Openapi } from '@laag/openapi';
```

## Creating an Instance

```typescript
// From an object
const api = new Openapi({
  openapi: '3.0.2',
  info: { title: 'My API', version: '1.0.0' },
  paths: {}
});

// From a JSON string
const api = new Openapi(jsonString);

// Empty document (defaults created automatically)
const api = new Openapi();
```

## Reading Document Info

```typescript
api.info          // Full InfoObject
api.title         // string | null
api.description   // string | null
api.version       // string | null
api.servers       // ServerObject[]
api.tags          // TagObject[]
api.components    // ComponentsObject
api.componentsSchemas  // Record<string, SchemaObject | ReferenceObject>
```

## Working with Paths

```typescript
// Get all path names (sorted, excludes x-* keys)
const paths = api.getPathNames(); // ['/users', '/users/{id}']

// Get a specific path item
const pathItem = api.getPath('/users');

// Add or replace a path
api.appendPath('/users', {
  get: {
    summary: 'List users',
    responses: { '200': { description: 'Success' } }
  }
});

// Check existence
api.pathExists('/users');           // boolean
api.operationExists('/users', 'get'); // boolean
```

## Reading Operations

```typescript
// Get operation data
const op = api.getOperationData('/users', 'get'); // OperationObject

// Get operation ID (auto-generated if missing)
api.getOperationId('/users', 'post'); // e.g. "postUsers"

// Set operation ID
api.setOperationId('/users', 'post', 'createUser');

// Get all operation IDs
api.getOperationIds(); // [{ id, path, method }]

// Get description
api.getOperationDescription('/users/{id}', 'get');

// Check if deprecated
api.isOperationDeprecated('/users/{id}', 'delete'); // boolean
```

## Status Codes

```typescript
// Get status codes for an operation
api.getStatusCodes('/users', 'post');
// [{ code: '200', description: 'OK', media: ['application/json'] }]

// Get all status codes across all operations
api.getAllStatusCodes(); // ['200', '201', '404']

// Get the success status code for an operation
api.getSuccessCode('/users', 'post'); // '201'
```

## Media Types & Request/Response

```typescript
// Request media types
api.getOperationRequestMedia('/users', 'post'); // ['application/json']

// Response media types (uses success code by default)
api.getOperationResponseMedia('/users', 'post');
api.getOperationResponseMedia('/users', 'post', '201');

// Get full request/response objects
api.getOperationRequest('/users', 'post');   // RequestBodyObject
api.getOperationResponse('/users', 'post', '200'); // ResponseObject
```

## Serialization

```typescript
api.getDefinition('js');         // OpenAPIDocument object
api.getDefinition('json');       // compact JSON string
api.getDefinition('prettyjson'); // formatted JSON string
api.getDocument();               // shallow copy of internal doc
api.getDocumentAsJson(true);     // pretty JSON string
```

## Validation

```typescript
const result = api.validate();
// { valid: boolean, errors: [{ path, message, code }] }

if (!result.valid) {
  result.errors.forEach(e => console.error(e.message));
}
```

## Extensions (x-* properties)

```typescript
api.rootExtensions  // get x-* at root
api.infoExtensions  // get x-* at info level
api.pathsExtensions // get x-* at paths level

api.appendRootExtension('x-custom', 'value');
api.appendInfoExtension('x-logo', 'https://example.com/logo.png');
```

## Component Reference Resolution

```typescript
// Resolve a $ref to its actual component
const schema = api.getComponentFromPath('#/components/schemas/User');
```

## Common Patterns

### Load and inspect an existing API
```typescript
import { readFileSync } from 'fs';
import { Openapi } from '@laag/openapi';

const doc = JSON.parse(readFileSync('api.json', 'utf8'));
const api = new Openapi(doc);

console.log(api.title);
api.getPathNames().forEach(path => {
  const methods = ['get','post','put','delete','patch'];
  methods.forEach(method => {
    if (api.operationExists(path, method)) {
      console.log(`${method.toUpperCase()} ${path}`);
    }
  });
});
```

### Build an API programmatically
```typescript
const api = new Openapi();
api.title = 'Users API';
api.version = '1.0.0';
api.servers = [{ url: 'https://api.example.com' }];

api.appendPath('/users', {
  get: {
    operationId: 'listUsers',
    summary: 'List all users',
    responses: {
      '200': {
        description: 'List of users',
        content: {
          'application/json': {
            schema: { type: 'array', items: { $ref: '#/components/schemas/User' } }
          }
        }
      }
    }
  }
});
```
