[**Laag Library Collection**](../../../README.md)

***

[Laag Library Collection](../../../modules.md) / [openapi/src](../README.md) / RequestBodyObject

# Interface: RequestBodyObject

Defined in: [packages/openapi/src/types.ts:219](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L219)

Describes a single request body

## Extends

- [`ExtensionObject`](../../../@laag/core/interfaces/ExtensionObject.md)

## Indexable

\[`key`: `` `x-${string}` ``\]: `unknown`

## Properties

### description?

> `optional` **description**: `string`

Defined in: [packages/openapi/src/types.ts:221](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L221)

A brief description of the request body

***

### content

> **content**: `Record`\<`string`, [`MediaTypeObject`](MediaTypeObject.md)\>

Defined in: [packages/openapi/src/types.ts:223](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L223)

REQUIRED. The content of the request body

***

### required?

> `optional` **required**: `boolean`

Defined in: [packages/openapi/src/types.ts:225](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L225)

Determines if the request body is required in the request
