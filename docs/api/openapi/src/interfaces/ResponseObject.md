[**Laag Library Collection**](../../../README.md)

***

[Laag Library Collection](../../../modules.md) / [openapi/src](../README.md) / ResponseObject

# Interface: ResponseObject

Defined in: [packages/openapi/src/types.ts:270](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L270)

Describes a single response from an API Operation

## Extends

- [`ExtensionObject`](../../../@laag/core/interfaces/ExtensionObject.md)

## Indexable

\[`key`: `` `x-${string}` ``\]: `unknown`

## Properties

### description

> **description**: `string`

Defined in: [packages/openapi/src/types.ts:272](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L272)

REQUIRED. A short description of the response

***

### headers?

> `optional` **headers**: `Record`\<`string`, [`ReferenceObject`](ReferenceObject.md) \| [`HeaderObject`](../type-aliases/HeaderObject.md)\>

Defined in: [packages/openapi/src/types.ts:274](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L274)

Maps a header name to its definition

***

### content?

> `optional` **content**: `Record`\<`string`, [`MediaTypeObject`](MediaTypeObject.md)\>

Defined in: [packages/openapi/src/types.ts:276](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L276)

A map containing descriptions of potential response payloads

***

### links?

> `optional` **links**: `Record`\<`string`, [`ReferenceObject`](ReferenceObject.md) \| [`LinkObject`](LinkObject.md)\>

Defined in: [packages/openapi/src/types.ts:278](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L278)

A map of operations links that can be followed from the response
