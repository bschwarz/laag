[**Laag Library Collection**](../../../README.md)

***

[Laag Library Collection](../../../modules.md) / [smithy/src](../README.md) / selectByNamespace

# Function: selectByNamespace()

> **selectByNamespace**(`namespace`, `shapes`): [`SelectorMatch`](../interfaces/SelectorMatch.md)[]

Defined in: [packages/smithy/src/utils/selector.ts:332](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/utils/selector.ts#L332)

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
