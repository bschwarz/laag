[**Laag Library Collection**](../../../README.md)

***

[Laag Library Collection](../../../modules.md) / [smithy/src](../README.md) / UnionShape

# Interface: UnionShape

Defined in: [packages/smithy/src/types.ts:92](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/types.ts#L92)

Union shape - represents a tagged union

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

> **type**: `"union"`

Defined in: [packages/smithy/src/types.ts:93](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/types.ts#L93)

The type of the shape

#### Overrides

`BaseShape.type`

***

### members?

> `optional` **members**: `Record`\<`string`, [`MemberShape`](MemberShape.md)\>

Defined in: [packages/smithy/src/types.ts:95](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/types.ts#L95)

Named members of the union
