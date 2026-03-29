[**@laag/smithy v1.0.0-alpha.0**](../README.md)

***

[@laag/smithy](../globals.md) / parseShapeId

# Function: parseShapeId()

> **parseShapeId**(`shapeId`): `ParsedShapeId`

Defined in: [smithy/src/utils/shape-id.ts:39](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/utils/shape-id.ts#L39)

Parse a shape ID into its components

Shape IDs can be in two formats:
- Absolute: "namespace#ShapeName" (e.g., "smithy.api#String")
- Relative: "ShapeName" (e.g., "String")

## Parameters

### shapeId

`string`

The shape ID to parse

## Returns

`ParsedShapeId`

Parsed shape ID components

## Example

```typescript
parseShapeId("smithy.api#String")
// Returns: { namespace: "smithy.api", name: "String", original: "smithy.api#String" }

parseShapeId("MyShape")
// Returns: { namespace: undefined, name: "MyShape", original: "MyShape" }
```
