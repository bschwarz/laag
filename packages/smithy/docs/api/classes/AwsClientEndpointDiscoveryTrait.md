[**@laag/smithy v1.0.0-alpha.0**](../README.md)

***

[@laag/smithy](../globals.md) / AwsClientEndpointDiscoveryTrait

# Class: AwsClientEndpointDiscoveryTrait

Defined in: [smithy/src/traits/aws-traits.ts:232](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/aws-traits.ts#L232)

AWS client endpoint discovery trait - configures endpoint discovery

## See

https://smithy.io/2.0/aws/aws-core.html#aws-api-clientendpointdiscovery-trait

## Extends

- [`ObjectTrait`](ObjectTrait.md)\<\{ `operation`: `string`; `error?`: `string`; \}\>

## Constructors

### Constructor

> **new AwsClientEndpointDiscoveryTrait**(`value`): `AwsClientEndpointDiscoveryTrait`

Defined in: [smithy/src/traits/aws-traits.ts:236](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/aws-traits.ts#L236)

#### Parameters

##### value

###### operation

`string`

###### error?

`string`

#### Returns

`AwsClientEndpointDiscoveryTrait`

#### Overrides

[`ObjectTrait`](ObjectTrait.md).[`constructor`](ObjectTrait.md#constructor)

## Methods

### getOperation()

> **getOperation**(): `string`

Defined in: [smithy/src/traits/aws-traits.ts:243](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/aws-traits.ts#L243)

Get the discovery operation

#### Returns

`string`

***

### getError()

> **getError**(): `string` \| `undefined`

Defined in: [smithy/src/traits/aws-traits.ts:250](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/aws-traits.ts#L250)

Get the error shape for discovery failures

#### Returns

`string` \| `undefined`

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

[`ObjectTrait`](ObjectTrait.md).[`toObject`](ObjectTrait.md#toobject)

***

### getId()

> **getId**(): `string`

Defined in: [smithy/src/traits/base-trait.ts:56](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/base-trait.ts#L56)

Get the trait ID

#### Returns

`string`

The trait ID

#### Inherited from

[`ObjectTrait`](ObjectTrait.md).[`getId`](ObjectTrait.md#getid)

***

### toString()

> **toString**(): `string`

Defined in: [smithy/src/traits/base-trait.ts:72](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/base-trait.ts#L72)

Convert trait to string

#### Returns

`string`

String representation

#### Inherited from

[`ObjectTrait`](ObjectTrait.md).[`toString`](ObjectTrait.md#tostring)

***

### getValue()

> **getValue**(): `object`

Defined in: [smithy/src/traits/base-trait.ts:146](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/base-trait.ts#L146)

Get the trait value

#### Returns

`object`

The trait value

##### operation

> **operation**: `string`

##### error?

> `optional` **error**: `string`

#### Inherited from

[`ObjectTrait`](ObjectTrait.md).[`getValue`](ObjectTrait.md#getvalue)

***

### toJSON()

> **toJSON**(): `object`

Defined in: [smithy/src/traits/base-trait.ts:150](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/base-trait.ts#L150)

Convert trait to JSON

#### Returns

`object`

JSON representation

##### operation

> **operation**: `string`

##### error?

> `optional` **error**: `string`

#### Inherited from

[`ObjectTrait`](ObjectTrait.md).[`toJSON`](ObjectTrait.md#tojson)

## Properties

### id

> `readonly` **id**: `string`

Defined in: [smithy/src/traits/base-trait.ts:16](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/base-trait.ts#L16)

The trait ID (e.g., "smithy.api#http")

#### Inherited from

[`ObjectTrait`](ObjectTrait.md).[`id`](ObjectTrait.md#id)

***

### value

> `readonly` **value**: `object`

Defined in: [smithy/src/traits/base-trait.ts:139](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/base-trait.ts#L139)

The trait value

#### operation

> **operation**: `string`

#### error?

> `optional` **error**: `string`

#### Inherited from

[`ObjectTrait`](ObjectTrait.md).[`value`](ObjectTrait.md#value)
