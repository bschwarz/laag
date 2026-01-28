# Troubleshooting Guide

This guide helps you resolve common issues when using laag v2.

## Installation Issues

### Issue: Package Not Found

**Error:**

```
npm ERR! 404 Not Found - GET https://registry.npmjs.org/@laag/core
```

**Solution:**
Ensure you're installing the correct package names and versions:

```bash
# Check available versions
npm view @laag/core versions --json

# Install specific version
npm install @laag/core@2.0.0 @laag/openapi@2.0.0
```

### Issue: Peer Dependency Warnings

**Error:**

```
npm WARN @laag/openapi@2.0.0 requires a peer of @laag/core@^2.0.0
```

**Solution:**
Install the required peer dependencies:

```bash
npm install @laag/core @laag/openapi
```

### Issue: Module Resolution in Monorepos

**Error:**

```
Cannot resolve module '@laag/core' from '@laag/openapi'
```

**Solution:**
Ensure proper workspace configuration:

```json
// package.json (root)
{
  "workspaces": ["packages/*"],
  "dependencies": {
    "@laag/core": "workspace:*",
    "@laag/openapi": "workspace:*"
  }
}
```

## Import/Export Issues

### Issue: Cannot Import ESM Module

**Error:**

```
SyntaxError: Cannot use import statement outside a module
```

**Solution:**
Configure your project for ESM:

```json
// package.json
{
  "type": "module"
}
```

Or use CommonJS imports:

```javascript
const { Openapi } = require('@laag/openapi');
```

### Issue: TypeScript Import Errors

**Error:**

```
Cannot find module '@laag/openapi' or its corresponding type declarations
```

**Solution:**

1. Ensure TypeScript can find the types:

```json
// tsconfig.json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "esModuleInterop": true
  }
}
```

2. Check your import syntax:

```typescript
// Correct
import { Openapi } from '@laag/openapi';

// Incorrect
import Openapi from '@laag/openapi';
```

### Issue: Bundler Configuration

**Error:**

```
Module not found: Can't resolve '@laag/openapi'
```

**Solution:**
Configure your bundler properly:

**Webpack:**

```javascript
// webpack.config.js
module.exports = {
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
};
```

**Vite:**

```javascript
// vite.config.js
export default {
  resolve: {
    alias: {
      '@laag/openapi': '@laag/openapi/dist/esm/index.js',
    },
  },
};
```

## Runtime Errors

### Issue: ParseError on Valid JSON

**Error:**

```
ParseError: Failed to parse document as JSON
```

**Debugging:**

```typescript
import { ParseError } from '@laag/core';

try {
  const api = new Openapi(jsonString);
} catch (error) {
  if (error instanceof ParseError) {
    console.log('Original error:', error.context?.originalError);
    console.log('Input length:', jsonString.length);
    console.log('First 100 chars:', jsonString.substring(0, 100));
  }
}
```

**Common Causes:**

1. BOM (Byte Order Mark) in JSON file
2. Trailing commas in JSON
3. Single quotes instead of double quotes
4. Unescaped characters

**Solution:**

```typescript
// Clean the JSON string
const cleanJson = jsonString
  .replace(/^\uFEFF/, '') // Remove BOM
  .replace(/,(\s*[}\]])/g, '$1') // Remove trailing commas
  .replace(/'/g, '"'); // Replace single quotes

const api = new Openapi(cleanJson);
```

### Issue: ValidationError on Valid OpenAPI Document

**Error:**

```
ValidationError: Info object is required (at path: info)
```

**Debugging:**

```typescript
const api = new Openapi(document);
const validation = api.validate();

if (!validation.valid) {
  console.log('Validation errors:');
  validation.errors.forEach(error => {
    console.log(`- ${error.path}: ${error.message}`);
    console.log(`  Code: ${error.code}`);
    console.log(`  Context:`, error.context);
  });
}

// Check the actual document structure
console.log('Document keys:', Object.keys(api.getDocument()));
console.log('Info object:', api.getDocument().info);
```

