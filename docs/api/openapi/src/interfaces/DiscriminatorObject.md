[**Laag Library Collection**](../../../README.md)

***

[Laag Library Collection](../../../modules.md) / [openapi/src](../README.md) / DiscriminatorObject

# Interface: DiscriminatorObject

Defined in: [packages/openapi/src/types.ts:387](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L387)

When request bodies or response payloads may be one of a number of different schemas, a discriminator object can be used to aid in serialization, deserialization, and validation

## Properties

### propertyName

> **propertyName**: `string`

Defined in: [packages/openapi/src/types.ts:389](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L389)

REQUIRED. The name of the property in the payload that will hold the discriminator value

***

### mapping?

> `optional` **mapping**: `Record`\<`string`, `string`\>

Defined in: [packages/openapi/src/types.ts:391](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L391)

An object to hold mappings between payload values and schema names or references
