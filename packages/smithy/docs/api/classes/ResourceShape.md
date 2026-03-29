[**@laag/smithy v1.0.0-alpha.0**](../README.md)

***

[@laag/smithy](../globals.md) / ResourceShape

# Class: ResourceShape

Defined in: [smithy/src/shapes/resource.ts:13](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/resource.ts#L13)

Represents a Smithy resource shape
Resources define entities with lifecycle operations

## Extends

- [`BaseShape`](BaseShape.md)

## Constructors

### Constructor

> **new ResourceShape**(`identifiers?`, `properties?`, `traits?`): `ResourceShape`

Defined in: [smithy/src/shapes/resource.ts:32](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/resource.ts#L32)

Create a new ResourceShape

#### Parameters

##### identifiers?

`Record`\<`string`, `string`\>

Optional resource identifiers

##### properties?

`Record`\<`string`, `string`\>

Optional resource properties

##### traits?

`Record`\<`string`, `unknown`\>

Optional traits applied to the shape

#### Returns

`ResourceShape`

#### Overrides

[`BaseShape`](BaseShape.md).[`constructor`](BaseShape.md#constructor)

## Methods

### getTrait()

> **getTrait**(`traitId`): `unknown`

Defined in: [smithy/src/shapes/base-shape.ts:31](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/base-shape.ts#L31)

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

Defined in: [smithy/src/shapes/base-shape.ts:40](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/base-shape.ts#L40)

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

Defined in: [smithy/src/shapes/base-shape.ts:49](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/base-shape.ts#L49)

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

Defined in: [smithy/src/shapes/base-shape.ts:59](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/base-shape.ts#L59)

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

Defined in: [smithy/src/shapes/base-shape.ts:71](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/base-shape.ts#L71)

Get all trait IDs

#### Returns

`string`[]

Array of trait IDs

#### Inherited from

[`BaseShape`](BaseShape.md).[`getTraitIds`](BaseShape.md#gettraitids)

***

### getTraits()

> **getTraits**(): `Record`\<`string`, `unknown`\>

Defined in: [smithy/src/shapes/base-shape.ts:79](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/base-shape.ts#L79)

Get all traits

#### Returns

`Record`\<`string`, `unknown`\>

Record of all traits

#### Inherited from

[`BaseShape`](BaseShape.md).[`getTraits`](BaseShape.md#gettraits)

***

### setLifecycleOperation()

> **setLifecycleOperation**(`operation`, `operationId`): `void`

Defined in: [smithy/src/shapes/resource.ts:47](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/resource.ts#L47)

Set a lifecycle operation

#### Parameters

##### operation

The operation type (create, put, read, update, delete, list)

`"list"` | `"create"` | `"put"` | `"read"` | `"update"` | `"delete"`

##### operationId

`string`

The operation shape ID

#### Returns

`void`

***

### getLifecycleOperation()

> **getLifecycleOperation**(`operation`): `string` \| `undefined`

Defined in: [smithy/src/shapes/resource.ts:59](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/resource.ts#L59)

Get a lifecycle operation

#### Parameters

##### operation

The operation type

`"list"` | `"create"` | `"put"` | `"read"` | `"update"` | `"delete"`

#### Returns

`string` \| `undefined`

The operation shape ID, or undefined if not set

***

### addOperation()

> **addOperation**(`operationId`): `void`

Defined in: [smithy/src/shapes/resource.ts:69](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/resource.ts#L69)

Add an instance operation

#### Parameters

##### operationId

`string`

The operation shape ID

#### Returns

`void`

***

### removeOperation()

> **removeOperation**(`operationId`): `boolean`

Defined in: [smithy/src/shapes/resource.ts:81](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/resource.ts#L81)

Remove an instance operation

#### Parameters

##### operationId

`string`

The operation shape ID to remove

#### Returns

`boolean`

True if the operation was removed, false if it didn't exist

***

### getOperations()

> **getOperations**(): `string`[]

Defined in: [smithy/src/shapes/resource.ts:97](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/resource.ts#L97)

Get all instance operations

#### Returns

`string`[]

Array of operation shape IDs

***

### addCollectionOperation()

> **addCollectionOperation**(`operationId`): `void`

Defined in: [smithy/src/shapes/resource.ts:105](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/resource.ts#L105)

Add a collection operation

#### Parameters

##### operationId

`string`

The operation shape ID

#### Returns

`void`

***

### removeCollectionOperation()

> **removeCollectionOperation**(`operationId`): `boolean`

Defined in: [smithy/src/shapes/resource.ts:117](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/resource.ts#L117)

Remove a collection operation

#### Parameters

##### operationId

`string`

The operation shape ID to remove

#### Returns

`boolean`

True if the operation was removed, false if it didn't exist

***

### getCollectionOperations()

> **getCollectionOperations**(): `string`[]

Defined in: [smithy/src/shapes/resource.ts:133](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/resource.ts#L133)

Get all collection operations

#### Returns

`string`[]

Array of operation shape IDs

***

### addResource()

> **addResource**(`resourceId`): `void`

Defined in: [smithy/src/shapes/resource.ts:141](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/resource.ts#L141)

Add a child resource

#### Parameters

##### resourceId

`string`

The resource shape ID

#### Returns

`void`

***

### removeResource()

> **removeResource**(`resourceId`): `boolean`

Defined in: [smithy/src/shapes/resource.ts:153](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/resource.ts#L153)

Remove a child resource

#### Parameters

##### resourceId

`string`

The resource shape ID to remove

#### Returns

`boolean`

True if the resource was removed, false if it didn't exist

***

### getResources()

> **getResources**(): `string`[]

Defined in: [smithy/src/shapes/resource.ts:169](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/resource.ts#L169)

Get all child resources

#### Returns

`string`[]

Array of resource shape IDs

***

### toObject()

> **toObject**(): `ResourceShape`

Defined in: [smithy/src/shapes/resource.ts:177](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/resource.ts#L177)

Convert the shape to a plain object

#### Returns

`ResourceShape`

Plain object representation

#### Overrides

[`BaseShape`](BaseShape.md).[`toObject`](BaseShape.md#toobject)

## Properties

### type

> **type**: [`ShapeType`](../type-aliases/ShapeType.md)

Defined in: [smithy/src/shapes/base-shape.ts:13](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/base-shape.ts#L13)

The type of the shape

#### Inherited from

[`BaseShape`](BaseShape.md).[`type`](BaseShape.md#type)

***

### traits?

> `optional` **traits**: `Record`\<`string`, `unknown`\>

Defined in: [smithy/src/shapes/base-shape.ts:14](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/base-shape.ts#L14)

Optional traits applied to the shape

#### Inherited from

[`BaseShape`](BaseShape.md).[`traits`](BaseShape.md#traits)

***

### identifiers?

> `optional` **identifiers**: `Record`\<`string`, `string`\>

Defined in: [smithy/src/shapes/resource.ts:14](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/resource.ts#L14)

***

### properties?

> `optional` **properties**: `Record`\<`string`, `string`\>

Defined in: [smithy/src/shapes/resource.ts:15](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/resource.ts#L15)

***

### create?

> `optional` **create**: `string`

Defined in: [smithy/src/shapes/resource.ts:16](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/resource.ts#L16)

***

### put?

> `optional` **put**: `string`

Defined in: [smithy/src/shapes/resource.ts:17](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/resource.ts#L17)

***

### read?

> `optional` **read**: `string`

Defined in: [smithy/src/shapes/resource.ts:18](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/resource.ts#L18)

***

### update?

> `optional` **update**: `string`

Defined in: [smithy/src/shapes/resource.ts:19](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/resource.ts#L19)

***

### delete?

> `optional` **delete**: `string`

Defined in: [smithy/src/shapes/resource.ts:20](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/resource.ts#L20)

***

### list?

> `optional` **list**: `string`

Defined in: [smithy/src/shapes/resource.ts:21](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/resource.ts#L21)

***

### operations?

> `optional` **operations**: `string`[]

Defined in: [smithy/src/shapes/resource.ts:22](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/resource.ts#L22)

***

### collectionOperations?

> `optional` **collectionOperations**: `string`[]

Defined in: [smithy/src/shapes/resource.ts:23](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/resource.ts#L23)

***

### resources?

> `optional` **resources**: `string`[]

Defined in: [smithy/src/shapes/resource.ts:24](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/shapes/resource.ts#L24)
