[**Laag Library Collection**](../../../README.md)

***

[Laag Library Collection](../../../modules.md) / [smithy/src](../README.md) / ServiceShape

# Class: ServiceShape

Defined in: [packages/smithy/src/shapes/service.ts:13](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/shapes/service.ts#L13)

Represents a Smithy service shape
Services define API operations and resources

## Extends

- [`BaseShape`](BaseShape.md)

## Constructors

### Constructor

> **new ServiceShape**(`version`, `operations?`, `resources?`, `errors?`, `rename?`, `traits?`): `ServiceShape`

Defined in: [packages/smithy/src/shapes/service.ts:29](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/shapes/service.ts#L29)

Create a new ServiceShape

#### Parameters

##### version

`string`

Service version

##### operations?

`string`[]

Optional operations bound to the service

##### resources?

`string`[]

Optional resources bound to the service

##### errors?

`string`[]

Optional common errors

##### rename?

`Record`\<`string`, `string`\>

Optional shape ID renames

##### traits?

`Record`\<`string`, `unknown`\>

Optional traits applied to the shape

#### Returns

`ServiceShape`

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

### addOperation()

> **addOperation**(`operationId`): `void`

Defined in: [packages/smithy/src/shapes/service.ts:49](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/shapes/service.ts#L49)

Add an operation to the service

#### Parameters

##### operationId

`string`

The operation shape ID

#### Returns

`void`

***

### removeOperation()

> **removeOperation**(`operationId`): `boolean`

Defined in: [packages/smithy/src/shapes/service.ts:61](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/shapes/service.ts#L61)

Remove an operation from the service

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

Defined in: [packages/smithy/src/shapes/service.ts:77](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/shapes/service.ts#L77)

Get all operations

#### Returns

`string`[]

Array of operation shape IDs

***

### addResource()

> **addResource**(`resourceId`): `void`

Defined in: [packages/smithy/src/shapes/service.ts:85](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/shapes/service.ts#L85)

Add a resource to the service

#### Parameters

##### resourceId

`string`

The resource shape ID

#### Returns

`void`

***

### removeResource()

> **removeResource**(`resourceId`): `boolean`

Defined in: [packages/smithy/src/shapes/service.ts:97](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/shapes/service.ts#L97)

Remove a resource from the service

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

Defined in: [packages/smithy/src/shapes/service.ts:113](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/shapes/service.ts#L113)

Get all resources

#### Returns

`string`[]

Array of resource shape IDs

***

### addError()

> **addError**(`errorId`): `void`

Defined in: [packages/smithy/src/shapes/service.ts:121](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/shapes/service.ts#L121)

Add an error to the service

#### Parameters

##### errorId

`string`

The error shape ID

#### Returns

`void`

***

### removeError()

> **removeError**(`errorId`): `boolean`

Defined in: [packages/smithy/src/shapes/service.ts:133](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/shapes/service.ts#L133)

Remove an error from the service

#### Parameters

##### errorId

`string`

The error shape ID to remove

#### Returns

`boolean`

True if the error was removed, false if it didn't exist

***

### getErrors()

> **getErrors**(): `string`[]

Defined in: [packages/smithy/src/shapes/service.ts:149](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/shapes/service.ts#L149)

Get all errors

#### Returns

`string`[]

Array of error shape IDs

***

### toObject()

> **toObject**(): `ServiceShape`

Defined in: [packages/smithy/src/shapes/service.ts:157](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/shapes/service.ts#L157)

Convert the shape to a plain object

#### Returns

`ServiceShape`

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

### version

> **version**: `string`

Defined in: [packages/smithy/src/shapes/service.ts:14](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/shapes/service.ts#L14)

***

### operations?

> `optional` **operations**: `string`[]

Defined in: [packages/smithy/src/shapes/service.ts:15](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/shapes/service.ts#L15)

***

### resources?

> `optional` **resources**: `string`[]

Defined in: [packages/smithy/src/shapes/service.ts:16](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/shapes/service.ts#L16)

***

### errors?

> `optional` **errors**: `string`[]

Defined in: [packages/smithy/src/shapes/service.ts:17](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/shapes/service.ts#L17)

***

### rename?

> `optional` **rename**: `Record`\<`string`, `string`\>

Defined in: [packages/smithy/src/shapes/service.ts:18](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/shapes/service.ts#L18)
