[**@laag/smithy v1.0.0-alpha.0**](../README.md)

***

[@laag/smithy](../globals.md) / selectByNamespace

# Function: selectByNamespace()

> **selectByNamespace**(`namespace`, `shapes`): [`SelectorMatch`](../interfaces/SelectorMatch.md)[]

Defined in: [smithy/src/utils/selector.ts:332](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/utils/selector.ts#L332)

Select shapes by namespace

## Parameters

### namespace

`string`

The namespace to select by

### shapes

`Map`\<`string`, [`Shape`](../type-aliases/Shape.md)\>

Map of shape IDs to shapes

## Returns

[`SelectorMatch`](../interfaces/SelectorMatch.md)[]

Array of matching shapes with their IDs

## Example

```typescript
selectByNamespace("example.weather", shapesMap)
selectByNamespace("smithy.api", shapesMap)
```
