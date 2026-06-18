---
name: smithy
description: Working with AWS Smithy models using @laag/smithy. Use when parsing, reading, modifying, or validating Smithy model files.
---

# @laag/smithy — Working with AWS Smithy Models

## Installation & Import

```typescript
import { Smithy } from '@laag/smithy';
```

## Creating an Instance

```typescript
// From JSON string
const smithy = new Smithy(jsonString);

// From object
const smithy = new Smithy({
  smithy: '2.0',
  shapes: {
    'example.weather#Weather': {
      type: 'service',
      version: '2006-03-01',
      operations: [{ target: 'example.weather#GetWeather' }]
    }
  }
});
```

Constructor throws `ParseError` if JSON is invalid, `ValidationError` if model structure is invalid.

## Model Properties

```typescript
smithy.version   // "2.0"
smithy.metadata  // Record<string, unknown> | undefined
smithy.shapes    // Map<ShapeId, Shape>
```

## Working with Shapes

```typescript
// Get a shape by ID
const shape = smithy.getShape('example.weather#GetWeather');
// Shape | undefined

// Get shapes by type
const structures = smithy.getShapesByType('structure');
const services   = smithy.getShapesByType('service');
const operations = smithy.getShapesByType('operation');
// Valid types: 'service' | 'operation' | 'resource' | 'structure' | 'union' |
//              'list' | 'map' | 'string' | 'integer' | 'float' | 'boolean' |
//              'blob' | 'timestamp' | 'enum' | 'intEnum' | 'document'

// Check existence
smithy.hasShape('example.weather#GetWeather'); // boolean

// Add a shape
smithy.addShape('example.weather#Temperature', {
  type: 'structure',
  members: {
    value: { target: 'smithy.api#Float' }
  }
});

// Remove a shape
smithy.removeShape('example.weather#OldShape'); // returns boolean
```

## Services, Operations, Resources

```typescript
// Get all services
const services = smithy.getServices(); // ServiceShape[]

// Get a specific service
const svc = smithy.getService('example.weather#Weather');

// Get operations for a service
const ops = smithy.getOperations('example.weather#Weather'); // OperationShape[]

// Get resources for a service
const resources = smithy.getResources('example.weather#Weather'); // ResourceShape[]

// Get HTTP binding for an operation
const binding = smithy.getHttpBinding('example.weather#GetWeather');
// { method: 'GET', uri: '/weather/{city}', code?: number } | undefined
```

## Traits

```typescript
// Get all traits for a shape
const traits = smithy.getTraits('example.weather#GetWeather');
// Map<string, unknown> | undefined

// Check for a specific trait
smithy.hasTrait('example.weather#city', 'smithy.api#required'); // boolean

// Add a trait
smithy.addTrait('example.weather#GetWeather', 'smithy.api#readonly', {});
smithy.addTrait('example.weather#GetWeather', 'smithy.api#http', {
  method: 'GET',
  uri: '/weather/{city}'
});
```

## Selector Queries

```typescript
// Select all shapes
smithy.select('*');

// Select by type
smithy.select('structure');
smithy.select('service');

// Select shapes with a specific trait
smithy.select('[trait|required]');
smithy.select('[trait|smithy.api#http]');

// Select by namespace
smithy.select('[id|namespace = example.weather]');

// Returns: Array<{ id: ShapeId, shape: Shape }>
```

## Validation

```typescript
const result = smithy.validate();
// { valid: boolean, errors: [{ path, message, code }] }

if (!result.valid) {
  result.errors.forEach(e => console.error(`${e.path}: ${e.message}`));
}
```

## Serialization

```typescript
smithy.toJSON();        // SmithyModel object
smithy.toString();      // compact JSON string
smithy.toString(true);  // pretty JSON string
```

## Common Pattern: Inspect a Smithy model file

```typescript
import { readFileSync } from 'fs';
import { Smithy } from '@laag/smithy';

const json = readFileSync('model.json', 'utf8');
const smithy = new Smithy(json);

console.log('Version:', smithy.version);

for (const service of smithy.getServices()) {
  console.log('Service version:', service.version);
}

for (const [id, shape] of smithy.shapes) {
  console.log(id, '->', shape.type);
}
```
