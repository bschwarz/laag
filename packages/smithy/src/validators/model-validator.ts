/**
 * Model validator for Smithy models
 * @module validators/model-validator
 */

import type { ValidationResult } from '@laag/core';
import type { SmithyModel } from '../types.js';

/**
 * Validates Smithy models according to the Smithy specification
 */
export class ModelValidator {
  /**
   * Validate a complete Smithy model
   * @param model - The Smithy model to validate
   * @returns Validation result with any errors found
   */
  validate(model: SmithyModel): ValidationResult {
    const errors: Array<{ path: string; message: string; code: string }> = [];

    // Validate version
    const versionResult = this.validateVersion(model.smithy);
    if (!versionResult.valid) {
      errors.push(...versionResult.errors);
    }

    // Validate metadata
    if (model.metadata !== undefined) {
      const metadataResult = this.validateMetadata(model.metadata);
      if (!metadataResult.valid) {
        errors.push(...metadataResult.errors);
      }
    }

    // Validate shapes collection
    const shapesResult = this.validateShapes(model.shapes);
    if (!shapesResult.valid) {
      errors.push(...shapesResult.errors);
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate the Smithy version
   * @param version - The version string to validate
   * @returns Validation result
   */
  validateVersion(version: string): ValidationResult {
    const errors: Array<{ path: string; message: string; code: string }> = [];

    if (!version) {
      errors.push({
        path: 'smithy',
        message: 'Smithy version is required',
        code: 'MISSING_VERSION',
      });
      return { valid: false, errors };
    }

    if (typeof version !== 'string') {
      errors.push({
        path: 'smithy',
        message: 'Smithy version must be a string',
        code: 'INVALID_VERSION_TYPE',
      });
      return { valid: false, errors };
    }

    // Validate version format (should be like "1.0", "2.0", etc.)
    const versionPattern = /^\d+\.\d+$/;
    if (!versionPattern.test(version)) {
      errors.push({
        path: 'smithy',
        message: `Invalid Smithy version format: "${version}". Expected format: "X.Y" (e.g., "2.0")`,
        code: 'INVALID_VERSION_FORMAT',
      });
      return { valid: false, errors };
    }

    // Check for supported versions
    const supportedVersions = ['1.0', '2.0'];
    if (!supportedVersions.includes(version)) {
      errors.push({
        path: 'smithy',
        message: `Unsupported Smithy version: "${version}". Supported versions: ${supportedVersions.join(', ')}`,
        code: 'UNSUPPORTED_VERSION',
      });
      return { valid: false, errors };
    }

    return { valid: true, errors: [] };
  }

  /**
   * Validate model metadata
   * @param metadata - The metadata object to validate
   * @returns Validation result
   */
  validateMetadata(metadata: Record<string, unknown>): ValidationResult {
    const errors: Array<{ path: string; message: string; code: string }> = [];

    if (typeof metadata !== 'object' || metadata === null) {
      errors.push({
        path: 'metadata',
        message: 'Metadata must be an object',
        code: 'INVALID_METADATA_TYPE',
      });
      return { valid: false, errors };
    }

    if (Array.isArray(metadata)) {
      errors.push({
        path: 'metadata',
        message: 'Metadata must be an object, not an array',
        code: 'INVALID_METADATA_TYPE',
      });
      return { valid: false, errors };
    }

    return { valid: true, errors: [] };
  }

  /**
   * Validate the shapes collection
   * @param shapes - The shapes object to validate
   * @returns Validation result
   */
  validateShapes(shapes: Record<string, unknown>): ValidationResult {
    const errors: Array<{ path: string; message: string; code: string }> = [];

    if (shapes === null || shapes === undefined) {
      errors.push({
        path: 'shapes',
        message: shapes === null ? 'Shapes must be an object' : 'Shapes collection is required',
        code: shapes === null ? 'INVALID_SHAPES_TYPE' : 'MISSING_SHAPES',
      });
      return { valid: false, errors };
    }

    if (typeof shapes !== 'object') {
      errors.push({
        path: 'shapes',
        message: 'Shapes must be an object',
        code: 'INVALID_SHAPES_TYPE',
      });
      return { valid: false, errors };
    }

    if (Array.isArray(shapes)) {
      errors.push({
        path: 'shapes',
        message: 'Shapes must be an object, not an array',
        code: 'INVALID_SHAPES_TYPE',
      });
      return { valid: false, errors };
    }

    // Validate that shapes is not empty
    const shapeIds = Object.keys(shapes);
    if (shapeIds.length === 0) {
      errors.push({
        path: 'shapes',
        message: 'Shapes collection cannot be empty',
        code: 'EMPTY_SHAPES',
      });
      return { valid: false, errors };
    }

    // Validate each shape ID format
    for (const shapeId of shapeIds) {
      if (!this.isValidShapeId(shapeId)) {
        errors.push({
          path: `shapes.${shapeId}`,
          message: `Invalid shape ID format: "${shapeId}". Expected format: "namespace#ShapeName" or "ShapeName"`,
          code: 'INVALID_SHAPE_ID',
        });
      }

      // Validate that each shape is an object
      const shape = shapes[shapeId];
      if (typeof shape !== 'object' || shape === null || Array.isArray(shape)) {
        errors.push({
          path: `shapes.${shapeId}`,
          message: `Shape must be an object`,
          code: 'INVALID_SHAPE_TYPE',
        });
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate a shape ID format
   * @param shapeId - The shape ID to validate
   * @returns True if valid, false otherwise
   */
  private isValidShapeId(shapeId: string): boolean {
    if (!shapeId || typeof shapeId !== 'string') {
      return false;
    }

    // Shape ID can be either "namespace#ShapeName" or just "ShapeName"
    // Namespace and shape name must start with a letter and contain only alphanumeric, underscore, or dot
    const absolutePattern = /^[A-Za-z][A-Za-z0-9_.]*#[A-Za-z][A-Za-z0-9_]*$/;
    const relativePattern = /^[A-Za-z][A-Za-z0-9_]*$/;

    return absolutePattern.test(shapeId) || relativePattern.test(shapeId);
  }
}
