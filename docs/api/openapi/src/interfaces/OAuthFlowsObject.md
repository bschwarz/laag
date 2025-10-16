[**Laag Library Collection**](../../../README.md)

***

[Laag Library Collection](../../../modules.md) / [openapi/src](../README.md) / OAuthFlowsObject

# Interface: OAuthFlowsObject

Defined in: [packages/openapi/src/types.ts:467](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L467)

Allows configuration of the supported OAuth Flows

## Extends

- [`ExtensionObject`](../../../@laag/core/interfaces/ExtensionObject.md)

## Indexable

\[`key`: `` `x-${string}` ``\]: `unknown`

## Properties

### implicit?

> `optional` **implicit**: [`OAuthFlowObject`](OAuthFlowObject.md)

Defined in: [packages/openapi/src/types.ts:469](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L469)

Configuration for the OAuth Implicit flow

***

### password?

> `optional` **password**: [`OAuthFlowObject`](OAuthFlowObject.md)

Defined in: [packages/openapi/src/types.ts:471](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L471)

Configuration for the OAuth Resource Owner Password flow

***

### clientCredentials?

> `optional` **clientCredentials**: [`OAuthFlowObject`](OAuthFlowObject.md)

Defined in: [packages/openapi/src/types.ts:473](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L473)

Configuration for the OAuth Client Credentials flow

***

### authorizationCode?

> `optional` **authorizationCode**: [`OAuthFlowObject`](OAuthFlowObject.md)

Defined in: [packages/openapi/src/types.ts:475](https://github.com/bschwarz/laag/blob/fbbd59f53b1467155cca720fc2d13c5cf1b8ba8f/packages/openapi/src/types.ts#L475)

Configuration for the OAuth Authorization Code flow
