[**@laag/smithy v1.0.0-alpha.0**](../README.md)

***

[@laag/smithy](../globals.md) / Smithy

# Class: Smithy

Defined in: [smithy/src/smithy.ts:60](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/smithy.ts#L60)

Main class for working with Smithy models

Provides a comprehensive API for parsing, validating, manipulating, and
serializing AWS Smithy models. Extends LaagBase to provide consistent
functionality across the laag library collection.

 Smithy

## Since

1.0.0

## Example

```typescript
import { Smithy } from '@laag/smithy';

// From JSON string
const smithy = new Smithy('{"smithy": "2.0", "shapes": {...}}');

// From object
const smithy = new Smithy({ smithy: "2.0", shapes: {...} });

// Access model properties
console.log(smithy.version);
console.log(smithy.metadata);

// Work with shapes
const shape = smithy.getShape("example.weather#GetWeather");
const services = smithy.getServices();
```

## Extends

- `LaagBase`

## Accessors

### version

#### Get Signature

> **get** **version**(): `string`

Defined in: [smithy/src/smithy.ts:142](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/smithy.ts#L142)

Get the Smithy version

##### Example

```typescript
const smithy = new Smithy(model);
console.log(smithy.version); // "2.0"
```

##### Returns

`string`

The Smithy version string (e.g., "2.0")

***

### metadata

#### Get Signature

> **get** **metadata**(): `Record`\<`string`, `unknown`\> \| `undefined`

Defined in: [smithy/src/smithy.ts:158](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/smithy.ts#L158)

Get the model metadata

##### Example

```typescript
const smithy = new Smithy(model);
console.log(smithy.metadata);
// { authors: ["example@example.com"] }
```

##### Returns

`Record`\<`string`, `unknown`\> \| `undefined`

The metadata object, or undefined if no metadata is present

***

### shapes

#### Get Signature

> **get** **shapes**(): `Map`\<`string`, [`Shape`](../type-aliases/Shape.md)\>

Defined in: [smithy/src/smithy.ts:176](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/smithy.ts#L176)

Get all shapes in the model

##### Example

```typescript
const smithy = new Smithy(model);
const shapes = smithy.shapes;
for (const [shapeId, shape] of shapes) {
  console.log(shapeId, shape.type);
}
```

##### Returns

`Map`\<`string`, [`Shape`](../type-aliases/Shape.md)\>

Map of shape IDs to shapes

## Constructors

### Constructor

> **new Smithy**(`input`): `Smithy`

Defined in: [smithy/src/smithy.ts:92](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/smithy.ts#L92)

Create a new Smithy instance

#### Parameters

##### input

Smithy model as JSON string or object

`string` | [`SmithyModel`](../interfaces/SmithyModel.md)

#### Returns

`Smithy`

#### Throws

If the input cannot be parsed

#### Throws

If the model structure is invalid

#### Example

```typescript
// From JSON string
const smithy = new Smithy(jsonString);

// From object
const smithy = new Smithy({
  smithy: "2.0",
  shapes: {
    "example.weather#Weather": {
      type: "service",
      version: "2006-03-01"
    }
  }
});
```

#### Overrides

`LaagBase.constructor`

## Methods

### dictKeysExists()

> `protected` **dictKeysExists**(`obj`, ...`keys`): `boolean`

Defined in: core/dist/types/base.d.ts:92

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

#### Inherited from

`LaagBase.dictKeysExists`

***

### getExtensions()

> `protected` **getExtensions**(`level?`): `ExtensionObject`

Defined in: core/dist/types/base.d.ts:125

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

`ExtensionObject`

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

#### Inherited from

`LaagBase.getExtensions`

***

### setExtensions()

> `protected` **setExtensions**(`values`, `level?`): `void`

Defined in: core/dist/types/base.d.ts:153

Set extension properties (x-* properties) at a specific level or the root document.

This method validates that all provided keys are valid extension properties (start with 'x-')
and sets them at the specified document level.

#### Parameters

##### values

`ExtensionObject`

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

#### Inherited from

`LaagBase.setExtensions`

***

### getNestedValue()

> `protected` **getNestedValue**(`obj`, `path`): `any`

Defined in: core/dist/types/base.d.ts:181

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

#### Inherited from

`LaagBase.getNestedValue`

***

### setNestedValue()

> `protected` **setNestedValue**(`obj`, `path`, `value`): `void`

Defined in: core/dist/types/base.d.ts:209

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

#### Inherited from

`LaagBase.setNestedValue`

***

### getDocument()

> **getDocument**(): `BaseDocument`

Defined in: core/dist/types/base.d.ts:263

Get a copy of the document as a JavaScript object.

This method returns a shallow copy of the internal document to prevent
external modifications from affecting the internal state.

#### Returns

`BaseDocument`

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

#### Inherited from

`LaagBase.getDocument`

***

### getDocumentAsJson()

> **getDocumentAsJson**(`pretty?`): `string`

Defined in: core/dist/types/base.d.ts:292

Get the document as a JSON string representation.

This method serializes the internal document to a JSON string, with optional
pretty-printing for human readability.

#### Parameters

##### pretty?

`boolean`

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

#### Inherited from

`LaagBase.getDocumentAsJson`

***

### getShape()

> **getShape**(`shapeId`): [`Shape`](../type-aliases/Shape.md) \| `undefined`

Defined in: [smithy/src/smithy.ts:195](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/smithy.ts#L195)

Get a shape by its ID

#### Parameters

##### shapeId

`string`

The shape ID to retrieve

#### Returns

[`Shape`](../type-aliases/Shape.md) \| `undefined`

The shape, or undefined if not found

#### Example

```typescript
const smithy = new Smithy(model);
const shape = smithy.getShape("example.weather#GetWeather");
if (shape) {
  console.log(shape.type); // "operation"
}
```

***

### getShapesByType()

> **getShapesByType**(`type`): [`Shape`](../type-aliases/Shape.md)[]

Defined in: [smithy/src/smithy.ts:212](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/smithy.ts#L212)

Get all shapes of a specific type

#### Parameters

##### type

[`ShapeType`](../type-aliases/ShapeType.md)

The shape type to filter by

#### Returns

[`Shape`](../type-aliases/Shape.md)[]

Array of shapes matching the type

#### Example

```typescript
const smithy = new Smithy(model);
const structures = smithy.getShapesByType("structure");
const services = smithy.getShapesByType("service");
```

***

### addShape()

> **addShape**(`shapeId`, `shape`): `void`

Defined in: [smithy/src/smithy.ts:233](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/smithy.ts#L233)

Add a shape to the model

#### Parameters

##### shapeId

`string`

The shape ID

##### shape

[`Shape`](../type-aliases/Shape.md)

The shape to add

#### Returns

`void`

#### Example

```typescript
const smithy = new Smithy(model);
smithy.addShape("example.weather#Temperature", {
  type: "structure",
  members: {
    value: { target: "smithy.api#Float" }
  }
});
```

***

### removeShape()

> **removeShape**(`shapeId`): `boolean`

Defined in: [smithy/src/smithy.ts:252](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/smithy.ts#L252)

Remove a shape from the model

#### Parameters

##### shapeId

`string`

The shape ID to remove

#### Returns

`boolean`

True if the shape was removed, false if it didn't exist

#### Example

```typescript
const smithy = new Smithy(model);
const removed = smithy.removeShape("example.weather#OldShape");
console.log(removed); // true or false
```

***

### hasShape()

> **hasShape**(`shapeId`): `boolean`

Defined in: [smithy/src/smithy.ts:274](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/smithy.ts#L274)

Check if a shape exists in the model

#### Parameters

##### shapeId

`string`

The shape ID to check

#### Returns

`boolean`

True if the shape exists

#### Example

```typescript
const smithy = new Smithy(model);
if (smithy.hasShape("example.weather#GetWeather")) {
  console.log("Shape exists");
}
```

***

### getServices()

> **getServices**(): `ServiceShape`[]

Defined in: [smithy/src/smithy.ts:292](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/smithy.ts#L292)

Get all services in the model

#### Returns

`ServiceShape`[]

Array of service shapes

#### Example

```typescript
const smithy = new Smithy(model);
const services = smithy.getServices();
for (const service of services) {
  console.log(service.version);
}
```

***

### getService()

> **getService**(`serviceId`): `ServiceShape` \| `undefined`

Defined in: [smithy/src/smithy.ts:311](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/smithy.ts#L311)

Get a specific service by its shape ID

#### Parameters

##### serviceId

`string`

The service shape ID

#### Returns

`ServiceShape` \| `undefined`

The service shape, or undefined if not found

#### Example

```typescript
const smithy = new Smithy(model);
const service = smithy.getService("example.weather#Weather");
if (service) {
  console.log(service.version);
}
```

***

### getOperations()

> **getOperations**(`serviceId`): `OperationShape`[]

Defined in: [smithy/src/smithy.ts:330](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/smithy.ts#L330)

Get all operations for a service

#### Parameters

##### serviceId

`string`

The service shape ID

#### Returns

`OperationShape`[]

Array of operation shapes

#### Example

```typescript
const smithy = new Smithy(model);
const operations = smithy.getOperations("example.weather#Weather");
for (const operation of operations) {
  console.log(operation.type); // "operation"
}
```

***

### getResources()

> **getResources**(`serviceId`): `ResourceShape`[]

Defined in: [smithy/src/smithy.ts:346](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/smithy.ts#L346)

Get all resources for a service

#### Parameters

##### serviceId

`string`

The service shape ID

#### Returns

`ResourceShape`[]

Array of resource shapes

#### Example

```typescript
const smithy = new Smithy(model);
const resources = smithy.getResources("example.weather#Weather");
```

***

### getHttpBinding()

> **getHttpBinding**(`operationId`): [`HttpBinding`](../interfaces/HttpBinding.md) \| `undefined`

Defined in: [smithy/src/smithy.ts:366](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/smithy.ts#L366)

Get HTTP binding information for an operation

#### Parameters

##### operationId

`string`

The operation shape ID

#### Returns

[`HttpBinding`](../interfaces/HttpBinding.md) \| `undefined`

HTTP binding information, or undefined if no HTTP trait is present

#### Example

```typescript
const smithy = new Smithy(model);
const binding = smithy.getHttpBinding("example.weather#GetWeather");
if (binding) {
  console.log(binding.method); // "GET"
  console.log(binding.uri);    // "/weather/{city}"
}
```

***

### getTraits()

> **getTraits**(`shapeId`): `Map`\<`string`, `unknown`\> \| `undefined`

Defined in: [smithy/src/smithy.ts:387](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/smithy.ts#L387)

Get all traits for a shape

#### Parameters

##### shapeId

`string`

The shape ID

#### Returns

`Map`\<`string`, `unknown`\> \| `undefined`

Map of trait IDs to trait values, or undefined if shape has no traits

#### Example

```typescript
const smithy = new Smithy(model);
const traits = smithy.getTraits("example.weather#GetWeather");
if (traits) {
  for (const [traitId, value] of traits) {
    console.log(traitId, value);
  }
}
```

***

### hasTrait()

> **hasTrait**(`shapeId`, `traitId`): `boolean`

Defined in: [smithy/src/smithy.ts:406](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/smithy.ts#L406)

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

#### Example

```typescript
const smithy = new Smithy(model);
if (smithy.hasTrait("example.weather#city", "smithy.api#required")) {
  console.log("City is required");
}
```

***

### addTrait()

> **addTrait**(`shapeId`, `traitId`, `value`): `void`

Defined in: [smithy/src/smithy.ts:428](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/smithy.ts#L428)

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

If trait validation fails

#### Example

```typescript
const smithy = new Smithy(model);
smithy.addTrait("example.weather#GetWeather", "smithy.api#readonly", {});
smithy.addTrait("example.weather#GetWeather", "smithy.api#http", {
  method: "GET",
  uri: "/weather"
});
```

***

### validate()

> **validate**(): `ValidationResult`

Defined in: [smithy/src/smithy.ts:465](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/smithy.ts#L465)

Validate the Smithy model

Performs comprehensive validation including:
- Model structure validation
- Shape validation
- Trait validation
- Reference validation

#### Returns

`ValidationResult`

Validation result with any errors found

#### Example

```typescript
const smithy = new Smithy(model);
const result = smithy.validate();
if (result.valid) {
  console.log("Model is valid");
} else {
  for (const error of result.errors) {
    console.error(error.message);
  }
}
```

#### Overrides

`LaagBase.validate`

***

### toJSON()

> **toJSON**(): [`SmithyModel`](../interfaces/SmithyModel.md)

Defined in: [smithy/src/smithy.ts:518](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/smithy.ts#L518)

Serialize the model to a JSON object

#### Returns

[`SmithyModel`](../interfaces/SmithyModel.md)

The Smithy model as a plain JavaScript object

#### Example

```typescript
const smithy = new Smithy(model);
const json = smithy.toJSON();
console.log(json.smithy); // "2.0"
```

***

### toString()

> **toString**(`pretty`): `string`

Defined in: [smithy/src/smithy.ts:543](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/smithy.ts#L543)

Serialize the model to a JSON string

#### Parameters

##### pretty

`boolean` = `false`

Whether to format the JSON with indentation

#### Returns

`string`

The Smithy model as a JSON string

#### Example

```typescript
const smithy = new Smithy(model);

// Compact JSON
const compact = smithy.toString();

// Pretty-printed JSON
const pretty = smithy.toString(true);
```

***

### select()

> **select**(`selector`): [`SelectorMatch`](../interfaces/SelectorMatch.md)[]

Defined in: [smithy/src/smithy.ts:573](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/smithy.ts#L573)

Select shapes using a Smithy selector

Supports basic selector syntax:
- `*` - Select all shapes
- `structure` - Select all structures
- `[trait|required]` - Select shapes with required trait
- `[id|namespace = example]` - Select shapes in namespace

#### Parameters

##### selector

`string`

The selector string

#### Returns

[`SelectorMatch`](../interfaces/SelectorMatch.md)[]

Array of matching shapes with their IDs

#### Example

```typescript
const smithy = new Smithy(model);

// Select all structures
const structures = smithy.select("structure");

// Select shapes with required trait
const required = smithy.select("[trait|required]");

// Select all shapes
const all = smithy.select("*");
```

***

### generateTypeScript()

> **generateTypeScript**(`options?`): `string`

Defined in: [smithy/src/smithy.ts:595](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/smithy.ts#L595)

Generate TypeScript code from the model

Generates TypeScript interfaces for structures and client classes for services.

#### Parameters

##### options?

[`GeneratorOptions`](../interfaces/GeneratorOptions.md)

Generator options

#### Returns

`string`

Generated TypeScript code

#### Example

```typescript
const smithy = new Smithy(model);
const code = smithy.generateTypeScript({
  includeComments: true,
  indent: 2
});
console.log(code);
```

***

### generateJavaScript()

> **generateJavaScript**(`options?`): `string`

Defined in: [smithy/src/smithy.ts:619](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/smithy.ts#L619)

Generate JavaScript code from the model

Generates JavaScript classes for structures and client classes for services.

#### Parameters

##### options?

[`GeneratorOptions`](../interfaces/GeneratorOptions.md)

Generator options

#### Returns

`string`

Generated JavaScript code

#### Example

```typescript
const smithy = new Smithy(model);
const code = smithy.generateJavaScript({
  includeComments: true,
  outputFormat: 'class',
  indent: 2
});
console.log(code);
```

***

### generatePython()

> **generatePython**(`options?`): `string`

Defined in: [smithy/src/smithy.ts:642](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/smithy.ts#L642)

Generate Python code from the model

Generates Python dataclasses for structures and client classes for services.

#### Parameters

##### options?

[`GeneratorOptions`](../interfaces/GeneratorOptions.md)

Generator options

#### Returns

`string`

Generated Python code

#### Example

```typescript
const smithy = new Smithy(model);
const code = smithy.generatePython({
  includeComments: true,
  indent: 4
});
console.log(code);
```

## Properties

### doc

> `protected` **doc**: `BaseDocument`

Defined in: core/dist/types/base.d.ts:41

#### Inherited from

`LaagBase.doc`

***

### errorOptions

> `protected` **errorOptions**: `ErrorHandlingOptions`

Defined in: core/dist/types/base.d.ts:42

#### Inherited from

`LaagBase.errorOptions`
