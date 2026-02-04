[**@laag/smithy v1.0.0-alpha.0**](../README.md)

***

[@laag/smithy](../globals.md) / JavaScriptGenerator

# Class: JavaScriptGenerator

Defined in: [smithy/src/generators/javascript-generator.ts:21](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/generators/javascript-generator.ts#L21)

Generates JavaScript code from Smithy models

## Constructors

### Constructor

> **new JavaScriptGenerator**(`options`): `JavaScriptGenerator`

Defined in: [smithy/src/generators/javascript-generator.ts:27](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/generators/javascript-generator.ts#L27)

#### Parameters

##### options

[`GeneratorOptions`](../interfaces/GeneratorOptions.md) = `{}`

#### Returns

`JavaScriptGenerator`

## Methods

### generate()

> **generate**(`model`, `options?`): `string`

Defined in: [smithy/src/generators/javascript-generator.ts:37](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/generators/javascript-generator.ts#L37)

Generate JavaScript code for the entire model

#### Parameters

##### model

[`SmithyModel`](../interfaces/SmithyModel.md)

##### options?

[`GeneratorOptions`](../interfaces/GeneratorOptions.md)

#### Returns

`string`

***

### generateClass()

> **generateClass**(`shapeId`, `shape`, `_allShapes`): `string`

Defined in: [smithy/src/generators/javascript-generator.ts:85](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/generators/javascript-generator.ts#L85)

Generate a JavaScript class for a structure shape

#### Parameters

##### shapeId

`string`

##### shape

`StructureShape`

##### \_allShapes

`Record`\<[`ShapeId`](../type-aliases/ShapeId.md), [`Shape`](../type-aliases/Shape.md)\>

#### Returns

`string`

***

### generateClient()

> **generateClient**(`serviceId`, `service`, `allShapes`): `string`

Defined in: [smithy/src/generators/javascript-generator.ts:163](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/generators/javascript-generator.ts#L163)

Generate a JavaScript client for a service shape

#### Parameters

##### serviceId

`string`

##### service

`ServiceShape`

##### allShapes

`Record`\<[`ShapeId`](../type-aliases/ShapeId.md), [`Shape`](../type-aliases/Shape.md)\>

#### Returns

`string`
