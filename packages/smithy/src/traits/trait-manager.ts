/**
 * TraitManager - Manages trait storage, retrieval, and operations
 * @module traits/trait-manager
 */

import type { ValidationResult } from '@laag/core';
import type {
  DocumentationTrait,
  HttpErrorTrait,
  HttpTrait,
  PaginatedTrait,
  Shape,
  ShapeId,
} from '../types.js';
import { SMITHY_TRAITS } from '../types.js';
import { TraitValidator } from '../validators/trait-validator.js';

/**
 * Manages traits for shapes in a Smithy model
 * Provides methods for accessing, adding, and validating traits
 */
export class TraitManager {
  private traits: Map<ShapeId, Map<string, unknown>>;
  private validator: TraitValidator;

  /**
   * Create a new TraitManager
   * @param shapes - Initial shapes to extract traits from
   */
  constructor(shapes: Record<ShapeId, Shape> = {}) {
    this.traits = new Map();
    this.validator = new TraitValidator();

    // Extract traits from shapes
    for (const [shapeId, shape] of Object.entries(shapes)) {
      if (shape.traits) {
        this.traits.set(shapeId, new Map(Object.entries(shape.traits)));
      }
    }
  }

  /**
   * Get all traits for a shape
   * @param shapeId - The shape ID
   * @returns Map of trait IDs to trait values, or undefined if shape has no traits
   */
  get(shapeId: ShapeId): Map<string, unknown> | undefined {
    const shapeTraits = this.traits.get(shapeId);
    if (!shapeTraits) {
      return undefined;
    }
    return new Map(shapeTraits);
  }

  /**
   * Check if a shape has a specific trait
   * @param shapeId - The shape ID
   * @param traitId - The trait ID to check
   * @returns True if the shape has the trait
   */
  has(shapeId: ShapeId, traitId: string): boolean {
    const shapeTraits = this.traits.get(shapeId);
    if (!shapeTraits) {
      return false;
    }
    return shapeTraits.has(traitId);
  }

  /**
   * Add a trait to a shape
   * @param shapeId - The shape ID
   * @param traitId - The trait ID
   * @param value - The trait value
   * @throws Error if trait validation fails
   */
  add(shapeId: ShapeId, traitId: string, value: unknown): void {
    // Validate the trait
    const validationResult = this.validateTrait(traitId, value);
    if (!validationResult.valid) {
      const errorMessages =
        validationResult.errors?.map(e => e.message).join(', ') || 'Unknown error';
      throw new Error(`Invalid trait "${traitId}": ${errorMessages}`);
    }

    // Get or create trait map for shape
    let shapeTraits = this.traits.get(shapeId);
    if (!shapeTraits) {
      shapeTraits = new Map();
      this.traits.set(shapeId, shapeTraits);
    }

    // Add the trait
    shapeTraits.set(traitId, value);
  }

  /**
   * Remove a trait from a shape
   * @param shapeId - The shape ID
   * @param traitId - The trait ID to remove
   * @returns True if the trait was removed, false if it didn't exist
   */
  remove(shapeId: ShapeId, traitId: string): boolean {
    const shapeTraits = this.traits.get(shapeId);
    if (!shapeTraits) {
      return false;
    }
    return shapeTraits.delete(traitId);
  }

  /**
   * Validate a trait
   * @param traitId - The trait ID
   * @param value - The trait value
   * @returns Validation result
   */
  validateTrait(traitId: string, value: unknown): ValidationResult {
    return this.validator.validate(traitId, value);
  }

  /**
   * Get the HTTP trait for a shape
   * @param shapeId - The shape ID
   * @returns The HTTP trait, or undefined if not present
   */
  getHttpTrait(shapeId: ShapeId): HttpTrait | undefined {
    const shapeTraits = this.traits.get(shapeId);
    if (!shapeTraits) {
      return undefined;
    }

    const httpTrait = shapeTraits.get(SMITHY_TRAITS.HTTP);
    if (!httpTrait) {
      return undefined;
    }

    return httpTrait as HttpTrait;
  }

  /**
   * Get the documentation for a shape
   * @param shapeId - The shape ID
   * @returns The documentation string, or undefined if not present
   */
  getDocumentation(shapeId: ShapeId): string | undefined {
    const shapeTraits = this.traits.get(shapeId);
    if (!shapeTraits) {
      return undefined;
    }

    const docTrait = shapeTraits.get(SMITHY_TRAITS.DOCUMENTATION);
    if (!docTrait) {
      return undefined;
    }

    // Documentation trait can be a string directly or an object with a value property
    if (typeof docTrait === 'string') {
      return docTrait;
    }

    if (typeof docTrait === 'object' && docTrait !== null) {
      const doc = docTrait as DocumentationTrait;
      return doc.value;
    }

    return undefined;
  }

  /**
   * Check if a shape is marked as required
   * @param shapeId - The shape ID
   * @returns True if the shape has the required trait
   */
  isRequired(shapeId: ShapeId): boolean {
    return this.has(shapeId, SMITHY_TRAITS.REQUIRED);
  }

