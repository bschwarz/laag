[**@laag/smithy v1.0.0-alpha.0**](../README.md)

***

[@laag/smithy](../globals.md) / JsonParser

# Class: JsonParser

Defined in: [smithy/src/parsers/json-parser.ts:31](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/parsers/json-parser.ts#L31)

Parser for Smithy JSON AST format

This parser handles both string and object inputs, validates the JSON structure,
and ensures the model conforms to the Smithy JSON AST specification.

 JsonParser

## Since

1.0.0

## Example

```typescript
import { JsonParser } from '@laag/smithy';

const parser = new JsonParser();

// Parse from string
const model = parser.parse('{"smithy": "2.0", "shapes": {}}');

// Parse from object
const model2 = parser.parse({ smithy: "2.0", shapes: {} });
```

## Constructors

### Constructor

> **new JsonParser**(): `JsonParser`

#### Returns

`JsonParser`

## Methods

### parse()

> **parse**(`input`): [`SmithyModel`](../interfaces/SmithyModel.md)

Defined in: [smithy/src/parsers/json-parser.ts:53](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/parsers/json-parser.ts#L53)

Parse a Smithy model from JSON string or object

#### Parameters

##### input

JSON string or object representing a Smithy model

`string` | `object`

#### Returns

[`SmithyModel`](../interfaces/SmithyModel.md)

Parsed and validated Smithy model

#### Throws

If the input cannot be parsed or is invalid

#### Example

```typescript
const parser = new JsonParser();

try {
  const model = parser.parse(jsonString);
  console.log('Model version:', model.smithy);
} catch (error) {
  if (error instanceof ParseError) {
    console.error('Parse failed:', error.message);
  }
}
```

***

### validateFormat()

> **validateFormat**(`input`): `input is SmithyModel`

Defined in: [smithy/src/parsers/json-parser.ts:112](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/parsers/json-parser.ts#L112)

Validate that the input conforms to Smithy JSON AST format

Checks for:
- Input is an object
- Has required 'smithy' version property
- Has required 'shapes' property
- 'smithy' is a string
- 'shapes' is an object

#### Parameters

##### input

`unknown`

The input to validate

#### Returns

`input is SmithyModel`

True if the input is a valid Smithy model structure

#### Example

```typescript
const parser = new JsonParser();

if (parser.validateFormat(data)) {
  console.log('Valid Smithy model structure');
} else {
  console.log('Invalid structure');
}
```

***

### isValidJson()

> **isValidJson**(`input`): `boolean`

Defined in: [smithy/src/parsers/json-parser.ts:156](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/parsers/json-parser.ts#L156)

Validate that a string contains valid JSON

This is a lightweight check that doesn't parse the full JSON,
useful for quick validation before attempting to parse.

#### Parameters

##### input

`string`

String to validate

#### Returns

`boolean`

True if the string is valid JSON

#### Example

```typescript
const parser = new JsonParser();

if (parser.isValidJson(inputString)) {
  const model = parser.parse(inputString);
}
```
