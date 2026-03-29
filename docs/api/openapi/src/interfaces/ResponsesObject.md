[**Laag Library Collection**](../../../README.md)

***

[Laag Library Collection](../../../modules.md) / [openapi/src](../README.md) / ResponsesObject

# Interface: ResponsesObject

Defined in: [packages/openapi/src/types.ts:261](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L261)

A container for the expected responses of an operation

## Extends

- `Record`\<`string`, [`ResponseObject`](ResponseObject.md) \| [`ReferenceObject`](ReferenceObject.md) \| `undefined`\>

## Indexable

\[`key`: `string`\]: [`ReferenceObject`](ReferenceObject.md) \| [`ResponseObject`](ResponseObject.md) \| `undefined`

## Properties

### default?

> `optional` **default**: [`ReferenceObject`](ReferenceObject.md) \| [`ResponseObject`](ResponseObject.md)

Defined in: [packages/openapi/src/types.ts:264](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L264)

The documentation of responses other than the ones declared for specific HTTP response codes
