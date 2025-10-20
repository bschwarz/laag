# Migration Guide: Laag v1 to v2

This guide helps you migrate from laag v1 (JavaScript/CommonJS) to laag v2 (TypeScript/Modern).

## Overview

Laag v2 represents a complete modernization of the library with:

- **Full TypeScript support** with comprehensive type definitions
- **Modern build system** using Bun for faster development
- **Dual module support** (ESM and CommonJS)
- **Enhanced error handling** with typed errors and better context
- **Improved API design** while maintaining backward compatibility
- **Browser compatibility** with tree-shakeable bundles

## Breaking Changes

### 1. Package Structure Changes

**v1 Structure:**

```
laag/
├── packages/openapi/lib/laag-openapi.js
└── packages/raml/lib/laag-raml.js
```

**v2 Structure:**

```
laag/
├── packages/core/dist/           # New shared core package
├── packages/openapi/dist/        # Modernized with TypeScript
└── packages/raml/dist/           # Modernized with TypeScript
```

**Migration Required:**

- Update import paths to use the new package structure
- Install the new `@laag/core` dependency if using advanced features

### 2. Import/Export Changes

**v1 (CommonJS only):**

```javascript
const Openapi = require('@laag/openapi');
const doc = new Openapi();
```

**v2 (ESM preferred, CommonJS supported):**

```typescript
// ESM (recommended)
import { Openapi } from '@laag/openapi';
const doc = new Openapi();

// CommonJS (still supported)
const { Openapi } = require('@laag/openapi');
const doc = new Openapi();
```

### 3. Error Handling Changes

**v1:**

```javascript
try {
  const doc = new Openapi(invalidJson);
} catch (error) {
  console.log(error.message); // Generic error
}
```

**v2:**

```typescript
import { Openapi, ParseError, ValidationError } from '@laag/openapi';

try {
  const doc = new Openapi(invalidJson);
} catch (error) {
  if (error instanceof ParseError) {
    console.log('JSON parsing failed:', error.message);
    console.log('Context:', error.context);
  } else if (error instanceof ValidationError) {
    console.log('Validation failed at:', error.path);
    console.log('Error:', error.message);
  }
}
```

## Non-Breaking Changes

### 1. Enhanced Type Safety (TypeScript)

**v1 (No type safety):**

```javascript
const doc = new Openapi();
doc.title = 123; // No error, but incorrect
doc.info = { invalid: 'structure' }; // No validation
```

**v2 (Full type safety):**

```typescript
const doc = new Openapi();
doc.title = 123; // TypeScript error: Type 'number' is not assignable to type 'string'

// Proper typed usage
doc.info = {
  title: 'My API',
  version: '1.0.0',
  description: 'Optional description',
}; // Full IntelliSense and validation
```

### 2. Enhanced Validation

**v1 (Limited validation):**

```javascript
const doc = new Openapi();
// No built-in validation method
```

**v2 (Comprehensive validation):**

```typescript
const doc = new Openapi();
const result = doc.validate();

if (!result.valid) {
  result.errors.forEach(error => {
    console.log(`${error.path}: ${error.message} (${error.code})`);
  });
}
```

### 3. Better Extension Support

**v1:**

```javascript
// Limited extension support
doc.rootExtensions = { 'x-custom': 'value' };
```

**v2:**

```typescript
// Type-safe extension support
doc.rootExtensions = {
  'x-custom': 'value',
  'x-complex': { nested: 'object' },
};

// Extensions at different levels
doc.infoExtensions = { 'x-logo': 'logo.png' };
doc.pathsExtensions = { 'x-rate-limit': 1000 };
```

## Step-by-Step Migration

### Step 1: Update Dependencies

**Remove v1 packages:**

```bash
npm uninstall @laag/openapi @laag/raml
```

**Install v2 packages:**

```bash
# Using npm
npm install @laag/core @laag/openapi

# Using bun (recommended)
bun add @laag/core @laag/openapi

# Using yarn
yarn add @laag/core @laag/openapi
```

### Step 2: Update Import Statements

**Before (v1):**

```javascript
const Openapi = require('@laag/openapi');
```

**After (v2 ESM):**

```typescript
import { Openapi } from '@laag/openapi';
```

**After (v2 CommonJS):**

```javascript
const { Openapi } = require('@laag/openapi');
```

### Step 3: Add TypeScript Support (Optional but Recommended)

**Install TypeScript:**

```bash
npm install -D typescript @types/node
```

**Create tsconfig.json:**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

**Rename files:**

```bash
mv your-file.js your-file.ts
```

### Step 4: Update Error Handling

**Before (v1):**

```javascript
try {
  const doc = new Openapi(data);
  // ... use doc
} catch (error) {
  console.error('Error:', error.message);
}
```

**After (v2):**

```typescript
import { Openapi, LaagError, ParseError, ValidationError } from '@laag/openapi';

try {
  const doc = new Openapi(data);

  // Validate the document
  const validation = doc.validate();
  if (!validation.valid) {
    console.log('Validation errors:', validation.errors);
  }
} catch (error) {
  if (error instanceof LaagError) {
    console.error(`${error.name}: ${error.message}`);
    if (error.path) console.error(`Path: ${error.path}`);
    if (error.context) console.error('Context:', error.context);
  } else {
    console.error('Unexpected error:', error);
  }
}
```

### Step 5: Leverage New Features

**Enhanced Document Analysis:**

