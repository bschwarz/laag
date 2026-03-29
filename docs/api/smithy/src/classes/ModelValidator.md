[**Laag Library Collection**](../../../README.md)

***

[Laag Library Collection](../../../modules.md) / [smithy/src](../README.md) / ModelValidator

# Class: ModelValidator

Defined in: [packages/smithy/src/validators/model-validator.ts:12](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/validators/model-validator.ts#L12)

Validates Smithy models according to the Smithy specification

## Constructors

### Constructor

> **new ModelValidator**(): `ModelValidator`

#### Returns

`ModelValidator`

## Methods

### validate()

> **validate**(`model`): [`ValidationResult`](../../../@laag/core/interfaces/ValidationResult.md)

Defined in: [packages/smithy/src/validators/model-validator.ts:18](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/validators/model-validator.ts#L18)

Validate a complete Smithy model

#### Parameters

##### model

[`SmithyModel`](../interfaces/SmithyModel.md)

The Smithy model to validate

#### Returns

[`ValidationResult`](../../../@laag/core/interfaces/ValidationResult.md)

Validation result with any errors found

***

### validateVersion()

> **validateVersion**(`version`): [`ValidationResult`](../../../@laag/core/interfaces/ValidationResult.md)

Defined in: [packages/smithy/src/validators/model-validator.ts:52](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/validators/model-validator.ts#L52)

Validate the Smithy version

#### Parameters

##### version

`string`

The version string to validate

#### Returns

[`ValidationResult`](../../../@laag/core/interfaces/ValidationResult.md)

Validation result

***

### validateMetadata()

> **validateMetadata**(`metadata`): [`ValidationResult`](../../../@laag/core/interfaces/ValidationResult.md)

Defined in: [packages/smithy/src/validators/model-validator.ts:103](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/validators/model-validator.ts#L103)

Validate model metadata

#### Parameters

##### metadata

`Record`\<`string`, `unknown`\>

The metadata object to validate

#### Returns

[`ValidationResult`](../../../@laag/core/interfaces/ValidationResult.md)

Validation result

***

### validateShapes()

> **validateShapes**(`shapes`): [`ValidationResult`](../../../@laag/core/interfaces/ValidationResult.md)

Defined in: [packages/smithy/src/validators/model-validator.ts:132](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/validators/model-validator.ts#L132)

Validate the shapes collection

#### Parameters

##### shapes

`Record`\<`string`, `unknown`\>

The shapes object to validate

#### Returns

[`ValidationResult`](../../../@laag/core/interfaces/ValidationResult.md)

Validation result
