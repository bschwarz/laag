[**Laag Library Collection**](../../../README.md)

***

[Laag Library Collection](../../../modules.md) / [smithy/src](../README.md) / ShapeValidator

# Class: ShapeValidator

Defined in: [packages/smithy/src/validators/shape-validator.ts:25](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/validators/shape-validator.ts#L25)

Validates Smithy shapes according to the Smithy specification

## Constructors

### Constructor

> **new ShapeValidator**(`shapeIds`): `ShapeValidator`

Defined in: [packages/smithy/src/validators/shape-validator.ts:32](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/validators/shape-validator.ts#L32)

Create a new ShapeValidator

#### Parameters

##### shapeIds

`Set`\<`string`\> = `...`

Set of all valid shape IDs in the model (for reference validation)

#### Returns

`ShapeValidator`

## Methods

### validate()

> **validate**(`shapeId`, `shape`): [`ValidationResult`](../../../@laag/core/interfaces/ValidationResult.md)

Defined in: [packages/smithy/src/validators/shape-validator.ts:42](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/validators/shape-validator.ts#L42)

Validate a shape

#### Parameters

##### shapeId

`string`

The shape ID

##### shape

[`Shape`](../type-aliases/Shape.md)

The shape to validate

#### Returns

[`ValidationResult`](../../../@laag/core/interfaces/ValidationResult.md)

Validation result

***

### validateStructure()

> **validateStructure**(`shapeId`, `shape`): [`ValidationResult`](../../../@laag/core/interfaces/ValidationResult.md)

Defined in: [packages/smithy/src/validators/shape-validator.ts:137](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/validators/shape-validator.ts#L137)

Validate a structure shape

#### Parameters

##### shapeId

`string`

The shape ID

##### shape

`StructureShape`

The structure shape

#### Returns

[`ValidationResult`](../../../@laag/core/interfaces/ValidationResult.md)

Validation result

***

### validateService()

> **validateService**(`shapeId`, `shape`): [`ValidationResult`](../../../@laag/core/interfaces/ValidationResult.md)

Defined in: [packages/smithy/src/validators/shape-validator.ts:194](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/validators/shape-validator.ts#L194)

Validate a service shape

#### Parameters

##### shapeId

`string`

The shape ID

##### shape

`ServiceShape`

The service shape

#### Returns

[`ValidationResult`](../../../@laag/core/interfaces/ValidationResult.md)

Validation result

***

### validateOperation()

> **validateOperation**(`shapeId`, `shape`): [`ValidationResult`](../../../@laag/core/interfaces/ValidationResult.md)

Defined in: [packages/smithy/src/validators/shape-validator.ts:263](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/validators/shape-validator.ts#L263)

Validate an operation shape

#### Parameters

##### shapeId

`string`

The shape ID

##### shape

`OperationShape`

The operation shape

#### Returns

[`ValidationResult`](../../../@laag/core/interfaces/ValidationResult.md)

Validation result

***

### validateResource()

> **validateResource**(`shapeId`, `shape`): [`ValidationResult`](../../../@laag/core/interfaces/ValidationResult.md)

Defined in: [packages/smithy/src/validators/shape-validator.ts:302](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/validators/shape-validator.ts#L302)

Validate a resource shape

#### Parameters

##### shapeId

`string`

The shape ID

##### shape

`ResourceShape`

The resource shape

#### Returns

[`ValidationResult`](../../../@laag/core/interfaces/ValidationResult.md)

Validation result

***

### validateUnion()

> **validateUnion**(`shapeId`, `shape`): [`ValidationResult`](../../../@laag/core/interfaces/ValidationResult.md)

Defined in: [packages/smithy/src/validators/shape-validator.ts:372](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/validators/shape-validator.ts#L372)

Validate a union shape

#### Parameters

##### shapeId

`string`

The shape ID

##### shape

[`UnionShape`](../interfaces/UnionShape.md)

The union shape

#### Returns

[`ValidationResult`](../../../@laag/core/interfaces/ValidationResult.md)

Validation result

***

### validateList()

> **validateList**(`shapeId`, `shape`): [`ValidationResult`](../../../@laag/core/interfaces/ValidationResult.md)

Defined in: [packages/smithy/src/validators/shape-validator.ts:410](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/validators/shape-validator.ts#L410)

Validate a list shape

#### Parameters

##### shapeId

`string`

The shape ID

##### shape

[`ListShape`](../interfaces/ListShape.md)

The list shape

#### Returns

[`ValidationResult`](../../../@laag/core/interfaces/ValidationResult.md)

Validation result

***

### validateSet()

> **validateSet**(`shapeId`, `shape`): [`ValidationResult`](../../../@laag/core/interfaces/ValidationResult.md)

Defined in: [packages/smithy/src/validators/shape-validator.ts:439](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/validators/shape-validator.ts#L439)

Validate a set shape

#### Parameters

##### shapeId

`string`

The shape ID

##### shape

[`SetShape`](../interfaces/SetShape.md)

The set shape

#### Returns

[`ValidationResult`](../../../@laag/core/interfaces/ValidationResult.md)

Validation result

***

### validateMap()

> **validateMap**(`shapeId`, `shape`): [`ValidationResult`](../../../@laag/core/interfaces/ValidationResult.md)

Defined in: [packages/smithy/src/validators/shape-validator.ts:468](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/validators/shape-validator.ts#L468)

Validate a map shape

#### Parameters

##### shapeId

`string`

The shape ID

##### shape

[`MapShape`](../interfaces/MapShape.md)

The map shape

#### Returns

[`ValidationResult`](../../../@laag/core/interfaces/ValidationResult.md)

Validation result
