[**Laag Library Collection**](../../README.md)

***

[Laag Library Collection](../../modules.md) / @laag/core

# @laag/core

@laag/core - Core functionality for the laag library collection.

This package provides the foundational classes, types, and utilities that are
shared across all laag library packages. It includes the base class for API
specification implementations, error handling system, and common type definitions.

## Version

2.0.0

## Example

```typescript
import { LaagBase, ValidationError } from '@laag/core';

class MyApiSpec extends LaagBase {
  validate() {
    // Implementation-specific validation
    return { valid: true, errors: [] };
  }
}
```

## Classes

- [LaagBase](classes/LaagBase.md)
- [LaagError](classes/LaagError.md)
- [ValidationError](classes/ValidationError.md)
- [ParseError](classes/ParseError.md)
- [NotFoundError](classes/NotFoundError.md)

## Interfaces

- [ExtensionObject](interfaces/ExtensionObject.md)
- [ValidationResult](interfaces/ValidationResult.md)
- [ValidationErrorType](interfaces/ValidationErrorType.md)
- [BaseDocument](interfaces/BaseDocument.md)
- [ErrorHandlingOptions](interfaces/ErrorHandlingOptions.md)
