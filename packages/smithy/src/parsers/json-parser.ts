/**
 * JSON AST parser for Smithy models
 * @module parsers/json-parser
 */

import { ParseError } from '@laag/core';
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
export class JsonParser {
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
  parse(input: string | object): SmithyModel {
    let parsed: unknown;

    // Handle string input - parse JSON
    if (typeof input === 'string') {
      try {
        parsed = JSON.parse(input);
      } catch (error) {
        throw new ParseError('Failed to parse JSON input', {
          originalError: error instanceof Error ? error.message : String(error),
          inputType: 'string',
          inputLength: input.length,
        });
      }
    } else if (typeof input === 'object' && input !== null) {
      // Handle object input - use directly
      parsed = input;
    } else {
      throw new ParseError('Input must be a JSON string or object', {
        inputType: typeof input,
        receivedValue: input,
      });
    }

    // Validate the parsed object
    if (!this.validateFormat(parsed)) {
      throw new ParseError('Invalid Smithy model format', {
        reason: 'Model must be an object with required properties',
        receivedType: typeof parsed,
      });
    }

    return parsed as SmithyModel;
  }

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
  validateFormat(input: unknown): input is SmithyModel {
    // Must be an object
    if (typeof input !== 'object' || input === null) {
      return false;
    }

    const obj = input as Record<string, unknown>;

    // Must have 'smithy' property that is a string
    if (!('smithy' in obj) || typeof obj.smithy !== 'string') {
      return false;
    }

    // Must have 'shapes' property that is an object
    if (!('shapes' in obj) || typeof obj.shapes !== 'object' || obj.shapes === null) {
      return false;
    }

    // If metadata exists, it must be an object
    if ('metadata' in obj && (typeof obj.metadata !== 'object' || obj.metadata === null)) {
      return false;
    }

    return true;
  }

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
  isValidJson(input: string): boolean {
    try {
      JSON.parse(input);
      return true;
    } catch {
      return false;
    }
  }
}
