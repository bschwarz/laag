/**
 * JSON AST parser for Smithy models
 * @module parsers/json-parser
 */
import type { SmithyModel } from '../types.js';
/**
 * Parser for Smithy JSON AST format
 *
 * This parser handles both string and object inputs, validates the JSON structure,
 * and ensures the model conforms to the Smithy JSON AST specification.
 *
 * @class JsonParser
 * @since 1.0.0
 *
 * @example
 * ```typescript
 * import { JsonParser } from '@laag/smithy';
 *
 * const parser = new JsonParser();
 *
 * // Parse from string
 * const model = parser.parse('{"smithy": "2.0", "shapes": {}}');
 *
 * // Parse from object
 * const model2 = parser.parse({ smithy: "2.0", shapes: {} });
 * ```
 */
export declare class JsonParser {
  /**
   * Parse a Smithy model from JSON string or object
   *
   * @param input - JSON string or object representing a Smithy model
   * @returns Parsed and validated Smithy model
   * @throws {ParseError} If the input cannot be parsed or is invalid
   *
   * @example
   * ```typescript
   * const parser = new JsonParser();
   *
   * try {
   *   const model = parser.parse(jsonString);
   *   console.log('Model version:', model.smithy);
   * } catch (error) {
   *   if (error instanceof ParseError) {
   *     console.error('Parse failed:', error.message);
   *   }
   * }
   * ```
   */
  parse(input: string | object): SmithyModel;
  /**
   * Validate that the input conforms to Smithy JSON AST format
   *
   * Checks for:
   * - Input is an object
   * - Has required 'smithy' version property
   * - Has required 'shapes' property
   * - 'smithy' is a string
   * - 'shapes' is an object
   *
   * @param input - The input to validate
   * @returns True if the input is a valid Smithy model structure
   *
   * @example
   * ```typescript
   * const parser = new JsonParser();
   *
   * if (parser.validateFormat(data)) {
   *   console.log('Valid Smithy model structure');
   * } else {
   *   console.log('Invalid structure');
   * }
   * ```
   */
  validateFormat(input: unknown): input is SmithyModel;
  /**
   * Validate that a string contains valid JSON
   *
   * This is a lightweight check that doesn't parse the full JSON,
   * useful for quick validation before attempting to parse.
   *
   * @param input - String to validate
   * @returns True if the string is valid JSON
   *
   * @example
   * ```typescript
   * const parser = new JsonParser();
   *
   * if (parser.isValidJson(inputString)) {
   *   const model = parser.parse(inputString);
   * }
   * ```
   */
  isValidJson(input: string): boolean;
}
//# sourceMappingURL=json-parser.d.ts.map
