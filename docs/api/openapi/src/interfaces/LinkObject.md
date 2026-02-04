[**Laag Library Collection**](../../../README.md)

***

[Laag Library Collection](../../../modules.md) / [openapi/src](../README.md) / LinkObject

# Interface: LinkObject

Defined in: [packages/openapi/src/types.ts:303](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L303)

The Link object represents a possible design-time link for a response

## Extends

- [`ExtensionObject`](../../../@laag/core/interfaces/ExtensionObject.md)

## Indexable

\[`key`: `` `x-${string}` ``\]: `unknown`

## Properties

### operationRef?

> `optional` **operationRef**: `string`

Defined in: [packages/openapi/src/types.ts:305](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L305)

A relative or absolute URI reference to an OAS operation

***

### operationId?

> `optional` **operationId**: `string`

Defined in: [packages/openapi/src/types.ts:307](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L307)

The name of an existing, resolvable OAS operation, as defined with a unique operationId

***

### parameters?

> `optional` **parameters**: `Record`\<`string`, `unknown`\>

Defined in: [packages/openapi/src/types.ts:309](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L309)

A map representing parameters to pass to an operation as specified with operationId or identified via operationRef

***

### requestBody?

> `optional` **requestBody**: `unknown`

Defined in: [packages/openapi/src/types.ts:311](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L311)

A literal value or {expression} to use as a request body when calling the target operation

***

### description?

> `optional` **description**: `string`

Defined in: [packages/openapi/src/types.ts:313](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L313)

A description of the link

***

### server?

> `optional` **server**: [`ServerObject`](ServerObject.md)

Defined in: [packages/openapi/src/types.ts:315](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L315)

A server object to be used by the target operation
