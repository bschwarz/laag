# OpenAPI Package Usage Guide

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Basic Setup and Imports](#basic-setup-and-imports)
  - [Your First Example](#your-first-example)
- [Creating Documents](#creating-documents)
  - [Creating from Scratch](#creating-from-scratch)
  - [Setting Info Metadata](#setting-info-metadata)
  - [Adding Servers](#adding-servers)
  - [Building Paths Progressively](#building-paths-progressively)
- [Reading Documents](#reading-documents)
  - [Loading from JSON](#loading-from-json)
  - [Loading from YAML](#loading-from-yaml)
  - [Accessing Document Properties](#accessing-document-properties)
  - [Error Handling for Invalid Documents](#error-handling-for-invalid-documents)
- [Modifying Documents](#modifying-documents)
  - [Updating Existing Documents](#updating-existing-documents)
  - [Adding and Modifying Paths](#adding-and-modifying-paths)
  - [Adding and Modifying Operations](#adding-and-modifying-operations)
  - [Working with Components](#working-with-components)
- [Paths and Operations](#paths-and-operations)
  - [Working with Paths](#working-with-paths)
  - [Adding Operations](#adding-operations)
  - [Setting Operation IDs](#setting-operation-ids)
  - [Querying Operations](#querying-operations)
- [Components and Schemas](#components-and-schemas)
  - [Defining Components](#defining-components)
  - [Schema Definitions](#schema-definitions)
  - [Using References](#using-references)
  - [Schema Composition](#schema-composition)
- [Validation](#validation)
  - [Validating Documents](#validating-documents)
  - [Handling Validation Errors](#handling-validation-errors)
  - [Common Validation Issues](#common-validation-issues)
- [Extensions](#extensions)
  - [Working with Extension Properties](#working-with-extension-properties)
  - [Root-Level Extensions](#root-level-extensions)
  - [Info-Level Extensions](#info-level-extensions)
  - [Path-Level Extensions](#path-level-extensions)
- [Sample and Code Generation](#sample-and-code-generation)
  - [Generating JSON Samples](#generating-json-samples)
  - [Generating cURL Commands](#generating-curl-commands)
  - [Generating Python Code](#generating-python-code)
  - [Generating JavaScript Code](#generating-javascript-code)
  - [Generating TypeScript Code](#generating-typescript-code)
- [Advanced Features](#advanced-features)
  - [Working with Multiple Servers](#working-with-multiple-servers)
  - [Security Schemes](#security-schemes)
  - [Callbacks](#callbacks)
  - [Links](#links)
- [Format Comparison](#format-comparison)
  - [OpenAPI-Specific Features](#openapi-specific-features)
  - [Comparison with RAML](#comparison-with-raml)

---

## Introduction

Welcome to the OpenAPI Package Usage Guide! This guide provides practical examples and patterns for working with OpenAPI 3.0 specification documents using the `@laag/openapi` package.

The `@laag/openapi` package is a comprehensive TypeScript/JavaScript library that makes it easy to:

- Create new OpenAPI documents programmatically
- Read and parse existing OpenAPI specifications
- Modify and update API definitions
- Validate documents against the OpenAPI 3.0 specification
- Generate sample data and client code
- Work with extension properties

Whether you're building API documentation tools, creating automated testing frameworks, or developing API design workflows, this guide will help you get the most out of the library.

**Who This Guide Is For:**

- JavaScript and TypeScript developers working with APIs
- API designers and architects
- DevOps engineers automating API workflows
- Anyone who needs to programmatically work with OpenAPI specifications

**What You'll Learn:**

- How to create, read, and modify OpenAPI documents
- Best practices for working with paths, operations, and schemas
- How to validate documents and handle errors
- Advanced features like code generation and extensions

---

## Getting Started

### Installation

The `@laag/openapi` package can be installed using your preferred package manager:

**Using npm:**

```bash
npm install @laag/openapi
```

**Using yarn:**

```bash
yarn add @laag/openapi
```

**Using bun:**

```bash
bun add @laag/openapi
```

**Requirements:**

- Node.js 18.0.0 or higher
- TypeScript 4.5.0 or higher (optional, for TypeScript projects)

The package includes TypeScript type definitions out of the box, so no additional `@types` packages are needed.

---

### Basic Setup and Imports

Once installed, you can import the library in your JavaScript or TypeScript project.

**ES Modules (TypeScript/Modern JavaScript):**

```typescript
import { Openapi } from '@laag/openapi';
import type { OpenAPIDocument, PathItemObject, OperationObject } from '@laag/openapi';
```

**CommonJS (Node.js):**

```javascript
const { Openapi } = require('@laag/openapi');
```

**Browser (via bundler):**

```javascript
import { Openapi } from '@laag/openapi';
```

The package supports multiple module formats:

- **ESM** (ES Modules) for modern JavaScript and TypeScript
- **CommonJS** for traditional Node.js applications
- **Browser** builds for client-side usage

---

### Your First Example

Let's create a simple OpenAPI document and explore its basic features:

```typescript
import { Openapi } from '@laag/openapi';

// Create a new OpenAPI document
const api = new Openapi();

// Set basic information
api.title = 'My First API';
api.version = '1.0.0';
api.description = 'A simple API to get started with OpenAPI';

// Add a server
api.appendServer({
  url: 'https://api.example.com',
  description: 'Production server',
});

// Add a simple path with a GET operation
api.appendPath('/hello', {
  get: {
    summary: 'Say hello',
    description: 'Returns a friendly greeting',
    responses: {
      '200': {
        description: 'Successful response',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Hello, World!',
                },
              },
            },
          },
        },
      },
    },
  },
});

// Display the document
console.log('API Title:', api.title);
console.log('API Version:', api.version);
console.log('Paths:', api.getPathNames());

// Get the complete document as JSON
const document = api.getDefinition('prettyjson');
console.log(document);
```

**Output:**

```
API Title: My First API
API Version: 1.0.0
Paths: [ '/hello' ]
```

**Generated OpenAPI Document:**

```json
{
  "openapi": "3.0.2",
  "info": {
    "title": "My First API",
    "version": "1.0.0",
    "description": "A simple API to get started with OpenAPI"
  },
  "servers": [
    {
      "url": "https://api.example.com",
      "description": "Production server"
    }
  ],
  "paths": {
    "/hello": {
      "get": {
        "summary": "Say hello",
        "description": "Returns a friendly greeting",
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string",
                      "example": "Hello, World!"
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

**Key Concepts:**

- **Openapi class**: The main class for working with OpenAPI documents
- **Properties**: Direct access to info fields like `title`, `version`, `description`
- **appendServer()**: Add server configurations
- **appendPath()**: Add API endpoints with their operations
- **getDefinition()**: Export the document in different formats

Now that you've created your first OpenAPI document, let's explore more advanced features in the following sections.

---

## Creating Documents

### Creating from Scratch

The `@laag/openapi` package makes it easy to create OpenAPI documents programmatically. You can start with an empty document and build it up step by step.

**Creating an Empty Document:**

```typescript
import { Openapi } from '@laag/openapi';

// Create a new document with default values
const api = new Openapi();

// The document is initialized with minimal required fields
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

**Creating with Initial Data:**

```typescript
import { Openapi } from '@laag/openapi';
import type { OpenAPIDocument } from '@laag/openapi';

// Create a document with initial structure
const initialDoc: OpenAPIDocument = {
  openapi: '3.0.2',
  info: {
    title: 'E-Commerce API',
    version: '1.0.0',
    description: 'RESTful API for e-commerce operations',
  },
  paths: {},
};

const api = new Openapi(initialDoc);
console.log(api.title); // 'E-Commerce API'
```

---

### Setting Info Metadata

The info object contains metadata about your API. You can set these properties individually or as a complete object.

**Setting Individual Properties:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();

// Set basic info properties
api.title = 'User Management API';
api.version = '2.1.0';
api.description = 'Comprehensive API for managing user accounts and profiles';
api.termsOfService = 'https://example.com/terms';

// Set contact information
api.contact = {
  name: 'API Support Team',
  email: 'api-support@example.com',
  url: 'https://example.com/support',
};

// Set license information
api.license = {
  name: 'Apache 2.0',
  url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
};

console.log(api.info);
```

**Output:**

```json
{
  "title": "User Management API",
  "version": "2.1.0",
  "description": "Comprehensive API for managing user accounts and profiles",
  "termsOfService": "https://example.com/terms",
  "contact": {
    "name": "API Support Team",
    "email": "api-support@example.com",
    "url": "https://example.com/support"
  },
  "license": {
    "name": "Apache 2.0",
    "url": "https://www.apache.org/licenses/LICENSE-2.0.html"
  }
}
```

**Setting the Complete Info Object:**

```typescript
import { Openapi } from '@laag/openapi';
import type { InfoObject } from '@laag/openapi';

const api = new Openapi();

const infoData: InfoObject = {
  title: 'Payment Gateway API',
  version: '3.0.0',
  description: 'Secure payment processing API',
  termsOfService: 'https://payments.example.com/terms',
  contact: {
    name: 'Payment Support',
    email: 'payments@example.com',
  },
  license: {
    name: 'MIT',
    url: 'https://opensource.org/licenses/MIT',
  },
};

api.info = infoData;
```

---

### Adding Servers

Servers define the base URLs where your API is hosted. You can add multiple servers for different environments.

**Adding a Single Server:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();
api.title = 'My API';
api.version = '1.0.0';

// Add a production server
api.appendServer({
  url: 'https://api.example.com/v1',
  description: 'Production server',
});

console.log(api.servers);
```

**Adding Multiple Servers:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();
api.title = 'My API';
api.version = '1.0.0';

// Add multiple servers for different environments
api.appendServer({
  url: 'https://api.example.com/v1',
  description: 'Production server',
});

api.appendServer({
  url: 'https://staging-api.example.com/v1',
  description: 'Staging server for testing',
});

api.appendServer({
  url: 'http://localhost:3000/v1',
  description: 'Local development server',
});

console.log(`Number of servers: ${api.servers.length}`);
```

**Servers with Variables:**

```typescript
import { Openapi } from '@laag/openapi';
import type { ServerObject } from '@laag/openapi';

const api = new Openapi();
api.title = 'My API';
api.version = '1.0.0';

// Add a server with configurable variables
const configurableServer: ServerObject = {
  url: 'https://{environment}.example.com:{port}/v1',
  description: 'Configurable server environment',
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

api.appendServer(configurableServer);

// The server URL can be customized by clients
// For example: https://staging.example.com:443/v1
```

**Setting All Servers at Once:**

```typescript
import { Openapi } from '@laag/openapi';
import type { ServerObject } from '@laag/openapi';

const api = new Openapi();
api.title = 'My API';
api.version = '1.0.0';

const serverList: ServerObject[] = [
  {
    url: 'https://api.example.com',
    description: 'Production',
  },
  {
    url: 'https://staging-api.example.com',
    description: 'Staging',
  },
];

api.servers = serverList;
```

---

### Building Paths Progressively

You can build your API by adding paths and operations incrementally. This approach is useful when generating documentation from code or building APIs dynamically.

**Step 1: Start with Basic Info**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();
api.title = 'Task Management API';
api.version = '1.0.0';
api.description = 'API for managing tasks and projects';

api.appendServer({
  url: 'https://api.tasks.example.com',
  description: 'Production server',
});
```

**Step 2: Add Your First Path**

```typescript
// Add a path to list all tasks
api.appendPath('/tasks', {
  get: {
    summary: 'List all tasks',
    description: 'Retrieves a list of all tasks',
    operationId: 'listTasks',
    responses: {
      '200': {
        description: 'Successful response',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  title: { type: 'string' },
                  completed: { type: 'boolean' },
                },
              },
            },
          },
        },
      },
    },
  },
});

console.log('Paths so far:', api.getPathNames());
// Output: Paths so far: [ '/tasks' ]
```

**Step 3: Add More Operations to the Same Path**

```typescript
import type { PathItemObject } from '@laag/openapi';

// Get the existing path
const tasksPath = api.getPath('/tasks');

// Add a POST operation to create tasks
tasksPath.post = {
  summary: 'Create a new task',
  description: 'Creates a new task',
  operationId: 'createTask',
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          required: ['title'],
          properties: {
            title: { type: 'string' },
            description: { type: 'string' },
            completed: { type: 'boolean', default: false },
          },
        },
      },
    },
  },
  responses: {
    '201': {
      description: 'Task created successfully',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              title: { type: 'string' },
              completed: { type: 'boolean' },
            },
          },
        },
      },
    },
  },
};

// Update the path in the document
api.paths['/tasks'] = tasksPath;
```

**Step 4: Add Additional Paths**

```typescript
// Add a path for individual task operations
api.appendPath('/tasks/{taskId}', {
  get: {
    summary: 'Get a task by ID',
    description: 'Retrieves a specific task',
    operationId: 'getTaskById',
    parameters: [
      {
        name: 'taskId',
        in: 'path',
        required: true,
        description: 'The task ID',
        schema: { type: 'string' },
      },
    ],
    responses: {
      '200': {
        description: 'Task found',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                title: { type: 'string' },
                description: { type: 'string' },
                completed: { type: 'boolean' },
              },
            },
          },
        },
      },
      '404': {
        description: 'Task not found',
      },
    },
  },
  put: {
    summary: 'Update a task',
    description: 'Updates an existing task',
    operationId: 'updateTask',
    parameters: [
      {
        name: 'taskId',
        in: 'path',
        required: true,
        description: 'The task ID',
        schema: { type: 'string' },
      },
    ],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              title: { type: 'string' },
              description: { type: 'string' },
              completed: { type: 'boolean' },
            },
          },
        },
      },
    },
    responses: {
      '200': {
        description: 'Task updated successfully',
      },
      '404': {
        description: 'Task not found',
      },
    },
  },
  delete: {
    summary: 'Delete a task',
    description: 'Deletes a task',
    operationId: 'deleteTask',
    parameters: [
      {
        name: 'taskId',
        in: 'path',
        required: true,
        description: 'The task ID',
        schema: { type: 'string' },
      },
    ],
    responses: {
      '204': {
        description: 'Task deleted successfully',
      },
      '404': {
        description: 'Task not found',
      },
    },
  },
});

console.log('All paths:', api.getPathNames());
// Output: All paths: [ '/tasks', '/tasks/{taskId}' ]
```

**Step 5: Review the Complete Document**

```typescript
// Get the complete document
const document = api.getDefinition('prettyjson');
console.log(document);

// Or save it to a file
import fs from 'fs';
fs.writeFileSync('task-api.json', document);
```

**Progressive Building Pattern:**

This pattern is particularly useful when:

- Generating API documentation from code annotations
- Building APIs dynamically based on database schemas
- Creating API specifications from existing REST endpoints
- Incrementally adding features to an API specification

**Tips for Progressive Building:**

- Start with the info object and servers
- Add paths one at a time
- Group related operations together
- Use consistent naming for operation IDs
- Validate the document periodically as you build

---

## Reading Documents

### Loading from JSON

The most common way to work with existing OpenAPI documents is to load them from JSON files or strings.

**Loading from a JSON File:**

```typescript
import { Openapi } from '@laag/openapi';
import fs from 'fs';

// Read the JSON file
const jsonContent = fs.readFileSync('api-spec.json', 'utf8');

// Create an Openapi instance from the JSON string
const api = new Openapi(jsonContent);

// Access the document properties
console.log(`API: ${api.title} v${api.version}`);
console.log(`Paths: ${api.getPathNames().length}`);
```

**Loading from a JSON String:**

```typescript
import { Openapi } from '@laag/openapi';

const jsonString = `{
  "openapi": "3.0.2",
  "info": {
    "title": "Pet Store API",
    "version": "1.0.0"
  },
  "paths": {
    "/pets": {
      "get": {
        "summary": "List all pets",
        "responses": {
          "200": {
            "description": "Success"
          }
        }
      }
    }
  }
}`;

const api = new Openapi(jsonString);
console.log(api.title); // 'Pet Store API'
```

**Loading from a JavaScript Object:**

```typescript
import { Openapi } from '@laag/openapi';
import type { OpenAPIDocument } from '@laag/openapi';

// You might receive this from an API or database
const docObject: OpenAPIDocument = {
  openapi: '3.0.2',
  info: {
    title: 'Product API',
    version: '2.0.0',
    description: 'API for product management',
  },
  paths: {
    '/products': {
      get: {
        summary: 'List products',
        responses: {
          '200': { description: 'Success' },
        },
      },
    },
  },
};

const api = new Openapi(docObject);
console.log(api.description); // 'API for product management'
```

---

### Loading from YAML

While the `Openapi` constructor accepts JSON, you can easily work with YAML files by parsing them first.

**Loading YAML with js-yaml:**

```typescript
import { Openapi } from '@laag/openapi';
import fs from 'fs';
import yaml from 'js-yaml';

// Read the YAML file
const yamlContent = fs.readFileSync('api-spec.yaml', 'utf8');

// Parse YAML to JavaScript object
const docObject = yaml.load(yamlContent);

// Create an Openapi instance
const api = new Openapi(docObject);

console.log(`Loaded API: ${api.title}`);
console.log(`Paths defined: ${api.getPathNames().join(', ')}`);
```

**Example YAML File (api-spec.yaml):**

```yaml
openapi: 3.0.2
info:
  title: Book Store API
  version: 1.0.0
  description: API for managing books
servers:
  - url: https://api.bookstore.example.com
    description: Production server
paths:
  /books:
    get:
      summary: List all books
      responses:
        '200':
          description: Successful response
  /books/{bookId}:
    get:
      summary: Get a book by ID
      parameters:
        - name: bookId
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Book found
        '404':
          description: Book not found
```

**Complete YAML Loading Example:**

```typescript
import { Openapi } from '@laag/openapi';
import fs from 'fs';
import yaml from 'js-yaml';

try {
  // Read and parse YAML
  const yamlContent = fs.readFileSync('api-spec.yaml', 'utf8');
  const docObject = yaml.load(yamlContent);

  // Create Openapi instance
  const api = new Openapi(docObject);

  // Work with the document
  console.log('API Information:');
  console.log(`  Title: ${api.title}`);
  console.log(`  Version: ${api.version}`);
  console.log(`  Description: ${api.description}`);
  console.log('\nServers:');
  api.servers.forEach(server => {
    console.log(`  - ${server.url}: ${server.description}`);
  });
  console.log('\nPaths:');
  api.getPathNames().forEach(path => {
    console.log(`  - ${path}`);
  });
} catch (error) {
  console.error('Error loading YAML:', error);
}
```

---

### Accessing Document Properties

Once you've loaded a document, you can access its properties in multiple ways.

**Accessing Info Properties:**

```typescript
import { Openapi } from '@laag/openapi';
import fs from 'fs';

const api = new Openapi(fs.readFileSync('api-spec.json', 'utf8'));

// Access individual info properties
console.log('Title:', api.title);
console.log('Version:', api.version);
console.log('Description:', api.description);
console.log('Terms of Service:', api.termsOfService);

// Access contact information
if (api.contact) {
  console.log('Contact Name:', api.contact.name);
  console.log('Contact Email:', api.contact.email);
  console.log('Contact URL:', api.contact.url);
}

// Access license information
if (api.license) {
  console.log('License:', api.license.name);
  console.log('License URL:', api.license.url);
}

// Access the complete info object
const info = api.info;
console.log('Complete Info:', JSON.stringify(info, null, 2));
```

**Accessing Servers:**

```typescript
import { Openapi } from '@laag/openapi';
import fs from 'fs';

const api = new Openapi(fs.readFileSync('api-spec.json', 'utf8'));

// Get all servers
const servers = api.servers;
console.log(`Number of servers: ${servers.length}`);

// Iterate through servers
servers.forEach((server, index) => {
  console.log(`Server ${index + 1}:`);
  console.log(`  URL: ${server.url}`);
  console.log(`  Description: ${server.description || 'N/A'}`);

  // Check for server variables
  if (server.variables) {
    console.log('  Variables:');
    Object.entries(server.variables).forEach(([name, variable]) => {
      console.log(`    ${name}: ${variable.default} (${variable.description})`);
    });
  }
});
```

**Accessing Paths and Operations:**

```typescript
import { Openapi } from '@laag/openapi';
import fs from 'fs';

const api = new Openapi(fs.readFileSync('api-spec.json', 'utf8'));

// Get all path names
const pathNames = api.getPathNames();
console.log('Available paths:', pathNames);

// Iterate through paths
pathNames.forEach(pathName => {
  console.log(`\nPath: ${pathName}`);

  // Get the path item
  const pathItem = api.getPath(pathName);

  // Check which HTTP methods are defined
  const methods = ['get', 'post', 'put', 'patch', 'delete', 'options', 'head', 'trace'];
  methods.forEach(method => {
    if (api.operationExists(pathName, method)) {
      const operation = pathItem[method];
      console.log(`  ${method.toUpperCase()}: ${operation.summary || 'No summary'}`);
      console.log(`    Operation ID: ${api.getOperationId(pathName, method)}`);
      console.log(`    Description: ${operation.description || 'No description'}`);
    }
  });
});
```

**Accessing Components:**

```typescript
import { Openapi } from '@laag/openapi';
import fs from 'fs';

const api = new Openapi(fs.readFileSync('api-spec.json', 'utf8'));

// Get all components
const components = api.components;

if (components) {
  // Access schemas
  if (components.schemas) {
    console.log('Schemas:');
    Object.keys(components.schemas).forEach(schemaName => {
      console.log(`  - ${schemaName}`);
    });
  }

  // Access other component types
  if (components.responses) {
    console.log('Reusable Responses:', Object.keys(components.responses));
  }
  if (components.parameters) {
    console.log('Reusable Parameters:', Object.keys(components.parameters));
  }
  if (components.securitySchemes) {
    console.log('Security Schemes:', Object.keys(components.securitySchemes));
  }
}

// Access schemas directly
const schemas = api.componentsSchemas;
console.log('Schema names:', Object.keys(schemas || {}));
```

**Getting the Complete Document:**

```typescript
import { Openapi } from '@laag/openapi';
import fs from 'fs';

const api = new Openapi(fs.readFileSync('api-spec.json', 'utf8'));

// Get as JavaScript object
const jsDoc = api.getDefinition('js');
console.log(jsDoc);

// Get as compact JSON string
const jsonDoc = api.getDefinition('json');
console.log(jsonDoc);

// Get as formatted JSON string
const prettyDoc = api.getDefinition('prettyjson');
console.log(prettyDoc);

// Save to a new file
fs.writeFileSync('api-spec-copy.json', prettyDoc);
```

---

### Error Handling for Invalid Documents

When loading documents, it's important to handle potential errors gracefully.

**Handling Parse Errors:**

```typescript
import { Openapi } from '@laag/openapi';
import { ParseError } from '@laag/core';
import fs from 'fs';

try {
  const content = fs.readFileSync('api-spec.json', 'utf8');
  const api = new Openapi(content);
  console.log('Document loaded successfully');
} catch (error) {
  if (error instanceof ParseError) {
    console.error('Failed to parse OpenAPI document:');
    console.error(`  Message: ${error.message}`);
    console.error('  The file may contain invalid JSON');
  } else {
    console.error('Unexpected error:', error);
  }
}
```

**Handling File Read Errors:**

```typescript
import { Openapi } from '@laag/openapi';
import { ParseError } from '@laag/core';
import fs from 'fs';

function loadOpenAPIDocument(filePath: string): Openapi | null {
  try {
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      return null;
    }

    // Read the file
    const content = fs.readFileSync(filePath, 'utf8');

    // Parse the document
    const api = new Openapi(content);

    console.log(`Successfully loaded: ${api.title} v${api.version}`);
    return api;
  } catch (error) {
    if (error instanceof ParseError) {
      console.error('Parse error:', error.message);
    } else if (error instanceof Error) {
      console.error('Error loading document:', error.message);
    }
    return null;
  }
}

// Usage
const api = loadOpenAPIDocument('api-spec.json');
if (api) {
  // Work with the document
  console.log('Paths:', api.getPathNames());
}
```

**Validating After Loading:**

```typescript
import { Openapi } from '@laag/openapi';
import { ParseError } from '@laag/core';
import fs from 'fs';

try {
  const api = new Openapi(fs.readFileSync('api-spec.json', 'utf8'));

  // Validate the document structure
  const validation = api.validate();

  if (validation.valid) {
    console.log('✓ Document is valid');
    console.log(`  API: ${api.title} v${api.version}`);
    console.log(`  Paths: ${api.getPathNames().length}`);
  } else {
    console.error('✗ Document has validation errors:');
    validation.errors.forEach(error => {
      console.error(`  - ${error.path}: ${error.message}`);
    });
  }
} catch (error) {
  if (error instanceof ParseError) {
    console.error('Failed to parse document:', error.message);
  } else {
    console.error('Unexpected error:', error);
  }
}
```

**Comprehensive Error Handling Example:**

```typescript
import { Openapi } from '@laag/openapi';
import { ParseError, ValidationError } from '@laag/core';
import fs from 'fs';
import yaml from 'js-yaml';

interface LoadResult {
  success: boolean;
  api?: Openapi;
  errors: string[];
}

function loadAndValidateAPI(filePath: string): LoadResult {
  const result: LoadResult = {
    success: false,
    errors: [],
  };

  try {
    // Check file existence
    if (!fs.existsSync(filePath)) {
      result.errors.push(`File not found: ${filePath}`);
      return result;
    }

    // Read file content
    const content = fs.readFileSync(filePath, 'utf8');

    // Parse based on file extension
    let docObject;
    if (filePath.endsWith('.yaml') || filePath.endsWith('.yml')) {
      try {
        docObject = yaml.load(content);
      } catch (yamlError) {
        result.errors.push(`YAML parse error: ${yamlError.message}`);
        return result;
      }
    } else {
      docObject = content; // Let Openapi constructor handle JSON parsing
    }

    // Create Openapi instance
    const api = new Openapi(docObject);

    // Validate the document
    const validation = api.validate();
    if (!validation.valid) {
      result.errors.push('Document validation failed:');
      validation.errors.forEach(error => {
        result.errors.push(`  ${error.path}: ${error.message}`);
      });
      // Still return the API instance even if validation fails
      result.api = api;
      return result;
    }

    // Success!
    result.success = true;
    result.api = api;
    return result;
  } catch (error) {
    if (error instanceof ParseError) {
      result.errors.push(`Parse error: ${error.message}`);
    } else if (error instanceof Error) {
      result.errors.push(`Error: ${error.message}`);
    } else {
      result.errors.push('Unknown error occurred');
    }
    return result;
  }
}

// Usage
const result = loadAndValidateAPI('api-spec.json');

if (result.success && result.api) {
  console.log('✓ API loaded and validated successfully');
  console.log(`  Title: ${result.api.title}`);
  console.log(`  Version: ${result.api.version}`);
  console.log(`  Paths: ${result.api.getPathNames().length}`);
} else {
  console.error('✗ Failed to load API:');
  result.errors.forEach(error => console.error(`  ${error}`));

  // You might still be able to work with the API even if validation failed
  if (result.api) {
    console.log('\nPartial API information available:');
    console.log(`  Title: ${result.api.title || 'N/A'}`);
  }
}
```

**Best Practices for Loading Documents:**

1. **Always handle errors**: Use try-catch blocks to handle parse errors
2. **Validate after loading**: Check document validity with `validate()`
3. **Support multiple formats**: Handle both JSON and YAML files
4. **Provide helpful error messages**: Give users clear information about what went wrong
5. **Check file existence**: Verify files exist before attempting to read them
6. **Log useful information**: Output document metadata after successful loading

---

## Modifying Documents

### Updating Existing Documents

Once you've loaded an OpenAPI document, you can modify it programmatically. This is useful for updating API versions, adding new endpoints, or making bulk changes.

**Updating Info Properties:**

```typescript
import { Openapi } from '@laag/openapi';
import fs from 'fs';

// Load existing document
const api = new Openapi(fs.readFileSync('api-spec.json', 'utf8'));

console.log('Before:', api.version); // e.g., '1.0.0'

// Update version
api.version = '1.1.0';

// Update description
api.description = 'Updated API with new features';

// Add or update contact information
api.contact = {
  name: 'API Team',
  email: 'api@example.com',
  url: 'https://example.com/api-support',
};

console.log('After:', api.version); // '1.1.0'

// Save the updated document
fs.writeFileSync('api-spec.json', api.getDefinition('prettyjson'));
```

**Updating Multiple Properties:**

```typescript
import { Openapi } from '@laag/openapi';
import type { InfoObject } from '@laag/openapi';
import fs from 'fs';

const api = new Openapi(fs.readFileSync('api-spec.json', 'utf8'));

// Update the entire info object
const updatedInfo: InfoObject = {
  ...api.info,
  version: '2.0.0',
  description: 'Major version update with breaking changes',
  contact: {
    name: 'API Support',
    email: 'support@example.com',
  },
};

api.info = updatedInfo;

// Save changes
fs.writeFileSync('api-spec-v2.json', api.getDefinition('prettyjson'));
```

**Updating Servers:**

```typescript
import { Openapi } from '@laag/openapi';
import type { ServerObject } from '@laag/openapi';
import fs from 'fs';

const api = new Openapi(fs.readFileSync('api-spec.json', 'utf8'));

// Replace all servers
const newServers: ServerObject[] = [
  {
    url: 'https://api-v2.example.com',
    description: 'Production server (v2)',
  },
  {
    url: 'https://staging-api-v2.example.com',
    description: 'Staging server (v2)',
  },
];

api.servers = newServers;

// Or add a new server to existing ones
api.appendServer({
  url: 'https://beta-api.example.com',
  description: 'Beta testing server',
});

console.log(`Total servers: ${api.servers.length}`);
```

---

### Adding and Modifying Paths

You can add new paths or modify existing ones in your OpenAPI document.

**Adding a New Path:**

```typescript
import { Openapi } from '@laag/openapi';
import type { PathItemObject } from '@laag/openapi';
import fs from 'fs';

const api = new Openapi(fs.readFileSync('api-spec.json', 'utf8'));

// Add a new path
const newPath: PathItemObject = {
  get: {
    summary: 'Get user profile',
    description: 'Retrieves the authenticated user profile',
    operationId: 'getUserProfile',
    responses: {
      '200': {
        description: 'Profile retrieved successfully',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                username: { type: 'string' },
                email: { type: 'string' },
              },
            },
          },
        },
      },
      '401': {
        description: 'Unauthorized',
      },
    },
  },
};

api.appendPath('/profile', newPath);

console.log('Updated paths:', api.getPathNames());

// Save the updated document
fs.writeFileSync('api-spec.json', api.getDefinition('prettyjson'));
```

**Modifying an Existing Path:**

```typescript
import { Openapi } from '@laag/openapi';
import fs from 'fs';

const api = new Openapi(fs.readFileSync('api-spec.json', 'utf8'));

// Check if path exists
if (api.pathExists('/users')) {
  // Get the existing path
  const usersPath = api.getPath('/users');

  // Add a new operation to the existing path
  usersPath.post = {
    summary: 'Create a new user',
    description: 'Creates a new user account',
    operationId: 'createUser',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['username', 'email'],
            properties: {
              username: { type: 'string' },
              email: { type: 'string', format: 'email' },
              password: { type: 'string', format: 'password' },
            },
          },
        },
      },
    },
    responses: {
      '201': {
        description: 'User created successfully',
      },
      '400': {
        description: 'Invalid input',
      },
    },
  };

  // Update the path in the document
  api.paths['/users'] = usersPath;

  console.log('Added POST operation to /users');
}

// Save changes
fs.writeFileSync('api-spec.json', api.getDefinition('prettyjson'));
```

**Removing a Path:**

```typescript
import { Openapi } from '@laag/openapi';
import fs from 'fs';

const api = new Openapi(fs.readFileSync('api-spec.json', 'utf8'));

// Remove a path by deleting it from the paths object
if (api.pathExists('/deprecated-endpoint')) {
  delete api.paths['/deprecated-endpoint'];
  console.log('Removed deprecated endpoint');
}

// Save changes
fs.writeFileSync('api-spec.json', api.getDefinition('prettyjson'));
```

---

### Adding and Modifying Operations

Operations are the HTTP methods (GET, POST, PUT, etc.) defined for each path.

**Adding an Operation to an Existing Path:**

```typescript
import { Openapi } from '@laag/openapi';
import type { OperationObject } from '@laag/openapi';
import fs from 'fs';

const api = new Openapi(fs.readFileSync('api-spec.json', 'utf8'));

const pathName = '/users/{userId}';

if (api.pathExists(pathName)) {
  const pathItem = api.getPath(pathName);

  // Add a PATCH operation
  const patchOperation: OperationObject = {
    summary: 'Partially update a user',
    description: 'Updates specific fields of a user',
    operationId: 'patchUser',
    parameters: [
      {
        name: 'userId',
        in: 'path',
        required: true,
        schema: { type: 'string' },
      },
    ],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              username: { type: 'string' },
              email: { type: 'string' },
            },
          },
        },
      },
    },
    responses: {
      '200': {
        description: 'User updated successfully',
      },
      '404': {
        description: 'User not found',
      },
    },
  };

  pathItem.patch = patchOperation;
  api.paths[pathName] = pathItem;

  console.log('Added PATCH operation to', pathName);
}

fs.writeFileSync('api-spec.json', api.getDefinition('prettyjson'));
```

**Modifying an Existing Operation:**

```typescript
import { Openapi } from '@laag/openapi';
import fs from 'fs';

const api = new Openapi(fs.readFileSync('api-spec.json', 'utf8'));

const pathName = '/users';
const method = 'get';

if (api.operationExists(pathName, method)) {
  const pathItem = api.getPath(pathName);
  const operation = pathItem[method];

  // Update the operation summary and description
  operation.summary = 'List all users (updated)';
  operation.description = 'Retrieves a paginated list of all users with filtering options';

  // Add query parameters
  operation.parameters = [
    {
      name: 'page',
      in: 'query',
      description: 'Page number',
      schema: { type: 'integer', default: 1 },
    },
    {
      name: 'limit',
      in: 'query',
      description: 'Number of items per page',
      schema: { type: 'integer', default: 20, maximum: 100 },
    },
    {
      name: 'sort',
      in: 'query',
      description: 'Sort field',
      schema: { type: 'string', enum: ['name', 'email', 'created'] },
    },
  ];

  // Update the path in the document
  api.paths[pathName] = pathItem;

  console.log('Updated GET operation for', pathName);
}

fs.writeFileSync('api-spec.json', api.getDefinition('prettyjson'));
```

**Setting Operation IDs:**

```typescript
import { Openapi } from '@laag/openapi';
import fs from 'fs';

const api = new Openapi(fs.readFileSync('api-spec.json', 'utf8'));

// Set operation IDs for all operations
api.getPathNames().forEach(pathName => {
  const pathItem = api.getPath(pathName);
  const methods = ['get', 'post', 'put', 'patch', 'delete'];

  methods.forEach(method => {
    if (api.operationExists(pathName, method)) {
      // Generate a meaningful operation ID if not present
      const currentId = api.getOperationId(pathName, method);

      if (!pathItem[method].operationId) {
        // Create operation ID from method and path
        const cleanPath = pathName.replace(/[{}]/g, '').replace(/\//g, '_');
        const operationId = `${method}${cleanPath}`;
        api.setOperationId(pathName, method, operationId);
        console.log(`Set operation ID: ${operationId}`);
      }
    }
  });
});

fs.writeFileSync('api-spec.json', api.getDefinition('prettyjson'));
```

**Removing an Operation:**

```typescript
import { Openapi } from '@laag/openapi';
import fs from 'fs';

const api = new Openapi(fs.readFileSync('api-spec.json', 'utf8'));

const pathName = '/users/{userId}';
const methodToRemove = 'delete';

if (api.operationExists(pathName, methodToRemove)) {
  const pathItem = api.getPath(pathName);
  delete pathItem[methodToRemove];
  api.paths[pathName] = pathItem;

  console.log(`Removed ${methodToRemove.toUpperCase()} operation from ${pathName}`);
}

fs.writeFileSync('api-spec.json', api.getDefinition('prettyjson'));
```

---

### Working with Components

Components allow you to define reusable schemas, responses, parameters, and other objects.

**Adding a Schema Component:**

```typescript
import { Openapi } from '@laag/openapi';
import type { SchemaObject } from '@laag/openapi';
import fs from 'fs';

const api = new Openapi(fs.readFileSync('api-spec.json', 'utf8'));

// Ensure components object exists
if (!api.components) {
  api.components = {};
}
if (!api.components.schemas) {
  api.components.schemas = {};
}

// Add a User schema
const userSchema: SchemaObject = {
  type: 'object',
  required: ['id', 'username', 'email'],
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
      description: 'Unique user identifier',
    },
    username: {
      type: 'string',
      minLength: 3,
      maxLength: 50,
      description: 'User username',
    },
    email: {
      type: 'string',
      format: 'email',
      description: 'User email address',
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
      description: 'Account creation timestamp',
    },
  },
};

api.components.schemas['User'] = userSchema;

console.log('Added User schema to components');

// Save changes
fs.writeFileSync('api-spec.json', api.getDefinition('prettyjson'));
```

**Using Schema References:**

```typescript
import { Openapi } from '@laag/openapi';
import fs from 'fs';

const api = new Openapi(fs.readFileSync('api-spec.json', 'utf8'));

// Now use the User schema in an operation
api.appendPath('/users/{userId}', {
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
            schema: {
              $ref: '#/components/schemas/User',
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

console.log('Added path using User schema reference');

fs.writeFileSync('api-spec.json', api.getDefinition('prettyjson'));
```

**Adding Reusable Response Components:**

```typescript
import { Openapi } from '@laag/openapi';
import type { ResponseObject } from '@laag/openapi';
import fs from 'fs';

const api = new Openapi(fs.readFileSync('api-spec.json', 'utf8'));

// Ensure components object exists
if (!api.components) {
  api.components = {};
}
if (!api.components.responses) {
  api.components.responses = {};
}

// Add common error responses
const notFoundResponse: ResponseObject = {
  description: 'Resource not found',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          error: { type: 'string' },
          message: { type: 'string' },
        },
      },
    },
  },
};

const unauthorizedResponse: ResponseObject = {
  description: 'Unauthorized - authentication required',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          error: { type: 'string' },
          message: { type: 'string' },
        },
      },
    },
  },
};

api.components.responses['NotFound'] = notFoundResponse;
api.components.responses['Unauthorized'] = unauthorizedResponse;

console.log('Added reusable response components');

// Now use these in operations
api.appendPath('/protected-resource', {
  get: {
    summary: 'Get protected resource',
    responses: {
      '200': {
        description: 'Success',
      },
      '401': {
        $ref: '#/components/responses/Unauthorized',
      },
      '404': {
        $ref: '#/components/responses/NotFound',
      },
    },
  },
});

fs.writeFileSync('api-spec.json', api.getDefinition('prettyjson'));
```

**Modifying Existing Components:**

```typescript
import { Openapi } from '@laag/openapi';
import fs from 'fs';

const api = new Openapi(fs.readFileSync('api-spec.json', 'utf8'));

// Modify an existing schema
if (api.components?.schemas?.['User']) {
  const userSchema = api.components.schemas['User'];

  // Add a new property
  if (userSchema.properties) {
    userSchema.properties.role = {
      type: 'string',
      enum: ['admin', 'user', 'guest'],
      default: 'user',
      description: 'User role',
    };
  }

  // Add the new property to required fields
  if (userSchema.required) {
    userSchema.required.push('role');
  }

  console.log('Updated User schema with role property');
}

fs.writeFileSync('api-spec.json', api.getDefinition('prettyjson'));
```

**Bulk Modifications Example:**

```typescript
import { Openapi } from '@laag/openapi';
import fs from 'fs';

const api = new Openapi(fs.readFileSync('api-spec.json', 'utf8'));

// Bulk update: Add tags to all operations
const tag = 'v2';

api.getPathNames().forEach(pathName => {
  const pathItem = api.getPath(pathName);
  const methods = ['get', 'post', 'put', 'patch', 'delete'];

  methods.forEach(method => {
    if (api.operationExists(pathName, method)) {
      const operation = pathItem[method];

      // Add or update tags
      if (!operation.tags) {
        operation.tags = [];
      }
      if (!operation.tags.includes(tag)) {
        operation.tags.push(tag);
      }
    }
  });

  api.paths[pathName] = pathItem;
});

console.log('Added v2 tag to all operations');

fs.writeFileSync('api-spec.json', api.getDefinition('prettyjson'));
```

---

## Paths and Operations

### Working with Paths

Paths represent the endpoints in your API. The `@laag/openapi` package provides several methods for working with paths.

**Listing All Paths:**

```typescript
import { Openapi } from '@laag/openapi';
import fs from 'fs';

const api = new Openapi(fs.readFileSync('api-spec.json', 'utf8'));

// Get all path names (sorted alphabetically)
const paths = api.getPathNames();
console.log('API Endpoints:');
paths.forEach(path => {
  console.log(`  ${path}`);
});
```

**Checking if a Path Exists:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();

api.appendPath('/users', {
  get: { responses: { '200': { description: 'Success' } } },
});

console.log(api.pathExists('/users')); // true
console.log(api.pathExists('/products')); // false

// Use this to conditionally add or modify paths
if (!api.pathExists('/products')) {
  api.appendPath('/products', {
    get: { responses: { '200': { description: 'Success' } } },
  });
  console.log('Added /products path');
}
```

**Getting Path Details:**

```typescript
import { Openapi } from '@laag/openapi';
import fs from 'fs';

const api = new Openapi(fs.readFileSync('api-spec.json', 'utf8'));

const pathName = '/users/{userId}';
const pathItem = api.getPath(pathName);

// Check which operations are defined
console.log(`Operations for ${pathName}:`);
if (pathItem.get) console.log('  - GET');
if (pathItem.post) console.log('  - POST');
if (pathItem.put) console.log('  - PUT');
if (pathItem.patch) console.log('  - PATCH');
if (pathItem.delete) console.log('  - DELETE');

// Access path-level parameters (shared by all operations)
if (pathItem.parameters) {
  console.log('Path-level parameters:');
  pathItem.parameters.forEach(param => {
    console.log(`  - ${param.name} (${param.in})`);
  });
}
```

**Adding Path-Level Parameters:**

```typescript
import { Openapi } from '@laag/openapi';
import type { ParameterObject } from '@laag/openapi';

const api = new Openapi();

// Path-level parameters apply to all operations on this path
api.appendPath('/users/{userId}', {
  parameters: [
    {
      name: 'userId',
      in: 'path',
      required: true,
      description: 'The user ID',
      schema: { type: 'string', format: 'uuid' },
    },
  ],
  get: {
    summary: 'Get user by ID',
    responses: { '200': { description: 'Success' } },
  },
  delete: {
    summary: 'Delete user',
    responses: { '204': { description: 'Deleted' } },
  },
});

// Both GET and DELETE operations inherit the userId parameter
```

**Iterating Through All Paths and Operations:**

```typescript
import { Openapi } from '@laag/openapi';
import fs from 'fs';

const api = new Openapi(fs.readFileSync('api-spec.json', 'utf8'));

console.log('API Structure:\n');

api.getPathNames().forEach(pathName => {
  console.log(`${pathName}`);

  const pathItem = api.getPath(pathName);
  const methods = ['get', 'post', 'put', 'patch', 'delete', 'options', 'head'];

  methods.forEach(method => {
    if (pathItem[method]) {
      const operation = pathItem[method];
      const summary = operation.summary || 'No summary';
      const operationId = operation.operationId || 'No ID';
      console.log(`  ${method.toUpperCase()}: ${summary} (${operationId})`);
    }
  });

  console.log('');
});
```

---

### Adding Operations

Operations are the HTTP methods (GET, POST, PUT, PATCH, DELETE, etc.) that can be performed on a path.

**Adding a Simple GET Operation:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();
api.title = 'Product API';
api.version = '1.0.0';

api.appendPath('/products', {
  get: {
    summary: 'List all products',
    description: 'Retrieves a list of all available products',
    operationId: 'listProducts',
    responses: {
      '200': {
        description: 'Successful response',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  name: { type: 'string' },
                  price: { type: 'number' },
                },
              },
            },
          },
        },
      },
    },
  },
});
```

**Adding a POST Operation with Request Body:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();
api.title = 'Product API';
api.version = '1.0.0';

api.appendPath('/products', {
  post: {
    summary: 'Create a new product',
    description: 'Creates a new product in the catalog',
    operationId: 'createProduct',
    requestBody: {
      required: true,
      description: 'Product data',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['name', 'price'],
            properties: {
              name: {
                type: 'string',
                minLength: 1,
                maxLength: 100,
                description: 'Product name',
              },
              description: {
                type: 'string',
                maxLength: 500,
                description: 'Product description',
              },
              price: {
                type: 'number',
                minimum: 0,
                description: 'Product price',
              },
              category: {
                type: 'string',
                enum: ['electronics', 'clothing', 'food', 'other'],
                description: 'Product category',
              },
            },
          },
        },
      },
    },
    responses: {
      '201': {
        description: 'Product created successfully',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                price: { type: 'number' },
              },
            },
          },
        },
      },
      '400': {
        description: 'Invalid input',
      },
    },
  },
});
```

**Adding Operations with Path Parameters:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();
api.title = 'Product API';
api.version = '1.0.0';

api.appendPath('/products/{productId}', {
  get: {
    summary: 'Get product by ID',
    operationId: 'getProductById',
    parameters: [
      {
        name: 'productId',
        in: 'path',
        required: true,
        description: 'Product identifier',
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    responses: {
      '200': {
        description: 'Product found',
      },
      '404': {
        description: 'Product not found',
      },
    },
  },
});
```

**Adding Operations with Query Parameters:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();
api.title = 'Product API';
api.version = '1.0.0';

api.appendPath('/products', {
  get: {
    summary: 'Search products',
    operationId: 'searchProducts',
    parameters: [
      {
        name: 'q',
        in: 'query',
        description: 'Search query',
        schema: { type: 'string' },
      },
      {
        name: 'category',
        in: 'query',
        description: 'Filter by category',
        schema: {
          type: 'string',
          enum: ['electronics', 'clothing', 'food', 'other'],
        },
      },
      {
        name: 'minPrice',
        in: 'query',
        description: 'Minimum price',
        schema: { type: 'number', minimum: 0 },
      },
      {
        name: 'maxPrice',
        in: 'query',
        description: 'Maximum price',
        schema: { type: 'number', minimum: 0 },
      },
      {
        name: 'page',
        in: 'query',
        description: 'Page number for pagination',
        schema: { type: 'integer', default: 1, minimum: 1 },
      },
      {
        name: 'limit',
        in: 'query',
        description: 'Number of items per page',
        schema: { type: 'integer', default: 20, minimum: 1, maximum: 100 },
      },
    ],
    responses: {
      '200': {
        description: 'Search results',
      },
    },
  },
});
```

**Adding Multiple Operations to One Path:**

```typescript
import { Openapi } from '@laag/openapi';
import type { PathItemObject } from '@laag/openapi';

const api = new Openapi();
api.title = 'Product API';
api.version = '1.0.0';

// Define all CRUD operations for a resource
const productPath: PathItemObject = {
  get: {
    summary: 'Get product by ID',
    operationId: 'getProduct',
    responses: { '200': { description: 'Success' } },
  },
  put: {
    summary: 'Update product',
    operationId: 'updateProduct',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: { type: 'object' },
        },
      },
    },
    responses: { '200': { description: 'Updated' } },
  },
  patch: {
    summary: 'Partially update product',
    operationId: 'patchProduct',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: { type: 'object' },
        },
      },
    },
    responses: { '200': { description: 'Updated' } },
  },
  delete: {
    summary: 'Delete product',
    operationId: 'deleteProduct',
    responses: { '204': { description: 'Deleted' } },
  },
};

api.appendPath('/products/{productId}', productPath);
```

---

### Setting Operation IDs

Operation IDs are unique identifiers for operations, often used for code generation.

**Setting Operation IDs Manually:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();

api.appendPath('/users', {
  get: {
    summary: 'List users',
    responses: { '200': { description: 'Success' } },
  },
});

// Set the operation ID
api.setOperationId('/users', 'get', 'listAllUsers');

console.log(api.getOperationId('/users', 'get')); // 'listAllUsers'
```

**Setting Operation IDs During Path Creation:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();

api.appendPath('/users', {
  get: {
    summary: 'List users',
    operationId: 'listUsers', // Set directly in the operation
    responses: { '200': { description: 'Success' } },
  },
  post: {
    summary: 'Create user',
    operationId: 'createUser',
    responses: { '201': { description: 'Created' } },
  },
});

console.log(api.getOperationId('/users', 'get')); // 'listUsers'
console.log(api.getOperationId('/users', 'post')); // 'createUser'
```

**Auto-Generating Operation IDs:**

```typescript
import { Openapi } from '@laag/openapi';
import fs from 'fs';

const api = new Openapi(fs.readFileSync('api-spec.json', 'utf8'));

// Generate operation IDs for all operations that don't have one
api.getPathNames().forEach(pathName => {
  const pathItem = api.getPath(pathName);
  const methods = ['get', 'post', 'put', 'patch', 'delete'];

  methods.forEach(method => {
    if (api.operationExists(pathName, method)) {
      const operation = pathItem[method];

      if (!operation.operationId) {
        // Generate ID from method and path
        // Example: GET /users/{id} -> getUsersById
        const pathParts = pathName
          .split('/')
          .filter(part => part)
          .map(part => {
            if (part.startsWith('{') && part.endsWith('}')) {
              return 'By' + part.slice(1, -1).charAt(0).toUpperCase() + part.slice(2, -1);
            }
            return part.charAt(0).toUpperCase() + part.slice(1);
          });

        const operationId = method + pathParts.join('');
        api.setOperationId(pathName, method, operationId);
        console.log(`Generated operation ID: ${operationId}`);
      }
    }
  });
});

fs.writeFileSync('api-spec.json', api.getDefinition('prettyjson'));
```

**Getting All Operation IDs:**

```typescript
import { Openapi } from '@laag/openapi';
import fs from 'fs';

const api = new Openapi(fs.readFileSync('api-spec.json', 'utf8'));

// Get all operation IDs with their paths and methods
const operationIds = api.getOperationIds();

console.log('All Operations:');
operationIds.forEach(({ id, path, method }) => {
  console.log(`  ${id}: ${method.toUpperCase()} ${path}`);
});

// Check for duplicate operation IDs
const ids = operationIds.map(op => op.id);
const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);

if (duplicates.length > 0) {
  console.warn('Warning: Duplicate operation IDs found:', duplicates);
}
```

---

### Querying Operations

The library provides several methods to query and inspect operations.

**Checking if an Operation Exists:**

```typescript
import { Openapi } from '@laag/openapi';
import fs from 'fs';

const api = new Openapi(fs.readFileSync('api-spec.json', 'utf8'));

// Check if specific operations exist
console.log(api.operationExists('/users', 'get')); // true or false
console.log(api.operationExists('/users', 'POST')); // Case-insensitive

// Use this to conditionally add operations
if (!api.operationExists('/users', 'delete')) {
  const pathItem = api.getPath('/users');
  pathItem.delete = {
    summary: 'Delete all users',
    responses: { '204': { description: 'Deleted' } },
  };
  api.paths['/users'] = pathItem;
}
```

**Getting Operation Data:**

```typescript
import { Openapi } from '@laag/openapi';
import fs from 'fs';

const api = new Openapi(fs.readFileSync('api-spec.json', 'utf8'));

// Get complete operation object
const operation = api.getOperationData('/users/{userId}', 'get');

console.log('Operation Summary:', operation.summary);
console.log('Operation ID:', operation.operationId);
console.log('Description:', operation.description);
console.log('Tags:', operation.tags);
console.log('Deprecated:', operation.deprecated || false);

// Access parameters
if (operation.parameters) {
  console.log('Parameters:');
  operation.parameters.forEach(param => {
    console.log(`  - ${param.name} (${param.in}): ${param.description}`);
  });
}

// Access request body
if (operation.requestBody) {
  console.log('Request Body Required:', operation.requestBody.required);
}

// Access responses
if (operation.responses) {
  console.log('Response Status Codes:', Object.keys(operation.responses));
}
```

**Getting Operation Description:**

```typescript
import { Openapi } from '@laag/openapi';
import fs from 'fs';

const api = new Openapi(fs.readFileSync('api-spec.json', 'utf8'));

const description = api.getOperationDescription('/users', 'get');
console.log('Operation Description:', description);
```

**Checking if Operation is Deprecated:**

```typescript
import { Openapi } from '@laag/openapi';
import fs from 'fs';

const api = new Openapi(fs.readFileSync('api-spec.json', 'utf8'));

// Check if an operation is marked as deprecated
const isDeprecated = api.isOperationDeprecated('/old-endpoint', 'get');

if (isDeprecated) {
  console.log('Warning: This operation is deprecated');
}

// Find all deprecated operations
api.getPathNames().forEach(pathName => {
  const methods = ['get', 'post', 'put', 'patch', 'delete'];
  methods.forEach(method => {
    if (api.operationExists(pathName, method)) {
      if (api.isOperationDeprecated(pathName, method)) {
        console.log(`Deprecated: ${method.toUpperCase()} ${pathName}`);
      }
    }
  });
});
```

**Getting All HTTP Methods for a Path:**

```typescript
import { Openapi } from '@laag/openapi';
import fs from 'fs';

const api = new Openapi(fs.readFileSync('api-spec.json', 'utf8'));

const pathName = '/users/{userId}';
const methods = api.getAllHttpMethods(pathName);

console.log(`HTTP methods for ${pathName}:`, methods);
// Example output: ['get', 'put', 'delete']
```

**Getting Status Codes for an Operation:**

```typescript
import { Openapi } from '@laag/openapi';
import fs from 'fs';

const api = new Openapi(fs.readFileSync('api-spec.json', 'utf8'));

// Get status codes for a specific operation
const statusCodes = api.getStatusCodes('/users', 'post');
console.log('Status codes:', statusCodes);
// Example output: ['201', '400', '401']

// Get the success status code
const successCode = api.getSuccessCode('/users', 'post');
console.log('Success code:', successCode);
// Example output: '201'

// Get all status codes across all operations
const allStatusCodes = api.getAllStatusCodes();
console.log('All status codes used:', allStatusCodes);
// Example output: ['200', '201', '204', '400', '401', '404', '500']
```

**Complete Operation Query Example:**

```typescript
import { Openapi } from '@laag/openapi';
import fs from 'fs';

const api = new Openapi(fs.readFileSync('api-spec.json', 'utf8'));

function analyzeOperation(pathName: string, method: string) {
  if (!api.operationExists(pathName, method)) {
    console.log(`Operation ${method.toUpperCase()} ${pathName} does not exist`);
    return;
  }

  console.log(`\nAnalyzing: ${method.toUpperCase()} ${pathName}`);
  console.log('─'.repeat(50));

  const operation = api.getOperationData(pathName, method);

  console.log('Operation ID:', api.getOperationId(pathName, method));
  console.log('Summary:', operation.summary || 'N/A');
  console.log('Description:', api.getOperationDescription(pathName, method) || 'N/A');
  console.log('Deprecated:', api.isOperationDeprecated(pathName, method) ? 'Yes' : 'No');
  console.log('Tags:', operation.tags?.join(', ') || 'None');

  const statusCodes = api.getStatusCodes(pathName, method);
  console.log('Status Codes:', statusCodes.join(', '));
  console.log('Success Code:', api.getSuccessCode(pathName, method));

  if (operation.parameters && operation.parameters.length > 0) {
    console.log('\nParameters:');
    operation.parameters.forEach(param => {
      const required = param.required ? '(required)' : '(optional)';
      console.log(`  - ${param.name} [${param.in}] ${required}`);
    });
  }

  if (operation.requestBody) {
    console.log('\nRequest Body:', operation.requestBody.required ? 'Required' : 'Optional');
  }
}

// Analyze specific operations
analyzeOperation('/users', 'get');
analyzeOperation('/users/{userId}', 'put');
```

---

## Components and Schemas

### Defining Components

Components in OpenAPI allow you to define reusable objects that can be referenced throughout your API specification. This promotes consistency and reduces duplication.

**Creating the Components Structure:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();
api.title = 'E-Commerce API';
api.version = '1.0.0';

// Initialize components if not present
if (!api.components) {
  api.components = {};
}

console.log('Components initialized');
```

**Adding Multiple Component Types:**

```typescript
import { Openapi } from '@laag/openapi';
import type { ComponentsObject } from '@laag/openapi';

const api = new Openapi();
api.title = 'E-Commerce API';
api.version = '1.0.0';

// Define a complete components object
const components: ComponentsObject = {
  schemas: {},
  responses: {},
  parameters: {},
  examples: {},
  requestBodies: {},
  headers: {},
  securitySchemes: {},
  links: {},
  callbacks: {},
};

api.components = components;
```

---

### Schema Definitions

Schemas define the structure of data in your API, including request bodies, response bodies, and reusable data models.

**Defining a Simple Schema:**

```typescript
import { Openapi } from '@laag/openapi';
import type { SchemaObject } from '@laag/openapi';

const api = new Openapi();
api.title = 'User API';
api.version = '1.0.0';

// Ensure components.schemas exists
if (!api.components) api.components = {};
if (!api.components.schemas) api.components.schemas = {};

// Define a User schema
const userSchema: SchemaObject = {
  type: 'object',
  required: ['id', 'email'],
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
      description: 'Unique user identifier',
      example: '123e4567-e89b-12d3-a456-426614174000',
    },
    email: {
      type: 'string',
      format: 'email',
      description: 'User email address',
      example: 'user@example.com',
    },
    name: {
      type: 'string',
      minLength: 1,
      maxLength: 100,
      description: 'User full name',
      example: 'John Doe',
    },
    age: {
      type: 'integer',
      minimum: 0,
      maximum: 150,
      description: 'User age',
      example: 30,
    },
    isActive: {
      type: 'boolean',
      description: 'Whether the user account is active',
      default: true,
    },
  },
};

api.components.schemas['User'] = userSchema;
console.log('User schema defined');
```

**Defining Complex Schemas:**

```typescript
import { Openapi } from '@laag/openapi';
import type { SchemaObject } from '@laag/openapi';

const api = new Openapi();
if (!api.components) api.components = {};
if (!api.components.schemas) api.components.schemas = {};

// Address schema (nested object)
const addressSchema: SchemaObject = {
  type: 'object',
  required: ['street', 'city', 'country'],
  properties: {
    street: { type: 'string', example: '123 Main St' },
    city: { type: 'string', example: 'New York' },
    state: { type: 'string', example: 'NY' },
    country: { type: 'string', example: 'USA' },
    postalCode: { type: 'string', example: '10001' },
  },
};

// Order schema (with nested objects and arrays)
const orderSchema: SchemaObject = {
  type: 'object',
  required: ['id', 'items', 'total'],
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
    },
    items: {
      type: 'array',
      items: {
        type: 'object',
        required: ['productId', 'quantity', 'price'],
        properties: {
          productId: { type: 'string' },
          productName: { type: 'string' },
          quantity: { type: 'integer', minimum: 1 },
          price: { type: 'number', minimum: 0 },
        },
      },
      minItems: 1,
    },
    total: {
      type: 'number',
      minimum: 0,
      description: 'Total order amount',
    },
    shippingAddress: {
      $ref: '#/components/schemas/Address',
    },
    status: {
      type: 'string',
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
    },
  },
};

api.components.schemas['Address'] = addressSchema;
api.components.schemas['Order'] = orderSchema;
```

**Defining Array Schemas:**

```typescript
import { Openapi } from '@laag/openapi';
import type { SchemaObject } from '@laag/openapi';

const api = new Openapi();
if (!api.components) api.components = {};
if (!api.components.schemas) api.components.schemas = {};

// Array of strings
const tagsSchema: SchemaObject = {
  type: 'array',
  items: {
    type: 'string',
  },
  minItems: 1,
  maxItems: 10,
  uniqueItems: true,
  example: ['electronics', 'gadgets', 'sale'],
};

// Array of objects
const userListSchema: SchemaObject = {
  type: 'array',
  items: {
    $ref: '#/components/schemas/User',
  },
};

api.components.schemas['Tags'] = tagsSchema;
api.components.schemas['UserList'] = userListSchema;
```

**Defining Enum Schemas:**

```typescript
import { Openapi } from '@laag/openapi';
import type { SchemaObject } from '@laag/openapi';

const api = new Openapi();
if (!api.components) api.components = {};
if (!api.components.schemas) api.components.schemas = {};

const userRoleSchema: SchemaObject = {
  type: 'string',
  enum: ['admin', 'moderator', 'user', 'guest'],
  description: 'User role in the system',
  default: 'user',
};

const orderStatusSchema: SchemaObject = {
  type: 'string',
  enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
  description: 'Current status of the order',
};

api.components.schemas['UserRole'] = userRoleSchema;
api.components.schemas['OrderStatus'] = orderStatusSchema;
```

---

### Using References

References allow you to reuse schemas and other components throughout your API specification using the `$ref` keyword.

**Basic Schema Reference:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();
if (!api.components) api.components = {};
if (!api.components.schemas) api.components.schemas = {};

// Define a reusable schema
api.components.schemas['User'] = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
  },
};

// Use the schema in an operation
api.appendPath('/users/{userId}', {
  get: {
    summary: 'Get user by ID',
    responses: {
      '200': {
        description: 'User found',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/User',
            },
          },
        },
      },
    },
  },
});
```

**Using References in Request Bodies:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();
if (!api.components) api.components = {};
if (!api.components.schemas) api.components.schemas = {};

// Define schema
api.components.schemas['CreateUserRequest'] = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string', format: 'password', minLength: 8 },
    name: { type: 'string' },
  },
};

// Use in operation
api.appendPath('/users', {
  post: {
    summary: 'Create a new user',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/CreateUserRequest',
          },
        },
      },
    },
    responses: {
      '201': {
        description: 'User created',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/User',
            },
          },
        },
      },
    },
  },
});
```

**Referencing Other Component Types:**

```typescript
import { Openapi } from '@laag/openapi';
import type { ResponseObject, ParameterObject } from '@laag/openapi';

const api = new Openapi();
if (!api.components) api.components = {};

// Define reusable response
if (!api.components.responses) api.components.responses = {};
const notFoundResponse: ResponseObject = {
  description: 'Resource not found',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          error: { type: 'string' },
          message: { type: 'string' },
        },
      },
    },
  },
};
api.components.responses['NotFound'] = notFoundResponse;

// Define reusable parameter
if (!api.components.parameters) api.components.parameters = {};
const pageParameter: ParameterObject = {
  name: 'page',
  in: 'query',
  description: 'Page number',
  schema: { type: 'integer', default: 1, minimum: 1 },
};
api.components.parameters['PageParam'] = pageParameter;

// Use references in operations
api.appendPath('/items', {
  get: {
    summary: 'List items',
    parameters: [{ $ref: '#/components/parameters/PageParam' }],
    responses: {
      '200': { description: 'Success' },
      '404': { $ref: '#/components/responses/NotFound' },
    },
  },
});
```

**Nested References:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();
if (!api.components) api.components = {};
if (!api.components.schemas) api.components.schemas = {};

// Define base schemas
api.components.schemas['Address'] = {
  type: 'object',
  properties: {
    street: { type: 'string' },
    city: { type: 'string' },
    country: { type: 'string' },
  },
};

api.components.schemas['Contact'] = {
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email' },
    phone: { type: 'string' },
  },
};

// Schema that references other schemas
api.components.schemas['Company'] = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    address: {
      $ref: '#/components/schemas/Address',
    },
    contact: {
      $ref: '#/components/schemas/Contact',
    },
  },
};
```

---

### Schema Composition

OpenAPI supports schema composition using `allOf`, `oneOf`, and `anyOf` keywords, allowing you to create complex schemas from simpler ones.

**Using allOf (Inheritance):**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();
if (!api.components) api.components = {};
if (!api.components.schemas) api.components.schemas = {};

// Base schema
api.components.schemas['Animal'] = {
  type: 'object',
  required: ['name', 'species'],
  properties: {
    name: { type: 'string' },
    species: { type: 'string' },
    age: { type: 'integer', minimum: 0 },
  },
};

// Extended schema using allOf
api.components.schemas['Dog'] = {
  allOf: [
    { $ref: '#/components/schemas/Animal' },
    {
      type: 'object',
      required: ['breed'],
      properties: {
        breed: { type: 'string' },
        isGoodBoy: { type: 'boolean', default: true },
      },
    },
  ],
};

// Dog inherits all properties from Animal and adds its own
```

**Using oneOf (Polymorphism):**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();
if (!api.components) api.components = {};
if (!api.components.schemas) api.components.schemas = {};

// Define different payment method schemas
api.components.schemas['CreditCardPayment'] = {
  type: 'object',
  required: ['type', 'cardNumber', 'expiryDate'],
  properties: {
    type: { type: 'string', enum: ['credit_card'] },
    cardNumber: { type: 'string' },
    expiryDate: { type: 'string' },
    cvv: { type: 'string' },
  },
};

api.components.schemas['PayPalPayment'] = {
  type: 'object',
  required: ['type', 'email'],
  properties: {
    type: { type: 'string', enum: ['paypal'] },
    email: { type: 'string', format: 'email' },
  },
};

api.components.schemas['BankTransferPayment'] = {
  type: 'object',
  required: ['type', 'accountNumber', 'routingNumber'],
  properties: {
    type: { type: 'string', enum: ['bank_transfer'] },
    accountNumber: { type: 'string' },
    routingNumber: { type: 'string' },
  },
};

// Payment can be one of the above types
api.components.schemas['Payment'] = {
  oneOf: [
    { $ref: '#/components/schemas/CreditCardPayment' },
    { $ref: '#/components/schemas/PayPalPayment' },
    { $ref: '#/components/schemas/BankTransferPayment' },
  ],
  discriminator: {
    propertyName: 'type',
    mapping: {
      credit_card: '#/components/schemas/CreditCardPayment',
      paypal: '#/components/schemas/PayPalPayment',
      bank_transfer: '#/components/schemas/BankTransferPayment',
    },
  },
};
```

**Using anyOf (Flexible Composition):**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();
if (!api.components) api.components = {};
if (!api.components.schemas) api.components.schemas = {};

// Define partial schemas
api.components.schemas['WithEmail'] = {
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email' },
  },
};

api.components.schemas['WithPhone'] = {
  type: 'object',
  properties: {
    phone: { type: 'string' },
  },
};

// Contact must have at least one of email or phone (or both)
api.components.schemas['ContactInfo'] = {
  anyOf: [{ $ref: '#/components/schemas/WithEmail' }, { $ref: '#/components/schemas/WithPhone' }],
};
```

**Complex Composition Example:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();
if (!api.components) api.components = {};
if (!api.components.schemas) api.components.schemas = {};

// Base entity with common fields
api.components.schemas['BaseEntity'] = {
  type: 'object',
  required: ['id', 'createdAt'],
  properties: {
    id: { type: 'string', format: 'uuid' },
    createdAt: { type: 'string', format: 'date-time' },
    updatedAt: { type: 'string', format: 'date-time' },
  },
};

// Auditable mixin
api.components.schemas['Auditable'] = {
  type: 'object',
  properties: {
    createdBy: { type: 'string' },
    updatedBy: { type: 'string' },
  },
};

// Soft deletable mixin
api.components.schemas['SoftDeletable'] = {
  type: 'object',
  properties: {
    deletedAt: { type: 'string', format: 'date-time' },
    deletedBy: { type: 'string' },
  },
};

// Product combines base entity with mixins
api.components.schemas['Product'] = {
  allOf: [
    { $ref: '#/components/schemas/BaseEntity' },
    { $ref: '#/components/schemas/Auditable' },
    { $ref: '#/components/schemas/SoftDeletable' },
    {
      type: 'object',
      required: ['name', 'price'],
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        price: { type: 'number', minimum: 0 },
        category: { type: 'string' },
      },
    },
  ],
};
```

**Accessing Component Schemas:**

```typescript
import { Openapi } from '@laag/openapi';
import fs from 'fs';

const api = new Openapi(fs.readFileSync('api-spec.json', 'utf8'));

// Get all schemas
const schemas = api.componentsSchemas;

if (schemas) {
  console.log('Available schemas:');
  Object.keys(schemas).forEach(schemaName => {
    const schema = schemas[schemaName];
    console.log(`  - ${schemaName} (${schema.type || 'complex'})`);
  });
}

// Get a specific schema
const userSchema = api.components?.schemas?.['User'];
if (userSchema) {
  console.log('\nUser schema properties:');
  if (userSchema.properties) {
    Object.keys(userSchema.properties).forEach(propName => {
      const prop = userSchema.properties![propName];
      console.log(`  - ${propName}: ${prop.type}`);
    });
  }
}
```

---

## Validation

### Validating Documents

The `@laag/openapi` package provides built-in validation to ensure your OpenAPI documents conform to the OpenAPI 3.0 specification.

**Basic Validation:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();
api.title = 'My API';
api.version = '1.0.0';

// Validate the document
const result = api.validate();

if (result.valid) {
  console.log('✓ Document is valid');
} else {
  console.log('✗ Document has validation errors');
}
```

**Validation Result Structure:**

```typescript
import { Openapi } from '@laag/openapi';
import type { ValidationResult } from '@laag/core';

const api = new Openapi();
const result: ValidationResult = api.validate();

// ValidationResult structure:
// {
//   valid: boolean;
//   errors: Array<{
//     path: string;
//     message: string;
//     code: string;
//   }>;
// }

console.log('Valid:', result.valid);
console.log('Number of errors:', result.errors.length);
```

**Validating After Loading:**

```typescript
import { Openapi } from '@laag/openapi';
import fs from 'fs';

const api = new Openapi(fs.readFileSync('api-spec.json', 'utf8'));

const validation = api.validate();

if (validation.valid) {
  console.log('✓ Loaded document is valid');
  console.log(`  Title: ${api.title}`);
  console.log(`  Version: ${api.version}`);
  console.log(`  Paths: ${api.getPathNames().length}`);
} else {
  console.error('✗ Loaded document has validation errors');
  console.error(`  Found ${validation.errors.length} error(s)`);
}
```

---

### Handling Validation Errors

When validation fails, the result contains detailed error information that helps you identify and fix issues.

**Displaying Validation Errors:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();
// Intentionally create an invalid document
api.doc.info = undefined as any;

const result = api.validate();

if (!result.valid) {
  console.error('Validation Errors:\n');
  result.errors.forEach((error, index) => {
    console.error(`${index + 1}. ${error.path}`);
    console.error(`   Message: ${error.message}`);
    console.error(`   Code: ${error.code}\n`);
  });
}
```

**Output:**

```
Validation Errors:

1. info
   Message: Info object is required
   Code: REQUIRED_FIELD_MISSING

2. info.title
   Message: Title is required in info object
   Code: REQUIRED_FIELD_MISSING
```

**Categorizing Validation Errors:**

```typescript
import { Openapi } from '@laag/openapi';
import fs from 'fs';

const api = new Openapi(fs.readFileSync('api-spec.json', 'utf8'));
const result = api.validate();

if (!result.valid) {
  // Group errors by type
  const errorsByCode = result.errors.reduce(
    (acc, error) => {
      if (!acc[error.code]) {
        acc[error.code] = [];
      }
      acc[error.code].push(error);
      return acc;
    },
    {} as Record<string, typeof result.errors>
  );

  console.log('Validation Errors by Type:\n');
  Object.entries(errorsByCode).forEach(([code, errors]) => {
    console.log(`${code} (${errors.length} error(s)):`);
    errors.forEach(error => {
      console.log(`  - ${error.path}: ${error.message}`);
    });
    console.log('');
  });
}
```

**Validation with Error Recovery:**

```typescript
import { Openapi } from '@laag/openapi';
import fs from 'fs';

function loadAndValidate(filePath: string): { api: Openapi; isValid: boolean } {
  const api = new Openapi(fs.readFileSync(filePath, 'utf8'));
  const validation = api.validate();

  if (!validation.valid) {
    console.warn(`⚠ Document has ${validation.errors.length} validation error(s):`);
    validation.errors.forEach(error => {
      console.warn(`  - ${error.path}: ${error.message}`);
    });

    // Attempt to fix common issues
    if (!api.title) {
      console.log('  → Fixing: Setting default title');
      api.title = 'Untitled API';
    }

    if (!api.version) {
      console.log('  → Fixing: Setting default version');
      api.version = '1.0.0';
    }

    // Validate again after fixes
    const revalidation = api.validate();
    if (revalidation.valid) {
      console.log('✓ Document fixed and is now valid');
      return { api, isValid: true };
    }
  }

  return { api, isValid: validation.valid };
}

const { api, isValid } = loadAndValidate('api-spec.json');
if (isValid) {
  console.log('Ready to use API document');
}
```

---

### Common Validation Issues

Here are common validation issues and how to fix them.

**Issue 1: Missing Required Fields**

```typescript
import { Openapi } from '@laag/openapi';

// ❌ Invalid: Missing title
const api1 = new Openapi();
api1.doc.info.title = '';
api1.version = '1.0.0';

let result = api1.validate();
console.log(result.valid); // false
console.log(result.errors[0].message); // "Title is required"

// ✅ Valid: Title provided
api1.title = 'My API';
result = api1.validate();
console.log(result.valid); // true
```

**Issue 2: Missing Info Object**

```typescript
import { Openapi } from '@laag/openapi';

// ❌ Invalid: Info object deleted
const api = new Openapi();
delete api.doc.info;

let result = api.validate();
console.log(result.valid); // false

// ✅ Valid: Restore info object
api.info = {
  title: 'My API',
  version: '1.0.0',
};
result = api.validate();
console.log(result.valid); // true
```

**Issue 3: Missing Paths Object**

```typescript
import { Openapi } from '@laag/openapi';

// ❌ Invalid: Paths object deleted
const api = new Openapi();
api.title = 'My API';
api.version = '1.0.0';
delete api.doc.paths;

let result = api.validate();
console.log(result.valid); // false

// ✅ Valid: Restore paths object
api.paths = {};
result = api.validate();
console.log(result.valid); // true
```

**Issue 4: Invalid OpenAPI Version**

```typescript
import { Openapi } from '@laag/openapi';

// ❌ Invalid: Wrong OpenAPI version
const api = new Openapi();
api.doc.openapi = '2.0.0'; // Swagger 2.0, not OpenAPI 3.0

let result = api.validate();
console.log(result.valid); // false

// ✅ Valid: Correct OpenAPI version
api.doc.openapi = '3.0.2';
result = api.validate();
console.log(result.valid); // true
```

**Validation Best Practices:**

1. **Validate Early and Often**: Validate after major changes to catch issues quickly
2. **Handle Errors Gracefully**: Don't assume documents are always valid
3. **Provide Helpful Messages**: When validation fails, explain what's wrong and how to fix it
4. **Validate Before Saving**: Always validate before writing documents to files
5. **Log Validation Results**: Keep track of validation issues for debugging

**Complete Validation Workflow:**

```typescript
import { Openapi } from '@laag/openapi';
import fs from 'fs';

class APIDocumentManager {
  private api: Openapi;

  constructor(filePath?: string) {
    if (filePath && fs.existsSync(filePath)) {
      this.api = new Openapi(fs.readFileSync(filePath, 'utf8'));
    } else {
      this.api = new Openapi();
      this.api.title = 'New API';
      this.api.version = '1.0.0';
    }
  }

  validate(): boolean {
    const result = this.api.validate();

    if (!result.valid) {
      console.error('❌ Validation failed:');
      result.errors.forEach((error, index) => {
        console.error(`  ${index + 1}. [${error.code}] ${error.path}: ${error.message}`);
      });
      return false;
    }

    console.log('✅ Document is valid');
    return true;
  }

  save(filePath: string): boolean {
    // Validate before saving
    if (!this.validate()) {
      console.error('Cannot save invalid document');
      return false;
    }

    try {
      fs.writeFileSync(filePath, this.api.getDefinition('prettyjson'));
      console.log(`✅ Saved to ${filePath}`);
      return true;
    } catch (error) {
      console.error('Failed to save:', error);
      return false;
    }
  }

  getAPI(): Openapi {
    return this.api;
  }
}

// Usage
const manager = new APIDocumentManager('api-spec.json');

// Make changes
const api = manager.getAPI();
api.appendPath('/users', {
  get: {
    summary: 'List users',
    responses: { '200': { description: 'Success' } },
  },
});

// Validate and save
if (manager.validate()) {
  manager.save('api-spec-updated.json');
}
```

---

## Extensions

### Working with Extension Properties

OpenAPI allows custom extension properties (also called vendor extensions) that start with `x-`. These extensions let you add custom metadata to your API specification without breaking compatibility.

**What are Extensions?**

Extensions are custom properties that:

- Start with `x-` (e.g., `x-custom-field`, `x-internal-id`)
- Can be added at various levels (root, info, paths, operations, etc.)
- Are ignored by standard OpenAPI tools but can be used by custom tooling
- Allow you to store application-specific metadata

---

### Root-Level Extensions

Root-level extensions are added to the top level of the OpenAPI document.

**Getting Root Extensions:**

```typescript
import { Openapi } from '@laag/openapi';
import fs from 'fs';

const api = new Openapi(fs.readFileSync('api-spec.json', 'utf8'));

// Get all root-level extensions
const rootExts = api.rootExtensions;
console.log('Root extensions:', rootExts);
```

**Setting Root Extensions:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();
api.title = 'My API';
api.version = '1.0.0';

// Set root-level extensions
api.rootExtensions = {
  'x-api-id': 'api-12345',
  'x-internal-version': '2.1.0',
  'x-team': 'platform-team',
  'x-tags': ['public', 'rest', 'v1'],
};

console.log(api.getDefinition('prettyjson'));
```

**Output:**

```json
{
  "openapi": "3.0.2",
  "info": {
    "title": "My API",
    "version": "1.0.0"
  },
  "paths": {},
  "x-api-id": "api-12345",
  "x-internal-version": "2.1.0",
  "x-team": "platform-team",
  "x-tags": ["public", "rest", "v1"]
}
```

**Appending Root Extensions:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();
api.title = 'My API';
api.version = '1.0.0';

// Append individual extensions
api.appendRootExtension('x-api-id', 'api-12345');
api.appendRootExtension('x-environment', 'production');
api.appendRootExtension('x-rate-limit', {
  requests: 1000,
  period: '1h',
});

console.log('Root extensions:', api.rootExtensions);
```

---

### Info-Level Extensions

Info-level extensions are added to the info object.

**Getting Info Extensions:**

```typescript
import { Openapi } from '@laag/openapi';
import fs from 'fs';

const api = new Openapi(fs.readFileSync('api-spec.json', 'utf8'));

// Get all info-level extensions
const infoExts = api.infoExtensions;
console.log('Info extensions:', infoExts);
```

**Setting Info Extensions:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();
api.title = 'My API';
api.version = '1.0.0';

// Set info-level extensions
api.infoExtensions = {
  'x-logo': {
    url: 'https://example.com/logo.png',
    backgroundColor: '#FFFFFF',
  },
  'x-audience': 'external',
  'x-lifecycle-stage': 'production',
};

console.log(api.info);
```

**Output:**

```json
{
  "title": "My API",
  "version": "1.0.0",
  "x-logo": {
    "url": "https://example.com/logo.png",
    "backgroundColor": "#FFFFFF"
  },
  "x-audience": "external",
  "x-lifecycle-stage": "production"
}
```

**Appending Info Extensions:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();
api.title = 'My API';
api.version = '1.0.0';

// Append individual info extensions
api.appendInfoExtension('x-logo', {
  url: 'https://example.com/logo.png',
});
api.appendInfoExtension('x-api-category', 'data-services');
api.appendInfoExtension('x-support-url', 'https://support.example.com');

console.log('Info extensions:', api.infoExtensions);
```

---

### Path-Level Extensions

Path-level extensions are added to the paths object.

**Getting Paths Extensions:**

```typescript
import { Openapi } from '@laag/openapi';
import fs from 'fs';

const api = new Openapi(fs.readFileSync('api-spec.json', 'utf8'));

// Get all paths-level extensions
const pathsExts = api.pathsExtensions;
console.log('Paths extensions:', pathsExts);
```

**Setting Paths Extensions:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();
api.title = 'My API';
api.version = '1.0.0';

// Set paths-level extensions
api.pathsExtensions = {
  'x-path-prefix': '/api/v1',
  'x-common-parameters': ['api-key', 'correlation-id'],
};

console.log(api.paths);
```

**Appending Paths Extensions:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();
api.title = 'My API';
api.version = '1.0.0';

// Append individual paths extensions
api.appendPathsExtension('x-base-path', '/api/v1');
api.appendPathsExtension('x-rate-limit-scope', 'global');

console.log('Paths extensions:', api.pathsExtensions);
```

**Adding Extensions to Individual Paths:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();
api.title = 'My API';
api.version = '1.0.0';

// Add a path with extensions
api.appendPath('/users', {
  'x-internal-name': 'user-management',
  'x-rate-limit': {
    requests: 100,
    period: '1m',
  },
  get: {
    summary: 'List users',
    'x-cache-ttl': 300,
    'x-requires-auth': true,
    responses: {
      '200': { description: 'Success' },
    },
  },
});

const userPath = api.getPath('/users');
console.log('Path extensions:', {
  internalName: userPath['x-internal-name'],
  rateLimit: userPath['x-rate-limit'],
});
```

**Common Extension Use Cases:**

**1. API Documentation Customization:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();
api.title = 'My API';
api.version = '1.0.0';

// Add logo and branding
api.appendInfoExtension('x-logo', {
  url: 'https://example.com/logo.png',
  backgroundColor: '#FFFFFF',
  altText: 'Company Logo',
});

// Add custom documentation sections
api.appendRootExtension('x-documentation', {
  gettingStarted: 'https://docs.example.com/getting-started',
  tutorials: 'https://docs.example.com/tutorials',
  faq: 'https://docs.example.com/faq',
});
```

**2. Internal Metadata:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();
api.title = 'My API';
api.version = '1.0.0';

// Add internal tracking information
api.appendRootExtension('x-internal', {
  owner: 'platform-team',
  repository: 'https://github.com/company/api',
  jiraProject: 'PLAT',
  slackChannel: '#platform-api',
});

// Add deployment information
api.appendRootExtension('x-deployment', {
  environment: 'production',
  region: 'us-east-1',
  lastDeployed: '2024-01-15T10:30:00Z',
});
```

**3. Rate Limiting Configuration:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();
api.title = 'My API';
api.version = '1.0.0';

// Global rate limit
api.appendRootExtension('x-rate-limit', {
  default: {
    requests: 1000,
    period: '1h',
  },
  authenticated: {
    requests: 5000,
    period: '1h',
  },
});

// Per-operation rate limit
api.appendPath('/expensive-operation', {
  post: {
    summary: 'Expensive operation',
    'x-rate-limit': {
      requests: 10,
      period: '1h',
    },
    responses: {
      '200': { description: 'Success' },
    },
  },
});
```

**4. Code Generation Hints:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();
api.title = 'My API';
api.version = '1.0.0';

// Add code generation hints
api.appendPath('/users', {
  get: {
    summary: 'List users',
    operationId: 'listUsers',
    'x-codegen': {
      className: 'UserService',
      methodName: 'getAllUsers',
      returnType: 'List<User>',
    },
    responses: {
      '200': { description: 'Success' },
    },
  },
});
```

**5. Feature Flags:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();
api.title = 'My API';
api.version = '1.0.0';

// Mark experimental features
api.appendPath('/beta-feature', {
  'x-experimental': true,
  'x-feature-flag': 'enable-beta-features',
  get: {
    summary: 'Beta feature',
    'x-stability': 'experimental',
    responses: {
      '200': { description: 'Success' },
    },
  },
});
```

**Reading Extensions from Loaded Documents:**

```typescript
import { Openapi } from '@laag/openapi';
import fs from 'fs';

const api = new Openapi(fs.readFileSync('api-spec.json', 'utf8'));

// Read root extensions
const apiId = api.rootExtensions?.['x-api-id'];
const team = api.rootExtensions?.['x-team'];
console.log(`API ID: ${apiId}, Team: ${team}`);

// Read info extensions
const logo = api.infoExtensions?.['x-logo'];
if (logo) {
  console.log(`Logo URL: ${logo.url}`);
}

// Read path extensions
api.getPathNames().forEach(pathName => {
  const pathItem = api.getPath(pathName);
  const rateLimit = pathItem['x-rate-limit'];
  if (rateLimit) {
    console.log(`${pathName} rate limit: ${rateLimit.requests}/${rateLimit.period}`);
  }
});
```

**Best Practices for Extensions:**

1. **Use Descriptive Names**: Choose clear, descriptive names for your extensions
2. **Document Your Extensions**: Keep a record of what each extension means
3. **Be Consistent**: Use the same extension names across your APIs
4. **Namespace Your Extensions**: Consider prefixing with your organization (e.g., `x-acme-feature`)
5. **Don't Overuse**: Only add extensions when necessary
6. **Validate Extension Values**: Ensure extension values are valid and well-structured

---

## Sample and Code Generation

### Generating JSON Samples

The `@laag/openapi` package can generate sample JSON data based on your schema definitions. This is useful for documentation, testing, and client development.

**Generating Request Samples:**

```typescript
import { Openapi } from '@laag/openapi';
import fs from 'fs';

const api = new Openapi(fs.readFileSync('api-spec.json', 'utf8'));

// Generate a sample request body for a POST operation
const sample = api.generateJsonSample('/users', 'post', 'request');

console.log('Sample Request:');
console.log(JSON.stringify(sample, null, 2));
```

**Example Output:**

```json
{
  "username": "string",
  "email": "user@example.com",
  "password": "string",
  "age": 0
}
```

**Generating Response Samples:**

```typescript
import { Openapi } from '@laag/openapi';
import fs from 'fs';

const api = new Openapi(fs.readFileSync('api-spec.json', 'utf8'));

// Generate a sample response for a GET operation
const sample = api.generateJsonSample('/users/{userId}', 'get', 'response', '200');

console.log('Sample Response:');
console.log(JSON.stringify(sample, null, 2));
```

**Example Output:**

```json
{
  "id": "string",
  "username": "string",
  "email": "user@example.com",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

**Generating Samples for Different Status Codes:**

```typescript
import { Openapi } from '@laag/openapi';
import fs from 'fs';

const api = new Openapi(fs.readFileSync('api-spec.json', 'utf8'));

const pathName = '/users';
const method = 'post';

// Get all status codes for this operation
const statusCodes = api.getStatusCodes(pathName, method);

console.log(`Sample responses for ${method.toUpperCase()} ${pathName}:\n`);

statusCodes.forEach(statusCode => {
  const sample = api.generateJsonSample(pathName, method, 'response', statusCode);
  console.log(`Status ${statusCode}:`);
  console.log(JSON.stringify(sample, null, 2));
  console.log('');
});
```

**Generating Samples from Schema References:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();
api.title = 'My API';
api.version = '1.0.0';

// Define a schema with examples
if (!api.components) api.components = {};
if (!api.components.schemas) api.components.schemas = {};

api.components.schemas['User'] = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
      example: '123e4567-e89b-12d3-a456-426614174000',
    },
    name: {
      type: 'string',
      example: 'John Doe',
    },
    email: {
      type: 'string',
      format: 'email',
      example: 'john.doe@example.com',
    },
  },
};

// Use the schema in an operation
api.appendPath('/users/{userId}', {
  get: {
    summary: 'Get user',
    responses: {
      '200': {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/User',
            },
          },
        },
      },
    },
  },
});

// Generate sample (will use the examples from the schema)
const sample = api.generateJsonSample('/users/{userId}', 'get', 'response', '200');
console.log(JSON.stringify(sample, null, 2));
```

---

### Generating cURL Commands

Generate cURL commands for testing your API endpoints.

**Basic cURL Generation:**

```typescript
import { Openapi } from '@laag/openapi';
import fs from 'fs';

const api = new Openapi(fs.readFileSync('api-spec.json', 'utf8'));

// Generate cURL command for a GET request
const curlCommand = api.getCurlCommands('/users', 'get');

console.log('cURL Command:');
console.log(curlCommand);
```

**Example Output:**

```bash
curl -X GET "https://api.example.com/users" \
  -H "Accept: application/json"
```

**cURL with Path Parameters:**

```typescript
import { Openapi } from '@laag/openapi';
import fs from 'fs';

const api = new Openapi(fs.readFileSync('api-spec.json', 'utf8'));

// Generate cURL command with path parameters
const curlCommand = api.getCurlCommands('/users/{userId}', 'get');

console.log(curlCommand);
```

**Example Output:**

```bash
curl -X GET "https://api.example.com/users/{userId}" \
  -H "Accept: application/json"
```

**cURL with Request Body:**

```typescript
import { Openapi } from '@laag/openapi';
import fs from 'fs';

const api = new Openapi(fs.readFileSync('api-spec.json', 'utf8'));

// Generate cURL command for POST with body
const curlCommand = api.getCurlCommands('/users', 'post');

console.log(curlCommand);
```

**Example Output:**

```bash
curl -X POST "https://api.example.com/users" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "username": "string",
    "email": "user@example.com",
    "password": "string"
  }'
```

**Generating cURL for All Operations:**

```typescript
import { Openapi } from '@laag/openapi';
import fs from 'fs';

const api = new Openapi(fs.readFileSync('api-spec.json', 'utf8'));

console.log('cURL Commands for All Operations:\n');
console.log('='.repeat(60));

api.getPathNames().forEach(pathName => {
  const methods = api.getAllHttpMethods(pathName);

  methods.forEach(method => {
    console.log(`\n${method.toUpperCase()} ${pathName}`);
    console.log('-'.repeat(60));
    const curlCommand = api.getCurlCommands(pathName, method);
    console.log(curlCommand);
  });
});
```

---

### Generating Python Code

Generate Python code snippets for calling your API.

**Basic Python Code Generation:**

```typescript
import { Openapi } from '@laag/openapi';
import fs from 'fs';

const api = new Openapi(fs.readFileSync('api-spec.json', 'utf8'));

// Generate Python code for a GET request
const pythonCode = api.getPythonCode('/users', 'get');

console.log('Python Code:');
console.log(pythonCode);
```

**Example Output:**

```python
import requests

url = "https://api.example.com/users"
headers = {
    "Accept": "application/json"
}

response = requests.get(url, headers=headers)
print(response.json())
```

**Python Code with Request Body:**

```typescript
import { Openapi } from '@laag/openapi';
import fs from 'fs';

const api = new Openapi(fs.readFileSync('api-spec.json', 'utf8'));

// Generate Python code for POST with body
const pythonCode = api.getPythonCode('/users', 'post');

console.log(pythonCode);
```

**Example Output:**

```python
import requests

url = "https://api.example.com/users"
headers = {
    "Content-Type": "application/json",
    "Accept": "application/json"
}
data = {
    "username": "string",
    "email": "user@example.com",
    "password": "string"
}

response = requests.post(url, headers=headers, json=data)
print(response.json())
```

---

### Generating JavaScript Code

Generate JavaScript code snippets using the Fetch API.

**Basic JavaScript Code Generation:**

```typescript
import { Openapi } from '@laag/openapi';
import fs from 'fs';

const api = new Openapi(fs.readFileSync('api-spec.json', 'utf8'));

// Generate JavaScript code for a GET request
const jsCode = api.getJavaScriptCode('/users', 'get');

console.log('JavaScript Code:');
console.log(jsCode);
```

**Example Output:**

```javascript
fetch('https://api.example.com/users', {
  method: 'GET',
  headers: {
    Accept: 'application/json',
  },
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

**JavaScript Code with Request Body:**

```typescript
import { Openapi } from '@laag/openapi';
import fs from 'fs';

const api = new Openapi(fs.readFileSync('api-spec.json', 'utf8'));

// Generate JavaScript code for POST with body
const jsCode = api.getJavaScriptCode('/users', 'post');

console.log(jsCode);
```

**Example Output:**

```javascript
fetch('https://api.example.com/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  body: JSON.stringify({
    username: 'string',
    email: 'user@example.com',
    password: 'string',
  }),
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

---

### Generating TypeScript Code

Generate TypeScript code snippets with type definitions.

**Basic TypeScript Code Generation:**

```typescript
import { Openapi } from '@laag/openapi';
import fs from 'fs';

const api = new Openapi(fs.readFileSync('api-spec.json', 'utf8'));

// Generate TypeScript code for a GET request
const tsCode = api.getTypeScriptCode('/users', 'get');

console.log('TypeScript Code:');
console.log(tsCode);
```

**Example Output:**

```typescript
interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
}

async function getUsers(): Promise<User[]> {
  const response = await fetch('https://api.example.com/users', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

// Usage
getUsers()
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

**TypeScript Code with Request Body:**

```typescript
import { Openapi } from '@laag/openapi';
import fs from 'fs';

const api = new Openapi(fs.readFileSync('api-spec.json', 'utf8'));

// Generate TypeScript code for POST with body
const tsCode = api.getTypeScriptCode('/users', 'post');

console.log(tsCode);
```

**Example Output:**

```typescript
interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
}

interface User {
  id: string;
  username: string;
  email: string;
}

async function createUser(data: CreateUserRequest): Promise<User> {
  const response = await fetch('https://api.example.com/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

// Usage
createUser({
  username: 'johndoe',
  email: 'john@example.com',
  password: 'securepassword',
})
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

**Generating Code for All Operations:**

```typescript
import { Openapi } from '@laag/openapi';
import fs from 'fs';

const api = new Openapi(fs.readFileSync('api-spec.json', 'utf8'));

// Generate a complete client library
console.log('// API Client Library\n');

api.getPathNames().forEach(pathName => {
  const methods = api.getAllHttpMethods(pathName);

  methods.forEach(method => {
    const operationId = api.getOperationId(pathName, method);
    console.log(`\n// ${operationId}`);
    console.log('// ' + '='.repeat(50));

    const tsCode = api.getTypeScriptCode(pathName, method);
    console.log(tsCode);
    console.log('\n');
  });
});
```

**Saving Generated Code to Files:**

```typescript
import { Openapi } from '@laag/openapi';
import fs from 'fs';
import path from 'path';

const api = new Openapi(fs.readFileSync('api-spec.json', 'utf8'));

// Create output directory
const outputDir = './generated-code';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generate code for each operation
api.getPathNames().forEach(pathName => {
  const methods = api.getAllHttpMethods(pathName);

  methods.forEach(method => {
    const operationId = api.getOperationId(pathName, method);

    // Generate TypeScript code
    const tsCode = api.getTypeScriptCode(pathName, method);
    const tsFile = path.join(outputDir, `${operationId}.ts`);
    fs.writeFileSync(tsFile, tsCode);

    // Generate Python code
    const pyCode = api.getPythonCode(pathName, method);
    const pyFile = path.join(outputDir, `${operationId}.py`);
    fs.writeFileSync(pyFile, pyCode);

    // Generate cURL command
    const curlCode = api.getCurlCommands(pathName, method);
    const curlFile = path.join(outputDir, `${operationId}.sh`);
    fs.writeFileSync(curlFile, curlCode);

    console.log(`Generated code for ${operationId}`);
  });
});

console.log(`\nAll code generated in ${outputDir}/`);
```

---

## Advanced Features

### Working with Multiple Servers

OpenAPI 3.0 supports defining multiple servers for different environments or regions.

**Defining Multiple Servers:**

```typescript
import { Openapi } from '@laag/openapi';
import type { ServerObject } from '@laag/openapi';

const api = new Openapi();
api.title = 'Multi-Environment API';
api.version = '1.0.0';

// Define servers for different environments
const servers: ServerObject[] = [
  {
    url: 'https://api.example.com/v1',
    description: 'Production server',
  },
  {
    url: 'https://staging-api.example.com/v1',
    description: 'Staging server for testing',
  },
  {
    url: 'https://dev-api.example.com/v1',
    description: 'Development server',
  },
  {
    url: 'http://localhost:3000/v1',
    description: 'Local development server',
  },
];

api.servers = servers;

console.log(`Configured ${api.servers.length} servers`);
```

**Servers with Variables:**

```typescript
import { Openapi } from '@laag/openapi';
import type { ServerObject } from '@laag/openapi';

const api = new Openapi();
api.title = 'Configurable API';
api.version = '1.0.0';

// Server with configurable environment and region
const configurableServer: ServerObject = {
  url: 'https://{environment}.{region}.example.com/v1',
  description: 'Configurable server',
  variables: {
    environment: {
      default: 'api',
      enum: ['api', 'staging', 'dev'],
      description: 'Server environment',
    },
    region: {
      default: 'us-east-1',
      enum: ['us-east-1', 'us-west-2', 'eu-west-1', 'ap-southeast-1'],
      description: 'AWS region',
    },
  },
};

api.appendServer(configurableServer);

// Server with port variable
const portServer: ServerObject = {
  url: 'https://api.example.com:{port}/v1',
  description: 'Server with configurable port',
  variables: {
    port: {
      default: '443',
      enum: ['443', '8443'],
      description: 'HTTPS port',
    },
  },
};

api.appendServer(portServer);
```

**Path-Specific Servers:**

```typescript
import { Openapi } from '@laag/openapi';
import type { ServerObject } from '@laag/openapi';

const api = new Openapi();
api.title = 'API with Path-Specific Servers';
api.version = '1.0.0';

// Global servers
api.appendServer({
  url: 'https://api.example.com',
  description: 'Main API server',
});

// Path with its own servers (overrides global servers)
api.appendPath('/legacy-endpoint', {
  servers: [
    {
      url: 'https://legacy-api.example.com',
      description: 'Legacy API server',
    },
  ],
  get: {
    summary: 'Legacy endpoint',
    responses: {
      '200': { description: 'Success' },
    },
  },
});

// Path using global servers
api.appendPath('/users', {
  get: {
    summary: 'List users',
    responses: {
      '200': { description: 'Success' },
    },
  },
});
```

**Operation-Specific Servers:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();
api.title = 'API with Operation-Specific Servers';
api.version = '1.0.0';

api.appendServer({
  url: 'https://api.example.com',
  description: 'Main server',
});

api.appendPath('/files', {
  get: {
    summary: 'List files',
    responses: {
      '200': { description: 'Success' },
    },
  },
  post: {
    summary: 'Upload file',
    // This operation uses a different server
    servers: [
      {
        url: 'https://upload.example.com',
        description: 'File upload server',
      },
    ],
    responses: {
      '201': { description: 'File uploaded' },
    },
  },
});
```

---

### Security Schemes

Define authentication and authorization mechanisms for your API.

**API Key Security:**

```typescript
import { Openapi } from '@laag/openapi';
import type { SecuritySchemeObject } from '@laag/openapi';

const api = new Openapi();
api.title = 'Secured API';
api.version = '1.0.0';

// Initialize components
if (!api.components) api.components = {};
if (!api.components.securitySchemes) api.components.securitySchemes = {};

// Define API key security scheme
const apiKeyScheme: SecuritySchemeObject = {
  type: 'apiKey',
  name: 'X-API-Key',
  in: 'header',
  description: 'API key for authentication',
};

api.components.securitySchemes['ApiKeyAuth'] = apiKeyScheme;

// Apply security globally
api.doc.security = [{ ApiKeyAuth: [] }];

// Add a secured endpoint
api.appendPath('/users', {
  get: {
    summary: 'List users (requires API key)',
    responses: {
      '200': { description: 'Success' },
      '401': { description: 'Unauthorized' },
    },
  },
});
```

**Bearer Token (JWT) Security:**

```typescript
import { Openapi } from '@laag/openapi';
import type { SecuritySchemeObject } from '@laag/openapi';

const api = new Openapi();
api.title = 'JWT Secured API';
api.version = '1.0.0';

if (!api.components) api.components = {};
if (!api.components.securitySchemes) api.components.securitySchemes = {};

// Define Bearer token security scheme
const bearerScheme: SecuritySchemeObject = {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'JWT',
  description: 'JWT token authentication',
};

api.components.securitySchemes['BearerAuth'] = bearerScheme;

// Apply security globally
api.doc.security = [{ BearerAuth: [] }];
```

**OAuth2 Security:**

```typescript
import { Openapi } from '@laag/openapi';
import type { SecuritySchemeObject } from '@laag/openapi';

const api = new Openapi();
api.title = 'OAuth2 Secured API';
api.version = '1.0.0';

if (!api.components) api.components = {};
if (!api.components.securitySchemes) api.components.securitySchemes = {};

// Define OAuth2 security scheme
const oauth2Scheme: SecuritySchemeObject = {
  type: 'oauth2',
  description: 'OAuth2 authentication',
  flows: {
    authorizationCode: {
      authorizationUrl: 'https://auth.example.com/oauth/authorize',
      tokenUrl: 'https://auth.example.com/oauth/token',
      scopes: {
        'read:users': 'Read user information',
        'write:users': 'Modify user information',
        admin: 'Administrative access',
      },
    },
    clientCredentials: {
      tokenUrl: 'https://auth.example.com/oauth/token',
      scopes: {
        'api:access': 'API access',
      },
    },
  },
};

api.components.securitySchemes['OAuth2'] = oauth2Scheme;

// Apply security with specific scopes
api.doc.security = [{ OAuth2: ['read:users'] }];

// Operation with different scopes
api.appendPath('/users', {
  post: {
    summary: 'Create user',
    security: [{ OAuth2: ['write:users'] }],
    responses: {
      '201': { description: 'Created' },
    },
  },
});
```

**Multiple Security Schemes:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();
api.title = 'Multi-Auth API';
api.version = '1.0.0';

if (!api.components) api.components = {};
if (!api.components.securitySchemes) api.components.securitySchemes = {};

// Define multiple security schemes
api.components.securitySchemes['ApiKeyAuth'] = {
  type: 'apiKey',
  name: 'X-API-Key',
  in: 'header',
};

api.components.securitySchemes['BearerAuth'] = {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'JWT',
};

// Require either API key OR bearer token
api.doc.security = [{ ApiKeyAuth: [] }, { BearerAuth: [] }];

// Operation requiring both (AND)
api.appendPath('/admin', {
  get: {
    summary: 'Admin endpoint',
    security: [
      {
        ApiKeyAuth: [],
        BearerAuth: [],
      },
    ],
    responses: {
      '200': { description: 'Success' },
    },
  },
});

// Public endpoint (no security)
api.appendPath('/public', {
  get: {
    summary: 'Public endpoint',
    security: [], // Empty array means no security required
    responses: {
      '200': { description: 'Success' },
    },
  },
});
```

---

### Callbacks

Callbacks describe asynchronous, out-of-band requests that your API will make to the client.

**Defining a Callback:**

```typescript
import { Openapi } from '@laag/openapi';
import type { CallbackObject } from '@laag/openapi';

const api = new Openapi();
api.title = 'Webhook API';
api.version = '1.0.0';

// Define a callback for webhook notifications
const webhookCallback: CallbackObject = {
  '{$request.body#/callbackUrl}': {
    post: {
      summary: 'Webhook notification',
      description: 'Notification sent when order status changes',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                orderId: { type: 'string' },
                status: { type: 'string' },
                timestamp: { type: 'string', format: 'date-time' },
              },
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Webhook received successfully',
        },
      },
    },
  },
};

// Add operation with callback
api.appendPath('/orders', {
  post: {
    summary: 'Create order',
    description: 'Creates an order and registers a webhook for status updates',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['items', 'callbackUrl'],
            properties: {
              items: {
                type: 'array',
                items: { type: 'object' },
              },
              callbackUrl: {
                type: 'string',
                format: 'uri',
                description: 'URL to receive webhook notifications',
              },
            },
          },
        },
      },
    },
    responses: {
      '201': {
        description: 'Order created',
      },
    },
    callbacks: {
      orderStatusChanged: webhookCallback,
    },
  },
});
```

---

### Links

Links describe how values from one operation can be used as input to other operations.

**Defining Links:**

```typescript
import { Openapi } from '@laag/openapi';
import type { LinkObject } from '@laag/openapi';

const api = new Openapi();
api.title = 'Linked Operations API';
api.version = '1.0.0';

// Create user operation
api.appendPath('/users', {
  post: {
    summary: 'Create user',
    operationId: 'createUser',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              username: { type: 'string' },
              email: { type: 'string' },
            },
          },
        },
      },
    },
    responses: {
      '201': {
        description: 'User created',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                username: { type: 'string' },
              },
            },
          },
        },
        links: {
          GetUserById: {
            operationId: 'getUserById',
            parameters: {
              userId: '$response.body#/id',
            },
            description: 'Get the created user by ID',
          },
          UpdateUser: {
            operationId: 'updateUser',
            parameters: {
              userId: '$response.body#/id',
            },
            description: 'Update the created user',
          },
        },
      },
    },
  },
});

// Get user operation (linked from create)
api.appendPath('/users/{userId}', {
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
      },
    },
  },
  put: {
    summary: 'Update user',
    operationId: 'updateUser',
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
        description: 'User updated',
      },
    },
  },
});
```

**Links with Request Body:**

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();
api.title = 'Order Processing API';
api.version = '1.0.0';

api.appendPath('/orders', {
  post: {
    summary: 'Create order',
    operationId: 'createOrder',
    responses: {
      '201': {
        description: 'Order created',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                orderId: { type: 'string' },
                status: { type: 'string' },
              },
            },
          },
        },
        links: {
          GetOrder: {
            operationId: 'getOrder',
            parameters: {
              orderId: '$response.body#/orderId',
            },
          },
          CancelOrder: {
            operationId: 'cancelOrder',
            parameters: {
              orderId: '$response.body#/orderId',
            },
          },
          PayOrder: {
            operationRef: '#/paths/~1orders~1{orderId}~1payment/post',
            parameters: {
              orderId: '$response.body#/orderId',
            },
          },
        },
      },
    },
  },
});

api.appendPath('/orders/{orderId}', {
  get: {
    summary: 'Get order',
    operationId: 'getOrder',
    parameters: [
      {
        name: 'orderId',
        in: 'path',
        required: true,
        schema: { type: 'string' },
      },
    ],
    responses: {
      '200': { description: 'Order found' },
    },
  },
  delete: {
    summary: 'Cancel order',
    operationId: 'cancelOrder',
    parameters: [
      {
        name: 'orderId',
        in: 'path',
        required: true,
        schema: { type: 'string' },
      },
    ],
    responses: {
      '204': { description: 'Order cancelled' },
    },
  },
});

api.appendPath('/orders/{orderId}/payment', {
  post: {
    summary: 'Pay for order',
    parameters: [
      {
        name: 'orderId',
        in: 'path',
        required: true,
        schema: { type: 'string' },
      },
    ],
    responses: {
      '200': { description: 'Payment processed' },
    },
  },
});
```

---

## Format Comparison

### OpenAPI-Specific Features

OpenAPI 3.0 has several features that distinguish it from other API specification formats.

**1. Multiple Servers**

OpenAPI 3.0 supports defining multiple servers with variables, allowing you to specify different environments and configurations:

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();
api.title = 'Multi-Server API';
api.version = '1.0.0';

// Multiple servers with variables
api.appendServer({
  url: 'https://{environment}.example.com/v1',
  description: 'Configurable environment',
  variables: {
    environment: {
      default: 'api',
      enum: ['api', 'staging', 'dev'],
    },
  },
});
```

**2. Components and Reusability**

OpenAPI 3.0 has a comprehensive components section for reusable objects:

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();

if (!api.components) api.components = {};

// Reusable schemas
api.components.schemas = {
  /* ... */
};

// Reusable responses
api.components.responses = {
  /* ... */
};

// Reusable parameters
api.components.parameters = {
  /* ... */
};

// Reusable request bodies
api.components.requestBodies = {
  /* ... */
};

// Reusable headers
api.components.headers = {
  /* ... */
};

// Security schemes
api.components.securitySchemes = {
  /* ... */
};

// Links
api.components.links = {
  /* ... */
};

// Callbacks
api.components.callbacks = {
  /* ... */
};
```

**3. Request Body Object**

OpenAPI 3.0 has a dedicated `requestBody` object (separate from parameters):

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();

api.appendPath('/users', {
  post: {
    summary: 'Create user',
    requestBody: {
      required: true,
      description: 'User data',
      content: {
        'application/json': {
          schema: { type: 'object' },
        },
        'application/xml': {
          schema: { type: 'object' },
        },
      },
    },
    responses: {
      '201': { description: 'Created' },
    },
  },
});
```

**4. Content Negotiation**

OpenAPI 3.0 supports multiple content types for requests and responses:

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();

api.appendPath('/data', {
  get: {
    summary: 'Get data',
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
          'text/csv': {
            schema: { type: 'string' },
          },
        },
      },
    },
  },
});
```

**5. Callbacks**

OpenAPI 3.0 supports callback definitions for asynchronous operations:

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();

api.appendPath('/subscribe', {
  post: {
    summary: 'Subscribe to events',
    callbacks: {
      onEvent: {
        '{$request.body#/callbackUrl}': {
          post: {
            summary: 'Event notification',
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: { type: 'object' },
                },
              },
            },
            responses: {
              '200': { description: 'Acknowledged' },
            },
          },
        },
      },
    },
    responses: {
      '201': { description: 'Subscribed' },
    },
  },
});
```

**6. Links**

OpenAPI 3.0 supports links between operations:

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();

api.appendPath('/users', {
  post: {
    summary: 'Create user',
    operationId: 'createUser',
    responses: {
      '201': {
        description: 'User created',
        links: {
          GetUserById: {
            operationId: 'getUserById',
            parameters: {
              userId: '$response.body#/id',
            },
          },
        },
      },
    },
  },
});
```

**7. Schema Composition**

OpenAPI 3.0 supports advanced schema composition with `allOf`, `oneOf`, and `anyOf`:

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi();

if (!api.components) api.components = {};
if (!api.components.schemas) api.components.schemas = {};

// Inheritance with allOf
api.components.schemas['Pet'] = {
  type: 'object',
  properties: {
    name: { type: 'string' },
  },
};

api.components.schemas['Dog'] = {
  allOf: [
    { $ref: '#/components/schemas/Pet' },
    {
      type: 'object',
      properties: {
        breed: { type: 'string' },
      },
    },
  ],
};

// Polymorphism with oneOf
api.components.schemas['Payment'] = {
  oneOf: [{ $ref: '#/components/schemas/CreditCard' }, { $ref: '#/components/schemas/PayPal' }],
  discriminator: {
    propertyName: 'paymentType',
  },
};
```

---

### Comparison with RAML

While both OpenAPI and RAML are API specification formats, they have different approaches and features.

**Similarities:**

1. **Purpose**: Both describe RESTful APIs
2. **Structure**: Both organize APIs by paths/resources and operations/methods
3. **Reusability**: Both support reusable components/types
4. **Documentation**: Both can be used to generate documentation
5. **Validation**: Both support schema validation

**Key Differences:**

**1. Format**

- **OpenAPI**: Primarily JSON-based (also supports YAML)
- **RAML**: Primarily YAML-based

```typescript
// OpenAPI approach
import { Openapi } from '@laag/openapi';

const api = new Openapi({
  openapi: '3.0.2',
  info: { title: 'My API', version: '1.0.0' },
  paths: {},
});
```

```yaml
# RAML approach
#%RAML 1.0
title: My API
version: 1.0.0
```

**2. Specification Structure**

- **OpenAPI**: Uses `paths` object with HTTP methods as properties
- **RAML**: Uses resource hierarchy with methods as nested elements

**3. Type System**

- **OpenAPI**: Uses JSON Schema for data types
- **RAML**: Has its own type system (RAML Types)

**4. Inheritance**

- **OpenAPI**: Uses `allOf`, `oneOf`, `anyOf` for composition
- **RAML**: Has built-in type inheritance

**5. Traits and Resource Types**

- **OpenAPI**: No direct equivalent (uses components and references)
- **RAML**: Has traits and resource types for reusability

**6. Tooling Ecosystem**

- **OpenAPI**: Larger ecosystem with more tools (Swagger UI, Swagger Editor, etc.)
- **RAML**: Smaller but focused ecosystem

**When to Use OpenAPI:**

- You need broad tool support and ecosystem
- You're working with JSON-first APIs
- You need advanced features like callbacks and links
- You want industry-standard specification
- You're integrating with cloud platforms (AWS, Azure, etc.)

**When to Use RAML:**

- You prefer YAML-first approach
- You want built-in inheritance and traits
- You're already invested in the RAML ecosystem
- You prefer RAML's type system

**Migration Considerations:**

If you're migrating from RAML to OpenAPI or vice versa:

1. **Schema Conversion**: Convert between JSON Schema and RAML Types
2. **Structure Mapping**: Map RAML resources to OpenAPI paths
3. **Reusability**: Convert RAML traits/resource types to OpenAPI components
4. **Documentation**: Update documentation generation tools
5. **Validation**: Update validation tools and processes

**Using Both with laag:**

The `@laag` library ecosystem supports both formats:

```typescript
// OpenAPI
import { Openapi } from '@laag/openapi';
const openapiDoc = new Openapi();

// RAML (when implemented)
// import { Raml } from '@laag/raml';
// const ramlDoc = new Raml();
```

Both packages share a common base class (`LaagBase`) and provide similar APIs, making it easier to work with multiple formats in the same project.

---

## Conclusion

This usage guide has covered the essential features and patterns for working with OpenAPI documents using the `@laag/openapi` package. You've learned how to:

- Create, read, and modify OpenAPI documents
- Work with paths, operations, and components
- Validate documents and handle errors
- Use extension properties for custom metadata
- Generate samples and code
- Implement advanced features like security, callbacks, and links

For more detailed API reference information, see the [API Reference documentation](./API_REFERENCE_OPENAPI.md).

For questions, issues, or contributions, visit the [GitHub repository](https://github.com/bschwarz/laag).

---
