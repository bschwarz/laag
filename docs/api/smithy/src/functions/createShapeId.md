[**Laag Library Collection**](../../../README.md)

***

[Laag Library Collection](../../../modules.md) / [smithy/src](../README.md) / createShapeId

# Function: createShapeId()

> **createShapeId**(`namespace`, `name`): `string`

Defined in: [packages/smithy/src/utils/shape-id.ts:223](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/utils/shape-id.ts#L223)

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
