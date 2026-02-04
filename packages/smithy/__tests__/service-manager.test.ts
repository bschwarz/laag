/**
 * Tests for ServiceManager
 */

import { beforeEach, describe, expect, test } from 'bun:test';
import { ServiceManager } from '../src/service-manager';
import { ShapeManager } from '../src/shapes/shape-manager';
import { TraitManager } from '../src/traits/trait-manager';
import type {
    OperationShape,
    ServiceShape,
    ShapeId
} from '../src/types';
import { SMITHY_TRAITS } from '../src/types';

describe('ServiceManager', () => {
  let shapeManager: ShapeManager;
  let traitManager: TraitManager;
  let serviceManager: ServiceManager;

  beforeEach(() => {
    // Create a sample Smithy model with services, operations, and resources
    const shapes: Record<ShapeId, any> = {
      'example.weather#Weather': {
        type: 'service',
        version: '2006-03-01',
        operations: ['example.weather#GetCurrentWeather', 'example.weather#GetForecast'],
        resources: ['example.weather#City'],
        errors: ['example.weather#ServiceError'],
        traits: {
          [SMITHY_TRAITS.DOCUMENTATION]: 'Weather service API',
        },
      },
      'example.weather#GetCurrentWeather': {
        type: 'operation',
        input: 'example.weather#GetCurrentWeatherInput',
        output: 'example.weather#GetCurrentWeatherOutput',
        errors: ['example.weather#CityNotFoundError'],
        traits: {
          [SMITHY_TRAITS.HTTP]: {
            method: 'GET',
            uri: '/weather/{city}',
            code: 200,
          },
          [SMITHY_TRAITS.READONLY]: {},
        },
      },
      'example.weather#GetForecast': {
        type: 'operation',
        input: 'example.weather#GetForecastInput',
        output: 'example.weather#GetForecastOutput',
        traits: {
          [SMITHY_TRAITS.HTTP]: {
            method: 'GET',
            uri: '/forecast/{city}',
          },
        },
      },
      'example.weather#GetCurrentWeatherInput': {
        type: 'structure',
        members: {
          city: {
            target: 'smithy.api#String',
            traits: {
              [SMITHY_TRAITS.REQUIRED]: {},
              [SMITHY_TRAITS.HTTP_LABEL]: {},
            },
          },
          units: {
            target: 'smithy.api#String',
            traits: {
              [SMITHY_TRAITS.HTTP_QUERY]: 'units',
            },
          },
        },
      },
      'example.weather#GetCurrentWeatherOutput': {
        type: 'structure',
        members: {
          temperature: {
            target: 'smithy.api#Float',
          },
          conditions: {
            target: 'smithy.api#String',
          },
        },
      },
      'example.weather#GetForecastInput': {
        type: 'structure',
        members: {
          city: {
            target: 'smithy.api#String',
          },
        },
      },
      'example.weather#GetForecastOutput': {
        type: 'structure',
        members: {
          forecast: {
            target: 'smithy.api#String',
          },
        },
      },
      'example.weather#CityNotFoundError': {
        type: 'structure',
        members: {
          message: {
            target: 'smithy.api#String',
          },
        },
        traits: {
          [SMITHY_TRAITS.HTTP_ERROR]: 404,
        },
      },
      'example.weather#ServiceError': {
        type: 'structure',
        members: {
          message: {
            target: 'smithy.api#String',
          },
        },
        traits: {
          [SMITHY_TRAITS.HTTP_ERROR]: 500,
        },
      },
      'example.weather#City': {
        type: 'resource',
        identifiers: {
          cityId: 'smithy.api#String',
        },
        read: 'example.weather#GetCity',
        operations: ['example.weather#UpdateCity'],
      },
      'example.weather#GetCity': {
        type: 'operation',
        input: 'example.weather#GetCityInput',
        output: 'example.weather#GetCityOutput',
      },
      'example.weather#UpdateCity': {
        type: 'operation',
        input: 'example.weather#UpdateCityInput',
        output: 'example.weather#UpdateCityOutput',
      },
      'example.weather#GetCityInput': {
        type: 'structure',
        members: {
          cityId: {
            target: 'smithy.api#String',
          },
        },
      },
      'example.weather#GetCityOutput': {
        type: 'structure',
        members: {
          name: {
            target: 'smithy.api#String',
          },
        },
      },
      'example.weather#UpdateCityInput': {
        type: 'structure',
        members: {
          cityId: {
            target: 'smithy.api#String',
          },
          name: {
            target: 'smithy.api#String',
          },
        },
      },
      'example.weather#UpdateCityOutput': {
        type: 'structure',
        members: {
          success: {
            target: 'smithy.api#Boolean',
          },
        },
      },
    };

    shapeManager = new ShapeManager(shapes);
    traitManager = new TraitManager(shapes);
    serviceManager = new ServiceManager(shapeManager, traitManager);
  });

  describe('getServices', () => {
    test('should return all services', () => {
      const services = serviceManager.getServices();
      expect(services).toHaveLength(1);
      expect(services[0].type).toBe('service');
      expect((services[0] as ServiceShape).version).toBe('2006-03-01');
    });

    test('should return empty array when no services exist', () => {
      const emptyShapeManager = new ShapeManager({});
      const emptyTraitManager = new TraitManager({});
      const emptyServiceManager = new ServiceManager(emptyShapeManager, emptyTraitManager);
      const services = emptyServiceManager.getServices();
      expect(services).toHaveLength(0);
    });
  });

  describe('getService', () => {
    test('should return a specific service by ID', () => {
      const service = serviceManager.getService('example.weather#Weather');
      expect(service).toBeDefined();
      expect(service?.type).toBe('service');
      expect(service?.version).toBe('2006-03-01');
    });

    test('should return undefined for non-existent service', () => {
      const service = serviceManager.getService('example.weather#NonExistent');
      expect(service).toBeUndefined();
    });

    test('should return undefined for non-service shape', () => {
      const service = serviceManager.getService('example.weather#GetCurrentWeather');
      expect(service).toBeUndefined();
    });
  });

  describe('getOperations', () => {
    test('should return all operations for a service', () => {
      const operations = serviceManager.getOperations('example.weather#Weather');
      expect(operations).toHaveLength(2);
      expect(operations[0].type).toBe('operation');
      expect(operations[1].type).toBe('operation');
    });

    test('should return empty array for service with no operations', () => {
      shapeManager.add('example.test#EmptyService', {
        type: 'service',
        version: '1.0',
      } as ServiceShape);
      const operations = serviceManager.getOperations('example.test#EmptyService');
      expect(operations).toHaveLength(0);
    });

    test('should return empty array for non-existent service', () => {
      const operations = serviceManager.getOperations('example.weather#NonExistent');
      expect(operations).toHaveLength(0);
    });
  });

  describe('getResources', () => {
    test('should return all resources for a service', () => {
      const resources = serviceManager.getResources('example.weather#Weather');
      expect(resources).toHaveLength(1);
      expect(resources[0].type).toBe('resource');
    });

    test('should return empty array for service with no resources', () => {
      shapeManager.add('example.test#EmptyService', {
        type: 'service',
        version: '1.0',
      } as ServiceShape);
      const resources = serviceManager.getResources('example.test#EmptyService');
      expect(resources).toHaveLength(0);
    });

    test('should return empty array for non-existent service', () => {
      const resources = serviceManager.getResources('example.weather#NonExistent');
      expect(resources).toHaveLength(0);
    });
  });

  describe('getOperationInput', () => {
    test('should return input structure for an operation', () => {
      const input = serviceManager.getOperationInput('example.weather#GetCurrentWeather');
      expect(input).toBeDefined();
      expect(input?.type).toBe('structure');
      expect(input?.members).toBeDefined();
      expect(input?.members?.city).toBeDefined();
    });

    test('should return undefined for operation with no input', () => {
      shapeManager.add('example.test#NoInputOp', {
        type: 'operation',
        output: 'example.weather#GetCurrentWeatherOutput',
      } as OperationShape);
      const input = serviceManager.getOperationInput('example.test#NoInputOp');
      expect(input).toBeUndefined();
    });

    test('should return undefined for non-existent operation', () => {
      const input = serviceManager.getOperationInput('example.weather#NonExistent');
      expect(input).toBeUndefined();
    });
  });

  describe('getOperationOutput', () => {
    test('should return output structure for an operation', () => {
      const output = serviceManager.getOperationOutput('example.weather#GetCurrentWeather');
      expect(output).toBeDefined();
      expect(output?.type).toBe('structure');
      expect(output?.members).toBeDefined();
      expect(output?.members?.temperature).toBeDefined();
    });

    test('should return undefined for operation with no output', () => {
      shapeManager.add('example.test#NoOutputOp', {
        type: 'operation',
        input: 'example.weather#GetCurrentWeatherInput',
      } as OperationShape);
      const output = serviceManager.getOperationOutput('example.test#NoOutputOp');
      expect(output).toBeUndefined();
    });

    test('should return undefined for non-existent operation', () => {
      const output = serviceManager.getOperationOutput('example.weather#NonExistent');
      expect(output).toBeUndefined();
    });
  });

  describe('getOperationErrors', () => {
    test('should return error structures for an operation', () => {
      const errors = serviceManager.getOperationErrors('example.weather#GetCurrentWeather');
      expect(errors).toHaveLength(1);
      expect(errors[0].type).toBe('structure');
    });

    test('should return empty array for operation with no errors', () => {
      const errors = serviceManager.getOperationErrors('example.weather#GetForecast');
      expect(errors).toHaveLength(0);
    });

    test('should return empty array for non-existent operation', () => {
      const errors = serviceManager.getOperationErrors('example.weather#NonExistent');
      expect(errors).toHaveLength(0);
    });
  });

  describe('getHttpBinding', () => {
    test('should extract HTTP binding from operation', () => {
      const binding = serviceManager.getHttpBinding('example.weather#GetCurrentWeather');
      expect(binding).toBeDefined();
      expect(binding?.method).toBe('GET');
      expect(binding?.uri).toBe('/weather/{city}');
      expect(binding?.code).toBe(200);
    });

    test('should extract HTTP labels from input members', () => {
      const binding = serviceManager.getHttpBinding('example.weather#GetCurrentWeather');
      expect(binding?.labels).toBeDefined();
      expect(binding?.labels).toContain('city');
    });

    test('should extract HTTP query params from input members', () => {
      const binding = serviceManager.getHttpBinding('example.weather#GetCurrentWeather');
      expect(binding?.queryParams).toBeDefined();
      expect(binding?.queryParams?.units).toBe('units');
    });

    test('should return undefined for operation without HTTP trait', () => {
      shapeManager.add('example.test#NoHttpOp', {
        type: 'operation',
        input: 'example.weather#GetCurrentWeatherInput',
        output: 'example.weather#GetCurrentWeatherOutput',
      } as OperationShape);
      const binding = serviceManager.getHttpBinding('example.test#NoHttpOp');
      expect(binding).toBeUndefined();
    });

    test('should handle operation with no input', () => {
      shapeManager.add('example.test#NoInputHttpOp', {
        type: 'operation',
        output: 'example.weather#GetCurrentWeatherOutput',
        traits: {
          [SMITHY_TRAITS.HTTP]: {
            method: 'GET',
            uri: '/test',
          },
        },
      } as OperationShape);
      traitManager.add('example.test#NoInputHttpOp', SMITHY_TRAITS.HTTP, {
        method: 'GET',
        uri: '/test',
      });
      const binding = serviceManager.getHttpBinding('example.test#NoInputHttpOp');
      expect(binding).toBeDefined();
      expect(binding?.method).toBe('GET');
      expect(binding?.uri).toBe('/test');
      expect(binding?.labels).toBeUndefined();
      expect(binding?.queryParams).toBeUndefined();
    });

    test('should handle HTTP binding without status code', () => {
      const binding = serviceManager.getHttpBinding('example.weather#GetForecast');
      expect(binding).toBeDefined();
      expect(binding?.method).toBe('GET');
      expect(binding?.uri).toBe('/forecast/{city}');
      expect(binding?.code).toBeUndefined();
    });
  });
});
