/**
 * BaseShape - Base class for all Smithy shapes
 * @module shapes/base-shape
 */
import type { BaseShape as IBaseShape, ShapeType } from '../types';
/**
 * Base class for all Smithy shapes
 * Provides common functionality for shape manipulation
 */
export declare class BaseShape implements IBaseShape {
  type: ShapeType;
  traits?: Record<string, unknown>;
  /**
   * Create a new BaseShape
   * @param type - The shape type
   * @param traits - Optional traits applied to the shape
   */
  constructor(type: ShapeType, traits?: Record<string, unknown>);
  /**
   * Get a trait value by trait ID
   * @param traitId - The trait ID to retrieve
   * @returns The trait value, or undefined if not found
   */
  getTrait(traitId: string): unknown;
  /**
   * Check if the shape has a specific trait
   * @param traitId - The trait ID to check
   * @returns True if the trait exists
   */
  hasTrait(traitId: string): boolean;
  /**
   * Add or update a trait
   * @param traitId - The trait ID
   * @param value - The trait value
   */
  setTrait(traitId: string, value: unknown): void;
  /**
   * Remove a trait
   * @param traitId - The trait ID to remove
   * @returns True if the trait was removed, false if it didn't exist
   */
  removeTrait(traitId: string): boolean;
  /**
   * Get all trait IDs
   * @returns Array of trait IDs
   */
  getTraitIds(): string[];
  /**
   * Get all traits
   * @returns Record of all traits
   */
  getTraits(): Record<string, unknown>;
  /**
   * Convert the shape to a plain object
   * @returns Plain object representation
   */
  toObject(): IBaseShape;
}
//# sourceMappingURL=base-shape.d.ts.map
