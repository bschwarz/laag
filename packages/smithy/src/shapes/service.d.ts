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
export declare class ServiceShape extends BaseShape {
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
  );
  /**
   * Add an operation to the service
   * @param operationId - The operation shape ID
   */
  addOperation(operationId: ShapeId): void;
  /**
   * Remove an operation from the service
   * @param operationId - The operation shape ID to remove
   * @returns True if the operation was removed, false if it didn't exist
   */
  removeOperation(operationId: ShapeId): boolean;
  /**
   * Get all operations
   * @returns Array of operation shape IDs
   */
  getOperations(): ShapeId[];
  /**
   * Add a resource to the service
   * @param resourceId - The resource shape ID
   */
  addResource(resourceId: ShapeId): void;
  /**
   * Remove a resource from the service
   * @param resourceId - The resource shape ID to remove
   * @returns True if the resource was removed, false if it didn't exist
   */
  removeResource(resourceId: ShapeId): boolean;
  /**
   * Get all resources
   * @returns Array of resource shape IDs
   */
  getResources(): ShapeId[];
  /**
   * Add an error to the service
   * @param errorId - The error shape ID
   */
  addError(errorId: ShapeId): void;
  /**
   * Remove an error from the service
   * @param errorId - The error shape ID to remove
   * @returns True if the error was removed, false if it didn't exist
   */
  removeError(errorId: ShapeId): boolean;
  /**
   * Get all errors
   * @returns Array of error shape IDs
   */
  getErrors(): ShapeId[];
  /**
   * Convert the shape to a plain object
   * @returns Plain object representation
   */
  toObject(): IServiceShape;
}
//# sourceMappingURL=service.d.ts.map
