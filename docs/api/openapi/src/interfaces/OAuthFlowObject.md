[**Laag Library Collection**](../../../README.md)

***

[Laag Library Collection](../../../modules.md) / [openapi/src](../README.md) / OAuthFlowObject

# Interface: OAuthFlowObject

Defined in: [packages/openapi/src/types.ts:481](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L481)

Configuration details for a supported OAuth Flow

## Extends

- [`ExtensionObject`](../../../@laag/core/interfaces/ExtensionObject.md)

## Indexable

\[`key`: `` `x-${string}` ``\]: `unknown`

## Properties

### authorizationUrl?

> `optional` **authorizationUrl**: `string`

Defined in: [packages/openapi/src/types.ts:483](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L483)

REQUIRED for implicit, authorizationCode. The authorization URL to be used for this flow

***

### tokenUrl?

> `optional` **tokenUrl**: `string`

Defined in: [packages/openapi/src/types.ts:485](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L485)

REQUIRED for password, clientCredentials, authorizationCode. The token URL to be used for this flow

***

### refreshUrl?

> `optional` **refreshUrl**: `string`

Defined in: [packages/openapi/src/types.ts:487](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L487)

The URL to be used for obtaining refresh tokens

***

### scopes

> **scopes**: `Record`\<`string`, `string`\>

Defined in: [packages/openapi/src/types.ts:489](https://github.com/bschwarz/laag/blob/2efb78c681fb20640fcb7692d4ecbc92c0afa33c/packages/openapi/src/types.ts#L489)

REQUIRED. The available scopes for the OAuth2 security scheme
