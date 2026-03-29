[**@laag/smithy v1.0.0-alpha.0**](../README.md)

***

[@laag/smithy](../globals.md) / TypeScriptGenerator

# Class: TypeScriptGenerator

Defined in: [smithy/src/generators/typescript-generator.ts:21](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/generators/typescript-generator.ts#L21)

Generates TypeScript code from Smithy models

## Constructors

### Constructor

> **new TypeScriptGenerator**(`options`): `TypeScriptGenerator`

Defined in: [smithy/src/generators/typescript-generator.ts:26](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/generators/typescript-generator.ts#L26)

#### Parameters

##### options

[`GeneratorOptions`](../interfaces/GeneratorOptions.md) = `{}`

#### Returns

`TypeScriptGenerator`

## Methods

### generate()

> **generate**(`model`, `options?`): `string`

Defined in: [smithy/src/generators/typescript-generator.ts:35](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/generators/typescript-generator.ts#L35)

Generate TypeScript code for the entire model

#### Parameters

##### model

[`SmithyModel`](../interfaces/SmithyModel.md)

##### options?

[`GeneratorOptions`](../interfaces/GeneratorOptions.md)

#### Returns

`string`

***

### generateInterface()

> **generateInterface**(`shapeId`, `shape`, `allShapes`): `string`

Defined in: [smithy/src/generators/typescript-generator.ts:82](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/generators/typescript-generator.ts#L82)

Generate a TypeScript interface for a structure shape

#### Parameters

##### shapeId

`string`

##### shape

`StructureShape`

##### allShapes

`Record`\<[`ShapeId`](../type-aliases/ShapeId.md), [`Shape`](../type-aliases/Shape.md)\>

#### Returns

`string`

***

### generateClient()

> **generateClient**(`serviceId`, `service`, `allShapes`): `string`

Defined in: [smithy/src/generators/typescript-generator.ts:130](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/generators/typescript-generator.ts#L130)

Generate a TypeScript client for a service shape

#### Parameters

##### serviceId

`string`

##### service

`ServiceShape`

##### allShapes

`Record`\<[`ShapeId`](../type-aliases/ShapeId.md), [`Shape`](../type-aliases/Shape.md)\>

#### Returns

`string`
