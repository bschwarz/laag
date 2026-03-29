[**Laag Library Collection**](../../../README.md)

***

[Laag Library Collection](../../../modules.md) / [openapi/src](../README.md) / OperationObject

# Interface: OperationObject

Defined in: [packages/openapi/src/types.ts:135](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L135)

Describes a single API operation on a path

## Extends

- [`ExtensionObject`](../../../@laag/core/interfaces/ExtensionObject.md)

## Indexable

\[`key`: `` `x-${string}` ``\]: `unknown`

## Properties

### tags?

> `optional` **tags**: `string`[]

Defined in: [packages/openapi/src/types.ts:137](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L137)

A list of tags for API documentation control

***

### summary?

> `optional` **summary**: `string`

Defined in: [packages/openapi/src/types.ts:139](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L139)

A short summary of what the operation does

***

### description?

> `optional` **description**: `string`

Defined in: [packages/openapi/src/types.ts:141](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L141)

A verbose explanation of the operation behavior

***

### externalDocs?

> `optional` **externalDocs**: [`ExternalDocumentationObject`](ExternalDocumentationObject.md)

Defined in: [packages/openapi/src/types.ts:143](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L143)

Additional external documentation for this operation

***

### operationId?

> `optional` **operationId**: `string`

Defined in: [packages/openapi/src/types.ts:145](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L145)

Unique string used to identify the operation

***

### parameters?

> `optional` **parameters**: ([`ParameterObject`](ParameterObject.md) \| [`ReferenceObject`](ReferenceObject.md))[]

Defined in: [packages/openapi/src/types.ts:147](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L147)

A list of parameters that are applicable for this operation

***

### requestBody?

> `optional` **requestBody**: [`ReferenceObject`](ReferenceObject.md) \| [`RequestBodyObject`](RequestBodyObject.md)

Defined in: [packages/openapi/src/types.ts:149](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L149)

The request body applicable for this operation

***

### responses

> **responses**: [`ResponsesObject`](ResponsesObject.md)

Defined in: [packages/openapi/src/types.ts:151](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L151)

REQUIRED. The list of possible responses as they are returned from executing this operation

***

### callbacks?

> `optional` **callbacks**: `Record`\<`string`, [`ReferenceObject`](ReferenceObject.md) \| [`CallbackObject`](../type-aliases/CallbackObject.md)\>

Defined in: [packages/openapi/src/types.ts:153](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L153)

A map of possible out-of band callbacks related to the parent operation

***

### deprecated?

> `optional` **deprecated**: `boolean`

Defined in: [packages/openapi/src/types.ts:155](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L155)

Declares this operation to be deprecated

***

### security?

> `optional` **security**: [`SecurityRequirementObject`](SecurityRequirementObject.md)[]

Defined in: [packages/openapi/src/types.ts:157](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L157)

A declaration of which security mechanisms can be used for this operation

***

### servers?

> `optional` **servers**: [`ServerObject`](ServerObject.md)[]

Defined in: [packages/openapi/src/types.ts:159](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L159)

An alternative server array to service this operation