```typescript
const doc = new Openapi(data);

// Get comprehensive operation information
const operations = doc.getOperationIds();
operations.forEach(op => {
  console.log(`${op.method.toUpperCase()} ${op.path} → ${op.id}`);

  // Get detailed operation info
  const description = doc.getOperationDescription(op.path, op.method);
  const statusCodes = doc.getStatusCodes(op.path, op.method);
  const requestMedia = doc.getOperationRequestMedia(op.path, op.method);

  console.log(`  Description: ${description}`);
  console.log(`  Status codes: ${statusCodes.map(s => s.code).join(', ')}`);
  console.log(`  Request media: ${requestMedia.join(', ')}`);
});
```

**Type-Safe Document Creation:**

```typescript
import type { OpenAPIDocument, InfoObject } from '@laag/openapi';

const info: InfoObject = {
  title: 'My API',
  version: '1.0.0',
  description: 'A well-typed API',
  contact: {
    name: 'API Team',
    email: 'api@company.com',
  },
};

const document: OpenAPIDocument = {
  openapi: '3.0.2',
  info,
  paths: {},
  servers: [
    {
      url: 'https://api.company.com/v1',
      description: 'Production server',
    },
  ],
};

const api = new Openapi(document);
```

## Common Migration Issues

### Issue 1: Module Resolution Errors

**Problem:**

```
Error: Cannot find module '@laag/openapi'
```

**Solution:**
Ensure you're using the correct import syntax for your environment:

```typescript
// For TypeScript/ESM
import { Openapi } from '@laag/openapi';

// For CommonJS
const { Openapi } = require('@laag/openapi');
```

### Issue 2: Type Errors in TypeScript

**Problem:**

```
Property 'someProperty' does not exist on type 'Openapi'
```

**Solution:**
Check the [API documentation](./docs/api/README.md) for the correct property names and types. Many properties may have been renamed or restructured for better consistency.

### Issue 3: Build Errors with Bundlers

**Problem:**
Bundler cannot resolve the package or produces large bundles.

**Solution:**
v2 provides optimized builds for different environments:

```javascript
// For Node.js
import { Openapi } from '@laag/openapi';

// For browsers (tree-shakeable)
import { Openapi } from '@laag/openapi/dist/esm/index.js';

// For CommonJS environments
const { Openapi } = require('@laag/openapi/dist/cjs/index.js');
```

### Issue 4: Extension Property Errors

**Problem:**
Extension properties not working as expected.

**Solution:**
v2 has enhanced extension support with proper typing:

```typescript
// v1 approach (still works)
doc.rootExtensions = { 'x-custom': 'value' };

// v2 enhanced approach
doc.rootExtensions = {
  'x-custom': 'value',
  'x-complex': { nested: 'data' },
};

// Level-specific extensions
doc.infoExtensions = { 'x-logo': 'logo.png' };
doc.pathsExtensions = { 'x-rate-limit': 1000 };
```

## Testing Your Migration

### 1. Automated Testing

Create tests to ensure your migration works correctly:

```typescript
import { describe, test, expect } from 'bun:test';
import { Openapi } from '@laag/openapi';

describe('Migration Tests', () => {
  test('should create document like v1', () => {
    const doc = new Openapi();
    doc.title = 'Test API';
    doc.version = '1.0.0';

    expect(doc.title).toBe('Test API');
    expect(doc.version).toBe('1.0.0');
  });

  test('should validate document', () => {
    const doc = new Openapi({
      openapi: '3.0.2',
      info: { title: 'Test', version: '1.0.0' },
      paths: {},
    });

    const result = doc.validate();
    expect(result.valid).toBe(true);
  });
});
```

### 2. Manual Testing

Test key functionality that your application relies on:

1. **Document Loading**: Ensure your existing OpenAPI documents load correctly
2. **Property Access**: Verify that all properties you access are still available
3. **Method Calls**: Test that all methods you use work as expected
4. **Extension Properties**: Check that custom extensions are preserved

### 3. Performance Testing

v2 should be faster than v1, but verify this in your specific use case:

```typescript
import { performance } from 'perf_hooks';

const start = performance.now();
// Your laag operations here
const end = performance.now();

console.log(`Operation took ${end - start} milliseconds`);
```

## Getting Help

### Resources

1. **API Documentation**: [./docs/api/README.md](./docs/api/README.md)
2. **Examples**: [./examples/README.md](./examples/README.md)
3. **TypeScript Types**: Full IntelliSense support in your IDE
4. **GitHub Issues**: Report migration issues on our GitHub repository

### Common Questions

**Q: Do I need to use TypeScript?**
A: No, v2 works with JavaScript too. TypeScript provides better development experience but is optional.

**Q: Will my existing OpenAPI documents work?**
A: Yes, v2 maintains full compatibility with OpenAPI 3.0 documents.

**Q: Can I use both v1 and v2 in the same project?**
A: Not recommended. Choose one version and migrate completely for consistency.

**Q: What about performance?**
A: v2 is generally faster due to modern build optimizations and better algorithms.

**Q: Are there any new features I should know about?**
A: Yes! Check out enhanced validation, better error handling, type safety, and improved extension support.

## Troubleshooting

### Enable Debug Mode

For detailed error information during migration:

```typescript
const doc = new Openapi(data, {
  development: true,
  includeContext: true,
  includeStack: true,
});
```

### Check Bundle Size

If bundle size is a concern:

```bash
# Analyze your bundle
npx webpack-bundle-analyzer dist/main.js

# Use tree-shaking friendly imports
import { Openapi } from '@laag/openapi/dist/esm/index.js';
```

### Validate Migration

Use the built-in validation to ensure your migrated code produces valid documents:

```typescript
const doc = new Openapi(yourDocument);
const validation = doc.validate();

if (!validation.valid) {
  console.log('Migration validation failed:');
  validation.errors.forEach(error => {
    console.log(`- ${error.path}: ${error.message}`);
  });
}
```

---

**Need more help?** Check our [examples](./examples/README.md) or open an issue on GitHub with your specific migration question.
