[**Laag Library Collection**](../../../README.md)

***

[Laag Library Collection](../../../modules.md) / [openapi/src](../README.md) / PathItemObject

# Interface: PathItemObject

Defined in: [packages/openapi/src/types.ts:103](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L103)

Describes the operations available on a single path

## Extends

- [`ExtensionObject`](../../../@laag/core/interfaces/ExtensionObject.md)

## Indexable

\[`key`: `` `x-${string}` ``\]: `unknown`

## Properties

### $ref?

> `optional` **$ref**: `string`

Defined in: [packages/openapi/src/types.ts:105](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L105)

Allows for an external definition of this path item

***

### summary?

> `optional` **summary**: `string`

Defined in: [packages/openapi/src/types.ts:107](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L107)

An optional, string summary, intended to apply to all operations in this path

***

### description?

> `optional` **description**: `string`

Defined in: [packages/openapi/src/types.ts:109](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L109)

An optional, string description, intended to apply to all operations in this path

***

### get?

> `optional` **get**: [`OperationObject`](OperationObject.md)

Defined in: [packages/openapi/src/types.ts:111](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L111)

A definition of a GET operation on this path

***

### put?

> `optional` **put**: [`OperationObject`](OperationObject.md)

Defined in: [packages/openapi/src/types.ts:113](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L113)

A definition of a PUT operation on this path

***

### post?

> `optional` **post**: [`OperationObject`](OperationObject.md)

Defined in: [packages/openapi/src/types.ts:115](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L115)

A definition of a POST operation on this path

***

### delete?

> `optional` **delete**: [`OperationObject`](OperationObject.md)

Defined in: [packages/openapi/src/types.ts:117](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L117)

A definition of a DELETE operation on this path

***

### options?

> `optional` **options**: [`OperationObject`](OperationObject.md)

Defined in: [packages/openapi/src/types.ts:119](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L119)

A definition of a OPTIONS operation on this path

***

### head?

> `optional` **head**: [`OperationObject`](OperationObject.md)

Defined in: [packages/openapi/src/types.ts:121](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L121)

A definition of a HEAD operation on this path

***

### patch?

> `optional` **patch**: [`OperationObject`](OperationObject.md)

Defined in: [packages/openapi/src/types.ts:123](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L123)

A definition of a PATCH operation on this path

***

### trace?

> `optional` **trace**: [`OperationObject`](OperationObject.md)

Defined in: [packages/openapi/src/types.ts:125](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L125)

A definition of a TRACE operation on this path

***

### servers?

> `optional` **servers**: [`ServerObject`](ServerObject.md)[]

Defined in: [packages/openapi/src/types.ts:127](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L127)

An alternative server array to service all operations in this path

***

### parameters?

> `optional` **parameters**: ([`ParameterObject`](ParameterObject.md) \| [`ReferenceObject`](ReferenceObject.md))[]

Defined in: [packages/openapi/src/types.ts:129](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L129)

A list of parameters that are applicable for all the operations under this path
