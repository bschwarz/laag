[**@laag/smithy v1.0.0-alpha.0**](../README.md)

***

[@laag/smithy](../globals.md) / OperationShape

# Class: OperationShape

Defined in: [smithy/src/shapes/operation.ts:13](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/operation.ts#L13)

Represents a Smithy operation shape
Operations define service actions with input, output, and errors

## Extends

- [`BaseShape`](BaseShape.md)

## Constructors

### Constructor

> **new OperationShape**(`input?`, `output?`, `errors?`, `traits?`): `OperationShape`

Defined in: [smithy/src/shapes/operation.ts:25](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/operation.ts#L25)

Create a new OperationShape

#### Parameters

##### input?

`string`

Optional input structure

##### output?

`string`

Optional output structure

##### errors?

`string`[]

Optional error structures

##### traits?

`Record`\<`string`, `unknown`\>

Optional traits applied to the shape

#### Returns

`OperationShape`

#### Overrides

[`BaseShape`](BaseShape.md).[`constructor`](BaseShape.md#constructor)

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

#### Inherited from

[`BaseShape`](BaseShape.md).[`getTrait`](BaseShape.md#gettrait)

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

#### Inherited from

[`BaseShape`](BaseShape.md).[`hasTrait`](BaseShape.md#hastrait)

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

#### Inherited from

[`BaseShape`](BaseShape.md).[`setTrait`](BaseShape.md#settrait)

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

#### Inherited from

[`BaseShape`](BaseShape.md).[`removeTrait`](BaseShape.md#removetrait)

***

### getTraitIds()

> **getTraitIds**(): `string`[]

Defined in: [smithy/src/shapes/base-shape.ts:71](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/base-shape.ts#L71)

Get all trait IDs

#### Returns

`string`[]

Array of trait IDs

#### Inherited from

[`BaseShape`](BaseShape.md).[`getTraitIds`](BaseShape.md#gettraitids)

***

### getTraits()

> **getTraits**(): `Record`\<`string`, `unknown`\>

Defined in: [smithy/src/shapes/base-shape.ts:79](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/base-shape.ts#L79)

Get all traits

#### Returns

`Record`\<`string`, `unknown`\>

Record of all traits

#### Inherited from

[`BaseShape`](BaseShape.md).[`getTraits`](BaseShape.md#gettraits)

***

### setInput()

> **setInput**(`inputId`): `void`

Defined in: [smithy/src/shapes/operation.ts:41](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/operation.ts#L41)

Set the input shape

#### Parameters

##### inputId

`string`

The input shape ID

#### Returns

`void`

***

### getInput()

> **getInput**(): `string` \| `undefined`

Defined in: [smithy/src/shapes/operation.ts:49](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/operation.ts#L49)

Get the input shape ID

#### Returns

`string` \| `undefined`

The input shape ID, or undefined if not set

***

### setOutput()

> **setOutput**(`outputId`): `void`

Defined in: [smithy/src/shapes/operation.ts:57](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/operation.ts#L57)

Set the output shape

#### Parameters

##### outputId

`string`

The output shape ID

#### Returns

`void`

***

### getOutput()

> **getOutput**(): `string` \| `undefined`

Defined in: [smithy/src/shapes/operation.ts:65](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/operation.ts#L65)

Get the output shape ID

#### Returns

`string` \| `undefined`

The output shape ID, or undefined if not set

***

### addError()

> **addError**(`errorId`): `void`

Defined in: [smithy/src/shapes/operation.ts:73](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/operation.ts#L73)

Add an error to the operation

#### Parameters

##### errorId

`string`

The error shape ID

#### Returns

`void`

***

### removeError()

> **removeError**(`errorId`): `boolean`

Defined in: [smithy/src/shapes/operation.ts:85](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/operation.ts#L85)

Remove an error from the operation

#### Parameters

##### errorId

`string`

The error shape ID to remove

#### Returns

`boolean`

True if the error was removed, false if it didn't exist

***

### getErrors()

> **getErrors**(): `string`[]

Defined in: [smithy/src/shapes/operation.ts:101](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/operation.ts#L101)

Get all errors

#### Returns

`string`[]

Array of error shape IDs

***

### toObject()

> **toObject**(): `OperationShape`

Defined in: [smithy/src/shapes/operation.ts:109](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/operation.ts#L109)

Convert the shape to a plain object

#### Returns

`OperationShape`

Plain object representation

#### Overrides

[`BaseShape`](BaseShape.md).[`toObject`](BaseShape.md#toobject)

## Properties

### type

> **type**: [`ShapeType`](../type-aliases/ShapeType.md)

Defined in: [smithy/src/shapes/base-shape.ts:13](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/base-shape.ts#L13)

The type of the shape

#### Inherited from

[`BaseShape`](BaseShape.md).[`type`](BaseShape.md#type)

***

### traits?

> `optional` **traits**: `Record`\<`string`, `unknown`\>

Defined in: [smithy/src/shapes/base-shape.ts:14](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/base-shape.ts#L14)

Optional traits applied to the shape

#### Inherited from

[`BaseShape`](BaseShape.md).[`traits`](BaseShape.md#traits)

***

### input?

> `optional` **input**: `string`

Defined in: [smithy/src/shapes/operation.ts:14](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/operation.ts#L14)

***

### output?

> `optional` **output**: `string`

Defined in: [smithy/src/shapes/operation.ts:15](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/operation.ts#L15)

***

### errors?

> `optional` **errors**: `string`[]

Defined in: [smithy/src/shapes/operation.ts:16](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/operation.ts#L16)
