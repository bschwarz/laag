[**Laag Library Collection**](../../../README.md)

***

[Laag Library Collection](../../../modules.md) / [smithy/src](../README.md) / MarkerTrait

# Class: MarkerTrait

Defined in: [packages/smithy/src/traits/base-trait.ts:80](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/traits/base-trait.ts#L80)

Marker trait - a trait with no value (empty object)

## Extends

- [`BaseTrait`](BaseTrait.md)

## Extended by

- [`HttpLabelTrait`](HttpLabelTrait.md)
- [`HttpPayloadTrait`](HttpPayloadTrait.md)
- [`AwsArnReferenceTrait`](AwsArnReferenceTrait.md)
- [`AwsControlPlaneTrait`](AwsControlPlaneTrait.md)
- [`AwsDataPlaneTrait`](AwsDataPlaneTrait.md)

## Constructors

### Constructor

> **new MarkerTrait**(`id`): `MarkerTrait`

Defined in: [packages/smithy/src/traits/base-trait.ts:81](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/traits/base-trait.ts#L81)

#### Parameters

##### id

`string`

#### Returns

`MarkerTrait`

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

### getValue()

> **getValue**(): `unknown`

Defined in: [packages/smithy/src/traits/base-trait.ts:48](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/traits/base-trait.ts#L48)

Get the trait value

#### Returns

`unknown`

The trait value

#### Inherited from

[`BaseTrait`](BaseTrait.md).[`getValue`](BaseTrait.md#getvalue)

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

### toJSON()

> **toJSON**(): `Record`\<`string`, `never`\>

Defined in: [packages/smithy/src/traits/base-trait.ts:88](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/traits/base-trait.ts#L88)

Marker traits always return an empty object

#### Returns

`Record`\<`string`, `never`\>

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

> `readonly` **value**: `unknown`

Defined in: [packages/smithy/src/traits/base-trait.ts:21](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/traits/base-trait.ts#L21)

The trait value

#### Inherited from

[`BaseTrait`](BaseTrait.md).[`value`](BaseTrait.md#value)
