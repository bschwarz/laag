[**Laag Library Collection**](../../../README.md)

***

[Laag Library Collection](../../../modules.md) / [openapi/src](../README.md) / Openapi

# Class: Openapi

Defined in: [packages/openapi/src/openapi.ts:75](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L75)

Main class for working with OpenAPI/Swagger documents.

The Openapi class provides a comprehensive interface for creating, reading, and
manipulating OpenAPI 3.0 specification documents. It extends the LaagBase class
to provide common functionality while adding OpenAPI-specific methods and validation.

Key features:
- Full TypeScript support with comprehensive type definitions
- Document validation according to OpenAPI 3.0 specification
- Utility methods for common operations (paths, operations, components)
- Extension property support (x-* properties)
- Backward compatibility with existing APIs

 Openapi

## Since

2.0.0

## Example

```typescript
import { Openapi } from '@laag/openapi';

// Create from object
const api = new Openapi({
  openapi: '3.0.2',
  info: { title: 'My API', version: '1.0.0' },
  paths: {}
});

// Create from JSON string
const api2 = new Openapi('{"openapi":"3.0.2","info":{"title":"My API","version":"1.0.0"},"paths":{}}');

// Add a path
api.appendPath('/users', {
  get: {
    summary: 'Get users',
    responses: { '200': { description: 'Success' } }
  }
});
```

## Extends

- [`LaagBase`](../../../@laag/core/classes/LaagBase.md)

## Accessors

### httpMethods

#### Get Signature

> **get** **httpMethods**(): [`HttpMethod`](../type-aliases/HttpMethod.md)[]

Defined in: [packages/openapi/src/openapi.ts:231](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L231)

##### Returns

[`HttpMethod`](../type-aliases/HttpMethod.md)[]

#### Set Signature

> **set** **httpMethods**(`methods`): `void`

Defined in: [packages/openapi/src/openapi.ts:235](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L235)

##### Parameters

###### methods

[`HttpMethod`](../type-aliases/HttpMethod.md)[]

##### Returns

`void`

***

### docVersion

#### Get Signature

> **get** **docVersion**(): `string`

Defined in: [packages/openapi/src/openapi.ts:240](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L240)

##### Returns

`string`

#### Set Signature

> **set** **docVersion**(`value`): `void`

Defined in: [packages/openapi/src/openapi.ts:244](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L244)

##### Parameters

###### value

`string`

##### Returns

`void`

***

### info

#### Get Signature

> **get** **info**(): [`InfoObject`](../interfaces/InfoObject.md)

Defined in: [packages/openapi/src/openapi.ts:263](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L263)

##### Returns

[`InfoObject`](../interfaces/InfoObject.md)

#### Set Signature

> **set** **info**(`value`): `void`

Defined in: [packages/openapi/src/openapi.ts:267](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L267)

##### Parameters

###### value

[`InfoObject`](../interfaces/InfoObject.md)

##### Returns

`void`

***

### title

#### Get Signature

> **get** **title**(): `string` \| `null`

Defined in: [packages/openapi/src/openapi.ts:281](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L281)

##### Returns

`string` \| `null`

#### Set Signature

> **set** **title**(`value`): `void`

Defined in: [packages/openapi/src/openapi.ts:285](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L285)

##### Parameters

###### value

`string`

##### Returns

`void`

***

### description

#### Get Signature

> **get** **description**(): `string` \| `null`

Defined in: [packages/openapi/src/openapi.ts:290](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L290)

##### Returns

`string` \| `null`

#### Set Signature

> **set** **description**(`value`): `void`

Defined in: [packages/openapi/src/openapi.ts:296](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L296)

##### Parameters

###### value

`string`

##### Returns

`void`

***

### version

#### Get Signature

> **get** **version**(): `string` \| `null`

Defined in: [packages/openapi/src/openapi.ts:301](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L301)

##### Returns

`string` \| `null`

#### Set Signature

> **set** **version**(`value`): `void`

Defined in: [packages/openapi/src/openapi.ts:307](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L307)

