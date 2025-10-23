/**
 * Smithy selector utilities for querying shapes
 *
 * Smithy selectors provide a way to query and filter shapes in a model.
 * This implementation supports basic selector syntax.
 *
 * @module utils/selector
 */

import type { Shape, ShapeId, ShapeType } from '../types';
import { matchesNamespace, parseShapeId } from './shape-id';

/**
 * Selector token types
 */
type SelectorTokenType =
  | 'wildcard' // *
  | 'type' // structure, service, etc.
  | 'trait' // [trait|traitName]
  | 'attribute' // [id|namespace = value]
  | 'descendant' // >
  | 'neighbor' // ~
  | 'and' // :test()
  | 'or' // ,
  | 'not'; // :not()

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
export function parseSelector(selector: string): SelectorToken[] {
  const tokens: SelectorToken[] = [];
  const trimmed = selector.trim();

  if (!trimmed) {
    return tokens;
  }

  // Simple wildcard selector
  if (trimmed === '*') {
    tokens.push({ type: 'wildcard' });
    return tokens;
  }

  // Shape type selector (e.g., "structure", "service", "operation")
  const shapeTypes: ShapeType[] = [
    'blob',
    'boolean',
    'string',
    'byte',
    'short',
    'integer',
    'long',
    'float',
    'double',
    'bigInteger',
    'bigDecimal',
    'timestamp',
    'document',
    'list',
    'set',
    'map',
    'structure',
    'union',
    'service',
    'operation',
    'resource',
  ];

  if (shapeTypes.includes(trimmed as ShapeType)) {
    tokens.push({ type: 'type', value: trimmed });
    return tokens;
  }

  // Trait selector (e.g., "[trait|required]", "[trait|smithy.api#required]")
  const traitMatch = trimmed.match(/^\[trait\|([^\]]+)\]$/);
  if (traitMatch) {
    tokens.push({ type: 'trait', value: traitMatch[1] });
    return tokens;
  }

  // Attribute selector (e.g., "[id|namespace = example]")
  const attrMatch = trimmed.match(/^\[id\|namespace\s*([=!^$*~]+)\s*([^\]]+)\]$/);
  if (attrMatch) {
    tokens.push({
      type: 'attribute',
      value: 'namespace',
      operator: attrMatch[1] as '=' | '!=' | '^=' | '$=' | '*=' | '~=',
      argument: attrMatch[2]?.trim(),
    });
    return tokens;
  }

  // For more complex selectors, split by spaces and parse each part
  const parts = trimmed.split(/\s+/);
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];

    if (part === '*') {
      tokens.push({ type: 'wildcard' });
    } else if (part === '>') {
      tokens.push({ type: 'descendant' });
    } else if (part === '~') {
      tokens.push({ type: 'neighbor' });
    } else if (shapeTypes.includes(part as ShapeType)) {
      tokens.push({ type: 'type', value: part });
    } else if (part?.startsWith('[trait|')) {
      const traitName = part.substring(7, part.length - 1);
      tokens.push({ type: 'trait', value: traitName });
    }
  }

  return tokens;
}

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
export function matchSelector(
  shape: Shape,
  shapeId: ShapeId,
  selector: string | SelectorToken[],
  context: SelectorContext
): boolean {
  const tokens = typeof selector === 'string' ? parseSelector(selector) : selector;

  if (tokens.length === 0) {
    return false;
  }

  // For simple single-token selectors
  if (tokens.length === 1 && tokens[0]) {
    return matchSingleToken(shape, shapeId, tokens[0], context);
  }

  // For multi-token selectors, check if all tokens match
  // This is a simplified implementation - full Smithy selectors are more complex
  return tokens.every(token => matchSingleToken(shape, shapeId, token, context));
}

/**
 * Match a shape against a single selector token
 */
