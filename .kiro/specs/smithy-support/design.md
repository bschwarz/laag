# Smithy Support Design Document

## Overview

This document describes the design for adding AWS Smithy support to the laag library collection. The implementation will follow established patterns from the OpenAPI and RAML packages while accommodating Smithy's unique features such as shapes, traits, selectors, and projections.

Smithy is a protocol-agnostic interface definition language that allows developers to build clients and servers in multiple languages. Unlike OpenAPI which is HTTP-centric, Smithy is more abstract and can represent various protocols. This design accounts for these differences while maintaining consistency with the laag ecosystem.

## Architecture

### Package Structure

```
packages/smithy/
├── src/
│   ├── index.ts                 # Package exports
│   ├── smithy.ts                # Main Smithy class
│   ├── types.ts                 # TypeScript type definitions
│   ├── shapes/                  # Shape-specific implementations
│   │   ├── base-shape.ts        # Base shape class
│   │   ├── structure.ts         # Structure shape
│   │   ├── service.ts           # Service shape
│   │   ├── operation.ts         # Operation shape
│   │   ├── resource.ts          # Resource shape
│   │   └── index.ts             # Shape exports
│   ├── traits/                  # Trait implementations
│   │   ├── base-trait.ts        # Base trait class
│   │   ├── http-traits.ts       # HTTP-related traits
│   │   ├── aws-traits.ts        # AWS-specific traits
│   │   └── index.ts             # Trait exports
│   ├── validators/              # Validation logic
│   │   ├── model-validator.ts   # Model validation
│   │   ├── shape-validator.ts   # Shape validation
│   │   └── trait-validator.ts   # Trait validation
│   ├── parsers/                 # Parsing logic
│   │   ├── json-parser.ts       # JSON AST parser
│   │   ├── idl-parser.ts        # Smithy IDL parser (future)
│   │   └── index.ts             # Parser exports
│   ├── generators/              # Code generation
│   │   ├── typescript-generator.ts
│   │   ├── javascript-generator.ts
│   │   ├── python-generator.ts
│   │   └── index.ts
│   └── utils/                   # Utility functions
│       ├── selector.ts          # Smithy selector support
│       ├── shape-id.ts          # Shape ID utilities
│       └── index.ts
├── __tests__/                   # Test files
│   ├── smithy.test.ts           # Main class tests
│   ├── shapes/                  # Shape tests
│   ├── traits/                  # Trait tests
│   ├── validators/              # Validator tests
│   ├── generators/              # Generator tests
│   └── fixtures/                # Test fixtures
│       ├── weather-service.json # Sample Smithy model
│       └── simple-service.json  # Minimal Smithy model
├── examples/                    # Usage examples
│   ├── basic-usage.ts           # Basic example
│   ├── code-generation.ts       # Code gen example
│   ├── trait-usage.ts           # Trait example
│   └── models/                  # Example models
│       └── weather.smithy       # Example Smithy IDL
├── scripts/                     # Build scripts
│   └── post-build.js            # Post-build script
├── package.json                 # Package configuration
├── tsconfig.json                # TypeScript config
├── tsconfig.esm.json            # ESM build config
├── tsconfig.cjs.json            # CJS build config
├── README.md                    # Package documentation
└── LICENSE                      # MIT License
```

### Class Hierarchy

```
LaagBase (from @laag/core)
    ↓
Smithy (main class)
    ↓
    ├── ShapeManager (manages shapes)
    ├── TraitManager (manages traits)
    ├── ServiceManager (manages services)
    └── ValidationManager (validates model)
```

## Components and Interfaces

### 1. Main Smithy Class

The `Smithy` class is the primary interface for working with Smithy models.

```typescript
export class Smithy extends LaagBase {
  private model: SmithyModel;
  private shapeManager: ShapeManager;
  private traitManager: TraitManager;
  private serviceManager: ServiceManager;
  
  constructor(input: SmithyModel | string);
  
  // Model accessors
  get version(): string;
  get metadata(): Record<string, unknown>;
  get shapes(): Map<string, Shape>;
  
  // Shape operations
  getShape(shapeId: string): Shape | undefined;
  getShapesByType(type: ShapeType): Shape[];
  addShape(shapeId: string, shape: Shape): void;
  removeShape(shapeId: string): void;
  hasShape(shapeId: string): boolean;
  
  // Service operations
  getServices(): ServiceShape[];
  getService(shapeId: string): ServiceShape | undefined;
  getOperations(serviceId: string): OperationShape[];
  
  // Trait operations
  getTraits(shapeId: string): Map<string, Trait>;
  hasTrait(shapeId: string, traitId: string): boolean;
  addTrait(shapeId: string, traitId: string, value: unknown): void;
  
  // Validation
  validate(): ValidationResult;
  
  // Serialization
  toJSON(): SmithyModel;
  toString(): string;
  
  // Code generation
  generateTypeScript(options?: GeneratorOptions): string;
  generateJavaScript(options?: GeneratorOptions): string;
  generatePython(options?: GeneratorOptions): string;
  
  // Selectors
  select(selector: string): Shape[];
}
```

