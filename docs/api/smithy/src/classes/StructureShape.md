[**Laag Library Collection**](../../../README.md)

***

[Laag Library Collection](../../../modules.md) / [smithy/src](../README.md) / StructureShape

# Class: StructureShape

Defined in: [packages/smithy/src/shapes/structure.ts:13](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/shapes/structure.ts#L13)

Represents a Smithy structure shape
Structures are fixed sets of named, typed members

## Extends

- [`BaseShape`](BaseShape.md)

## Constructors

### Constructor

> **new StructureShape**(`members?`, `mixins?`, `traits?`): `StructureShape`

Defined in: [packages/smithy/src/shapes/structure.ts:23](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/shapes/structure.ts#L23)

Create a new StructureShape

#### Parameters

##### members?

`Record`\<`string`, [`MemberShape`](../interfaces/MemberShape.md)\>

Optional members of the structure

##### mixins?

`string`[]

Optional mixins to apply

##### traits?

`Record`\<`string`, `unknown`\>

Optional traits applied to the shape

#### Returns

`StructureShape`

#### Overrides

[`BaseShape`](BaseShape.md).[`constructor`](BaseShape.md#constructor)

## Methods

### getTrait()

> **getTrait**(`traitId`): `unknown`

Defined in: [packages/smithy/src/shapes/base-shape.ts:31](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/shapes/base-shape.ts#L31)

Get a trait value by trait ID

#### Parameters

##### traitId

`string`

The trait ID to retrieve

#### Returns

`unknown`

The trait value, or undefined if not found

#### Inherited from

[`BaseShape`](BaseShape.md).[`getTrait`](BaseShape.md#gettrait)

***

### hasTrait()

> **hasTrait**(`traitId`): `boolean`

Defined in: [packages/smithy/src/shapes/base-shape.ts:40](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/shapes/base-shape.ts#L40)

Check if the shape has a specific trait

#### Parameters

##### traitId

`string`

The trait ID to check

#### Returns

`boolean`

True if the trait exists

#### Inherited from

[`BaseShape`](BaseShape.md).[`hasTrait`](BaseShape.md#hastrait)

***

### setTrait()

> **setTrait**(`traitId`, `value`): `void`

Defined in: [packages/smithy/src/shapes/base-shape.ts:49](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/shapes/base-shape.ts#L49)

Add or update a trait

#### Parameters

##### traitId

`string`

The trait ID

##### value

`unknown`

The trait value

#### Returns

`void`

#### Inherited from

[`BaseShape`](BaseShape.md).[`setTrait`](BaseShape.md#settrait)

***

### removeTrait()

> **removeTrait**(`traitId`): `boolean`

Defined in: [packages/smithy/src/shapes/base-shape.ts:59](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/shapes/base-shape.ts#L59)

Remove a trait

#### Parameters

##### traitId

`string`

The trait ID to remove

#### Returns

`boolean`

True if the trait was removed, false if it didn't exist

#### Inherited from

[`BaseShape`](BaseShape.md).[`removeTrait`](BaseShape.md#removetrait)

***

### getTraitIds()

> **getTraitIds**(): `string`[]

Defined in: [packages/smithy/src/shapes/base-shape.ts:71](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/shapes/base-shape.ts#L71)

Get all trait IDs

#### Returns

`string`[]

Array of trait IDs

#### Inherited from

[`BaseShape`](BaseShape.md).[`getTraitIds`](BaseShape.md#gettraitids)

***

### getTraits()

> **getTraits**(): `Record`\<`string`, `unknown`\>

Defined in: [packages/smithy/src/shapes/base-shape.ts:79](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/shapes/base-shape.ts#L79)

Get all traits

#### Returns

`Record`\<`string`, `unknown`\>

Record of all traits

#### Inherited from

[`BaseShape`](BaseShape.md).[`getTraits`](BaseShape.md#gettraits)

***

### getMember()

> **getMember**(`memberName`): [`MemberShape`](../interfaces/MemberShape.md) \| `undefined`

Defined in: [packages/smithy/src/shapes/structure.ts:38](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/shapes/structure.ts#L38)

Get a member by name

#### Parameters

##### memberName

`string`

The member name

#### Returns

[`MemberShape`](../interfaces/MemberShape.md) \| `undefined`

The member shape, or undefined if not found

***

### hasMember()

> **hasMember**(`memberName`): `boolean`

Defined in: [packages/smithy/src/shapes/structure.ts:47](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/shapes/structure.ts#L47)

Check if a member exists

#### Parameters

##### memberName

`string`

The member name to check

#### Returns

`boolean`

True if the member exists

***

### setMember()

> **setMember**(`memberName`, `member`): `void`

Defined in: [packages/smithy/src/shapes/structure.ts:56](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/shapes/structure.ts#L56)

Add or update a member

#### Parameters

##### memberName

`string`

The member name

##### member

[`MemberShape`](../interfaces/MemberShape.md)

The member shape

#### Returns

`void`

***

### removeMember()

> **removeMember**(`memberName`): `boolean`

Defined in: [packages/smithy/src/shapes/structure.ts:66](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/shapes/structure.ts#L66)

Remove a member

#### Parameters

##### memberName

`string`

The member name to remove

#### Returns

`boolean`

True if the member was removed, false if it didn't exist

***

### getMemberNames()

> **getMemberNames**(): `string`[]

Defined in: [packages/smithy/src/shapes/structure.ts:78](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/shapes/structure.ts#L78)

Get all member names

#### Returns

`string`[]

Array of member names

***

### getMembers()

> **getMembers**(): `Record`\<`string`, [`MemberShape`](../interfaces/MemberShape.md)\>

Defined in: [packages/smithy/src/shapes/structure.ts:86](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/shapes/structure.ts#L86)

Get all members

#### Returns

`Record`\<`string`, [`MemberShape`](../interfaces/MemberShape.md)\>

Record of all members

***

### addMixin()

> **addMixin**(`mixinId`): `void`

Defined in: [packages/smithy/src/shapes/structure.ts:94](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/shapes/structure.ts#L94)

Add a mixin

#### Parameters

##### mixinId

`string`

The mixin shape ID

#### Returns

`void`

***

### removeMixin()

> **removeMixin**(`mixinId`): `boolean`

Defined in: [packages/smithy/src/shapes/structure.ts:106](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/shapes/structure.ts#L106)

Remove a mixin

#### Parameters

##### mixinId

`string`

The mixin shape ID to remove

#### Returns

`boolean`

True if the mixin was removed, false if it didn't exist

***

### getMixins()

> **getMixins**(): `string`[]

Defined in: [packages/smithy/src/shapes/structure.ts:122](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/shapes/structure.ts#L122)

Get all mixins

#### Returns

`string`[]

Array of mixin shape IDs

***

### toObject()

> **toObject**(): `StructureShape`

Defined in: [packages/smithy/src/shapes/structure.ts:130](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/shapes/structure.ts#L130)

Convert the shape to a plain object

#### Returns

`StructureShape`

Plain object representation

#### Overrides

[`BaseShape`](BaseShape.md).[`toObject`](BaseShape.md#toobject)

## Properties

### type

> **type**: [`ShapeType`](../type-aliases/ShapeType.md)

Defined in: [packages/smithy/src/shapes/base-shape.ts:13](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/shapes/base-shape.ts#L13)

The type of the shape

#### Inherited from

[`BaseShape`](BaseShape.md).[`type`](BaseShape.md#type)

***

### traits?

> `optional` **traits**: `Record`\<`string`, `unknown`\>

Defined in: [packages/smithy/src/shapes/base-shape.ts:14](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/shapes/base-shape.ts#L14)

Optional traits applied to the shape

#### Inherited from

[`BaseShape`](BaseShape.md).[`traits`](BaseShape.md#traits)

***

### members?

> `optional` **members**: `Record`\<`string`, [`MemberShape`](../interfaces/MemberShape.md)\>

Defined in: [packages/smithy/src/shapes/structure.ts:14](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/shapes/structure.ts#L14)

***

### mixins?

> `optional` **mixins**: `string`[]

Defined in: [packages/smithy/src/shapes/structure.ts:15](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/shapes/structure.ts#L15)
