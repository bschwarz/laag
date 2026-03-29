# TypeScript Features in Laag v2

This document highlights the TypeScript-specific features and benefits available in laag v2.

## Overview

Laag v2 is built from the ground up with TypeScript, providing:

- **Complete type safety** for all API operations
- **IntelliSense support** in modern IDEs
- **Compile-time error detection** for better development experience
- **Self-documenting code** through comprehensive type definitions
- **Better refactoring support** with IDE assistance

## Core Type Safety Features

### 1. Strongly Typed Document Structure

```typescript
import { Openapi, OpenAPIDocument, InfoObject } from '@laag/openapi';

// Fully typed document creation
const document: OpenAPIDocument = {
  openapi: '3.0.2',
  info: {
    title: 'My API', // Required: string
    version: '1.0.0', // Required: string
    description: 'Optional description',
    contact: {
      name: 'API Team',
      email: 'team@company.com',
      url: 'https://company.com',
    },
  },
  paths: {},
  servers: [
    {
      url: 'https://api.company.com', // Required: string
      description: 'Production server', // Optional: string
    },
  ],
};

const api = new Openapi(document);
```

### 2. Type-Safe Property Access

```typescript
// All properties are strongly typed
const api = new Openapi();

api.title = 'My API'; // ✅ string
api.title = 123; // ❌ TypeScript error

api.version = '1.0.0'; // ✅ string
api.version = { major: 1 }; // ❌ TypeScript error

// Complex objects are also typed
api.contact = {
  name: 'Support Team', // ✅ string
  email: 'support@company.com', // ✅ string (with format validation)
  phone: 123456789, // ❌ TypeScript error (should be string)
};
```

### 3. Method Parameter and Return Type Safety

```typescript
// Method parameters are typed
api.appendPath('/users', {
  // PathItemObject type
  get: {
    // OperationObject type
    summary: 'Get users', // string
    operationId: 'getUsers', // string
    responses: {
      // ResponsesObject type
      '200': {
        // ResponseObject type
        description: 'Success', // Required: string
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
});

// Return types are also typed
const paths: string[] = api.getPathNames(); // string[]
const operations = api.getOperationIds(); // Array<{id: string, path: string, method: string}>
const validation: ValidationResult = api.validate(); // ValidationResult type
```

## Advanced Type Features

### 1. Generic Type Support

```typescript
import type { SchemaObject, ReferenceObject } from '@laag/openapi';

// Union types for flexible schemas
type SchemaOrReference = SchemaObject | ReferenceObject;

const userSchema: SchemaOrReference = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    email: { type: 'string', format: 'email' },
  },
  required: ['id', 'name', 'email'],
};

// Or reference to existing schema
const userReference: SchemaOrReference = {
  $ref: '#/components/schemas/User',
};
```

### 2. Template Literal Types for Extensions

```typescript
import type { ExtensionObject } from '@laag/core';

// Extension properties are typed with template literals
const extensions: ExtensionObject = {
  'x-custom-property': 'value', // ✅ Valid extension
  'x-rate-limit': 1000, // ✅ Valid extension
  'x-complex': { nested: 'data' }, // ✅ Valid extension
  'invalid-extension': 'value', // ❌ TypeScript error: must start with 'x-'
};

api.rootExtensions = extensions;
```

### 3. Discriminated Unions for HTTP Methods

```typescript
import type { HttpMethod } from '@laag/openapi';

// HTTP methods are strictly typed
const method: HttpMethod = 'get'; // ✅ Valid
const invalid: HttpMethod = 'PATCH'; // ❌ TypeScript error: must be lowercase

// Type-safe method checking
function processOperation(path: string, method: HttpMethod) {
  if (api.operationExists(path, method)) {
    const operationId = api.getOperationId(path, method);
    // operationId is guaranteed to be string
  }
}
```

### 4. Conditional Types for Responses

```typescript
import type { ResponseObject, MediaTypeObject } from '@laag/openapi';

// Response objects with conditional content types
const jsonResponse: ResponseObject = {
  description: 'JSON response',
  content: {
    'application/json': {
      schema: { type: 'object' },
    },
  },
};

const xmlResponse: ResponseObject = {
  description: 'XML response',
  content: {
    'application/xml': {
      schema: { type: 'string' },
    },
  },
};
```

## IDE Integration Benefits

### 1. IntelliSense and Autocomplete

```typescript
const api = new Openapi();

// IDE provides autocomplete for all properties
api.info.api // Method suggestions with parameter hints // Shows: title, version, description, contact, license, etc.
  .appendPath(
    // Shows parameter types and descriptions
    '/users', // path: string
    {
      // pathItem: PathItemObject
      get: {
        // Shows all HTTP methods
        // IDE shows all OperationObject properties
      },
    }
  );
```

### 2. Real-time Error Detection