##### Parameters

###### value

`string`

##### Returns

`void`

***

### termsOfService

#### Get Signature

> **get** **termsOfService**(): `string` \| `null`

Defined in: [packages/openapi/src/openapi.ts:312](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L312)

##### Returns

`string` \| `null`

#### Set Signature

> **set** **termsOfService**(`value`): `void`

Defined in: [packages/openapi/src/openapi.ts:318](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L318)

##### Parameters

###### value

`string`

##### Returns

`void`

***

### contact

#### Get Signature

> **get** **contact**(): [`ContactObject`](../interfaces/ContactObject.md)

Defined in: [packages/openapi/src/openapi.ts:323](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L323)

##### Returns

[`ContactObject`](../interfaces/ContactObject.md)

#### Set Signature

> **set** **contact**(`value`): `void`

Defined in: [packages/openapi/src/openapi.ts:329](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L329)

##### Parameters

###### value

[`ContactObject`](../interfaces/ContactObject.md)

##### Returns

`void`

***

### license

#### Get Signature

> **get** **license**(): [`LicenseObject`](../interfaces/LicenseObject.md)

Defined in: [packages/openapi/src/openapi.ts:343](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L343)

##### Returns

[`LicenseObject`](../interfaces/LicenseObject.md)

#### Set Signature

> **set** **license**(`value`): `void`

Defined in: [packages/openapi/src/openapi.ts:349](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L349)

##### Parameters

###### value

[`LicenseObject`](../interfaces/LicenseObject.md)

##### Returns

`void`

***

### servers

#### Get Signature

> **get** **servers**(): [`ServerObject`](../interfaces/ServerObject.md)[]

Defined in: [packages/openapi/src/openapi.ts:364](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L364)

##### Returns

[`ServerObject`](../interfaces/ServerObject.md)[]

#### Set Signature

> **set** **servers**(`value`): `void`

Defined in: [packages/openapi/src/openapi.ts:368](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L368)

##### Parameters

###### value

[`ServerObject`](../interfaces/ServerObject.md)[]

##### Returns

`void`

***

### baseUri

#### Get Signature

> **get** **baseUri**(): `string`

Defined in: [packages/openapi/src/openapi.ts:392](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L392)

##### Returns

`string`

#### Set Signature

> **set** **baseUri**(`value`): `void`

Defined in: [packages/openapi/src/openapi.ts:396](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L396)

##### Parameters

###### value

`string`

##### Returns

`void`

***

### protocols

#### Get Signature

> **get** **protocols**(): `string`[]

Defined in: [packages/openapi/src/openapi.ts:400](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L400)

##### Returns

`string`[]

#### Set Signature

> **set** **protocols**(`value`): `void`

Defined in: [packages/openapi/src/openapi.ts:404](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L404)

##### Parameters

###### value

`string`[]

##### Returns

`void`

***

### paths

#### Get Signature

> **get** **paths**(): [`PathsObject`](../type-aliases/PathsObject.md)

Defined in: [packages/openapi/src/openapi.ts:413](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L413)

##### Returns

[`PathsObject`](../type-aliases/PathsObject.md)

#### Set Signature

> **set** **paths**(`value`): `void`

Defined in: [packages/openapi/src/openapi.ts:417](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L417)

##### Parameters

###### value

[`PathsObject`](../type-aliases/PathsObject.md)

##### Returns

`void`

***

### components

#### Get Signature

> **get** **components**(): [`ComponentsObject`](../interfaces/ComponentsObject.md)

Defined in: [packages/openapi/src/openapi.ts:441](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L441)

##### Returns

[`ComponentsObject`](../interfaces/ComponentsObject.md)

#### Set Signature

> **set** **components**(`value`): `void`

Defined in: [packages/openapi/src/openapi.ts:447](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L447)

##### Parameters

###### value

[`ComponentsObject`](../interfaces/ComponentsObject.md)

##### Returns

`void`

***

### componentsSchemas

#### Get Signature

