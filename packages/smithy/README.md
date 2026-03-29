# @laag/smithy

A modern TypeScript library for working with [AWS Smithy](https://smithy.io/) models. Provides comprehensive support for reading, writing, validating, and manipulating Smithy IDL documents with full type safety and code generation capabilities.

## Features

- 🔧 **Full TypeScript Support** - Complete type definitions for Smithy 2.0 specification
- 📦 **Multiple Module Formats** - ESM, CommonJS, and browser bundles
- ✅ **Model Validation** - Built-in validation according to Smithy specification
- 🚀 **High Performance** - Optimized for speed and memory efficiency
- 🎯 **Shape Management** - Comprehensive API for working with shapes, traits, and services
- 🔌 **Trait Support** - Full support for standard and custom traits
- 🛠️ **Code Generation** - Generate TypeScript, JavaScript, and Python code from models
- 🔍 **Selector Support** - Query shapes using Smithy selector syntax
- 🌐 **Cross-Platform** - Works in Node.js, browsers, and edge environments

## Installation

```bash
# Install with npm
npm install @laag/smithy @laag/core

# Install with yarn
yarn add @laag/smithy @laag/core

# Install with bun
bun add @laag/smithy @laag/core
```

## Quick Start

### ESM (Recommended)

```typescript
import { Smithy } from '@laag/smithy';

// Create from JSON object
const smithy = new Smithy({
  smithy: '2.0',
  shapes: {
    'example.weather#Weather': {
      type: 'service',
      version: '2006-03-01',
      operations: [{ target: 'example.weather#GetWeather' }],
    },
    'example.weather#GetWeather': {
      type: 'operation',
      input: { target: 'example.weather#GetWeatherInput' },
      output: { target: 'example.weather#GetWeatherOutput' },
    },
  },
});

console.log(smithy.version); // "2.0"
console.log(smithy.getServices().length); // 1
```

### CommonJS

```javascript
const { Smithy } = require('@laag/smithy');

const smithy = new Smithy({
  smithy: '2.0',
  shapes: {
    'example.weather#Weather': {
      type: 'service',
      version: '2006-03-01',
    },
  },
});
```

## Usage Examples

### Reading an Existing Model

```typescript
import { readFileSync } from 'fs';
import { Smithy } from '@laag/smithy';

// Load from JSON file
const jsonData = readFileSync('weather-service.json', 'utf8');
const smithy = new Smithy(jsonData);

console.log(`Model version: ${smithy.version}`);
console.log('Services:');
for (const service of smithy.getServices()) {
  console.log(`  ${service.version}`);
}

// Get all operations
const services = smithy.getServices();
for (const service of services) {
  const serviceId = Object.keys(smithy.shapes.entries()).find(
    ([_, shape]) => shape === service
  )?.[0];
  if (serviceId) {
    const operations = smithy.getOperations(serviceId);
    console.log(`Operations for ${serviceId}:`);
    for (const operation of operations) {
      console.log(`  ${operation.type}`);
    }
  }
}
```

**Output:**

```
Model version: 2.0
Services:
  2006-03-01
Operations for example.weather#Weather:
  operation
  operation
```

### Creating a New Model

```typescript
import { Smithy } from '@laag/smithy';
import type { SmithyModel, ServiceShape, OperationShape } from '@laag/smithy';

// Create empty model
const model: SmithyModel = {
  smithy: '2.0',
  metadata: {
    authors: ['api-team@company.com'],
  },
  shapes: {},
};

const smithy = new Smithy(model);

// Add a service
smithy.addShape('example.users#UserService', {
  type: 'service',
  version: '2023-01-01',
  operations: [{ target: 'example.users#GetUser' }, { target: 'example.users#CreateUser' }],
});

// Add operations
smithy.addShape('example.users#GetUser', {
  type: 'operation',
  input: { target: 'example.users#GetUserInput' },
  output: { target: 'example.users#GetUserOutput' },
  traits: {
    'smithy.api#readonly': {},
    'smithy.api#http': {
      method: 'GET',
      uri: '/users/{userId}',
    },
  },
});

smithy.addShape('example.users#CreateUser', {
  type: 'operation',
  input: { target: 'example.users#CreateUserInput' },
  output: { target: 'example.users#CreateUserOutput' },
  traits: {
    'smithy.api#http': {
      method: 'POST',
      uri: '/users',
    },
  },
});

// Add input/output structures
smithy.addShape('example.users#GetUserInput', {
  type: 'structure',
  members: {
    userId: {
      target: 'smithy.api#String',
      traits: {
        'smithy.api#required': {},
        'smithy.api#httpLabel': {},
      },
    },
  },
});

smithy.addShape('example.users#GetUserOutput', {
  type: 'structure',
  members: {
    user: { target: 'example.users#User' },
  },
});

smithy.addShape('example.users#User', {
  type: 'structure',
  members: {
    id: { target: 'smithy.api#String' },
    name: { target: 'smithy.api#String' },
    email: { target: 'smithy.api#String' },
  },
});

// Output as pretty JSON
console.log(smithy.toString(true));
```

### Working with Traits

```typescript
import { Smithy } from '@laag/smithy';

const smithy = new Smithy(model);

// Check if a shape has a trait
if (smithy.hasTrait('example.users#userId', 'smithy.api#required')) {
  console.log('userId is required');
}

// Get all traits for a shape
const traits = smithy.getTraits('example.users#GetUser');
if (traits) {
  for (const [traitId, value] of traits) {
    console.log(`Trait: ${traitId}`, value);
  }
}

// Add a trait to a shape
smithy.addTrait(
  'example.users#GetUser',
  'smithy.api#documentation',
  'Retrieves a user by their unique identifier'
);

// Get HTTP binding information
const binding = smithy.getHttpBinding('example.users#GetUser');
if (binding) {
  console.log(`${binding.method} ${binding.uri}`); // "GET /users/{userId}"
}
```

### Model Validation

```typescript
import { Smithy } from '@laag/smithy';

const smithy = new Smithy(model);

const validation = smithy.validate();
if (validation.valid) {
  console.log('✅ Model is valid');
} else {
  console.log('❌ Model has errors:');
  for (const error of validation.errors) {
    console.log(`  ${error.path}: ${error.message}`);
  }
}
```

### Shape Queries and Selectors

```typescript
import { Smithy } from '@laag/smithy';

const smithy = new Smithy(model);

// Get shapes by type
const services = smithy.getShapesByType('service');
const structures = smithy.getShapesByType('structure');
const operations = smithy.getShapesByType('operation');

console.log(`Found ${services.length} services`);
console.log(`Found ${structures.length} structures`);
console.log(`Found ${operations.length} operations`);

// Use selectors to query shapes
const allShapes = smithy.select('*');
const allStructures = smithy.select('structure');
const requiredShapes = smithy.select('[trait|required]');

console.log('All structures:');
for (const match of allStructures) {
  console.log(`  ${match.id}: ${match.shape.type}`);
}
```

### Code Generation

Generate client code from your Smithy models:

```typescript
import { Smithy } from '@laag/smithy';

const smithy = new Smithy(model);

// Generate TypeScript interfaces and client
const tsCode = smithy.generateTypeScript({
  includeComments: true,
  indent: 2,
});

console.log('Generated TypeScript:');
console.log(tsCode);

// Generate JavaScript classes
const jsCode = smithy.generateJavaScript({
  outputFormat: 'class',
  includeComments: true,
});

console.log('Generated JavaScript:');
console.log(jsCode);

// Generate Python dataclasses
const pythonCode = smithy.generatePython({
  includeComments: true,
  indent: 4,
});

console.log('Generated Python:');
console.log(pythonCode);
```

### Working with Services and Operations

```typescript
import { Smithy } from '@laag/smithy';

const smithy = new Smithy(model);

// Get all services
const services = smithy.getServices();
for (const service of services) {
  console.log(`Service version: ${service.version}`);
}

// Get a specific service
const service = smithy.getService('example.users#UserService');
if (service) {
  console.log(`Service: ${service.version}`);

  // Get operations for this service
  const operations = smithy.getOperations('example.users#UserService');
  console.log(`Operations: ${operations.length}`);

  // Get resources for this service
  const resources = smithy.getResources('example.users#UserService');
  console.log(`Resources: ${resources.length}`);
}

// Check HTTP bindings for operations
const operations = smithy.getOperations('example.users#UserService');
for (const operation of operations) {
  const operationId = Object.keys(smithy.shapes.entries()).find(
    ([_, shape]) => shape === operation
  )?.[0];

  if (operationId) {
    const binding = smithy.getHttpBinding(operationId);
    if (binding) {
      console.log(`${binding.method} ${binding.uri}`);
    }
  }
}
```

## API Reference

### Constructor

```typescript
new Smithy(input: SmithyModel | string)
```

Creates a new Smithy model instance. Accepts either a Smithy model object or JSON string.

### Properties

- `version: string` - Smithy version (e.g., "2.0")
- `metadata: Record<string, unknown> | undefined` - Model metadata
- `shapes: Map<ShapeId, Shape>` - All shapes in the model

### Shape Operations

- `getShape(shapeId: ShapeId): Shape | undefined` - Get a shape by ID
- `getShapesByType(type: ShapeType): Shape[]` - Get all shapes of a specific type
- `addShape(shapeId: ShapeId, shape: Shape): void` - Add a shape to the model
- `removeShape(shapeId: ShapeId): boolean` - Remove a shape from the model
- `hasShape(shapeId: ShapeId): boolean` - Check if a shape exists

### Service Operations

- `getServices(): ServiceShape[]` - Get all services
- `getService(serviceId: ShapeId): ServiceShape | undefined` - Get a specific service
- `getOperations(serviceId: ShapeId): OperationShape[]` - Get operations for a service
- `getResources(serviceId: ShapeId): ResourceShape[]` - Get resources for a service
- `getHttpBinding(operationId: ShapeId): HttpBinding | undefined` - Get HTTP binding info

### Trait Operations

- `getTraits(shapeId: ShapeId): Map<string, unknown> | undefined` - Get all traits for a shape
- `hasTrait(shapeId: ShapeId, traitId: string): boolean` - Check if shape has a trait
- `addTrait(shapeId: ShapeId, traitId: string, value: unknown): void` - Add a trait to a shape

### Validation

- `validate(): ValidationResult` - Validate the entire model

### Serialization

- `toJSON(): SmithyModel` - Convert to plain JavaScript object
- `toString(pretty?: boolean): string` - Convert to JSON string

### Code Generation

- `generateTypeScript(options?: GeneratorOptions): string` - Generate TypeScript code
- `generateJavaScript(options?: GeneratorOptions): string` - Generate JavaScript code
- `generatePython(options?: GeneratorOptions): string` - Generate Python code

### Selectors

- `select(selector: string): SelectorMatch[]` - Query shapes using selector syntax

## TypeScript Support

This library is written in TypeScript and provides comprehensive type definitions:

```typescript
import type {
  SmithyModel,
  Shape,
  ShapeType,
  ShapeId,
  ServiceShape,
  OperationShape,
  StructureShape,
  ResourceShape,
  MemberShape,
  HttpBinding,
  GeneratorOptions,
  SelectorMatch,
} from '@laag/smithy';
```

## Browser Support

The library works in modern browsers with ES2020 support:

```html
<script type="module">
  import { Smithy } from 'https://unpkg.com/@laag/smithy/dist/browser/index.js';

  const smithy = new Smithy({
    smithy: '2.0',
    shapes: {
      'example.hello#HelloService': {
        type: 'service',
        version: '2023-01-01',
      },
    },
  });
</script>
```

## Examples

Check out the [examples directory](./examples/) for more comprehensive examples:

- [Basic Usage](./examples/basic-usage.ts) - Fundamental operations
- [Code Generation](./examples/code-generation.ts) - Generate client code
- [Trait Usage](./examples/trait-usage.ts) - Working with traits
- [Validation](./examples/validation.ts) - Model validation examples

## Advanced Features

### Selector Syntax

The library supports basic Smithy selector syntax:

```typescript
// Select all shapes
const all = smithy.select('*');

// Select by type
const structures = smithy.select('structure');
const services = smithy.select('service');

// Select by trait
const required = smithy.select('[trait|required]');
const httpOperations = smithy.select('[trait|http]');

// Select by namespace (basic support)
const exampleShapes = smithy.select('[id|namespace = example]');
```

### Generator Options

Customize code generation with options:

```typescript
const options: GeneratorOptions = {
  includeComments: true,
  indent: 2,
  outputFormat: 'class', // 'class' | 'module' | 'functional'
  namespace: 'MyAPI',
};

const code = smithy.generateTypeScript(options);
```

### HTTP Bindings

Extract HTTP information from operations:

```typescript
const binding = smithy.getHttpBinding('example.users#GetUser');
if (binding) {
  console.log(binding.method); // "GET"
  console.log(binding.uri); // "/users/{userId}"
  console.log(binding.code); // 200 (if specified)
}
```

## Related Packages

- [@laag/core](../core/) - Core utilities and base classes
- [@laag/openapi](../openapi/) - OpenAPI/Swagger document support
- [@laag/raml](../raml/) - RAML document support
- [@laag/cli](../cli/) - Command-line interface

## Contributing

We welcome contributions! Please see our [Contributing Guide](../../CONTRIBUTING.md) for details.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/bschwarz/laag.git
cd laag

# Install dependencies
bun install

# Build the smithy package
cd packages/smithy
bun run build

# Run tests
bun test

# Run tests in watch mode
bun test --watch
```

### Running Examples

```bash
# Run TypeScript examples
bun run examples/basic-usage.ts
bun run examples/code-generation.ts

# Build and test
bun run build
bun run test
bun run type-check
```

## License

MIT - see [LICENSE](../../LICENSE) for details.

## Changelog

See [CHANGELOG.md](../../CHANGELOG.md) for release history.
