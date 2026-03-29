[**@laag/smithy v1.0.0-alpha.0**](../README.md)

***

[@laag/smithy](../globals.md) / ShapeValidator

# Class: ShapeValidator

Defined in: [smithy/src/validators/shape-validator.ts:25](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/validators/shape-validator.ts#L25)

Validates Smithy shapes according to the Smithy specification

## Constructors

### Constructor

> **new ShapeValidator**(`shapeIds`): `ShapeValidator`

Defined in: [smithy/src/validators/shape-validator.ts:32](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/validators/shape-validator.ts#L32)

Create a new ShapeValidator

#### Parameters

##### shapeIds

`Set`\<`string`\> = `...`

Set of all valid shape IDs in the model (for reference validation)

#### Returns

`ShapeValidator`

## Methods

### validate()

> **validate**(`shapeId`, `shape`): `ValidationResult`

Defined in: [smithy/src/validators/shape-validator.ts:42](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/validators/shape-validator.ts#L42)

Validate a shape

#### Parameters

##### shapeId

`string`

The shape ID

##### shape

[`Shape`](../type-aliases/Shape.md)

The shape to validate

#### Returns

`ValidationResult`

Validation result

***

### validateStructure()

> **validateStructure**(`shapeId`, `shape`): `ValidationResult`

Defined in: [smithy/src/validators/shape-validator.ts:137](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/validators/shape-validator.ts#L137)

Validate a structure shape

#### Parameters

##### shapeId

`string`

The shape ID

##### shape

`StructureShape`

The structure shape

#### Returns

`ValidationResult`

Validation result

***

### validateService()

> **validateService**(`shapeId`, `shape`): `ValidationResult`

Defined in: [smithy/src/validators/shape-validator.ts:194](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/validators/shape-validator.ts#L194)

Validate a service shape

#### Parameters

##### shapeId

`string`

The shape ID

##### shape

`ServiceShape`

The service shape

#### Returns

`ValidationResult`

Validation result

***

### validateOperation()

> **validateOperation**(`shapeId`, `shape`): `ValidationResult`

Defined in: [smithy/src/validators/shape-validator.ts:263](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/validators/shape-validator.ts#L263)

Validate an operation shape

#### Parameters

##### shapeId

`string`

The shape ID

##### shape

`OperationShape`

The operation shape

#### Returns

`ValidationResult`

Validation result

***

### validateResource()

> **validateResource**(`shapeId`, `shape`): `ValidationResult`

Defined in: [smithy/src/validators/shape-validator.ts:302](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/validators/shape-validator.ts#L302)

Validate a resource shape

#### Parameters

##### shapeId

`string`

The shape ID

##### shape

`ResourceShape`

The resource shape

#### Returns

`ValidationResult`

Validation result

***

### validateUnion()

> **validateUnion**(`shapeId`, `shape`): `ValidationResult`

Defined in: [smithy/src/validators/shape-validator.ts:372](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/validators/shape-validator.ts#L372)

Validate a union shape

#### Parameters

##### shapeId

`string`

The shape ID

##### shape

[`UnionShape`](../interfaces/UnionShape.md)

The union shape

#### Returns

`ValidationResult`

Validation result

***

### validateList()

> **validateList**(`shapeId`, `shape`): `ValidationResult`

Defined in: [smithy/src/validators/shape-validator.ts:410](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/validators/shape-validator.ts#L410)

Validate a list shape

#### Parameters

##### shapeId

`string`

The shape ID

##### shape

[`ListShape`](../interfaces/ListShape.md)

The list shape

#### Returns

`ValidationResult`

Validation result

***

### validateSet()

> **validateSet**(`shapeId`, `shape`): `ValidationResult`

Defined in: [smithy/src/validators/shape-validator.ts:439](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/validators/shape-validator.ts#L439)

Validate a set shape

#### Parameters

##### shapeId

`string`

The shape ID

##### shape

[`SetShape`](../interfaces/SetShape.md)

The set shape

#### Returns

`ValidationResult`

Validation result

***

### validateMap()

> **validateMap**(`shapeId`, `shape`): `ValidationResult`

Defined in: [smithy/src/validators/shape-validator.ts:468](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/validators/shape-validator.ts#L468)

Validate a map shape

#### Parameters

##### shapeId

`string`

The shape ID

##### shape

[`MapShape`](../interfaces/MapShape.md)

The map shape

#### Returns

`ValidationResult`

Validation result
