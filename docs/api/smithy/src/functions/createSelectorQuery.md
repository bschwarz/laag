[**Laag Library Collection**](../../../README.md)

***

[Laag Library Collection](../../../modules.md) / [smithy/src](../README.md) / createSelectorQuery

# Function: createSelectorQuery()

> **createSelectorQuery**(`shapes`): `SelectorQueryBuilder`

Defined in: [packages/smithy/src/utils/selector.ts:377](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/smithy/src/utils/selector.ts#L377)

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
