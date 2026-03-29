[**@laag/smithy v1.0.0-alpha.0**](../README.md)

***

[@laag/smithy](../globals.md) / selectByTrait

# Function: selectByTrait()

> **selectByTrait**(`traitId`, `shapes`): [`SelectorMatch`](../interfaces/SelectorMatch.md)[]

Defined in: [smithy/src/utils/selector.ts:315](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/utils/selector.ts#L315)

Select shapes by trait

## Parameters

### traitId

`string`

The trait ID to select by

### shapes

`Map`\<`string`, [`Shape`](../type-aliases/Shape.md)\>

Map of shape IDs to shapes

## Returns

[`SelectorMatch`](../interfaces/SelectorMatch.md)[]

Array of matching shapes with their IDs

## Example

```typescript
selectByTrait("required", shapesMap)
selectByTrait("smithy.api#http", shapesMap)
```
