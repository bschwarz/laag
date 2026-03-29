[**@laag/smithy v1.0.0-alpha.0**](../README.md)

***

[@laag/smithy](../globals.md) / CorsTrait

# Class: CorsTrait

Defined in: [smithy/src/traits/http-traits.ts:190](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/http-traits.ts#L190)

CORS trait - configures CORS for a service

## See

https://smithy.io/2.0/spec/http-bindings.html#cors-trait

## Extends

- [`ObjectTrait`](ObjectTrait.md)\<\{ `origin?`: `string`; `maxAge?`: `number`; `additionalAllowedHeaders?`: `string`[]; `additionalExposedHeaders?`: `string`[]; \}\>

## Constructors

### Constructor

> **new CorsTrait**(`value`): `CorsTrait`

Defined in: [smithy/src/traits/http-traits.ts:196](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/http-traits.ts#L196)

#### Parameters

##### value

###### origin?

`string`

###### maxAge?

`number`

###### additionalAllowedHeaders?

`string`[]

###### additionalExposedHeaders?

`string`[]

#### Returns

`CorsTrait`

#### Overrides

[`ObjectTrait`](ObjectTrait.md).[`constructor`](ObjectTrait.md#constructor)

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

##### origin?

> `optional` **origin**: `string`

##### maxAge?

> `optional` **maxAge**: `number`

##### additionalAllowedHeaders?

> `optional` **additionalAllowedHeaders**: `string`[]

##### additionalExposedHeaders?

> `optional` **additionalExposedHeaders**: `string`[]

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

##### origin?

> `optional` **origin**: `string`

##### maxAge?

> `optional` **maxAge**: `number`

##### additionalAllowedHeaders?

> `optional` **additionalAllowedHeaders**: `string`[]

##### additionalExposedHeaders?

> `optional` **additionalExposedHeaders**: `string`[]

#### Inherited from

[`ObjectTrait`](ObjectTrait.md).[`toJSON`](ObjectTrait.md#tojson)

***

### getOrigin()

> **getOrigin**(): `string` \| `undefined`

Defined in: [smithy/src/traits/http-traits.ts:210](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/http-traits.ts#L210)

Get the allowed origin

#### Returns

`string` \| `undefined`

***

### getMaxAge()

> **getMaxAge**(): `number` \| `undefined`

Defined in: [smithy/src/traits/http-traits.ts:217](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/http-traits.ts#L217)

Get the max age for preflight requests

#### Returns

`number` \| `undefined`

***

### getAdditionalAllowedHeaders()

> **getAdditionalAllowedHeaders**(): `string`[]

Defined in: [smithy/src/traits/http-traits.ts:224](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/http-traits.ts#L224)

Get additional allowed headers

#### Returns

`string`[]

***

### getAdditionalExposedHeaders()

> **getAdditionalExposedHeaders**(): `string`[]

Defined in: [smithy/src/traits/http-traits.ts:231](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/http-traits.ts#L231)

Get additional exposed headers

#### Returns

`string`[]

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

#### origin?

> `optional` **origin**: `string`

#### maxAge?

> `optional` **maxAge**: `number`

#### additionalAllowedHeaders?

> `optional` **additionalAllowedHeaders**: `string`[]

#### additionalExposedHeaders?

> `optional` **additionalExposedHeaders**: `string`[]

#### Inherited from

[`ObjectTrait`](ObjectTrait.md).[`value`](ObjectTrait.md#value)