**Common Causes:**

1. Missing required fields
2. Incorrect field types
3. Invalid OpenAPI version
4. Malformed nested objects

**Solution:**

```typescript
// Ensure required fields are present
const document = {
  openapi: '3.0.2', // Required
  info: {
    // Required
    title: 'My API', // Required
    version: '1.0.0', // Required
  },
  paths: {}, // Required
};

const api = new Openapi(document);
```

### Issue: Extension Property Errors

**Error:**

```
ValidationError: Invalid extension key 'custom': extension keys must start with 'x-'
```

**Solution:**

```typescript
// Incorrect
api.rootExtensions = {
  custom: 'value', // ❌ Invalid
  'vendor-extension': 'value', // ❌ Invalid
};

// Correct
api.rootExtensions = {
  'x-custom': 'value', // ✅ Valid
  'x-vendor-extension': 'value', // ✅ Valid
};
```

## TypeScript Issues

### Issue: Type Errors with Valid Code

**Error:**

```
Property 'customProperty' does not exist on type 'Openapi'
```

**Solution:**

1. Check if the property exists in the API:

```typescript
// Check available properties
console.log(Object.getOwnPropertyNames(api));
console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(api)));
```

2. Use type assertion if needed:

```typescript
// Temporary workaround
(api as any).customProperty = 'value';

// Better: extend the interface
declare module '@laag/openapi' {
  interface Openapi {
    customProperty?: string;
  }
}
```

### Issue: Generic Type Inference Problems

**Error:**

```
Argument of type 'unknown' is not assignable to parameter of type 'OpenAPIDocument'
```

**Solution:**

```typescript
// Use type assertion
const api = new Openapi(unknownDocument as OpenAPIDocument);

// Or validate first
function isOpenAPIDocument(obj: unknown): obj is OpenAPIDocument {
  return (
    typeof obj === 'object' && obj !== null && 'openapi' in obj && 'info' in obj && 'paths' in obj
  );
}

if (isOpenAPIDocument(unknownDocument)) {
  const api = new Openapi(unknownDocument);
}
```

### Issue: Strict Mode Errors

**Error:**

```
Object is possibly 'undefined'
```

**Solution:**

```typescript
// Use optional chaining
const title = api.info?.title;
const description = api.info?.description ?? 'No description';

// Or check explicitly
if (api.info) {
  const title = api.info.title;
}
```

## Performance Issues

### Issue: Slow Document Loading

**Symptoms:**

- Long delays when creating Openapi instances
- High memory usage
- Slow validation

**Debugging:**

```typescript
import { performance } from 'perf_hooks';

const start = performance.now();
const api = new Openapi(largeDocument);
const loadTime = performance.now() - start;

console.log(`Document loading took ${loadTime}ms`);
console.log(`Document size: ${JSON.stringify(largeDocument).length} characters`);
```

**Solutions:**

1. **Lazy loading for large documents:**

```typescript
// Load document without immediate validation
const api = new Openapi(document, {
  development: false, // Disable development features
  includeContext: false, // Reduce memory usage
});

// Validate only when needed
if (needsValidation) {
  const result = api.validate();
}
```

2. **Stream processing for very large documents:**

```typescript
// For extremely large documents, consider streaming
import { createReadStream } from 'fs';
import { pipeline } from 'stream/promises';

async function loadLargeDocument(filePath: string) {
  const chunks: Buffer[] = [];

  await pipeline(createReadStream(filePath), async function* (source) {
    for await (const chunk of source) {
      chunks.push(chunk);
    }
  });

  const jsonString = Buffer.concat(chunks).toString();
  return new Openapi(jsonString);
}
```

### Issue: Memory Leaks

**Symptoms:**

- Increasing memory usage over time
- Application crashes with out-of-memory errors

**Debugging:**

