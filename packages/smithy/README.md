# @laag/smithy

TypeScript library for interfacing with AWS Smithy models.

## Installation

```bash
npm install @laag/smithy
# or
bun add @laag/smithy
```

## Features

- Parse and validate Smithy models (JSON AST format)
- Access and manipulate shapes, traits, and services
- Generate code from Smithy models (TypeScript, JavaScript, Python)
- Full TypeScript support with comprehensive type definitions
- Support for Smithy selectors and queries

## Quick Start

```typescript
import { Smithy } from '@laag/smithy';

// Load a Smithy model
const smithy = new Smithy({
  smithy: '2.0',
  shapes: {
    'example.weather#Weather': {
      type: 'service',
      version: '2006-03-01',
      operations: [{ target: 'example.weather#GetCurrentWeather' }],
    },
  },
});

// Access shapes
const service = smithy.getShape('example.weather#Weather');

// Validate the model
const result = smithy.validate();
console.log(result.isValid);
```

## Documentation

Full documentation is coming soon.

## License

MIT © Brett Schwarz
