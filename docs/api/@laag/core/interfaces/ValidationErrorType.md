[**Laag Library Collection**](../../../README.md)

***

[Laag Library Collection](../../../modules.md) / [@laag/core](../README.md) / ValidationErrorType

# Interface: ValidationErrorType

Defined in: [packages/core/src/types.ts:88](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/core/src/types.ts#L88)

Detailed information about a validation error.

This interface provides structured information about validation failures,
including the location of the error, a human-readable message, and a
machine-readable error code.

 ValidationError

## Since

2.0.0

## Example

```typescript
const error: ValidationError = {
  path: 'paths./users.get.responses.200',
  message: 'Response description is required',
  code: 'MISSING_DESCRIPTION',
  context: {
    statusCode: '200',
    operation: 'get',
    path: '/users'
  }
};
```

## Properties

### path

> **path**: `string`

Defined in: [packages/core/src/types.ts:90](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/core/src/types.ts#L90)

Path to the location in the document where the validation error occurred

***

### message

> **message**: `string`

Defined in: [packages/core/src/types.ts:92](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/core/src/types.ts#L92)

Human-readable description of the validation error

***

### code

> **code**: `string`

Defined in: [packages/core/src/types.ts:94](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/core/src/types.ts#L94)

Machine-readable error code for programmatic handling

***

### context?

> `optional` **context**: `Record`\<`string`, `unknown`\>

Defined in: [packages/core/src/types.ts:96](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/core/src/types.ts#L96)

Optional additional context information about the error
