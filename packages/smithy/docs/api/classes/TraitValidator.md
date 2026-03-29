[**@laag/smithy v1.0.0-alpha.0**](../README.md)

***

[@laag/smithy](../globals.md) / TraitValidator

# Class: TraitValidator

Defined in: [smithy/src/validators/trait-validator.ts:13](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/validators/trait-validator.ts#L13)

Validates Smithy traits according to the Smithy specification

## Constructors

### Constructor

> **new TraitValidator**(): `TraitValidator`

#### Returns

`TraitValidator`

## Methods

### validate()

> **validate**(`traitId`, `value`): `ValidationResult`

Defined in: [smithy/src/validators/trait-validator.ts:20](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/validators/trait-validator.ts#L20)

Validate a trait application

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

### validateHttpTrait()

> **validateHttpTrait**(`value`): `ValidationResult`

Defined in: [smithy/src/validators/trait-validator.ts:84](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/validators/trait-validator.ts#L84)

Validate HTTP trait

#### Parameters

##### value

`unknown`

The trait value

#### Returns

`ValidationResult`

Validation result

***

### validateHttpErrorTrait()

> **validateHttpErrorTrait**(`value`): `ValidationResult`

Defined in: [smithy/src/validators/trait-validator.ts:172](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/validators/trait-validator.ts#L172)

Validate HTTP error trait

#### Parameters

##### value

`unknown`

The trait value

#### Returns

`ValidationResult`

Validation result

***

### validateHttpQueryTrait()

> **validateHttpQueryTrait**(`value`): `ValidationResult`

Defined in: [smithy/src/validators/trait-validator.ts:203](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/validators/trait-validator.ts#L203)

Validate HTTP query trait

#### Parameters

##### value

`unknown`

The trait value

#### Returns

`ValidationResult`

Validation result

***

### validateHttpHeaderTrait()

> **validateHttpHeaderTrait**(`value`): `ValidationResult`

Defined in: [smithy/src/validators/trait-validator.ts:234](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/validators/trait-validator.ts#L234)

Validate HTTP header trait

#### Parameters

##### value

`unknown`

The trait value

#### Returns

`ValidationResult`

Validation result

***

### validateRequiredTrait()

> **validateRequiredTrait**(`value`): `ValidationResult`

Defined in: [smithy/src/validators/trait-validator.ts:265](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/validators/trait-validator.ts#L265)

Validate required trait

#### Parameters

##### value

`unknown`

The trait value

#### Returns

`ValidationResult`

Validation result

***

### validateDocumentationTrait()

> **validateDocumentationTrait**(`value`): `ValidationResult`

Defined in: [smithy/src/validators/trait-validator.ts:301](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/validators/trait-validator.ts#L301)

Validate documentation trait

#### Parameters

##### value

`unknown`

The trait value

#### Returns

`ValidationResult`

Validation result

***

### validatePaginatedTrait()

> **validatePaginatedTrait**(`value`): `ValidationResult`

Defined in: [smithy/src/validators/trait-validator.ts:332](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/validators/trait-validator.ts#L332)

Validate paginated trait

#### Parameters

##### value

`unknown`

The trait value

#### Returns

`ValidationResult`

Validation result

***

### validateMarkerTrait()

> **validateMarkerTrait**(`value`): `ValidationResult`

Defined in: [smithy/src/validators/trait-validator.ts:369](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/validators/trait-validator.ts#L369)

Validate marker trait (empty object)

#### Parameters

##### value

`unknown`

The trait value

#### Returns

`ValidationResult`

Validation result

***

### validateCustomTrait()

> **validateCustomTrait**(`value`): `ValidationResult`

Defined in: [smithy/src/validators/trait-validator.ts:412](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/validators/trait-validator.ts#L412)

Validate custom trait

#### Parameters

##### value

`unknown`

The trait value

#### Returns

`ValidationResult`

Validation result

Custom traits can have any JSON-serializable value. This method performs
basic structural validation to ensure the trait value is valid.

In a production implementation, you would validate against trait shape
definitions from the model, but for now we ensure the value is at least
a valid JSON-serializable type.
