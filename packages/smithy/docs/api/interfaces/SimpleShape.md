[**@laag/smithy v1.0.0-alpha.0**](../README.md)

***

[@laag/smithy](../globals.md) / SimpleShape

# Interface: SimpleShape

Defined in: [smithy/src/types.ts:189](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/types.ts#L189)

Simple shape - represents primitive types

## Extends

- `BaseShape`

## Properties

### traits?

> `optional` **traits**: `Record`\<`string`, `unknown`\>

Defined in: [smithy/src/types.ts:65](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/types.ts#L65)

Optional traits applied to the shape

#### Inherited from

`BaseShape.traits`

***

### type

> **type**: `"string"` \| `"boolean"` \| `"blob"` \| `"byte"` \| `"short"` \| `"integer"` \| `"long"` \| `"float"` \| `"double"` \| `"bigInteger"` \| `"bigDecimal"` \| `"timestamp"` \| `"document"`

Defined in: [smithy/src/types.ts:190](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/types.ts#L190)

The type of the shape

#### Overrides

`BaseShape.type`
