/**
 * Tests for ShapeValidator
 */

import { describe, expect, test } from 'bun:test';
import type {
  ListShape,
  MapShape,
  OperationShape,
  ResourceShape,
  ServiceShape,
  SetShape,
  Shape,
  StructureShape,
  UnionShape,
} from '../../src/types.js';
import { ShapeValidator } from '../../src/validators/shape-validator.js';

describe('ShapeValidator', () => {
  describe('validate', () => {
    test('should validate a simple string shape', () => {
      const validator = new ShapeValidator();
      const shape: Shape = { type: 'string' };
      const result = validator.validate('example#MyString', shape);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should fail for shape without type', () => {
      const validator = new ShapeValidator();
      const shape = {} as Shape;
      const result = validator.validate('example#MyShape', shape);
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe('MISSING_SHAPE_TYPE');
    });

    test('should fail for invalid shape type', () => {
      const validator = new ShapeValidator();
      const shape = { type: 'invalid' } as unknown as Shape;
      const result = validator.validate('example#MyShape', shape);
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe('INVALID_SHAPE_TYPE');
    });
  });

  describe('validateStructure', () => {
    test('should validate a structure with members', () => {
      const validator = new ShapeValidator(new Set(['smithy.api#String', 'smithy.api#Integer']));
      const shape: StructureShape = {
        type: 'structure',
        members: {
          name: { target: 'smithy.api#String' },
          age: { target: 'smithy.api#Integer' },
        },
      };
      const result = validator.validate('example#Person', shape);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should validate a structure without members', () => {
      const validator = new ShapeValidator();
      const shape: StructureShape = {
        type: 'structure',
      };
      const result = validator.validate('example#Empty', shape);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should fail for invalid members type', () => {
      const validator = new ShapeValidator();
      const shape = {
        type: 'structure',
        members: 'invalid',
      } as unknown as StructureShape;
      const result = validator.validate('example#Invalid', shape);
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.code === 'INVALID_MEMBERS_TYPE')).toBe(true);
    });

    test('should fail for member without target', () => {
      const validator = new ShapeValidator();
      const shape = {
        type: 'structure',
        members: {
          name: {},
        },
      } as unknown as StructureShape;
      const result = validator.validate('example#Invalid', shape);
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.code === 'MISSING_MEMBER_TARGET')).toBe(true);
    });

    test('should fail for invalid shape reference', () => {
      const validator = new ShapeValidator(new Set(['smithy.api#String']));
      const shape: StructureShape = {
        type: 'structure',
        members: {
          name: { target: 'example#NonExistent' },
        },
      };
      const result = validator.validate('example#Invalid', shape);
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.code === 'INVALID_SHAPE_REFERENCE')).toBe(true);
    });

    test('should validate structure with mixins', () => {
      const validator = new ShapeValidator(new Set(['example#BaseMixin']));
      const shape: StructureShape = {
        type: 'structure',
        mixins: ['example#BaseMixin'],
      };
      const result = validator.validate('example#Derived', shape);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should fail for invalid mixins type', () => {
      const validator = new ShapeValidator();
      const shape = {
        type: 'structure',
        mixins: 'invalid',
      } as unknown as StructureShape;
      const result = validator.validate('example#Invalid', shape);
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.code === 'INVALID_MIXINS_TYPE')).toBe(true);
    });
  });

  describe('validateService', () => {
    test('should validate a service with version', () => {
      const validator = new ShapeValidator();
      const shape: ServiceShape = {
        type: 'service',
        version: '2023-01-01',
      };
      const result = validator.validate('example#MyService', shape);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should fail for service without version', () => {
      const validator = new ShapeValidator();
      const shape = {
        type: 'service',
      } as unknown as ServiceShape;
      const result = validator.validate('example#MyService', shape);
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe('MISSING_SERVICE_VERSION');
    });

    test('should fail for service with non-string version', () => {
      const validator = new ShapeValidator();
      const shape = {
        type: 'service',
        version: 123,
      } as unknown as ServiceShape;
      const result = validator.validate('example#MyService', shape);
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.code === 'INVALID_SERVICE_VERSION_TYPE')).toBe(true);
    });

    test('should validate service with operations', () => {
      const validator = new ShapeValidator(new Set(['example#GetWeather']));
      const shape: ServiceShape = {
        type: 'service',
        version: '2023-01-01',
        operations: ['example#GetWeather'],
      };
      const result = validator.validate('example#WeatherService', shape);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should fail for invalid operations type', () => {
      const validator = new ShapeValidator();
      const shape = {
        type: 'service',
        version: '2023-01-01',
        operations: 'invalid',
      } as unknown as ServiceShape;
      const result = validator.validate('example#MyService', shape);
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.code === 'INVALID_REFERENCE_ARRAY_TYPE')).toBe(true);
    });
  });

  describe('validateOperation', () => {
    test('should validate an operation with input and output', () => {
      const validator = new ShapeValidator(new Set(['example#Input', 'example#Output']));
      const shape: OperationShape = {
        type: 'operation',
        input: 'example#Input',
        output: 'example#Output',
      };
      const result = validator.validate('example#MyOperation', shape);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should validate an operation without input or output', () => {
      const validator = new ShapeValidator();
      const shape: OperationShape = {
        type: 'operation',
      };
      const result = validator.validate('example#MyOperation', shape);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should validate operation with errors', () => {
      const validator = new ShapeValidator(new Set(['example#NotFoundError']));
      const shape: OperationShape = {
        type: 'operation',
        errors: ['example#NotFoundError'],
      };
      const result = validator.validate('example#MyOperation', shape);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should fail for invalid input reference', () => {
      const validator = new ShapeValidator(new Set(['example#ValidShape']));
      const shape: OperationShape = {
        type: 'operation',
        input: 'example#NonExistent',
      };
      const result = validator.validate('example#MyOperation', shape);
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.code === 'INVALID_SHAPE_REFERENCE')).toBe(true);
    });
  });

  describe('validateResource', () => {
    test('should validate a resource with identifiers', () => {
      const validator = new ShapeValidator(new Set(['smithy.api#String']));
      const shape: ResourceShape = {
        type: 'resource',
        identifiers: {
          id: 'smithy.api#String',
        },
      };
      const result = validator.validate('example#MyResource', shape);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should validate resource with lifecycle operations', () => {
      const validator = new ShapeValidator(
        new Set(['example#CreateOp', 'example#ReadOp', 'example#UpdateOp', 'example#DeleteOp'])
      );
      const shape: ResourceShape = {
        type: 'resource',
        create: 'example#CreateOp',
        read: 'example#ReadOp',
        update: 'example#UpdateOp',
        delete: 'example#DeleteOp',
      };
      const result = validator.validate('example#MyResource', shape);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should fail for invalid identifiers type', () => {
      const validator = new ShapeValidator();
      const shape = {
        type: 'resource',
        identifiers: 'invalid',
      } as unknown as ResourceShape;
      const result = validator.validate('example#MyResource', shape);
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.code === 'INVALID_REFERENCE_MAP_TYPE')).toBe(true);
    });
  });

  describe('validateUnion', () => {
    test('should validate a union with members', () => {
      const validator = new ShapeValidator(new Set(['smithy.api#String', 'smithy.api#Integer']));
      const shape: UnionShape = {
        type: 'union',
        members: {
          stringValue: { target: 'smithy.api#String' },
          intValue: { target: 'smithy.api#Integer' },
        },
      };
      const result = validator.validate('example#MyUnion', shape);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should fail for invalid members type', () => {
      const validator = new ShapeValidator();
      const shape = {
        type: 'union',
        members: [],
      } as unknown as UnionShape;
      const result = validator.validate('example#MyUnion', shape);
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.code === 'INVALID_MEMBERS_TYPE')).toBe(true);
    });
  });

  describe('validateList', () => {
    test('should validate a list with member', () => {
      const validator = new ShapeValidator(new Set(['smithy.api#String']));
      const shape: ListShape = {
        type: 'list',
        member: { target: 'smithy.api#String' },
      };
      const result = validator.validate('example#StringList', shape);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should fail for list without member', () => {
      const validator = new ShapeValidator();
      const shape = {
        type: 'list',
      } as unknown as ListShape;
      const result = validator.validate('example#MyList', shape);
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe('MISSING_LIST_MEMBER');
    });
  });

  describe('validateSet', () => {
    test('should validate a set with member', () => {
      const validator = new ShapeValidator(new Set(['smithy.api#String']));
      const shape: SetShape = {
        type: 'set',
        member: { target: 'smithy.api#String' },
      };
      const result = validator.validate('example#StringSet', shape);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should fail for set without member', () => {
      const validator = new ShapeValidator();
      const shape = {
        type: 'set',
      } as unknown as SetShape;
      const result = validator.validate('example#MySet', shape);
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe('MISSING_SET_MEMBER');
    });
  });

  describe('validateMap', () => {
    test('should validate a map with key and value', () => {
      const validator = new ShapeValidator(new Set(['smithy.api#String', 'smithy.api#Integer']));
      const shape: MapShape = {
        type: 'map',
        key: { target: 'smithy.api#String' },
        value: { target: 'smithy.api#Integer' },
      };
      const result = validator.validate('example#StringIntMap', shape);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should fail for map without key', () => {
      const validator = new ShapeValidator(new Set(['smithy.api#Integer']));
      const shape = {
        type: 'map',
        value: { target: 'smithy.api#Integer' },
      } as unknown as MapShape;
      const result = validator.validate('example#MyMap', shape);
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.code === 'MISSING_MAP_KEY')).toBe(true);
    });

    test('should fail for map without value', () => {
      const validator = new ShapeValidator(new Set(['smithy.api#String']));
      const shape = {
        type: 'map',
        key: { target: 'smithy.api#String' },
      } as unknown as MapShape;
      const result = validator.validate('example#MyMap', shape);
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.code === 'MISSING_MAP_VALUE')).toBe(true);
    });
  });

  describe('shape reference validation', () => {
    test('should not validate references when no shape IDs provided', () => {
      const validator = new ShapeValidator();
      const shape: StructureShape = {
        type: 'structure',
        members: {
          name: { target: 'example#NonExistent' },
        },
      };
      const result = validator.validate('example#MyShape', shape);
      expect(result.valid).toBe(true);
    });

    test('should validate references when shape IDs provided', () => {
      const validator = new ShapeValidator(new Set(['smithy.api#String']));
      const shape: StructureShape = {
        type: 'structure',
        members: {
          name: { target: 'example#NonExistent' },
        },
      };
      const result = validator.validate('example#MyShape', shape);
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.code === 'INVALID_SHAPE_REFERENCE')).toBe(true);
    });
  });
});
