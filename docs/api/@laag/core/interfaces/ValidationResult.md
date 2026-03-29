[**Laag Library Collection**](../../../README.md)

***

[Laag Library Collection](../../../modules.md) / [@laag/core](../README.md) / ValidationResult

# Interface: ValidationResult

Defined in: [packages/core/src/types.ts:57](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/core/src/types.ts#L57)

Result of a document validation operation.

This interface represents the outcome of validating an API specification document,
including whether the validation passed and any errors that were found.

 ValidationResult

## Since

2.0.0

## Example

```typescript
const result: ValidationResult = {
  valid: false,
  errors: [
    {
      path: 'info.title',
      message: 'Title is required',
      code: 'REQUIRED_FIELD_MISSING'
    }
  ]
};
```

## Properties

### valid

> **valid**: `boolean`

Defined in: [packages/core/src/types.ts:59](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/core/src/types.ts#L59)

Whether the validation passed without any errors

***

### errors

> **errors**: [`ValidationErrorType`](ValidationErrorType.md)[]

Defined in: [packages/core/src/types.ts:61](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/core/src/types.ts#L61)

Array of validation errors found during validation
