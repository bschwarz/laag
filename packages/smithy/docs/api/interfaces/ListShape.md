[**@laag/smithy v1.0.0-alpha.0**](../README.md)

***

[@laag/smithy](../globals.md) / ListShape

# Interface: ListShape

Defined in: [smithy/src/types.ts:160](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/types.ts#L160)

List shape - represents an ordered collection

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

> **type**: `"list"`

Defined in: [smithy/src/types.ts:161](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/types.ts#L161)

The type of the shape

#### Overrides

`BaseShape.type`

***

### member

> **member**: [`MemberShape`](MemberShape.md)

Defined in: [smithy/src/types.ts:163](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/types.ts#L163)

Member type
