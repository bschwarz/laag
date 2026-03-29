/**
 * Smithy selector utilities for querying shapes
 *
 * Smithy selectors provide a way to query and filter shapes in a model.
 * This implementation supports basic selector syntax.
 *
 * @module utils/selector
 */
import type { Shape, ShapeId, ShapeType } from '../types';
/**
 * Selector token types
 */
type SelectorTokenType =
  | 'wildcard'
  | 'type'
  | 'trait'
  | 'attribute'
  | 'descendant'
  | 'neighbor'
  | 'and'
  | 'or'
  | 'not';
/**
 * Parsed selector token
 */
interface SelectorToken {
  type: SelectorTokenType;
  value?: string;
  operator?: '=' | '!=' | '^=' | '$=' | '*=' | '~=';
  argument?: string;
}
/**
 * Selector context for matching
 */
export interface SelectorContext {
  /** All shapes in the model */
  shapes: Map<ShapeId, Shape>;
  /** Current shape being evaluated */
  currentShape?: Shape;
  /** Current shape ID being evaluated */
  currentShapeId?: ShapeId;
}
/**
 * Selector match result
 */
export interface SelectorMatch {
  /** Shape ID that matched */
  shapeId: ShapeId;
  /** Shape that matched */
  shape: Shape;
}
/**
 * Parse a selector string into tokens
 *
 * @param selector - The selector string
 * @returns Array of selector tokens
 *
 * @example
 * ```typescript
 * parseSelector("structure")
 * parseSelector("*")
 * parseSelector("[trait|required]")
 * parseSelector("service > operation")
 * ```
 */
export declare function parseSelector(selector: string): SelectorToken[];
/**
 * Match a shape against a selector
 *
 * @param shape - The shape to match
 * @param shapeId - The shape ID
 * @param selector - The selector string or tokens
 * @param context - The selector context
 * @returns True if the shape matches the selector
 *
 * @example
 * ```typescript
 * matchSelector(shape, shapeId, "structure", context)
 * matchSelector(shape, shapeId, "[trait|required]", context)
 * ```
 */
export declare function matchSelector(
  shape: Shape,
  shapeId: ShapeId,
  selector: string | SelectorToken[],
  context: SelectorContext
): boolean;
/**
 * Select shapes from a model using a selector
 *
 * @param selector - The selector string
 * @param shapes - Map of shape IDs to shapes
 * @returns Array of matching shapes with their IDs
 *
 * @example
 * ```typescript
 * // Select all structures
 * selectShapes("structure", shapesMap)
 *
 * // Select all shapes with required trait
 * selectShapes("[trait|required]", shapesMap)
 *
 * // Select all shapes
 * selectShapes("*", shapesMap)
 * ```
 */
export declare function selectShapes(
  selector: string,
  shapes: Map<ShapeId, Shape>
): SelectorMatch[];
/**
 * Select shapes by type
 *
 * @param shapeType - The shape type to select
 * @param shapes - Map of shape IDs to shapes
 * @returns Array of matching shapes with their IDs
 *
 * @example
 * ```typescript
 * selectByType("structure", shapesMap)
 * selectByType("service", shapesMap)
 * ```
 */
export declare function selectByType(
  shapeType: ShapeType,
  shapes: Map<ShapeId, Shape>
): SelectorMatch[];
/**
 * Select shapes by trait
 *
 * @param traitId - The trait ID to select by
 * @param shapes - Map of shape IDs to shapes
 * @returns Array of matching shapes with their IDs
 *
 * @example
 * ```typescript
 * selectByTrait("required", shapesMap)
 * selectByTrait("smithy.api#http", shapesMap)
 * ```
 */
export declare function selectByTrait(
  traitId: string,
  shapes: Map<ShapeId, Shape>
): SelectorMatch[];
/**
 * Select shapes by namespace
 *
 * @param namespace - The namespace to select by
 * @param shapes - Map of shape IDs to shapes
 * @returns Array of matching shapes with their IDs
 *
 * @example
 * ```typescript
 * selectByNamespace("example.weather", shapesMap)
 * selectByNamespace("smithy.api", shapesMap)
 * ```
 */
export declare function selectByNamespace(
  namespace: string,
  shapes: Map<ShapeId, Shape>
): SelectorMatch[];
/**
 * Create a selector query builder for fluent API
 *
 * @param shapes - Map of shape IDs to shapes
 * @returns Selector query builder
 *
 * @example
 * ```typescript
 * const query = createSelectorQuery(shapesMap);
 *
 * // Select all structures
 * query.type("structure").execute();
 *
 * // Select shapes with trait
 * query.trait("required").execute();
 *
 * // Chain multiple conditions
 * query.type("structure").trait("required").execute();
 * ```
 */
type SelectorQueryBuilder = {
  type: (shapeType: ShapeType) => SelectorQueryBuilder;
  trait: (traitId: string) => SelectorQueryBuilder;
  namespace: (namespace: string) => SelectorQueryBuilder;
  filter: (predicate: (match: SelectorMatch) => boolean) => SelectorQueryBuilder;
  execute: () => SelectorMatch[];
  shapeIds: () => ShapeId[];
  shapes: () => Shape[];
  count: () => number;
  first: () => SelectorMatch | undefined;
};
export declare function createSelectorQuery(shapes: Map<ShapeId, Shape>): SelectorQueryBuilder;
/**
 * Validate a selector string
 *
 * @param selector - The selector string to validate
 * @returns True if valid, false otherwise
 *
 * @example
 * ```typescript
 * isValidSelector("structure")           // true
 * isValidSelector("*")                   // true
 * isValidSelector("[trait|required]")    // true
 * isValidSelector("invalid syntax")      // false
 * ```
 */
export declare function isValidSelector(selector: string): boolean;
export {};
//# sourceMappingURL=selector.d.ts.map
