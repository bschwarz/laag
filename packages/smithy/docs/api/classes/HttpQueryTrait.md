[**@laag/smithy v1.0.0-alpha.0**](../README.md)

***

[@laag/smithy](../globals.md) / HttpQueryTrait

# Class: HttpQueryTrait

Defined in: [smithy/src/traits/http-traits.ts:108](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/http-traits.ts#L108)

HTTP query trait - binds a member to a query string parameter

## See

https://smithy.io/2.0/spec/http-bindings.html#httpquery-trait

## Extends

- [`StringTrait`](StringTrait.md)

## Constructors

### Constructor

> **new HttpQueryTrait**(`paramName`): `HttpQueryTrait`

Defined in: [smithy/src/traits/http-traits.ts:109](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/http-traits.ts#L109)

#### Parameters

##### paramName

`string`

#### Returns

`HttpQueryTrait`

#### Overrides

[`StringTrait`](StringTrait.md).[`constructor`](StringTrait.md#constructor)

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

***

### getParameterName()

> **getParameterName**(): `string`

Defined in: [smithy/src/traits/http-traits.ts:116](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/http-traits.ts#L116)

Get the query parameter name

#### Returns

`string`

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
