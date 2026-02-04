# Examples

This directory contains comprehensive examples demonstrating the capabilities of the laag library collection.

## Directory Structure

```
examples/
├── typescript/          # TypeScript examples
│   ├── basic-usage.ts           # Fundamental operations
│   ├── advanced-operations.ts   # Complex document manipulation
│   └── sample-generation.ts     # Sample and code generation
├── javascript/          # JavaScript examples
│   ├── esm/                     # ES Module examples
│   └── cjs/                     # CommonJS examples
├── browser/             # Browser integration examples
└── data/               # Sample OpenAPI documents
```

## Running Examples

### TypeScript Examples

```bash
# Basic usage
bun run examples/typescript/basic-usage.ts

# Advanced operations
bun run examples/typescript/advanced-operations.ts

# Sample generation (NEW!)
bun run examples/typescript/sample-generation.ts
```

### JavaScript Examples

```bash
# ESM examples
bun run examples/javascript/esm/basic-usage.mjs

# CommonJS examples
node examples/javascript/cjs/basic-usage.cjs
```

### Browser Examples

Open `examples/browser/index.html` in your browser to see client-side usage.

## Featured Examples

### 🎯 Sample Generation (`sample-generation.ts`)

Demonstrates the powerful sample generation capabilities:

- **JSON Sample Generation**: Create realistic sample payloads from OpenAPI schemas
- **Code Generation**: Generate Python, JavaScript, and TypeScript code samples
- **curl Commands**: Generate ready-to-use curl commands
- **Complex Schema Support**: Handle references, allOf, arrays, and nested objects

**Key Features Showcased:**
- Schema reference resolution (`$ref`)
- Complex composition schemas (`allOf`, `oneOf`)
- Array and object handling
- Example value usage
- Type-safe TypeScript interface generation

### 🏗️ Advanced Operations (`advanced-operations.ts`)

Shows complex document manipulation:

- Path and operation analysis
- Component management
- Document transformation
- Extension handling

### 📚 Basic Usage (`basic-usage.ts`)

Perfect starting point covering:

- Document creation and loading
- Type-safe property access
- Validation
- Basic operations

## Sample Data

The `data/` directory contains sample OpenAPI documents for testing:

- `petstore-simple.json` - Simple petstore API
- Various format examples for different use cases

## Integration Examples

### With Build Tools

```typescript
// webpack.config.js
import { Openapi } from '@laag/openapi';

// Generate API client code at build time
const api = new Openapi(apiSpec);
const clientCode = api.getTypeScriptCode('/users', 'post');
```

### With Testing Frameworks

```typescript
// Generate test data from schemas
const testData = api.generateJsonSample('/users', 'post', 'request');
```

### With Documentation Tools

```typescript
// Generate curl examples for docs
const curlCommands = api.getCurlCommands('/users', 'post');
```

## Best Practices

1. **Type Safety**: Always use TypeScript for better development experience
2. **Validation**: Validate documents before processing
3. **Error Handling**: Handle missing schemas and operations gracefully
4. **Performance**: Cache generated samples for repeated use
5. **Testing**: Use generated samples for consistent test data

## Contributing Examples

When adding new examples:

1. Follow the existing structure and naming conventions
2. Include comprehensive comments explaining the code
3. Add both success and error handling scenarios
4. Update this README with new example descriptions
5. Ensure examples work with the latest API version

## Getting Help

- Check the [main documentation](../README.md)
- Review package-specific READMEs in `packages/*/README.md`
- Run examples to see working code in action
- Open issues for questions or improvements