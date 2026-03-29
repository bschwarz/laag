[**@laag/smithy v1.0.0-alpha.0**](../README.md)

***

[@laag/smithy](../globals.md) / ShapeManager

# Class: ShapeManager

Defined in: [smithy/src/shapes/shape-manager.ts:13](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/shape-manager.ts#L13)

Manages shapes in a Smithy model
Provides methods for storing, retrieving, and querying shapes

## Constructors

### Constructor

> **new ShapeManager**(`shapes`): `ShapeManager`

Defined in: [smithy/src/shapes/shape-manager.ts:20](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/shape-manager.ts#L20)

Create a new ShapeManager

#### Parameters

##### shapes

`Record`\<[`ShapeId`](../type-aliases/ShapeId.md), [`Shape`](../type-aliases/Shape.md)\> = `{}`

Initial shapes as a record

#### Returns

`ShapeManager`

## Methods

### get()

> **get**(`shapeId`): [`Shape`](../type-aliases/Shape.md) \| `undefined`

Defined in: [smithy/src/shapes/shape-manager.ts:29](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/shape-manager.ts#L29)

Get a shape by its ID

#### Parameters

##### shapeId

`string`

The shape ID to retrieve

#### Returns

[`Shape`](../type-aliases/Shape.md) \| `undefined`

The shape, or undefined if not found

***

### getAll()

> **getAll**(): `Map`\<`string`, [`Shape`](../type-aliases/Shape.md)\>

Defined in: [smithy/src/shapes/shape-manager.ts:37](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/shape-manager.ts#L37)

Get all shapes

#### Returns

`Map`\<`string`, [`Shape`](../type-aliases/Shape.md)\>

Map of all shapes keyed by shape ID

***

### getByType()

> **getByType**(`type`): [`Shape`](../type-aliases/Shape.md)[]

Defined in: [smithy/src/shapes/shape-manager.ts:46](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/shape-manager.ts#L46)

Get all shapes of a specific type

#### Parameters

##### type

[`ShapeType`](../type-aliases/ShapeType.md)

The shape type to filter by

#### Returns

[`Shape`](../type-aliases/Shape.md)[]

Array of shapes matching the type

***

### add()

> **add**(`shapeId`, `shape`): `void`

Defined in: [smithy/src/shapes/shape-manager.ts:61](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/shape-manager.ts#L61)

Add a shape to the manager

#### Parameters

##### shapeId

`string`

The shape ID

##### shape

[`Shape`](../type-aliases/Shape.md)

The shape to add

#### Returns

`void`

***

### remove()

> **remove**(`shapeId`): `boolean`

Defined in: [smithy/src/shapes/shape-manager.ts:70](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/shape-manager.ts#L70)

Remove a shape from the manager

#### Parameters

##### shapeId

`string`

The shape ID to remove

#### Returns

`boolean`

True if the shape was removed, false if it didn't exist

***

### has()

> **has**(`shapeId`): `boolean`

Defined in: [smithy/src/shapes/shape-manager.ts:79](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/shape-manager.ts#L79)

Check if a shape exists

#### Parameters

##### shapeId

`string`

The shape ID to check

#### Returns

`boolean`

True if the shape exists

***

### resolveTarget()

> **resolveTarget**(`shapeId`): [`Shape`](../type-aliases/Shape.md) \| `undefined`

Defined in: [smithy/src/shapes/shape-manager.ts:89](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/shape-manager.ts#L89)

Resolve a target shape ID to its shape
Follows member references to get the actual shape

#### Parameters

##### shapeId

`string`

The shape ID to resolve

#### Returns

[`Shape`](../type-aliases/Shape.md) \| `undefined`

The resolved shape, or undefined if not found

***

### getMembers()

> **getMembers**(`shapeId`): `Map`\<`string`, [`MemberShape`](../interfaces/MemberShape.md)\> \| `undefined`

Defined in: [smithy/src/shapes/shape-manager.ts:98](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/shape-manager.ts#L98)

Get members of a structure or union shape

#### Parameters

##### shapeId

`string`

The structure or union shape ID

#### Returns

`Map`\<`string`, [`MemberShape`](../interfaces/MemberShape.md)\> \| `undefined`

Map of member names to member shapes, or undefined if not a structure/union

***

### findShapesByTrait()

> **findShapesByTrait**(`traitId`): [`Shape`](../type-aliases/Shape.md)[]

Defined in: [smithy/src/shapes/shape-manager.ts:120](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/shape-manager.ts#L120)

Find all shapes that have a specific trait

#### Parameters

##### traitId

`string`

The trait ID to search for

#### Returns

[`Shape`](../type-aliases/Shape.md)[]

Array of shapes that have the trait

***

### getShapeHierarchy()

> **getShapeHierarchy**(`shapeId`): `string`[]

Defined in: [smithy/src/shapes/shape-manager.ts:137](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/shape-manager.ts#L137)

Get the shape hierarchy for a shape
Returns an array of shape IDs representing the inheritance chain
For structures with mixins, returns the mixin chain

#### Parameters

##### shapeId

`string`

The shape ID to get hierarchy for

#### Returns

`string`[]

Array of shape IDs in the hierarchy (from base to derived)

***

### getShapeIds()

> **getShapeIds**(): `string`[]

Defined in: [smithy/src/shapes/shape-manager.ts:165](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/shape-manager.ts#L165)

Get all shape IDs

#### Returns

`string`[]

Array of all shape IDs

***

### size()

> **size**(): `number`

Defined in: [smithy/src/shapes/shape-manager.ts:173](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/shape-manager.ts#L173)

Get the count of shapes

#### Returns

`number`

Number of shapes in the manager

***

### clear()

> **clear**(): `void`

Defined in: [smithy/src/shapes/shape-manager.ts:180](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/shape-manager.ts#L180)

Clear all shapes

#### Returns

`void`

***

### toObject()

> **toObject**(): `Record`\<[`ShapeId`](../type-aliases/ShapeId.md), [`Shape`](../type-aliases/Shape.md)\>

Defined in: [smithy/src/shapes/shape-manager.ts:188](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/shape-manager.ts#L188)

Convert shapes to a plain object

#### Returns

`Record`\<[`ShapeId`](../type-aliases/ShapeId.md), [`Shape`](../type-aliases/Shape.md)\>

Record of shapes keyed by shape ID
