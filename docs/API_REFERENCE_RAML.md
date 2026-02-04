# @laag/raml API Reference

## Table of Contents

- [Overview](#overview)
- [Current Status](#current-status)
- [Installation](#installation)
- [Re-exported Core Functionality](#re-exported-core-functionality)
  - [LaagBase Class](#laagbase-class)
  - [Error Classes](#error-classes)
  - [Type Definitions](#type-definitions)
- [Planned Implementation](#planned-implementation)
  - [Raml Class (Coming Soon)](#raml-class-coming-soon)
  - [RAML-Specific Types (Coming Soon)](#raml-specific-types-coming-soon)
- [Migration Path](#migration-path)

---

## Overview

The `@laag/raml` package is designed to provide a comprehensive TypeScript/JavaScript interface for working with [RAML (RESTful API Modeling Language)](https://raml.org/) documents. This package will follow the same unified interface pattern as `@laag/openapi`, making it easy to work with multiple API specification formats using consistent APIs.

**Important:** This package is currently in early development and serves as a placeholder. The full RAML implementation is planned for future releases.

---

## Current Status

⚠️ **Placeholder Implementation**

The `@laag/raml` package is currently a placeholder that re-exports core functionality from `@laag/core`. The RAML-specific implementation is under active development.

**What's Available Now:**

- Re-exported core classes and types from `@laag/core`
- Package structure and build configuration
- TypeScript type definitions

**What's Coming:**

- Full RAML document parsing and manipulation
- RAML 1.0 specification support
- Resource and method management
- Type and trait handling
- Data type definitions
- Security scheme configuration
- Example and documentation generation

---

## Installation

```bash
# Using npm
npm install @laag/raml

# Using yarn
yarn add @laag/raml

# Using bun
bun add @laag/raml
```

**Note:** While you can install the package now, the RAML-specific functionality is not yet implemented. Check back for updates or watch the [GitHub repository](https://github.com/bschwarz/laag) for release announcements.

---

## Re-exported Core Functionality

The `@laag/raml` package currently re-exports the following from `@laag/core`:

### LaagBase Class

Abstract base class that will be extended by the RAML implementation.

```typescript
import { LaagBase } from '@laag/raml';
```

For complete documentation, see the [@laag/core API Reference](./API_REFERENCE_CORE.md#laagbase-class).

### Error Classes

Standard error classes for consistent error handling:

```typescript
import { LaagError, ParseError, ValidationError, NotFoundError } from '@laag/raml';
```

For complete documentation, see the [@laag/core API Reference](./API_REFERENCE_CORE.md#error-classes).

### Type Definitions

Shared TypeScript types and interfaces:

```typescript
import type {
  BaseDocument,
  ErrorHandlingOptions,
  ExtensionObject,
  ValidationErrorType,
  ValidationResult,
} from '@laag/raml';
```

For complete documentation, see the [@laag/core API Reference](./API_REFERENCE_CORE.md#type-definitions).

---

## Planned Implementation

### Raml Class (Coming Soon)

The main class for working with RAML documents will provide a comprehensive API similar to the OpenAPI package.

**Planned Constructor:**

```typescript
class Raml extends LaagBase {
  constructor(doc?: string | RamlDocument);
}
```

**Planned Properties:**

- `title`: API title
- `version`: API version
- `baseUri`: Base URI for the API
- `protocols`: Supported protocols (HTTP, HTTPS)
- `mediaType`: Default media type
- `documentation`: API documentation
- `types`: Data type definitions
- `traits`: Reusable method traits
- `resourceTypes`: Reusable resource patterns
- `securitySchemes`: Security scheme definitions
- `annotationTypes`: Custom annotation definitions

**Planned Methods:**

**Document Operations:**

- `getDefinition(format?: string)`: Get the complete RAML document
- `validate()`: Validate the RAML document
- `getDocument()`: Get the raw document object

**Resource Operations:**

- `getResourceNames()`: Get all resource paths
- `getResource(path: string)`: Get a specific resource
- `appendResource(path: string, resource: ResourceObject)`: Add a resource
- `resourceExists(path: string)`: Check if a resource exists

**Method Operations:**

- `methodExists(path: string, method: string)`: Check if a method exists
- `getMethod(path: string, method: string)`: Get method details
- `getMethodDescription(path: string, method: string)`: Get method description
- `getMethodRequest(path: string, method: string)`: Get request details
- `getMethodResponse(path: string, method: string, statusCode: string)`: Get response details

**Type Operations:**

- `getTypes()`: Get all type definitions
- `getType(name: string)`: Get a specific type
- `appendType(name: string, type: TypeObject)`: Add a type definition

**Trait Operations:**

- `getTraits()`: Get all traits
- `getTrait(name: string)`: Get a specific trait
- `appendTrait(name: string, trait: TraitObject)`: Add a trait

**Example Generation:**

- `generateJsonSample(path: string, method: string, type: 'request' | 'response')`: Generate sample JSON

**Extension Operations:**

- `appendRootAnnotation(name: string, value: any)`: Add root-level annotation
- `getAnnotations(path: string)`: Get annotations for a resource

**Example Usage (Planned):**

```typescript
import { Raml } from '@laag/raml';

// Create a new RAML document
const api = new Raml({
  title: 'My API',
  version: 'v1',
  baseUri: 'https://api.example.com/{version}',
  protocols: ['HTTPS'],
});

// Add a resource
api.appendResource('/users', {
  get: {
    description: 'Get all users',
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

// Validate the document
const validation = api.validate();
if (!validation.valid) {
  console.error('Validation errors:', validation.errors);
}

// Get the RAML definition
console.log(api.getDefinition('yaml'));
```

### RAML-Specific Types (Coming Soon)

**Planned Type Definitions:**

```typescript
// Main RAML document structure
interface RamlDocument {
  title: string;
  version?: string;
  baseUri?: string;
  baseUriParameters?: { [key: string]: ParameterObject };
  protocols?: string[];
  mediaType?: string | string[];
  documentation?: DocumentationItem[];
  types?: { [key: string]: TypeObject };
  traits?: { [key: string]: TraitObject };
  resourceTypes?: { [key: string]: ResourceTypeObject };
  annotationTypes?: { [key: string]: AnnotationTypeObject };
  securitySchemes?: { [key: string]: SecuritySchemeObject };
  securedBy?: SecuritySchemeReference[];
  uses?: { [key: string]: string };
  [resourcePath: string]: any; // Resources start with /
}

// Resource definition
interface ResourceObject {
  displayName?: string;
  description?: string;
  type?: string | ResourceTypeObject;
  is?: (string | TraitObject)[];
  securedBy?: SecuritySchemeReference[];
  uriParameters?: { [key: string]: ParameterObject };
  get?: MethodObject;
  post?: MethodObject;
  put?: MethodObject;
  patch?: MethodObject;
  delete?: MethodObject;
  options?: MethodObject;
  head?: MethodObject;
  [nestedResource: string]: any; // Nested resources
}

// Method definition
interface MethodObject {
  displayName?: string;
  description?: string;
  is?: (string | TraitObject)[];
  securedBy?: SecuritySchemeReference[];
  queryParameters?: { [key: string]: ParameterObject };
  headers?: { [key: string]: ParameterObject };
  queryString?: TypeObject | string;
  body?: { [mediaType: string]: BodyObject };
  responses?: { [statusCode: string]: ResponseObject };
  protocols?: string[];
}

// Type definition
interface TypeObject {
  type?: string | string[];
  displayName?: string;
  description?: string;
  properties?: { [key: string]: PropertyObject };
  minProperties?: number;
  maxProperties?: number;
  additionalProperties?: boolean;
  discriminator?: string;
  discriminatorValue?: string;
  example?: any;
  examples?: { [key: string]: any };
  [annotation: string]: any; // Annotations start with (
}

// Parameter definition
interface ParameterObject {
  displayName?: string;
  description?: string;
  type?: string;
  enum?: any[];
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  minimum?: number;
  maximum?: number;
  format?: string;
  required?: boolean;
  default?: any;
  example?: any;
  examples?: any[];
}

// Response definition
interface ResponseObject {
  description?: string;
  headers?: { [key: string]: ParameterObject };
  body?: { [mediaType: string]: BodyObject };
}

// Body definition
interface BodyObject {
  type?: string | TypeObject;
  properties?: { [key: string]: PropertyObject };
  example?: any;
  examples?: { [key: string]: any };
}

// Trait definition
interface TraitObject {
  displayName?: string;
  description?: string;
  usage?: string;
  queryParameters?: { [key: string]: ParameterObject };
  headers?: { [key: string]: ParameterObject };
  responses?: { [statusCode: string]: ResponseObject };
}

// Security scheme definition
interface SecuritySchemeObject {
  type:
    | 'OAuth 1.0'
    | 'OAuth 2.0'
    | 'Basic Authentication'
    | 'Digest Authentication'
    | 'Pass Through'
    | string;
  displayName?: string;
  description?: string;
  describedBy?: {
    headers?: { [key: string]: ParameterObject };
    queryParameters?: { [key: string]: ParameterObject };
    responses?: { [statusCode: string]: ResponseObject };
  };
  settings?: any;
}

// Documentation item
interface DocumentationItem {
  title: string;
  content: string;
}

// Security scheme reference
type SecuritySchemeReference = string | { [schemeName: string]: any };
```

---

## Migration Path

When the full RAML implementation is released, migration will be straightforward:

**Current (Placeholder):**

```typescript
import { LaagBase } from '@laag/raml';

// Only core functionality available
```

**Future (Full Implementation):**

```typescript
import { Raml } from '@laag/raml';

// Full RAML functionality
const api = new Raml(ramlDocument);
console.log(api.title);
console.log(api.getResourceNames());
```

**Compatibility:**

- The package will maintain semantic versioning
- Breaking changes will be clearly documented
- Core functionality will remain backward compatible
- Migration guides will be provided with each major release

---

## Stay Updated

To stay informed about the RAML implementation progress:

1. **Watch the Repository**: [github.com/bschwarz/laag](https://github.com/bschwarz/laag)
2. **Check the Changelog**: Review `CHANGELOG.md` for updates
3. **Follow Releases**: Subscribe to release notifications
4. **Read the Docs**: Check back here for updated documentation

For questions or to contribute to the RAML implementation, please visit the [GitHub Issues](https://github.com/bschwarz/laag/issues) page.

---

## See Also

- [@laag/core API Reference](./API_REFERENCE_CORE.md) - Core functionality documentation
- [@laag/openapi API Reference](./API_REFERENCE_OPENAPI.md) - Similar implementation for OpenAPI
- [RAML Specification](https://raml.org/) - Official RAML documentation
- [Usage Guide](./USAGE_GUIDE_RAML.md) - Practical usage examples (coming soon)
