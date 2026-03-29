[**Laag Library Collection**](../../../README.md)

***

[Laag Library Collection](../../../modules.md) / [smithy/src](../README.md) / NumberTrait

# Class: NumberTrait

Defined in: [packages/smithy/src/traits/base-trait.ts:116](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/traits/base-trait.ts#L116)

Number trait - a trait with a numeric value

## Extends

- [`BaseTrait`](BaseTrait.md)

## Extended by

- [`HttpErrorTrait`](HttpErrorTrait.md)
- [`HttpResponseCodeTrait`](HttpResponseCodeTrait.md)

## Constructors

### Constructor

> **new NumberTrait**(`id`, `value`): `NumberTrait`

Defined in: [packages/smithy/src/traits/base-trait.ts:119](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/traits/base-trait.ts#L119)

#### Parameters

##### id

`string`

##### value

`number`

#### Returns

`NumberTrait`

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

> **getValue**(): `number`

Defined in: [packages/smithy/src/traits/base-trait.ts:124](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/traits/base-trait.ts#L124)

Get the trait value

#### Returns

`number`

The trait value

#### Overrides

[`BaseTrait`](BaseTrait.md).[`getValue`](BaseTrait.md#getvalue)

***

### toJSON()

> **toJSON**(): `number`

Defined in: [packages/smithy/src/traits/base-trait.ts:128](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/traits/base-trait.ts#L128)

Convert trait to JSON

#### Returns

`number`

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

> `readonly` **value**: `number`

Defined in: [packages/smithy/src/traits/base-trait.ts:117](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/traits/base-trait.ts#L117)

The trait value

#### Overrides

[`BaseTrait`](BaseTrait.md).[`value`](BaseTrait.md#value)
