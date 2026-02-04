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
import { ShapeGuards } from './types';

/**
 * Manages service-specific operations in a Smithy model
 * Provides methods for accessing services, operations, resources, and HTTP bindings
 */
export class ServiceManager {
  private shapeManager: ShapeManager;
  private traitManager: TraitManager;

  /**
   * Create a new ServiceManager
   * @param shapeManager - The shape manager instance
   * @param traitManager - The trait manager instance
   */
  constructor(shapeManager: ShapeManager, traitManager: TraitManager) {
    this.shapeManager = shapeManager;
    this.traitManager = traitManager;
  }

  /**
   * Get all services in the model
   * @returns Array of service shapes
   */
  getServices(): ServiceShape[] {
    const services = this.shapeManager.getByType('service');
    return services as ServiceShape[];
  }

  /**
   * Get a specific service by its shape ID
   * @param serviceId - The service shape ID
   * @returns The service shape, or undefined if not found or not a service
   */
  getService(serviceId: ShapeId): ServiceShape | undefined {
    const shape = this.shapeManager.get(serviceId);
    if (!shape || !ShapeGuards.isService(shape)) {
      return undefined;
    }
    return shape;
  }

  /**
   * Get all operations for a service
   * @param serviceId - The service shape ID
   * @returns Array of operation shapes
   */
  getOperations(serviceId: ShapeId): OperationShape[] {
    const service = this.getService(serviceId);
    if (!service || !service.operations) {
      return [];
    }

    const operations: OperationShape[] = [];
    for (const operationId of service.operations) {
      const shape = this.shapeManager.get(operationId);
      if (shape && ShapeGuards.isOperation(shape)) {
        operations.push(shape);
      }
    }

    return operations;
  }

  /**
   * Get all resources for a service
   * @param serviceId - The service shape ID
   * @returns Array of resource shapes
   */
  getResources(serviceId: ShapeId): ResourceShape[] {
    const service = this.getService(serviceId);
    if (!service || !service.resources) {
      return [];
    }

    const resources: ResourceShape[] = [];
    for (const resourceId of service.resources) {
      const shape = this.shapeManager.get(resourceId);
      if (shape && ShapeGuards.isResource(shape)) {
        resources.push(shape);
      }
    }

    return resources;
  }

  /**
   * Get the input structure for an operation
   * @param operationId - The operation shape ID
   * @returns The input structure shape, or undefined if not found
   */
  getOperationInput(operationId: ShapeId): StructureShape | undefined {
    const operation = this.shapeManager.get(operationId);
    if (!operation || !ShapeGuards.isOperation(operation)) {
      return undefined;
    }

    if (!operation.input) {
      return undefined;
    }

    const inputShape = this.shapeManager.get(operation.input);
    if (!inputShape || !ShapeGuards.isStructure(inputShape)) {
      return undefined;
    }

    return inputShape;
  }

  /**
   * Get the output structure for an operation
   * @param operationId - The operation shape ID
   * @returns The output structure shape, or undefined if not found
   */
  getOperationOutput(operationId: ShapeId): StructureShape | undefined {
    const operation = this.shapeManager.get(operationId);
    if (!operation || !ShapeGuards.isOperation(operation)) {
      return undefined;
    }

    if (!operation.output) {
      return undefined;
    }

    const outputShape = this.shapeManager.get(operation.output);
    if (!outputShape || !ShapeGuards.isStructure(outputShape)) {
      return undefined;
    }

    return outputShape;
  }

  /**
   * Get all error structures for an operation
   * @param operationId - The operation shape ID
   * @returns Array of error structure shapes
   */
  getOperationErrors(operationId: ShapeId): StructureShape[] {
    const operation = this.shapeManager.get(operationId);
    if (!operation || !ShapeGuards.isOperation(operation)) {
      return [];
    }

    if (!operation.errors || operation.errors.length === 0) {
      return [];
    }

    const errors: StructureShape[] = [];
    for (const errorId of operation.errors) {
      const errorShape = this.shapeManager.get(errorId);
      if (errorShape && ShapeGuards.isStructure(errorShape)) {
        errors.push(errorShape);
      }
    }

    return errors;
  }

  /**
   * Get HTTP binding information for an operation
   * Extracts HTTP method, URI, status code, headers, query params, labels, and payload
   * @param operationId - The operation shape ID
   * @returns HTTP binding information, or undefined if no HTTP trait is present
   */
  getHttpBinding(operationId: ShapeId): HttpBinding | undefined {
    // Get the HTTP trait from the operation
    const httpTrait = this.traitManager.getHttpTrait(operationId);
    if (!httpTrait) {
      return undefined;
    }

    const binding: HttpBinding = {
      method: httpTrait.method,
      uri: httpTrait.uri,
    };

    // Add status code if present
    if (httpTrait.code !== undefined) {
      binding.code = httpTrait.code;
    }

    // Extract HTTP bindings from input members
    const inputShape = this.getOperationInput(operationId);
    if (inputShape && inputShape.members) {
      const headers: Record<string, string> = {};
      const queryParams: Record<string, string> = {};
      const labels: string[] = [];
      let payload: string | undefined;

      for (const [memberName, member] of Object.entries(inputShape.members)) {
        // Member traits are stored on the member itself, not the target
        const memberTraits = member.traits || {};

        // Check for HTTP header binding
        if ('smithy.api#httpHeader' in memberTraits) {
          const headerTrait = memberTraits['smithy.api#httpHeader'];
          const headerName = typeof headerTrait === 'string' ? headerTrait : memberName;
          headers[memberName] = headerName;
        }

        // Check for HTTP query binding
        if ('smithy.api#httpQuery' in memberTraits) {
          const queryTrait = memberTraits['smithy.api#httpQuery'];
          const queryParam = typeof queryTrait === 'string' ? queryTrait : memberName;
          queryParams[memberName] = queryParam;
        }

        // Check for HTTP label binding
        if ('smithy.api#httpLabel' in memberTraits) {
          labels.push(memberName);
        }

        // Check for HTTP payload binding
        if ('smithy.api#httpPayload' in memberTraits) {
          payload = memberName;
        }
      }

      // Add to binding if any were found
      if (Object.keys(headers).length > 0) {
        binding.headers = headers;
      }
      if (Object.keys(queryParams).length > 0) {
        binding.queryParams = queryParams;
      }
      if (labels.length > 0) {
        binding.labels = labels;
      }
      if (payload) {
        binding.payload = payload;
      }
    }

    return binding;
  }
}
