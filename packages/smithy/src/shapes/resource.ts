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
export class ResourceShape extends BaseShape {
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
  ) {
    super('resource', traits);
    this.identifiers = identifiers;
    this.properties = properties;
  }

  /**
   * Set a lifecycle operation
   * @param operation - The operation type (create, put, read, update, delete, list)
   * @param operationId - The operation shape ID
   */
  setLifecycleOperation(
    operation: 'create' | 'put' | 'read' | 'update' | 'delete' | 'list',
    operationId: ShapeId
  ): void {
    this[operation] = operationId;
  }

  /**
   * Get a lifecycle operation
   * @param operation - The operation type
   * @returns The operation shape ID, or undefined if not set
   */
  getLifecycleOperation(
    operation: 'create' | 'put' | 'read' | 'update' | 'delete' | 'list'
  ): ShapeId | undefined {
    return this[operation];
  }

  /**
   * Add an instance operation
   * @param operationId - The operation shape ID
   */
  addOperation(operationId: ShapeId): void {
    this.operations ??= [];
    if (!this.operations.includes(operationId)) {
      this.operations.push(operationId);
    }
  }

  /**
   * Remove an instance operation
   * @param operationId - The operation shape ID to remove
   * @returns True if the operation was removed, false if it didn't exist
   */
  removeOperation(operationId: ShapeId): boolean {
    if (!this.operations) {
      return false;
    }
    const index = this.operations.indexOf(operationId);
    if (index === -1) {
      return false;
    }
    this.operations.splice(index, 1);
    return true;
  }

  /**
   * Get all instance operations
   * @returns Array of operation shape IDs
   */
  getOperations(): ShapeId[] {
    return this.operations ? [...this.operations] : [];
  }

  /**
   * Add a collection operation
   * @param operationId - The operation shape ID
   */
  addCollectionOperation(operationId: ShapeId): void {
    this.collectionOperations ??= [];
    if (!this.collectionOperations.includes(operationId)) {
      this.collectionOperations.push(operationId);
    }
  }

  /**
   * Remove a collection operation
   * @param operationId - The operation shape ID to remove
   * @returns True if the operation was removed, false if it didn't exist
   */
  removeCollectionOperation(operationId: ShapeId): boolean {
    if (!this.collectionOperations) {
      return false;
    }
    const index = this.collectionOperations.indexOf(operationId);
    if (index === -1) {
      return false;
    }
    this.collectionOperations.splice(index, 1);
    return true;
  }

  /**
   * Get all collection operations
   * @returns Array of operation shape IDs
   */
  getCollectionOperations(): ShapeId[] {
    return this.collectionOperations ? [...this.collectionOperations] : [];
  }

  /**
   * Add a child resource
   * @param resourceId - The resource shape ID
   */
  addResource(resourceId: ShapeId): void {
    this.resources ??= [];
    if (!this.resources.includes(resourceId)) {
      this.resources.push(resourceId);
    }
  }

  /**
   * Remove a child resource
   * @param resourceId - The resource shape ID to remove
   * @returns True if the resource was removed, false if it didn't exist
   */
  removeResource(resourceId: ShapeId): boolean {
    if (!this.resources) {
      return false;
    }
    const index = this.resources.indexOf(resourceId);
    if (index === -1) {
      return false;
    }
    this.resources.splice(index, 1);
    return true;
  }

  /**
   * Get all child resources
   * @returns Array of resource shape IDs
   */
  getResources(): ShapeId[] {
    return this.resources ? [...this.resources] : [];
  }

  /**
   * Convert the shape to a plain object
   * @returns Plain object representation
   */
  override toObject(): IResourceShape {
    const obj: IResourceShape = {
      type: 'resource',
    };
    if (this.identifiers && Object.keys(this.identifiers).length > 0) {
      obj.identifiers = { ...this.identifiers };
    }
    if (this.properties && Object.keys(this.properties).length > 0) {
      obj.properties = { ...this.properties };
    }
    if (this.create) obj.create = this.create;
    if (this.put) obj.put = this.put;
    if (this.read) obj.read = this.read;
    if (this.update) obj.update = this.update;
    if (this.delete) obj.delete = this.delete;
    if (this.list) obj.list = this.list;
    if (this.operations && this.operations.length > 0) {
      obj.operations = [...this.operations];
    }
    if (this.collectionOperations && this.collectionOperations.length > 0) {
      obj.collectionOperations = [...this.collectionOperations];
    }
    if (this.resources && this.resources.length > 0) {
      obj.resources = [...this.resources];
    }
    if (this.traits && Object.keys(this.traits).length > 0) {
      obj.traits = { ...this.traits };
    }
    return obj;
  }
}
