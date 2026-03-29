/**
 * ShapeManager - Manages shape storage, retrieval, and queries
 * @module shapes/shape-manager
 */
import type { MemberShape, Shape, ShapeId, ShapeType } from '../types';
/**
 * Manages shapes in a Smithy model
 * Provides methods for storing, retrieving, and querying shapes
 */
export declare class ShapeManager {
  private shapes;
  /**
   * Create a new ShapeManager
   * @param shapes - Initial shapes as a record
   */
  constructor(shapes?: Record<ShapeId, Shape>);
  /**
   * Get a shape by its ID
   * @param shapeId - The shape ID to retrieve
   * @returns The shape, or undefined if not found
   */
  get(shapeId: ShapeId): Shape | undefined;
  /**
   * Get all shapes
   * @returns Map of all shapes keyed by shape ID
   */
  getAll(): Map<ShapeId, Shape>;
  /**
   * Get all shapes of a specific type
   * @param type - The shape type to filter by
   * @returns Array of shapes matching the type
   */
  getByType(type: ShapeType): Shape[];
  /**
   * Add a shape to the manager
   * @param shapeId - The shape ID
   * @param shape - The shape to add
   */
  add(shapeId: ShapeId, shape: Shape): void;
  /**
   * Remove a shape from the manager
   * @param shapeId - The shape ID to remove
   * @returns True if the shape was removed, false if it didn't exist
   */
  remove(shapeId: ShapeId): boolean;
  /**
   * Check if a shape exists
   * @param shapeId - The shape ID to check
   * @returns True if the shape exists
   */
  has(shapeId: ShapeId): boolean;
  /**
   * Resolve a target shape ID to its shape
   * Follows member references to get the actual shape
   * @param shapeId - The shape ID to resolve
   * @returns The resolved shape, or undefined if not found
   */
  resolveTarget(shapeId: ShapeId): Shape | undefined;
  /**
   * Get members of a structure or union shape
   * @param shapeId - The structure or union shape ID
   * @returns Map of member names to member shapes, or undefined if not a structure/union
   */
  getMembers(shapeId: ShapeId): Map<string, MemberShape> | undefined;
  /**
   * Find all shapes that have a specific trait
   * @param traitId - The trait ID to search for
   * @returns Array of shapes that have the trait
   */
  findShapesByTrait(traitId: string): Shape[];
  /**
   * Get the shape hierarchy for a shape
   * Returns an array of shape IDs representing the inheritance chain
   * For structures with mixins, returns the mixin chain
   * @param shapeId - The shape ID to get hierarchy for
   * @returns Array of shape IDs in the hierarchy (from base to derived)
   */
  getShapeHierarchy(shapeId: ShapeId): ShapeId[];
  /**
   * Get all shape IDs
   * @returns Array of all shape IDs
   */
  getShapeIds(): ShapeId[];
  /**
   * Get the count of shapes
   * @returns Number of shapes in the manager
   */
  size(): number;
  /**
   * Clear all shapes
   */
  clear(): void;
  /**
   * Convert shapes to a plain object
   * @returns Record of shapes keyed by shape ID
   */
  toObject(): Record<ShapeId, Shape>;
}
//# sourceMappingURL=shape-manager.d.ts.map
