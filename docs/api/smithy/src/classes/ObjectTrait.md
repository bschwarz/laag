[**Laag Library Collection**](../../../README.md)

***

[Laag Library Collection](../../../modules.md) / [smithy/src](../README.md) / ObjectTrait

# Class: ObjectTrait\<T\>

Defined in: [packages/smithy/src/traits/base-trait.ts:136](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/traits/base-trait.ts#L136)

Object trait - a trait with an object value

## Extends

- [`BaseTrait`](BaseTrait.md)

## Extended by

- [`CorsTrait`](CorsTrait.md)
- [`HttpTrait`](HttpTrait.md)
- [`AwsApiGatewayIntegrationTrait`](AwsApiGatewayIntegrationTrait.md)
- [`AwsAuthTrait`](AwsAuthTrait.md)
- [`AwsClientDiscoveredEndpointTrait`](AwsClientDiscoveredEndpointTrait.md)
- [`AwsClientEndpointDiscoveryTrait`](AwsClientEndpointDiscoveryTrait.md)

## Type Parameters

### T

`T` *extends* `Record`\<`string`, `unknown`\> = `Record`\<`string`, `unknown`\>

## Constructors

### Constructor

> **new ObjectTrait**\<`T`\>(`id`, `value`): `ObjectTrait`\<`T`\>

Defined in: [packages/smithy/src/traits/base-trait.ts:141](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/traits/base-trait.ts#L141)

#### Parameters

##### id

`string`

##### value

`T`

#### Returns

`ObjectTrait`\<`T`\>

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

> **getValue**(): `T`

Defined in: [packages/smithy/src/traits/base-trait.ts:146](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/traits/base-trait.ts#L146)

Get the trait value

#### Returns

`T`

The trait value

#### Overrides

[`BaseTrait`](BaseTrait.md).[`getValue`](BaseTrait.md#getvalue)

***

### toJSON()

> **toJSON**(): `T`

Defined in: [packages/smithy/src/traits/base-trait.ts:150](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/traits/base-trait.ts#L150)

Convert trait to JSON

#### Returns

`T`

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

> `readonly` **value**: `T`

Defined in: [packages/smithy/src/traits/base-trait.ts:139](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/traits/base-trait.ts#L139)

The trait value

#### Overrides

[`BaseTrait`](BaseTrait.md).[`value`](BaseTrait.md#value)
