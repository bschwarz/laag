# Design Document

## Overview

This design outlines the modernization of the laag library from JavaScript/CommonJS to a TypeScript-based architecture using Bun for build tooling, package management, and testing. The modernization will maintain API compatibility while introducing modern development practices, improved type safety, and enhanced developer experience.

The current library consists of multiple packages (openapi, raml, smithy, core) in a Lerna monorepo. The modernization will transform this into a Bun workspace-based monorepo with TypeScript, modern module formats (ESM/CommonJS), and comprehensive tooling.

## Architecture

### Package Structure
The modernized architecture will maintain the existing package separation while introducing TypeScript and modern build processes:

```
laag/
├── packages/
│   ├── core/                    # Shared TypeScript utilities and base classes
│   │   ├── src/
│   │   │   ├── index.ts        # Main exports
│   │   │   ├── base.ts         # Core base class
│   │   │   └── types.ts        # Shared type definitions
│   │   ├── dist/               # Built outputs (ESM + CJS)
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── openapi/                # OpenAPI/Swagger TypeScript implementation
│   │   ├── src/
│   │   │   ├── index.ts        # Main exports
│   │   │   ├── openapi.ts      # Main Openapi class
│   │   │   └── types.ts        # OpenAPI-specific types
│   │   ├── dist/               # Built outputs
│   │   ├── __tests__/          # Bun tests
│   │   ├── examples/           # Usage examples
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── [raml, smithy]/         # Similar structure for other packages
├── bun.lockb                   # Bun lockfile
├── package.json                # Root workspace config
├── tsconfig.json               # Root TypeScript config
└── bunfig.toml                 # Bun configuration
```

### Module System Design
The library will support both ESM and CommonJS through dual package exports:

**package.json exports configuration:**
```json
{
  "type": "module",
  "main": "./dist/cjs/index.js",
  "module": "./dist/esm/index.js",
  "types": "./dist/types/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/esm/index.js",
      "require": "./dist/cjs/index.js",
      "types": "./dist/types/index.d.ts"
    }
  }
}
```

### Build System Architecture
Bun will handle compilation, bundling, and output generation:
- TypeScript compilation to both ESM and CommonJS
- Type declaration generation
- Browser-compatible bundles with tree-shaking support
- Source map generation for debugging
## Co
mponents and Interfaces

### Core Package Components

**Base Class (base.ts)**
```typescript
export abstract class LaagBase {
  protected doc: Record<string, any>;
  
  constructor(doc?: string | Record<string, any>) {
    this.doc = typeof doc === 'string' ? JSON.parse(doc) : doc || {};
  }
  
  // Utility methods with proper typing
  protected dictKeysExists(obj: Record<string, any>, ...keys: string[]): boolean;
  protected getExtensions(level?: string): Record<string, any>;
  protected setExtensions(values: Record<string, any>, level?: string): void;
}
```

**Shared Types (types.ts)**
```typescript
export interface ExtensionObject {
  [key: `x-${string}`]: any;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

export interface ValidationError {
  path: string;
  message: string;
  code: string;
}
```

### OpenAPI Package Components

**Main Openapi Class (openapi.ts)**
```typescript
import { LaagBase } from '@laag/core';
import { OpenAPIDocument, InfoObject, PathsObject } from './types';

export class Openapi extends LaagBase {
  constructor(doc?: string | OpenAPIDocument) {
    super(doc);
    if (!this.doc.openapi) {
      this.doc = { openapi: '3.0.2', info: { title: '', version: '1.0.0' }, paths: {} };
    }
  }
  
  // Strongly typed getters and setters
  get info(): InfoObject { /* implementation */ }
  set info(value: InfoObject) { /* implementation */ }
  
  get paths(): PathsObject { /* implementation */ }
  set paths(value: PathsObject) { /* implementation */ }
  
  // Methods with proper return types
  getDefinition(format?: 'js' | 'json' | 'prettyjson'): OpenAPIDocument | string;
  getPathNames(): string[];
  operationExists(path: string, verb: string): boolean;
}
```

**OpenAPI Types (types.ts)**
```typescript
export interface OpenAPIDocument {
  openapi: string;
  info: InfoObject;
  paths: PathsObject;
  components?: ComponentsObject;
  security?: SecurityRequirementObject[];
  tags?: TagObject[];
  externalDocs?: ExternalDocumentationObject;
  servers?: ServerObject[];
  [key: `x-${string}`]: any;
}

export interface InfoObject {
  title: string;
  version: string;
  description?: string;
  termsOfService?: string;
  contact?: ContactObject;
  license?: LicenseObject;
  [key: `x-${string}`]: any;
}

// Additional OpenAPI 3.0 type definitions...
```

