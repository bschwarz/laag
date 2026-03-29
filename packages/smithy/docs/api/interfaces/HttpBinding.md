[**@laag/smithy v1.0.0-alpha.0**](../README.md)

***

[@laag/smithy](../globals.md) / HttpBinding

# Interface: HttpBinding

Defined in: [smithy/src/types.ts:498](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/types.ts#L498)

HTTP binding information extracted from traits

## Properties

### method

> **method**: `string`

Defined in: [smithy/src/types.ts:500](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/types.ts#L500)

HTTP method

***

### uri

> **uri**: `string`

Defined in: [smithy/src/types.ts:502](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/types.ts#L502)

URI pattern

***

### code?

> `optional` **code**: `number`

Defined in: [smithy/src/types.ts:504](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/types.ts#L504)

HTTP status code

***

### headers?

> `optional` **headers**: `Record`\<`string`, `string`\>

Defined in: [smithy/src/types.ts:506](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/types.ts#L506)

Request headers

***

### queryParams?

> `optional` **queryParams**: `Record`\<`string`, `string`\>

Defined in: [smithy/src/types.ts:508](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/types.ts#L508)

Query parameters

***

### labels?

> `optional` **labels**: `string`[]

Defined in: [smithy/src/types.ts:510](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/types.ts#L510)

URI labels

***

### payload?

> `optional` **payload**: `string`

Defined in: [smithy/src/types.ts:512](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/types.ts#L512)

Payload member name
