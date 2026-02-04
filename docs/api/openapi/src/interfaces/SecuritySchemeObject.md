[**Laag Library Collection**](../../../README.md)

***

[Laag Library Collection](../../../modules.md) / [openapi/src](../README.md) / SecuritySchemeObject

# Interface: SecuritySchemeObject

Defined in: [packages/openapi/src/types.ts:445](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L445)

Defines a security scheme that can be used by the operations

## Extends

- [`ExtensionObject`](../../../@laag/core/interfaces/ExtensionObject.md)

## Indexable

\[`key`: `` `x-${string}` ``\]: `unknown`

## Properties

### type

> **type**: `"apiKey"` \| `"http"` \| `"oauth2"` \| `"openIdConnect"`

Defined in: [packages/openapi/src/types.ts:447](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L447)

REQUIRED. The type of the security scheme

***

### description?

> `optional` **description**: `string`

Defined in: [packages/openapi/src/types.ts:449](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L449)

A short description for security scheme

***

### name?

> `optional` **name**: `string`

Defined in: [packages/openapi/src/types.ts:451](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L451)

REQUIRED for apiKey. The name of the header, query or cookie parameter to be used

***

### in?

> `optional` **in**: `"query"` \| `"header"` \| `"cookie"`

Defined in: [packages/openapi/src/types.ts:453](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L453)

REQUIRED for apiKey. The location of the API key

***

### scheme?

> `optional` **scheme**: `string`

Defined in: [packages/openapi/src/types.ts:455](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L455)

REQUIRED for http. The name of the HTTP Authorization scheme to be used in the Authorization header

***

### bearerFormat?

> `optional` **bearerFormat**: `string`

Defined in: [packages/openapi/src/types.ts:457](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L457)

A hint to the client to identify how the bearer token is formatted

***

### flows?

> `optional` **flows**: [`OAuthFlowsObject`](OAuthFlowsObject.md)

Defined in: [packages/openapi/src/types.ts:459](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L459)

REQUIRED for oauth2. An object containing configuration information for the flow types supported

***

### openIdConnectUrl?

> `optional` **openIdConnectUrl**: `string`

Defined in: [packages/openapi/src/types.ts:461](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L461)

REQUIRED for openIdConnect. OpenId Connect URL to discover OAuth2 configuration values
