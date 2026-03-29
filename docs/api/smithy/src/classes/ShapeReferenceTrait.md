[**Laag Library Collection**](../../../README.md)

***

[Laag Library Collection](../../../modules.md) / [smithy/src](../README.md) / ShapeReferenceTrait

# Class: ShapeReferenceTrait

Defined in: [packages/smithy/src/traits/base-trait.ts:178](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/traits/base-trait.ts#L178)

Shape reference trait - a trait that references another shape

## Extends

- [`BaseTrait`](BaseTrait.md)

## Constructors

### Constructor

> **new ShapeReferenceTrait**(`id`, `value`): `ShapeReferenceTrait`

Defined in: [packages/smithy/src/traits/base-trait.ts:181](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/traits/base-trait.ts#L181)

#### Parameters

##### id

`string`

##### value

`string`

#### Returns

`ShapeReferenceTrait`

#### Overrides

[`BaseTrait`](BaseTrait.md).[`constructor`](BaseTrait.md#constructor)

## Methods

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

[`BaseTrait`](BaseTrait.md).[`toObject`](BaseTrait.md#toobject)

***

### getId()

> **getId**(): `string`

Defined in: [packages/smithy/src/traits/base-trait.ts:56](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/traits/base-trait.ts#L56)

Get the trait ID

#### Returns

`string`

The trait ID

#### Inherited from

[`BaseTrait`](BaseTrait.md).[`getId`](BaseTrait.md#getid)

***

### toString()

> **toString**(): `string`

Defined in: [packages/smithy/src/traits/base-trait.ts:72](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/traits/base-trait.ts#L72)

Convert trait to string

#### Returns

`string`

String representation

#### Inherited from

[`BaseTrait`](BaseTrait.md).[`toString`](BaseTrait.md#tostring)

***

### getValue()

> **getValue**(): `string`

Defined in: [packages/smithy/src/traits/base-trait.ts:186](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/traits/base-trait.ts#L186)

Get the trait value

#### Returns

`string`

The trait value

#### Overrides

[`BaseTrait`](BaseTrait.md).[`getValue`](BaseTrait.md#getvalue)

***

### getShapeId()

> **getShapeId**(): `string`

Defined in: [packages/smithy/src/traits/base-trait.ts:190](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/traits/base-trait.ts#L190)

#### Returns

`string`

***

### toJSON()

> **toJSON**(): `string`

Defined in: [packages/smithy/src/traits/base-trait.ts:194](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/traits/base-trait.ts#L194)

Convert trait to JSON

#### Returns

`string`

JSON representation

#### Overrides

[`BaseTrait`](BaseTrait.md).[`toJSON`](BaseTrait.md#tojson)

## Properties

### id

> `readonly` **id**: `string`

Defined in: [packages/smithy/src/traits/base-trait.ts:16](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/traits/base-trait.ts#L16)

The trait ID (e.g., "smithy.api#http")

#### Inherited from

[`BaseTrait`](BaseTrait.md).[`id`](BaseTrait.md#id)

***

### value

> `readonly` **value**: `string`

Defined in: [packages/smithy/src/traits/base-trait.ts:179](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/traits/base-trait.ts#L179)

The trait value

#### Overrides

[`BaseTrait`](BaseTrait.md).[`value`](BaseTrait.md#value)
