/**
 * Base class for all laag library implementations
 */

import { ParseError, ValidationError } from './errors.js';
import { BaseDocument, ErrorHandlingOptions, ExtensionObject, ValidationResult } from './types.js';

/**
 * Abstract base class that provides common functionality for all API specification libraries
 */
export abstract class LaagBase {
  protected doc: BaseDocument;
  protected errorOptions: ErrorHandlingOptions;

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
   * Check if all specified keys exist in an object
   * @param obj - The object to check
   * @param keys - The keys to check for
   * @returns true if all keys exist, false otherwise
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
   * Get extension properties (x-* properties) from a specific level or the root document
   * @param level - Optional path to a specific level in the document (e.g., 'info', 'paths./users')
   * @returns Object containing all extension properties
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
   * Set extension properties (x-* properties) at a specific level or the root document
   * @param values - Object containing extension properties to set
   * @param level - Optional path to a specific level in the document
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
   * Get a nested value from an object using dot notation
   * @param obj - The object to traverse
   * @param path - The path to the value (e.g., 'info.title')
   * @returns The value at the specified path, or undefined if not found
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
   * Set a nested value in an object using dot notation
   * @param obj - The object to modify
   * @param path - The path to set (e.g., 'info.title')
   * @param value - The value to set
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
   * Validate the document structure (to be implemented by subclasses)
   * @returns Validation result with any errors found
   */
  abstract validate(): ValidationResult;

  /**
   * Get the document as a JavaScript object
   * @returns The document object
   */
  getDocument(): BaseDocument {
    return { ...this.doc };
  }

  /**
   * Get the document as a JSON string
   * @param pretty - Whether to format the JSON with indentation
   * @returns JSON string representation of the document
   */
  getDocumentAsJson(pretty: boolean = false): string {
    return JSON.stringify(this.doc, null, pretty ? 2 : 0);
  }
}
