[**Laag Library Collection**](../../../README.md)

***

[Laag Library Collection](../../../modules.md) / [smithy/src](../README.md) / SelectorContext

# Interface: SelectorContext

Defined in: [packages/smithy/src/utils/selector.ts:40](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/utils/selector.ts#L40)

Selector context for matching

## Properties

### shapes

> **shapes**: `Map`\<`string`, [`Shape`](../type-aliases/Shape.md)\>

Defined in: [packages/smithy/src/utils/selector.ts:42](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/utils/selector.ts#L42)

All shapes in the model

***

### currentShape?

> `optional` **currentShape**: [`Shape`](../type-aliases/Shape.md)

Defined in: [packages/smithy/src/utils/selector.ts:44](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/utils/selector.ts#L44)

Current shape being evaluated

***

### currentShapeId?

> `optional` **currentShapeId**: `string`

Defined in: [packages/smithy/src/utils/selector.ts:46](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/utils/selector.ts#L46)

Current shape ID being evaluated
