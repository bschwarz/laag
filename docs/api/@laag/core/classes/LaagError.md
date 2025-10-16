[**Laag Library Collection**](../../../README.md)

***

[Laag Library Collection](../../../modules.md) / [@laag/core](../README.md) / LaagError

# Class: LaagError

Defined in: [packages/core/src/errors.ts:37](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/core/src/errors.ts#L37)

Base error class for all laag library errors.

This class extends the native JavaScript Error class with additional properties
for error codes, path information, and contextual data. It provides the foundation
for all error types in the laag library collection.

 LaagError

## Since

2.0.0

## Example

```typescript
import { LaagError } from '@laag/core';

throw new LaagError(
  'Something went wrong',
  'CUSTOM_ERROR',
  'path.to.property',
  { additionalInfo: 'context data' }
);
```

## Extends

- `Error`

## Extended by

- [`NotFoundError`](NotFoundError.md)
- [`ParseError`](ParseError.md)
- [`ValidationError`](ValidationError.md)

## Constructors

### Constructor

> **new LaagError**(`message`, `code`, `path?`, `context?`): `LaagError`

Defined in: [packages/core/src/errors.ts:60](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/core/src/errors.ts#L60)

Creates a new LaagError instance.

#### Parameters

##### message

`string`

Human-readable error message describing what went wrong.

##### code

`string`

Machine-readable error code for programmatic error handling.

##### path?

`string`

Optional path to the location in the document where the error occurred.

##### context?

`Record`\<`string`, `unknown`\>

Optional additional context information about the error.

#### Returns

`LaagError`

#### Example

```typescript
const error = new LaagError(
  'Invalid property value',
  'INVALID_VALUE',
  'info.version',
  { expectedType: 'string', actualType: 'number' }
);
```

#### Overrides

`Error.constructor`

## Methods

### getFormattedMessage()

> **getFormattedMessage**(`options`): `string`

Defined in: [packages/core/src/errors.ts:96](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/core/src/errors.ts#L96)

Get a formatted error message with optional context information.

This method formats the error message based on the provided options,
optionally including path information and context data for debugging.

#### Parameters

##### options

[`ErrorHandlingOptions`](../interfaces/ErrorHandlingOptions.md) = `{}`

Configuration options for error message formatting.

#### Returns

`string`

Formatted error message string.

#### Since

2.0.0

#### Example

```typescript
const error = new LaagError('Invalid value', 'INVALID', 'info.title', { value: 123 });

// Basic message
error.getFormattedMessage(); // 'Invalid value (at path: info.title)'

// With context in development
error.getFormattedMessage({ development: true, includeContext: true });
// 'Invalid value (at path: info.title)\nContext: { "value": 123 }'
```

***

### toJSON()

> **toJSON**(): `Record`\<`string`, `unknown`\>

Defined in: [packages/core/src/errors.ts:134](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/core/src/errors.ts#L134)

Convert the error to a JSON-serializable representation.

This method creates a plain object representation of the error that can be
safely serialized to JSON, useful for logging or API responses.

#### Returns

`Record`\<`string`, `unknown`\>

Plain object representation of the error.

#### Since

2.0.0

#### Example

```typescript
const error = new LaagError('Test error', 'TEST_ERROR', 'test.path');
const json = error.toJSON();
console.log(JSON.stringify(json, null, 2));
// {
//   "name": "LaagError",
//   "message": "Test error",
//   "code": "TEST_ERROR",
//   "path": "test.path",
//   "context": undefined
// }
```

***

### isError()

> `static` **isError**(`value`): `value is Error`

Defined in: node\_modules/.bun/bun-types@1.3.0/node\_modules/bun-types/globals.d.ts:1038

Check if a value is an instance of Error

#### Parameters

##### value

`unknown`

The value to check

#### Returns

`value is Error`

True if the value is an instance of Error, false otherwise

#### Inherited from

`Error.isError`

***

### captureStackTrace()

#### Call Signature

> `static` **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Defined in: node\_modules/.bun/bun-types@1.3.0/node\_modules/bun-types/globals.d.ts:1043

Create .stack property on a target object

##### Parameters

###### targetObject

`object`

###### constructorOpt?

`Function`

##### Returns

`void`

##### Inherited from

`Error.captureStackTrace`

#### Call Signature

> `static` **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Defined in: node\_modules/.bun/@types+node@22.10.1/node\_modules/@types/node/globals.d.ts:136

Create .stack property on a target object

##### Parameters

###### targetObject

`object`

###### constructorOpt?

`Function`

##### Returns

`void`

##### Inherited from

`Error.captureStackTrace`

## Properties

### code

> `readonly` **code**: `string`

Defined in: [packages/core/src/errors.ts:38](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/core/src/errors.ts#L38)

***

### path?

> `readonly` `optional` **path**: `string`

Defined in: [packages/core/src/errors.ts:39](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/core/src/errors.ts#L39)

***

### context?

> `readonly` `optional` **context**: `Record`\<`string`, `unknown`\>

Defined in: [packages/core/src/errors.ts:40](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/core/src/errors.ts#L40)

***

### prepareStackTrace()?

> `static` `optional` **prepareStackTrace**: (`err`, `stackTraces`) => `any`

Defined in: node\_modules/.bun/@types+node@22.10.1/node\_modules/@types/node/globals.d.ts:143

Optional override for formatting stack traces

#### Parameters

##### err

`Error`

##### stackTraces

`CallSite`[]

#### Returns

`any`

#### See

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Inherited from

`Error.prepareStackTrace`

***

### stackTraceLimit

> `static` **stackTraceLimit**: `number`

Defined in: node\_modules/.bun/bun-types@1.3.0/node\_modules/bun-types/globals.d.ts:1048

The maximum number of stack frames to capture.

#### Inherited from

`Error.stackTraceLimit`

***

### cause?

> `optional` **cause**: `unknown`

Defined in: node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.es2022.error.d.ts:26

The cause of the error.

#### Inherited from

`Error.cause`

***

### name

> **name**: `string`

Defined in: node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.es5.d.ts:1076

#### Inherited from

`Error.name`

***

### message

> **message**: `string`

Defined in: node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.es5.d.ts:1077

#### Inherited from

`Error.message`

***

### stack?

> `optional` **stack**: `string`

Defined in: node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.es5.d.ts:1078

#### Inherited from

`Error.stack`
