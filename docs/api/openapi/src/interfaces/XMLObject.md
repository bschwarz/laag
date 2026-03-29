[**Laag Library Collection**](../../../README.md)

***

[Laag Library Collection](../../../modules.md) / [openapi/src](../README.md) / XMLObject

# Interface: XMLObject

Defined in: [packages/openapi/src/types.ts:397](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L397)

A metadata object that allows for more fine-tuned XML model definitions

## Extends

- [`ExtensionObject`](../../../@laag/core/interfaces/ExtensionObject.md)

## Indexable

\[`key`: `` `x-${string}` ``\]: `unknown`

## Properties

### name?

> `optional` **name**: `string`

Defined in: [packages/openapi/src/types.ts:399](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L399)

Replaces the name of the element/attribute used for the described schema property

***

### namespace?

> `optional` **namespace**: `string`

Defined in: [packages/openapi/src/types.ts:401](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L401)

The URI of the namespace definition

***

### prefix?

> `optional` **prefix**: `string`

Defined in: [packages/openapi/src/types.ts:403](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L403)

The prefix to be used for the name

***

### attribute?

> `optional` **attribute**: `boolean`

Defined in: [packages/openapi/src/types.ts:405](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L405)

Declares whether the property definition translates to an attribute instead of an element

***

### wrapped?

> `optional` **wrapped**: `boolean`

Defined in: [packages/openapi/src/types.ts:407](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L407)

MAY be used only for an array definition
