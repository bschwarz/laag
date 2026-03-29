/**
 * ServiceManager - Manages service-specific operations
 * @module service-manager
 */
import type { ShapeManager } from './shapes/shape-manager';
import type { TraitManager } from './traits/trait-manager';
import type {
  HttpBinding,
  OperationShape,
  ResourceShape,
  ServiceShape,
  ShapeId,
  StructureShape,
} from './types';
/**
 * Manages service-specific operations in a Smithy model
 * Provides methods for accessing services, operations, resources, and HTTP bindings
 */
export declare class ServiceManager {
  private shapeManager;
  private traitManager;
  /**
   * Create a new ServiceManager
   * @param shapeManager - The shape manager instance
   * @param traitManager - The trait manager instance
   */
  constructor(shapeManager: ShapeManager, traitManager: TraitManager);
  /**
   * Get all services in the model
   * @returns Array of service shapes
   */
  getServices(): ServiceShape[];
  /**
   * Get a specific service by its shape ID
   * @param serviceId - The service shape ID
   * @returns The service shape, or undefined if not found or not a service
   */
  getService(serviceId: ShapeId): ServiceShape | undefined;
  /**
   * Get all operations for a service
   * @param serviceId - The service shape ID
   * @returns Array of operation shapes
   */
  getOperations(serviceId: ShapeId): OperationShape[];
  /**
   * Get all resources for a service
   * @param serviceId - The service shape ID
   * @returns Array of resource shapes
   */
  getResources(serviceId: ShapeId): ResourceShape[];
  /**
   * Get the input structure for an operation
   * @param operationId - The operation shape ID
   * @returns The input structure shape, or undefined if not found
   */
  getOperationInput(operationId: ShapeId): StructureShape | undefined;
  /**
   * Get the output structure for an operation
   * @param operationId - The operation shape ID
   * @returns The output structure shape, or undefined if not found
   */
  getOperationOutput(operationId: ShapeId): StructureShape | undefined;
  /**
   * Get all error structures for an operation
   * @param operationId - The operation shape ID
   * @returns Array of error structure shapes
   */
  getOperationErrors(operationId: ShapeId): StructureShape[];
  /**
   * Get HTTP binding information for an operation
   * Extracts HTTP method, URI, status code, headers, query params, labels, and payload
   * @param operationId - The operation shape ID
   * @returns HTTP binding information, or undefined if no HTTP trait is present
   */
  getHttpBinding(operationId: ShapeId): HttpBinding | undefined;
}
//# sourceMappingURL=service-manager.d.ts.map
