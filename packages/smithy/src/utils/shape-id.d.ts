/**
 * Shape ID utilities for parsing, validating, and comparing Smithy shape IDs
 * @module utils/shape-id
 */
import type { ShapeId } from '../types';
/**
 * Parsed shape ID components
 */
export interface ParsedShapeId {
  /** Namespace (e.g., "smithy.api" or "example.weather") */
  namespace?: string;
  /** Shape name (e.g., "String" or "GetWeather") */
  name: string;
  /** Original shape ID string */
  original: string;
}
/**
 * Parse a shape ID into its components
 *
 * Shape IDs can be in two formats:
 * - Absolute: "namespace#ShapeName" (e.g., "smithy.api#String")
 * - Relative: "ShapeName" (e.g., "String")
 *
 * @param shapeId - The shape ID to parse
 * @returns Parsed shape ID components
 *
 * @example
 * ```typescript
 * parseShapeId("smithy.api#String")
 * // Returns: { namespace: "smithy.api", name: "String", original: "smithy.api#String" }
 *
 * parseShapeId("MyShape")
 * // Returns: { namespace: undefined, name: "MyShape", original: "MyShape" }
 * ```
 */
export declare function parseShapeId(shapeId: ShapeId): ParsedShapeId;
/**
 * Validate a shape ID format
 *
 * Valid shape IDs must:
 * - Not be empty
 * - Have a valid name (alphanumeric, underscore, starts with letter or underscore)
 * - If absolute, have a valid namespace (alphanumeric, dot, underscore)
 * - Have exactly one '#' separator if absolute
 *
 * @param shapeId - The shape ID to validate
 * @returns True if valid, false otherwise
 *
 * @example
 * ```typescript
 * isValidShapeId("smithy.api#String")  // true
 * isValidShapeId("MyShape")            // true
 * isValidShapeId("my.namespace#Shape") // true
 * isValidShapeId("")                   // false
 * isValidShapeId("#NoNamespace")       // false
 * isValidShapeId("Invalid#Name#")      // false
 * ```
 */
export declare function isValidShapeId(shapeId: ShapeId): boolean;
/**
 * Check if a shape ID is absolute (has a namespace)
 *
 * @param shapeId - The shape ID to check
 * @returns True if absolute, false if relative
 *
 * @example
 * ```typescript
 * isAbsoluteShapeId("smithy.api#String")  // true
 * isAbsoluteShapeId("MyShape")            // false
 * ```
 */
export declare function isAbsoluteShapeId(shapeId: ShapeId): boolean;
/**
 * Check if a shape ID is relative (no namespace)
 *
 * @param shapeId - The shape ID to check
 * @returns True if relative, false if absolute
 *
 * @example
 * ```typescript
 * isRelativeShapeId("MyShape")            // true
 * isRelativeShapeId("smithy.api#String")  // false
 * ```
 */
export declare function isRelativeShapeId(shapeId: ShapeId): boolean;
/**
 * Get the namespace from a shape ID
 *
 * @param shapeId - The shape ID
 * @returns The namespace, or undefined if relative
 *
 * @example
 * ```typescript
 * getNamespace("smithy.api#String")  // "smithy.api"
 * getNamespace("MyShape")            // undefined
 * ```
 */
export declare function getNamespace(shapeId: ShapeId): string | undefined;
/**
 * Get the name from a shape ID
 *
 * @param shapeId - The shape ID
 * @returns The shape name
 *
 * @example
 * ```typescript
 * getName("smithy.api#String")  // "String"
 * getName("MyShape")            // "MyShape"
 * ```
 */
export declare function getName(shapeId: ShapeId): string;
/**
 * Create an absolute shape ID from namespace and name
 *
 * @param namespace - The namespace
 * @param name - The shape name
 * @returns The absolute shape ID
 *
 * @example
 * ```typescript
 * createShapeId("smithy.api", "String")  // "smithy.api#String"
 * ```
 */
