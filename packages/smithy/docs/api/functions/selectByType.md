[**@laag/smithy v1.0.0-alpha.0**](../README.md)

***

[@laag/smithy](../globals.md) / selectByType

# Function: selectByType()

> **selectByType**(`shapeType`, `shapes`): [`SelectorMatch`](../interfaces/SelectorMatch.md)[]

Defined in: [smithy/src/utils/selector.ts:298](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/utils/selector.ts#L298)

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
