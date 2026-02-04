[**@laag/smithy v1.0.0-alpha.0**](../README.md)

***

[@laag/smithy](../globals.md) / SmithyModel

# Interface: SmithyModel

Defined in: [smithy/src/types.ts:49](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/types.ts#L49)

Main Smithy model interface

## Properties

### smithy

> **smithy**: `string`

Defined in: [smithy/src/types.ts:51](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/types.ts#L51)

Smithy version (e.g., "2.0")

***

### metadata?

> `optional` **metadata**: `Record`\<`string`, `unknown`\>

Defined in: [smithy/src/types.ts:53](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/types.ts#L53)

Optional metadata

***

### shapes

> **shapes**: `Record`\<[`ShapeId`](../type-aliases/ShapeId.md), [`Shape`](../type-aliases/Shape.md)\>

Defined in: [smithy/src/types.ts:55](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/types.ts#L55)

Shape definitions keyed by shape ID
