[**Laag Library Collection**](../../../README.md)

***

[Laag Library Collection](../../../modules.md) / [smithy/src](../README.md) / SetShape

# Interface: SetShape

Defined in: [packages/smithy/src/types.ts:169](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/types.ts#L169)

Set shape - represents an unordered collection of unique values

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

> **type**: `"set"`

Defined in: [packages/smithy/src/types.ts:170](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/types.ts#L170)

The type of the shape

#### Overrides

`BaseShape.type`

***

### member

> **member**: [`MemberShape`](MemberShape.md)

Defined in: [packages/smithy/src/types.ts:172](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/types.ts#L172)

Member type