```typescript
const api = new Openapi();

// IDE immediately highlights errors
api.info = {
  title: 'My API',
  version: 1.0, // ❌ Error: Type 'number' is not assignable to type 'string'
  description: true, // ❌ Error: Type 'boolean' is not assignable to type 'string'
};

// Suggests corrections
api.info = {
  title: 'My API',
  version: '1.0.0', // ✅ Fixed
  description: 'API', // ✅ Fixed
};
```

### 3. Refactoring Support

```typescript
// Rename operations safely across your codebase
const operationId = api.getOperationId('/users', 'get');

// IDE can rename all references to this operation
// when you change the operationId property
```

## Type Utilities and Helpers

### 1. Type Guards

```typescript
import { LaagError, ValidationError, ParseError } from '@laag/core';

function handleError(error: unknown) {
  if (error instanceof ValidationError) {
    // TypeScript knows this is a ValidationError
    console.log(`Validation failed at ${error.path}: ${error.message}`);
    console.log('Context:', error.context);
  } else if (error instanceof ParseError) {
    // TypeScript knows this is a ParseError
    console.log(`Parse error: ${error.message}`);
  } else if (error instanceof LaagError) {
    // TypeScript knows this is a LaagError
    console.log(`Laag error [${error.code}]: ${error.message}`);
  }
}
```

### 2. Type Assertions

```typescript
import type { OperationObject } from '@laag/openapi';

const pathItem = api.getPath('/users');

// Type assertion when you know the structure
const getOperation = pathItem.get as OperationObject;

// Or use optional chaining with type safety
const summary = pathItem.get?.summary; // string | undefined
```

### 3. Utility Types

```typescript
import type { OpenAPIDocument, InfoObject, PathsObject } from '@laag/openapi';

// Extract specific parts of the document
type ApiInfo = Pick<OpenAPIDocument, 'info' | 'openapi'>;
type ApiPaths = Pick<OpenAPIDocument, 'paths'>;

// Create partial types for updates
type InfoUpdate = Partial<InfoObject>;

const updateInfo: InfoUpdate = {
  description: 'Updated description',
  // Other fields are optional
};
```

## Best Practices

### 1. Use Strict TypeScript Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitReturns": true,
    "noImplicitThis": true
  }
}
```

### 2. Leverage Type Imports

```typescript
// Import types separately from runtime code
import { Openapi } from '@laag/openapi';
import type { OpenAPIDocument, InfoObject, PathItemObject } from '@laag/openapi';

// This helps with tree-shaking and build optimization
```

### 3. Create Custom Type Definitions

```typescript
// Define your own types for common patterns
interface ApiConfig {
  title: string;
  version: string;
  baseUrl: string;
  description?: string;
}

function createApi(config: ApiConfig): Openapi {
  return new Openapi({
    openapi: '3.0.2',
    info: {
      title: config.title,
      version: config.version,
      description: config.description,
    },
    servers: [
      {
        url: config.baseUrl,
        description: 'API server',
      },
    ],
    paths: {},
  });
}
```

### 4. Use Branded Types for IDs

```typescript
// Create branded types for better type safety
type OperationId = string & { __brand: 'OperationId' };
type PathName = string & { __brand: 'PathName' };

function getOperationById(id: OperationId) {
  // Implementation
}

// Usage requires explicit casting or validation
const opId = 'getUserById' as OperationId;
getOperationById(opId);
```

## Migration from JavaScript

### 1. Gradual Migration

```typescript
// Start with basic types
const api = new Openapi();

// Add types gradually
api.title = 'My API'; // Already type-safe

// Add interface definitions over time
interface UserSchema {
  type: 'object';
  properties: {
    id: { type: 'string' };
    name: { type: 'string' };
  };
}
```

### 2. Type Assertion for Legacy Code

```typescript
// When migrating existing JavaScript
const legacyDocument = getLegacyDocument(); // any type

// Use type assertion carefully
const api = new Openapi(legacyDocument as OpenAPIDocument);

// Better: validate and type gradually
const api = new Openapi(legacyDocument);
const validation = api.validate();
if (validation.valid) {
  // Now you know it's a valid document
}
```

## Performance Benefits

### 1. Compile-time Optimization

TypeScript enables better tree-shaking and dead code elimination:

```typescript
// Only import what you need
import { Openapi } from '@laag/openapi';
// Types are erased at runtime, no performance cost

// Avoid importing everything
// import * from '@laag/openapi'; // ❌ Imports everything
```

### 2. Better Minification

TypeScript's type information helps bundlers optimize code:

```typescript
// TypeScript can inline simple getters/setters
const title = api.title; // May be inlined by compiler
```

## Debugging with TypeScript

### 1. Better Stack Traces

```typescript
// TypeScript preserves meaningful names in stack traces
try {
  const api = new Openapi(invalidData);
} catch (error) {
  // Stack trace shows TypeScript class and method names
  console.error(error.stack);
}
```

### 2. Source Maps

```typescript
// Enable source maps in tsconfig.json
{
  "compilerOptions": {
    "sourceMap": true
  }
}

// Debug original TypeScript code in browser/Node.js
```

This comprehensive TypeScript integration makes laag v2 not just a library upgrade, but a significant improvement to your development workflow and code quality.
