[**Laag Library Collection**](../../../README.md)

***

[Laag Library Collection](../../../modules.md) / [smithy/src](../README.md) / AwsAuthTrait

# Class: AwsAuthTrait

Defined in: [packages/smithy/src/traits/aws-traits.ts:115](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/traits/aws-traits.ts#L115)

AWS auth trait - configures AWS authentication

## See

https://smithy.io/2.0/aws/aws-auth.html

## Extends

- [`ObjectTrait`](ObjectTrait.md)\<\{ `sigv4?`: \{ `name`: `string`; \}; \}\>

## Constructors

### Constructor

> **new AwsAuthTrait**(`value`): `AwsAuthTrait`

Defined in: [packages/smithy/src/traits/aws-traits.ts:120](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/traits/aws-traits.ts#L120)

#### Parameters

##### value

###### sigv4?

\{ `name`: `string`; \}

###### sigv4.name

`string`

#### Returns

`AwsAuthTrait`

#### Overrides

[`ObjectTrait`](ObjectTrait.md).[`constructor`](ObjectTrait.md#constructor)

## Methods

### getSigV4Name()

> **getSigV4Name**(): `string` \| `undefined`

Defined in: [packages/smithy/src/traits/aws-traits.ts:127](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/traits/aws-traits.ts#L127)

Get the SigV4 service name

#### Returns

`string` \| `undefined`

***

### hasSigV4()

> **hasSigV4**(): `boolean`

Defined in: [packages/smithy/src/traits/aws-traits.ts:134](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/traits/aws-traits.ts#L134)

Check if SigV4 is configured

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

[`ObjectTrait`](ObjectTrait.md).[`toObject`](ObjectTrait.md#toobject)

***

### getId()

> **getId**(): `string`

Defined in: [packages/smithy/src/traits/base-trait.ts:56](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/traits/base-trait.ts#L56)

Get the trait ID

#### Returns

`string`

The trait ID

#### Inherited from

[`ObjectTrait`](ObjectTrait.md).[`getId`](ObjectTrait.md#getid)

***

### toString()

> **toString**(): `string`

Defined in: [packages/smithy/src/traits/base-trait.ts:72](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/traits/base-trait.ts#L72)

Convert trait to string

#### Returns

`string`

String representation

#### Inherited from

[`ObjectTrait`](ObjectTrait.md).[`toString`](ObjectTrait.md#tostring)

***

### getValue()

> **getValue**(): `object`

Defined in: [packages/smithy/src/traits/base-trait.ts:146](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/traits/base-trait.ts#L146)

Get the trait value

#### Returns

`object`

The trait value

##### sigv4?

> `optional` **sigv4**: `object`

###### sigv4.name

> **name**: `string`

#### Inherited from

[`ObjectTrait`](ObjectTrait.md).[`getValue`](ObjectTrait.md#getvalue)

***

### toJSON()

> **toJSON**(): `object`

Defined in: [packages/smithy/src/traits/base-trait.ts:150](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/traits/base-trait.ts#L150)

Convert trait to JSON

#### Returns

`object`

JSON representation

##### sigv4?

> `optional` **sigv4**: `object`

###### sigv4.name

> **name**: `string`

#### Inherited from

[`ObjectTrait`](ObjectTrait.md).[`toJSON`](ObjectTrait.md#tojson)

## Properties

### id

> `readonly` **id**: `string`

Defined in: [packages/smithy/src/traits/base-trait.ts:16](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/traits/base-trait.ts#L16)

The trait ID (e.g., "smithy.api#http")

#### Inherited from

[`ObjectTrait`](ObjectTrait.md).[`id`](ObjectTrait.md#id)

***

### value

> `readonly` **value**: `object`

Defined in: [packages/smithy/src/traits/base-trait.ts:139](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/traits/base-trait.ts#L139)

The trait value

#### sigv4?

> `optional` **sigv4**: `object`

##### sigv4.name

> **name**: `string`

#### Inherited from

[`ObjectTrait`](ObjectTrait.md).[`value`](ObjectTrait.md#value)
