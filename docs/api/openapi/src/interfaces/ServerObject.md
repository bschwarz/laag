[**Laag Library Collection**](../../../README.md)

***

[Laag Library Collection](../../../modules.md) / [openapi/src](../README.md) / ServerObject

# Interface: ServerObject

Defined in: [packages/openapi/src/types.ts:74](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L74)

An object representing a Server

## Extends

- [`ExtensionObject`](../../../@laag/core/interfaces/ExtensionObject.md)

## Indexable

\[`key`: `` `x-${string}` ``\]: `unknown`

## Properties

### url

> **url**: `string`

Defined in: [packages/openapi/src/types.ts:76](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L76)

REQUIRED. A URL to the target host

***

### description?

> `optional` **description**: `string`

Defined in: [packages/openapi/src/types.ts:78](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L78)

An optional string describing the host designated by the URL

***

### variables?

> `optional` **variables**: `Record`\<`string`, [`ServerVariableObject`](ServerVariableObject.md)\>

Defined in: [packages/openapi/src/types.ts:80](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L80)

A map between a variable name and its value
