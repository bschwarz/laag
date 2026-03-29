[**@laag/smithy v1.0.0-alpha.0**](../README.md)

***

[@laag/smithy](../globals.md) / ModelValidator

# Class: ModelValidator

Defined in: [smithy/src/validators/model-validator.ts:12](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/validators/model-validator.ts#L12)

Validates Smithy models according to the Smithy specification

## Constructors

### Constructor

> **new ModelValidator**(): `ModelValidator`

#### Returns

`ModelValidator`

## Methods

### validate()

> **validate**(`model`): `ValidationResult`

Defined in: [smithy/src/validators/model-validator.ts:18](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/validators/model-validator.ts#L18)

Validate a complete Smithy model

#### Parameters

##### model

[`SmithyModel`](../interfaces/SmithyModel.md)

The Smithy model to validate

#### Returns

`ValidationResult`

Validation result with any errors found

***

### validateVersion()

> **validateVersion**(`version`): `ValidationResult`

Defined in: [smithy/src/validators/model-validator.ts:52](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/validators/model-validator.ts#L52)

Validate the Smithy version

#### Parameters

##### version

`string`

The version string to validate

#### Returns

`ValidationResult`

Validation result

***

### validateMetadata()

> **validateMetadata**(`metadata`): `ValidationResult`

Defined in: [smithy/src/validators/model-validator.ts:103](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/validators/model-validator.ts#L103)

Validate model metadata

#### Parameters

##### metadata

`Record`\<`string`, `unknown`\>

The metadata object to validate

#### Returns

`ValidationResult`

Validation result

***

### validateShapes()

> **validateShapes**(`shapes`): `ValidationResult`

Defined in: [smithy/src/validators/model-validator.ts:132](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/validators/model-validator.ts#L132)

Validate the shapes collection

#### Parameters

##### shapes

`Record`\<`string`, `unknown`\>

The shapes object to validate

#### Returns

`ValidationResult`

Validation result
