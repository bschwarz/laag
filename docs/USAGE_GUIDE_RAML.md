# RAML Package Usage Guide

## Table of Contents

- [Introduction](#introduction)
- [Current Status](#current-status)
- [Getting Started (When Available)](#getting-started-when-available)
  - [Installation](#installation)
  - [Basic Setup and Imports](#basic-setup-and-imports)
  - [Your First Example](#your-first-example)
- [Planned Features](#planned-features)
  - [Creating Documents](#creating-documents)
  - [Reading Documents](#reading-documents)
  - [Modifying Documents](#modifying-documents)
  - [Resources and Methods](#resources-and-methods)
  - [Types and Traits](#types-and-traits)
  - [Validation](#validation)
  - [Annotations](#annotations)
  - [Example Generation](#example-generation)
- [RAML vs OpenAPI](#raml-vs-openapi)
- [Migration Guide (Future)](#migration-guide-future)
- [Stay Updated](#stay-updated)

---

## Introduction

Welcome to the RAML Package Usage Guide! This guide will provide practical examples and patterns for working with RAML (RESTful API Modeling Language) specification documents using the `@laag/raml` package.

**Important Notice:** This package is currently in early development and serves as a placeholder. The full RAML implementation is planned for future releases. This guide outlines what will be available when the implementation is complete.

---

## Current Status

⚠️ **In Development - Placeholder Implementation**

The `@laag/raml` package is currently a placeholder that re-exports core functionality from `@laag/core`. RAML-specific features are under active development.

**What's Available Now:**

- Package installation and structure
- Re-exported core classes and types
- TypeScript type definitions for core functionality

**What's Coming:**

- Full RAML 1.0 specification support
- Document parsing and manipulation
- Resource and method management
- Type and trait handling
- Data type definitions
- Security scheme configuration
- Example and documentation generation
- YAML and JSON format support

**Timeline:**
Check the [GitHub repository](https://github.com/bschwarz/laag) for development updates and release schedules.

---

## Getting Started (When Available)

### Installation

You can install the package now, though full functionality is not yet available:

**Using npm:**

```bash
npm install @laag/raml
```

**Using yarn:**

```bash
yarn add @laag/raml
```

**Using bun:**

```bash
bun add @laag/raml
```

**Requirements (Planned):**

- Node.js 18.0.0 or higher
- TypeScript 4.5.0 or higher (optional, for TypeScript projects)

The package will include TypeScript type definitions out of the box.

---

### Basic Setup and Imports

When the full implementation is available, you'll be able to import the library like this:

**ES Modules (TypeScript/Modern JavaScript):**

```typescript
import { Raml } from '@laag/raml';
import type { RamlDocument, ResourceObject, MethodObject } from '@laag/raml';
```

**CommonJS (Node.js):**

```javascript
const { Raml } = require('@laag/raml');
```

**Browser (via bundler):**

```javascript
import { Raml } from '@laag/raml';
```

The package will support multiple module formats:

- **ESM** (ES Modules) for modern JavaScript and TypeScript
- **CommonJS** for traditional Node.js applications
- **Browser** builds for client-side usage

---

### Your First Example

Here's what a simple RAML document creation will look like:

```typescript
import { Raml } from '@laag/raml';

// Create a new RAML document
const api = new Raml({
  title: 'My First API',
  version: 'v1',
  baseUri: 'https://api.example.com/{version}',
  protocols: ['HTTPS'],
});

// Add a simple resource
api.appendResource('/users', {
  displayName: 'Users',
  description: 'User management endpoints',
  get: {
    description: 'Get all users',
    responses: {
      '200': {
        description: 'Success',
        body: {
          'application/json': {
            type: 'User[]',
          },
        },
      },
    },
  },
});

// Get the RAML definition
console.log(api.getDefinition('yaml'));
```

**Expected Output:**

```yaml
#%RAML 1.0
title: My First API
version: v1
baseUri: https://api.example.com/{version}
protocols:
  - HTTPS

/users:
  displayName: Users
  description: User management endpoints
  get:
    description: Get all users
    responses:
      200:
        description: Success
        body:
          application/json:
            type: User[]
```

---

## Planned Features

### Creating Documents

**Creating from Scratch:**

```typescript
import { Raml } from '@laag/raml';

// Create an empty RAML document
const api = new Raml();

// Set basic properties
api.title = 'Product API';
api.version = 'v2';
api.baseUri = 'https://api.products.com/{version}';
api.protocols = ['HTTPS'];
api.mediaType = 'application/json';

// Add documentation
api.documentation = [
  {
    title: 'Getting Started',
    content: 'This API provides access to product information.',
  },
];
```

**Setting Metadata:**

```typescript
// Configure base URI with parameters
api.baseUri = 'https://{environment}.api.example.com/{version}';
api.baseUriParameters = {
  environment: {
    type: 'string',
    enum: ['dev', 'staging', 'prod'],
    default: 'prod',
  },
  version: {
    type: 'string',
    enum: ['v1', 'v2'],
    default: 'v2',
  },
};
```

---

### Reading Documents

**Loading from YAML:**

```typescript
import { Raml } from '@laag/raml';
import * as fs from 'fs';

// Read RAML file
const ramlContent = fs.readFileSync('api.raml', 'utf8');

// Parse the document
const api = new Raml(ramlContent);

// Access properties
console.log(`API: ${api.title} ${api.version}`);
console.log(`Base URI: ${api.baseUri}`);
console.log(`Resources: ${api.getResourceNames().join(', ')}`);
```

**Loading from JSON:**

```typescript
// RAML can also be represented as JSON
const ramlJson = {
  title: 'My API',
  version: 'v1',
  baseUri: 'https://api.example.com',
  '/users': {
    get: {
      description: 'Get users',
    },
  },
};

const api = new Raml(ramlJson);
```

**Error Handling:**

```typescript
import { Raml } from '@laag/raml';
import { ParseError } from '@laag/raml';

try {
  const api = new Raml(invalidRamlString);
} catch (error) {
  if (error instanceof ParseError) {
    console.error('Failed to parse RAML document:', error.message);
  }
}
```

---

### Modifying Documents

**Updating Existing Documents:**

```typescript
// Load existing document
const api = new Raml(existingRaml);

// Update properties
api.version = 'v2';
api.baseUri = 'https://api.example.com/v2';

// Add new resource
api.appendResource('/products', {
  displayName: 'Products',
  get: {
    description: 'List all products',
  },
  post: {
    description: 'Create a new product',
  },
});
```

**Modifying Resources:**

```typescript
// Get existing resource
const usersResource = api.getResource('/users');

// Add a new method
usersResource.delete = {
  description: 'Delete a user',
  responses: {
    '204': {
      description: 'User deleted successfully',
    },
  },
};

// Update the resource
api.appendResource('/users', usersResource);
```

---

### Resources and Methods

**Working with Resources:**

```typescript
// Add a resource with nested resources
api.appendResource('/users', {
  displayName: 'Users',
  get: {
    description: 'Get all users',
  },
  '/{userId}': {
    displayName: 'User',
    uriParameters: {
      userId: {
        type: 'string',
        description: 'User ID',
        example: 'user123',
      },
    },
    get: {
      description: 'Get user by ID',
    },
    put: {
      description: 'Update user',
    },
    delete: {
      description: 'Delete user',
    },
  },
});

// Query resources
const resourceNames = api.getResourceNames();
console.log('Available resources:', resourceNames);

// Check if resource exists
if (api.resourceExists('/users/{userId}')) {
  const resource = api.getResource('/users/{userId}');
  console.log(resource.displayName);
}
```

**Working with Methods:**

```typescript
// Add a method with full details
api.appendResource('/products', {
  post: {
    displayName: 'Create Product',
    description: 'Create a new product',
    headers: {
      'X-API-Key': {
        type: 'string',
        required: true,
        description: 'API authentication key',
      },
    },
    body: {
      'application/json': {
        type: 'Product',
        example: {
          name: 'Widget',
          price: 29.99,
        },
      },
    },
    responses: {
      '201': {
        description: 'Product created',
        body: {
          'application/json': {
            type: 'Product',
          },
        },
      },
      '400': {
        description: 'Invalid request',
      },
    },
  },
});

// Query methods
if (api.methodExists('/products', 'post')) {
  const method = api.getMethod('/products', 'post');
  console.log(method.description);
}
```

---

### Types and Traits

**Defining Types:**

```typescript
// Define reusable data types
api.appendType('User', {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      required: true,
    },
    name: {
      type: 'string',
      required: true,
    },
    email: {
      type: 'string',
      pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
    },
    createdAt: {
      type: 'datetime',
      required: true,
    },
  },
  example: {
    id: 'user123',
    name: 'John Doe',
    email: 'john@example.com',
    createdAt: '2024-01-15T10:30:00Z',
  },
});

// Use the type in a resource
api.appendResource('/users', {
  get: {
    responses: {
      '200': {
        body: {
          'application/json': {
            type: 'User[]',
          },
        },
      },
    },
  },
});
```

**Defining Traits:**

```typescript
// Define reusable method traits
api.appendTrait('pageable', {
  queryParameters: {
    page: {
      type: 'integer',
      default: 1,
      minimum: 1,
    },
    pageSize: {
      type: 'integer',
      default: 20,
      minimum: 1,
      maximum: 100,
    },
  },
});

api.appendTrait('searchable', {
  queryParameters: {
    q: {
      type: 'string',
      description: 'Search query',
    },
  },
});

// Apply traits to methods
api.appendResource('/users', {
  get: {
    is: ['pageable', 'searchable'],
    description: 'Get users with pagination and search',
  },
});
```

---

### Validation

**Validating Documents:**

```typescript
import { Raml } from '@laag/raml';

const api = new Raml(ramlDocument);

// Validate the document
const validation = api.validate();

if (validation.valid) {
  console.log('✓ RAML document is valid');
} else {
  console.error('✗ RAML document has errors:');
  for (const error of validation.errors) {
    console.error(`  ${error.path}: ${error.message}`);
  }
}
```

**Handling Validation Errors:**

```typescript
const validation = api.validate();

if (!validation.valid) {
  // Group errors by type
  const errorsByPath = validation.errors.reduce((acc, error) => {
    if (!acc[error.path]) {
      acc[error.path] = [];
    }
    acc[error.path].push(error.message);
    return acc;
  }, {});

  // Display grouped errors
  for (const [path, messages] of Object.entries(errorsByPath)) {
    console.error(`\nErrors in ${path}:`);
    messages.forEach(msg => console.error(`  - ${msg}`));
  }
}
```

---

### Annotations

**Working with Annotations:**

```typescript
// Add root-level annotation
api.appendRootAnnotation('deprecated', {
  date: '2024-12-31',
  reason: 'Use v2 API instead',
});

// Annotations in RAML use parentheses syntax
// The above creates: (deprecated): { date: '2024-12-31', reason: '...' }

// Add annotations to resources
api.appendResource('/legacy', {
  '(deprecated)': true,
  '(sunset)': '2025-01-01',
  get: {
    description: 'Legacy endpoint',
  },
});

// Get annotations
const annotations = api.getAnnotations('/legacy');
console.log(annotations);
```

---

### Example Generation

**Generating JSON Samples:**

```typescript
// Generate request sample
const requestSample = api.generateJsonSample('/users', 'post', 'request');
console.log('Request sample:', JSON.stringify(requestSample, null, 2));

// Generate response sample
const responseSample = api.generateJsonSample('/users', 'get', 'response');
console.log('Response sample:', JSON.stringify(responseSample, null, 2));
```

---

## RAML vs OpenAPI

### Key Differences

**RAML Advantages:**

- **Reusability**: Strong support for traits, resource types, and includes
- **Type System**: Rich type system with inheritance
- **Human-Readable**: YAML-first design for better readability
- **Modularity**: Built-in support for splitting specs across files

**OpenAPI Advantages:**

- **Industry Adoption**: Wider tooling ecosystem and community
- **JSON Schema**: Direct use of JSON Schema for validation
- **Code Generation**: More mature code generation tools

**Syntax Comparison:**

**RAML:**

```yaml
#%RAML 1.0
title: My API
/users:
  get:
    responses:
      200:
        body:
          application/json:
            type: User[]
```

**OpenAPI:**

```yaml
openapi: 3.0.0
info:
  title: My API
paths:
  /users:
    get:
      responses:
        '200':
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/User'
```

### When to Use RAML

Choose RAML when:

- You need strong reusability and modularity
- Your team prefers YAML-first design
- You want a rich type system with inheritance
- You're building complex APIs with many shared patterns

### When to Use OpenAPI

Choose OpenAPI when:

- You need broad tooling support
- You're integrating with existing OpenAPI ecosystems
- You prefer JSON Schema for validation
- You need mature code generation tools

---

## Migration Guide (Future)

When the full implementation is released, migration will be straightforward:

**Step 1: Update Imports**

```typescript
// Before (placeholder)
import { LaagBase } from '@laag/raml';

// After (full implementation)
import { Raml } from '@laag/raml';
```

**Step 2: Use RAML-Specific Features**

```typescript
// Create RAML documents
const api = new Raml({
  title: 'My API',
  version: 'v1',
});

// Use RAML methods
api.appendResource('/users', {
  /* ... */
});
api.appendType('User', {
  /* ... */
});
api.appendTrait('pageable', {
  /* ... */
});
```

**Step 3: Update Type Imports**

```typescript
import type { RamlDocument, ResourceObject, MethodObject, TypeObject } from '@laag/raml';
```

---

## Stay Updated

To stay informed about the RAML implementation progress:

### Follow Development

1. **GitHub Repository**: [github.com/bschwarz/laag](https://github.com/bschwarz/laag)
   - Watch for release notifications
   - Check the project board for progress
   - Review pull requests for upcoming features

2. **Changelog**: Review `CHANGELOG.md` for updates
   - New feature announcements
   - Breaking changes
   - Migration guides

3. **Documentation**: Check back here for updated guides
   - This guide will be updated as features are implemented
   - New examples will be added
   - Best practices will be documented

### Get Involved

- **Report Issues**: [GitHub Issues](https://github.com/bschwarz/laag/issues)
- **Request Features**: Open a feature request issue
- **Contribute**: Check the contributing guidelines
- **Ask Questions**: Use GitHub Discussions

### Roadmap

Planned milestones for RAML implementation:

- **Phase 1**: Basic document parsing and creation
- **Phase 2**: Resource and method management
- **Phase 3**: Type and trait system
- **Phase 4**: Validation and error handling
- **Phase 5**: Example generation and tooling
- **Phase 6**: Advanced features (includes, overlays, extensions)

Check the GitHub repository for detailed roadmap and timelines.

---

## See Also

- [API Reference](./API_REFERENCE_RAML.md) - Complete API documentation
- [@laag/core API Reference](./API_REFERENCE_CORE.md) - Core functionality
- [@laag/openapi Usage Guide](./USAGE_GUIDE_OPENAPI.md) - Similar patterns for OpenAPI
- [RAML Specification](https://raml.org/) - Official RAML documentation
- [RAML Tutorial](https://raml.org/developers/raml-100-tutorial) - Learn RAML basics

---

**Note:** This guide will be continuously updated as the RAML implementation progresses. Check back regularly for new content and examples.