export declare function createShapeId(namespace: string, name: string): ShapeId;
/**
 * Convert a relative shape ID to absolute using a default namespace
 *
 * @param shapeId - The shape ID (relative or absolute)
 * @param defaultNamespace - The namespace to use if shape ID is relative
 * @returns The absolute shape ID
 *
 * @example
 * ```typescript
 * toAbsoluteShapeId("MyShape", "example.weather")
 * // Returns: "example.weather#MyShape"
 *
 * toAbsoluteShapeId("smithy.api#String", "example.weather")
 * // Returns: "smithy.api#String" (already absolute)
 * ```
 */
export declare function toAbsoluteShapeId(shapeId: ShapeId, defaultNamespace: string): ShapeId;
/**
 * Compare two shape IDs for equality
 *
 * @param a - First shape ID
 * @param b - Second shape ID
 * @returns True if equal, false otherwise
 *
 * @example
 * ```typescript
 * equalsShapeId("smithy.api#String", "smithy.api#String")  // true
 * equalsShapeId("MyShape", "MyShape")                      // true
 * equalsShapeId("smithy.api#String", "MyShape")            // false
 * ```
 */
export declare function equalsShapeId(a: ShapeId, b: ShapeId): boolean;
/**
 * Compare two shape IDs, considering a default namespace for relative IDs
 *
 * @param a - First shape ID
 * @param b - Second shape ID
 * @param defaultNamespace - Default namespace for relative IDs
 * @returns True if equal when both are made absolute, false otherwise
 *
 * @example
 * ```typescript
 * equalsShapeIdWithNamespace("MyShape", "example#MyShape", "example")
 * // Returns: true
 *
 * equalsShapeIdWithNamespace("MyShape", "other#MyShape", "example")
 * // Returns: false
 * ```
 */
export declare function equalsShapeIdWithNamespace(
  a: ShapeId,
  b: ShapeId,
  defaultNamespace: string
): boolean;
/**
 * Check if a shape ID matches a namespace
 *
 * @param shapeId - The shape ID to check
 * @param namespace - The namespace to match
 * @returns True if the shape ID belongs to the namespace
 *
 * @example
 * ```typescript
 * matchesNamespace("smithy.api#String", "smithy.api")  // true
 * matchesNamespace("example#MyShape", "smithy.api")    // false
 * matchesNamespace("MyShape", "smithy.api")            // false (relative)
 * ```
 */
export declare function matchesNamespace(shapeId: ShapeId, namespace: string): boolean;
/**
 * Extract all unique namespaces from a collection of shape IDs
 *
 * @param shapeIds - Array of shape IDs
 * @returns Array of unique namespaces (excludes relative IDs)
 *
 * @example
 * ```typescript
 * extractNamespaces([
 *   "smithy.api#String",
 *   "example.weather#GetWeather",
 *   "example.weather#City",
 *   "MyShape"
 * ])
 * // Returns: ["smithy.api", "example.weather"]
 * ```
 */
export declare function extractNamespaces(shapeIds: ShapeId[]): string[];
/**
 * Filter shape IDs by namespace
 *
 * @param shapeIds - Array of shape IDs
 * @param namespace - The namespace to filter by
 * @returns Array of shape IDs matching the namespace
 *
 * @example
 * ```typescript
 * filterByNamespace([
 *   "smithy.api#String",
 *   "example.weather#GetWeather",
 *   "example.weather#City"
 * ], "example.weather")
 * // Returns: ["example.weather#GetWeather", "example.weather#City"]
 * ```
 */
export declare function filterByNamespace(shapeIds: ShapeId[], namespace: string): ShapeId[];
/**
 * Sort shape IDs alphabetically
 * Sorts by namespace first, then by name
 * Relative IDs come before absolute IDs
 *
 * @param shapeIds - Array of shape IDs to sort
 * @returns Sorted array of shape IDs
 *
 * @example
 * ```typescript
 * sortShapeIds([
 *   "example.weather#City",
 *   "MyShape",
 *   "smithy.api#String",
 *   "example.weather#GetWeather"
 * ])
 * // Returns: [
 * //   "MyShape",
 * //   "example.weather#City",
 * //   "example.weather#GetWeather",
 * //   "smithy.api#String"
 * // ]
 * ```
 */
export declare function sortShapeIds(shapeIds: ShapeId[]): ShapeId[];
//# sourceMappingURL=shape-id.d.ts.map
