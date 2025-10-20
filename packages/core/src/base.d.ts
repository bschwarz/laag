/**
 * Base class for all laag library implementations
 */
import { BaseDocument, ErrorHandlingOptions, ExtensionObject, ValidationResult } from './types.js';
/**
 * Abstract base class that provides common functionality for all API specification libraries
 */
export declare abstract class LaagBase {
  protected doc: BaseDocument;
  protected errorOptions: ErrorHandlingOptions;
  constructor(doc?: string | BaseDocument, errorOptions?: ErrorHandlingOptions);
  /**
   * Check if all specified keys exist in an object
   * @param obj - The object to check
   * @param keys - The keys to check for
   * @returns true if all keys exist, false otherwise
   */
  protected dictKeysExists(obj: Record<string, any>, ...keys: string[]): boolean;
  /**
   * Get extension properties (x-* properties) from a specific level or the root document
   * @param level - Optional path to a specific level in the document (e.g., 'info', 'paths./users')
   * @returns Object containing all extension properties
   */
  protected getExtensions(level?: string): ExtensionObject;
  /**
   * Set extension properties (x-* properties) at a specific level or the root document
   * @param values - Object containing extension properties to set
   * @param level - Optional path to a specific level in the document
   */
  protected setExtensions(values: ExtensionObject, level?: string): void;
  /**
   * Get a nested value from an object using dot notation
   * @param obj - The object to traverse
   * @param path - The path to the value (e.g., 'info.title')
   * @returns The value at the specified path, or undefined if not found
   */
  protected getNestedValue(obj: Record<string, any>, path: string): any;
  /**
   * Set a nested value in an object using dot notation
   * @param obj - The object to modify
   * @param path - The path to set (e.g., 'info.title')
   * @param value - The value to set
   */
  protected setNestedValue(obj: Record<string, any>, path: string, value: any): void;
  /**
   * Validate the document structure (to be implemented by subclasses)
   * @returns Validation result with any errors found
   */
  abstract validate(): ValidationResult;
  /**
   * Get the document as a JavaScript object
   * @returns The document object
   */
  getDocument(): BaseDocument;
  /**
   * Get the document as a JSON string
   * @param pretty - Whether to format the JSON with indentation
   * @returns JSON string representation of the document
   */
  getDocumentAsJson(pretty?: boolean): string;
}
//# sourceMappingURL=base.d.ts.map
