[**Laag Library Collection**](../../../README.md)

***

[Laag Library Collection](../../../modules.md) / [smithy/src](../README.md) / AwsControlPlaneTrait

# Class: AwsControlPlaneTrait

Defined in: [packages/smithy/src/traits/aws-traits.ts:212](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/traits/aws-traits.ts#L212)

AWS control plane trait - marks an operation as a control plane operation

## See

https://smithy.io/2.0/aws/aws-core.html

## Extends

- [`MarkerTrait`](MarkerTrait.md)

## Constructors

### Constructor

> **new AwsControlPlaneTrait**(): `AwsControlPlaneTrait`

Defined in: [packages/smithy/src/traits/aws-traits.ts:213](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/traits/aws-traits.ts#L213)

#### Returns

`AwsControlPlaneTrait`

#### Overrides

[`MarkerTrait`](MarkerTrait.md).[`constructor`](MarkerTrait.md#constructor)

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

[`MarkerTrait`](MarkerTrait.md).[`toObject`](MarkerTrait.md#toobject)

***

### getValue()

> **getValue**(): `unknown`

Defined in: [packages/smithy/src/traits/base-trait.ts:48](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/traits/base-trait.ts#L48)

Get the trait value

#### Returns

`unknown`

The trait value

#### Inherited from

[`MarkerTrait`](MarkerTrait.md).[`getValue`](MarkerTrait.md#getvalue)

***

### getId()

> **getId**(): `string`

Defined in: [packages/smithy/src/traits/base-trait.ts:56](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/traits/base-trait.ts#L56)

Get the trait ID

#### Returns

`string`

The trait ID

#### Inherited from

[`MarkerTrait`](MarkerTrait.md).[`getId`](MarkerTrait.md#getid)

***

### toString()

> **toString**(): `string`

Defined in: [packages/smithy/src/traits/base-trait.ts:72](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/traits/base-trait.ts#L72)

Convert trait to string

#### Returns

`string`

String representation

#### Inherited from

[`MarkerTrait`](MarkerTrait.md).[`toString`](MarkerTrait.md#tostring)

***

### toJSON()

> **toJSON**(): `Record`\<`string`, `never`\>

Defined in: [packages/smithy/src/traits/base-trait.ts:88](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/traits/base-trait.ts#L88)

Marker traits always return an empty object

#### Returns

`Record`\<`string`, `never`\>

#### Inherited from

[`MarkerTrait`](MarkerTrait.md).[`toJSON`](MarkerTrait.md#tojson)

## Properties

### id

> `readonly` **id**: `string`

Defined in: [packages/smithy/src/traits/base-trait.ts:16](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/traits/base-trait.ts#L16)

The trait ID (e.g., "smithy.api#http")

#### Inherited from

[`MarkerTrait`](MarkerTrait.md).[`id`](MarkerTrait.md#id)

***

### value

> `readonly` **value**: `unknown`

Defined in: [packages/smithy/src/traits/base-trait.ts:21](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/traits/base-trait.ts#L21)

The trait value

#### Inherited from

[`MarkerTrait`](MarkerTrait.md).[`value`](MarkerTrait.md#value)
