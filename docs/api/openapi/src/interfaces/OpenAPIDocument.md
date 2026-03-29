[**Laag Library Collection**](../../../README.md)

***

[Laag Library Collection](../../../modules.md) / [openapi/src](../README.md) / OpenAPIDocument

# Interface: OpenAPIDocument

Defined in: [packages/openapi/src/types.ts:12](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L12)

The root document object of the OpenAPI document

## Extends

- [`BaseDocument`](../../../@laag/core/interfaces/BaseDocument.md)

## Indexable

\[`key`: `string`\]: `unknown`

\[`key`: `` `x-${string}` ``\]: `unknown`

## Properties

### openapi

> **openapi**: `string`

Defined in: [packages/openapi/src/types.ts:14](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L14)

REQUIRED. This string MUST be the semantic version number of the OpenAPI Specification version that the OpenAPI document uses

***

### info

> **info**: [`InfoObject`](InfoObject.md)

Defined in: [packages/openapi/src/types.ts:16](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L16)

REQUIRED. Provides metadata about the API

***

### paths

> **paths**: [`PathsObject`](../type-aliases/PathsObject.md)

Defined in: [packages/openapi/src/types.ts:18](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L18)

REQUIRED. The available paths and operations for the API

***

### servers?

> `optional` **servers**: [`ServerObject`](ServerObject.md)[]

Defined in: [packages/openapi/src/types.ts:20](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L20)

An array of Server Objects, which provide connectivity information to a target server

***

### components?

> `optional` **components**: [`ComponentsObject`](ComponentsObject.md)

Defined in: [packages/openapi/src/types.ts:22](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L22)

An element to hold various schemas for the specification

***

### security?

> `optional` **security**: [`SecurityRequirementObject`](SecurityRequirementObject.md)[]

Defined in: [packages/openapi/src/types.ts:24](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L24)

A declaration of which security mechanisms can be used across the API

***

### tags?

> `optional` **tags**: [`TagObject`](TagObject.md)[]

Defined in: [packages/openapi/src/types.ts:26](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L26)

A list of tags used by the specification with additional metadata

***

### externalDocs?

> `optional` **externalDocs**: [`ExternalDocumentationObject`](ExternalDocumentationObject.md)

Defined in: [packages/openapi/src/types.ts:28](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L28)

Additional external documentation
