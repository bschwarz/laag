/**
 * Parser exports for Smithy models
 * @module parsers
 */

export { JsonParser } from './json-parser.js';

// Future: IDL parser for native Smithy IDL syntax
// export { IdlParser } from './idl-parser.js';

/**
 * Placeholder for future IDL parser implementation
 *
 * The IDL parser will support parsing native Smithy IDL syntax (.smithy files)
 * in addition to the JSON AST format currently supported by JsonParser.
 *
 * @example
 * ```smithy
 * $version: "2.0"
 *
 * namespace example.weather
 *
 * service Weather {
 *     version: "2006-03-01"
 *     operations: [GetCurrentWeather]
 * }
 * ```
 *
 * @since Future release
 */
