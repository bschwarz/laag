[**Laag Library Collection**](../../../README.md)

***

[Laag Library Collection](../../../modules.md) / [openapi/src](../README.md) / EncodingObject

# Interface: EncodingObject

Defined in: [packages/openapi/src/types.ts:245](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L245)

A single encoding definition applied to a single schema property

## Extends

- [`ExtensionObject`](../../../@laag/core/interfaces/ExtensionObject.md)

## Indexable

\[`key`: `` `x-${string}` ``\]: `unknown`

## Properties

### contentType?

> `optional` **contentType**: `string`

Defined in: [packages/openapi/src/types.ts:247](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L247)

The Content-Type for encoding a specific property

***

### headers?

> `optional` **headers**: `Record`\<`string`, [`ReferenceObject`](ReferenceObject.md) \| [`HeaderObject`](../type-aliases/HeaderObject.md)\>

Defined in: [packages/openapi/src/types.ts:249](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L249)

A map allowing additional information to be provided as headers

***

### style?

> `optional` **style**: [`ParameterStyle`](../type-aliases/ParameterStyle.md)

Defined in: [packages/openapi/src/types.ts:251](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L251)

Describes how a specific property value will be serialized depending on its type

***

### explode?

> `optional` **explode**: `boolean`

Defined in: [packages/openapi/src/types.ts:253](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L253)

When this is true, property values of type array or object generate separate parameters for each value of the array, or key-value-pair of the map

***

### allowReserved?

> `optional` **allowReserved**: `boolean`

Defined in: [packages/openapi/src/types.ts:255](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L255)

Determines whether the parameter value SHOULD allow reserved characters
