[**Laag Library Collection**](../../../README.md)

***

[Laag Library Collection](../../../modules.md) / [@laag/core](../README.md) / NotFoundError

# Class: NotFoundError

Defined in: [packages/core/src/errors.ts:262](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/core/src/errors.ts#L262)

Error thrown when a required property, method, or resource is not found.

This error is used when the library cannot locate expected elements in
the document structure, such as missing components, paths, or operations.

 NotFoundError

## Since

2.0.0

## Example

```typescript
import { NotFoundError } from '@laag/core';

throw new NotFoundError(
  'Component schema not found',
  'components.schemas.User',
  { requestedSchema: 'User', availableSchemas: ['Pet', 'Order'] }
);
```

## Extends

- [`LaagError`](LaagError.md)

## Constructors

### Constructor

> **new NotFoundError**(`message`, `path?`, `context?`): `NotFoundError`

Defined in: [packages/core/src/errors.ts:283](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/core/src/errors.ts#L283)

Creates a new NotFoundError instance.

#### Parameters

##### message

`string`

Human-readable description of what was not found.

##### path?

`string`

Optional path to the location where the item was expected.

##### context?

`Record`\<`string`, `unknown`\>

Optional additional context about what was being searched for.

#### Returns

`NotFoundError`

#### Example

```typescript
const error = new NotFoundError(
  'Operation not found',
  'paths./users.get',
  {
    requestedPath: '/users',
    requestedMethod: 'get',
    availableMethods: ['post', 'put']
  }
);
```

#### Overrides

[`LaagError`](LaagError.md).[`constructor`](LaagError.md#constructor)

## Methods

### getFormattedMessage()

> **getFormattedMessage**(`options`): `string`

Defined in: [packages/core/src/errors.ts:96](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/core/src/errors.ts#L96)

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

#### Inherited from

[`LaagError`](LaagError.md).[`getFormattedMessage`](LaagError.md#getformattedmessage)

***

### toJSON()

> **toJSON**(): `Record`\<`string`, `unknown`\>

Defined in: [packages/core/src/errors.ts:134](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/core/src/errors.ts#L134)

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

#### Inherited from

[`LaagError`](LaagError.md).[`toJSON`](LaagError.md#tojson)

***

### captureStackTrace()

#### Call Signature

> `static` **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Defined in: node\_modules/.bun/@types+node@24.8.1/node\_modules/@types/node/globals.d.ts:52

Creates a `.stack` property on `targetObject`, which when accessed returns
a string representing the location in the code at which
`Error.captureStackTrace()` was called.

```js
const myObject = {};
Error.captureStackTrace(myObject);
myObject.stack;  // Similar to `new Error().stack`
```

The first line of the trace will be prefixed with
`${myObject.name}: ${myObject.message}`.

The optional `constructorOpt` argument accepts a function. If given, all frames
above `constructorOpt`, including `constructorOpt`, will be omitted from the
generated stack trace.

The `constructorOpt` argument is useful for hiding implementation
details of error generation from the user. For instance:

```js
function a() {
  b();
}

function b() {
  c();
}

function c() {
  // Create an error without stack trace to avoid calculating the stack trace twice.
  const { stackTraceLimit } = Error;
  Error.stackTraceLimit = 0;
  const error = new Error();
  Error.stackTraceLimit = stackTraceLimit;

  // Capture the stack trace above function b
  Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace
  throw error;
}

a();
```

##### Parameters

###### targetObject

`object`

###### constructorOpt?

`Function`

##### Returns

`void`

##### Inherited from

[`LaagError`](LaagError.md).[`captureStackTrace`](LaagError.md#capturestacktrace)

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

[`LaagError`](LaagError.md).[`captureStackTrace`](LaagError.md#capturestacktrace)

***

### prepareStackTrace()

> `static` **prepareStackTrace**(`err`, `stackTraces`): `any`

Defined in: node\_modules/.bun/@types+node@24.8.1/node\_modules/@types/node/globals.d.ts:56

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

[`LaagError`](LaagError.md).[`prepareStackTrace`](LaagError.md#preparestacktrace)

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

[`LaagError`](LaagError.md).[`isError`](LaagError.md#iserror)

## Properties

### code

> `readonly` **code**: `string`

Defined in: [packages/core/src/errors.ts:38](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/core/src/errors.ts#L38)

#### Inherited from

[`LaagError`](LaagError.md).[`code`](LaagError.md#code)

***

### path?

> `readonly` `optional` **path**: `string`

Defined in: [packages/core/src/errors.ts:39](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/core/src/errors.ts#L39)

#### Inherited from

[`LaagError`](LaagError.md).[`path`](LaagError.md#path)

***

### context?

> `readonly` `optional` **context**: `Record`\<`string`, `unknown`\>

Defined in: [packages/core/src/errors.ts:40](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/core/src/errors.ts#L40)

#### Inherited from

[`LaagError`](LaagError.md).[`context`](LaagError.md#context)

***

### stackTraceLimit

> `static` **stackTraceLimit**: `number`

Defined in: node\_modules/.bun/@types+node@24.8.1/node\_modules/@types/node/globals.d.ts:68

The `Error.stackTraceLimit` property specifies the number of stack frames
collected by a stack trace (whether generated by `new Error().stack` or
`Error.captureStackTrace(obj)`).

The default value is `10` but may be set to any valid JavaScript number. Changes
will affect any stack trace captured _after_ the value has been changed.

If set to a non-number value, or set to a negative number, stack traces will
not capture any frames.

#### Inherited from

[`LaagError`](LaagError.md).[`stackTraceLimit`](LaagError.md#stacktracelimit)

***

### cause?

> `optional` **cause**: `unknown`

Defined in: node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.es2022.error.d.ts:26

The cause of the error.

#### Inherited from

[`LaagError`](LaagError.md).[`cause`](LaagError.md#cause)

***

### name

> **name**: `string`

Defined in: node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.es5.d.ts:1076

#### Inherited from

[`LaagError`](LaagError.md).[`name`](LaagError.md#name)

***

### message

> **message**: `string`

Defined in: node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.es5.d.ts:1077

#### Inherited from

[`LaagError`](LaagError.md).[`message`](LaagError.md#message)

***

### stack?

> `optional` **stack**: `string`

Defined in: node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.es5.d.ts:1078

#### Inherited from

[`LaagError`](LaagError.md).[`stack`](LaagError.md#stack)
