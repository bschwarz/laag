[**Laag Library Collection**](../../../README.md)

***

[Laag Library Collection](../../../modules.md) / [openapi/src](../README.md) / ServerVariableObject

# Interface: ServerVariableObject

Defined in: [packages/openapi/src/types.ts:86](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L86)

An object representing a Server Variable for server URL template substitution

## Extends

- [`ExtensionObject`](../../../@laag/core/interfaces/ExtensionObject.md)

## Indexable

\[`key`: `` `x-${string}` ``\]: `unknown`

## Properties

### default

> **default**: `string`

Defined in: [packages/openapi/src/types.ts:88](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L88)

REQUIRED. The default value to use for substitution

***

### enum?

> `optional` **enum**: `string`[]

Defined in: [packages/openapi/src/types.ts:90](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L90)

An enumeration of string values to be used if the substitution options are from a limited set

***

### description?

> `optional` **description**: `string`

Defined in: [packages/openapi/src/types.ts:92](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L92)

An optional description for the server variable
