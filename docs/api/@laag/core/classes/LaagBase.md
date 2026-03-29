[**Laag Library Collection**](../../../README.md)

***

[Laag Library Collection](../../../modules.md) / [@laag/core](../README.md) / LaagBase

# Abstract Class: LaagBase

Defined in: [packages/core/src/base.ts:43](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/core/src/base.ts#L43)

Abstract base class that provides common functionality for all API specification libraries.

This class serves as the foundation for all laag library implementations, providing:
- Document parsing and management
- Extension property handling (x-* properties)
- Nested object navigation utilities
- Error handling configuration
- Abstract validation interface

 LaagBase

## Since

2.0.0

## Example

```typescript
import { LaagBase } from '@laag/core';

class MyApiSpec extends LaagBase {
  validate(): ValidationResult {
    // Implementation specific validation
    return { valid: true, errors: [] };
  }
}

const spec = new MyApiSpec({ version: '1.0.0' });
```

## Extended by

- [`Openapi`](../../../openapi/src/classes/Openapi.md)
- [`Smithy`](../../../smithy/src/classes/Smithy.md)

## Constructors

### Constructor

> **new LaagBase**(`doc?`, `errorOptions?`): `LaagBase`

Defined in: [packages/core/src/base.ts:70](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/core/src/base.ts#L70)

Creates a new instance of the LaagBase class.

#### Parameters

##### doc?

The API specification document as a JSON string or object. If not provided, an empty object is used.

`string` | [`BaseDocument`](../interfaces/BaseDocument.md)

##### errorOptions?

[`ErrorHandlingOptions`](../interfaces/ErrorHandlingOptions.md) = `{}`

Configuration options for error handling behavior.

#### Returns

`LaagBase`

#### Throws

When the provided string cannot be parsed as valid JSON.

#### Example

```typescript
// From JSON string
const spec = new MyApiSpec('{"version": "1.0.0"}');

// From object
const spec = new MyApiSpec({ version: '1.0.0' });

// With error options
const spec = new MyApiSpec(doc, {
  development: true,
  includeContext: true
});
```

## Methods

### dictKeysExists()

> `protected` **dictKeysExists**(`obj`, ...`keys`): `boolean`

Defined in: [packages/core/src/base.ts:117](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/core/src/base.ts#L117)

Check if all specified keys exist in an object, supporting nested key paths.

This utility method can check for both simple keys and nested paths using dot notation.
It's commonly used for validating document structure before accessing properties.

#### Parameters

##### obj

`Record`\<`string`, `any`\>

The object to check for key existence.

##### keys

...`string`[]

The keys to check for. Supports dot notation for nested paths (e.g., 'info.title').

#### Returns

`boolean`

`true` if all specified keys exist in the object, `false` otherwise.

#### Since

2.0.0

#### Example

```typescript
const doc = { info: { title: 'My API', version: '1.0.0' } };

// Check simple key
this.dictKeysExists(doc, 'info'); // true

// Check nested keys
this.dictKeysExists(doc, 'info.title', 'info.version'); // true
this.dictKeysExists(doc, 'info.description'); // false
```

***

### getExtensions()

> `protected` **getExtensions**(`level?`): [`ExtensionObject`](../interfaces/ExtensionObject.md)

Defined in: [packages/core/src/base.ts:174](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/core/src/base.ts#L174)

Get extension properties (x-* properties) from a specific level or the root document.

Extension properties are custom properties that start with 'x-' and are allowed
in most API specification formats to provide vendor-specific functionality.

#### Parameters

##### level?

`string`

Optional path to a specific level in the document using dot notation.
               If not provided, extensions are retrieved from the root document.
               Examples: 'info', 'paths', 'components.schemas'

#### Returns

[`ExtensionObject`](../interfaces/ExtensionObject.md)

Object containing all extension properties found at the specified level.
         Keys are guaranteed to start with 'x-'.

#### Since

2.0.0

#### Example

```typescript
const doc = {
  'x-custom': 'root-level',
  info: {
    title: 'My API',
    'x-logo': 'logo.png'
  }
};

// Get root extensions
this.getExtensions(); // { 'x-custom': 'root-level' }

// Get info-level extensions
this.getExtensions('info'); // { 'x-logo': 'logo.png' }
```

***

### setExtensions()

> `protected` **setExtensions**(`values`, `level?`): `void`

Defined in: [packages/core/src/base.ts:225](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/core/src/base.ts#L225)

Set extension properties (x-* properties) at a specific level or the root document.

This method validates that all provided keys are valid extension properties (start with 'x-')
and sets them at the specified document level.

#### Parameters

##### values

[`ExtensionObject`](../interfaces/ExtensionObject.md)

Object containing extension properties to set. All keys must start with 'x-'.

##### level?

`string`

Optional path to a specific level in the document using dot notation.
               If not provided, extensions are set at the root document level.

#### Returns

`void`

#### Throws

When any key doesn't start with 'x-' or when the target level is invalid.

#### Since

2.0.0

#### Example

```typescript
// Set root-level extensions
this.setExtensions({ 'x-custom': 'value', 'x-version': '2.0' });

// Set info-level extensions
this.setExtensions({ 'x-logo': 'logo.png' }, 'info');

// This will throw ValidationError
this.setExtensions({ 'invalid-key': 'value' }); // Error: keys must start with 'x-'
```

***

### getNestedValue()

> `protected` **getNestedValue**(`obj`, `path`): `any`

Defined in: [packages/core/src/base.ts:280](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/core/src/base.ts#L280)

Get a nested value from an object using dot notation path traversal.

This utility method safely navigates nested object structures without throwing
errors when intermediate properties don't exist.

#### Parameters

##### obj

`Record`\<`string`, `any`\>

The object to traverse.

##### path

`string`

The path to the value using dot notation (e.g., 'info.title', 'components.schemas.User').

#### Returns

`any`

The value at the specified path, or `undefined` if the path doesn't exist.

#### Since

2.0.0

#### Example

```typescript
const doc = {
  info: {
    title: 'My API',
    contact: { email: 'test@example.com' }
  }
};

this.getNestedValue(doc, 'info.title'); // 'My API'
this.getNestedValue(doc, 'info.contact.email'); // 'test@example.com'
this.getNestedValue(doc, 'info.nonexistent'); // undefined
```

***

### setNestedValue()

> `protected` **setNestedValue**(`obj`, `path`, `value`): `void`

Defined in: [packages/core/src/base.ts:322](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/core/src/base.ts#L322)

Set a nested value in an object using dot notation, creating intermediate objects as needed.

This method safely sets values in nested object structures, automatically creating
any missing intermediate objects in the path.

#### Parameters

##### obj

`Record`\<`string`, `any`\>

The object to modify.

##### path

`string`

The path where to set the value using dot notation (e.g., 'info.title').

##### value

`any`

The value to set at the specified path.

#### Returns

`void`

#### Throws

When the path is empty or invalid.

#### Since

2.0.0

#### Example

```typescript
const doc = {};

// Creates nested structure automatically
this.setNestedValue(doc, 'info.title', 'My API');
// Result: { info: { title: 'My API' } }

this.setNestedValue(doc, 'info.contact.email', 'test@example.com');
// Result: { info: { title: 'My API', contact: { email: 'test@example.com' } } }
```

***

### validate()

> `abstract` **validate**(): [`ValidationResult`](../interfaces/ValidationResult.md)

Defined in: [packages/core/src/base.ts:374](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/core/src/base.ts#L374)

Validate the document structure according to the specific API specification format.

This abstract method must be implemented by subclasses to provide format-specific
validation logic. The validation should check for required fields, proper structure,
and any format-specific constraints.

#### Returns

[`ValidationResult`](../interfaces/ValidationResult.md)

A validation result object containing the validation status and any errors found.

#### Since

2.0.0

#### Example

```typescript
class MyApiSpec extends LaagBase {
  validate(): ValidationResult {
    const errors = [];

    if (!this.doc.version) {
      errors.push({
        path: 'version',
        message: 'Version is required',
        code: 'REQUIRED_FIELD_MISSING'
      });
    }

    return { valid: errors.length === 0, errors };
  }
}
```

***

### getDocument()

> **getDocument**(): [`BaseDocument`](../interfaces/BaseDocument.md)

Defined in: [packages/core/src/base.ts:397](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/core/src/base.ts#L397)

Get a copy of the document as a JavaScript object.

This method returns a shallow copy of the internal document to prevent
external modifications from affecting the internal state.

#### Returns

[`BaseDocument`](../interfaces/BaseDocument.md)

A copy of the document object.

#### Since

2.0.0

#### Example

```typescript
const spec = new MyApiSpec({ version: '1.0.0', title: 'My API' });
const doc = spec.getDocument();
console.log(doc); // { version: '1.0.0', title: 'My API' }

// Modifications to the returned object don't affect the original
doc.version = '2.0.0';
console.log(spec.getDocument().version); // Still '1.0.0'
```

***

### getDocumentAsJson()

> **getDocumentAsJson**(`pretty`): `string`

Defined in: [packages/core/src/base.ts:429](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/core/src/base.ts#L429)

Get the document as a JSON string representation.

This method serializes the internal document to a JSON string, with optional
pretty-printing for human readability.

#### Parameters

##### pretty

`boolean` = `false`

Whether to format the JSON with 2-space indentation for readability.
                Defaults to `false` for compact output.

#### Returns

`string`

JSON string representation of the document.

#### Since

2.0.0

#### Example

```typescript
const spec = new MyApiSpec({ version: '1.0.0', title: 'My API' });

// Compact JSON
const compact = spec.getDocumentAsJson();
// '{"version":"1.0.0","title":"My API"}'

// Pretty-printed JSON
const pretty = spec.getDocumentAsJson(true);
// {
//   "version": "1.0.0",
//   "title": "My API"
// }
```

## Properties

### doc

> `protected` **doc**: [`BaseDocument`](../interfaces/BaseDocument.md)

Defined in: [packages/core/src/base.ts:44](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/core/src/base.ts#L44)

***

### errorOptions

> `protected` **errorOptions**: [`ErrorHandlingOptions`](../interfaces/ErrorHandlingOptions.md)

Defined in: [packages/core/src/base.ts:45](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/core/src/base.ts#L45)
