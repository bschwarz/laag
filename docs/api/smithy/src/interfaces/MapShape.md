[**Laag Library Collection**](../../../README.md)

***

[Laag Library Collection](../../../modules.md) / [smithy/src](../README.md) / MapShape

# Interface: MapShape

Defined in: [packages/smithy/src/types.ts:178](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/types.ts#L178)

Map shape - represents a map of key-value pairs

## Extends

- `BaseShape`

## Properties

### traits?

> `optional` **traits**: `Record`\<`string`, `unknown`\>

Defined in: [packages/smithy/src/types.ts:65](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/types.ts#L65)

Optional traits applied to the shape

#### Inherited from

`BaseShape.traits`

***

### type

> **type**: `"map"`

Defined in: [packages/smithy/src/types.ts:179](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/types.ts#L179)

The type of the shape

#### Overrides

`BaseShape.type`

***

### key

> **key**: [`MemberShape`](MemberShape.md)

Defined in: [packages/smithy/src/types.ts:181](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/types.ts#L181)

Key type

***

### value

> **value**: [`MemberShape`](MemberShape.md)

Defined in: [packages/smithy/src/types.ts:183](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/types.ts#L183)

Value type