> **get** **componentsSchemas**(): `Record`\<`string`, [`SchemaObject`](../interfaces/SchemaObject.md) \| [`ReferenceObject`](../interfaces/ReferenceObject.md)\>

Defined in: [packages/openapi/src/openapi.ts:451](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L451)

##### Returns

`Record`\<`string`, [`SchemaObject`](../interfaces/SchemaObject.md) \| [`ReferenceObject`](../interfaces/ReferenceObject.md)\>

***

### security

#### Get Signature

> **get** **security**(): [`SecurityRequirementObject`](../interfaces/SecurityRequirementObject.md)[]

Defined in: [packages/openapi/src/openapi.ts:458](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L458)

##### Returns

[`SecurityRequirementObject`](../interfaces/SecurityRequirementObject.md)[]

#### Set Signature

> **set** **security**(`value`): `void`

Defined in: [packages/openapi/src/openapi.ts:464](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L464)

##### Parameters

###### value

[`SecurityRequirementObject`](../interfaces/SecurityRequirementObject.md)[]

##### Returns

`void`

***

### tags

#### Get Signature

> **get** **tags**(): [`TagObject`](../interfaces/TagObject.md)[]

Defined in: [packages/openapi/src/openapi.ts:469](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L469)

##### Returns

[`TagObject`](../interfaces/TagObject.md)[]

#### Set Signature

> **set** **tags**(`value`): `void`

Defined in: [packages/openapi/src/openapi.ts:473](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L473)

##### Parameters

###### value

[`TagObject`](../interfaces/TagObject.md)[]

##### Returns

`void`

***

### externalDocs

#### Get Signature

> **get** **externalDocs**(): [`ExternalDocumentationObject`](../interfaces/ExternalDocumentationObject.md)

Defined in: [packages/openapi/src/openapi.ts:487](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L487)

##### Returns

[`ExternalDocumentationObject`](../interfaces/ExternalDocumentationObject.md)

#### Set Signature

> **set** **externalDocs**(`value`): `void`

Defined in: [packages/openapi/src/openapi.ts:493](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L493)

##### Parameters

###### value

[`ExternalDocumentationObject`](../interfaces/ExternalDocumentationObject.md)

##### Returns

`void`

***

### rootExtensions

#### Get Signature

> **get** **rootExtensions**(): `Record`\<`string`, `unknown`\>

Defined in: [packages/openapi/src/openapi.ts:743](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L743)

##### Returns

`Record`\<`string`, `unknown`\>

#### Set Signature

> **set** **rootExtensions**(`values`): `void`

Defined in: [packages/openapi/src/openapi.ts:747](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L747)

##### Parameters

###### values

`Record`\<`string`, `unknown`\>

##### Returns

`void`

***

### infoExtensions

#### Get Signature

> **get** **infoExtensions**(): `Record`\<`string`, `unknown`\>

Defined in: [packages/openapi/src/openapi.ts:758](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L758)

##### Returns

`Record`\<`string`, `unknown`\>

#### Set Signature

> **set** **infoExtensions**(`values`): `void`

Defined in: [packages/openapi/src/openapi.ts:762](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L762)

##### Parameters

###### values

`Record`\<`string`, `unknown`\>

##### Returns

`void`

***

### pathsExtensions

#### Get Signature

> **get** **pathsExtensions**(): `Record`\<`string`, `unknown`\>

Defined in: [packages/openapi/src/openapi.ts:773](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L773)

##### Returns

`Record`\<`string`, `unknown`\>

#### Set Signature

> **set** **pathsExtensions**(`values`): `void`

Defined in: [packages/openapi/src/openapi.ts:777](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L777)

##### Parameters

###### values

`Record`\<`string`, `unknown`\>

##### Returns

`void`

## Constructors

### Constructor

> **new Openapi**(`doc?`): `Openapi`

Defined in: [packages/openapi/src/openapi.ts:149](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L149)

Creates a new OpenAPI document instance.

If no document is provided, a minimal valid OpenAPI document structure is created
with default values. If a document is provided but missing required fields,
they will be initialized with default values.

