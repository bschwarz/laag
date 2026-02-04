/**
 * ServiceShape - Represents a Smithy service shape
 * @module shapes/service
 */

import type { ServiceShape as IServiceShape, ShapeId } from '../types';
import { BaseShape } from './base-shape';

/**
 * Represents a Smithy service shape
 * Services define API operations and resources
 */
export class ServiceShape extends BaseShape {
  version: string;
  operations?: ShapeId[];
  resources?: ShapeId[];
  errors?: ShapeId[];
  rename?: Record<ShapeId, string>;

  /**
   * Create a new ServiceShape
   * @param version - Service version
   * @param operations - Optional operations bound to the service
   * @param resources - Optional resources bound to the service
   * @param errors - Optional common errors
   * @param rename - Optional shape ID renames
   * @param traits - Optional traits applied to the shape
   */
  constructor(
    version: string,
    operations?: ShapeId[],
    resources?: ShapeId[],
    errors?: ShapeId[],
    rename?: Record<ShapeId, string>,
    traits?: Record<string, unknown>
  ) {
    super('service', traits);
    this.version = version;
    this.operations = operations;
    this.resources = resources;
    this.errors = errors;
    this.rename = rename;
  }

  /**
   * Add an operation to the service
   * @param operationId - The operation shape ID
   */
  addOperation(operationId: ShapeId): void {
    this.operations ??= [];
    if (!this.operations.includes(operationId)) {
      this.operations.push(operationId);
    }
  }

  /**
   * Remove an operation from the service
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
   * Get all operations
   * @returns Array of operation shape IDs
   */
  getOperations(): ShapeId[] {
    return this.operations ? [...this.operations] : [];
  }

  /**
   * Add a resource to the service
   * @param resourceId - The resource shape ID
   */
  addResource(resourceId: ShapeId): void {
    this.resources ??= [];
    if (!this.resources.includes(resourceId)) {
      this.resources.push(resourceId);
    }
  }

  /**
   * Remove a resource from the service
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
   * Get all resources
   * @returns Array of resource shape IDs
   */
  getResources(): ShapeId[] {
    return this.resources ? [...this.resources] : [];
  }

  /**
   * Add an error to the service
   * @param errorId - The error shape ID
   */
  addError(errorId: ShapeId): void {
    this.errors ??= [];
    if (!this.errors.includes(errorId)) {
      this.errors.push(errorId);
    }
  }

  /**
   * Remove an error from the service
   * @param errorId - The error shape ID to remove
   * @returns True if the error was removed, false if it didn't exist
   */
  removeError(errorId: ShapeId): boolean {
    if (!this.errors) {
      return false;
    }
    const index = this.errors.indexOf(errorId);
    if (index === -1) {
      return false;
    }
    this.errors.splice(index, 1);
    return true;
  }

  /**
   * Get all errors
   * @returns Array of error shape IDs
   */
  getErrors(): ShapeId[] {
    return this.errors ? [...this.errors] : [];
  }

  /**
   * Convert the shape to a plain object
   * @returns Plain object representation
   */
  override toObject(): IServiceShape {
    const obj: IServiceShape = {
      type: 'service',
      version: this.version,
    };
    if (this.operations && this.operations.length > 0) {
      obj.operations = [...this.operations];
    }
    if (this.resources && this.resources.length > 0) {
      obj.resources = [...this.resources];
    }
    if (this.errors && this.errors.length > 0) {
      obj.errors = [...this.errors];
    }
    if (this.rename && Object.keys(this.rename).length > 0) {
      obj.rename = { ...this.rename };
    }
    if (this.traits && Object.keys(this.traits).length > 0) {
      obj.traits = { ...this.traits };
    }
    return obj;
  }
}
