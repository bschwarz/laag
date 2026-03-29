[**Laag Library Collection**](../../../README.md)

***

[Laag Library Collection](../../../modules.md) / [openapi/src](../README.md) / InfoObject

# Interface: InfoObject

Defined in: [packages/openapi/src/types.ts:34](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L34)

The object provides metadata about the API

## Extends

- [`ExtensionObject`](../../../@laag/core/interfaces/ExtensionObject.md)

## Indexable

\[`key`: `` `x-${string}` ``\]: `unknown`

## Properties

### title

> **title**: `string`

Defined in: [packages/openapi/src/types.ts:36](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L36)

REQUIRED. The title of the API

***

### version

> **version**: `string`

Defined in: [packages/openapi/src/types.ts:38](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L38)

REQUIRED. The version of the OpenAPI document

***

### description?

> `optional` **description**: `string`

Defined in: [packages/openapi/src/types.ts:40](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L40)

A short description of the API

***

### termsOfService?

> `optional` **termsOfService**: `string`

Defined in: [packages/openapi/src/types.ts:42](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L42)

A URL to the Terms of Service for the API

***

### contact?

> `optional` **contact**: [`ContactObject`](ContactObject.md)

Defined in: [packages/openapi/src/types.ts:44](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L44)

The contact information for the exposed API

***

### license?

> `optional` **license**: [`LicenseObject`](LicenseObject.md)

Defined in: [packages/openapi/src/types.ts:46](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L46)

The license information for the exposed API
