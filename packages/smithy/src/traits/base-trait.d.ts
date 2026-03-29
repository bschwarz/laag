/**
 * Base trait class for Smithy traits
 * @module traits/base-trait
 */
import type { ShapeId } from '../types.js';
/**
 * Base class for all Smithy traits
 * Provides common functionality for trait implementations
 */
export declare abstract class BaseTrait {
  /**
   * The trait ID (e.g., "smithy.api#http")
   */
  readonly id: string;
  /**
   * The trait value
   */
  readonly value: unknown;
  /**
   * Create a new trait
   * @param id - The trait ID
   * @param value - The trait value
   */
  constructor(id: string, value: unknown);
  /**
   * Get the trait as a plain object
   * @returns Object representation of the trait
   */
  toObject(): {
    id: string;
    value: unknown;
  };
  /**
   * Get the trait value
   * @returns The trait value
   */
  getValue(): unknown;
  /**
   * Get the trait ID
   * @returns The trait ID
   */
  getId(): string;
  /**
   * Convert trait to JSON
   * @returns JSON representation
   */
  toJSON(): unknown;
  /**
   * Convert trait to string
   * @returns String representation
   */
  toString(): string;
}
/**
 * Marker trait - a trait with no value (empty object)
 */
export declare class MarkerTrait extends BaseTrait {
  constructor(id: string);
  /**
   * Marker traits always return an empty object
   */
  toJSON(): Record<string, never>;
}
/**
 * String trait - a trait with a string value
 */
export declare class StringTrait extends BaseTrait {
  readonly value: string;
  constructor(id: string, value: string);
  getValue(): string;
  toJSON(): string;
}
/**
 * Number trait - a trait with a numeric value
 */
export declare class NumberTrait extends BaseTrait {
  readonly value: number;
  constructor(id: string, value: number);
  getValue(): number;
  toJSON(): number;
}
/**
 * Object trait - a trait with an object value
 */
export declare class ObjectTrait<
  T extends Record<string, unknown> = Record<string, unknown>,
> extends BaseTrait {
  readonly value: T;
  constructor(id: string, value: T);
  getValue(): T;
  toJSON(): T;
}
/**
 * Array trait - a trait with an array value
 */
export declare class ArrayTrait extends BaseTrait {
  readonly value: unknown[];
  constructor(id: string, value: unknown[]);
  getValue(): unknown[];
  toJSON(): unknown[];
}
/**
 * Shape reference trait - a trait that references another shape
 */
export declare class ShapeReferenceTrait extends BaseTrait {
  readonly value: ShapeId;
  constructor(id: string, value: ShapeId);
  getValue(): ShapeId;
  getShapeId(): ShapeId;
  toJSON(): ShapeId;
}
//# sourceMappingURL=base-trait.d.ts.map
