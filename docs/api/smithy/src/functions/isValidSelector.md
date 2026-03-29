[**Laag Library Collection**](../../../README.md)

***

[Laag Library Collection](../../../modules.md) / [smithy/src](../README.md) / isValidSelector

# Function: isValidSelector()

> **isValidSelector**(`selector`): `boolean`

Defined in: [packages/smithy/src/utils/selector.ts:469](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/utils/selector.ts#L469)

Validate a selector string

## Parameters

### selector

`string`

The selector string to validate

## Returns

`boolean`

True if valid, false otherwise

## Example

```typescript
isValidSelector("structure")           // true
isValidSelector("*")                   // true
isValidSelector("[trait|required]")    // true
isValidSelector("invalid syntax")      // false
```
