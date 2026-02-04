[**@laag/smithy v1.0.0-alpha.0**](../README.md)

***

[@laag/smithy](../globals.md) / createShapeId

# Function: createShapeId()

> **createShapeId**(`namespace`, `name`): `string`

Defined in: [smithy/src/utils/shape-id.ts:223](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/utils/shape-id.ts#L223)

Create an absolute shape ID from namespace and name

## Parameters

### namespace

`string`

The namespace

### name

`string`

The shape name

## Returns

`string`

The absolute shape ID

## Example

```typescript
createShapeId("smithy.api", "String")  // "smithy.api#String"
```
