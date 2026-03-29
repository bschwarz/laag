[**@laag/smithy v1.0.0-alpha.0**](../README.md)

***

[@laag/smithy](../globals.md) / UnionShape

# Interface: UnionShape

Defined in: [smithy/src/types.ts:92](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/types.ts#L92)

Union shape - represents a tagged union

## Extends

- `BaseShape`

## Properties

### traits?

> `optional` **traits**: `Record`\<`string`, `unknown`\>

Defined in: [smithy/src/types.ts:65](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/types.ts#L65)

Optional traits applied to the shape

#### Inherited from

`BaseShape.traits`

***

### type

> **type**: `"union"`

Defined in: [smithy/src/types.ts:93](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/types.ts#L93)

The type of the shape

#### Overrides

`BaseShape.type`

***

### members?

> `optional` **members**: `Record`\<`string`, [`MemberShape`](MemberShape.md)\>

Defined in: [smithy/src/types.ts:95](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/types.ts#L95)

Named members of the union
