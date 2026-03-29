[**Laag Library Collection**](../../../README.md)

***

[Laag Library Collection](../../../modules.md) / [@laag/core](../README.md) / BaseDocument

# Interface: BaseDocument

Defined in: [packages/core/src/types.ts:124](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/core/src/types.ts#L124)

Base document interface that all API specification documents should extend.

This interface provides the foundation for all API specification document types,
ensuring they support extension properties while allowing flexible content.

 BaseDocument

## Since

2.0.0

## Example

```typescript
interface MyApiDocument extends BaseDocument {
  version: string;
  title: string;
  // Inherits extension property support from ExtensionObject
}

const doc: MyApiDocument = {
  version: '1.0.0',
  title: 'My API',
  'x-custom': 'extension value'
};
```

## Extends

- [`ExtensionObject`](ExtensionObject.md)

## Extended by

- [`OpenAPIDocument`](../../../openapi/src/interfaces/OpenAPIDocument.md)

## Indexable

\[`key`: `string`\]: `unknown`

\[`key`: `` `x-${string}` ``\]: `unknown`
