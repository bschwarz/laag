[**Laag Library Collection**](../../../README.md)

***

[Laag Library Collection](../../../modules.md) / [smithy/src](../README.md) / SmithyModel

# Interface: SmithyModel

Defined in: [packages/smithy/src/types.ts:49](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/types.ts#L49)

Main Smithy model interface

## Properties

### smithy

> **smithy**: `string`

Defined in: [packages/smithy/src/types.ts:51](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/types.ts#L51)

Smithy version (e.g., "2.0")

***

### metadata?

> `optional` **metadata**: `Record`\<`string`, `unknown`\>

Defined in: [packages/smithy/src/types.ts:53](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/types.ts#L53)

Optional metadata

***

### shapes

> **shapes**: `Record`\<[`ShapeId`](../type-aliases/ShapeId.md), [`Shape`](../type-aliases/Shape.md)\>

Defined in: [packages/smithy/src/types.ts:55](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/types.ts#L55)

Shape definitions keyed by shape ID
