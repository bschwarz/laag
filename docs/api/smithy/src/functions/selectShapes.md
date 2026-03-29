[**Laag Library Collection**](../../../README.md)

***

[Laag Library Collection](../../../modules.md) / [smithy/src](../README.md) / selectShapes

# Function: selectShapes()

> **selectShapes**(`selector`, `shapes`): [`SelectorMatch`](../interfaces/SelectorMatch.md)[]

Defined in: [packages/smithy/src/utils/selector.ts:267](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/utils/selector.ts#L267)

Select shapes from a model using a selector

## Parameters

### selector

`string`

The selector string

### shapes

`Map`\<`string`, [`Shape`](../type-aliases/Shape.md)\>

Map of shape IDs to shapes

## Returns

[`SelectorMatch`](../interfaces/SelectorMatch.md)[]

Array of matching shapes with their IDs

## Example

```typescript
// Select all structures
selectShapes("structure", shapesMap)

// Select all shapes with required trait
selectShapes("[trait|required]", shapesMap)

// Select all shapes
selectShapes("*", shapesMap)
```
