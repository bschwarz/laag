[**Laag Library Collection**](../../../README.md)

***

[Laag Library Collection](../../../modules.md) / [smithy/src](../README.md) / AwsProtocolTrait

# Class: AwsProtocolTrait

Defined in: [packages/smithy/src/traits/aws-traits.ts:278](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/traits/aws-traits.ts#L278)

AWS protocol trait - defines the AWS protocol for a service

## See

https://smithy.io/2.0/aws/protocols/

## Extends

- [`StringTrait`](StringTrait.md)

## Constructors

### Constructor

> **new AwsProtocolTrait**(`protocol`): `AwsProtocolTrait`

Defined in: [packages/smithy/src/traits/aws-traits.ts:279](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/traits/aws-traits.ts#L279)

#### Parameters

##### protocol

`string`

#### Returns

`AwsProtocolTrait`

#### Overrides

[`StringTrait`](StringTrait.md).[`constructor`](StringTrait.md#constructor)

## Methods

### getProtocol()

> **getProtocol**(): `string`

Defined in: [packages/smithy/src/traits/aws-traits.ts:286](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/traits/aws-traits.ts#L286)

Get the protocol name

#### Returns

`string`

***

### isProtocol()

> **isProtocol**(`protocol`): `boolean`

Defined in: [packages/smithy/src/traits/aws-traits.ts:293](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/traits/aws-traits.ts#L293)

Check if this is a specific protocol

#### Parameters

##### protocol

`string`

#### Returns

`boolean`

***

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

[`StringTrait`](StringTrait.md).[`toObject`](StringTrait.md#toobject)

***

### getId()

> **getId**(): `string`

Defined in: [packages/smithy/src/traits/base-trait.ts:56](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/traits/base-trait.ts#L56)

Get the trait ID

#### Returns

`string`

The trait ID

#### Inherited from

[`StringTrait`](StringTrait.md).[`getId`](StringTrait.md#getid)

***

### toString()

> **toString**(): `string`

Defined in: [packages/smithy/src/traits/base-trait.ts:72](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/traits/base-trait.ts#L72)

Convert trait to string

#### Returns

`string`

String representation

#### Inherited from

[`StringTrait`](StringTrait.md).[`toString`](StringTrait.md#tostring)

***

### getValue()

> **getValue**(): `string`

Defined in: [packages/smithy/src/traits/base-trait.ts:104](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/traits/base-trait.ts#L104)

Get the trait value

#### Returns

`string`

The trait value

#### Inherited from

[`StringTrait`](StringTrait.md).[`getValue`](StringTrait.md#getvalue)

***

### toJSON()

> **toJSON**(): `string`

Defined in: [packages/smithy/src/traits/base-trait.ts:108](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/traits/base-trait.ts#L108)

Convert trait to JSON

#### Returns

`string`

JSON representation

#### Inherited from

[`StringTrait`](StringTrait.md).[`toJSON`](StringTrait.md#tojson)

## Properties

### id

> `readonly` **id**: `string`

Defined in: [packages/smithy/src/traits/base-trait.ts:16](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/traits/base-trait.ts#L16)

The trait ID (e.g., "smithy.api#http")

#### Inherited from

[`StringTrait`](StringTrait.md).[`id`](StringTrait.md#id)

***

### value

> `readonly` **value**: `string`

Defined in: [packages/smithy/src/traits/base-trait.ts:97](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/traits/base-trait.ts#L97)

The trait value

#### Inherited from

[`StringTrait`](StringTrait.md).[`value`](StringTrait.md#value)
