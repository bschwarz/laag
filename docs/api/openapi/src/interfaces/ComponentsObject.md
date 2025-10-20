[**Laag Library Collection**](../../../README.md)

***

[Laag Library Collection](../../../modules.md) / [openapi/src](../README.md) / ComponentsObject

# Interface: ComponentsObject

Defined in: [packages/openapi/src/types.ts:421](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L421)

Holds a set of reusable objects for different aspects of the OAS

## Extends

- [`ExtensionObject`](../../../@laag/core/interfaces/ExtensionObject.md)

## Indexable

\[`key`: `` `x-${string}` ``\]: `unknown`

## Properties

### schemas?

> `optional` **schemas**: `Record`\<`string`, [`ReferenceObject`](ReferenceObject.md) \| [`SchemaObject`](SchemaObject.md)\>

Defined in: [packages/openapi/src/types.ts:423](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L423)

An object to hold reusable Schema Objects

***

### responses?

> `optional` **responses**: `Record`\<`string`, [`ReferenceObject`](ReferenceObject.md) \| [`ResponseObject`](ResponseObject.md)\>

Defined in: [packages/openapi/src/types.ts:425](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L425)

An object to hold reusable Response Objects

***

### parameters?

> `optional` **parameters**: `Record`\<`string`, [`ParameterObject`](ParameterObject.md) \| [`ReferenceObject`](ReferenceObject.md)\>

Defined in: [packages/openapi/src/types.ts:427](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L427)

An object to hold reusable Parameter Objects

***

### examples?

> `optional` **examples**: `Record`\<`string`, [`ReferenceObject`](ReferenceObject.md) \| [`ExampleObject`](ExampleObject.md)\>

Defined in: [packages/openapi/src/types.ts:429](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L429)

An object to hold reusable Example Objects

***

### requestBodies?

> `optional` **requestBodies**: `Record`\<`string`, [`ReferenceObject`](ReferenceObject.md) \| [`RequestBodyObject`](RequestBodyObject.md)\>

Defined in: [packages/openapi/src/types.ts:431](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L431)

An object to hold reusable Request Body Objects

***

### headers?

> `optional` **headers**: `Record`\<`string`, [`ReferenceObject`](ReferenceObject.md) \| [`HeaderObject`](../type-aliases/HeaderObject.md)\>

Defined in: [packages/openapi/src/types.ts:433](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L433)

An object to hold reusable Header Objects

***

### securitySchemes?

> `optional` **securitySchemes**: `Record`\<`string`, [`ReferenceObject`](ReferenceObject.md) \| [`SecuritySchemeObject`](SecuritySchemeObject.md)\>

Defined in: [packages/openapi/src/types.ts:435](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L435)

An object to hold reusable Security Scheme Objects

***

### links?

> `optional` **links**: `Record`\<`string`, [`ReferenceObject`](ReferenceObject.md) \| [`LinkObject`](LinkObject.md)\>

Defined in: [packages/openapi/src/types.ts:437](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L437)

An object to hold reusable Link Objects

***

### callbacks?

> `optional` **callbacks**: `Record`\<`string`, [`ReferenceObject`](ReferenceObject.md) \| [`CallbackObject`](../type-aliases/CallbackObject.md)\>

Defined in: [packages/openapi/src/types.ts:439](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L439)

An object to hold reusable Callback Objects
