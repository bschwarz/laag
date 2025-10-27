[**Laag Library Collection**](../../../README.md)

***

[Laag Library Collection](../../../modules.md) / [smithy/src](../README.md) / TraitValidator

# Class: TraitValidator

Defined in: [packages/smithy/src/validators/trait-validator.ts:13](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/validators/trait-validator.ts#L13)

Validates Smithy traits according to the Smithy specification

## Constructors

### Constructor

> **new TraitValidator**(): `TraitValidator`

#### Returns

`TraitValidator`

## Methods

### validate()

> **validate**(`traitId`, `value`): [`ValidationResult`](../../../@laag/core/interfaces/ValidationResult.md)

Defined in: [packages/smithy/src/validators/trait-validator.ts:20](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/validators/trait-validator.ts#L20)

Validate a trait application

#### Parameters

##### traitId

`string`

The trait ID

##### value

`unknown`

The trait value

#### Returns

[`ValidationResult`](../../../@laag/core/interfaces/ValidationResult.md)

Validation result

***

### validateHttpTrait()

> **validateHttpTrait**(`value`): [`ValidationResult`](../../../@laag/core/interfaces/ValidationResult.md)

Defined in: [packages/smithy/src/validators/trait-validator.ts:84](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/validators/trait-validator.ts#L84)

Validate HTTP trait

#### Parameters

##### value

`unknown`

The trait value

#### Returns

[`ValidationResult`](../../../@laag/core/interfaces/ValidationResult.md)

Validation result

***

### validateHttpErrorTrait()

> **validateHttpErrorTrait**(`value`): [`ValidationResult`](../../../@laag/core/interfaces/ValidationResult.md)

Defined in: [packages/smithy/src/validators/trait-validator.ts:172](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/validators/trait-validator.ts#L172)

Validate HTTP error trait

#### Parameters

##### value

`unknown`

The trait value

#### Returns

[`ValidationResult`](../../../@laag/core/interfaces/ValidationResult.md)

Validation result

***

### validateHttpQueryTrait()

> **validateHttpQueryTrait**(`value`): [`ValidationResult`](../../../@laag/core/interfaces/ValidationResult.md)

Defined in: [packages/smithy/src/validators/trait-validator.ts:203](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/validators/trait-validator.ts#L203)

Validate HTTP query trait

#### Parameters

##### value

`unknown`

The trait value

#### Returns

[`ValidationResult`](../../../@laag/core/interfaces/ValidationResult.md)

Validation result

***

### validateHttpHeaderTrait()

> **validateHttpHeaderTrait**(`value`): [`ValidationResult`](../../../@laag/core/interfaces/ValidationResult.md)

Defined in: [packages/smithy/src/validators/trait-validator.ts:234](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/validators/trait-validator.ts#L234)

Validate HTTP header trait

#### Parameters

##### value

`unknown`

The trait value

#### Returns

[`ValidationResult`](../../../@laag/core/interfaces/ValidationResult.md)

Validation result

***

### validateRequiredTrait()

> **validateRequiredTrait**(`value`): [`ValidationResult`](../../../@laag/core/interfaces/ValidationResult.md)

Defined in: [packages/smithy/src/validators/trait-validator.ts:265](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/validators/trait-validator.ts#L265)

Validate required trait

#### Parameters

##### value

`unknown`

The trait value

#### Returns

[`ValidationResult`](../../../@laag/core/interfaces/ValidationResult.md)

Validation result

***

### validateDocumentationTrait()

> **validateDocumentationTrait**(`value`): [`ValidationResult`](../../../@laag/core/interfaces/ValidationResult.md)

Defined in: [packages/smithy/src/validators/trait-validator.ts:301](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/validators/trait-validator.ts#L301)

Validate documentation trait

#### Parameters

##### value

`unknown`

The trait value

#### Returns

[`ValidationResult`](../../../@laag/core/interfaces/ValidationResult.md)

Validation result

***

### validatePaginatedTrait()

> **validatePaginatedTrait**(`value`): [`ValidationResult`](../../../@laag/core/interfaces/ValidationResult.md)

Defined in: [packages/smithy/src/validators/trait-validator.ts:332](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/validators/trait-validator.ts#L332)

Validate paginated trait

#### Parameters

##### value

`unknown`

The trait value

#### Returns

[`ValidationResult`](../../../@laag/core/interfaces/ValidationResult.md)

Validation result

***

### validateMarkerTrait()

> **validateMarkerTrait**(`value`): [`ValidationResult`](../../../@laag/core/interfaces/ValidationResult.md)

Defined in: [packages/smithy/src/validators/trait-validator.ts:369](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/validators/trait-validator.ts#L369)

Validate marker trait (empty object)

#### Parameters

##### value

`unknown`

The trait value

#### Returns

[`ValidationResult`](../../../@laag/core/interfaces/ValidationResult.md)

Validation result

***

### validateCustomTrait()

> **validateCustomTrait**(`value`): [`ValidationResult`](../../../@laag/core/interfaces/ValidationResult.md)

Defined in: [packages/smithy/src/validators/trait-validator.ts:412](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/validators/trait-validator.ts#L412)

Validate custom trait

#### Parameters

##### value

`unknown`

The trait value

#### Returns

[`ValidationResult`](../../../@laag/core/interfaces/ValidationResult.md)

Validation result

Custom traits can have any JSON-serializable value. This method performs
basic structural validation to ensure the trait value is valid.

In a production implementation, you would validate against trait shape
definitions from the model, but for now we ensure the value is at least
a valid JSON-serializable type.