### 2. Type Definitions

Core TypeScript types for Smithy models:

```typescript
// Main model interface
export interface SmithyModel {
  smithy: string;  // Version (e.g., "2.0")
  metadata?: Record<string, unknown>;
  shapes: Record<string, Shape>;
}

// Shape types
export type ShapeType = 
  | 'blob' | 'boolean' | 'string' | 'byte' | 'short' | 'integer' 
  | 'long' | 'float' | 'double' | 'bigInteger' | 'bigDecimal'
  | 'timestamp' | 'document' | 'list' | 'set' | 'map'
  | 'structure' | 'union' | 'service' | 'operation' | 'resource';

// Base shape interface
export interface BaseShape {
  type: ShapeType;
  traits?: Record<string, unknown>;
}

// Structure shape
export interface StructureShape extends BaseShape {
  type: 'structure';
  members?: Record<string, MemberShape>;
  mixins?: ShapeId[];
}

// Service shape
export interface ServiceShape extends BaseShape {
  type: 'service';
  version: string;
  operations?: ShapeId[];
  resources?: ShapeId[];
  errors?: ShapeId[];
  rename?: Record<string, string>;
}

// Operation shape
export interface OperationShape extends BaseShape {
  type: 'operation';
  input?: ShapeId;
  output?: ShapeId;
  errors?: ShapeId[];
}

// Resource shape
export interface ResourceShape extends BaseShape {
  type: 'resource';
  identifiers?: Record<string, ShapeId>;
  properties?: Record<string, ShapeId>;
  create?: ShapeId;
  put?: ShapeId;
  read?: ShapeId;
  update?: ShapeId;
  delete?: ShapeId;
  list?: ShapeId;
  operations?: ShapeId[];
  collectionOperations?: ShapeId[];
  resources?: ShapeId[];
}

// Member shape
export interface MemberShape {
  target: ShapeId;
  traits?: Record<string, unknown>;
}

// Shape ID type
export type ShapeId = string;  // Format: namespace#ShapeName

// Trait definitions
export interface Trait {
  id: string;
  value: unknown;
}

// Common traits
export interface HttpTrait {
  method: string;
  uri: string;
  code?: number;
}

export interface RequiredTrait {}

export interface DocumentationTrait {
  value: string;
}
```

### 3. Shape Manager

Manages shape operations and queries:

```typescript
export class ShapeManager {
  private shapes: Map<string, Shape>;
  
  constructor(shapes: Record<string, Shape>);
  
  get(shapeId: string): Shape | undefined;
  getAll(): Map<string, Shape>;
  getByType(type: ShapeType): Shape[];
  add(shapeId: string, shape: Shape): void;
  remove(shapeId: string): void;
  has(shapeId: string): boolean;
  
  // Shape resolution
  resolveTarget(shapeId: string): Shape | undefined;
  getMembers(structureId: string): Map<string, MemberShape>;
  
  // Shape queries
  findShapesByTrait(traitId: string): Shape[];
  getShapeHierarchy(shapeId: string): string[];
}
```

### 4. Trait Manager

Manages trait operations:

```typescript
export class TraitManager {
  private traits: Map<string, Map<string, Trait>>;
  
  constructor(shapes: Record<string, Shape>);
  
  get(shapeId: string): Map<string, Trait>;
  has(shapeId: string, traitId: string): boolean;
  add(shapeId: string, traitId: string, value: unknown): void;
  remove(shapeId: string, traitId: string): void;
  
  // Trait validation
  validateTrait(traitId: string, value: unknown): ValidationResult;
  
  // Standard traits
  getHttpTrait(shapeId: string): HttpTrait | undefined;
  getDocumentation(shapeId: string): string | undefined;
  isRequired(shapeId: string): boolean;
}
```

### 5. Service Manager

Manages service-specific operations:

```typescript
export class ServiceManager {
  private shapeManager: ShapeManager;
  
  constructor(shapeManager: ShapeManager);
  
  getServices(): ServiceShape[];
  getService(serviceId: string): ServiceShape | undefined;
  getOperations(serviceId: string): OperationShape[];
  getResources(serviceId: string): ResourceShape[];
  
  // Operation details
  getOperationInput(operationId: string): StructureShape | undefined;
  getOperationOutput(operationId: string): StructureShape | undefined;
  getOperationErrors(operationId: string): StructureShape[];
  
  // HTTP bindings
  getHttpBinding(operationId: string): HttpBinding | undefined;
}
```

