/**
 * Shape validator for Smithy shapes
 * @module validators/shape-validator
 */

import type { ValidationResult } from '@laag/core';
import type {
  ListShape,
  MapShape,
  MemberShape,
  OperationShape,
  ResourceShape,
  ServiceShape,
  SetShape,
  Shape,
  ShapeId,
  ShapeType,
  StructureShape,
  UnionShape,
} from '../types.js';

/**
 * Validates Smithy shapes according to the Smithy specification
 */
export class ShapeValidator {
  private shapeIds: Set<ShapeId>;

  /**
   * Create a new ShapeValidator
   * @param shapeIds - Set of all valid shape IDs in the model (for reference validation)
   */
  constructor(shapeIds: Set<ShapeId> = new Set()) {
    this.shapeIds = shapeIds;
  }

  /**
   * Validate a shape
   * @param shapeId - The shape ID
   * @param shape - The shape to validate
   * @returns Validation result
   */
  validate(shapeId: ShapeId, shape: Shape): ValidationResult {
    const errors: Array<{ path: string; message: string; code: string }> = [];

    // Validate shape has a type
    if (!shape.type) {
      errors.push({
        path: shapeId,
        message: 'Shape must have a type',
        code: 'MISSING_SHAPE_TYPE',
      });
      return { valid: false, errors };
    }

    // Validate shape type is valid
    const validTypes: ShapeType[] = [
      'blob',
      'boolean',
      'string',
      'byte',
      'short',
      'integer',
      'long',
      'float',
      'double',
      'bigInteger',
      'bigDecimal',
      'timestamp',
      'document',
      'list',
      'set',
      'map',
      'structure',
      'union',
      'service',
      'operation',
      'resource',
    ];

    if (!validTypes.includes(shape.type)) {
      errors.push({
        path: shapeId,
        message: `Invalid shape type: "${shape.type}"`,
        code: 'INVALID_SHAPE_TYPE',
      });
      return { valid: false, errors };
    }

    // Validate specific shape types
    let result: ValidationResult;
    switch (shape.type) {
      case 'structure':
        result = this.validateStructure(shapeId, shape as StructureShape);
        break;
      case 'service':
        result = this.validateService(shapeId, shape as ServiceShape);
        break;
      case 'operation':
        result = this.validateOperation(shapeId, shape as OperationShape);
        break;
      case 'resource':
        result = this.validateResource(shapeId, shape as ResourceShape);
        break;
      case 'union':
        result = this.validateUnion(shapeId, shape as UnionShape);
        break;
      case 'list':
        result = this.validateList(shapeId, shape as ListShape);
        break;
      case 'set':
        result = this.validateSet(shapeId, shape as SetShape);
        break;
      case 'map':
        result = this.validateMap(shapeId, shape as MapShape);
        break;
      default:
        // Simple types don't need additional validation
        result = { valid: true, errors: [] };
    }

    if (!result.valid) {
      errors.push(...result.errors);
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate a structure shape
   * @param shapeId - The shape ID
   * @param shape - The structure shape
   * @returns Validation result
   */
  validateStructure(shapeId: ShapeId, shape: StructureShape): ValidationResult {
    const errors: Array<{ path: string; message: string; code: string }> = [];

    // Validate members if present
    if (shape.members !== undefined) {
      if (
        typeof shape.members !== 'object' ||
        shape.members === null ||
        Array.isArray(shape.members)
      ) {
        errors.push({
          path: `${shapeId}.members`,
          message: 'Structure members must be an object',
          code: 'INVALID_MEMBERS_TYPE',
        });
      } else {
        // Validate each member
        for (const [memberName, member] of Object.entries(shape.members)) {
          const memberResult = this.validateMember(shapeId, memberName, member);
          if (!memberResult.valid) {
            errors.push(...memberResult.errors);
          }
        }
      }
    }

    // Validate mixins if present
    if (shape.mixins !== undefined) {
      if (!Array.isArray(shape.mixins)) {
        errors.push({
          path: `${shapeId}.mixins`,
          message: 'Structure mixins must be an array',
          code: 'INVALID_MIXINS_TYPE',
        });
      } else {
        // Validate each mixin reference
        for (const mixin of shape.mixins) {
          const refResult = this.validateShapeReference(shapeId, 'mixins', mixin);
          if (!refResult.valid) {
            errors.push(...refResult.errors);
          }
        }
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate a service shape
   * @param shapeId - The shape ID
   * @param shape - The service shape
   * @returns Validation result
   */
  validateService(shapeId: ShapeId, shape: ServiceShape): ValidationResult {
    const errors: Array<{ path: string; message: string; code: string }> = [];

    // Validate version is required
    if (!shape.version) {
      errors.push({
        path: `${shapeId}.version`,
        message: 'Service version is required',
        code: 'MISSING_SERVICE_VERSION',
      });
    } else if (typeof shape.version !== 'string') {
      errors.push({
        path: `${shapeId}.version`,
        message: 'Service version must be a string',
        code: 'INVALID_SERVICE_VERSION_TYPE',
      });
    }

    // Validate operations if present
    if (shape.operations !== undefined) {
      const opsResult = this.validateShapeReferenceArray(shapeId, 'operations', shape.operations);
      if (!opsResult.valid) {
        errors.push(...opsResult.errors);
      }
    }

    // Validate resources if present
    if (shape.resources !== undefined) {
      const resResult = this.validateShapeReferenceArray(shapeId, 'resources', shape.resources);
      if (!resResult.valid) {
        errors.push(...resResult.errors);
      }
    }

    // Validate errors if present
    if (shape.errors !== undefined) {
      const errResult = this.validateShapeReferenceArray(shapeId, 'errors', shape.errors);
      if (!errResult.valid) {
        errors.push(...errResult.errors);
      }
    }

    // Validate rename if present
    if (shape.rename !== undefined) {
      if (
        typeof shape.rename !== 'object' ||
        shape.rename === null ||
        Array.isArray(shape.rename)
      ) {
        errors.push({
          path: `${shapeId}.rename`,
          message: 'Service rename must be an object',
          code: 'INVALID_RENAME_TYPE',
        });
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate an operation shape
   * @param shapeId - The shape ID
   * @param shape - The operation shape
   * @returns Validation result
   */
  validateOperation(shapeId: ShapeId, shape: OperationShape): ValidationResult {
    const errors: Array<{ path: string; message: string; code: string }> = [];

    // Validate input if present
    if (shape.input !== undefined) {
      const inputResult = this.validateShapeReference(shapeId, 'input', shape.input);
      if (!inputResult.valid) {
        errors.push(...inputResult.errors);
      }
    }

    // Validate output if present
    if (shape.output !== undefined) {
      const outputResult = this.validateShapeReference(shapeId, 'output', shape.output);
      if (!outputResult.valid) {
        errors.push(...outputResult.errors);
      }
    }

    // Validate errors if present
    if (shape.errors !== undefined) {
      const errResult = this.validateShapeReferenceArray(shapeId, 'errors', shape.errors);
      if (!errResult.valid) {
        errors.push(...errResult.errors);
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate a resource shape
   * @param shapeId - The shape ID
   * @param shape - The resource shape
   * @returns Validation result
   */
  validateResource(shapeId: ShapeId, shape: ResourceShape): ValidationResult {
    const errors: Array<{ path: string; message: string; code: string }> = [];

    // Validate identifiers if present
    if (shape.identifiers !== undefined) {
      const idResult = this.validateShapeReferenceMap(shapeId, 'identifiers', shape.identifiers);
      if (!idResult.valid) {
        errors.push(...idResult.errors);
      }
    }

    // Validate properties if present
    if (shape.properties !== undefined) {
      const propResult = this.validateShapeReferenceMap(shapeId, 'properties', shape.properties);
      if (!propResult.valid) {
        errors.push(...propResult.errors);
      }
    }

    // Validate lifecycle operations
    const lifecycleOps = ['create', 'put', 'read', 'update', 'delete', 'list'] as const;
    for (const op of lifecycleOps) {
      if (shape[op] !== undefined) {
        const opResult = this.validateShapeReference(shapeId, op, shape[op] as ShapeId);
        if (!opResult.valid) {
          errors.push(...opResult.errors);
        }
      }
    }

    // Validate operations if present
    if (shape.operations !== undefined) {
      const opsResult = this.validateShapeReferenceArray(shapeId, 'operations', shape.operations);
      if (!opsResult.valid) {
        errors.push(...opsResult.errors);
      }
    }

    // Validate collectionOperations if present
    if (shape.collectionOperations !== undefined) {
      const colOpsResult = this.validateShapeReferenceArray(
        shapeId,
        'collectionOperations',
        shape.collectionOperations
      );
      if (!colOpsResult.valid) {
        errors.push(...colOpsResult.errors);
      }
    }

    // Validate resources if present
    if (shape.resources !== undefined) {
      const resResult = this.validateShapeReferenceArray(shapeId, 'resources', shape.resources);
      if (!resResult.valid) {
        errors.push(...resResult.errors);
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate a union shape
   * @param shapeId - The shape ID
   * @param shape - The union shape
   * @returns Validation result
   */
  validateUnion(shapeId: ShapeId, shape: UnionShape): ValidationResult {
    const errors: Array<{ path: string; message: string; code: string }> = [];

    // Validate members if present
    if (shape.members !== undefined) {
      if (
        typeof shape.members !== 'object' ||
        shape.members === null ||
        Array.isArray(shape.members)
      ) {
        errors.push({
          path: `${shapeId}.members`,
          message: 'Union members must be an object',
          code: 'INVALID_MEMBERS_TYPE',
        });
      } else {
        // Validate each member
        for (const [memberName, member] of Object.entries(shape.members)) {
          const memberResult = this.validateMember(shapeId, memberName, member);
          if (!memberResult.valid) {
            errors.push(...memberResult.errors);
          }
        }
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate a list shape
   * @param shapeId - The shape ID
   * @param shape - The list shape
   * @returns Validation result
   */
  validateList(shapeId: ShapeId, shape: ListShape): ValidationResult {
    const errors: Array<{ path: string; message: string; code: string }> = [];

    // Validate member is required
    if (!shape.member) {
      errors.push({
        path: `${shapeId}.member`,
        message: 'List member is required',
        code: 'MISSING_LIST_MEMBER',
      });
    } else {
      const memberResult = this.validateMember(shapeId, 'member', shape.member);
      if (!memberResult.valid) {
        errors.push(...memberResult.errors);
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate a set shape
   * @param shapeId - The shape ID
   * @param shape - The set shape
   * @returns Validation result
   */
  validateSet(shapeId: ShapeId, shape: SetShape): ValidationResult {
    const errors: Array<{ path: string; message: string; code: string }> = [];

    // Validate member is required
    if (!shape.member) {
      errors.push({
        path: `${shapeId}.member`,
        message: 'Set member is required',
        code: 'MISSING_SET_MEMBER',
      });
    } else {
      const memberResult = this.validateMember(shapeId, 'member', shape.member);
      if (!memberResult.valid) {
        errors.push(...memberResult.errors);
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate a map shape
   * @param shapeId - The shape ID
   * @param shape - The map shape
   * @returns Validation result
   */
  validateMap(shapeId: ShapeId, shape: MapShape): ValidationResult {
    const errors: Array<{ path: string; message: string; code: string }> = [];

    // Validate key is required
    if (!shape.key) {
      errors.push({
        path: `${shapeId}.key`,
        message: 'Map key is required',
        code: 'MISSING_MAP_KEY',
      });
    } else {
      const keyResult = this.validateMember(shapeId, 'key', shape.key);
      if (!keyResult.valid) {
        errors.push(...keyResult.errors);
      }
    }

    // Validate value is required
    if (!shape.value) {
      errors.push({
        path: `${shapeId}.value`,
        message: 'Map value is required',
        code: 'MISSING_MAP_VALUE',
      });
    } else {
      const valueResult = this.validateMember(shapeId, 'value', shape.value);
      if (!valueResult.valid) {
        errors.push(...valueResult.errors);
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate a member shape
   * @param shapeId - The parent shape ID
   * @param memberName - The member name
   * @param member - The member shape
   * @returns Validation result
   */
  private validateMember(
    shapeId: ShapeId,
    memberName: string,
    member: MemberShape
  ): ValidationResult {
    const errors: Array<{ path: string; message: string; code: string }> = [];

    if (!member.target) {
      errors.push({
        path: `${shapeId}.${memberName}`,
        message: 'Member must have a target',
        code: 'MISSING_MEMBER_TARGET',
      });
    } else if (typeof member.target !== 'string') {
      errors.push({
        path: `${shapeId}.${memberName}`,
        message: 'Member target must be a string',
        code: 'INVALID_MEMBER_TARGET_TYPE',
      });
    } else {
      // Validate the target reference
      const refResult = this.validateShapeReference(shapeId, memberName, member.target);
      if (!refResult.valid) {
        errors.push(...refResult.errors);
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate a shape reference
   * @param shapeId - The parent shape ID
   * @param field - The field name
   * @param reference - The shape reference
   * @returns Validation result
   */
  private validateShapeReference(
    shapeId: ShapeId,
    field: string,
    reference: ShapeId
  ): ValidationResult {
    const errors: Array<{ path: string; message: string; code: string }> = [];

    if (typeof reference !== 'string') {
      errors.push({
        path: `${shapeId}.${field}`,
        message: 'Shape reference must be a string',
        code: 'INVALID_REFERENCE_TYPE',
      });
      return { valid: false, errors };
    }

    // Only validate reference exists if we have shape IDs to check against
    if (this.shapeIds.size > 0 && !this.shapeIds.has(reference)) {
      errors.push({
        path: `${shapeId}.${field}`,
        message: `Shape reference "${reference}" not found`,
        code: 'INVALID_SHAPE_REFERENCE',
      });
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate an array of shape references
   * @param shapeId - The parent shape ID
   * @param field - The field name
   * @param references - The array of shape references
   * @returns Validation result
   */
  private validateShapeReferenceArray(
    shapeId: ShapeId,
    field: string,
    references: ShapeId[]
  ): ValidationResult {
    const errors: Array<{ path: string; message: string; code: string }> = [];

    if (!Array.isArray(references)) {
      errors.push({
        path: `${shapeId}.${field}`,
        message: `${field} must be an array`,
        code: 'INVALID_REFERENCE_ARRAY_TYPE',
      });
      return { valid: false, errors };
    }

    for (const reference of references) {
      const refResult = this.validateShapeReference(shapeId, field, reference);
      if (!refResult.valid) {
        errors.push(...refResult.errors);
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate a map of shape references
   * @param shapeId - The parent shape ID
   * @param field - The field name
   * @param references - The map of shape references
   * @returns Validation result
   */
  private validateShapeReferenceMap(
    shapeId: ShapeId,
    field: string,
    references: Record<string, ShapeId>
  ): ValidationResult {
    const errors: Array<{ path: string; message: string; code: string }> = [];

    if (typeof references !== 'object' || references === null || Array.isArray(references)) {
      errors.push({
        path: `${shapeId}.${field}`,
        message: `${field} must be an object`,
        code: 'INVALID_REFERENCE_MAP_TYPE',
      });
      return { valid: false, errors };
    }

    for (const [key, reference] of Object.entries(references)) {
      const refResult = this.validateShapeReference(shapeId, `${field}.${key}`, reference);
      if (!refResult.valid) {
        errors.push(...refResult.errors);
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}
