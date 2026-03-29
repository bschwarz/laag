[**Laag Library Collection**](../../../README.md)

***

[Laag Library Collection](../../../modules.md) / [openapi/src](../README.md) / TagObject

# Interface: TagObject

Defined in: [packages/openapi/src/types.ts:321](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L321)

Adds metadata to a single tag that is used by the Operation Object

## Extends

- [`ExtensionObject`](../../../@laag/core/interfaces/ExtensionObject.md)

## Indexable

\[`key`: `` `x-${string}` ``\]: `unknown`

## Properties

### name

> **name**: `string`

Defined in: [packages/openapi/src/types.ts:323](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L323)

REQUIRED. The name of the tag

***

### description?

> `optional` **description**: `string`

Defined in: [packages/openapi/src/types.ts:325](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L325)

A short description for the tag

***

### externalDocs?

> `optional` **externalDocs**: [`ExternalDocumentationObject`](ExternalDocumentationObject.md)

Defined in: [packages/openapi/src/types.ts:327](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L327)

Additional external documentation for this tag
