/**
 * ResourceShape - Represents a Smithy resource shape
 * @module shapes/resource
 */
import type { ResourceShape as IResourceShape, ShapeId } from '../types';
import { BaseShape } from './base-shape';
/**
 * Represents a Smithy resource shape
 * Resources define entities with lifecycle operations
 */
export declare class ResourceShape extends BaseShape {
  identifiers?: Record<string, ShapeId>;
  properties?: Record<string, ShapeId>;
  create?: ShapeId;
  put?: ShapeId;
  read?: ShapeId;
  update?: ShapeId;
  delete?: ShapeId;
  list?: ShapeId;
  operations?: ShapeId[];
  collectionOperations?: ShapeId[];
  resources?: ShapeId[];
  /**
   * Create a new ResourceShape
   * @param identifiers - Optional resource identifiers
   * @param properties - Optional resource properties
   * @param traits - Optional traits applied to the shape
   */
  constructor(
    identifiers?: Record<string, ShapeId>,
    properties?: Record<string, ShapeId>,
    traits?: Record<string, unknown>
  );
  /**
   * Set a lifecycle operation
   * @param operation - The operation type (create, put, read, update, delete, list)
   * @param operationId - The operation shape ID
   */
  setLifecycleOperation(
    operation: 'create' | 'put' | 'read' | 'update' | 'delete' | 'list',
    operationId: ShapeId
  ): void;
  /**
   * Get a lifecycle operation
   * @param operation - The operation type
   * @returns The operation shape ID, or undefined if not set
   */
  getLifecycleOperation(
    operation: 'create' | 'put' | 'read' | 'update' | 'delete' | 'list'
  ): ShapeId | undefined;
  /**
   * Add an instance operation
   * @param operationId - The operation shape ID
   */
  addOperation(operationId: ShapeId): void;
  /**
   * Remove an instance operation
   * @param operationId - The operation shape ID to remove
   * @returns True if the operation was removed, false if it didn't exist
   */
  removeOperation(operationId: ShapeId): boolean;
  /**
   * Get all instance operations
   * @returns Array of operation shape IDs
   */
  getOperations(): ShapeId[];
  /**
   * Add a collection operation
   * @param operationId - The operation shape ID
   */
  addCollectionOperation(operationId: ShapeId): void;
  /**
   * Remove a collection operation
   * @param operationId - The operation shape ID to remove
   * @returns True if the operation was removed, false if it didn't exist
   */
  removeCollectionOperation(operationId: ShapeId): boolean;
  /**
   * Get all collection operations
   * @returns Array of operation shape IDs
   */
  getCollectionOperations(): ShapeId[];
  /**
   * Add a child resource
   * @param resourceId - The resource shape ID
   */
  addResource(resourceId: ShapeId): void;
  /**
   * Remove a child resource
   * @param resourceId - The resource shape ID to remove
   * @returns True if the resource was removed, false if it didn't exist
   */
  removeResource(resourceId: ShapeId): boolean;
  /**
   * Get all child resources
   * @returns Array of resource shape IDs
   */
  getResources(): ShapeId[];
  /**
   * Convert the shape to a plain object
   * @returns Plain object representation
   */
  toObject(): IResourceShape;
}
//# sourceMappingURL=resource.d.ts.map
