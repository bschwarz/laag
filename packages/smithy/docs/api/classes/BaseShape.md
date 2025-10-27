[**@laag/smithy v1.0.0-alpha.0**](../README.md)

***

[@laag/smithy](../globals.md) / BaseShape

# Class: BaseShape

Defined in: [smithy/src/shapes/base-shape.ts:12](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/base-shape.ts#L12)

Base class for all Smithy shapes
Provides common functionality for shape manipulation

## Extended by

- [`OperationShape`](OperationShape.md)
- [`ResourceShape`](ResourceShape.md)
- [`ServiceShape`](ServiceShape.md)
- [`StructureShape`](StructureShape.md)

## Implements

- `BaseShape`

## Constructors

### Constructor

> **new BaseShape**(`type`, `traits?`): `BaseShape`

Defined in: [smithy/src/shapes/base-shape.ts:21](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/base-shape.ts#L21)

Create a new BaseShape

#### Parameters

##### type

[`ShapeType`](../type-aliases/ShapeType.md)

The shape type

##### traits?

`Record`\<`string`, `unknown`\>

Optional traits applied to the shape

#### Returns

`BaseShape`

## Methods

### getTrait()

> **getTrait**(`traitId`): `unknown`

Defined in: [smithy/src/shapes/base-shape.ts:31](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/base-shape.ts#L31)

Get a trait value by trait ID

#### Parameters

##### traitId

`string`

The trait ID to retrieve

#### Returns

`unknown`

The trait value, or undefined if not found

***

### hasTrait()

> **hasTrait**(`traitId`): `boolean`

Defined in: [smithy/src/shapes/base-shape.ts:40](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/base-shape.ts#L40)

Check if the shape has a specific trait

#### Parameters

##### traitId

`string`

The trait ID to check

#### Returns

`boolean`

True if the trait exists

***

### setTrait()

> **setTrait**(`traitId`, `value`): `void`

Defined in: [smithy/src/shapes/base-shape.ts:49](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/base-shape.ts#L49)

Add or update a trait

#### Parameters

##### traitId

`string`

The trait ID

##### value

`unknown`

The trait value

#### Returns

`void`

***

### removeTrait()

> **removeTrait**(`traitId`): `boolean`

Defined in: [smithy/src/shapes/base-shape.ts:59](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/base-shape.ts#L59)

Remove a trait

#### Parameters

##### traitId

`string`

The trait ID to remove

#### Returns

`boolean`

True if the trait was removed, false if it didn't exist

***

### getTraitIds()

> **getTraitIds**(): `string`[]

Defined in: [smithy/src/shapes/base-shape.ts:71](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/base-shape.ts#L71)

Get all trait IDs

#### Returns

`string`[]

Array of trait IDs

***

### getTraits()

> **getTraits**(): `Record`\<`string`, `unknown`\>

Defined in: [smithy/src/shapes/base-shape.ts:79](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/base-shape.ts#L79)

Get all traits

#### Returns

`Record`\<`string`, `unknown`\>

Record of all traits

***

### toObject()

> **toObject**(): `BaseShape`

Defined in: [smithy/src/shapes/base-shape.ts:87](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/base-shape.ts#L87)

Convert the shape to a plain object

#### Returns

`BaseShape`

Plain object representation

## Properties

### type

> **type**: [`ShapeType`](../type-aliases/ShapeType.md)

Defined in: [smithy/src/shapes/base-shape.ts:13](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/base-shape.ts#L13)

The type of the shape

#### Implementation of

`IBaseShape.type`

***

### traits?

> `optional` **traits**: `Record`\<`string`, `unknown`\>

Defined in: [smithy/src/shapes/base-shape.ts:14](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/base-shape.ts#L14)

Optional traits applied to the shape

#### Implementation of

`IBaseShape.traits`
