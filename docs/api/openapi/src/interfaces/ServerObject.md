[**Laag Library Collection**](../../../README.md)

***

[Laag Library Collection](../../../modules.md) / [openapi/src](../README.md) / ServerObject

# Interface: ServerObject

Defined in: [packages/openapi/src/types.ts:74](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L74)

An object representing a Server

## Extends

- [`ExtensionObject`](../../../@laag/core/interfaces/ExtensionObject.md)

## Indexable

\[`key`: `` `x-${string}` ``\]: `unknown`

## Properties

### url

> **url**: `string`

Defined in: [packages/openapi/src/types.ts:76](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L76)

REQUIRED. A URL to the target host

***

### description?

> `optional` **description**: `string`

Defined in: [packages/openapi/src/types.ts:78](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L78)

An optional string describing the host designated by the URL

***

### variables?

> `optional` **variables**: `Record`\<`string`, [`ServerVariableObject`](ServerVariableObject.md)\>

Defined in: [packages/openapi/src/types.ts:80](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L80)

A map between a variable name and its value
