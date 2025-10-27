/**
 * Base class for all laag library implementations
 *
 * @fileoverview This module provides the abstract base class that all API specification
 * libraries in the laag collection extend from. It includes common functionality for
 * document management, extension handling, and validation.
 *
 * @module @laag/core/base
 * @since 2.0.0
 */

import { ParseError, ValidationError } from './errors.js';
import { BaseDocument, ErrorHandlingOptions, ExtensionObject, ValidationResult } from './types.js';

/**
 * Abstract base class that provides common functionality for all API specification libraries.
 *
 * This class serves as the foundation for all laag library implementations, providing:
 * - Document parsing and management
 * - Extension property handling (x-* properties)
 * - Nested object navigation utilities
 * - Error handling configuration
 * - Abstract validation interface
 *
 * @abstract
 * @class LaagBase
 * @since 2.0.0
 *
 * @example
 * ```typescript
 * import { LaagBase } from '@laag/core';
 *
 * class MyApiSpec extends LaagBase {
 *   validate(): ValidationResult {
 *     // Implementation specific validation
 *     return { valid: true, errors: [] };
 *   }
 * }
 *
 * const spec = new MyApiSpec({ version: '1.0.0' });
 * ```
 */
export abstract class LaagBase {
  protected doc: BaseDocument;
  protected errorOptions: ErrorHandlingOptions;

  /**
   * Creates a new instance of the LaagBase class.
   *
   * @param doc - The API specification document as a JSON string or object. If not provided, an empty object is used.
   * @param errorOptions - Configuration options for error handling behavior.
   *
   * @throws {ParseError} When the provided string cannot be parsed as valid JSON.
   *
   * @example
   * ```typescript
   * // From JSON string
   * const spec = new MyApiSpec('{"version": "1.0.0"}');
   *
   * // From object
   * const spec = new MyApiSpec({ version: '1.0.0' });
   *
   * // With error options
   * const spec = new MyApiSpec(doc, {
   *   development: true,
   *   includeContext: true
   * });
   * ```
   */
  constructor(doc?: string | BaseDocument, errorOptions: ErrorHandlingOptions = {}) {
    this.errorOptions = {
      includeContext: true,
      includeStack: false,
      development: (globalThis as any)?.process?.env?.NODE_ENV !== 'production', // eslint-disable-line @typescript-eslint/no-explicit-any
      ...errorOptions,
    };

    if (typeof doc === 'string') {
      try {
        this.doc = JSON.parse(doc);
      } catch (error) {
        throw new ParseError('Failed to parse document as JSON', {
          originalError: error instanceof Error ? error.message : String(error),
        });
      }
    } else {
      this.doc = doc ?? {};
    }
  }

