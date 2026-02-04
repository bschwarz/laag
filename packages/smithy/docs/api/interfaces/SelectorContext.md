[**@laag/smithy v1.0.0-alpha.0**](../README.md)

***

[@laag/smithy](../globals.md) / SelectorContext

# Interface: SelectorContext

Defined in: [smithy/src/utils/selector.ts:40](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/utils/selector.ts#L40)

Selector context for matching

## Properties

### shapes

> **shapes**: `Map`\<`string`, [`Shape`](../type-aliases/Shape.md)\>

Defined in: [smithy/src/utils/selector.ts:42](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/utils/selector.ts#L42)

All shapes in the model

***

### currentShape?

> `optional` **currentShape**: [`Shape`](../type-aliases/Shape.md)

Defined in: [smithy/src/utils/selector.ts:44](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/utils/selector.ts#L44)

Current shape being evaluated

***

### currentShapeId?

> `optional` **currentShapeId**: `string`

Defined in: [smithy/src/utils/selector.ts:46](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/utils/selector.ts#L46)

Current shape ID being evaluated
