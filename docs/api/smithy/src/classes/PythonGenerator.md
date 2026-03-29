[**Laag Library Collection**](../../../README.md)

***

[Laag Library Collection](../../../modules.md) / [smithy/src](../README.md) / PythonGenerator

# Class: PythonGenerator

Defined in: [packages/smithy/src/generators/python-generator.ts:21](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/generators/python-generator.ts#L21)

Generates Python code from Smithy models

## Constructors

### Constructor

> **new PythonGenerator**(`options`): `PythonGenerator`

Defined in: [packages/smithy/src/generators/python-generator.ts:26](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/generators/python-generator.ts#L26)

#### Parameters

##### options

[`GeneratorOptions`](../interfaces/GeneratorOptions.md) = `{}`

#### Returns

`PythonGenerator`

## Methods

### generate()

> **generate**(`model`, `options?`): `string`

Defined in: [packages/smithy/src/generators/python-generator.ts:35](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/generators/python-generator.ts#L35)

Generate Python code for the entire model

#### Parameters

##### model

[`SmithyModel`](../interfaces/SmithyModel.md)

##### options?

[`GeneratorOptions`](../interfaces/GeneratorOptions.md)

#### Returns

`string`

***

### generateClass()

> **generateClass**(`shapeId`, `shape`, `allShapes`): `string`

Defined in: [packages/smithy/src/generators/python-generator.ts:89](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/generators/python-generator.ts#L89)

Generate a Python class for a structure shape

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

Defined in: [packages/smithy/src/generators/python-generator.ts:148](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/generators/python-generator.ts#L148)

Generate a Python client for a service shape

#### Parameters

##### serviceId

`string`

##### service

`ServiceShape`

##### allShapes

`Record`\<[`ShapeId`](../type-aliases/ShapeId.md), [`Shape`](../type-aliases/Shape.md)\>

#### Returns

`string`
