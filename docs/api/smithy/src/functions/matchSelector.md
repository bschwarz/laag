[**Laag Library Collection**](../../../README.md)

***

[Laag Library Collection](../../../modules.md) / [smithy/src](../README.md) / matchSelector

# Function: matchSelector()

> **matchSelector**(`shape`, `shapeId`, `selector`, `context`): `boolean`

Defined in: [packages/smithy/src/utils/selector.ts:173](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/utils/selector.ts#L173)

Match a shape against a selector

## Parameters

### shape

[`Shape`](../type-aliases/Shape.md)

The shape to match

### shapeId

`string`

The shape ID

### selector

The selector string or tokens

`string` | `SelectorToken`[]

### context

[`SelectorContext`](../interfaces/SelectorContext.md)

The selector context

## Returns

`boolean`

True if the shape matches the selector

## Example

```typescript
matchSelector(shape, shapeId, "structure", context)
matchSelector(shape, shapeId, "[trait|required]", context)
```
