# Laag Library Examples

This directory contains comprehensive examples demonstrating how to use the modernized laag library collection with TypeScript.

## Structure

- `typescript/` - TypeScript examples with full type safety
- `javascript/` - JavaScript examples for CommonJS and ESM
- `browser/` - Browser usage examples with bundling
- `data/` - Sample API specification files

## Running Examples

### TypeScript Examples
```bash
# Install dependencies
bun install

# Run TypeScript examples directly
bun run examples/typescript/basic-usage.ts
bun run examples/typescript/advanced-operations.ts
```

### JavaScript Examples
```bash
# ESM examples
node examples/javascript/esm/basic-usage.mjs

# CommonJS examples  
node examples/javascript/cjs/basic-usage.cjs
```

### Browser Examples
```bash
# Build and serve browser examples
cd examples/browser
bun install
bun run build
bun run serve
```

## Examples Overview

### Basic Usage
- Creating and loading OpenAPI documents
- Basic document manipulation
- Validation and error handling

### Advanced Operations
- Working with paths and operations
- Component management
- Extension properties
- Complex document transformations

### Integration Patterns
- Using with build tools
- Framework integration
- Testing patterns