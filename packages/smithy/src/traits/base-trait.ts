/**
 * Base trait class for Smithy traits
 * @module traits/base-trait
 */

import type { ShapeId } from '../types.js';

/**
 * Base class for all Smithy traits
 * Provides common functionality for trait implementations
 */
export abstract class BaseTrait {
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
  constructor(id: string, value: unknown) {
    this.id = id;
    this.value = value;
  }

  /**
   * Get the trait as a plain object
   * @returns Object representation of the trait
   */
  toObject(): { id: string; value: unknown } {
    return {
      id: this.id,
      value: this.value,
    };
  }

  /**
   * Get the trait value
   * @returns The trait value
   */
  getValue(): unknown {
    return this.value;
  }

  /**
   * Get the trait ID
   * @returns The trait ID
   */
  getId(): string {
    return this.id;
  }

  /**
   * Convert trait to JSON
   * @returns JSON representation
   */
  toJSON(): unknown {
    return this.value;
  }

  /**
   * Convert trait to string
   * @returns String representation
   */
  toString(): string {
    return `${this.id}: ${JSON.stringify(this.value)}`;
  }
}

/**
 * Marker trait - a trait with no value (empty object)
 */
export class MarkerTrait extends BaseTrait {
  constructor(id: string) {
    super(id, {});
  }

  /**
   * Marker traits always return an empty object
   */
  toJSON(): Record<string, never> {
    return {};
  }
}

/**
 * String trait - a trait with a string value
 */
export class StringTrait extends BaseTrait {
  readonly value: string;

  constructor(id: string, value: string) {
    super(id, value);
    this.value = value;
  }

  getValue(): string {
    return this.value;
  }

  toJSON(): string {
    return this.value;
  }
}

/**
 * Number trait - a trait with a numeric value
 */
export class NumberTrait extends BaseTrait {
  readonly value: number;

  constructor(id: string, value: number) {
    super(id, value);
    this.value = value;
  }

  getValue(): number {
    return this.value;
  }

  toJSON(): number {
    return this.value;
  }
}

/**
 * Object trait - a trait with an object value
 */
export class ObjectTrait<
  T extends Record<string, unknown> = Record<string, unknown>,
> extends BaseTrait {
  readonly value: T;

  constructor(id: string, value: T) {
    super(id, value);
    this.value = value;
  }

  getValue(): T {
    return this.value;
  }

  toJSON(): T {
    return this.value;
  }
}

/**
 * Array trait - a trait with an array value
 */
export class ArrayTrait extends BaseTrait {
  readonly value: unknown[];

  constructor(id: string, value: unknown[]) {
    super(id, value);
    this.value = value;
  }

  getValue(): unknown[] {
    return this.value;
  }

  toJSON(): unknown[] {
    return this.value;
  }
}

/**
 * Shape reference trait - a trait that references another shape
 */
export class ShapeReferenceTrait extends BaseTrait {
  readonly value: ShapeId;

  constructor(id: string, value: ShapeId) {
    super(id, value);
    this.value = value;
  }

  getValue(): ShapeId {
    return this.value;
  }

  getShapeId(): ShapeId {
    return this.value;
  }

  toJSON(): ShapeId {
    return this.value;
  }
}
