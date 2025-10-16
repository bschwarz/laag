[**Laag Library Collection**](../../../README.md)

***

[Laag Library Collection](../../../modules.md) / [@laag/core](../README.md) / ExtensionObject

# Interface: ExtensionObject

Defined in: [packages/core/src/types.ts:30](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/core/src/types.ts#L30)

Extension object type for API specification extensions (x-* properties).

Most API specification formats allow custom extensions that start with 'x-'.
This type ensures type safety while allowing any extension property.

 ExtensionObject

## Since

2.0.0

## Example

```typescript
const extensions: ExtensionObject = {
  'x-custom-property': 'value',
  'x-vendor-extension': { nested: 'object' },
  'x-feature-flags': ['flag1', 'flag2']
};
```

## Extended by

- [`InfoObject`](../../../openapi/src/interfaces/InfoObject.md)
- [`ContactObject`](../../../openapi/src/interfaces/ContactObject.md)
- [`LicenseObject`](../../../openapi/src/interfaces/LicenseObject.md)
- [`ServerObject`](../../../openapi/src/interfaces/ServerObject.md)
- [`ServerVariableObject`](../../../openapi/src/interfaces/ServerVariableObject.md)
- [`PathItemObject`](../../../openapi/src/interfaces/PathItemObject.md)
- [`OperationObject`](../../../openapi/src/interfaces/OperationObject.md)
- [`ExternalDocumentationObject`](../../../openapi/src/interfaces/ExternalDocumentationObject.md)
- [`ParameterObject`](../../../openapi/src/interfaces/ParameterObject.md)
- [`RequestBodyObject`](../../../openapi/src/interfaces/RequestBodyObject.md)
- [`MediaTypeObject`](../../../openapi/src/interfaces/MediaTypeObject.md)
- [`EncodingObject`](../../../openapi/src/interfaces/EncodingObject.md)
- [`ResponseObject`](../../../openapi/src/interfaces/ResponseObject.md)
- [`ExampleObject`](../../../openapi/src/interfaces/ExampleObject.md)
- [`LinkObject`](../../../openapi/src/interfaces/LinkObject.md)
- [`TagObject`](../../../openapi/src/interfaces/TagObject.md)
- [`SchemaObject`](../../../openapi/src/interfaces/SchemaObject.md)
- [`XMLObject`](../../../openapi/src/interfaces/XMLObject.md)
- [`ComponentsObject`](../../../openapi/src/interfaces/ComponentsObject.md)
- [`SecuritySchemeObject`](../../../openapi/src/interfaces/SecuritySchemeObject.md)
- [`OAuthFlowsObject`](../../../openapi/src/interfaces/OAuthFlowsObject.md)
- [`OAuthFlowObject`](../../../openapi/src/interfaces/OAuthFlowObject.md)
- [`BaseDocument`](BaseDocument.md)

## Indexable

\[`key`: `` `x-${string}` ``\]: `unknown`
