[**Laag Library Collection**](../../../README.md)

***

[Laag Library Collection](../../../modules.md) / [@laag/core](../README.md) / ErrorHandlingOptions

# Interface: ErrorHandlingOptions

Defined in: [packages/core/src/types.ts:148](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/core/src/types.ts#L148)

Configuration options for error handling behavior.

These options control how errors are formatted and what information is included
in error messages and context data.

 ErrorHandlingOptions

## Since

2.0.0

## Example

```typescript
const options: ErrorHandlingOptions = {
  includeContext: true,    // Include context data in error messages
  includeStack: false,     // Don't include stack traces
  development: true        // Use development-friendly error formatting
};

const spec = new MyApiSpec(document, options);
```

## Properties

### includeContext?

> `optional` **includeContext**: `boolean`

Defined in: [packages/core/src/types.ts:150](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/core/src/types.ts#L150)

Whether to include context information in error messages. Defaults to true.

***

### includeStack?

> `optional` **includeStack**: `boolean`

Defined in: [packages/core/src/types.ts:152](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/core/src/types.ts#L152)

Whether to include stack traces in error output. Defaults to false.

***

### development?

> `optional` **development**: `boolean`

Defined in: [packages/core/src/types.ts:154](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/core/src/types.ts#L154)

Whether to use development-friendly error formatting. Auto-detected from NODE_ENV.
