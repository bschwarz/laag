[**Laag Library Collection**](../../../README.md)

***

[Laag Library Collection](../../../modules.md) / [smithy/src](../README.md) / parseSelector

# Function: parseSelector()

> **parseSelector**(`selector`): `SelectorToken`[]

Defined in: [packages/smithy/src/utils/selector.ts:73](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/utils/selector.ts#L73)

Parse a selector string into tokens

## Parameters

### selector

`string`

The selector string

## Returns

`SelectorToken`[]

Array of selector tokens

## Example

```typescript
parseSelector("structure")
parseSelector("*")
parseSelector("[trait|required]")
parseSelector("service > operation")
```