  /**
   * Get the HTTP error trait for a shape
   * @param shapeId - The shape ID
   * @returns The HTTP error code, or undefined if not present
   */
  getHttpError(shapeId: ShapeId): number | undefined {
    const shapeTraits = this.traits.get(shapeId);
    if (!shapeTraits) {
      return undefined;
    }

    const errorTrait = shapeTraits.get(SMITHY_TRAITS.HTTP_ERROR);
    if (typeof errorTrait === 'number') {
      return errorTrait;
    }

    if (typeof errorTrait === 'object' && errorTrait !== null) {
      const error = errorTrait as HttpErrorTrait;
      return error.code;
    }

    return undefined;
  }

  /**
   * Check if a shape is marked as readonly
   * @param shapeId - The shape ID
   * @returns True if the shape has the readonly trait
   */
  isReadonly(shapeId: ShapeId): boolean {
    return this.has(shapeId, SMITHY_TRAITS.READONLY);
  }

  /**
   * Check if a shape is marked as idempotent
   * @param shapeId - The shape ID
   * @returns True if the shape has the idempotent trait
   */
  isIdempotent(shapeId: ShapeId): boolean {
    return this.has(shapeId, SMITHY_TRAITS.IDEMPOTENT);
  }

  /**
   * Get the paginated trait for a shape
   * @param shapeId - The shape ID
   * @returns The paginated trait, or undefined if not present
   */
  getPaginated(shapeId: ShapeId): PaginatedTrait | undefined {
    const shapeTraits = this.traits.get(shapeId);
    if (!shapeTraits) {
      return undefined;
    }

    const paginatedTrait = shapeTraits.get(SMITHY_TRAITS.PAGINATED);
    if (!paginatedTrait) {
      return undefined;
    }

    return paginatedTrait as PaginatedTrait;
  }

  /**
   * Get the HTTP label trait value for a shape
   * @param shapeId - The shape ID
   * @returns True if the shape has the HTTP label trait
   */
  hasHttpLabel(shapeId: ShapeId): boolean {
    return this.has(shapeId, SMITHY_TRAITS.HTTP_LABEL);
  }

  /**
   * Get the HTTP query parameter name for a shape
   * @param shapeId - The shape ID
   * @returns The query parameter name, or undefined if not present
   */
  getHttpQuery(shapeId: ShapeId): string | undefined {
    const shapeTraits = this.traits.get(shapeId);
    if (!shapeTraits) {
      return undefined;
    }

    const queryTrait = shapeTraits.get(SMITHY_TRAITS.HTTP_QUERY);
    if (typeof queryTrait === 'string') {
      return queryTrait;
    }

    return undefined;
  }

  /**
   * Get the HTTP header name for a shape
   * @param shapeId - The shape ID
   * @returns The header name, or undefined if not present
   */
  getHttpHeader(shapeId: ShapeId): string | undefined {
    const shapeTraits = this.traits.get(shapeId);
    if (!shapeTraits) {
      return undefined;
    }

    const headerTrait = shapeTraits.get(SMITHY_TRAITS.HTTP_HEADER);
    if (typeof headerTrait === 'string') {
      return headerTrait;
    }

    return undefined;
  }

  /**
   * Check if a shape has the HTTP payload trait
   * @param shapeId - The shape ID
   * @returns True if the shape has the HTTP payload trait
   */
  hasHttpPayload(shapeId: ShapeId): boolean {
    return this.has(shapeId, SMITHY_TRAITS.HTTP_PAYLOAD);
  }

  /**
   * Get all shapes that have a specific trait
   * @param traitId - The trait ID to search for
   * @returns Array of shape IDs that have the trait
   */
  findShapesByTrait(traitId: string): ShapeId[] {
    const result: ShapeId[] = [];
    for (const [shapeId, shapeTraits] of this.traits.entries()) {
      if (shapeTraits.has(traitId)) {
        result.push(shapeId);
      }
    }
    return result;
  }

  /**
   * Get a specific trait value for a shape
   * @param shapeId - The shape ID
   * @param traitId - The trait ID
   * @returns The trait value, or undefined if not present
   */
  getTrait(shapeId: ShapeId, traitId: string): unknown {
    const shapeTraits = this.traits.get(shapeId);
    if (!shapeTraits) {
      return undefined;
    }
    return shapeTraits.get(traitId);
  }

  /**
   * Clear all traits for a shape
   * @param shapeId - The shape ID
   */
  clearShape(shapeId: ShapeId): void {
    this.traits.delete(shapeId);
  }

  /**
   * Clear all traits
   */
  clear(): void {
    this.traits.clear();
  }

  /**
   * Convert traits to a plain object structure
   * @returns Record of shape IDs to trait records
   */
  toObject(): Record<ShapeId, Record<string, unknown>> {
    const result: Record<ShapeId, Record<string, unknown>> = {};
    for (const [shapeId, shapeTraits] of this.traits.entries()) {
      result[shapeId] = Object.fromEntries(shapeTraits);
    }
    return result;
  }
}