  /**
   * Check if all specified keys exist in an object, supporting nested key paths.
   *
   * This utility method can check for both simple keys and nested paths using dot notation.
   * It's commonly used for validating document structure before accessing properties.
   *
   * @param obj - The object to check for key existence.
   * @param keys - The keys to check for. Supports dot notation for nested paths (e.g., 'info.title').
   * @returns `true` if all specified keys exist in the object, `false` otherwise.
   *
   * @protected
   * @since 2.0.0
   *
   * @example
   * ```typescript
   * const doc = { info: { title: 'My API', version: '1.0.0' } };
   *
   * // Check simple key
   * this.dictKeysExists(doc, 'info'); // true
   *
   * // Check nested keys
   * this.dictKeysExists(doc, 'info.title', 'info.version'); // true
   * this.dictKeysExists(doc, 'info.description'); // false
   * ```
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected dictKeysExists(obj: Record<string, any>, ...keys: string[]): boolean {
    if (!obj || typeof obj !== 'object') {
      return false;
    }

    return keys.every(key => {
      if (key.includes('.')) {
        // Handle nested keys like 'info.title'
        const keyParts = key.split('.');
        let current = obj;

        for (const part of keyParts) {
          if (!current || typeof current !== 'object' || !(part in current)) {
            return false;
          }
          current = current[part];
        }
        return true;
      } else {
        // Handle simple keys
        return key in obj;
      }
    });
  }

  /**
   * Get extension properties (x-* properties) from a specific level or the root document.
   *
   * Extension properties are custom properties that start with 'x-' and are allowed
   * in most API specification formats to provide vendor-specific functionality.
   *
   * @param level - Optional path to a specific level in the document using dot notation.
   *                If not provided, extensions are retrieved from the root document.
   *                Examples: 'info', 'paths', 'components.schemas'
   * @returns Object containing all extension properties found at the specified level.
   *          Keys are guaranteed to start with 'x-'.
   *
   * @protected
   * @since 2.0.0
   *
   * @example
   * ```typescript
   * const doc = {
   *   'x-custom': 'root-level',
   *   info: {
   *     title: 'My API',
   *     'x-logo': 'logo.png'
   *   }
   * };
   *
   * // Get root extensions
   * this.getExtensions(); // { 'x-custom': 'root-level' }
   *
   * // Get info-level extensions
   * this.getExtensions('info'); // { 'x-logo': 'logo.png' }
   * ```
   */
  protected getExtensions(level?: string): ExtensionObject {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let target: Record<string, any>;

    if (level) {
      target = this.getNestedValue(this.doc, level);
      if (!target || typeof target !== 'object') {
        return {};
      }
    } else {
      target = this.doc;
    }

    const extensions: ExtensionObject = {};

    for (const [key, value] of Object.entries(target)) {
      if (key.startsWith('x-')) {
        extensions[key as `x-${string}`] = value;
      }
    }

    return extensions;
  }

  /**
   * Set extension properties (x-* properties) at a specific level or the root document.
   *
   * This method validates that all provided keys are valid extension properties (start with 'x-')
   * and sets them at the specified document level.
   *
   * @param values - Object containing extension properties to set. All keys must start with 'x-'.
   * @param level - Optional path to a specific level in the document using dot notation.
   *                If not provided, extensions are set at the root document level.
   *
   * @throws {ValidationError} When any key doesn't start with 'x-' or when the target level is invalid.
   *
   * @protected
   * @since 2.0.0
   *
   * @example
   * ```typescript
   * // Set root-level extensions
   * this.setExtensions({ 'x-custom': 'value', 'x-version': '2.0' });
   *
   * // Set info-level extensions
   * this.setExtensions({ 'x-logo': 'logo.png' }, 'info');
   *
   * // This will throw ValidationError
   * this.setExtensions({ 'invalid-key': 'value' }); // Error: keys must start with 'x-'
   * ```
   */
  protected setExtensions(values: ExtensionObject, level?: string): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let target: Record<string, any>;

    if (level) {
      target = this.getNestedValue(this.doc, level);
      if (!target || typeof target !== 'object') {
        throw new ValidationError(`Cannot set extensions: invalid level path '${level}'`, level);
      }
    } else {
      target = this.doc;
    }

    // Validate that all keys are proper extensions
    for (const key of Object.keys(values)) {
      if (!key.startsWith('x-')) {
        throw new ValidationError(
          `Invalid extension key '${key}': extension keys must start with 'x-'`,
          level ? `${level}.${key}` : key
        );
      }
    }

