[**Laag Library Collection**](../../../README.md)

***

[Laag Library Collection](../../../modules.md) / [smithy/src](../README.md) / SimpleShape

# Interface: SimpleShape

Defined in: [packages/smithy/src/types.ts:189](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/types.ts#L189)

Simple shape - represents primitive types

## Extends

- `BaseShape`

## Properties

### traits?

> `optional` **traits**: `Record`\<`string`, `unknown`\>

Defined in: [packages/smithy/src/types.ts:65](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/types.ts#L65)

Optional traits applied to the shape

#### Inherited from

`BaseShape.traits`

***

### type

> **type**: `"string"` \| `"boolean"` \| `"integer"` \| `"blob"` \| `"byte"` \| `"short"` \| `"long"` \| `"float"` \| `"double"` \| `"bigInteger"` \| `"bigDecimal"` \| `"timestamp"` \| `"document"`

Defined in: [packages/smithy/src/types.ts:190](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/types.ts#L190)

The type of the shape

#### Overrides

`BaseShape.type`