function matchSingleToken(
  shape: Shape,
  shapeId: ShapeId,
  token: SelectorToken,
  _context: SelectorContext
): boolean {
  switch (token.type) {
    case 'wildcard':
      return true;

    case 'type':
      return shape.type === token.value;

    case 'trait':
      return token.value ? hasTrait(shape, token.value) : false;

    case 'attribute':
      if (token.value === 'namespace' && token.operator === '=') {
        const parsed = parseShapeId(shapeId);
        return parsed.namespace === token.argument;
      }
      return false;

    default:
      return false;
  }
}

/**
 * Check if a shape has a specific trait
 */
function hasTrait(shape: Shape, traitId: string): boolean {
  if (!shape.traits) {
    return false;
  }

  // Check for exact match
  if (traitId in shape.traits) {
    return true;
  }

  // Check for short form (e.g., "required" matches "smithy.api#required")
  const shortFormKey = `smithy.api#${traitId}`;
  if (shortFormKey in shape.traits) {
    return true;
  }

  return false;
}

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
export function selectShapes(selector: string, shapes: Map<ShapeId, Shape>): SelectorMatch[] {
  const tokens = parseSelector(selector);
  const matches: SelectorMatch[] = [];

  const context: SelectorContext = { shapes };

  for (const [shapeId, shape] of shapes) {
    context.currentShape = shape;
    context.currentShapeId = shapeId;

    if (matchSelector(shape, shapeId, tokens, context)) {
      matches.push({ shapeId, shape });
    }
  }

  return matches;
}

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
export function selectByType(shapeType: ShapeType, shapes: Map<ShapeId, Shape>): SelectorMatch[] {
  return selectShapes(shapeType, shapes);
}

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
export function selectByTrait(traitId: string, shapes: Map<ShapeId, Shape>): SelectorMatch[] {
  return selectShapes(`[trait|${traitId}]`, shapes);
}

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
export function selectByNamespace(namespace: string, shapes: Map<ShapeId, Shape>): SelectorMatch[] {
  const matches: SelectorMatch[] = [];

  for (const [shapeId, shape] of shapes) {
    if (matchesNamespace(shapeId, namespace)) {
      matches.push({ shapeId, shape });
    }
  }

  return matches;
}

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
// Define the query builder type
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

export function createSelectorQuery(shapes: Map<ShapeId, Shape>): SelectorQueryBuilder {
  let currentMatches: SelectorMatch[] = Array.from(shapes.entries()).map(([shapeId, shape]) => ({
    shapeId,
    shape,
  }));

  const query: SelectorQueryBuilder = {
    /**
     * Filter by shape type
     */
    type(shapeType: ShapeType): SelectorQueryBuilder {
      currentMatches = currentMatches.filter(m => m.shape.type === shapeType);
      return query;
    },

    /**
     * Filter by trait
     */
    trait(traitId: string): SelectorQueryBuilder {
      currentMatches = currentMatches.filter(m => hasTrait(m.shape, traitId));
      return query;
    },

    /**
     * Filter by namespace
     */
    namespace(namespace: string): SelectorQueryBuilder {
      currentMatches = currentMatches.filter(m => matchesNamespace(m.shapeId, namespace));
      return query;
    },

    /**
     * Filter by custom predicate
     */
    filter(predicate: (match: SelectorMatch) => boolean): SelectorQueryBuilder {
      currentMatches = currentMatches.filter(predicate);
      return query;
    },

    /**
     * Execute the query and return results
     */
    execute(): SelectorMatch[] {
      return currentMatches;
    },

    /**
     * Get shape IDs only
     */
    shapeIds(): ShapeId[] {
      return currentMatches.map(m => m.shapeId);
    },

    /**
     * Get shapes only
     */
    shapes(): Shape[] {
      return currentMatches.map(m => m.shape);
    },

    /**
     * Get count of matches
     */
    count(): number {
      return currentMatches.length;
    },

    /**
     * Get first match
     */
    first(): SelectorMatch | undefined {
      return currentMatches[0];
    },
  };

  return query;
}

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
export function isValidSelector(selector: string): boolean {
  try {
    const tokens = parseSelector(selector);
    return tokens.length > 0;
  } catch {
    return false;
  }
}
