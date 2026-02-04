[**Laag Library Collection**](../../../README.md)

***

[Laag Library Collection](../../../modules.md) / [smithy/src](../README.md) / selectByType

# Function: selectByType()

> **selectByType**(`shapeType`, `shapes`): [`SelectorMatch`](../interfaces/SelectorMatch.md)[]

Defined in: [packages/smithy/src/utils/selector.ts:298](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/utils/selector.ts#L298)

Select shapes by type

## Parameters

### shapeType

[`ShapeType`](../type-aliases/ShapeType.md)

The shape type to select

### shapes

`Map`\<`string`, [`Shape`](../type-aliases/Shape.md)\>

Map of shape IDs to shapes

## Returns

[`SelectorMatch`](../interfaces/SelectorMatch.md)[]

Array of matching shapes with their IDs

## Example

```typescript
selectByType("structure", shapesMap)
selectByType("service", shapesMap)
```
