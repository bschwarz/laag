/**
 * TraitManager - Manages trait storage, retrieval, and operations
 * @module traits/trait-manager
 */
import type { ValidationResult } from '@laag/core';
import type { HttpTrait, PaginatedTrait, Shape, ShapeId } from '../types.js';
/**
 * Manages traits for shapes in a Smithy model
 * Provides methods for accessing, adding, and validating traits
 */
export declare class TraitManager {
  private traits;
  private validator;
  /**
   * Create a new TraitManager
   * @param shapes - Initial shapes to extract traits from
   */
  constructor(shapes?: Record<ShapeId, Shape>);
  /**
   * Get all traits for a shape
   * @param shapeId - The shape ID
   * @returns Map of trait IDs to trait values, or undefined if shape has no traits
   */
  get(shapeId: ShapeId): Map<string, unknown> | undefined;
  /**
   * Check if a shape has a specific trait
   * @param shapeId - The shape ID
   * @param traitId - The trait ID to check
   * @returns True if the shape has the trait
   */
  has(shapeId: ShapeId, traitId: string): boolean;
  /**
   * Add a trait to a shape
   * @param shapeId - The shape ID
   * @param traitId - The trait ID
   * @param value - The trait value
   * @throws Error if trait validation fails
   */
  add(shapeId: ShapeId, traitId: string, value: unknown): void;
  /**
   * Remove a trait from a shape
   * @param shapeId - The shape ID
   * @param traitId - The trait ID to remove
   * @returns True if the trait was removed, false if it didn't exist
   */
  remove(shapeId: ShapeId, traitId: string): boolean;
  /**
   * Validate a trait
   * @param traitId - The trait ID
   * @param value - The trait value
   * @returns Validation result
   */
  validateTrait(traitId: string, value: unknown): ValidationResult;
  /**
   * Get the HTTP trait for a shape
   * @param shapeId - The shape ID
   * @returns The HTTP trait, or undefined if not present
   */
  getHttpTrait(shapeId: ShapeId): HttpTrait | undefined;
  /**
   * Get the documentation for a shape
   * @param shapeId - The shape ID
   * @returns The documentation string, or undefined if not present
   */
  getDocumentation(shapeId: ShapeId): string | undefined;
  /**
   * Check if a shape is marked as required
   * @param shapeId - The shape ID
   * @returns True if the shape has the required trait
   */
  isRequired(shapeId: ShapeId): boolean;
  /**
   * Get the HTTP error trait for a shape
   * @param shapeId - The shape ID
   * @returns The HTTP error code, or undefined if not present
   */
  getHttpError(shapeId: ShapeId): number | undefined;
  /**
   * Check if a shape is marked as readonly
   * @param shapeId - The shape ID
   * @returns True if the shape has the readonly trait
   */
  isReadonly(shapeId: ShapeId): boolean;
  /**
   * Check if a shape is marked as idempotent
   * @param shapeId - The shape ID
   * @returns True if the shape has the idempotent trait
   */
  isIdempotent(shapeId: ShapeId): boolean;
  /**
   * Get the paginated trait for a shape
   * @param shapeId - The shape ID
   * @returns The paginated trait, or undefined if not present
   */
  getPaginated(shapeId: ShapeId): PaginatedTrait | undefined;
  /**
   * Get the HTTP label trait value for a shape
   * @param shapeId - The shape ID
   * @returns True if the shape has the HTTP label trait
   */
  hasHttpLabel(shapeId: ShapeId): boolean;
  /**
   * Get the HTTP query parameter name for a shape
   * @param shapeId - The shape ID
   * @returns The query parameter name, or undefined if not present
   */
  getHttpQuery(shapeId: ShapeId): string | undefined;
  /**
   * Get the HTTP header name for a shape
   * @param shapeId - The shape ID
   * @returns The header name, or undefined if not present
   */
  getHttpHeader(shapeId: ShapeId): string | undefined;
  /**
   * Check if a shape has the HTTP payload trait
   * @param shapeId - The shape ID
   * @returns True if the shape has the HTTP payload trait
   */
  hasHttpPayload(shapeId: ShapeId): boolean;
  /**
   * Get all shapes that have a specific trait
   * @param traitId - The trait ID to search for
   * @returns Array of shape IDs that have the trait
   */
  findShapesByTrait(traitId: string): ShapeId[];
  /**
   * Get a specific trait value for a shape
   * @param shapeId - The shape ID
   * @param traitId - The trait ID
   * @returns The trait value, or undefined if not present
   */
  getTrait(shapeId: ShapeId, traitId: string): unknown;
  /**
   * Clear all traits for a shape
   * @param shapeId - The shape ID
   */
  clearShape(shapeId: ShapeId): void;
  /**
   * Clear all traits
   */
  clear(): void;
  /**
   * Convert traits to a plain object structure
   * @returns Record of shape IDs to trait records
   */
  toObject(): Record<ShapeId, Record<string, unknown>>;
}
//# sourceMappingURL=trait-manager.d.ts.map
