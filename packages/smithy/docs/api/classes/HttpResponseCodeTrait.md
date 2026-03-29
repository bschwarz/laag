[**@laag/smithy v1.0.0-alpha.0**](../README.md)

***

[@laag/smithy](../globals.md) / HttpResponseCodeTrait

# Class: HttpResponseCodeTrait

Defined in: [smithy/src/traits/http-traits.ts:159](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/http-traits.ts#L159)

HTTP response code trait - defines the HTTP status code for a successful response

## See

https://smithy.io/2.0/spec/http-bindings.html#httpresponsecode-trait

## Extends

- [`NumberTrait`](NumberTrait.md)

## Constructors

### Constructor

> **new HttpResponseCodeTrait**(`code`): `HttpResponseCodeTrait`

Defined in: [smithy/src/traits/http-traits.ts:160](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/http-traits.ts#L160)

#### Parameters

##### code

`number`

#### Returns

`HttpResponseCodeTrait`

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

Defined in: [smithy/src/traits/http-traits.ts:167](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/http-traits.ts#L167)

Get the response code

#### Returns

`number`

***

### isSuccess()

> **isSuccess**(): `boolean`

Defined in: [smithy/src/traits/http-traits.ts:174](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/http-traits.ts#L174)

Check if this is a success code (2xx)

#### Returns

`boolean`

***

### isRedirect()

> **isRedirect**(): `boolean`

Defined in: [smithy/src/traits/http-traits.ts:181](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/http-traits.ts#L181)

Check if this is a redirect code (3xx)

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
