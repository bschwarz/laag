[**Laag Library Collection**](../../../README.md)

***

[Laag Library Collection](../../../modules.md) / [openapi/src](../README.md) / MediaTypeObject

# Interface: MediaTypeObject

Defined in: [packages/openapi/src/types.ts:231](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L231)

Each Media Type Object provides schema and examples for the media type identified by its key

## Extends

- [`ExtensionObject`](../../../@laag/core/interfaces/ExtensionObject.md)

## Indexable

\[`key`: `` `x-${string}` ``\]: `unknown`

## Properties

### schema?

> `optional` **schema**: [`ReferenceObject`](ReferenceObject.md) \| [`SchemaObject`](SchemaObject.md)

Defined in: [packages/openapi/src/types.ts:233](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L233)

The schema defining the content of the request, response, or parameter

***

### example?

> `optional` **example**: `unknown`

Defined in: [packages/openapi/src/types.ts:235](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L235)

Example of the media type

***

### examples?

> `optional` **examples**: `Record`\<`string`, [`ReferenceObject`](ReferenceObject.md) \| [`ExampleObject`](ExampleObject.md)\>

Defined in: [packages/openapi/src/types.ts:237](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L237)

Examples of the media type

***

### encoding?

> `optional` **encoding**: `Record`\<`string`, [`EncodingObject`](EncodingObject.md)\>

Defined in: [packages/openapi/src/types.ts:239](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L239)

A map between a property name and its encoding information
