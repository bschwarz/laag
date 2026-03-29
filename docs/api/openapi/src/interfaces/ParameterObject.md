[**Laag Library Collection**](../../../README.md)

***

[Laag Library Collection](../../../modules.md) / [openapi/src](../README.md) / ParameterObject

# Interface: ParameterObject

Defined in: [packages/openapi/src/types.ts:175](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L175)

Describes a single operation parameter

## Extends

- [`ExtensionObject`](../../../@laag/core/interfaces/ExtensionObject.md)

## Indexable

\[`key`: `` `x-${string}` ``\]: `unknown`

## Properties

### name

> **name**: `string`

Defined in: [packages/openapi/src/types.ts:177](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L177)

REQUIRED. The name of the parameter

***

### in

> **in**: `"path"` \| `"query"` \| `"header"` \| `"cookie"`

Defined in: [packages/openapi/src/types.ts:179](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L179)

REQUIRED. The location of the parameter

***

### description?

> `optional` **description**: `string`

Defined in: [packages/openapi/src/types.ts:181](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L181)

A brief description of the parameter

***

### required?

> `optional` **required**: `boolean`

Defined in: [packages/openapi/src/types.ts:183](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L183)

Determines whether this parameter is mandatory

***

### deprecated?

> `optional` **deprecated**: `boolean`

Defined in: [packages/openapi/src/types.ts:185](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L185)

Specifies that a parameter is deprecated and SHOULD be transitioned out of usage

***

### allowEmptyValue?

> `optional` **allowEmptyValue**: `boolean`

Defined in: [packages/openapi/src/types.ts:187](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L187)

Sets the ability to pass empty-valued parameters

***

### style?

> `optional` **style**: [`ParameterStyle`](../type-aliases/ParameterStyle.md)

Defined in: [packages/openapi/src/types.ts:189](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L189)

Describes how the parameter value will be serialized depending on the type of the parameter value

***

### explode?

> `optional` **explode**: `boolean`

Defined in: [packages/openapi/src/types.ts:191](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L191)

When this is true, parameter values of type array or object generate separate parameters for each value of the array or key-value pair of the map

***

### allowReserved?

> `optional` **allowReserved**: `boolean`

Defined in: [packages/openapi/src/types.ts:193](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L193)

Determines whether the parameter value SHOULD allow reserved characters

***

### schema?

> `optional` **schema**: [`ReferenceObject`](ReferenceObject.md) \| [`SchemaObject`](SchemaObject.md)

Defined in: [packages/openapi/src/types.ts:195](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L195)

The schema defining the type used for the parameter

***

### example?

> `optional` **example**: `unknown`

Defined in: [packages/openapi/src/types.ts:197](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L197)

Example of the parameter's potential value

***

### examples?

> `optional` **examples**: `Record`\<`string`, [`ReferenceObject`](ReferenceObject.md) \| [`ExampleObject`](ExampleObject.md)\>

Defined in: [packages/openapi/src/types.ts:199](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L199)

Examples of the parameter's potential value

***

### content?

> `optional` **content**: `Record`\<`string`, [`MediaTypeObject`](MediaTypeObject.md)\>

Defined in: [packages/openapi/src/types.ts:201](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L201)

A map containing the representations for the parameter
