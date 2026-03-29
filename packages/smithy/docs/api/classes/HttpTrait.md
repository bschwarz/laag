[**@laag/smithy v1.0.0-alpha.0**](../README.md)

***

[@laag/smithy](../globals.md) / HttpTrait

# Class: HttpTrait

Defined in: [smithy/src/traits/http-traits.ts:14](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/http-traits.ts#L14)

HTTP trait - defines HTTP binding for operations

## See

https://smithy.io/2.0/spec/http-bindings.html#http-trait

## Extends

- [`ObjectTrait`](ObjectTrait.md)\<`HttpTraitType`\>

## Constructors

### Constructor

> **new HttpTrait**(`value`): `HttpTrait`

Defined in: [smithy/src/traits/http-traits.ts:15](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/http-traits.ts#L15)

#### Parameters

##### value

`HttpTrait`

#### Returns

`HttpTrait`

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

> **getValue**(): `HttpTrait`

Defined in: [smithy/src/traits/base-trait.ts:146](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/base-trait.ts#L146)

Get the trait value

#### Returns

`HttpTrait`

The trait value

#### Inherited from

[`ObjectTrait`](ObjectTrait.md).[`getValue`](ObjectTrait.md#getvalue)

***

### toJSON()

> **toJSON**(): `HttpTrait`

Defined in: [smithy/src/traits/base-trait.ts:150](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/base-trait.ts#L150)

Convert trait to JSON

#### Returns

`HttpTrait`

JSON representation

#### Inherited from

[`ObjectTrait`](ObjectTrait.md).[`toJSON`](ObjectTrait.md#tojson)

***

### getMethod()

> **getMethod**(): `string`

Defined in: [smithy/src/traits/http-traits.ts:22](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/http-traits.ts#L22)

Get the HTTP method

#### Returns

`string`

***

### getUri()

> **getUri**(): `string`

Defined in: [smithy/src/traits/http-traits.ts:29](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/http-traits.ts#L29)

Get the URI pattern

#### Returns

`string`

***

### getCode()

> **getCode**(): `number` \| `undefined`

Defined in: [smithy/src/traits/http-traits.ts:36](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/http-traits.ts#L36)

Get the HTTP status code (if specified)

#### Returns

`number` \| `undefined`

***

### isMethod()

> **isMethod**(`method`): `boolean`

Defined in: [smithy/src/traits/http-traits.ts:43](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/http-traits.ts#L43)

Check if this is a specific HTTP method

#### Parameters

##### method

`string`

#### Returns

`boolean`

***

### hasPathParameters()

> **hasPathParameters**(): `boolean`

Defined in: [smithy/src/traits/http-traits.ts:50](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/http-traits.ts#L50)

Check if the URI contains path parameters

#### Returns

`boolean`

***

### getPathParameters()

> **getPathParameters**(): `string`[]

Defined in: [smithy/src/traits/http-traits.ts:57](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/http-traits.ts#L57)

Extract path parameter names from the URI

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

> `readonly` **value**: `HttpTrait`

Defined in: [smithy/src/traits/base-trait.ts:139](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/base-trait.ts#L139)

The trait value

#### Inherited from

[`ObjectTrait`](ObjectTrait.md).[`value`](ObjectTrait.md#value)
