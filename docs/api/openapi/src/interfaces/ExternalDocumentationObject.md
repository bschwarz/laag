[**Laag Library Collection**](../../../README.md)

***

[Laag Library Collection](../../../modules.md) / [openapi/src](../README.md) / ExternalDocumentationObject

# Interface: ExternalDocumentationObject

Defined in: [packages/openapi/src/types.ts:165](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L165)

Allows referencing an external resource for extended documentation

## Extends

- [`ExtensionObject`](../../../@laag/core/interfaces/ExtensionObject.md)

## Indexable

\[`key`: `` `x-${string}` ``\]: `unknown`

## Properties

### url

> **url**: `string`

Defined in: [packages/openapi/src/types.ts:167](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L167)

REQUIRED. The URL for the target documentation

***

### description?

> `optional` **description**: `string`

Defined in: [packages/openapi/src/types.ts:169](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L169)

A short description of the target documentation
