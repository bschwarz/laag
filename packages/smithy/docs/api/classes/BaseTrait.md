[**@laag/smithy v1.0.0-alpha.0**](../README.md)

***

[@laag/smithy](../globals.md) / BaseTrait

# Abstract Class: BaseTrait

Defined in: [smithy/src/traits/base-trait.ts:12](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/base-trait.ts#L12)

Base class for all Smithy traits
Provides common functionality for trait implementations

## Extended by

- [`ArrayTrait`](ArrayTrait.md)
- [`MarkerTrait`](MarkerTrait.md)
- [`NumberTrait`](NumberTrait.md)
- [`ObjectTrait`](ObjectTrait.md)
- [`ShapeReferenceTrait`](ShapeReferenceTrait.md)
- [`StringTrait`](StringTrait.md)

## Constructors

### Constructor

> **new BaseTrait**(`id`, `value`): `BaseTrait`

Defined in: [smithy/src/traits/base-trait.ts:28](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/base-trait.ts#L28)

Create a new trait

#### Parameters

##### id

`string`

The trait ID

##### value

`unknown`

The trait value

#### Returns

`BaseTrait`

## Methods

### toObject()

> **toObject**(): `object`

Defined in: [smithy/src/traits/base-trait.ts:37](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/base-trait.ts#L37)

Get the trait as a plain object

#### Returns

`object`

Object representation of the trait

##### id

> **id**: `string`

##### value

> **value**: `unknown`

***

### getValue()

> **getValue**(): `unknown`

Defined in: [smithy/src/traits/base-trait.ts:48](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/base-trait.ts#L48)

Get the trait value

#### Returns

`unknown`

The trait value

***

### getId()

> **getId**(): `string`

Defined in: [smithy/src/traits/base-trait.ts:56](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/base-trait.ts#L56)

Get the trait ID

#### Returns

`string`

The trait ID

***

### toJSON()

> **toJSON**(): `unknown`

Defined in: [smithy/src/traits/base-trait.ts:64](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/base-trait.ts#L64)

Convert trait to JSON

#### Returns

`unknown`

JSON representation

***

### toString()

> **toString**(): `string`

Defined in: [smithy/src/traits/base-trait.ts:72](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/base-trait.ts#L72)

Convert trait to string

#### Returns

`string`

String representation

## Properties

### id

> `readonly` **id**: `string`

Defined in: [smithy/src/traits/base-trait.ts:16](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/base-trait.ts#L16)

The trait ID (e.g., "smithy.api#http")

***

### value

> `readonly` **value**: `unknown`

Defined in: [smithy/src/traits/base-trait.ts:21](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/base-trait.ts#L21)

The trait value