### Browser Compatibility Layer

**Browser Bundle Configuration**
- UMD builds for legacy browser support
- ESM builds for modern browsers
- Polyfills for Node.js-specific features (like fs operations)
- Tree-shakeable exports for optimal bundle sizes

## Data Models

### Configuration Models

**Workspace Configuration (package.json)**
```json
{
  "workspaces": ["packages/*"],
  "scripts": {
    "build": "bun run build:all",
    "test": "bun test --recursive",
    "lint": "eslint packages/*/src/**/*.ts",
    "type-check": "tsc --noEmit --recursive"
  }
}
```

**TypeScript Configuration Hierarchy**
- Root `tsconfig.json` with shared compiler options
- Package-specific `tsconfig.json` extending root config
- Separate configs for different output targets (ESM, CJS, types)

### Package Metadata Models

**Enhanced package.json Structure**
```json
{
  "name": "@laag/openapi",
  "version": "2.0.0",
  "type": "module",
  "main": "./dist/cjs/index.js",
  "module": "./dist/esm/index.js",
  "types": "./dist/types/index.d.ts",
  "browser": "./dist/browser/index.js",
  "exports": {
    ".": {
      "import": "./dist/esm/index.js",
      "require": "./dist/cjs/index.js",
      "browser": "./dist/browser/index.js",
      "types": "./dist/types/index.d.ts"
    }
  },
  "files": ["dist/"],
  "engines": {
    "node": ">=18.0.0"
  }
}
```

## Error Handling

### Typed Error System

**Error Classes**
```typescript
export class LaagError extends Error {
  constructor(
    message: string,
    public code: string,
    public path?: string,
    public context?: Record<string, any>
  ) {
    super(message);
    this.name = 'LaagError';
  }
}

export class ValidationError extends LaagError {
  constructor(message: string, path: string, context?: Record<string, any>) {
    super(message, 'VALIDATION_ERROR', path, context);
    this.name = 'ValidationError';
  }
}

export class ParseError extends LaagError {
  constructor(message: string, context?: Record<string, any>) {
    super(message, 'PARSE_ERROR', undefined, context);
    this.name = 'ParseError';
  }
}
```

### Error Handling Patterns

**Input Validation**
- Runtime type checking for critical operations
- Clear error messages with suggestions for fixes
- Graceful degradation for non-critical errors

**Development vs Production**
- Detailed error information in development
- Sanitized error messages in production
- Source map support for debugging

## Testing Strategy

### Test Architecture

**Bun Test Configuration**
```typescript
// bun.config.ts
export default {
  test: {
    coverage: {
      enabled: true,
      threshold: 80,
      include: ['src/**/*.ts'],
      exclude: ['**/*.test.ts', '**/*.spec.ts']
    }
  }
};
```

**Test Structure**
```
packages/openapi/__tests__/
├── unit/
│   ├── openapi.test.ts         # Core class tests
│   ├── types.test.ts           # Type validation tests
│   └── utils.test.ts           # Utility function tests
├── integration/
│   ├── compatibility.test.ts   # Backward compatibility tests
│   └── examples.test.ts        # Example usage tests
└── fixtures/
    ├── valid-openapi.json
    └── invalid-openapi.json
```

### Testing Patterns

**Unit Tests**
- Test each method with proper TypeScript types
- Mock external dependencies
- Test error conditions and edge cases
- Validate type safety at runtime

**Integration Tests**
- Test package interoperability
- Validate build outputs (ESM, CJS, browser)
- Test CLI functionality across platforms
- Performance benchmarks

**Compatibility Tests**
- Ensure existing API surface remains unchanged
- Test migration scenarios from v1 to v2
- Validate against real-world OpenAPI documents

### Continuous Integration

**GitHub Actions Workflow**
```yaml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v1
      - run: bun install
      - run: bun run type-check
      - run: bun run lint
      - run: bun test
      - run: bun run build
      - run: bun run test:compatibility
```

This design provides a comprehensive modernization path while maintaining backward compatibility and introducing modern TypeScript development practices with Bun tooling.