### 6. Validators

Validation logic for models, shapes, and traits:

```typescript
export class ModelValidator {
  validate(model: SmithyModel): ValidationResult;
  validateVersion(version: string): ValidationResult;
  validateShapes(shapes: Record<string, Shape>): ValidationResult;
}

export class ShapeValidator {
  validate(shape: Shape): ValidationResult;
  validateStructure(shape: StructureShape): ValidationResult;
  validateService(shape: ServiceShape): ValidationResult;
  validateOperation(shape: OperationShape): ValidationResult;
  validateResource(shape: ResourceShape): ValidationResult;
}

export class TraitValidator {
  validate(traitId: string, value: unknown): ValidationResult;
  validateHttpTrait(value: unknown): ValidationResult;
  validateRequiredTrait(value: unknown): ValidationResult;
}
```

### 7. Parsers

Parsing logic for different Smithy formats:

```typescript
export class JsonParser {
  parse(input: string | object): SmithyModel;
  validateFormat(input: unknown): boolean;
}

// Future: IDL parser for Smithy IDL syntax
export class IdlParser {
  parse(input: string): SmithyModel;
  // Will be implemented in a future iteration
}
```

### 8. Code Generators

Generate code from Smithy models:

```typescript
export interface GeneratorOptions {
  namespace?: string;
  includeComments?: boolean;
  includeExamples?: boolean;
  outputFormat?: 'module' | 'class' | 'functional';
}

export class TypeScriptGenerator {
  generate(model: SmithyModel, options?: GeneratorOptions): string;
  generateInterface(shape: StructureShape): string;
  generateClient(service: ServiceShape): string;
}

export class JavaScriptGenerator {
  generate(model: SmithyModel, options?: GeneratorOptions): string;
  generateClass(shape: StructureShape): string;
  generateClient(service: ServiceShape): string;
}

export class PythonGenerator {
  generate(model: SmithyModel, options?: GeneratorOptions): string;
  generateClass(shape: StructureShape): string;
  generateClient(service: ServiceShape): string;
}
```

## Data Models

### Smithy Model Structure

```json
{
  "smithy": "2.0",
  "metadata": {
    "authors": ["example@example.com"]
  },
  "shapes": {
    "example.weather#Weather": {
      "type": "service",
      "version": "2006-03-01",
      "operations": [
        {
          "target": "example.weather#GetCurrentWeather"
        }
      ],
      "traits": {
        "smithy.api#documentation": "Provides weather forecasts"
      }
    },
    "example.weather#GetCurrentWeather": {
      "type": "operation",
      "input": {
        "target": "example.weather#GetCurrentWeatherInput"
      },
      "output": {
        "target": "example.weather#GetCurrentWeatherOutput"
      },
      "traits": {
        "smithy.api#readonly": {},
        "smithy.api#http": {
          "method": "GET",
          "uri": "/weather/{city}"
        }
      }
    },
    "example.weather#GetCurrentWeatherInput": {
      "type": "structure",
      "members": {
        "city": {
          "target": "smithy.api#String",
          "traits": {
            "smithy.api#required": {},
            "smithy.api#httpLabel": {}
          }
        }
      }
    },
    "example.weather#GetCurrentWeatherOutput": {
      "type": "structure",
      "members": {
        "temperature": {
          "target": "smithy.api#Float"
        },
        "conditions": {
          "target": "smithy.api#String"
        }
      }
    }
  }
}
```

## Error Handling

### Error Types

The package will use error types from `@laag/core`:

1. **ParseError**: Thrown when parsing fails
2. **ValidationError**: Thrown when validation fails
3. **NotFoundError**: Thrown when a shape or trait is not found
4. **LaagError**: Base error for other Smithy-specific errors

### Error Handling Strategy

```typescript
try {
  const smithy = new Smithy(invalidModel);
} catch (error) {
  if (error instanceof ParseError) {
    console.error('Failed to parse Smithy model:', error.message);
  } else if (error instanceof ValidationError) {
    console.error('Invalid Smithy model:', error.message);
    console.error('Validation errors:', error.details);
  }
}
```

## Testing Strategy

### Unit Tests

1. **Smithy Class Tests** (`smithy.test.ts`)
   - Constructor with valid/invalid inputs
   - Shape accessors and mutations
   - Trait operations
   - Validation
   - Serialization

