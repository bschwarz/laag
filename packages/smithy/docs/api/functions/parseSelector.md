[**@laag/smithy v1.0.0-alpha.0**](../README.md)

***

[@laag/smithy](../globals.md) / parseSelector

# Function: parseSelector()

> **parseSelector**(`selector`): `SelectorToken`[]

Defined in: [smithy/src/utils/selector.ts:73](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/utils/selector.ts#L73)

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
