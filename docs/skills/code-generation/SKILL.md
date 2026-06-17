---
name: code-generation
description: Generating code samples and client code from OpenAPI or Smithy specs using laag. Use when asked to generate Python, JavaScript, TypeScript code or curl commands from an API spec.
---

# Code Generation with laag

## OpenAPI Code Generation (`@laag/openapi`)

### JSON Sample Generation

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi(document);

// Generate request payload sample from schema
const requestSample = api.generateJsonSample('/users', 'post', 'request');
// Returns: { name: 'string', email: 'user@example.com', age: 0 }

// Generate response payload sample from schema
const responseSample = api.generateJsonSample('/users', 'post', 'response');
// Returns null if no schema found
```

Schema types are handled automatically:
- `string` → `'string'` (or format-specific: `'user@example.com'`, `'2023-01-01'`, etc.)
- `integer`/`number` → `0` or minimum value if specified
- `boolean` → `false`
- `array` → `[<item sample>]`
- `object` → `{ <property: sample> }`
- `$ref` → resolved recursively
- `allOf` → merged object
- `oneOf`/`anyOf` → first schema used
- `example` field → used as-is when present

### curl Command Generation

```typescript
const commands = api.getCurlCommands('/users', 'post');
// Returns: [{ command: string, description: string }]
// One entry per server defined in the spec

commands.forEach(({ command, description }) => {
  console.log(`# ${description}`);
  console.log(command);
});
```

Output includes `-H "Authorization: <auth-token>"` and `-d '<request-payload>'` for POST/PUT/PATCH.

### Python Code Generation

```typescript
const pythonCode = api.getPythonCode('/users', 'post');
console.log(pythonCode);
```

Generated code uses `requests` library and includes:
- Server URL(s) as comments
- `params` and `headers` dicts
- Request body JSON if schema is present
- Response parsing

### JavaScript Code Generation

```typescript
// Async/await (default)
const jsCode = api.getJavaScriptCode('/users', 'post');

// Promise chain
const jsCodePromise = api.getJavaScriptCode('/users', 'post', false);
```

Generated code uses `fetch` and includes full error handling.

### TypeScript Code Generation

```typescript
const tsCode = api.getTypeScriptCode('/users', 'post');
```

Generated code includes:
- `RequestBody` and `ResponseBody` interfaces derived from schemas
- Typed async function with `RequestInit` config
- Usage example

---

## Smithy Code Generation (`@laag/smithy`)

### TypeScript Generation

```typescript
import { Smithy } from '@laag/smithy';

const smithy = new Smithy(model);

const tsCode = smithy.generateTypeScript({
  includeComments: true,
  indent: 2
});
```

Generates TypeScript interfaces for structures and client classes for services.

### JavaScript Generation

```typescript
const jsCode = smithy.generateJavaScript({
  includeComments: true,
  outputFormat: 'class',
  indent: 2
});
```

### Python Generation

```typescript
const pyCode = smithy.generatePython({
  includeComments: true,
  indent: 4
});
```

Generates Python dataclasses for structures and client classes for services.

---

## GeneratorOptions (Smithy)

```typescript
interface GeneratorOptions {
  includeComments?: boolean;  // add JSDoc/docstring comments
  indent?: number;            // spaces per indent level
  outputFormat?: 'class' | 'interface'; // JS only
}
```

---

## Full Example: Generate code for every operation

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi(document);

for (const path of api.getPathNames()) {
  for (const method of ['get', 'post', 'put', 'delete', 'patch']) {
    if (!api.operationExists(path, method)) continue;

    const id = api.getOperationId(path, method);
    console.log(`\n=== ${method.toUpperCase()} ${path} (${id}) ===`);
    console.log('\n-- curl --');
    api.getCurlCommands(path, method).forEach(c => console.log(c.command));
    console.log('\n-- Python --');
    console.log(api.getPythonCode(path, method));
    console.log('\n-- TypeScript --');
    console.log(api.getTypeScriptCode(path, method));
  }
}
```
