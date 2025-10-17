# @laag/openapi

A modern TypeScript library for working with [OpenAPI/Swagger](https://www.openapis.org/) specification documents. Provides comprehensive support for reading, writing, and manipulating OpenAPI 3.0+ documents with full type safety.

## Features

- 🔧 **Full TypeScript Support** - Complete type definitions for OpenAPI 3.0+ specification
- 📦 **Multiple Module Formats** - ESM, CommonJS, and browser bundles
- ✅ **Document Validation** - Built-in validation according to OpenAPI specification
- 🚀 **High Performance** - Optimized for speed and memory efficiency
- 🔌 **Extension Support** - Full support for OpenAPI extensions (x-\* properties)
- 🛠️ **Developer Friendly** - Comprehensive API with utility methods
- 🌐 **Cross-Platform** - Works in Node.js, browsers, and edge environments

## Installation

```bash
# Install with npm
npm install @laag/openapi @laag/core

# Install with yarn
yarn add @laag/openapi @laag/core

# Install with bun
bun add @laag/openapi @laag/core
```

## Quick Start

### ESM (Recommended)

```typescript
import { Openapi } from '@laag/openapi';

// Create from object
const api = new Openapi({
  openapi: '3.0.2',
  info: { title: 'My API', version: '1.0.0' },
  paths: {},
});

console.log(api.info.title); // "My API"
```

### CommonJS

```javascript
const { Openapi } = require('@laag/openapi');

const api = new Openapi({
  openapi: '3.0.2',
  info: { title: 'My API', version: '1.0.0' },
  paths: {},
});
```

## Usage Examples

### Reading an Existing Document

```typescript
import { readFileSync } from 'fs';
import { Openapi } from '@laag/openapi';

// Load from JSON file
const jsonData = readFileSync('petstore.json', 'utf8');
const api = new Openapi(jsonData);

console.log(`API: ${api.info.title} v${api.info.version}`);
console.log('Available paths:');
for (const path of api.getPathNames()) {
  console.log(`  ${path}`);
}

// Get operation details
const operations = api.getOperationIds();
for (const op of operations) {
  console.log(`${op.method.toUpperCase()} ${op.path} → ${op.id}`);
}
```

**Output:**

```
API: Swagger Petstore v1.0.0
Available paths:
  /pets
  /pets/{petId}
GET /pets → listPets
POST /pets → createPets
GET /pets/{petId} → showPetById
```

### Creating a New Document

```typescript
import { Openapi } from '@laag/openapi';
import type { InfoObject, PathItemObject } from '@laag/openapi';

// Create empty document
const api = new Openapi();

// Set API information with type safety
api.info = {
  title: 'User Management API',
  version: '2.0.0',
  description: 'A comprehensive user management system',
  contact: {
    name: 'API Team',
    email: 'api@company.com',
  },
  license: {
    name: 'MIT',
    url: 'https://opensource.org/licenses/MIT',
  },
};

// Add servers
api.servers = [
  {
    url: 'https://api.company.com/v2',
    description: 'Production server',
  },
];

// Add a path with full type safety
const userPath: PathItemObject = {
  get: {
    summary: 'Get user by ID',
    operationId: 'getUserById',
    parameters: [
      {
        name: 'userId',
        in: 'path',
        required: true,
        schema: { type: 'string' },
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
      '404': {
        description: 'User not found',
      },
    },
  },
};

api.appendPath('/users/{userId}', userPath);

// Add components
api.components = {
  schemas: {
    User: {
      type: 'object',
      required: ['id', 'name', 'email'],
      properties: {
        id: { type: 'string', format: 'uuid' },
        name: { type: 'string' },
        email: { type: 'string', format: 'email' },
      },
    },
  },
};

// Output as pretty JSON
console.log(api.getDefinition('prettyjson'));
```

### Working with Extensions

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();

// Add root-level extensions
api.rootExtensions = {
  'x-api-id': 'user-api',
  'x-rate-limit': 1000,
};

// Add info-level extensions
api.infoExtensions = {
  'x-logo': {
    url: 'https://company.com/logo.png',
  },
};

// Add path-level extensions
api.pathsExtensions = {
  'x-cache-ttl': 300,
};
```

### Document Validation

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi({
  openapi: '3.0.2',
  info: { title: 'Test API', version: '1.0.0' },
  paths: {},
});

const validation = api.validate();
if (validation.valid) {
  console.log('✅ Document is valid');
} else {
  console.log('❌ Document has errors:');
  for (const error of validation.errors) {
    console.log(`  ${error.path}: ${error.message}`);
  }
}
```

### Advanced Operations

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi(/* your document */);

// Check if operation exists
if (api.operationExists('/users', 'get')) {
  console.log('GET /users operation exists');
}

// Get operation details
const operationId = api.getOperationId('/users', 'get');
const description = api.getOperationDescription('/users', 'get');

// Get media types
const requestMedia = api.getOperationRequestMedia('/users', 'post');
const responseMedia = api.getOperationResponseMedia('/users', 'get');

// Get all HTTP methods used
const methods = api.getAllHttpMethods();

// Get all status codes used
const statusCodes = api.getAllStatusCodes();
```

## API Reference

### Constructor

```typescript
new Openapi(doc?: string | OpenAPIDocument)
```

Creates a new OpenAPI document instance. If no document is provided, creates a minimal valid structure.

### Properties

- `info: InfoObject` - API information
- `servers: ServerObject[]` - Server configurations
- `paths: PathsObject` - API paths and operations
- `components: ComponentsObject` - Reusable components
- `tags: TagObject[]` - API tags
- `rootExtensions: Record<string, any>` - Root-level extensions
- `infoExtensions: Record<string, any>` - Info-level extensions
- `pathsExtensions: Record<string, any>` - Paths-level extensions

### Methods

#### Document Operations

- `getDefinition(format: 'js' | 'json' | 'prettyjson'): any` - Get document in specified format
- `validate(): ValidationResult` - Validate document structure
- `getDocument(): OpenAPIDocument` - Get raw document object

#### Path Operations

- `getPathNames(): string[]` - Get all path names
- `getPath(path: string): PathItemObject` - Get path item
- `appendPath(path: string, pathItem: PathItemObject): void` - Add new path

#### Operation Operations

- `operationExists(path: string, method: string): boolean` - Check if operation exists
- `getOperationId(path: string, method: string): string` - Get operation ID
- `getOperationIds(): Array<{id: string, path: string, method: string}>` - Get all operation IDs
- `getOperationDescription(path: string, method: string): string` - Get operation description
- `getOperationRequestMedia(path: string, method: string): string[]` - Get request media types
- `getOperationResponseMedia(path: string, method: string): string[]` - Get response media types

#### Utility Methods

- `getAllHttpMethods(): string[]` - Get all HTTP methods used
- `getAllStatusCodes(): string[]` - Get all status codes used
- `getStatusCodes(path: string, method: string): Array<{code: string, reason: string}>` - Get status codes for operation

## TypeScript Support

This library is written in TypeScript and provides comprehensive type definitions:

```typescript
import type {
  OpenAPIDocument,
  InfoObject,
  PathItemObject,
  OperationObject,
  SchemaObject,
  ComponentsObject,
} from '@laag/openapi';
```

## Browser Support

The library works in modern browsers with ES2020 support:

```html
<script type="module">
  import { Openapi } from 'https://unpkg.com/@laag/openapi/dist/browser/index.js';

  const api = new Openapi({
    openapi: '3.0.2',
    info: { title: 'Browser API', version: '1.0.0' },
    paths: {},
  });
</script>
```

## Examples

Check out the [examples directory](../../examples/) for more comprehensive examples:

- [Basic Usage](../../examples/typescript/basic-usage.ts) - Fundamental operations
- [Advanced Operations](../../examples/typescript/advanced-operations.ts) - Complex document manipulation
- [Browser Usage](../../examples/browser/) - Browser integration examples
- [CommonJS Usage](../../examples/javascript/cjs/) - CommonJS examples

## Related Packages

- [@laag/core](../core/) - Core utilities and base classes
- [@laag/cli](../cli/) - Command-line interface
- [@laag/raml](../raml/) - RAML document support (coming soon)

## License

MIT - see [LICENSE](../../LICENSE) for details.
