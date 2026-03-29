[**@laag/smithy v1.0.0-alpha.0**](../README.md)

***

[@laag/smithy](../globals.md) / selectShapes

# Function: selectShapes()

> **selectShapes**(`selector`, `shapes`): [`SelectorMatch`](../interfaces/SelectorMatch.md)[]

Defined in: [smithy/src/utils/selector.ts:267](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/utils/selector.ts#L267)

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
