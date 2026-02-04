# @laag/core API Reference

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [LaagBase Class](#laagbase-class)
  - [Constructor](#constructor)
  - [Abstract Methods](#abstract-methods)
  - [Public Methods](#public-methods)
  - [Protected Methods](#protected-methods)
- [Error Classes](#error-classes)
  - [LaagError](#laagerror)
  - [ValidationError](#validationerror)
  - [ParseError](#parseerror)
  - [NotFoundError](#notfounderror)
- [Type Definitions](#type-definitions)
  - [ExtensionObject](#extensionobject)
  - [ValidationResult](#validationresult)
  - [ValidationError Type](#validationerror-type)
  - [BaseDocument](#basedocument)
  - [ErrorHandlingOptions](#errorhandlingoptions)

---

## Overview

The `@laag/core` package provides the foundational classes, types, and utilities that are shared across all laag library packages. It includes:

- **LaagBase**: Abstract base class for all API specification implementations
- **Error Classes**: Comprehensive error handling system with typed errors
- **Type Definitions**: Shared TypeScript types and interfaces
- **Utility Methods**: Common functionality for document management and validation

This package is designed to be extended by format-specific packages like `@laag/openapi` and `@laag/raml`, providing a consistent interface across different API specification formats.

---

## Installation

```bash
# Using npm
npm install @laag/core

# Using yarn
yarn add @laag/core

# Using bun
bun add @laag/core
```

---

## LaagBase Class

Abstract base class that provides common functionality for all API specification libraries.

### Constructor

**Signature:**

```typescript
constructor(doc?: string | BaseDocument, errorOptions?: ErrorHandlingOptions)
```

**Description:**
Creates a new instance of the LaagBase class. This constructor is called by subclasses to initialize the document and error handling configuration.

**Parameters:**

- `doc` (string | BaseDocument, optional): The API specification document as a JSON string or object. If not provided, an empty object is used.
- `errorOptions` (ErrorHandlingOptions, optional): Configuration options for error handling behavior.

**Throws:**

- `ParseError`: When the provided string cannot be parsed as valid JSON.

**Example:**

```typescript
import { LaagBase, ValidationResult } from '@laag/core';

class MyApiSpec extends LaagBase {
  validate(): ValidationResult {
    return { valid: true, errors: [] };
  }
}

// From JSON string
const spec1 = new MyApiSpec('{"version": "1.0.0"}');

// From object
const spec2 = new MyApiSpec({ version: '1.0.0' });

// With error options
const spec3 = new MyApiSpec(
  { version: '1.0.0' },
  {
    development: true,
    includeContext: true,
  }
);
```

---

### Abstract Methods

#### validate

**Signature:**

```typescript
abstract validate(): ValidationResult
```

**Description:**
Validate the document structure according to the specific API specification format. This abstract method must be implemented by subclasses to provide format-specific validation logic.

**Returns:**

- `ValidationResult`: A validation result object containing the validation status and any errors found.

**Example:**

```typescript
class MyApiSpec extends LaagBase {
  validate(): ValidationResult {
    const errors = [];

    if (!this.doc.version) {
      errors.push({
        path: 'version',
        message: 'Version is required',
        code: 'REQUIRED_FIELD_MISSING',
      });
    }

    if (!this.doc.title) {
      errors.push({
        path: 'title',
        message: 'Title is required',
        code: 'REQUIRED_FIELD_MISSING',
      });
    }

    return { valid: errors.length === 0, errors };
  }
}

const spec = new MyApiSpec({ version: '1.0.0' });
const result = spec.validate();

if (!result.valid) {
  console.error('Validation errors:');
  result.errors.forEach(error => {
    console.error(`  ${error.path}: ${error.message}`);
  });
}
```

---

### Public Methods

#### getDocument

**Signature:**

```typescript
getDocument(): BaseDocument
```

**Description:**
Get a copy of the document as a JavaScript object. This method returns a shallow copy of the internal document to prevent external modifications from affecting the internal state.

**Returns:**

- `BaseDocument`: A copy of the document object.

**Example:**

```typescript
const spec = new MyApiSpec({ version: '1.0.0', title: 'My API' });
const doc = spec.getDocument();
console.log(doc); // { version: '1.0.0', title: 'My API' }

// Modifications to the returned object don't affect the original
doc.version = '2.0.0';
console.log(spec.getDocument().version); // Still '1.0.0'
```

---

#### getDocumentAsJson

**Signature:**

```typescript
getDocumentAsJson(pretty?: boolean): string
```

**Description:**
Get the document as a JSON string representation. This method serializes the internal document to a JSON string, with optional pretty-printing for human readability.

**Parameters:**

- `pretty` (boolean, optional): Whether to format the JSON with 2-space indentation for readability. Defaults to `false` for compact output.

**Returns:**

- `string`: JSON string representation of the document.

**Example:**

```typescript
const spec = new MyApiSpec({ version: '1.0.0', title: 'My API' });

// Compact JSON
const compact = spec.getDocumentAsJson();
console.log(compact);
// Output: '{"version":"1.0.0","title":"My API"}'

// Pretty-printed JSON
const pretty = spec.getDocumentAsJson(true);
console.log(pretty);
// Output:
// {
//   "version": "1.0.0",
//   "title": "My API"
// }
```

---

### Protected Methods

These methods are available to subclasses for implementing format-specific functionality.

#### dictKeysExists

**Signature:**

```typescript
protected dictKeysExists(obj: Record<string, any>, ...keys: string[]): boolean
```

**Description:**
Check if all specified keys exist in an object, supporting nested key paths. This utility method can check for both simple keys and nested paths using dot notation.

**Parameters:**

- `obj` (Record<string, any>): The object to check for key existence.
- `keys` (...string[]): The keys to check for. Supports dot notation for nested paths (e.g., 'info.title').

**Returns:**

- `boolean`: `true` if all specified keys exist in the object, `false` otherwise.

**Example:**

```typescript
class MyApiSpec extends LaagBase {
  hasRequiredFields(): boolean {
    return this.dictKeysExists(this.doc, 'version', 'title', 'info.contact');
  }
}

const doc = {
  version: '1.0.0',
  title: 'My API',
  info: {
    contact: { email: 'test@example.com' },
  },
};

const spec = new MyApiSpec(doc);
console.log(spec.hasRequiredFields()); // true
```

---

#### getExtensions

**Signature:**

```typescript
protected getExtensions(level?: string): ExtensionObject
```

**Description:**
Get extension properties (x-\* properties) from a specific level or the root document. Extension properties are custom properties that start with 'x-' and are allowed in most API specification formats.

**Parameters:**

- `level` (string, optional): Optional path to a specific level in the document using dot notation. If not provided, extensions are retrieved from the root document.

**Returns:**

- `ExtensionObject`: Object containing all extension properties found at the specified level.

**Example:**

```typescript
class MyApiSpec extends LaagBase {
  getRootExtensions() {
    return this.getExtensions();
  }

  getInfoExtensions() {
    return this.getExtensions('info');
  }
}

const doc = {
  'x-custom': 'root-level',
  info: {
    title: 'My API',
    'x-logo': 'logo.png',
  },
};

const spec = new MyApiSpec(doc);
console.log(spec.getRootExtensions()); // { 'x-custom': 'root-level' }
console.log(spec.getInfoExtensions()); // { 'x-logo': 'logo.png' }
```

---

#### setExtensions

**Signature:**

```typescript
protected setExtensions(values: ExtensionObject, level?: string): void
```

**Description:**
Set extension properties (x-\* properties) at a specific level or the root document. This method validates that all provided keys are valid extension properties (start with 'x-').

**Parameters:**

- `values` (ExtensionObject): Object containing extension properties to set. All keys must start with 'x-'.
- `level` (string, optional): Optional path to a specific level in the document using dot notation.

**Throws:**

- `ValidationError`: When any key doesn't start with 'x-' or when the target level is invalid.

**Example:**

```typescript
class MyApiSpec extends LaagBase {
  addRootExtension(key: string, value: unknown) {
    this.setExtensions({ [key]: value });
  }

  addInfoExtension(key: string, value: unknown) {
    this.setExtensions({ [key]: value }, 'info');
  }
}

const spec = new MyApiSpec({ info: { title: 'My API' } });

// Set root-level extensions
spec.addRootExtension('x-custom', 'value');

// Set info-level extensions
spec.addInfoExtension('x-logo', 'logo.png');

// This will throw ValidationError
try {
  spec.addRootExtension('invalid-key', 'value');
} catch (error) {
  console.error(error.message); // Invalid extension key
}
```

---

#### getNestedValue

**Signature:**

```typescript
protected getNestedValue(obj: Record<string, any>, path: string): any
```

**Description:**
Get a nested value from an object using dot notation path traversal. This utility method safely navigates nested object structures without throwing errors when intermediate properties don't exist.

**Parameters:**

- `obj` (Record<string, any>): The object to traverse.
- `path` (string): The path to the value using dot notation (e.g., 'info.title', 'components.schemas.User').

**Returns:**

- `any`: The value at the specified path, or `undefined` if the path doesn't exist.

**Example:**

```typescript
class MyApiSpec extends LaagBase {
  getTitle(): string | undefined {
    return this.getNestedValue(this.doc, 'info.title');
  }

  getContactEmail(): string | undefined {
    return this.getNestedValue(this.doc, 'info.contact.email');
  }
}

const doc = {
  info: {
    title: 'My API',
    contact: { email: 'test@example.com' },
  },
};

const spec = new MyApiSpec(doc);
console.log(spec.getTitle()); // 'My API'
console.log(spec.getContactEmail()); // 'test@example.com'
```

---

#### setNestedValue

**Signature:**

```typescript
protected setNestedValue(obj: Record<string, any>, path: string, value: any): void
```

**Description:**
Set a nested value in an object using dot notation, creating intermediate objects as needed. This method safely sets values in nested object structures, automatically creating any missing intermediate objects in the path.

**Parameters:**

- `obj` (Record<string, any>): The object to modify.
- `path` (string): The path where to set the value using dot notation (e.g., 'info.title').
- `value` (any): The value to set at the specified path.

**Throws:**

- `ValidationError`: When the path is empty or invalid.

**Example:**

```typescript
class MyApiSpec extends LaagBase {
  setTitle(title: string) {
    this.setNestedValue(this.doc, 'info.title', title);
  }

  setContactEmail(email: string) {
    this.setNestedValue(this.doc, 'info.contact.email', email);
  }
}

const spec = new MyApiSpec({});

// Creates nested structure automatically
spec.setTitle('My API');
spec.setContactEmail('test@example.com');

console.log(spec.getDocument());
// Output: { info: { title: 'My API', contact: { email: 'test@example.com' } } }
```

---

## Error Classes

### LaagError

Base error class for all laag library errors.

**Signature:**

```typescript
class LaagError extends Error {
  constructor(message: string, code: string, path?: string, context?: Record<string, unknown>);
}
```

**Properties:**

- `message` (string): Human-readable error message
- `code` (string): Machine-readable error code
- `path` (string, optional): Path to the location where the error occurred
- `context` (Record<string, unknown>, optional): Additional context information
- `name` (string): Error name ('LaagError')

**Methods:**

- `getFormattedMessage(options?: ErrorHandlingOptions): string`: Get formatted error message
- `toJSON(): Record<string, unknown>`: Convert error to JSON-serializable object

**Example:**

```typescript
import { LaagError } from '@laag/core';

throw new LaagError('Something went wrong', 'CUSTOM_ERROR', 'path.to.property', {
  additionalInfo: 'context data',
});
```

**Formatted Message Example:**

```typescript
const error = new LaagError('Invalid value', 'INVALID', 'info.title', { value: 123 });

// Basic message
console.log(error.getFormattedMessage());
// Output: 'Invalid value (at path: info.title)'

// With context in development
console.log(
  error.getFormattedMessage({
    development: true,
    includeContext: true,
  })
);
// Output:
// Invalid value (at path: info.title)
// Context: { "value": 123 }
```

**JSON Serialization Example:**

```typescript
const error = new LaagError('Test error', 'TEST_ERROR', 'test.path');
console.log(JSON.stringify(error.toJSON(), null, 2));
// Output:
// {
//   "name": "LaagError",
//   "message": "Test error",
//   "code": "TEST_ERROR",
//   "path": "test.path",
//   "context": undefined
// }
```

---

### ValidationError

Error thrown when document or data validation fails.

**Signature:**

```typescript
class ValidationError extends LaagError {
  constructor(message: string, path: string, context?: Record<string, unknown>);
}
```

**Properties:**

- Inherits all properties from `LaagError`
- `code` is automatically set to `'VALIDATION_ERROR'`
- `name` is set to `'ValidationError'`

**Example:**

```typescript
import { ValidationError } from '@laag/core';

throw new ValidationError('Title is required', 'info.title', { providedValue: undefined });
```

**Usage in Validation:**

```typescript
class MyApiSpec extends LaagBase {
  validate(): ValidationResult {
    const errors = [];

    if (!this.doc.version) {
      errors.push({
        path: 'version',
        message: 'Version is required',
        code: 'REQUIRED_FIELD_MISSING',
      });
    }

    return { valid: errors.length === 0, errors };
  }

  setVersion(version: unknown) {
    if (typeof version !== 'string') {
      throw new ValidationError('Version must be a string', 'version', {
        expectedType: 'string',
        actualType: typeof version,
        value: version,
      });
    }
    this.doc.version = version;
  }
}
```

---

### ParseError

Error thrown when document parsing fails.

**Signature:**

```typescript
class ParseError extends LaagError {
  constructor(message: string, context?: Record<string, unknown>);
}
```

**Properties:**

- Inherits all properties from `LaagError`
- `code` is automatically set to `'PARSE_ERROR'`
- `name` is set to `'ParseError'`
- `path` is always `undefined` (parsing errors don't have a specific path)

**Example:**

```typescript
import { ParseError } from '@laag/core';

throw new ParseError('Invalid JSON syntax', { originalError: 'Unexpected token at position 10' });
```

**Usage in Document Loading:**

```typescript
import { LaagBase, ParseError } from '@laag/core';

class MyApiSpec extends LaagBase {
  static fromFile(filePath: string): MyApiSpec {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      return new MyApiSpec(content);
    } catch (error) {
      if (error instanceof ParseError) {
        throw new ParseError(`Failed to parse file: ${filePath}`, {
          originalError: error.message,
          filePath,
        });
      }
      throw error;
    }
  }
}
```

---

### NotFoundError

Error thrown when a required property, method, or resource is not found.

**Signature:**

```typescript
class NotFoundError extends LaagError {
  constructor(message: string, path?: string, context?: Record<string, unknown>);
}
```

**Properties:**

- Inherits all properties from `LaagError`
- `code` is automatically set to `'NOT_FOUND_ERROR'`
- `name` is set to `'NotFoundError'`

**Example:**

```typescript
import { NotFoundError } from '@laag/core';

throw new NotFoundError('Component schema not found', 'components.schemas.User', {
  requestedSchema: 'User',
  availableSchemas: ['Pet', 'Order'],
});
```

**Usage in Resource Lookup:**

```typescript
class MyApiSpec extends LaagBase {
  getPath(pathName: string) {
    const paths = this.doc.paths || {};

    if (!(pathName in paths)) {
      throw new NotFoundError(`Path not found: ${pathName}`, `paths.${pathName}`, {
        requestedPath: pathName,
        availablePaths: Object.keys(paths),
      });
    }

    return paths[pathName];
  }
}
```

---

## Type Definitions

### ExtensionObject

Extension object type for API specification extensions (x-\* properties).

**Type Definition:**

```typescript
interface ExtensionObject {
  [key: `x-${string}`]: unknown;
}
```

**Description:**
Most API specification formats allow custom extensions that start with 'x-'. This type ensures type safety while allowing any extension property.

**Example:**

```typescript
import type { ExtensionObject } from '@laag/core';

const extensions: ExtensionObject = {
  'x-custom-property': 'value',
  'x-vendor-extension': { nested: 'object' },
  'x-feature-flags': ['flag1', 'flag2'],
  'x-metadata': {
    generator: 'laag',
    version: '2.0.0',
  },
};

// Type-safe access
const customProp = extensions['x-custom-property'];
const metadata = extensions['x-metadata'];
```

---

### ValidationResult

Result of a document validation operation.

**Type Definition:**

```typescript
interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}
```

**Properties:**

- `valid` (boolean): Whether the validation passed without any errors
- `errors` (ValidationError[]): Array of validation errors found during validation

**Example:**

```typescript
import type { ValidationResult } from '@laag/core';

const result: ValidationResult = {
  valid: false,
  errors: [
    {
      path: 'info.title',
      message: 'Title is required',
      code: 'REQUIRED_FIELD_MISSING',
    },
    {
      path: 'info.version',
      message: 'Version is required',
      code: 'REQUIRED_FIELD_MISSING',
    },
  ],
};

// Check validation result
if (!result.valid) {
  console.error(`Found ${result.errors.length} validation errors:`);
  result.errors.forEach(error => {
    console.error(`  [${error.code}] ${error.path}: ${error.message}`);
  });
}
```

---

### ValidationError Type

Detailed information about a validation error.

**Type Definition:**

```typescript
interface ValidationError {
  path: string;
  message: string;
  code: string;
  context?: Record<string, unknown>;
}
```

**Properties:**

- `path` (string): Path to the location in the document where the validation error occurred
- `message` (string): Human-readable description of the validation error
- `code` (string): Machine-readable error code for programmatic handling
- `context` (Record<string, unknown>, optional): Optional additional context information

**Example:**

```typescript
import type { ValidationError } from '@laag/core';

const error: ValidationError = {
  path: 'paths./users.get.responses.200',
  message: 'Response description is required',
  code: 'MISSING_DESCRIPTION',
  context: {
    statusCode: '200',
    operation: 'get',
    path: '/users',
  },
};

// Programmatic error handling
if (error.code === 'MISSING_DESCRIPTION') {
  console.log(`Missing description at ${error.path}`);
  console.log('Context:', error.context);
}
```

---

### BaseDocument

Base document interface that all API specification documents should extend.

**Type Definition:**

```typescript
interface BaseDocument extends ExtensionObject {
  [key: string]: unknown;
}
```

**Description:**
This interface provides the foundation for all API specification document types, ensuring they support extension properties while allowing flexible content.

**Example:**

```typescript
import type { BaseDocument } from '@laag/core';

interface MyApiDocument extends BaseDocument {
  version: string;
  title: string;
  description?: string;
}

const doc: MyApiDocument = {
  version: '1.0.0',
  title: 'My API',
  description: 'A comprehensive API',
  'x-custom': 'extension value',
  'x-generator': {
    name: 'laag',
    version: '2.0.0',
  },
};

// Type-safe access to defined properties
console.log(doc.version); // '1.0.0'
console.log(doc.title); // 'My API'

// Extension properties are also accessible
console.log(doc['x-custom']); // 'extension value'
```

---

### ErrorHandlingOptions

Configuration options for error handling behavior.

**Type Definition:**

```typescript
interface ErrorHandlingOptions {
  includeContext?: boolean;
  includeStack?: boolean;
  development?: boolean;
}
```

**Properties:**

- `includeContext` (boolean, optional): Whether to include context information in error messages. Defaults to `true`.
- `includeStack` (boolean, optional): Whether to include stack traces in error output. Defaults to `false`.
- `development` (boolean, optional): Whether to use development-friendly error formatting. Auto-detected from `NODE_ENV`.

**Example:**

```typescript
import type { ErrorHandlingOptions } from '@laag/core';
import { LaagBase } from '@laag/core';

// Production configuration
const prodOptions: ErrorHandlingOptions = {
  includeContext: false,
  includeStack: false,
  development: false,
};

// Development configuration
const devOptions: ErrorHandlingOptions = {
  includeContext: true,
  includeStack: true,
  development: true,
};

// Use with LaagBase
const spec = new MyApiSpec(document, devOptions);
```

---

## See Also

- [Usage Guide for OpenAPI](./USAGE_GUIDE_OPENAPI.md)
- [Usage Guide for RAML](./USAGE_GUIDE_RAML.md)
- [CLI Guide](./CLI_GUIDE.md)
- [Main Documentation](./README.md)

---

## Complete Code Examples

### Example 1: Extending LaagBase

This example shows how to create a custom API specification class by extending LaagBase.

```typescript
import { LaagBase, ValidationResult, ValidationError as ValidationErrorType } from '@laag/core';
import { ValidationError } from '@laag/core';

/**
 * Custom API specification implementation
 */
class CustomApiSpec extends LaagBase {
  /**
   * Implement required validation method
   */
  validate(): ValidationResult {
    const errors: ValidationErrorType[] = [];

    // Check for required version field
    if (!this.dictKeysExists(this.doc, 'version')) {
      errors.push({
        path: 'version',
        message: 'Version field is required',
        code: 'REQUIRED_FIELD_MISSING',
      });
    }

    // Check for required title field
    if (!this.dictKeysExists(this.doc, 'title')) {
      errors.push({
        path: 'title',
        message: 'Title field is required',
        code: 'REQUIRED_FIELD_MISSING',
      });
    }

    // Validate version format if present
    if (this.doc.version && typeof this.doc.version !== 'string') {
      errors.push({
        path: 'version',
        message: 'Version must be a string',
        code: 'INVALID_TYPE',
        context: {
          expectedType: 'string',
          actualType: typeof this.doc.version,
        },
      });
    }

    // Check for at least one endpoint
    if (this.dictKeysExists(this.doc, 'endpoints')) {
      const endpoints = this.doc.endpoints as Record<string, unknown>;
      if (Object.keys(endpoints).length === 0) {
        errors.push({
          path: 'endpoints',
          message: 'At least one endpoint is required',
          code: 'EMPTY_COLLECTION',
        });
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Get the API title
   */
  getTitle(): string | undefined {
    return this.getNestedValue(this.doc, 'title');
  }

  /**
   * Set the API title
   */
  setTitle(title: string): void {
    if (typeof title !== 'string' || title.trim().length === 0) {
      throw new ValidationError('Title must be a non-empty string', 'title', {
        providedValue: title,
      });
    }
    this.setNestedValue(this.doc, 'title', title);
  }

  /**
   * Get the API version
   */
  getVersion(): string | undefined {
    return this.getNestedValue(this.doc, 'version');
  }

  /**
   * Set the API version
   */
  setVersion(version: string): void {
    if (typeof version !== 'string' || version.trim().length === 0) {
      throw new ValidationError('Version must be a non-empty string', 'version', {
        providedValue: version,
      });
    }
    this.setNestedValue(this.doc, 'version', version);
  }

  /**
   * Add an endpoint to the API
   */
  addEndpoint(path: string, config: Record<string, unknown>): void {
    if (!this.dictKeysExists(this.doc, 'endpoints')) {
      this.doc.endpoints = {};
    }
    this.setNestedValue(this.doc, `endpoints.${path}`, config);
  }

  /**
   * Get all endpoint paths
   */
  getEndpointPaths(): string[] {
    if (!this.dictKeysExists(this.doc, 'endpoints')) {
      return [];
    }
    return Object.keys(this.doc.endpoints as Record<string, unknown>);
  }
}

// Usage example
const api = new CustomApiSpec({
  version: '1.0.0',
  title: 'My Custom API',
});

// Add endpoints
api.addEndpoint('/users', {
  method: 'GET',
  description: 'Get all users',
});

api.addEndpoint('/users/:id', {
  method: 'GET',
  description: 'Get user by ID',
});

// Validate the document
const validation = api.validate();
if (validation.valid) {
  console.log('API specification is valid!');
  console.log('Endpoints:', api.getEndpointPaths());
} else {
  console.error('Validation errors:');
  validation.errors.forEach(error => {
    console.error(`  [${error.code}] ${error.path}: ${error.message}`);
  });
}

// Export as JSON
const jsonOutput = api.getDocumentAsJson(true);
console.log(jsonOutput);
```

---

### Example 2: Error Handling with Custom Errors

This example demonstrates comprehensive error handling patterns using the laag error classes.

```typescript
import {
  LaagBase,
  LaagError,
  ValidationError,
  ParseError,
  NotFoundError,
  ValidationResult,
} from '@laag/core';

class ApiSpecWithErrorHandling extends LaagBase {
  validate(): ValidationResult {
    return { valid: true, errors: [] };
  }

  /**
   * Load API specification from JSON string with error handling
   */
  static fromJson(jsonString: string): ApiSpecWithErrorHandling {
    try {
      return new ApiSpecWithErrorHandling(jsonString);
    } catch (error) {
      if (error instanceof ParseError) {
        // Re-throw with additional context
        throw new ParseError('Failed to load API specification from JSON', {
          originalError: error.message,
          inputLength: jsonString.length,
          inputPreview: jsonString.substring(0, 100),
        });
      }
      throw error;
    }
  }

  /**
   * Get a required field, throwing error if not found
   */
  getRequiredField(path: string): unknown {
    const value = this.getNestedValue(this.doc, path);

    if (value === undefined) {
      throw new NotFoundError(`Required field not found: ${path}`, path, {
        availableFields: Object.keys(this.doc),
      });
    }

    return value;
  }

  /**
   * Set a field with type validation
   */
  setTypedField(path: string, value: unknown, expectedType: string): void {
    const actualType = typeof value;

    if (actualType !== expectedType) {
      throw new ValidationError(`Type mismatch for field ${path}`, path, {
        expectedType,
        actualType,
        value,
      });
    }

    this.setNestedValue(this.doc, path, value);
  }

  /**
   * Safely get a field with default value
   */
  getFieldWithDefault<T>(path: string, defaultValue: T): T {
    const value = this.getNestedValue(this.doc, path);
    return value !== undefined ? (value as T) : defaultValue;
  }

  /**
   * Validate and set multiple fields atomically
   */
  setFields(fields: Record<string, unknown>): void {
    // Validate all fields first
    const errors: Array<{ path: string; message: string }> = [];

    for (const [path, value] of Object.entries(fields)) {
      if (value === null || value === undefined) {
        errors.push({
          path,
          message: 'Value cannot be null or undefined',
        });
      }
    }

    if (errors.length > 0) {
      throw new ValidationError(`Failed to set ${errors.length} field(s)`, 'fields', { errors });
    }

    // Set all fields if validation passed
    for (const [path, value] of Object.entries(fields)) {
      this.setNestedValue(this.doc, path, value);
    }
  }
}

// Example 1: Handling parse errors
try {
  const api = ApiSpecWithErrorHandling.fromJson('{ invalid json }');
} catch (error) {
  if (error instanceof ParseError) {
    console.error('Parse error:', error.message);
    console.error('Context:', error.context);

    // Get formatted message for logging
    const formatted = error.getFormattedMessage({
      development: true,
      includeContext: true,
    });
    console.error(formatted);
  }
}

// Example 2: Handling not found errors
const api = new ApiSpecWithErrorHandling({ title: 'My API' });

try {
  const version = api.getRequiredField('version');
} catch (error) {
  if (error instanceof NotFoundError) {
    console.error('Field not found:', error.path);
    console.error('Available fields:', error.context?.availableFields);
  }
}

// Example 3: Handling validation errors
try {
  api.setTypedField('version', 123, 'string');
} catch (error) {
  if (error instanceof ValidationError) {
    console.error('Validation failed:', error.message);
    console.error('Path:', error.path);
    console.error('Expected:', error.context?.expectedType);
    console.error('Actual:', error.context?.actualType);
  }
}

// Example 4: Safe field access with defaults
const description = api.getFieldWithDefault('description', 'No description provided');
const version = api.getFieldWithDefault('version', '1.0.0');

console.log('Description:', description);
console.log('Version:', version);

// Example 5: Atomic field updates
try {
  api.setFields({
    'info.title': 'Updated API',
    'info.version': '2.0.0',
    'info.description': 'An updated API specification',
  });
  console.log('Fields updated successfully');
} catch (error) {
  if (error instanceof ValidationError) {
    console.error('Failed to update fields:', error.context?.errors);
  }
}

// Example 6: Custom error handling with context
try {
  // Some operation that might fail
  throw new LaagError('Custom operation failed', 'CUSTOM_ERROR', 'custom.operation', {
    timestamp: new Date().toISOString(),
    userId: 'user123',
    operation: 'updateSchema',
  });
} catch (error) {
  if (error instanceof LaagError) {
    // Log error with full context
    console.error(
      error.getFormattedMessage({
        development: true,
        includeContext: true,
      })
    );

    // Serialize for API response
    const errorResponse = error.toJSON();
    console.log('Error response:', JSON.stringify(errorResponse, null, 2));
  }
}
```

---

### Example 3: Using Extension Methods

This example shows how to work with extension properties (x-\* properties) in API specifications.

```typescript
import { LaagBase, ValidationResult, ExtensionObject } from '@laag/core';

class ApiWithExtensions extends LaagBase {
  validate(): ValidationResult {
    return { valid: true, errors: [] };
  }

  /**
   * Get all root-level extensions
   */
  getRootExtensions(): ExtensionObject {
    return this.getExtensions();
  }

  /**
   * Set root-level extensions
   */
  setRootExtensions(extensions: ExtensionObject): void {
    this.setExtensions(extensions);
  }

  /**
   * Add a single root extension
   */
  addRootExtension(key: `x-${string}`, value: unknown): void {
    this.setExtensions({ [key]: value });
  }

  /**
   * Get extensions from a specific level
   */
  getLevelExtensions(level: string): ExtensionObject {
    return this.getExtensions(level);
  }

  /**
   * Set extensions at a specific level
   */
  setLevelExtensions(level: string, extensions: ExtensionObject): void {
    this.setExtensions(extensions, level);
  }

  /**
   * Check if an extension exists
   */
  hasExtension(key: `x-${string}`, level?: string): boolean {
    const extensions = level ? this.getExtensions(level) : this.getExtensions();
    return key in extensions;
  }

  /**
   * Get a specific extension value
   */
  getExtensionValue(key: `x-${string}`, level?: string): unknown {
    const extensions = level ? this.getExtensions(level) : this.getExtensions();
    return extensions[key];
  }

  /**
   * Remove an extension
   */
  removeExtension(key: `x-${string}`, level?: string): void {
    if (level) {
      const target = this.getNestedValue(this.doc, level);
      if (target && typeof target === 'object') {
        delete (target as Record<string, unknown>)[key];
      }
    } else {
      delete this.doc[key];
    }
  }

  /**
   * Merge extensions with existing ones
   */
  mergeExtensions(extensions: ExtensionObject, level?: string): void {
    const existing = level ? this.getExtensions(level) : this.getExtensions();
    const merged = { ...existing, ...extensions };
    this.setExtensions(merged, level);
  }
}

// Example 1: Working with root-level extensions
const api = new ApiWithExtensions({
  title: 'My API',
  version: '1.0.0',
});

// Add individual extensions
api.addRootExtension('x-api-id', 'api-12345');
api.addRootExtension('x-generator', {
  name: 'laag',
  version: '2.0.0',
});
api.addRootExtension('x-tags', ['public', 'rest', 'v1']);

// Get all root extensions
const rootExtensions = api.getRootExtensions();
console.log('Root extensions:', rootExtensions);
// Output: {
//   'x-api-id': 'api-12345',
//   'x-generator': { name: 'laag', version: '2.0.0' },
//   'x-tags': ['public', 'rest', 'v1']
// }

// Check if extension exists
if (api.hasExtension('x-api-id')) {
  const apiId = api.getExtensionValue('x-api-id');
  console.log('API ID:', apiId);
}

// Example 2: Working with nested-level extensions
const apiWithInfo = new ApiWithExtensions({
  info: {
    title: 'My API',
    version: '1.0.0',
  },
  paths: {
    '/users': {
      get: {
        summary: 'Get users',
      },
    },
  },
});

// Add extensions at info level
apiWithInfo.setLevelExtensions('info', {
  'x-logo': {
    url: 'https://example.com/logo.png',
    backgroundColor: '#FFFFFF',
  },
  'x-audience': 'public',
});

// Add extensions at paths level
apiWithInfo.setLevelExtensions('paths', {
  'x-stability': 'stable',
  'x-rate-limit': {
    requests: 1000,
    period: 'hour',
  },
});

// Get extensions from specific levels
const infoExtensions = apiWithInfo.getLevelExtensions('info');
const pathsExtensions = apiWithInfo.getLevelExtensions('paths');

console.log('Info extensions:', infoExtensions);
console.log('Paths extensions:', pathsExtensions);

// Example 3: Merging extensions
const existingApi = new ApiWithExtensions({
  'x-version': '1.0',
  'x-status': 'beta',
});

// Merge new extensions with existing ones
existingApi.mergeExtensions({
  'x-status': 'stable', // This will override
  'x-release-date': '2024-01-01', // This will be added
});

console.log('Merged extensions:', existingApi.getRootExtensions());
// Output: {
//   'x-version': '1.0',
//   'x-status': 'stable',
//   'x-release-date': '2024-01-01'
// }

// Example 4: Removing extensions
existingApi.removeExtension('x-status');
console.log('After removal:', existingApi.getRootExtensions());

// Example 5: Complex extension structures
const complexApi = new ApiWithExtensions({});

complexApi.setRootExtensions({
  'x-metadata': {
    created: new Date().toISOString(),
    author: 'API Team',
    tags: ['v1', 'public'],
    features: {
      authentication: true,
      rateLimit: true,
      caching: false,
    },
  },
  'x-documentation': {
    url: 'https://docs.example.com',
    contact: {
      email: 'api@example.com',
      slack: '#api-support',
    },
  },
  'x-sla': {
    uptime: '99.9%',
    responseTime: '200ms',
    support: '24/7',
  },
});

// Access nested extension values
const metadata = complexApi.getExtensionValue('x-metadata') as Record<string, unknown>;
console.log('API created:', metadata.created);
console.log('API features:', metadata.features);

// Export document with extensions
console.log(complexApi.getDocumentAsJson(true));
```

---

### Example 4: Validation Implementation

This example demonstrates a comprehensive validation implementation with multiple validation rules.

```typescript
import { LaagBase, ValidationResult, ValidationError as ValidationErrorType } from '@laag/core';

interface ApiEndpoint {
  method: string;
  path: string;
  description?: string;
  parameters?: Array<{
    name: string;
    type: string;
    required: boolean;
  }>;
  responses?: Record<
    string,
    {
      description: string;
      schema?: Record<string, unknown>;
    }
  >;
}

class ValidatedApiSpec extends LaagBase {
  /**
   * Comprehensive validation implementation
   */
  validate(): ValidationResult {
    const errors: ValidationErrorType[] = [];

    // Validate required root fields
    this.validateRequiredFields(errors);

    // Validate field types
    this.validateFieldTypes(errors);

    // Validate endpoints
    this.validateEndpoints(errors);

    // Validate extensions
    this.validateExtensions(errors);

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate required fields exist
   */
  private validateRequiredFields(errors: ValidationErrorType[]): void {
    const requiredFields = ['version', 'title', 'endpoints'];

    for (const field of requiredFields) {
      if (!this.dictKeysExists(this.doc, field)) {
        errors.push({
          path: field,
          message: `Required field '${field}' is missing`,
          code: 'REQUIRED_FIELD_MISSING',
        });
      }
    }
  }

  /**
   * Validate field types
   */
  private validateFieldTypes(errors: ValidationErrorType[]): void {
    // Validate version is a string
    if (this.dictKeysExists(this.doc, 'version')) {
      const version = this.doc.version;
      if (typeof version !== 'string') {
        errors.push({
          path: 'version',
          message: 'Version must be a string',
          code: 'INVALID_TYPE',
          context: {
            expectedType: 'string',
            actualType: typeof version,
            value: version,
          },
        });
      } else if (!/^\d+\.\d+\.\d+$/.test(version)) {
        errors.push({
          path: 'version',
          message: 'Version must follow semantic versioning (e.g., 1.0.0)',
          code: 'INVALID_FORMAT',
          context: {
            value: version,
            expectedFormat: 'X.Y.Z',
          },
        });
      }
    }

    // Validate title is a non-empty string
    if (this.dictKeysExists(this.doc, 'title')) {
      const title = this.doc.title;
      if (typeof title !== 'string') {
        errors.push({
          path: 'title',
          message: 'Title must be a string',
          code: 'INVALID_TYPE',
          context: {
            expectedType: 'string',
            actualType: typeof title,
          },
        });
      } else if (title.trim().length === 0) {
        errors.push({
          path: 'title',
          message: 'Title cannot be empty',
          code: 'INVALID_VALUE',
        });
      }
    }

    // Validate description if present
    if (this.dictKeysExists(this.doc, 'description')) {
      const description = this.doc.description;
      if (typeof description !== 'string') {
        errors.push({
          path: 'description',
          message: 'Description must be a string',
          code: 'INVALID_TYPE',
          context: {
            expectedType: 'string',
            actualType: typeof description,
          },
        });
      }
    }
  }

  /**
   * Validate endpoints structure
   */
  private validateEndpoints(errors: ValidationErrorType[]): void {
    if (!this.dictKeysExists(this.doc, 'endpoints')) {
      return;
    }

    const endpoints = this.doc.endpoints;

    if (typeof endpoints !== 'object' || endpoints === null) {
      errors.push({
        path: 'endpoints',
        message: 'Endpoints must be an object',
        code: 'INVALID_TYPE',
        context: {
          expectedType: 'object',
          actualType: typeof endpoints,
        },
      });
      return;
    }

    const endpointPaths = Object.keys(endpoints as Record<string, unknown>);

    if (endpointPaths.length === 0) {
      errors.push({
        path: 'endpoints',
        message: 'At least one endpoint is required',
        code: 'EMPTY_COLLECTION',
      });
      return;
    }

    // Validate each endpoint
    for (const path of endpointPaths) {
      this.validateEndpoint(path, errors);
    }
  }

  /**
   * Validate a single endpoint
   */
  private validateEndpoint(path: string, errors: ValidationErrorType[]): void {
    const endpoint = this.getNestedValue(this.doc, `endpoints.${path}`);

    if (typeof endpoint !== 'object' || endpoint === null) {
      errors.push({
        path: `endpoints.${path}`,
        message: 'Endpoint must be an object',
        code: 'INVALID_TYPE',
      });
      return;
    }

    const ep = endpoint as ApiEndpoint;

    // Validate method
    if (!ep.method) {
      errors.push({
        path: `endpoints.${path}.method`,
        message: 'Endpoint method is required',
        code: 'REQUIRED_FIELD_MISSING',
      });
    } else {
      const validMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'];
      if (!validMethods.includes(ep.method.toUpperCase())) {
        errors.push({
          path: `endpoints.${path}.method`,
          message: `Invalid HTTP method: ${ep.method}`,
          code: 'INVALID_VALUE',
          context: {
            value: ep.method,
            validValues: validMethods,
          },
        });
      }
    }

    // Validate parameters if present
    if (ep.parameters) {
      if (!Array.isArray(ep.parameters)) {
        errors.push({
          path: `endpoints.${path}.parameters`,
          message: 'Parameters must be an array',
          code: 'INVALID_TYPE',
        });
      } else {
        ep.parameters.forEach((param, index) => {
          if (!param.name) {
            errors.push({
              path: `endpoints.${path}.parameters[${index}].name`,
              message: 'Parameter name is required',
              code: 'REQUIRED_FIELD_MISSING',
            });
          }
          if (!param.type) {
            errors.push({
              path: `endpoints.${path}.parameters[${index}].type`,
              message: 'Parameter type is required',
              code: 'REQUIRED_FIELD_MISSING',
            });
          }
        });
      }
    }

    // Validate responses if present
    if (ep.responses) {
      if (typeof ep.responses !== 'object') {
        errors.push({
          path: `endpoints.${path}.responses`,
          message: 'Responses must be an object',
          code: 'INVALID_TYPE',
        });
      } else {
        for (const [statusCode, response] of Object.entries(ep.responses)) {
          if (!/^\d{3}$/.test(statusCode)) {
            errors.push({
              path: `endpoints.${path}.responses.${statusCode}`,
              message: 'Response status code must be a 3-digit number',
              code: 'INVALID_FORMAT',
              context: { value: statusCode },
            });
          }
          if (!response.description) {
            errors.push({
              path: `endpoints.${path}.responses.${statusCode}.description`,
              message: 'Response description is required',
              code: 'REQUIRED_FIELD_MISSING',
            });
          }
        }
      }
    }
  }

  /**
   * Validate extension properties
   */
  private validateExtensions(errors: ValidationErrorType[]): void {
    // Check that all x-* properties are valid
    for (const key of Object.keys(this.doc)) {
      if (key.startsWith('x-')) {
        // Extensions are valid, but we can add custom validation
        const value = this.doc[key];

        // Example: Ensure x-version follows a specific format
        if (key === 'x-version' && typeof value === 'string') {
          if (!/^\d+\.\d+$/.test(value)) {
            errors.push({
              path: key,
              message: 'x-version must follow format X.Y',
              code: 'INVALID_FORMAT',
              context: {
                value,
                expectedFormat: 'X.Y',
              },
            });
          }
        }
      }
    }
  }
}

// Example usage
const api = new ValidatedApiSpec({
  version: '1.0.0',
  title: 'My Validated API',
  description: 'An API with comprehensive validation',
  endpoints: {
    '/users': {
      method: 'GET',
      path: '/users',
      description: 'Get all users',
      parameters: [
        {
          name: 'limit',
          type: 'integer',
          required: false,
        },
        {
          name: 'offset',
          type: 'integer',
          required: false,
        },
      ],
      responses: {
        '200': {
          description: 'Successful response',
          schema: {
            type: 'array',
            items: { type: 'object' },
          },
        },
        '400': {
          description: 'Bad request',
        },
      },
    },
    '/users/:id': {
      method: 'GET',
      path: '/users/:id',
      description: 'Get user by ID',
      parameters: [
        {
          name: 'id',
          type: 'string',
          required: true,
        },
      ],
      responses: {
        '200': {
          description: 'User found',
        },
        '404': {
          description: 'User not found',
        },
      },
    },
  },
  'x-version': '1.0',
  'x-api-id': 'api-12345',
});

// Validate the API
const result = api.validate();

if (result.valid) {
  console.log('✓ API specification is valid!');
} else {
  console.error(`✗ Found ${result.errors.length} validation error(s):\n`);

  result.errors.forEach((error, index) => {
    console.error(`${index + 1}. [${error.code}] ${error.path}`);
    console.error(`   ${error.message}`);

    if (error.context) {
      console.error(`   Context:`, JSON.stringify(error.context, null, 2));
    }
    console.error('');
  });
}

// Example with invalid data
const invalidApi = new ValidatedApiSpec({
  version: 'invalid-version', // Should be X.Y.Z format
  title: '', // Should not be empty
  endpoints: {}, // Should have at least one endpoint
});

const invalidResult = invalidApi.validate();
console.log('\nValidation result for invalid API:');
console.log(`Valid: ${invalidResult.valid}`);
console.log(`Errors: ${invalidResult.errors.length}`);

invalidResult.errors.forEach(error => {
  console.log(`  - ${error.path}: ${error.message}`);
});
```

---

## Best Practices

### 1. Always Validate Documents

```typescript
const api = new MyApiSpec(document);
const validation = api.validate();

if (!validation.valid) {
  // Handle validation errors before proceeding
  throw new Error('Invalid document');
}
```

### 2. Use Type-Safe Extension Properties

```typescript
// Define extension types for better type safety
interface CustomExtensions extends ExtensionObject {
  'x-api-id': string;
  'x-version': string;
  'x-metadata': {
    created: string;
    author: string;
  };
}

// Use with type assertion
const extensions = api.getRootExtensions() as CustomExtensions;
const apiId = extensions['x-api-id'];
```

### 3. Provide Detailed Error Context

```typescript
throw new ValidationError('Invalid field value', 'field.path', {
  expectedType: 'string',
  actualType: typeof value,
  value,
  constraints: ['non-empty', 'max-length: 100'],
});
```

### 4. Use Protected Methods for Reusable Logic

```typescript
class MyApiSpec extends LaagBase {
  protected validateField(path: string, type: string): boolean {
    if (!this.dictKeysExists(this.doc, path)) {
      return false;
    }
    const value = this.getNestedValue(this.doc, path);
    return typeof value === type;
  }
}
```

### 5. Handle Errors Gracefully

```typescript
try {
  const value = api.getRequiredField('some.path');
} catch (error) {
  if (error instanceof NotFoundError) {
    // Provide default or alternative behavior
    console.warn(`Field not found: ${error.path}, using default`);
  } else {
    // Re-throw unexpected errors
    throw error;
  }
}
```

---

## Related Documentation

- [OpenAPI Package API Reference](./API_REFERENCE_OPENAPI.md)
- [RAML Package API Reference](./API_REFERENCE_RAML.md)
- [CLI Package API Reference](./API_REFERENCE_CLI.md)
- [Main Documentation Hub](./README.md)
