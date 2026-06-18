---
name: validation
description: Validating OpenAPI and Smithy documents using laag. Use when checking if a spec is valid, debugging validation errors, or writing validation logic.
---

# Validation with laag

## OpenAPI Validation (`@laag/openapi`)

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi(document);
const result = api.validate();
```

### ValidationResult shape

```typescript
interface ValidationResult {
  valid: boolean;
  errors: Array<{
    path: string;   // e.g. 'info.title'
    message: string;
    code: string;   // e.g. 'REQUIRED_FIELD_MISSING'
  }>;
}
```

### What OpenAPI validation checks

- `openapi` field present
- `info` object present with `title` and `version`
- `paths` object present

### Example

```typescript
const api = new Openapi({ openapi: '3.0.2', paths: {} }); // missing info
const result = api.validate();

console.log(result.valid); // false
console.log(result.errors);
// [
//   { path: 'info', message: 'Info object is required', code: 'REQUIRED_FIELD_MISSING' }
// ]
```

---

## Smithy Validation (`@laag/smithy`)

Smithy validation runs automatically in the constructor — an invalid model throws rather than returning errors. Use `validate()` for post-construction re-validation.

```typescript
import { Smithy } from '@laag/smithy';
import { ParseError, ValidationError } from '@laag/core';

try {
  const smithy = new Smithy(model);
} catch (e) {
  if (e instanceof ParseError) {
    console.error('JSON parse failed:', e.message);
  } else if (e instanceof ValidationError) {
    console.error('Model invalid:', e.message);
  }
}
```

### Post-construction validation

```typescript
const smithy = new Smithy(model);

// After mutations, re-validate
smithy.addShape('ns#NewShape', { type: 'structure', members: {} });
const result = smithy.validate();

if (!result.valid) {
  result.errors.forEach(e => {
    console.error(`[${e.code}] ${e.path}: ${e.message}`);
  });
}
```

### What Smithy validation checks

- Model structure (required `smithy` version field, `shapes` map)
- Each shape's required fields for its type
- Trait validity for each shape
- Member target references exist (shape validation)

---

## Core Error Classes (`@laag/core`)

```typescript
import { ParseError, ValidationError } from '@laag/core';

// ParseError — thrown when JSON string can't be parsed
// ValidationError — thrown when document structure is invalid
```

Both extend standard `Error` with additional context fields.

---

## Utility: Validate before processing

```typescript
import { Openapi } from '@laag/openapi';

function loadAndValidate(doc: unknown): Openapi {
  const api = new Openapi(doc as any);
  const result = api.validate();

  if (!result.valid) {
    const messages = result.errors.map(e => `${e.path}: ${e.message}`).join('\n');
    throw new Error(`Invalid OpenAPI document:\n${messages}`);
  }

  return api;
}
```
