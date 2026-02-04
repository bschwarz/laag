[**@laag/smithy v1.0.0-alpha.0**](../README.md)

***

[@laag/smithy](../globals.md) / TraitManager

# Class: TraitManager

Defined in: [smithy/src/traits/trait-manager.ts:22](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/trait-manager.ts#L22)

Manages traits for shapes in a Smithy model
Provides methods for accessing, adding, and validating traits

## Constructors

### Constructor

> **new TraitManager**(`shapes`): `TraitManager`

Defined in: [smithy/src/traits/trait-manager.ts:30](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/trait-manager.ts#L30)

Create a new TraitManager

#### Parameters

##### shapes

`Record`\<[`ShapeId`](../type-aliases/ShapeId.md), [`Shape`](../type-aliases/Shape.md)\> = `{}`

Initial shapes to extract traits from

#### Returns

`TraitManager`

## Methods

### get()

> **get**(`shapeId`): `Map`\<`string`, `unknown`\> \| `undefined`

Defined in: [smithy/src/traits/trait-manager.ts:47](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/trait-manager.ts#L47)

Get all traits for a shape

#### Parameters

##### shapeId

`string`

The shape ID

#### Returns

`Map`\<`string`, `unknown`\> \| `undefined`

Map of trait IDs to trait values, or undefined if shape has no traits

***

### has()

> **has**(`shapeId`, `traitId`): `boolean`

Defined in: [smithy/src/traits/trait-manager.ts:61](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/trait-manager.ts#L61)

Check if a shape has a specific trait

#### Parameters

##### shapeId

`string`

The shape ID

##### traitId

`string`

The trait ID to check

#### Returns

`boolean`

True if the shape has the trait

***

### add()

> **add**(`shapeId`, `traitId`, `value`): `void`

Defined in: [smithy/src/traits/trait-manager.ts:76](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/trait-manager.ts#L76)

Add a trait to a shape

#### Parameters

##### shapeId

`string`

The shape ID

##### traitId

`string`

The trait ID

##### value

`unknown`

The trait value

#### Returns

`void`

#### Throws

Error if trait validation fails

***

### remove()

> **remove**(`shapeId`, `traitId`): `boolean`

Defined in: [smithy/src/traits/trait-manager.ts:102](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/trait-manager.ts#L102)

Remove a trait from a shape

#### Parameters

##### shapeId

`string`

The shape ID

##### traitId

`string`

The trait ID to remove

#### Returns

`boolean`

True if the trait was removed, false if it didn't exist

***

### validateTrait()

> **validateTrait**(`traitId`, `value`): `ValidationResult`

Defined in: [smithy/src/traits/trait-manager.ts:116](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/trait-manager.ts#L116)

Validate a trait

#### Parameters

##### traitId

`string`

The trait ID

##### value

`unknown`

The trait value

#### Returns

`ValidationResult`

Validation result

***

### getHttpTrait()

> **getHttpTrait**(`shapeId`): `HttpTrait` \| `undefined`

Defined in: [smithy/src/traits/trait-manager.ts:125](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/trait-manager.ts#L125)

Get the HTTP trait for a shape

#### Parameters

##### shapeId

`string`

The shape ID

#### Returns

`HttpTrait` \| `undefined`

The HTTP trait, or undefined if not present

***

### getDocumentation()

> **getDocumentation**(`shapeId`): `string` \| `undefined`

Defined in: [smithy/src/traits/trait-manager.ts:144](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/trait-manager.ts#L144)

Get the documentation for a shape

#### Parameters

##### shapeId

`string`

The shape ID

#### Returns

`string` \| `undefined`

The documentation string, or undefined if not present

***

### isRequired()

> **isRequired**(`shapeId`): `boolean`

Defined in: [smithy/src/traits/trait-manager.ts:173](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/trait-manager.ts#L173)

Check if a shape is marked as required

#### Parameters

##### shapeId

`string`

The shape ID

#### Returns

`boolean`

True if the shape has the required trait

***

### getHttpError()

> **getHttpError**(`shapeId`): `number` \| `undefined`

Defined in: [smithy/src/traits/trait-manager.ts:182](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/trait-manager.ts#L182)

Get the HTTP error trait for a shape

#### Parameters

##### shapeId

`string`

The shape ID

#### Returns

`number` \| `undefined`

The HTTP error code, or undefined if not present

***

### isReadonly()

> **isReadonly**(`shapeId`): `boolean`

Defined in: [smithy/src/traits/trait-manager.ts:206](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/trait-manager.ts#L206)

Check if a shape is marked as readonly

#### Parameters

##### shapeId

`string`

The shape ID

#### Returns

`boolean`

True if the shape has the readonly trait

***

### isIdempotent()

> **isIdempotent**(`shapeId`): `boolean`

Defined in: [smithy/src/traits/trait-manager.ts:215](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/trait-manager.ts#L215)

Check if a shape is marked as idempotent

#### Parameters

##### shapeId

`string`

The shape ID

#### Returns

`boolean`

True if the shape has the idempotent trait

***

### getPaginated()

> **getPaginated**(`shapeId`): [`PaginatedTrait`](../interfaces/PaginatedTrait.md) \| `undefined`

Defined in: [smithy/src/traits/trait-manager.ts:224](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/trait-manager.ts#L224)

Get the paginated trait for a shape

#### Parameters

##### shapeId

`string`

The shape ID

#### Returns

[`PaginatedTrait`](../interfaces/PaginatedTrait.md) \| `undefined`

The paginated trait, or undefined if not present

***

### hasHttpLabel()

> **hasHttpLabel**(`shapeId`): `boolean`

Defined in: [smithy/src/traits/trait-manager.ts:243](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/trait-manager.ts#L243)

Get the HTTP label trait value for a shape

#### Parameters

##### shapeId

`string`

The shape ID

#### Returns

`boolean`

True if the shape has the HTTP label trait

***

### getHttpQuery()

> **getHttpQuery**(`shapeId`): `string` \| `undefined`

Defined in: [smithy/src/traits/trait-manager.ts:252](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/trait-manager.ts#L252)

Get the HTTP query parameter name for a shape

#### Parameters

##### shapeId

`string`

The shape ID

#### Returns

`string` \| `undefined`

The query parameter name, or undefined if not present

***

### getHttpHeader()

> **getHttpHeader**(`shapeId`): `string` \| `undefined`

Defined in: [smithy/src/traits/trait-manager.ts:271](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/trait-manager.ts#L271)

Get the HTTP header name for a shape

#### Parameters

##### shapeId

`string`

The shape ID

#### Returns

`string` \| `undefined`

The header name, or undefined if not present

***

### hasHttpPayload()

> **hasHttpPayload**(`shapeId`): `boolean`

Defined in: [smithy/src/traits/trait-manager.ts:290](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/trait-manager.ts#L290)

Check if a shape has the HTTP payload trait

#### Parameters

##### shapeId

`string`

The shape ID

#### Returns

`boolean`

True if the shape has the HTTP payload trait

***

### findShapesByTrait()

> **findShapesByTrait**(`traitId`): `string`[]

Defined in: [smithy/src/traits/trait-manager.ts:299](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/trait-manager.ts#L299)

Get all shapes that have a specific trait

#### Parameters

##### traitId

`string`

The trait ID to search for

#### Returns

`string`[]

Array of shape IDs that have the trait

***

### getTrait()

> **getTrait**(`shapeId`, `traitId`): `unknown`

Defined in: [smithy/src/traits/trait-manager.ts:315](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/trait-manager.ts#L315)

Get a specific trait value for a shape

#### Parameters

##### shapeId

`string`

The shape ID

##### traitId

`string`

The trait ID

#### Returns

`unknown`

The trait value, or undefined if not present

***

### clearShape()

> **clearShape**(`shapeId`): `void`

Defined in: [smithy/src/traits/trait-manager.ts:327](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/trait-manager.ts#L327)

Clear all traits for a shape

#### Parameters

##### shapeId

`string`

The shape ID

#### Returns

`void`

***

### clear()

> **clear**(): `void`

Defined in: [smithy/src/traits/trait-manager.ts:334](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/trait-manager.ts#L334)

Clear all traits

#### Returns

`void`

***

### toObject()

> **toObject**(): `Record`\<[`ShapeId`](../type-aliases/ShapeId.md), `Record`\<`string`, `unknown`\>\>

Defined in: [smithy/src/traits/trait-manager.ts:342](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/traits/trait-manager.ts#L342)

Convert traits to a plain object structure

#### Returns

`Record`\<[`ShapeId`](../type-aliases/ShapeId.md), `Record`\<`string`, `unknown`\>\>

Record of shape IDs to trait records