    // Set the extension values
    Object.assign(target, values);
  }

  /**
   * Get a nested value from an object using dot notation path traversal.
   *
   * This utility method safely navigates nested object structures without throwing
   * errors when intermediate properties don't exist.
   *
   * @param obj - The object to traverse.
   * @param path - The path to the value using dot notation (e.g., 'info.title', 'components.schemas.User').
   * @returns The value at the specified path, or `undefined` if the path doesn't exist.
   *
   * @protected
   * @since 2.0.0
   *
   * @example
   * ```typescript
   * const doc = {
   *   info: {
   *     title: 'My API',
   *     contact: { email: 'test@example.com' }
   *   }
   * };
   *
   * this.getNestedValue(doc, 'info.title'); // 'My API'
   * this.getNestedValue(doc, 'info.contact.email'); // 'test@example.com'
   * this.getNestedValue(doc, 'info.nonexistent'); // undefined
   * ```
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected getNestedValue(obj: Record<string, any>, path: string): any {
    const keys = path.split('.');
    let current = obj;

    for (const key of keys) {
      if (!current || typeof current !== 'object' || !(key in current)) {
        return undefined;
      }
      current = current[key];
    }

    return current;
  }

  /**
   * Set a nested value in an object using dot notation, creating intermediate objects as needed.
   *
   * This method safely sets values in nested object structures, automatically creating
   * any missing intermediate objects in the path.
   *
   * @param obj - The object to modify.
   * @param path - The path where to set the value using dot notation (e.g., 'info.title').
   * @param value - The value to set at the specified path.
   *
   * @throws {ValidationError} When the path is empty or invalid.
   *
   * @protected
   * @since 2.0.0
   *
   * @example
   * ```typescript
   * const doc = {};
   *
   * // Creates nested structure automatically
   * this.setNestedValue(doc, 'info.title', 'My API');
   * // Result: { info: { title: 'My API' } }
   *
   * this.setNestedValue(doc, 'info.contact.email', 'test@example.com');
   * // Result: { info: { title: 'My API', contact: { email: 'test@example.com' } } }
   * ```
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected setNestedValue(obj: Record<string, any>, path: string, value: any): void {
    const keys = path.split('.');
    const lastKey = keys.pop();

    if (!lastKey) {
      throw new ValidationError('Invalid path: path cannot be empty', path);
    }

    let current = obj;

    // Navigate to the parent object, creating nested objects as needed
    for (const key of keys) {
      if (!(key in current) || typeof current[key] !== 'object' || current[key] === null) {
        current[key] = {};
      }
      current = current[key];
    }

    current[lastKey] = value;
  }

  /**
   * Validate the document structure according to the specific API specification format.
   *
   * This abstract method must be implemented by subclasses to provide format-specific
   * validation logic. The validation should check for required fields, proper structure,
   * and any format-specific constraints.
   *
   * @returns A validation result object containing the validation status and any errors found.
   *
   * @abstract
   * @since 2.0.0
   *
   * @example
   * ```typescript
   * class MyApiSpec extends LaagBase {
   *   validate(): ValidationResult {
   *     const errors = [];
   *
   *     if (!this.doc.version) {
   *       errors.push({
   *         path: 'version',
   *         message: 'Version is required',
   *         code: 'REQUIRED_FIELD_MISSING'
   *       });
   *     }
   *
   *     return { valid: errors.length === 0, errors };
   *   }
   * }
   * ```
   */
  abstract validate(): ValidationResult;

  /**
   * Get a copy of the document as a JavaScript object.
   *
   * This method returns a shallow copy of the internal document to prevent
   * external modifications from affecting the internal state.
   *
   * @returns A copy of the document object.
   *
   * @since 2.0.0
   *
   * @example
   * ```typescript
   * const spec = new MyApiSpec({ version: '1.0.0', title: 'My API' });
   * const doc = spec.getDocument();
   * console.log(doc); // { version: '1.0.0', title: 'My API' }
   *
   * // Modifications to the returned object don't affect the original
   * doc.version = '2.0.0';
   * console.log(spec.getDocument().version); // Still '1.0.0'
   * ```
   */
  getDocument(): BaseDocument {
    return { ...this.doc };
  }

  /**
   * Get the document as a JSON string representation.
   *
   * This method serializes the internal document to a JSON string, with optional
   * pretty-printing for human readability.
   *
   * @param pretty - Whether to format the JSON with 2-space indentation for readability.
   *                 Defaults to `false` for compact output.
   * @returns JSON string representation of the document.
   *
   * @since 2.0.0
   *
   * @example
   * ```typescript
   * const spec = new MyApiSpec({ version: '1.0.0', title: 'My API' });
   *
   * // Compact JSON
   * const compact = spec.getDocumentAsJson();
   * // '{"version":"1.0.0","title":"My API"}'
   *
   * // Pretty-printed JSON
   * const pretty = spec.getDocumentAsJson(true);
   * // {
   * //   "version": "1.0.0",
   * //   "title": "My API"
   * // }
   * ```
   */
  getDocumentAsJson(pretty: boolean = false): string {
    return JSON.stringify(this.doc, null, pretty ? 2 : 0);
  }
}
