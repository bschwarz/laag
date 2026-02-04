[**@laag/smithy v1.0.0-alpha.0**](../README.md)

***

[@laag/smithy](../globals.md) / AwsCloudFormationNameTrait

# Class: AwsCloudFormationNameTrait

Defined in: [smithy/src/traits/aws-traits.ts:143](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/aws-traits.ts#L143)

AWS CloudFormation name trait - defines the CloudFormation resource name

## See

https://smithy.io/2.0/aws/aws-cloudformation.html

## Extends

- [`StringTrait`](StringTrait.md)

## Constructors

### Constructor

> **new AwsCloudFormationNameTrait**(`name`): `AwsCloudFormationNameTrait`

Defined in: [smithy/src/traits/aws-traits.ts:144](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/aws-traits.ts#L144)

#### Parameters

##### name

`string`

#### Returns

`AwsCloudFormationNameTrait`

#### Overrides

[`StringTrait`](StringTrait.md).[`constructor`](StringTrait.md#constructor)

## Methods

### getName()

> **getName**(): `string`

Defined in: [smithy/src/traits/aws-traits.ts:151](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/aws-traits.ts#L151)

Get the CloudFormation resource name

#### Returns

`string`

***

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

#### Inherited from

[`StringTrait`](StringTrait.md).[`toObject`](StringTrait.md#toobject)

***

### getId()

> **getId**(): `string`

Defined in: [smithy/src/traits/base-trait.ts:56](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/base-trait.ts#L56)

Get the trait ID

#### Returns

`string`

The trait ID

#### Inherited from

[`StringTrait`](StringTrait.md).[`getId`](StringTrait.md#getid)

***

### toString()

> **toString**(): `string`

Defined in: [smithy/src/traits/base-trait.ts:72](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/base-trait.ts#L72)

Convert trait to string

#### Returns

`string`

String representation

#### Inherited from

[`StringTrait`](StringTrait.md).[`toString`](StringTrait.md#tostring)

***

### getValue()

> **getValue**(): `string`

Defined in: [smithy/src/traits/base-trait.ts:104](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/base-trait.ts#L104)

Get the trait value

#### Returns

`string`

The trait value

#### Inherited from

[`StringTrait`](StringTrait.md).[`getValue`](StringTrait.md#getvalue)

***

### toJSON()

> **toJSON**(): `string`

Defined in: [smithy/src/traits/base-trait.ts:108](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/base-trait.ts#L108)

Convert trait to JSON

#### Returns

`string`

JSON representation

#### Inherited from

[`StringTrait`](StringTrait.md).[`toJSON`](StringTrait.md#tojson)

## Properties

### id

> `readonly` **id**: `string`

Defined in: [smithy/src/traits/base-trait.ts:16](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/base-trait.ts#L16)

The trait ID (e.g., "smithy.api#http")

#### Inherited from

[`StringTrait`](StringTrait.md).[`id`](StringTrait.md#id)

***

### value

> `readonly` **value**: `string`

Defined in: [smithy/src/traits/base-trait.ts:97](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/base-trait.ts#L97)

The trait value

#### Inherited from

[`StringTrait`](StringTrait.md).[`value`](StringTrait.md#value)
