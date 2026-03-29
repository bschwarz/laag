[**@laag/smithy v1.0.0-alpha.0**](../README.md)

***

[@laag/smithy](../globals.md) / createSelectorQuery

# Function: createSelectorQuery()

> **createSelectorQuery**(`shapes`): `SelectorQueryBuilder`

Defined in: [smithy/src/utils/selector.ts:377](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/utils/selector.ts#L377)

Selector utilities for querying shapes using Smithy selector syntax

## Parameters

### shapes

`Map`\<`string`, [`Shape`](../type-aliases/Shape.md)\>

## Returns

`SelectorQueryBuilder`

## Example

```typescript
import { Smithy, selectShapes } from '@laag/smithy';

const smithy = new Smithy(model);

// Select all structures
const structures = smithy.select('structure');

// Select shapes with specific traits
const readonlyOps = smithy.select('[trait|readonly]');
```
