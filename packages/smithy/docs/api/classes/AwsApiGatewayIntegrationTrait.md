[**@laag/smithy v1.0.0-alpha.0**](../README.md)

***

[@laag/smithy](../globals.md) / AwsApiGatewayIntegrationTrait

# Class: AwsApiGatewayIntegrationTrait

Defined in: [smithy/src/traits/aws-traits.ts:12](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/aws-traits.ts#L12)

AWS API Gateway integration trait

## See

https://smithy.io/2.0/aws/aws-core.html#aws-api-gateway-integration-trait

## Extends

- [`ObjectTrait`](ObjectTrait.md)\<\{ `type`: `string`; `uri?`: `string`; `httpMethod?`: `string`; `credentials?`: `string`; `requestParameters?`: `Record`\<`string`, `string`\>; `requestTemplates?`: `Record`\<`string`, `string`\>; `passthroughBehavior?`: `string`; `cacheNamespace?`: `string`; `cacheKeyParameters?`: `string`[]; `responses?`: `Record`\<`string`, `unknown`\>; \}\>

## Constructors

### Constructor

> **new AwsApiGatewayIntegrationTrait**(`value`): `AwsApiGatewayIntegrationTrait`

Defined in: [smithy/src/traits/aws-traits.ts:24](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/aws-traits.ts#L24)

#### Parameters

##### value

###### type

`string`

###### uri?

`string`

###### httpMethod?

`string`

###### credentials?

`string`

###### requestParameters?

`Record`\<`string`, `string`\>

###### requestTemplates?

`Record`\<`string`, `string`\>

###### passthroughBehavior?

`string`

###### cacheNamespace?

`string`

###### cacheKeyParameters?

`string`[]

###### responses?

`Record`\<`string`, `unknown`\>

#### Returns

`AwsApiGatewayIntegrationTrait`

#### Overrides

[`ObjectTrait`](ObjectTrait.md).[`constructor`](ObjectTrait.md#constructor)

## Methods

### getType()

> **getType**(): `string`

Defined in: [smithy/src/traits/aws-traits.ts:42](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/aws-traits.ts#L42)

Get the integration type

#### Returns

`string`

***

### getUri()

> **getUri**(): `string` \| `undefined`

Defined in: [smithy/src/traits/aws-traits.ts:49](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/aws-traits.ts#L49)

Get the integration URI

#### Returns

`string` \| `undefined`

***

### getHttpMethod()

> **getHttpMethod**(): `string` \| `undefined`

Defined in: [smithy/src/traits/aws-traits.ts:56](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/aws-traits.ts#L56)

Get the HTTP method for the integration

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

##### type

> **type**: `string`

##### uri?

> `optional` **uri**: `string`

##### httpMethod?

> `optional` **httpMethod**: `string`

##### credentials?

> `optional` **credentials**: `string`

##### requestParameters?

> `optional` **requestParameters**: `Record`\<`string`, `string`\>

##### requestTemplates?

> `optional` **requestTemplates**: `Record`\<`string`, `string`\>

##### passthroughBehavior?

> `optional` **passthroughBehavior**: `string`

##### cacheNamespace?

> `optional` **cacheNamespace**: `string`

##### cacheKeyParameters?

> `optional` **cacheKeyParameters**: `string`[]

##### responses?

> `optional` **responses**: `Record`\<`string`, `unknown`\>

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

##### type

> **type**: `string`

##### uri?

> `optional` **uri**: `string`

##### httpMethod?

> `optional` **httpMethod**: `string`

##### credentials?

> `optional` **credentials**: `string`

##### requestParameters?

> `optional` **requestParameters**: `Record`\<`string`, `string`\>

##### requestTemplates?

> `optional` **requestTemplates**: `Record`\<`string`, `string`\>

##### passthroughBehavior?

> `optional` **passthroughBehavior**: `string`

##### cacheNamespace?

> `optional` **cacheNamespace**: `string`

##### cacheKeyParameters?

> `optional` **cacheKeyParameters**: `string`[]

##### responses?

> `optional` **responses**: `Record`\<`string`, `unknown`\>

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

#### type

> **type**: `string`

#### uri?

> `optional` **uri**: `string`

#### httpMethod?

> `optional` **httpMethod**: `string`

#### credentials?

> `optional` **credentials**: `string`

#### requestParameters?

> `optional` **requestParameters**: `Record`\<`string`, `string`\>

#### requestTemplates?

> `optional` **requestTemplates**: `Record`\<`string`, `string`\>

#### passthroughBehavior?

> `optional` **passthroughBehavior**: `string`

#### cacheNamespace?

> `optional` **cacheNamespace**: `string`

#### cacheKeyParameters?

> `optional` **cacheKeyParameters**: `string`[]

#### responses?

> `optional` **responses**: `Record`\<`string`, `unknown`\>

#### Inherited from

[`ObjectTrait`](ObjectTrait.md).[`value`](ObjectTrait.md#value)