#### Parameters

##### doc?

The OpenAPI document as a JSON string or object. If not provided,
             a minimal valid document structure is created.

`string` | [`OpenAPIDocument`](../interfaces/OpenAPIDocument.md)

#### Returns

`Openapi`

#### Throws

When the provided string cannot be parsed as valid JSON.

#### Example

```typescript
// Create empty document with defaults
const api = new Openapi();

// Create from existing document
const api2 = new Openapi({
  openapi: '3.0.2',
  info: { title: 'My API', version: '1.0.0' },
  paths: {
    '/users': {
      get: { responses: { '200': { description: 'Success' } } }
    }
  }
});

// Create from JSON string
const jsonDoc = '{"openapi":"3.0.2","info":{"title":"API","version":"1.0.0"},"paths":{}}';
const api3 = new Openapi(jsonDoc);
```

#### Overrides

[`LaagBase`](../../../@laag/core/classes/LaagBase.md).[`constructor`](../../../@laag/core/classes/LaagBase.md#constructor)

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

#### Inherited from

[`LaagBase`](../../../@laag/core/classes/LaagBase.md).[`dictKeysExists`](../../../@laag/core/classes/LaagBase.md#dictkeysexists)

***

### getExtensions()

> `protected` **getExtensions**(`level?`): [`ExtensionObject`](../../../@laag/core/interfaces/ExtensionObject.md)

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

[`ExtensionObject`](../../../@laag/core/interfaces/ExtensionObject.md)

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

[`LaagBase`](../../../@laag/core/classes/LaagBase.md).[`getExtensions`](../../../@laag/core/classes/LaagBase.md#getextensions)

***

### setExtensions()

> `protected` **setExtensions**(`values`, `level?`): `void`

Defined in: [packages/core/src/base.ts:225](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/core/src/base.ts#L225)

Set extension properties (x-* properties) at a specific level or the root document.

This method validates that all provided keys are valid extension properties (start with 'x-')
and sets them at the specified document level.

#### Parameters

##### values

[`ExtensionObject`](../../../@laag/core/interfaces/ExtensionObject.md)

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

[`LaagBase`](../../../@laag/core/classes/LaagBase.md).[`setExtensions`](../../../@laag/core/classes/LaagBase.md#setextensions)

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

#### Inherited from

[`LaagBase`](../../../@laag/core/classes/LaagBase.md).[`getNestedValue`](../../../@laag/core/classes/LaagBase.md#getnestedvalue)

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

#### Inherited from

[`LaagBase`](../../../@laag/core/classes/LaagBase.md).[`setNestedValue`](../../../@laag/core/classes/LaagBase.md#setnestedvalue)

***

### getDocument()

> **getDocument**(): [`BaseDocument`](../../../@laag/core/interfaces/BaseDocument.md)

Defined in: [packages/core/src/base.ts:397](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/core/src/base.ts#L397)

Get a copy of the document as a JavaScript object.

This method returns a shallow copy of the internal document to prevent
external modifications from affecting the internal state.

#### Returns

[`BaseDocument`](../../../@laag/core/interfaces/BaseDocument.md)

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

[`LaagBase`](../../../@laag/core/classes/LaagBase.md).[`getDocument`](../../../@laag/core/classes/LaagBase.md#getdocument)

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

#### Inherited from

[`LaagBase`](../../../@laag/core/classes/LaagBase.md).[`getDocumentAsJson`](../../../@laag/core/classes/LaagBase.md#getdocumentasjson)

***

### validate()

> **validate**(): [`ValidationResult`](../../../@laag/core/interfaces/ValidationResult.md)

Defined in: [packages/openapi/src/openapi.ts:181](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L181)

Validate the OpenAPI document structure according to the OpenAPI 3.0 specification.

This method checks for required fields and basic structural validity. It validates:
- Required root-level fields (openapi, info, paths)
- Required info object fields (title, version)
- Basic structure compliance

#### Returns

[`ValidationResult`](../../../@laag/core/interfaces/ValidationResult.md)

A validation result object containing the validation status and any errors found.

#### Since

2.0.0

#### Example

```typescript
const api = new Openapi({ openapi: '3.0.2', paths: {} }); // Missing info
const result = api.validate();

console.log(result.valid); // false
console.log(result.errors);
// [{ path: 'info', message: 'Info object is required', code: 'REQUIRED_FIELD_MISSING' }]
```

#### Overrides

[`LaagBase`](../../../@laag/core/classes/LaagBase.md).[`validate`](../../../@laag/core/classes/LaagBase.md#validate)

***

### getDefinition()

> **getDefinition**(`format`): `string` \| [`OpenAPIDocument`](../interfaces/OpenAPIDocument.md)

Defined in: [packages/openapi/src/openapi.ts:249](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L249)

#### Parameters

##### format

`"js"` | `"json"` | `"prettyjson"`

#### Returns

`string` \| [`OpenAPIDocument`](../interfaces/OpenAPIDocument.md)

***

### appendServer()

> **appendServer**(`value`): `void`

Defined in: [packages/openapi/src/openapi.ts:386](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L386)

#### Parameters

##### value

[`ServerObject`](../interfaces/ServerObject.md)

#### Returns

`void`

***

### appendProtocol()

> **appendProtocol**(`value`): `void`

Defined in: [packages/openapi/src/openapi.ts:408](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L408)

#### Parameters

##### value

`string`

#### Returns

`void`

***

### appendPath()

> **appendPath**(`path`, `value`): `void`

Defined in: [packages/openapi/src/openapi.ts:421](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L421)

#### Parameters

##### path

`string`

##### value

[`PathItemObject`](../interfaces/PathItemObject.md)

#### Returns

`void`

***

### getPathNames()

> **getPathNames**(): `string`[]

Defined in: [packages/openapi/src/openapi.ts:427](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L427)

#### Returns

`string`[]

***

### getPath()

> **getPath**(`path`): [`PathItemObject`](../interfaces/PathItemObject.md)

Defined in: [packages/openapi/src/openapi.ts:434](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L434)

#### Parameters

##### path

`string`

#### Returns

[`PathItemObject`](../interfaces/PathItemObject.md)

***

### operationExists()

> **operationExists**(`path`, `verb`): `boolean`

Defined in: [packages/openapi/src/openapi.ts:507](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L507)

#### Parameters

##### path

`string`

##### verb

`string`

#### Returns

`boolean`

***

### pathExists()

> **pathExists**(`path`): `boolean`

Defined in: [packages/openapi/src/openapi.ts:513](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L513)

#### Parameters

##### path

`string`

#### Returns

`boolean`

***

### getAllHttpMethods()

> **getAllHttpMethods**(): [`HttpMethod`](../type-aliases/HttpMethod.md)[]

Defined in: [packages/openapi/src/openapi.ts:517](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L517)

#### Returns

[`HttpMethod`](../type-aliases/HttpMethod.md)[]

***

### getStatusCodes()

> **getStatusCodes**(`path`, `verb`): `object`[]

Defined in: [packages/openapi/src/openapi.ts:533](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L533)

#### Parameters

##### path

`string`

##### verb

`string`

#### Returns

`object`[]

***

### getAllStatusCodes()

> **getAllStatusCodes**(): `string`[]

Defined in: [packages/openapi/src/openapi.ts:563](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L563)

#### Returns

`string`[]

***

### getOperationId()

> **getOperationId**(`path`, `verb`): `string`

Defined in: [packages/openapi/src/openapi.ts:580](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L580)

#### Parameters

##### path

`string`

##### verb

`string`

#### Returns

`string`

***

### setOperationId()

> **setOperationId**(`path`, `verb`, `value`): `string`

Defined in: [packages/openapi/src/openapi.ts:598](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L598)

#### Parameters

##### path

`string`

##### verb

`string`

##### value

`string`

#### Returns

`string`

***

### getDisplayName()

> **getDisplayName**(`path`, `verb`): `string`

Defined in: [packages/openapi/src/openapi.ts:612](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L612)

#### Parameters

##### path

`string`

##### verb

`string`

#### Returns

`string`

***

### setDisplayName()

> **setDisplayName**(`path`, `verb`, `value`): `string`

Defined in: [packages/openapi/src/openapi.ts:616](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L616)

#### Parameters

##### path

`string`

##### verb

`string`

##### value

`string`

#### Returns

`string`

***

### getOperationIds()

> **getOperationIds**(): `object`[]

Defined in: [packages/openapi/src/openapi.ts:620](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L620)

#### Returns

`object`[]

***

### getOperationRequestMedia()

> **getOperationRequestMedia**(`path`, `verb`): `string`[]

Defined in: [packages/openapi/src/openapi.ts:639](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L639)

#### Parameters

##### path

`string`

##### verb

`string`

#### Returns

`string`[]

***

### getOperationResponseMedia()

> **getOperationResponseMedia**(`path`, `verb`, `code?`): `string`[]

Defined in: [packages/openapi/src/openapi.ts:656](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L656)

#### Parameters

##### path

`string`

##### verb

`string`

##### code?

`string`

#### Returns

`string`[]

***

### getOperationResponse()

> **getOperationResponse**(`path`, `verb`, `statusCode`): [`ResponseObject`](../interfaces/ResponseObject.md)

Defined in: [packages/openapi/src/openapi.ts:668](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L668)

#### Parameters

##### path

`string`

##### verb

`string`

##### statusCode

`string`

#### Returns

[`ResponseObject`](../interfaces/ResponseObject.md)

***

### getOperationRequest()

> **getOperationRequest**(`path`, `verb`): [`RequestBodyObject`](../interfaces/RequestBodyObject.md)

Defined in: [packages/openapi/src/openapi.ts:677](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L677)

#### Parameters

##### path

`string`

##### verb

`string`

#### Returns

[`RequestBodyObject`](../interfaces/RequestBodyObject.md)

***

### getOperationDescription()

> **getOperationDescription**(`path`, `verb`): `string`

Defined in: [packages/openapi/src/openapi.ts:686](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L686)

#### Parameters

##### path

`string`

##### verb

`string`

#### Returns

`string`

***

### getOperationData()

> **getOperationData**(`path`, `verb`): [`OperationObject`](../interfaces/OperationObject.md)

Defined in: [packages/openapi/src/openapi.ts:693](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L693)

#### Parameters

##### path

`string`

##### verb

`string`

#### Returns

[`OperationObject`](../interfaces/OperationObject.md)

***

### isOperationDeprecated()

> **isOperationDeprecated**(`path`, `verb`): `boolean`

Defined in: [packages/openapi/src/openapi.ts:700](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L700)

#### Parameters

##### path

`string`

##### verb

`string`

#### Returns

`boolean`

***

### getSuccessCode()

> **getSuccessCode**(`path`, `verb`): `string`

Defined in: [packages/openapi/src/openapi.ts:707](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L707)

#### Parameters

##### path

`string`

##### verb

`string`

#### Returns

`string`

***

### getBasePath()

> **getBasePath**(): `string` \| `null`

Defined in: [packages/openapi/src/openapi.ts:720](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L720)

#### Returns

`string` \| `null`

***

### getComponentFromPath()

> **getComponentFromPath**(`refPath`): `unknown`

Defined in: [packages/openapi/src/openapi.ts:725](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L725)

#### Parameters

##### refPath

`string`

#### Returns

`unknown`

***

### appendRootExtension()

> **appendRootExtension**(`name`, `value`): `void`

Defined in: [packages/openapi/src/openapi.ts:751](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L751)

#### Parameters

##### name

`string`

##### value

`unknown`

#### Returns

`void`

***

### appendInfoExtension()

> **appendInfoExtension**(`name`, `value`): `void`

Defined in: [packages/openapi/src/openapi.ts:766](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L766)

#### Parameters

##### name

`string`

##### value

`unknown`

#### Returns

`void`

***

### appendPathsExtension()

> **appendPathsExtension**(`name`, `value`): `void`

Defined in: [packages/openapi/src/openapi.ts:781](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L781)

#### Parameters

##### name

`string`

##### value

`unknown`

#### Returns

`void`

***

### generateJsonSample()

> **generateJsonSample**(`path`, `verb`, `type`): `unknown`

Defined in: [packages/openapi/src/openapi.ts:804](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L804)

Generates sample JSON payload from either request or response schema

#### Parameters

##### path

`string`

The resource path for the operation

##### verb

`string`

The HTTP verb for the operation

##### type

Either 'request' or 'response'

`"response"` | `"request"`

#### Returns

`unknown`

Sample JSON object or null if no schema found

#### Example

```typescript
const api = new Openapi(document);
const requestSample = api.generateJsonSample('/users', 'post', 'request');
const responseSample = api.generateJsonSample('/users', 'post', 'response');
```

***

### getCurlCommands()

> **getCurlCommands**(`path`, `verb`): `object`[]

Defined in: [packages/openapi/src/openapi.ts:951](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L951)

Generates curl command examples for an operation

#### Parameters

##### path

`string`

The resource path for the operation

##### verb

`string`

The HTTP verb for the operation

#### Returns

`object`[]

Array of curl command objects with command and description

#### Example

```typescript
const api = new Openapi(document);
const curlCommands = api.getCurlCommands('/users', 'post');
console.log(curlCommands[0].command);
```

***

### getPythonCode()

> **getPythonCode**(`path`, `verb`): `string`

Defined in: [packages/openapi/src/openapi.ts:988](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L988)

Generates Python code sample for an operation

#### Parameters

##### path

`string`

The resource path for the operation

##### verb

`string`

The HTTP verb for the operation

#### Returns

`string`

Python code as a string

#### Example

```typescript
const api = new Openapi(document);
const pythonCode = api.getPythonCode('/users', 'post');
console.log(pythonCode);
```

***

### getJavaScriptCode()

> **getJavaScriptCode**(`path`, `verb`, `useAsync`): `string`

Defined in: [packages/openapi/src/openapi.ts:1050](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L1050)

Generates JavaScript code sample for an operation

#### Parameters

##### path

`string`

The resource path for the operation

##### verb

`string`

The HTTP verb for the operation

##### useAsync

`boolean` = `true`

Whether to use async/await or promises

#### Returns

`string`

JavaScript code as a string

#### Example

```typescript
const api = new Openapi(document);
const jsCode = api.getJavaScriptCode('/users', 'post', true);
console.log(jsCode);
```

***

### getTypeScriptCode()

> **getTypeScriptCode**(`path`, `verb`): `string`

Defined in: [packages/openapi/src/openapi.ts:1143](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/openapi.ts#L1143)

Generates TypeScript code sample for an operation

#### Parameters

##### path

`string`

The resource path for the operation

##### verb

`string`

The HTTP verb for the operation

#### Returns

`string`

TypeScript code as a string

#### Example

```typescript
const api = new Openapi(document);
const tsCode = api.getTypeScriptCode('/users', 'post');
console.log(tsCode);
```

## Properties

### doc

> `protected` **doc**: [`BaseDocument`](../../../@laag/core/interfaces/BaseDocument.md)

Defined in: [packages/core/src/base.ts:44](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/core/src/base.ts#L44)

#### Inherited from

[`LaagBase`](../../../@laag/core/classes/LaagBase.md).[`doc`](../../../@laag/core/classes/LaagBase.md#doc)

***

### errorOptions

> `protected` **errorOptions**: [`ErrorHandlingOptions`](../../../@laag/core/interfaces/ErrorHandlingOptions.md)

Defined in: [packages/core/src/base.ts:45](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/core/src/base.ts#L45)

#### Inherited from

[`LaagBase`](../../../@laag/core/classes/LaagBase.md).[`errorOptions`](../../../@laag/core/classes/LaagBase.md#erroroptions)
