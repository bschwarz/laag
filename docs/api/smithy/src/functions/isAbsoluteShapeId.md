[**Laag Library Collection**](../../../README.md)

***

[Laag Library Collection](../../../modules.md) / [smithy/src](../README.md) / isAbsoluteShapeId

# Function: isAbsoluteShapeId()

> **isAbsoluteShapeId**(`shapeId`): `boolean`

Defined in: [packages/smithy/src/utils/shape-id.ts:159](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/utils/shape-id.ts#L159)

Check if a shape ID is absolute (has a namespace)

## Parameters

### shapeId

`string`

The shape ID to check

## Returns

`boolean`

True if absolute, false if relative

## Example

```typescript
isAbsoluteShapeId("smithy.api#String")  // true
isAbsoluteShapeId("MyShape")            // false
```
