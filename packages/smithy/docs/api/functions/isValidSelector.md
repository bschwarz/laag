[**@laag/smithy v1.0.0-alpha.0**](../README.md)

***

[@laag/smithy](../globals.md) / isValidSelector

# Function: isValidSelector()

> **isValidSelector**(`selector`): `boolean`

Defined in: [smithy/src/utils/selector.ts:469](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/utils/selector.ts#L469)

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