```typescript
// Monitor memory usage
function checkMemory() {
  const usage = process.memoryUsage();
  console.log('Memory usage:', {
    rss: Math.round(usage.rss / 1024 / 1024) + 'MB',
    heapUsed: Math.round(usage.heapUsed / 1024 / 1024) + 'MB',
    heapTotal: Math.round(usage.heapTotal / 1024 / 1024) + 'MB',
  });
}

checkMemory();
const api = new Openapi(document);
checkMemory();
```

**Solutions:**

1. **Proper cleanup:**

```typescript
// Clear references when done
let api = new Openapi(document);
// ... use api
api = null; // Allow garbage collection
```

2. **Avoid circular references:**

```typescript
// Don't store references back to the API instance
const pathItem = api.getPath('/users');
// Don't do: pathItem.api = api;
```

## Browser-Specific Issues

### Issue: Bundle Size Too Large

**Problem:**

```
WARNING in asset size limit: The following asset(s) exceed the recommended size limit
```

**Solution:**

1. **Use tree-shaking:**

```typescript
// Import only what you need
import { Openapi } from '@laag/openapi';

// Don't import everything
// import * as Laag from '@laag/openapi'; // ❌
```

2. **Configure bundler for optimization:**

```javascript
// webpack.config.js
module.exports = {
  optimization: {
    usedExports: true,
    sideEffects: false,
  },
};
```

3. **Use dynamic imports:**

```typescript
// Load laag only when needed
async function loadApi() {
  const { Openapi } = await import('@laag/openapi');
  return new Openapi();
}
```

### Issue: Browser Compatibility

**Error:**

```
ReferenceError: process is not defined
```

**Solution:**
Configure your bundler to provide Node.js polyfills:

```javascript
// webpack.config.js
module.exports = {
  resolve: {
    fallback: {
      process: require.resolve('process/browser'),
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
};
```

## Development Environment Issues

### Issue: IDE Not Recognizing Types

**Problem:**

- No IntelliSense/autocomplete
- Type errors not showing
- Import suggestions not working

**Solution:**

1. **Restart TypeScript service:**
   - VS Code: `Ctrl+Shift+P` → "TypeScript: Restart TS Server"
   - WebStorm: File → Invalidate Caches and Restart

2. **Check TypeScript configuration:**

```json
// tsconfig.json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

3. **Verify package installation:**

```bash
# Check if types are installed
ls node_modules/@laag/*/dist/types/

# Reinstall if missing
npm install --force
```

### Issue: Hot Reload Not Working

**Problem:**
Changes to laag code don't trigger hot reload in development.

**Solution:**

1. **Configure your dev server:**

```javascript
// vite.config.js
export default {
  server: {
    watch: {
      include: ['src/**', 'node_modules/@laag/**'],
    },
  },
};
```

2. **Use file watching:**

```javascript
// webpack.config.js
module.exports = {
  watchOptions: {
    ignored: /node_modules\/(?!@laag)/,
  },
};
```

## Getting Additional Help

### Enable Debug Mode

```typescript
// Enable detailed error information
const api = new Openapi(document, {
  development: true,
  includeContext: true,
  includeStack: true,
});
```

### Collect Diagnostic Information

```typescript
function collectDiagnostics() {
  return {
    nodeVersion: process.version,
    platform: process.platform,
    laagVersion: require('@laag/openapi/package.json').version,
    typescriptVersion: require('typescript/package.json').version,
    memoryUsage: process.memoryUsage(),
  };
}

console.log('Diagnostics:', collectDiagnostics());
```

### Report Issues

When reporting issues, include:

1. **Minimal reproduction case**
2. **Error messages and stack traces**
3. **Environment information**
4. **Package versions**
5. **Configuration files (tsconfig.json, webpack.config.js, etc.)**

### Community Resources

- **GitHub Issues**: Report bugs and feature requests
- **Documentation**: Check the API documentation
- **Examples**: Review working examples in the repository
- **Stack Overflow**: Search for existing solutions

Remember: Most issues are configuration-related. Double-check your setup before assuming it's a library bug!
