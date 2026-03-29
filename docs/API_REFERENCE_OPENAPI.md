# OpenAPI Package API Reference

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Constructor and Initialization](#constructor-and-initialization)
  - [new Openapi()](#new-openapi)
- [Document Operations](#document-operations)
  - [getDefinition()](#getdefinition)
  - [validate()](#validate)
- [Info Object Properties](#info-object-properties)
  - [info](#info)
  - [title](#title)
  - [description](#description)
  - [version](#version)
  - [termsOfService](#termsofservice)
  - [contact](#contact)
  - [license](#license)
- [Server Management](#server-management)
  - [servers](#servers)
  - [appendServer()](#appendserver)
- [Path Operations](#path-operations)
  - [paths](#paths)
  - [getPathNames()](#getpathnames)
  - [getPath()](#getpath)
  - [appendPath()](#appendpath)
  - [pathExists()](#pathexists)
- [Operation Methods](#operation-methods)
  - [operationExists()](#operationexists)
  - [getOperationId()](#getoperationid)
  - [setOperationId()](#setoperationid)
  - [getOperationIds()](#getoperationids)
  - [getOperationDescription()](#getoperationdescription)
  - [getOperationData()](#getoperationdata)
  - [getOperationRequest()](#getoperationrequest)
  - [getOperationResponse()](#getoperationresponse)
  - [getOperationRequestMedia()](#getoperationrequestmedia)
  - [getOperationResponseMedia()](#getoperationresponsemedia)
  - [isOperationDeprecated()](#isoperationdeprecated)
- [Status Code and HTTP Method Operations](#status-code-and-http-method-operations)
  - [getStatusCodes()](#getstatuscodes)
  - [getAllStatusCodes()](#getallstatuscodes)
  - [getSuccessCode()](#getsuccesscode)
  - [getAllHttpMethods()](#getallhttpmethods)
- [Component Operations](#component-operations)
  - [components](#components)
  - [componentsSchemas](#componentsschemas)
  - [getComponentFromPath()](#getcomponentfrompath)
- [Validation Methods](#validation-methods)
  - [validate()](#validate-1)
- [Sample Generation](#sample-generation)
  - [generateJsonSample()](#generatejsonsample)
- [Code Generation](#code-generation)
  - [getCurlCommands()](#getcurlcommands)
  - [getPythonCode()](#getpythoncode)
  - [getJavaScriptCode()](#getjavascriptcode)
  - [getTypeScriptCode()](#gettypescriptcode)
- [Extension Properties](#extension-properties)
  - [rootExtensions](#rootextensions)
  - [infoExtensions](#infoextensions)
  - [pathsExtensions](#pathsextensions)
  - [appendRootExtension()](#appendrootextension)
  - [appendInfoExtension()](#appendinfoextension)
  - [appendPathsExtension()](#appendpathsextension)
- [TypeScript Types](#typescript-types)
  - [OpenAPIDocument](#openapidocument)
  - [InfoObject](#infoobject)
  - [PathItemObject](#pathitemobject)
  - [OperationObject](#operationobject)
  - [SchemaObject](#schemaobject)
  - [ComponentsObject](#componentsobject)
  - [ServerObject](#serverobject)
  - [TagObject](#tagobject)
  - [Additional Types](#additional-types)

---

## Overview

The `@laag/openapi` package provides a comprehensive TypeScript/JavaScript library for working with OpenAPI 3.0 specification documents. It offers a rich API for creating, reading, modifying, and validating OpenAPI documents programmatically.

**Key Features:**

- Full TypeScript support with comprehensive type definitions
- Document validation according to OpenAPI 3.0 specification
- Utility methods for common operations (paths, operations, components)
- Extension property support (x-\* properties)
- Sample and code generation capabilities
- Backward compatibility with existing APIs

**Package Information:**

- Package: `@laag/openapi`
- Version: 2.0.0+
- License: MIT

---

## Installation

```bash
# Using npm
npm install @laag/openapi

# Using yarn
yarn add @laag/openapi

# Using bun
bun add @laag/openapi
```

---

## Constructor and Initialization

### new Openapi()

Creates a new OpenAPI document instance.

**Signature:**

```typescript
constructor(doc?: string | OpenAPIDocument)
```

**Parameters:**

- `doc` (string | OpenAPIDocument, optional): The OpenAPI document as a JSON string or object. If not provided, a minimal valid document structure is created with default values.

**Returns:**

- (Openapi): A new Openapi instance

**Description:**

The constructor creates a new OpenAPI document instance. If no document is provided, it initializes a minimal valid OpenAPI document structure with default values. If a document is provided but missing required fields (openapi, info, paths), they will be initialized with default values.

**Throws:**

- `ParseError`: When the provided string cannot be parsed as valid JSON

**Examples:**

**Example 1: Create empty document with defaults**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();
console.log(api.getDefinition('prettyjson'));
```

**Output:**

```json
{
  "openapi": "3.0.2",
  "info": {
    "title": "",
    "version": "1.0.0"
  },
  "paths": {}
}
```

**Example 2: Create from existing document object**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi({
  openapi: '3.0.2',
  info: {
    title: 'User API',
    version: '1.0.0',
    description: 'API for managing users',
  },
  paths: {
    '/users': {
      get: {
        summary: 'Get all users',
        responses: {
          '200': {
            description: 'Success',
          },
        },
      },
    },
  },
});

console.log(api.title); // 'User API'
console.log(api.getPathNames()); // ['/users']
```

**Example 3: Create from JSON string**

```typescript
import { Openapi } from '@laag/openapi';

const jsonDoc = JSON.stringify({
  openapi: '3.0.2',
  info: {
    title: 'Product API',
    version: '2.0.0',
  },
  paths: {},
});

const api = new Openapi(jsonDoc);
console.log(api.title); // 'Product API'
console.log(api.version); // '2.0.0'
```

**Example 4: Error handling for invalid JSON**

```typescript
import { Openapi } from '@laag/openapi';
import { ParseError } from '@laag/core';

try {
  const api = new Openapi('{ invalid json }');
} catch (error) {
  if (error instanceof ParseError) {
    console.error('Failed to parse document:', error.message);
  }
}
```

**See Also:**

- [getDefinition()](#getdefinition)
- [validate()](#validate)

---

## Document Operations

### getDefinition()

Retrieves the OpenAPI document in different formats.

**Signature:**

```typescript
getDefinition(format?: 'js' | 'json' | 'prettyjson'): OpenAPIDocument | string
```

**Parameters:**

- `format` ('js' | 'json' | 'prettyjson', optional): The format to return the document in. Default: 'js'
  - `'js'`: Returns the document as a JavaScript object
  - `'json'`: Returns the document as a compact JSON string
  - `'prettyjson'`: Returns the document as a formatted JSON string with indentation

**Returns:**

- (OpenAPIDocument | string): The document in the requested format

**Example:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi({
  openapi: '3.0.2',
  info: { title: 'My API', version: '1.0.0' },
  paths: {},
});

// Get as JavaScript object
const jsDoc = api.getDefinition('js');
console.log(jsDoc.info.title); // 'My API'

// Get as compact JSON string
const jsonDoc = api.getDefinition('json');
console.log(jsonDoc); // '{"openapi":"3.0.2","info":{"title":"My API","version":"1.0.0"},"paths":{}}'

// Get as formatted JSON string
const prettyDoc = api.getDefinition('prettyjson');
console.log(prettyDoc);
// {
//   "openapi": "3.0.2",
//   "info": {
//     "title": "My API",
//     "version": "1.0.0"
//   },
//   "paths": {}
// }
```

---

### validate()

Validates the OpenAPI document structure according to the OpenAPI 3.0 specification.

**Signature:**

```typescript
validate(): ValidationResult
```

**Returns:**

- (ValidationResult): A validation result object containing:
  - `valid` (boolean): Whether the document is valid
  - `errors` (Array): Array of validation error objects, each containing:
    - `path` (string): The path to the invalid field
    - `message` (string): Description of the validation error
    - `code` (string): Error code (e.g., 'REQUIRED_FIELD_MISSING')

**Description:**

This method checks for required fields and basic structural validity. It validates:

- Required root-level fields (openapi, info, paths)
- Required info object fields (title, version)
- Basic structure compliance

**Example:**

```typescript
import { Openapi } from '@laag/openapi';

// Valid document
const validApi = new Openapi({
  openapi: '3.0.2',
  info: { title: 'My API', version: '1.0.0' },
  paths: {},
});

const result1 = validApi.validate();
console.log(result1.valid); // true
console.log(result1.errors); // []

// Invalid document - missing info
const invalidApi = new Openapi({ openapi: '3.0.2', paths: {} } as any);
invalidApi.doc.info = undefined; // Force invalid state

const result2 = invalidApi.validate();
console.log(result2.valid); // false
console.log(result2.errors);
// [
//   {
//     path: 'info',
//     message: 'Info object is required',
//     code: 'REQUIRED_FIELD_MISSING'
//   }
// ]
```

**See Also:**

- [ValidationResult Type](#typescript-types)

---

## Info Object Properties

### info

Gets or sets the complete info object.

**Type:** InfoObject (getter/setter)

**Signature:**

```typescript
get info(): InfoObject
set info(value: InfoObject)
```

**Description:**

The info property provides access to the complete info object, which contains metadata about the API. When setting, only valid properties (title, description, termsOfService, contact, license, version) and extension properties (x-\*) are retained.

**Example:**

```typescript
import { Openapi } from '@laag/openapi';
import type { InfoObject } from '@laag/openapi';

const api = new Openapi();

// Set complete info object
const infoData: InfoObject = {
  title: 'E-Commerce API',
  version: '2.1.0',
  description: 'RESTful API for e-commerce operations',
  termsOfService: 'https://example.com/terms',
  contact: {
    name: 'API Support',
    email: 'support@example.com',
    url: 'https://example.com/support',
  },
  license: {
    name: 'Apache 2.0',
    url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
  },
};

api.info = infoData;

// Get complete info object
const info = api.info;
console.log(info.title); // 'E-Commerce API'
console.log(info.contact?.email); // 'support@example.com'
```

---

### title

Gets or sets the API title.

**Type:** string | null (getter/setter)

**Signature:**

```typescript
get title(): string | null
set title(value: string)
```

**Description:**

The title property provides access to the API title from the info object. This is a required field in the OpenAPI specification.

**Example:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();

// Set title
api.title = 'User Management API';

// Get title
console.log(api.title); // 'User Management API'

// Title is reflected in info object
console.log(api.info.title); // 'User Management API'
```

---

### description

Gets or sets the API description.

**Type:** string | null (getter/setter)

**Signature:**

```typescript
get description(): string | null
set description(value: string)
```

**Description:**

The description property provides access to the API description from the info object. This field is optional and provides a short description of the API.

**Example:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();

// Set description
api.description = 'A comprehensive API for managing user accounts, profiles, and authentication';

// Get description
console.log(api.description);
// 'A comprehensive API for managing user accounts, profiles, and authentication'
```

---

### version

Gets or sets the API version.

**Type:** string | null (getter/setter)

**Signature:**

```typescript
get version(): string | null
set version(value: string)
```

**Description:**

The version property provides access to the API version from the info object. This is a required field in the OpenAPI specification and should follow semantic versioning.

**Example:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();

// Set version
api.version = '1.2.3';

// Get version
console.log(api.version); // '1.2.3'
```

---

### termsOfService

Gets or sets the terms of service URL.

**Type:** string | null (getter/setter)

**Signature:**

```typescript
get termsOfService(): string | null
set termsOfService(value: string)
```

**Description:**

The termsOfService property provides access to the terms of service URL from the info object. This field is optional.

**Example:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();

// Set terms of service
api.termsOfService = 'https://example.com/terms';

// Get terms of service
console.log(api.termsOfService); // 'https://example.com/terms'
```

---

### contact

Gets or sets the contact information.

**Type:** ContactObject (getter/setter)

**Signature:**

```typescript
get contact(): ContactObject
set contact(value: ContactObject)
```

**Description:**

The contact property provides access to the contact information from the info object. When setting, only valid properties (name, url, email) and extension properties (x-\*) are retained.

**Example:**

```typescript
import { Openapi } from '@laag/openapi';
import type { ContactObject } from '@laag/openapi';

const api = new Openapi();

// Set contact information
const contactInfo: ContactObject = {
  name: 'API Support Team',
  email: 'api-support@example.com',
  url: 'https://example.com/support',
};

api.contact = contactInfo;

// Get contact information
const contact = api.contact;
console.log(contact.name); // 'API Support Team'
console.log(contact.email); // 'api-support@example.com'
console.log(contact.url); // 'https://example.com/support'
```

---

### license

Gets or sets the license information.

**Type:** LicenseObject (getter/setter)

**Signature:**

```typescript
get license(): LicenseObject
set license(value: LicenseObject)
```

**Description:**

The license property provides access to the license information from the info object. The name field is required. When setting, only valid properties (name, url) and extension properties (x-\*) are retained.

**Example:**

```typescript
import { Openapi } from '@laag/openapi';
import type { LicenseObject } from '@laag/openapi';

const api = new Openapi();

// Set license information
const licenseInfo: LicenseObject = {
  name: 'MIT',
  url: 'https://opensource.org/licenses/MIT',
};

api.license = licenseInfo;

// Get license information
const license = api.license;
console.log(license.name); // 'MIT'
console.log(license.url); // 'https://opensource.org/licenses/MIT'
```

---

## Server Management

### servers

Gets or sets the array of server objects.

**Type:** ServerObject[] (getter/setter)

**Signature:**

```typescript
get servers(): ServerObject[]
set servers(value: ServerObject[])
```

**Description:**

The servers property provides access to the array of server objects that define connectivity information to target servers. When setting, only valid properties (url, description, variables) and extension properties (x-\*) are retained for each server.

**Example:**

```typescript
import { Openapi } from '@laag/openapi';
import type { ServerObject } from '@laag/openapi';

const api = new Openapi();

// Set servers array
const serverList: ServerObject[] = [
  {
    url: 'https://api.example.com/v1',
    description: 'Production server',
  },
  {
    url: 'https://staging-api.example.com/v1',
    description: 'Staging server',
  },
  {
    url: 'http://localhost:3000/v1',
    description: 'Development server',
  },
];

api.servers = serverList;

// Get servers array
const servers = api.servers;
console.log(servers.length); // 3
console.log(servers[0].url); // 'https://api.example.com/v1'
console.log(servers[0].description); // 'Production server'
```

**Example with server variables:**

```typescript
import { Openapi } from '@laag/openapi';
import type { ServerObject } from '@laag/openapi';

const api = new Openapi();

const serverWithVariables: ServerObject = {
  url: 'https://{environment}.example.com:{port}/v1',
  description: 'Configurable server',
  variables: {
    environment: {
      default: 'api',
      enum: ['api', 'staging', 'dev'],
      description: 'Server environment',
    },
    port: {
      default: '443',
      description: 'Server port',
    },
  },
};

api.servers = [serverWithVariables];

const server = api.servers[0];
console.log(server.variables?.environment.default); // 'api'
console.log(server.variables?.environment.enum); // ['api', 'staging', 'dev']
```

---

### appendServer()

Appends a server object to the servers array.

**Signature:**

```typescript
appendServer(value: ServerObject): void
```

**Parameters:**

- `value` (ServerObject): The server object to append

**Returns:**

- (void)

**Description:**

This method adds a new server to the servers array. If the servers array doesn't exist, it will be created.

**Example:**

```typescript
import { Openapi } from '@laag/openapi';
import type { ServerObject } from '@laag/openapi';

const api = new Openapi();

// Append first server
api.appendServer({
  url: 'https://api.example.com',
  description: 'Production server',
});

// Append second server
api.appendServer({
  url: 'https://staging-api.example.com',
  description: 'Staging server',
});

console.log(api.servers.length); // 2
console.log(api.servers[0].url); // 'https://api.example.com'
console.log(api.servers[1].url); // 'https://staging-api.example.com'
```

**See Also:**

- [servers](#servers)
- [ServerObject Type](#serverobject)

---

## Path Operations

### paths

Gets or sets the paths object containing all API paths.

**Type:** PathsObject (getter/setter)

**Signature:**

```typescript
get paths(): PathsObject
set paths(value: PathsObject)
```

**Description:**

The paths property provides access to the paths object, which holds the relative paths to the individual endpoints and their operations.

**Example:**

```typescript
import { Openapi } from '@laag/openapi';
import type { PathsObject } from '@laag/openapi';

const api = new Openapi();

// Set paths object
const pathsData: PathsObject = {
  '/users': {
    get: {
      summary: 'Get all users',
      responses: { '200': { description: 'Success' } },
    },
    post: {
      summary: 'Create a user',
      responses: { '201': { description: 'Created' } },
    },
  },
  '/users/{id}': {
    get: {
      summary: 'Get user by ID',
      responses: { '200': { description: 'Success' } },
    },
  },
};

api.paths = pathsData;

// Get paths object
const paths = api.paths;
console.log(Object.keys(paths)); // ['/users', '/users/{id}']
```

---

### getPathNames()

Gets an array of all path names in the document.

**Signature:**

```typescript
getPathNames(): string[]
```

**Returns:**

- (string[]): Array of path names, sorted alphabetically, excluding extension properties (x-\*)

**Description:**

This method returns all path names defined in the document, sorted alphabetically. Extension properties (starting with x-) are excluded from the results.

**Example:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();

api.appendPath('/users', {
  get: { responses: { '200': { description: 'Success' } } },
});

api.appendPath('/products', {
  get: { responses: { '200': { description: 'Success' } } },
});

api.appendPath('/orders', {
  get: { responses: { '200': { description: 'Success' } } },
});

const pathNames = api.getPathNames();
console.log(pathNames); // ['/orders', '/products', '/users']
```

---

### getPath()

Gets a specific path item by path name.

**Signature:**

```typescript
getPath(path: string): PathItemObject
```

**Parameters:**

- `path` (string): The path name to retrieve

**Returns:**

- (PathItemObject): The path item object, or an empty object if the path doesn't exist

**Description:**

This method retrieves a specific path item from the paths object. If the path doesn't exist, an empty object is returned.

**Example:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();

api.appendPath('/users/{id}', {
  get: {
    summary: 'Get user by ID',
    operationId: 'getUserById',
    responses: {
      '200': { description: 'User found' },
      '404': { description: 'User not found' },
    },
  },
  delete: {
    summary: 'Delete user',
    operationId: 'deleteUser',
    responses: {
      '204': { description: 'User deleted' },
    },
  },
});

const pathItem = api.getPath('/users/{id}');
console.log(pathItem.get?.summary); // 'Get user by ID'
console.log(pathItem.delete?.summary); // 'Delete user'

// Non-existent path returns empty object
const nonExistent = api.getPath('/nonexistent');
console.log(nonExistent); // {}
```

---

### appendPath()

Appends a new path to the paths object.

**Signature:**

```typescript
appendPath(path: string, value: PathItemObject): void
```

**Parameters:**

- `path` (string): The path name (will be normalized to start with '/')
- `value` (PathItemObject): The path item object containing operations

**Returns:**

- (void)

**Description:**

This method adds a new path to the paths object. If the path doesn't start with '/', it will be automatically prepended. If the paths object doesn't exist, it will be created.

**Example:**

```typescript
import { Openapi } from '@laag/openapi';
import type { PathItemObject } from '@laag/openapi';

const api = new Openapi();

// Path is automatically normalized to start with '/'
api.appendPath('users', {
  get: {
    summary: 'Get all users',
    responses: { '200': { description: 'Success' } },
  },
});

console.log(api.getPathNames()); // ['/users']

// Add path with multiple operations
const userByIdPath: PathItemObject = {
  get: {
    summary: 'Get user by ID',
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: { type: 'string' },
      },
    ],
    responses: {
      '200': { description: 'User found' },
      '404': { description: 'User not found' },
    },
  },
  put: {
    summary: 'Update user',
    requestBody: {
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
      },
    },
    responses: {
      '200': { description: 'User updated' },
    },
  },
};

api.appendPath('/users/{id}', userByIdPath);

console.log(api.getPathNames()); // ['/users', '/users/{id}']
```

---

### pathExists()

Checks if a path exists in the document.

**Signature:**

```typescript
pathExists(path: string): boolean
```

**Parameters:**

- `path` (string): The path name to check

**Returns:**

- (boolean): True if the path exists, false otherwise

**Description:**

This method checks whether a specific path exists in the paths object.

**Example:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();

api.appendPath('/users', {
  get: { responses: { '200': { description: 'Success' } } },
});

console.log(api.pathExists('/users')); // true
console.log(api.pathExists('/products')); // false
console.log(api.pathExists('/orders')); // false
```

**See Also:**

- [operationExists()](#operationexists)
- [PathItemObject Type](#pathitemobject)

---

## Operation Methods

### operationExists()

Checks if an operation exists for a specific path and HTTP method.

**Signature:**

```typescript
operationExists(path: string, verb: string): boolean
```

**Parameters:**

- `path` (string): The path name
- `verb` (string): The HTTP method (case-insensitive)

**Returns:**

- (boolean): True if the operation exists, false otherwise

**Description:**

This method checks whether a specific operation (HTTP method) exists for a given path.

**Example:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();

api.appendPath('/users', {
  get: { responses: { '200': { description: 'Success' } } },
  post: { responses: { '201': { description: 'Created' } } },
});

console.log(api.operationExists('/users', 'get')); // true
console.log(api.operationExists('/users', 'GET')); // true (case-insensitive)
console.log(api.operationExists('/users', 'post')); // true
console.log(api.operationExists('/users', 'delete')); // false
console.log(api.operationExists('/products', 'get')); // false
```

---

### getOperationId()

Gets the operation ID for a specific path and HTTP method.

**Signature:**

```typescript
getOperationId(path: string, verb: string): string
```

**Parameters:**

- `path` (string): The path name
- `verb` (string): The HTTP method (case-insensitive)

**Returns:**

- (string): The operation ID if defined, or a generated ID based on the path and method

**Description:**

This method retrieves the operation ID for a specific operation. If the operation doesn't have an explicit operationId, it generates one from the path and method (e.g., 'getUserById' for GET /users/{userId}).

**Example:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();

// Operation with explicit operationId
api.appendPath('/users/{id}', {
  get: {
    operationId: 'getUserById',
    responses: { '200': { description: 'Success' } },
  },
});

console.log(api.getOperationId('/users/{id}', 'get')); // 'getUserById'

// Operation without explicit operationId (auto-generated)
api.appendPath('/products', {
  get: { responses: { '200': { description: 'Success' } } },
});

console.log(api.getOperationId('/products', 'get')); // 'getproducts'
```

---

### setOperationId()

Sets the operation ID for a specific path and HTTP method.

**Signature:**

```typescript
setOperationId(path: string, verb: string, value: string): string
```

**Parameters:**

- `path` (string): The path name
- `verb` (string): The HTTP method (case-insensitive)
- `value` (string): The operation ID to set

**Returns:**

- (string): The operation ID that was set, or empty string if the operation doesn't exist

**Description:**

This method sets the operation ID for a specific operation. If the operation doesn't exist, it returns an empty string.

**Example:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();

api.appendPath('/users', {
  get: { responses: { '200': { description: 'Success' } } },
});

// Set operation ID
const result = api.setOperationId('/users', 'get', 'listUsers');
console.log(result); // 'listUsers'

// Verify it was set
console.log(api.getOperationId('/users', 'get')); // 'listUsers'

// Trying to set on non-existent operation
const failed = api.setOperationId('/nonexistent', 'get', 'someId');
console.log(failed); // ''
```

---

### getOperationIds()

Gets all operation IDs in the document with their paths and methods.

**Signature:**

```typescript
getOperationIds(): Array<{ id: string; path: string; method: string }>
```

**Returns:**

- (Array): Array of objects containing:
  - `id` (string): The operation ID
  - `path` (string): The path name
  - `method` (string): The HTTP method

**Description:**

This method returns all operations in the document with their operation IDs, paths, and methods.

**Example:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();

api.appendPath('/users', {
  get: {
    operationId: 'listUsers',
    responses: { '200': { description: 'Success' } },
  },
  post: {
    operationId: 'createUser',
    responses: { '201': { description: 'Created' } },
  },
});

api.appendPath('/users/{id}', {
  get: {
    operationId: 'getUserById',
    responses: { '200': { description: 'Success' } },
  },
});

const operationIds = api.getOperationIds();
console.log(operationIds);
// [
//   { id: 'listUsers', path: '/users', method: 'get' },
//   { id: 'createUser', path: '/users', method: 'post' },
//   { id: 'getUserById', path: '/users/{id}', method: 'get' }
// ]
```

---

### getOperationDescription()

Gets the description for a specific operation.

**Signature:**

```typescript
getOperationDescription(path: string, verb: string): string
```

**Parameters:**

- `path` (string): The path name
- `verb` (string): The HTTP method (case-insensitive)

**Returns:**

- (string): The operation description, or empty string if not defined

**Description:**

This method retrieves the description field from a specific operation.

**Example:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();

api.appendPath('/users/{id}', {
  get: {
    summary: 'Get user by ID',
    description: 'Retrieves detailed information about a specific user by their unique identifier',
    responses: { '200': { description: 'Success' } },
  },
});

const description = api.getOperationDescription('/users/{id}', 'get');
console.log(description);
// 'Retrieves detailed information about a specific user by their unique identifier'
```

---

### getOperationData()

Gets the complete operation object for a specific path and HTTP method.

**Signature:**

```typescript
getOperationData(path: string, verb: string): OperationObject
```

**Parameters:**

- `path` (string): The path name
- `verb` (string): The HTTP method (case-insensitive)

**Returns:**

- (OperationObject): The complete operation object, or an empty object if the operation doesn't exist

**Description:**

This method retrieves the complete operation object, including all its properties (summary, description, parameters, requestBody, responses, etc.).

**Example:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();

api.appendPath('/users', {
  post: {
    summary: 'Create a new user',
    description: 'Creates a new user account',
    operationId: 'createUser',
    tags: ['users'],
    requestBody: {
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
      },
    },
    responses: {
      '201': { description: 'User created' },
      '400': { description: 'Invalid input' },
    },
  },
});

const operation = api.getOperationData('/users', 'post');
console.log(operation.summary); // 'Create a new user'
console.log(operation.operationId); // 'createUser'
console.log(operation.tags); // ['users']
console.log(operation.requestBody?.required); // true
```

---

### getOperationRequest()

Gets the request body object for a specific operation.

**Signature:**

```typescript
getOperationRequest(path: string, verb: string): RequestBodyObject
```

**Parameters:**

- `path` (string): The path name
- `verb` (string): The HTTP method (case-insensitive)

**Returns:**

- (RequestBodyObject): The request body object, or an empty object if not defined

**Description:**

This method retrieves the request body object for a specific operation.

**Example:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();

api.appendPath('/users', {
  post: {
    requestBody: {
      required: true,
      description: 'User data',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['name', 'email'],
            properties: {
              name: { type: 'string' },
              email: { type: 'string', format: 'email' },
            },
          },
        },
      },
    },
    responses: { '201': { description: 'Created' } },
  },
});

const requestBody = api.getOperationRequest('/users', 'post');
console.log(requestBody.required); // true
console.log(requestBody.description); // 'User data'
console.log(requestBody.content?.['application/json']); // { schema: {...} }
```

---

### getOperationResponse()

Gets a specific response object for an operation by status code.

**Signature:**

```typescript
getOperationResponse(path: string, verb: string, statusCode: string): ResponseObject
```

**Parameters:**

- `path` (string): The path name
- `verb` (string): The HTTP method (case-insensitive)
- `statusCode` (string): The HTTP status code (e.g., '200', '404')

**Returns:**

- (ResponseObject): The response object, or an empty object if not defined

**Description:**

This method retrieves a specific response object for an operation by its status code.

**Example:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();

api.appendPath('/users/{id}', {
  get: {
    responses: {
      '200': {
        description: 'User found',
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
      },
      '404': {
        description: 'User not found',
      },
    },
  },
});

const successResponse = api.getOperationResponse('/users/{id}', 'get', '200');
console.log(successResponse.description); // 'User found'

const notFoundResponse = api.getOperationResponse('/users/{id}', 'get', '404');
console.log(notFoundResponse.description); // 'User not found'
```

---

### getOperationRequestMedia()

Gets the media types (content types) for an operation's request body.

**Signature:**

```typescript
getOperationRequestMedia(path: string, verb: string): string[]
```

**Parameters:**

- `path` (string): The path name
- `verb` (string): The HTTP method (case-insensitive)

**Returns:**

- (string[]): Array of media type strings (e.g., ['application/json', 'application/xml'])

**Description:**

This method retrieves all media types defined in the request body's content object. It automatically resolves $ref references if the request body is a reference object.

**Example:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();

api.appendPath('/users', {
  post: {
    requestBody: {
      content: {
        'application/json': {
          schema: { type: 'object' },
        },
        'application/xml': {
          schema: { type: 'object' },
        },
      },
    },
    responses: { '201': { description: 'Created' } },
  },
});

const mediaTypes = api.getOperationRequestMedia('/users', 'post');
console.log(mediaTypes); // ['application/json', 'application/xml']
```

---

### getOperationResponseMedia()

Gets the media types (content types) for an operation's response.

**Signature:**

```typescript
getOperationResponseMedia(path: string, verb: string, code?: string): string[]
```

**Parameters:**

- `path` (string): The path name
- `verb` (string): The HTTP method (case-insensitive)
- `code` (string, optional): The HTTP status code. If not provided, uses the success code (2xx)

**Returns:**

- (string[]): Array of media type strings

**Description:**

This method retrieves all media types defined in a response's content object. If no status code is provided, it uses the first success code (2xx) found. It automatically resolves $ref references.

**Example:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();

api.appendPath('/users/{id}', {
  get: {
    responses: {
      '200': {
        description: 'Success',
        content: {
          'application/json': {
            schema: { type: 'object' },
          },
          'application/xml': {
            schema: { type: 'object' },
          },
        },
      },
    },
  },
});

// Get media types for success response
const mediaTypes = api.getOperationResponseMedia('/users/{id}', 'get');
console.log(mediaTypes); // ['application/json', 'application/xml']

// Get media types for specific status code
const successMedia = api.getOperationResponseMedia('/users/{id}', 'get', '200');
console.log(successMedia); // ['application/json', 'application/xml']
```

---

### isOperationDeprecated()

Checks if an operation is marked as deprecated.

**Signature:**

```typescript
isOperationDeprecated(path: string, verb: string): boolean
```

**Parameters:**

- `path` (string): The path name
- `verb` (string): The HTTP method (case-insensitive)

**Returns:**

- (boolean): True if the operation is deprecated, false otherwise

**Description:**

This method checks the deprecated flag on an operation.

**Example:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();

api.appendPath('/users', {
  get: {
    summary: 'Get users (deprecated)',
    deprecated: true,
    responses: { '200': { description: 'Success' } },
  },
});

api.appendPath('/v2/users', {
  get: {
    summary: 'Get users (current)',
    responses: { '200': { description: 'Success' } },
  },
});

console.log(api.isOperationDeprecated('/users', 'get')); // true
console.log(api.isOperationDeprecated('/v2/users', 'get')); // false
```

**See Also:**

- [OperationObject Type](#operationobject)
- [RequestBodyObject Type](#typescript-types)
- [ResponseObject Type](#typescript-types)

---

## Status Code and HTTP Method Operations

### getStatusCodes()

Gets all status codes defined for a specific operation.

**Signature:**

```typescript
getStatusCodes(path: string, verb: string): Array<{ code: string; description: string; media: string[] }>
```

**Parameters:**

- `path` (string): The path name
- `verb` (string): The HTTP method (case-insensitive)

**Returns:**

- (Array): Array of objects containing:
  - `code` (string): The HTTP status code
  - `description` (string): The response description
  - `media` (string[]): Array of media types for this response

**Description:**

This method retrieves all status codes defined in an operation's responses object, along with their descriptions and media types. The 'default' response is excluded. Results are sorted by status code.

**Example:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();

api.appendPath('/users/{id}', {
  get: {
    responses: {
      '200': {
        description: 'User found',
        content: {
          'application/json': { schema: { type: 'object' } },
        },
      },
      '404': {
        description: 'User not found',
        content: {
          'application/json': { schema: { type: 'object' } },
        },
      },
      '500': {
        description: 'Internal server error',
      },
    },
  },
});

const statusCodes = api.getStatusCodes('/users/{id}', 'get');
console.log(statusCodes);
// [
//   { code: '200', description: 'User found', media: ['application/json'] },
//   { code: '404', description: 'User not found', media: ['application/json'] },
//   { code: '500', description: 'Internal server error', media: [] }
// ]
```

---

### getAllStatusCodes()

Gets all unique status codes used across all operations in the document.

**Signature:**

```typescript
getAllStatusCodes(): string[]
```

**Returns:**

- (string[]): Array of unique status code strings

**Description:**

This method scans all operations in the document and returns a list of all unique status codes used.

**Example:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();

api.appendPath('/users', {
  get: {
    responses: {
      '200': { description: 'Success' },
      '500': { description: 'Error' },
    },
  },
  post: {
    responses: {
      '201': { description: 'Created' },
      '400': { description: 'Bad request' },
      '500': { description: 'Error' },
    },
  },
});

api.appendPath('/products', {
  get: {
    responses: {
      '200': { description: 'Success' },
      '404': { description: 'Not found' },
    },
  },
});

const allCodes = api.getAllStatusCodes();
console.log(allCodes); // ['200', '201', '400', '404', '500']
```

---

### getSuccessCode()

Gets the first success status code (2xx) for a specific operation.

**Signature:**

```typescript
getSuccessCode(path: string, verb: string): string
```

**Parameters:**

- `path` (string): The path name
- `verb` (string): The HTTP method (case-insensitive)

**Returns:**

- (string): The first success status code (200-299), or empty string if none found

**Description:**

This method finds and returns the first status code in the 2xx range for an operation. This is useful for identifying the primary success response.

**Example:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();

api.appendPath('/users', {
  get: {
    responses: {
      '200': { description: 'Success' },
      '404': { description: 'Not found' },
    },
  },
  post: {
    responses: {
      '201': { description: 'Created' },
      '400': { description: 'Bad request' },
    },
  },
});

console.log(api.getSuccessCode('/users', 'get')); // '200'
console.log(api.getSuccessCode('/users', 'post')); // '201'
```

---

### getAllHttpMethods()

Gets all HTTP methods used across all paths in the document.

**Signature:**

```typescript
getAllHttpMethods(): HttpMethod[]
```

**Returns:**

- (HttpMethod[]): Array of HTTP method strings (e.g., ['get', 'post', 'put'])

**Description:**

This method scans all paths in the document and returns a list of all unique HTTP methods that are actually used.

**Example:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();

api.appendPath('/users', {
  get: { responses: { '200': { description: 'Success' } } },
  post: { responses: { '201': { description: 'Created' } } },
});

api.appendPath('/users/{id}', {
  get: { responses: { '200': { description: 'Success' } } },
  put: { responses: { '200': { description: 'Updated' } } },
  delete: { responses: { '204': { description: 'Deleted' } } },
});

const methods = api.getAllHttpMethods();
console.log(methods); // ['get', 'post', 'put', 'delete']
```

**See Also:**

- [HttpMethod Type](#typescript-types)
- [getStatusCodes()](#getstatuscodes)

---

## Component Operations

### components

Gets or sets the components object.

**Type:** ComponentsObject (getter/setter)

**Signature:**

```typescript
get components(): ComponentsObject
set components(value: ComponentsObject)
```

**Description:**

The components property provides access to the components object, which holds reusable objects for different aspects of the OpenAPI specification (schemas, responses, parameters, etc.).

**Example:**

```typescript
import { Openapi } from '@laag/openapi';
import type { ComponentsObject } from '@laag/openapi';

const api = new Openapi();

// Set components object
const componentsData: ComponentsObject = {
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
    Error: {
      type: 'object',
      required: ['code', 'message'],
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
      },
    },
  },
  responses: {
    NotFound: {
      description: 'Resource not found',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/Error' },
        },
      },
    },
  },
};

api.components = componentsData;

// Get components object
const components = api.components;
console.log(Object.keys(components.schemas || {})); // ['User', 'Error']
console.log(Object.keys(components.responses || {})); // ['NotFound']
```

---

### componentsSchemas

Gets the schemas from the components object.

**Type:** Record<string, SchemaObject | ReferenceObject> (getter only)

**Signature:**

```typescript
get componentsSchemas(): Record<string, SchemaObject | ReferenceObject>
```

**Description:**

The componentsSchemas property provides read-only access to the schemas defined in the components object. This is a convenience property for accessing the most commonly used component type.

**Example:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();

api.components = {
  schemas: {
    User: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
      },
    },
    Product: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        title: { type: 'string' },
        price: { type: 'number' },
      },
    },
  },
};

const schemas = api.componentsSchemas;
console.log(Object.keys(schemas)); // ['User', 'Product']
console.log(schemas.User.type); // 'object'
console.log(schemas.Product.properties?.price); // { type: 'number' }
```

---

### getComponentFromPath()

Resolves a component reference path and returns the component.

**Signature:**

```typescript
getComponentFromPath(refPath: string): unknown
```

**Parameters:**

- `refPath` (string): The reference path (e.g., '#/components/schemas/User')

**Returns:**

- (unknown): The resolved component object, or an empty object if not found

**Description:**

This method resolves a $ref path and returns the referenced component. It navigates through the document structure following the path segments. If the component is not found, it returns an empty object.

**Example:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();

api.components = {
  schemas: {
    User: {
      type: 'object',
      required: ['id', 'name'],
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        email: { type: 'string' },
      },
    },
    Address: {
      type: 'object',
      properties: {
        street: { type: 'string' },
        city: { type: 'string' },
        country: { type: 'string' },
      },
    },
  },
  responses: {
    UserResponse: {
      description: 'User object',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/User' },
        },
      },
    },
  },
};

// Resolve schema reference
const userSchema = api.getComponentFromPath('#/components/schemas/User');
console.log(userSchema);
// {
//   type: 'object',
//   required: ['id', 'name'],
//   properties: { ... }
// }

// Resolve response reference
const userResponse = api.getComponentFromPath('#/components/responses/UserResponse');
console.log(userResponse);
// {
//   description: 'User object',
//   content: { ... }
// }

// Non-existent reference returns empty object
const notFound = api.getComponentFromPath('#/components/schemas/NonExistent');
console.log(notFound); // {}
```

**Example with nested references:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();

api.appendPath('/users/{id}', {
  get: {
    responses: {
      '200': {
        description: 'Success',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/User' },
          },
        },
      },
    },
  },
});

api.components = {
  schemas: {
    User: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        address: { $ref: '#/components/schemas/Address' },
      },
    },
    Address: {
      type: 'object',
      properties: {
        street: { type: 'string' },
        city: { type: 'string' },
      },
    },
  },
};

// Resolve the User schema
const userSchema = api.getComponentFromPath('#/components/schemas/User');
console.log(userSchema);

// The address property contains a reference that can be resolved separately
const addressRef = (userSchema as any).properties.address.$ref;
const addressSchema = api.getComponentFromPath(addressRef);
console.log(addressSchema);
// {
//   type: 'object',
//   properties: {
//     street: { type: 'string' },
//     city: { type: 'string' }
//   }
// }
```

**See Also:**

- [ComponentsObject Type](#componentsobject)
- [SchemaObject Type](#schemaobject)
- [ReferenceObject Type](#typescript-types)

---

## Validation Methods

### validate()

Validates the OpenAPI document structure according to the OpenAPI 3.0 specification.

**Signature:**

```typescript
validate(): ValidationResult
```

**Returns:**

- (ValidationResult): A validation result object containing:
  - `valid` (boolean): Whether the document is valid
  - `errors` (Array): Array of validation error objects

**Description:**

This method performs structural validation of the OpenAPI document. It checks for:

- Required root-level fields (openapi, info, paths)
- Required info object fields (title, version)
- Basic structure compliance

The validation is focused on required fields and basic structure. It does not perform deep semantic validation of all OpenAPI specification rules.

**ValidationResult Type:**

```typescript
interface ValidationResult {
  valid: boolean;
  errors: Array<{
    path: string; // Path to the invalid field (e.g., 'info.title')
    message: string; // Description of the error
    code: string; // Error code (e.g., 'REQUIRED_FIELD_MISSING')
  }>;
}
```

**Example 1: Valid document**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi({
  openapi: '3.0.2',
  info: {
    title: 'My API',
    version: '1.0.0',
  },
  paths: {
    '/users': {
      get: {
        responses: {
          '200': { description: 'Success' },
        },
      },
    },
  },
});

const result = api.validate();
console.log(result.valid); // true
console.log(result.errors); // []
```

**Example 2: Invalid document - missing required fields**

```typescript
import { Openapi } from '@laag/openapi';

// Create document with missing required fields
const api = new Openapi();
api.doc.openapi = undefined as any;
api.doc.info = undefined as any;

const result = api.validate();
console.log(result.valid); // false
console.log(result.errors);
// [
//   {
//     path: 'openapi',
//     message: 'OpenAPI version is required',
//     code: 'REQUIRED_FIELD_MISSING'
//   },
//   {
//     path: 'info',
//     message: 'Info object is required',
//     code: 'REQUIRED_FIELD_MISSING'
//   }
// ]
```

**Example 3: Invalid document - missing info fields**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi({
  openapi: '3.0.2',
  info: {} as any, // Missing required title and version
  paths: {},
});

const result = api.validate();
console.log(result.valid); // false
console.log(result.errors);
// [
//   {
//     path: 'info.title',
//     message: 'Info title is required',
//     code: 'REQUIRED_FIELD_MISSING'
//   },
//   {
//     path: 'info.version',
//     message: 'Info version is required',
//     code: 'REQUIRED_FIELD_MISSING'
//   }
// ]
```

**Example 4: Iterating through validation errors**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi({
  openapi: '3.0.2',
  info: { title: 'API' } as any, // Missing version
  paths: {},
});

const result = api.validate();

if (!result.valid) {
  console.log('Validation failed with the following errors:');
  for (const error of result.errors) {
    console.log(`  [${error.code}] ${error.path}: ${error.message}`);
  }
}
// Output:
// Validation failed with the following errors:
//   [REQUIRED_FIELD_MISSING] info.version: Info version is required
```

**Example 5: Using validation in a workflow**

```typescript
import { Openapi } from '@laag/openapi';
import { ValidationError } from '@laag/core';

function processOpenAPIDocument(docString: string) {
  try {
    const api = new Openapi(docString);

    // Validate the document
    const validation = api.validate();

    if (!validation.valid) {
      const errorMessages = validation.errors.map(e => `${e.path}: ${e.message}`).join(', ');
      throw new ValidationError(`Invalid OpenAPI document: ${errorMessages}`);
    }

    // Document is valid, proceed with processing
    console.log(`Processing API: ${api.title}`);
    console.log(`Paths: ${api.getPathNames().join(', ')}`);

    return api;
  } catch (error) {
    console.error('Error processing document:', error);
    throw error;
  }
}

// Usage
const validDoc = JSON.stringify({
  openapi: '3.0.2',
  info: { title: 'Test API', version: '1.0.0' },
  paths: {},
});

const api = processOpenAPIDocument(validDoc);
```

**Common Validation Errors:**

| Error Code             | Path         | Description                          |
| ---------------------- | ------------ | ------------------------------------ |
| REQUIRED_FIELD_MISSING | openapi      | The OpenAPI version field is missing |
| REQUIRED_FIELD_MISSING | info         | The info object is missing           |
| REQUIRED_FIELD_MISSING | info.title   | The info title field is missing      |
| REQUIRED_FIELD_MISSING | info.version | The info version field is missing    |
| REQUIRED_FIELD_MISSING | paths        | The paths object is missing          |

**See Also:**

- [ValidationResult Type](#typescript-types)
- [ValidationError Class](./API_REFERENCE_CORE.md#validationerror)

---

## Sample Generation

### generateJsonSample()

Generates sample JSON payload from either request or response schema.

**Signature:**

```typescript
generateJsonSample(path: string, verb: string, type?: 'request' | 'response'): unknown
```

**Parameters:**

- `path` (string): The path name
- `verb` (string): The HTTP method (case-insensitive)
- `type` ('request' | 'response', optional): Whether to generate from request or response schema. Default: 'request'

**Returns:**

- (unknown): Generated sample JSON object, or null if no schema found

**Description:**

This method generates sample JSON data from the schema defined in either the request body or response body of an operation. It intelligently handles:

- Schema references ($ref)
- Schema composition (allOf, oneOf, anyOf)
- Nested objects and arrays
- Schema examples
- Type-specific defaults
- Format-specific values (date, email, uuid, etc.)

The generated samples are useful for:

- API documentation
- Testing
- Client code generation
- Understanding expected data structures

**Example 1: Generate request sample**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();

api.appendPath('/users', {
  post: {
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['name', 'email'],
            properties: {
              name: { type: 'string' },
              email: { type: 'string', format: 'email' },
              age: { type: 'integer' },
              active: { type: 'boolean' },
            },
          },
        },
      },
    },
    responses: {
      '201': { description: 'Created' },
    },
  },
});

const requestSample = api.generateJsonSample('/users', 'post', 'request');
console.log(requestSample);
// {
//   name: 'string',
//   email: 'user@example.com',
//   age: 0,
//   active: false
// }
```

**Example 2: Generate response sample**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();

api.appendPath('/users/{id}', {
  get: {
    responses: {
      '200': {
        description: 'User found',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                id: { type: 'string', format: 'uuid' },
                name: { type: 'string' },
                email: { type: 'string', format: 'email' },
                createdAt: { type: 'string', format: 'date-time' },
              },
            },
          },
        },
      },
    },
  },
});

const responseSample = api.generateJsonSample('/users/{id}', 'get', 'response');
console.log(responseSample);
// {
//   id: '123e4567-e89b-12d3-a456-426614174000',
//   name: 'string',
//   email: 'user@example.com',
//   createdAt: '2023-01-01T00:00:00Z'
// }
```

**Example 3: Schema with arrays**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();

api.appendPath('/users', {
  get: {
    responses: {
      '200': {
        description: 'List of users',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                users: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      name: { type: 'string' },
                    },
                  },
                },
                total: { type: 'integer' },
              },
            },
          },
        },
      },
    },
  },
});

const sample = api.generateJsonSample('/users', 'get', 'response');
console.log(sample);
// {
//   users: [
//     {
//       id: 'string',
//       name: 'string'
//     }
//   ],
//   total: 0
// }
```

**Example 4: Schema with component references**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();

api.components = {
  schemas: {
    User: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        email: { type: 'string', format: 'email' },
      },
    },
  },
};

api.appendPath('/users', {
  post: {
    requestBody: {
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/User' },
        },
      },
    },
    responses: {
      '201': { description: 'Created' },
    },
  },
});

const sample = api.generateJsonSample('/users', 'post', 'request');
console.log(sample);
// {
//   id: 'string',
//   name: 'string',
//   email: 'user@example.com'
// }
```

**Example 5: Schema with enums**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();

api.appendPath('/orders', {
  post: {
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              status: {
                type: 'string',
                enum: ['pending', 'processing', 'completed', 'cancelled'],
              },
              priority: {
                type: 'integer',
                enum: [1, 2, 3, 4, 5],
              },
            },
          },
        },
      },
    },
    responses: {
      '201': { description: 'Created' },
    },
  },
});

const sample = api.generateJsonSample('/orders', 'post', 'request');
console.log(sample);
// {
//   status: 'pending',  // First enum value
//   priority: 1         // First enum value
// }
```

**Example 6: Schema with allOf composition**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();

api.components = {
  schemas: {
    BaseEntity: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        createdAt: { type: 'string', format: 'date-time' },
      },
    },
    User: {
      allOf: [
        { $ref: '#/components/schemas/BaseEntity' },
        {
          type: 'object',
          properties: {
            name: { type: 'string' },
            email: { type: 'string' },
          },
        },
      ],
    },
  },
};

api.appendPath('/users', {
  get: {
    responses: {
      '200': {
        description: 'Success',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/User' },
          },
        },
      },
    },
  },
});

const sample = api.generateJsonSample('/users', 'get', 'response');
console.log(sample);
// {
//   id: 'string',
//   createdAt: '2023-01-01T00:00:00Z',
//   name: 'string',
//   email: 'string'
// }
```

**Example 7: Schema with explicit examples**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();

api.appendPath('/products', {
  post: {
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                example: 'Laptop Computer',
              },
              price: {
                type: 'number',
                example: 999.99,
              },
            },
          },
        },
      },
    },
    responses: {
      '201': { description: 'Created' },
    },
  },
});

const sample = api.generateJsonSample('/products', 'post', 'request');
console.log(sample);
// {
//   name: 'Laptop Computer',  // Uses explicit example
//   price: 999.99             // Uses explicit example
// }
```

**Format-Specific Generated Values:**

| Format    | Generated Value                        |
| --------- | -------------------------------------- |
| date      | '2023-01-01'                           |
| date-time | '2023-01-01T00:00:00Z'                 |
| email     | 'user@example.com'                     |
| uri       | 'https://example.com'                  |
| uuid      | '123e4567-e89b-12d3-a456-426614174000' |

**Type-Specific Default Values:**

| Type    | Default Value |
| ------- | ------------- |
| string  | 'string'      |
| integer | 0             |
| number  | 0.0           |
| boolean | false         |
| array   | [single item] |
| object  | {properties}  |

**See Also:**

- [SchemaObject Type](#schemaobject)
- [Code Generation Methods](#code-generation)

---

## Code Generation

### getCurlCommands()

Generates curl command examples for an operation.

**Signature:**

```typescript
getCurlCommands(path: string, verb: string): Array<{ command: string; description: string }>
```

**Parameters:**

- `path` (string): The path name
- `verb` (string): The HTTP method (case-insensitive)

**Returns:**

- (Array): Array of objects containing:
  - `command` (string): The curl command
  - `description` (string): Server description

**Description:**

This method generates curl command examples for testing an API operation. It creates one command for each server defined in the document, including appropriate headers and request body placeholders.

**Example:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();

api.servers = [
  { url: 'https://api.example.com', description: 'Production' },
  { url: 'https://staging.example.com', description: 'Staging' },
];

api.appendPath('/users', {
  post: {
    requestBody: {
      content: {
        'application/json': {
          schema: { type: 'object' },
        },
      },
    },
    responses: {
      '201': { description: 'Created' },
    },
  },
});

const curlCommands = api.getCurlCommands('/users', 'post');
console.log(curlCommands);
// [
//   {
//     command: 'curl -i -X POST "https://api.example.com/users" -H "Authorization: <auth-token>" -H "Content-Type: application/json" -d \'<request-payload>\'',
//     description: 'Production'
//   },
//   {
//     command: 'curl -i -X POST "https://staging.example.com/users" -H "Authorization: <auth-token>" -H "Content-Type: application/json" -d \'<request-payload>\'',
//     description: 'Staging'
//   }
// ]
```

---

### getPythonCode()

Generates Python code sample for an operation using the requests library.

**Signature:**

```typescript
getPythonCode(path: string, verb: string): string
```

**Parameters:**

- `path` (string): The path name
- `verb` (string): The HTTP method (case-insensitive)

**Returns:**

- (string): Python code as a string

**Description:**

This method generates a complete Python code example using the popular `requests` library. The generated code includes:

- Import statements
- Server URL configuration
- Request parameters and headers setup
- Request body (if applicable)
- Response handling

**Example:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();

api.servers = [{ url: 'https://api.example.com', description: 'Production server' }];

api.appendPath('/users', {
  post: {
    requestBody: {
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
      },
    },
    responses: {
      '201': {
        description: 'Created',
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
      },
    },
  },
});

const pythonCode = api.getPythonCode('/users', 'post');
console.log(pythonCode);
```

**Output:**

```python
import requests
import json

# Endpoint for 'Production server'
URL = 'https://api.example.com/users'

# Add query params here
params = {}

# Add headers here
headers = {}

# Add request body here (see example below)
data = {
  "name": "string",
  "email": "string"
}

response = requests.post(url=URL, params=params, headers=headers, json=data)

# Parse JSON response
if response.headers.get("content-type", "").startswith("application/json"):
    data = response.json()
else:
    data = response.text

status_code = response.status_code
print(f"Status: {status_code}")
```

---

### getJavaScriptCode()

Generates JavaScript code sample for an operation using the Fetch API.

**Signature:**

```typescript
getJavaScriptCode(path: string, verb: string, useAsync?: boolean): string
```

**Parameters:**

- `path` (string): The path name
- `verb` (string): The HTTP method (case-insensitive)
- `useAsync` (boolean, optional): Whether to use async/await (true) or promises (false). Default: true

**Returns:**

- (string): JavaScript code as a string

**Description:**

This method generates a complete JavaScript code example using the Fetch API. The generated code includes:

- Function definition (async or promise-based)
- URL configuration
- Request configuration with headers
- Request body (if applicable)
- Error handling
- Usage example

**Example with async/await:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();

api.servers = [{ url: 'https://api.example.com' }];

api.appendPath('/users/{id}', {
  get: {
    responses: {
      '200': {
        description: 'Success',
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
      },
    },
  },
});

const jsCode = api.getJavaScriptCode('/users/{id}', 'get', true);
console.log(jsCode);
```

**Output:**

```javascript
async function makeRequest() {
  const url = 'https://api.example.com/users/{id}';

  const config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer <your-token>',
    },
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Success:', data);
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Call the function
makeRequest();
```

**Example with promises:**

```typescript
const jsCode = api.getJavaScriptCode('/users/{id}', 'get', false);
console.log(jsCode);
```

**Output:**

```javascript
function makeRequest() {
  const url = 'https://api.example.com/users/{id}';

  const config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer <your-token>',
    },
  };

  return fetch(url, config)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      return data;
    })
    .catch(error => {
      console.error('Error:', error);
      throw error;
    });
}

// Call the function
makeRequest()
  .then(result => console.log(result))
  .catch(error => console.error(error));
```

---

### getTypeScriptCode()

Generates TypeScript code sample for an operation with full type definitions.

**Signature:**

```typescript
getTypeScriptCode(path: string, verb: string): string
```

**Parameters:**

- `path` (string): The path name
- `verb` (string): The HTTP method (case-insensitive)

**Returns:**

- (string): TypeScript code as a string

**Description:**

This method generates a complete TypeScript code example with:

- Interface definitions for request and response bodies
- Typed function with proper parameter and return types
- URL configuration
- Request configuration with typed RequestInit
- Error handling
- Usage example

**Example:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();

api.servers = [{ url: 'https://api.example.com' }];

api.appendPath('/users', {
  post: {
    operationId: 'createUser',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              email: { type: 'string' },
              age: { type: 'number' },
            },
          },
        },
      },
    },
    responses: {
      '201': {
        description: 'Created',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                email: { type: 'string' },
                createdAt: { type: 'string' },
              },
            },
          },
        },
      },
    },
  },
});

const tsCode = api.getTypeScriptCode('/users', 'post');
console.log(tsCode);
```

**Output:**

```typescript
interface RequestBody {
  name: string;
  email: string;
  age: number;
}

interface ResponseBody {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

async function createUser(requestBody: RequestBody): Promise<ResponseBody> {
  const url = 'https://api.example.com/users';

  const config: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer <your-token>',
    },
    body: JSON.stringify(requestBody),
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ResponseBody = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Usage example:
const requestData: RequestBody = {
  name: 'string',
  email: 'string',
  age: 0,
};
createUser(requestData)
  .then(result => console.log(result))
  .catch(error => console.error(error));
```

**See Also:**

- [generateJsonSample()](#generatejsonsample)
- [Sample Generation](#sample-generation)

---

## Extension Properties

Extension properties (also known as vendor extensions or specification extensions) allow you to add custom properties to your OpenAPI document. These properties must start with `x-` and can be added at various levels of the document.

### rootExtensions

Gets or sets extension properties at the root level of the document.

**Type:** Record<string, unknown> (getter/setter)

**Signature:**

```typescript
get rootExtensions(): Record<string, unknown>
set rootExtensions(values: Record<string, unknown>)
```

**Description:**

The rootExtensions property provides access to all extension properties (x-\*) defined at the root level of the OpenAPI document.

**Example:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();

// Set root extensions
api.rootExtensions = {
  'x-api-id': 'api-12345',
  'x-internal-version': '2.1.0',
  'x-team': 'platform-team',
};

// Get root extensions
const extensions = api.rootExtensions;
console.log(extensions['x-api-id']); // 'api-12345'
console.log(extensions['x-team']); // 'platform-team'
```

---

### infoExtensions

Gets or sets extension properties at the info level.

**Type:** Record<string, unknown> (getter/setter)

**Signature:**

```typescript
get infoExtensions(): Record<string, unknown>
set infoExtensions(values: Record<string, unknown>)
```

**Description:**

The infoExtensions property provides access to all extension properties (x-\*) defined in the info object.

**Example:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();

// Set info extensions
api.infoExtensions = {
  'x-audience': 'external',
  'x-api-category': 'data-services',
  'x-support-tier': 'premium',
};

// Get info extensions
const extensions = api.infoExtensions;
console.log(extensions['x-audience']); // 'external'
console.log(extensions['x-api-category']); // 'data-services'
```

---

### pathsExtensions

Gets or sets extension properties at the paths level.

**Type:** Record<string, unknown> (getter/setter)

**Signature:**

```typescript
get pathsExtensions(): Record<string, unknown>
set pathsExtensions(values: Record<string, unknown>)
```

**Description:**

The pathsExtensions property provides access to all extension properties (x-\*) defined in the paths object.

**Example:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();

// Set paths extensions
api.pathsExtensions = {
  'x-path-version': 'v2',
  'x-rate-limit-group': 'standard',
};

// Get paths extensions
const extensions = api.pathsExtensions;
console.log(extensions['x-path-version']); // 'v2'
console.log(extensions['x-rate-limit-group']); // 'standard'
```

---

### appendRootExtension()

Appends a single extension property at the root level.

**Signature:**

```typescript
appendRootExtension(name: string, value: unknown): void
```

**Parameters:**

- `name` (string): The extension property name (must start with 'x-')
- `value` (unknown): The extension property value

**Returns:**

- (void)

**Description:**

This method adds a single extension property to the root level of the document. The name must start with 'x-', otherwise the property will not be added.

**Example:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();

// Append individual root extensions
api.appendRootExtension('x-api-id', 'api-12345');
api.appendRootExtension('x-environment', 'production');
api.appendRootExtension('x-metadata', {
  owner: 'platform-team',
  created: '2023-01-01',
  tags: ['public', 'rest'],
});

// Invalid extension name (doesn't start with 'x-') - will be ignored
api.appendRootExtension('custom-field', 'value'); // Not added

const extensions = api.rootExtensions;
console.log(extensions['x-api-id']); // 'api-12345'
console.log(extensions['x-metadata']); // { owner: 'platform-team', ... }
console.log(extensions['custom-field']); // undefined
```

---

### appendInfoExtension()

Appends a single extension property at the info level.

**Signature:**

```typescript
appendInfoExtension(name: string, value: unknown): void
```

**Parameters:**

- `name` (string): The extension property name (must start with 'x-')
- `value` (unknown): The extension property value

**Returns:**

- (void)

**Description:**

This method adds a single extension property to the info object. The name must start with 'x-', otherwise the property will not be added.

**Example:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();

// Append individual info extensions
api.appendInfoExtension('x-audience', 'external');
api.appendInfoExtension('x-stability', 'stable');
api.appendInfoExtension('x-changelog-url', 'https://example.com/changelog');

const extensions = api.infoExtensions;
console.log(extensions['x-audience']); // 'external'
console.log(extensions['x-stability']); // 'stable'
```

---

### appendPathsExtension()

Appends a single extension property at the paths level.

**Signature:**

```typescript
appendPathsExtension(name: string, value: unknown): void
```

**Parameters:**

- `name` (string): The extension property name (must start with 'x-')
- `value` (unknown): The extension property value

**Returns:**

- (void)

**Description:**

This method adds a single extension property to the paths object. The name must start with 'x-', otherwise the property will not be added.

**Example:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();

// Append individual paths extensions
api.appendPathsExtension('x-base-path', '/api/v2');
api.appendPathsExtension('x-rate-limit', {
  requests: 1000,
  period: 'hour',
});

const extensions = api.pathsExtensions;
console.log(extensions['x-base-path']); // '/api/v2'
console.log(extensions['x-rate-limit']); // { requests: 1000, period: 'hour' }
```

---

**Complete Extension Example:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi({
  openapi: '3.0.2',
  info: {
    title: 'E-Commerce API',
    version: '1.0.0',
  },
  paths: {},
});

// Add root-level extensions
api.appendRootExtension('x-api-id', 'ecommerce-api-v1');
api.appendRootExtension('x-organization', 'ACME Corp');
api.appendRootExtension('x-internal-metadata', {
  team: 'platform',
  repository: 'https://github.com/acme/ecommerce-api',
  slack: '#api-support',
});

// Add info-level extensions
api.appendInfoExtension('x-audience', 'external');
api.appendInfoExtension('x-api-category', 'commerce');
api.appendInfoExtension('x-sla', {
  uptime: '99.9%',
  responseTime: '200ms',
});

// Add paths-level extensions
api.appendPathsExtension('x-rate-limit-tier', 'standard');
api.appendPathsExtension('x-versioning-strategy', 'url-based');

// Retrieve all extensions
console.log('Root Extensions:', api.rootExtensions);
console.log('Info Extensions:', api.infoExtensions);
console.log('Paths Extensions:', api.pathsExtensions);

// Export document with extensions
const doc = api.getDefinition('prettyjson');
console.log(doc);
```

**Output:**

```json
{
  "openapi": "3.0.2",
  "info": {
    "title": "E-Commerce API",
    "version": "1.0.0",
    "x-audience": "external",
    "x-api-category": "commerce",
    "x-sla": {
      "uptime": "99.9%",
      "responseTime": "200ms"
    }
  },
  "paths": {
    "x-rate-limit-tier": "standard",
    "x-versioning-strategy": "url-based"
  },
  "x-api-id": "ecommerce-api-v1",
  "x-organization": "ACME Corp",
  "x-internal-metadata": {
    "team": "platform",
    "repository": "https://github.com/acme/ecommerce-api",
    "slack": "#api-support"
  }
}
```

**Common Use Cases for Extensions:**

- **API Management**: `x-api-id`, `x-gateway-config`, `x-rate-limit`
- **Documentation**: `x-code-samples`, `x-examples`, `x-changelog-url`
- **Internal Metadata**: `x-team`, `x-owner`, `x-repository`
- **Tooling**: `x-codegen-settings`, `x-mock-responses`
- **Business Logic**: `x-audience`, `x-stability`, `x-deprecation-date`

**See Also:**

- [ExtensionObject Type](#typescript-types)
- [OpenAPI Specification Extensions](https://spec.openapis.org/oas/v3.0.3#specification-extensions)

---

## TypeScript Types

The `@laag/openapi` package exports comprehensive TypeScript type definitions for all OpenAPI 3.0 specification objects. These types provide full type safety when working with OpenAPI documents.

### OpenAPIDocument

The root document object of the OpenAPI document.

**Type Definition:**

```typescript
interface OpenAPIDocument extends BaseDocument {
  openapi: string; // REQUIRED. OpenAPI Specification version
  info: InfoObject; // REQUIRED. API metadata
  paths: PathsObject; // REQUIRED. Available paths and operations
  servers?: ServerObject[]; // Server connectivity information
  components?: ComponentsObject; // Reusable components
  security?: SecurityRequirementObject[]; // Security requirements
  tags?: TagObject[]; // Tags with metadata
  externalDocs?: ExternalDocumentationObject; // External documentation
}
```

**Properties:**

- `openapi` (string, required): The semantic version number of the OpenAPI Specification (e.g., "3.0.2")
- `info` (InfoObject, required): Provides metadata about the API
- `paths` (PathsObject, required): The available paths and operations for the API
- `servers` (ServerObject[], optional): An array of Server Objects providing connectivity information
- `components` (ComponentsObject, optional): Reusable components for the specification
- `security` (SecurityRequirementObject[], optional): Security mechanisms that can be used across the API
- `tags` (TagObject[], optional): A list of tags with additional metadata
- `externalDocs` (ExternalDocumentationObject, optional): Additional external documentation

**Usage:**

```typescript
import type { OpenAPIDocument } from '@laag/openapi';

const document: OpenAPIDocument = {
  openapi: '3.0.2',
  info: {
    title: 'My API',
    version: '1.0.0',
  },
  paths: {
    '/users': {
      get: {
        responses: {
          '200': { description: 'Success' },
        },
      },
    },
  },
};
```

---

### InfoObject

Provides metadata about the API.

**Type Definition:**

```typescript
interface InfoObject extends ExtensionObject {
  title: string; // REQUIRED. API title
  version: string; // REQUIRED. API version
  description?: string; // API description
  termsOfService?: string; // Terms of Service URL
  contact?: ContactObject; // Contact information
  license?: LicenseObject; // License information
}
```

**Properties:**

- `title` (string, required): The title of the API
- `version` (string, required): The version of the OpenAPI document (not the API version)
- `description` (string, optional): A short description of the API (CommonMark syntax supported)
- `termsOfService` (string, optional): A URL to the Terms of Service for the API
- `contact` (ContactObject, optional): Contact information for the exposed API
- `license` (LicenseObject, optional): License information for the exposed API

**Usage:**

```typescript
import type { InfoObject } from '@laag/openapi';

const info: InfoObject = {
  title: 'User Management API',
  version: '1.0.0',
  description: 'API for managing user accounts and profiles',
  termsOfService: 'https://example.com/terms',
  contact: {
    name: 'API Support',
    email: 'support@example.com',
    url: 'https://example.com/support',
  },
  license: {
    name: 'Apache 2.0',
    url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
  },
};
```

---

### PathItemObject

Describes the operations available on a single path.

**Type Definition:**

```typescript
interface PathItemObject extends ExtensionObject {
  $ref?: string; // External definition reference
  summary?: string; // Summary for all operations
  description?: string; // Description for all operations
  get?: OperationObject; // GET operation
  put?: OperationObject; // PUT operation
  post?: OperationObject; // POST operation
  delete?: OperationObject; // DELETE operation
  options?: OperationObject; // OPTIONS operation
  head?: OperationObject; // HEAD operation
  patch?: OperationObject; // PATCH operation
  trace?: OperationObject; // TRACE operation
  servers?: ServerObject[]; // Alternative servers
  parameters?: (ParameterObject | ReferenceObject)[]; // Common parameters
}
```

**Properties:**

- `$ref` (string, optional): Allows for an external definition of this path item
- `summary` (string, optional): Summary intended to apply to all operations in this path
- `description` (string, optional): Description intended to apply to all operations in this path
- `get`, `put`, `post`, `delete`, `options`, `head`, `patch`, `trace` (OperationObject, optional): Operation definitions
- `servers` (ServerObject[], optional): Alternative server array to service all operations in this path
- `parameters` (Array, optional): Parameters applicable for all operations in this path

**Usage:**

```typescript
import type { PathItemObject } from '@laag/openapi';

const userPath: PathItemObject = {
  summary: 'User operations',
  parameters: [
    {
      name: 'id',
      in: 'path',
      required: true,
      schema: { type: 'string' },
    },
  ],
  get: {
    summary: 'Get user by ID',
    responses: {
      '200': { description: 'User found' },
      '404': { description: 'User not found' },
    },
  },
  put: {
    summary: 'Update user',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: { type: 'object' },
        },
      },
    },
    responses: {
      '200': { description: 'User updated' },
    },
  },
  delete: {
    summary: 'Delete user',
    responses: {
      '204': { description: 'User deleted' },
    },
  },
};
```

---

### OperationObject

Describes a single API operation on a path.

**Type Definition:**

```typescript
interface OperationObject extends ExtensionObject {
  tags?: string[]; // Tags for documentation control
  summary?: string; // Short summary
  description?: string; // Verbose explanation
  externalDocs?: ExternalDocumentationObject; // External documentation
  operationId?: string; // Unique operation identifier
  parameters?: (ParameterObject | ReferenceObject)[]; // Operation parameters
  requestBody?: RequestBodyObject | ReferenceObject; // Request body
  responses: ResponsesObject; // REQUIRED. Possible responses
  callbacks?: Record<string, CallbackObject | ReferenceObject>; // Callbacks
  deprecated?: boolean; // Deprecation flag
  security?: SecurityRequirementObject[]; // Security requirements
  servers?: ServerObject[]; // Alternative servers
}
```

**Properties:**

- `tags` (string[], optional): Tags for API documentation control
- `summary` (string, optional): A short summary of what the operation does
- `description` (string, optional): A verbose explanation of the operation behavior
- `externalDocs` (ExternalDocumentationObject, optional): Additional external documentation
- `operationId` (string, optional): Unique string used to identify the operation
- `parameters` (Array, optional): Parameters applicable for this operation
- `requestBody` (RequestBodyObject | ReferenceObject, optional): Request body for this operation
- `responses` (ResponsesObject, required): The list of possible responses
- `callbacks` (Record, optional): Out-of-band callbacks related to the operation
- `deprecated` (boolean, optional): Declares this operation to be deprecated
- `security` (SecurityRequirementObject[], optional): Security mechanisms for this operation
- `servers` (ServerObject[], optional): Alternative server array for this operation

**Usage:**

```typescript
import type { OperationObject } from '@laag/openapi';

const createUserOperation: OperationObject = {
  tags: ['users'],
  summary: 'Create a new user',
  description: 'Creates a new user account with the provided information',
  operationId: 'createUser',
  requestBody: {
    required: true,
    description: 'User data',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          required: ['name', 'email'],
          properties: {
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
          },
        },
      },
    },
  },
  responses: {
    '201': {
      description: 'User created successfully',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              email: { type: 'string' },
            },
          },
        },
      },
    },
    '400': {
      description: 'Invalid input',
    },
  },
};
```

---

### SchemaObject

Allows the definition of input and output data types.

**Type Definition:**

```typescript
interface SchemaObject extends ExtensionObject {
  // Core schema properties
  title?: string;
  multipleOf?: number;
  maximum?: number;
  exclusiveMaximum?: boolean;
  minimum?: number;
  exclusiveMinimum?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  maxItems?: number;
  minItems?: number;
  uniqueItems?: boolean;
  maxProperties?: number;
  minProperties?: number;
  required?: string[];
  enum?: unknown[];

  // Type-specific properties
  type?: 'null' | 'boolean' | 'object' | 'array' | 'number' | 'string' | 'integer';
  allOf?: (SchemaObject | ReferenceObject)[];
  oneOf?: (SchemaObject | ReferenceObject)[];
  anyOf?: (SchemaObject | ReferenceObject)[];
  not?: SchemaObject | ReferenceObject;
  items?: SchemaObject | ReferenceObject;
  properties?: Record<string, SchemaObject | ReferenceObject>;
  additionalProperties?: boolean | SchemaObject | ReferenceObject;
  description?: string;
  format?: string;
  default?: unknown;

  // OpenAPI-specific properties
  nullable?: boolean;
  discriminator?: DiscriminatorObject;
  readOnly?: boolean;
  writeOnly?: boolean;
  xml?: XMLObject;
  externalDocs?: ExternalDocumentationObject;
  example?: unknown;
  deprecated?: boolean;
}
```

**Usage:**

```typescript
import type { SchemaObject } from '@laag/openapi';

const userSchema: SchemaObject = {
  type: 'object',
  required: ['id', 'name', 'email'],
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
      readOnly: true,
    },
    name: {
      type: 'string',
      minLength: 1,
      maxLength: 100,
    },
    email: {
      type: 'string',
      format: 'email',
    },
    age: {
      type: 'integer',
      minimum: 0,
      maximum: 150,
    },
    status: {
      type: 'string',
      enum: ['active', 'inactive', 'suspended'],
    },
  },
};
```

---

### ComponentsObject

Holds reusable objects for different aspects of the OAS.

**Type Definition:**

```typescript
interface ComponentsObject extends ExtensionObject {
  schemas?: Record<string, SchemaObject | ReferenceObject>;
  responses?: Record<string, ResponseObject | ReferenceObject>;
  parameters?: Record<string, ParameterObject | ReferenceObject>;
  examples?: Record<string, ExampleObject | ReferenceObject>;
  requestBodies?: Record<string, RequestBodyObject | ReferenceObject>;
  headers?: Record<string, HeaderObject | ReferenceObject>;
  securitySchemes?: Record<string, SecuritySchemeObject | ReferenceObject>;
  links?: Record<string, LinkObject | ReferenceObject>;
  callbacks?: Record<string, CallbackObject | ReferenceObject>;
}
```

**Usage:**

```typescript
import type { ComponentsObject } from '@laag/openapi';

const components: ComponentsObject = {
  schemas: {
    User: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
      },
    },
    Error: {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
      },
    },
  },
  responses: {
    NotFound: {
      description: 'Resource not found',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/Error' },
        },
      },
    },
  },
  securitySchemes: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
  },
};
```

---

### ServerObject

Represents a Server.

**Type Definition:**

```typescript
interface ServerObject extends ExtensionObject {
  url: string; // REQUIRED. Server URL
  description?: string; // Server description
  variables?: Record<string, ServerVariableObject>; // Server variables
}
```

**Usage:**

```typescript
import type { ServerObject } from '@laag/openapi';

const server: ServerObject = {
  url: 'https://{environment}.example.com:{port}/v1',
  description: 'Production server',
  variables: {
    environment: {
      default: 'api',
      enum: ['api', 'staging'],
      description: 'Server environment',
    },
    port: {
      default: '443',
    },
  },
};
```

---

### TagObject

Adds metadata to a single tag.

**Type Definition:**

```typescript
interface TagObject extends ExtensionObject {
  name: string; // REQUIRED. Tag name
  description?: string; // Tag description
  externalDocs?: ExternalDocumentationObject; // External documentation
}
```

**Usage:**

```typescript
import type { TagObject } from '@laag/openapi';

const tag: TagObject = {
  name: 'users',
  description: 'User management operations',
  externalDocs: {
    description: 'Find out more',
    url: 'https://example.com/docs/users',
  },
};
```

---

### Additional Types

The package also exports many other types for comprehensive OpenAPI support:

**Request/Response Types:**

- `RequestBodyObject`: Describes a single request body
- `ResponseObject`: Describes a single response from an API operation
- `ResponsesObject`: Container for expected responses
- `MediaTypeObject`: Provides schema and examples for media types

**Parameter Types:**

- `ParameterObject`: Describes a single operation parameter
- `ParameterStyle`: Parameter serialization styles
- `HeaderObject`: Header parameter (same as ParameterObject without name/in)

**Reference and Link Types:**

- `ReferenceObject`: Simple object to allow referencing other components
- `LinkObject`: Represents a possible design-time link for a response
- `CallbackObject`: Map of callbacks related to an operation

**Security Types:**

- `SecurityRequirementObject`: Lists required security schemes
- `SecuritySchemeObject`: Defines a security scheme
- `OAuthFlowsObject`: Configuration for OAuth flows
- `OAuthFlowObject`: Configuration details for an OAuth flow

**Metadata Types:**

- `ContactObject`: Contact information
- `LicenseObject`: License information
- `ExternalDocumentationObject`: External documentation reference
- `ExampleObject`: Example object
- `ServerVariableObject`: Server variable for URL template substitution

**Schema Composition Types:**

- `DiscriminatorObject`: Discriminator for polymorphism
- `XMLObject`: XML model definitions
- `EncodingObject`: Encoding definition for schema properties

**Utility Types:**

- `HttpMethod`: Union type of HTTP methods ('get' | 'post' | 'put' | 'delete' | 'patch' | 'head' | 'options' | 'trace')
- `HttpStatusCode`: Union type of valid HTTP status codes
- `MediaType`: Common media type strings
- `PathsObject`: Record of path items with extension support

**Import Example:**

```typescript
import type {
  OpenAPIDocument,
  InfoObject,
  PathItemObject,
  OperationObject,
  SchemaObject,
  ComponentsObject,
  ServerObject,
  TagObject,
  RequestBodyObject,
  ResponseObject,
  ParameterObject,
  SecuritySchemeObject,
  HttpMethod,
  HttpStatusCode,
} from '@laag/openapi';
```

**See Also:**

- [OpenAPI 3.0 Specification](https://spec.openapis.org/oas/v3.0.3)
- [Core Package Types](./API_REFERENCE_CORE.md#types)

---
