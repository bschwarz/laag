[**Laag Library Collection**](../../../README.md)

***

[Laag Library Collection](../../../modules.md) / [smithy/src](../README.md) / ArrayTrait

# Class: ArrayTrait

Defined in: [packages/smithy/src/traits/base-trait.ts:158](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/traits/base-trait.ts#L158)

Array trait - a trait with an array value

## Extends

- [`BaseTrait`](BaseTrait.md)

## Constructors

### Constructor

> **new ArrayTrait**(`id`, `value`): `ArrayTrait`

Defined in: [packages/smithy/src/traits/base-trait.ts:161](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/traits/base-trait.ts#L161)

#### Parameters

##### id

`string`

##### value

`unknown`[]

#### Returns

`ArrayTrait`

#### Overrides

[`BaseTrait`](BaseTrait.md).[`constructor`](BaseTrait.md#constructor)

## Methods

### toObject()

> **toObject**(): `object`

Defined in: [packages/smithy/src/traits/base-trait.ts:37](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/traits/base-trait.ts#L37)

Get the trait as a plain object

#### Returns

`object`

Object representation of the trait

##### id

> **id**: `string`

##### value

> **value**: `unknown`

#### Inherited from

[`BaseTrait`](BaseTrait.md).[`toObject`](BaseTrait.md#toobject)

***

### getId()

> **getId**(): `string`

Defined in: [packages/smithy/src/traits/base-trait.ts:56](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/traits/base-trait.ts#L56)

Get the trait ID

#### Returns

`string`

The trait ID

#### Inherited from

[`BaseTrait`](BaseTrait.md).[`getId`](BaseTrait.md#getid)

***

### toString()

> **toString**(): `string`

Defined in: [packages/smithy/src/traits/base-trait.ts:72](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/traits/base-trait.ts#L72)

Convert trait to string

#### Returns

`string`

String representation

#### Inherited from

[`BaseTrait`](BaseTrait.md).[`toString`](BaseTrait.md#tostring)

***

### getValue()

> **getValue**(): `unknown`[]

Defined in: [packages/smithy/src/traits/base-trait.ts:166](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/traits/base-trait.ts#L166)

Get the trait value

#### Returns

`unknown`[]

The trait value

#### Overrides

[`BaseTrait`](BaseTrait.md).[`getValue`](BaseTrait.md#getvalue)

***

### toJSON()

> **toJSON**(): `unknown`[]

Defined in: [packages/smithy/src/traits/base-trait.ts:170](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/traits/base-trait.ts#L170)

Convert trait to JSON

#### Returns

`unknown`[]

JSON representation

#### Overrides

[`BaseTrait`](BaseTrait.md).[`toJSON`](BaseTrait.md#tojson)

## Properties

### id

> `readonly` **id**: `string`

Defined in: [packages/smithy/src/traits/base-trait.ts:16](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/traits/base-trait.ts#L16)

The trait ID (e.g., "smithy.api#http")

#### Inherited from

[`BaseTrait`](BaseTrait.md).[`id`](BaseTrait.md#id)

***

### value

> `readonly` **value**: `unknown`[]

Defined in: [packages/smithy/src/traits/base-trait.ts:159](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/traits/base-trait.ts#L159)

The trait value

#### Overrides

[`BaseTrait`](BaseTrait.md).[`value`](BaseTrait.md#value)
