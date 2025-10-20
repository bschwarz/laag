[**Laag Library Collection**](../../../README.md)

***

[Laag Library Collection](../../../modules.md) / [openapi/src](../README.md) / SchemaObject

# Interface: SchemaObject

Defined in: [packages/openapi/src/types.ts:341](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L341)

The Schema Object allows the definition of input and output data types

## Extends

- [`ExtensionObject`](../../../@laag/core/interfaces/ExtensionObject.md)

## Indexable

\[`key`: `` `x-${string}` ``\]: `unknown`

## Properties

### title?

> `optional` **title**: `string`

Defined in: [packages/openapi/src/types.ts:343](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L343)

***

### multipleOf?

> `optional` **multipleOf**: `number`

Defined in: [packages/openapi/src/types.ts:344](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L344)

***

### maximum?

> `optional` **maximum**: `number`

Defined in: [packages/openapi/src/types.ts:345](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L345)

***

### exclusiveMaximum?

> `optional` **exclusiveMaximum**: `boolean`

Defined in: [packages/openapi/src/types.ts:346](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L346)

***

### minimum?

> `optional` **minimum**: `number`

Defined in: [packages/openapi/src/types.ts:347](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L347)

***

### exclusiveMinimum?

> `optional` **exclusiveMinimum**: `boolean`

Defined in: [packages/openapi/src/types.ts:348](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L348)

***

### maxLength?

> `optional` **maxLength**: `number`

Defined in: [packages/openapi/src/types.ts:349](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L349)

***

### minLength?

> `optional` **minLength**: `number`

Defined in: [packages/openapi/src/types.ts:350](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L350)

***

### pattern?

> `optional` **pattern**: `string`

Defined in: [packages/openapi/src/types.ts:351](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L351)

***

### maxItems?

> `optional` **maxItems**: `number`

Defined in: [packages/openapi/src/types.ts:352](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L352)

***

### minItems?

> `optional` **minItems**: `number`

Defined in: [packages/openapi/src/types.ts:353](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L353)

***

### uniqueItems?

> `optional` **uniqueItems**: `boolean`

Defined in: [packages/openapi/src/types.ts:354](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L354)

***

### maxProperties?

> `optional` **maxProperties**: `number`

Defined in: [packages/openapi/src/types.ts:355](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L355)

***

### minProperties?

> `optional` **minProperties**: `number`

Defined in: [packages/openapi/src/types.ts:356](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L356)

***

### required?

> `optional` **required**: `string`[]

Defined in: [packages/openapi/src/types.ts:357](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L357)

***

### enum?

> `optional` **enum**: `unknown`[]

Defined in: [packages/openapi/src/types.ts:358](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L358)

***

### type?

> `optional` **type**: `"string"` \| `"number"` \| `"boolean"` \| `"object"` \| `"null"` \| `"array"` \| `"integer"`

Defined in: [packages/openapi/src/types.ts:361](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L361)

***

### allOf?

> `optional` **allOf**: ([`ReferenceObject`](ReferenceObject.md) \| `SchemaObject`)[]

Defined in: [packages/openapi/src/types.ts:362](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L362)

***

### oneOf?

> `optional` **oneOf**: ([`ReferenceObject`](ReferenceObject.md) \| `SchemaObject`)[]

Defined in: [packages/openapi/src/types.ts:363](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L363)

***

### anyOf?

> `optional` **anyOf**: ([`ReferenceObject`](ReferenceObject.md) \| `SchemaObject`)[]

Defined in: [packages/openapi/src/types.ts:364](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L364)

***

### not?

> `optional` **not**: [`ReferenceObject`](ReferenceObject.md) \| `SchemaObject`

Defined in: [packages/openapi/src/types.ts:365](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L365)

***

### items?

> `optional` **items**: [`ReferenceObject`](ReferenceObject.md) \| `SchemaObject`

Defined in: [packages/openapi/src/types.ts:366](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L366)

***

### properties?

> `optional` **properties**: `Record`\<`string`, [`ReferenceObject`](ReferenceObject.md) \| `SchemaObject`\>

Defined in: [packages/openapi/src/types.ts:367](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L367)

***

### additionalProperties?

> `optional` **additionalProperties**: `boolean` \| [`ReferenceObject`](ReferenceObject.md) \| `SchemaObject`

Defined in: [packages/openapi/src/types.ts:368](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L368)

***

### description?

> `optional` **description**: `string`

Defined in: [packages/openapi/src/types.ts:369](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L369)

***

### format?

> `optional` **format**: `string`

Defined in: [packages/openapi/src/types.ts:370](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L370)

***

### default?

> `optional` **default**: `unknown`

Defined in: [packages/openapi/src/types.ts:371](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L371)

***

### nullable?

> `optional` **nullable**: `boolean`

Defined in: [packages/openapi/src/types.ts:374](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L374)

***

### discriminator?

> `optional` **discriminator**: [`DiscriminatorObject`](DiscriminatorObject.md)

Defined in: [packages/openapi/src/types.ts:375](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L375)

***

### readOnly?

> `optional` **readOnly**: `boolean`

Defined in: [packages/openapi/src/types.ts:376](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L376)

***

### writeOnly?

> `optional` **writeOnly**: `boolean`

Defined in: [packages/openapi/src/types.ts:377](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L377)

***

### xml?

> `optional` **xml**: [`XMLObject`](XMLObject.md)

Defined in: [packages/openapi/src/types.ts:378](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L378)

***

### externalDocs?

> `optional` **externalDocs**: [`ExternalDocumentationObject`](ExternalDocumentationObject.md)

Defined in: [packages/openapi/src/types.ts:379](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L379)

***

### example?

> `optional` **example**: `unknown`

Defined in: [packages/openapi/src/types.ts:380](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L380)

***

### deprecated?

> `optional` **deprecated**: `boolean`

Defined in: [packages/openapi/src/types.ts:381](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L381)
