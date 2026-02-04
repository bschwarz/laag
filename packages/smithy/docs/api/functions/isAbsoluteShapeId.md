[**@laag/smithy v1.0.0-alpha.0**](../README.md)

***

[@laag/smithy](../globals.md) / isAbsoluteShapeId

# Function: isAbsoluteShapeId()

> **isAbsoluteShapeId**(`shapeId`): `boolean`

Defined in: [smithy/src/utils/shape-id.ts:159](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/utils/shape-id.ts#L159)

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
