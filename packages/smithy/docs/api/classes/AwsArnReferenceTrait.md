[**@laag/smithy v1.0.0-alpha.0**](../README.md)

***

[@laag/smithy](../globals.md) / AwsArnReferenceTrait

# Class: AwsArnReferenceTrait

Defined in: [smithy/src/traits/aws-traits.ts:177](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/aws-traits.ts#L177)

AWS ARN reference trait - indicates a string contains an ARN

## See

https://smithy.io/2.0/aws/aws-core.html#aws-api-arn-trait

## Extends

- [`MarkerTrait`](MarkerTrait.md)

## Constructors

### Constructor

> **new AwsArnReferenceTrait**(): `AwsArnReferenceTrait`

Defined in: [smithy/src/traits/aws-traits.ts:178](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/aws-traits.ts#L178)

#### Returns

`AwsArnReferenceTrait`

#### Overrides

[`MarkerTrait`](MarkerTrait.md).[`constructor`](MarkerTrait.md#constructor)

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

#### Inherited from

[`MarkerTrait`](MarkerTrait.md).[`toObject`](MarkerTrait.md#toobject)

***

### getValue()

> **getValue**(): `unknown`

Defined in: [smithy/src/traits/base-trait.ts:48](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/base-trait.ts#L48)

Get the trait value

#### Returns

`unknown`

The trait value

#### Inherited from

[`MarkerTrait`](MarkerTrait.md).[`getValue`](MarkerTrait.md#getvalue)

***

### getId()

> **getId**(): `string`

Defined in: [smithy/src/traits/base-trait.ts:56](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/base-trait.ts#L56)

Get the trait ID

#### Returns

`string`

The trait ID

#### Inherited from

[`MarkerTrait`](MarkerTrait.md).[`getId`](MarkerTrait.md#getid)

***

### toString()

> **toString**(): `string`

Defined in: [smithy/src/traits/base-trait.ts:72](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/base-trait.ts#L72)

Convert trait to string

#### Returns

`string`

String representation

#### Inherited from

[`MarkerTrait`](MarkerTrait.md).[`toString`](MarkerTrait.md#tostring)

***

### toJSON()

> **toJSON**(): `Record`\<`string`, `never`\>

Defined in: [smithy/src/traits/base-trait.ts:88](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/base-trait.ts#L88)

Marker traits always return an empty object

#### Returns

`Record`\<`string`, `never`\>

#### Inherited from

[`MarkerTrait`](MarkerTrait.md).[`toJSON`](MarkerTrait.md#tojson)

## Properties

### id

> `readonly` **id**: `string`

Defined in: [smithy/src/traits/base-trait.ts:16](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/base-trait.ts#L16)

The trait ID (e.g., "smithy.api#http")

#### Inherited from

[`MarkerTrait`](MarkerTrait.md).[`id`](MarkerTrait.md#id)

***

### value

> `readonly` **value**: `unknown`

Defined in: [smithy/src/traits/base-trait.ts:21](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/base-trait.ts#L21)

The trait value

#### Inherited from

[`MarkerTrait`](MarkerTrait.md).[`value`](MarkerTrait.md#value)
