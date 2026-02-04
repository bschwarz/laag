[**@laag/smithy v1.0.0-alpha.0**](../README.md)

***

[@laag/smithy](../globals.md) / HttpErrorTrait

# Class: HttpErrorTrait

Defined in: [smithy/src/traits/http-traits.ts:67](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/http-traits.ts#L67)

HTTP error trait - marks an error structure with HTTP status code

## See

https://smithy.io/2.0/spec/http-bindings.html#httperror-trait

## Extends

- [`NumberTrait`](NumberTrait.md)

## Constructors

### Constructor

> **new HttpErrorTrait**(`code`): `HttpErrorTrait`

Defined in: [smithy/src/traits/http-traits.ts:68](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/http-traits.ts#L68)

#### Parameters

##### code

`number`

#### Returns

`HttpErrorTrait`

#### Overrides

[`NumberTrait`](NumberTrait.md).[`constructor`](NumberTrait.md#constructor)

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

[`NumberTrait`](NumberTrait.md).[`toObject`](NumberTrait.md#toobject)

***

### getId()

> **getId**(): `string`

Defined in: [smithy/src/traits/base-trait.ts:56](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/base-trait.ts#L56)

Get the trait ID

#### Returns

`string`

The trait ID

#### Inherited from

[`NumberTrait`](NumberTrait.md).[`getId`](NumberTrait.md#getid)

***

### toString()

> **toString**(): `string`

Defined in: [smithy/src/traits/base-trait.ts:72](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/base-trait.ts#L72)

Convert trait to string

#### Returns

`string`

String representation

#### Inherited from

[`NumberTrait`](NumberTrait.md).[`toString`](NumberTrait.md#tostring)

***

### getValue()

> **getValue**(): `number`

Defined in: [smithy/src/traits/base-trait.ts:124](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/base-trait.ts#L124)

Get the trait value

#### Returns

`number`

The trait value

#### Inherited from

[`NumberTrait`](NumberTrait.md).[`getValue`](NumberTrait.md#getvalue)

***

### toJSON()

> **toJSON**(): `number`

Defined in: [smithy/src/traits/base-trait.ts:128](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/base-trait.ts#L128)

Convert trait to JSON

#### Returns

`number`

JSON representation

#### Inherited from

[`NumberTrait`](NumberTrait.md).[`toJSON`](NumberTrait.md#tojson)

***

### getCode()

> **getCode**(): `number`

Defined in: [smithy/src/traits/http-traits.ts:75](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/http-traits.ts#L75)

Get the HTTP error code

#### Returns

`number`

***

### isClientError()

> **isClientError**(): `boolean`

Defined in: [smithy/src/traits/http-traits.ts:82](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/http-traits.ts#L82)

Check if this is a client error (4xx)

#### Returns

`boolean`

***

### isServerError()

> **isServerError**(): `boolean`

Defined in: [smithy/src/traits/http-traits.ts:89](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/http-traits.ts#L89)

Check if this is a server error (5xx)

#### Returns

`boolean`

## Properties

### id

> `readonly` **id**: `string`

Defined in: [smithy/src/traits/base-trait.ts:16](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/base-trait.ts#L16)

The trait ID (e.g., "smithy.api#http")

#### Inherited from

[`NumberTrait`](NumberTrait.md).[`id`](NumberTrait.md#id)

***

### value

> `readonly` **value**: `number`

Defined in: [smithy/src/traits/base-trait.ts:117](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/base-trait.ts#L117)

The trait value

#### Inherited from

[`NumberTrait`](NumberTrait.md).[`value`](NumberTrait.md#value)