2. **Shape Tests** (`shapes/*.test.ts`)
   - Each shape type (structure, service, operation, resource)
   - Shape resolution and references
   - Member access

3. **Trait Tests** (`traits/*.test.ts`)
   - Trait application and validation
   - Standard traits (http, required, documentation)
   - Custom traits

4. **Validator Tests** (`validators/*.test.ts`)
   - Model validation
   - Shape validation
   - Trait validation
   - Error cases

5. **Generator Tests** (`generators/*.test.ts`)
   - TypeScript generation
   - JavaScript generation
   - Python generation
   - Code formatting and correctness

### Integration Tests

1. **Real-world Models**
   - AWS service models
   - Complex service hierarchies
   - Multiple namespaces

2. **End-to-end Workflows**
   - Parse → Validate → Generate
   - Model manipulation → Serialization
   - Trait application → Validation

### Test Fixtures

Sample Smithy models for testing:

1. **weather-service.json**: Complete weather service example
2. **simple-service.json**: Minimal service for basic tests
3. **complex-service.json**: Complex service with resources and hierarchies
4. **invalid-models/**: Various invalid models for error testing

### Coverage Goals

- Overall coverage: >90%
- Critical paths: 100%
- Error handling: 100%

## Performance Considerations

### Optimization Strategies

1. **Lazy Loading**: Load shapes and traits on-demand
2. **Caching**: Cache resolved shapes and trait lookups
3. **Efficient Data Structures**: Use Maps for O(1) lookups
4. **Minimal Parsing**: Parse only what's needed

### Performance Targets

- Parse 1000-shape model: <100ms
- Validate model: <50ms
- Generate TypeScript code: <200ms
- Memory usage: <50MB for typical models

## Security Considerations

1. **Input Validation**: Validate all inputs before processing
2. **Prototype Pollution**: Avoid Object.assign with untrusted data
3. **DoS Prevention**: Limit model size and recursion depth
4. **Safe Serialization**: Sanitize output to prevent injection

## Dependencies

### Runtime Dependencies

- `@laag/core`: Core utilities and base classes (workspace dependency)

### Development Dependencies

- `typescript`: TypeScript compiler
- `@types/bun`: Bun type definitions
- `@types/node`: Node.js type definitions (for compatibility)

### Optional Dependencies

None required for core functionality.

## Build Configuration

### TypeScript Configuration

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "declarationMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "__tests__"]
}
```

### Build Outputs

1. **ESM** (`dist/esm/`): ES modules for modern environments
2. **CJS** (`dist/cjs/`): CommonJS for Node.js
3. **Browser** (`dist/browser/`): Minified browser bundle
4. **Types** (`dist/types/`): TypeScript declarations

## Migration and Compatibility

### Compatibility with Smithy Tools

The package aims to be compatible with:

- Smithy CLI output (JSON AST format)
- AWS SDK code generators
- Smithy TypeScript libraries

### Breaking Changes

None - this is a new package.

### Deprecation Policy

Follow semantic versioning:
- Major version for breaking changes
- Minor version for new features
- Patch version for bug fixes

## Future Enhancements

### Phase 2 Features

1. **Smithy IDL Parser**: Parse native Smithy IDL syntax
2. **Model Projections**: Support for model transformations
3. **Custom Validators**: Plugin system for custom validation
4. **Selector Engine**: Full Smithy selector support
5. **Diff and Merge**: Compare and merge Smithy models

### Phase 3 Features

1. **AWS Integration**: Enhanced AWS service support
2. **Protocol Support**: Built-in protocol implementations
3. **Documentation Generation**: Generate API docs from models
4. **Visual Editor**: Web-based model editor
5. **Migration Tools**: Convert from OpenAPI/RAML to Smithy

## Documentation Plan

### README.md Structure

1. Introduction and features
2. Installation
3. Quick start
4. Basic usage examples
5. API reference (link to TypeDoc)
6. Advanced features
7. Contributing
8. License

### API Documentation

- Generate with TypeDoc
- Include examples in JSDoc comments
- Link to Smithy specification

### Examples

1. **basic-usage.ts**: Create and manipulate models
2. **code-generation.ts**: Generate client code
3. **trait-usage.ts**: Work with traits
4. **validation.ts**: Validate models
5. **aws-service.ts**: Work with AWS service models

## Success Criteria

The Smithy package will be considered successful when:

1. ✅ All requirements are implemented
2. ✅ Test coverage exceeds 90%
3. ✅ Documentation is complete and clear
4. ✅ Performance targets are met
5. ✅ Package is published to npm
6. ✅ Integration with build system is complete
7. ✅ Examples run successfully
8. ✅ No critical bugs in initial release