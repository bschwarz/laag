/**
 * OperationShape - Represents a Smithy operation shape
 * @module shapes/operation
 */

import type { OperationShape as IOperationShape, ShapeId } from '../types';
import { BaseShape } from './base-shape';

/**
 * Represents a Smithy operation shape
 * Operations define service actions with input, output, and errors
 */
export class OperationShape extends BaseShape {
  input?: ShapeId;
  output?: ShapeId;
  errors?: ShapeId[];

  /**
   * Create a new OperationShape
   * @param input - Optional input structure
   * @param output - Optional output structure
   * @param errors - Optional error structures
   * @param traits - Optional traits applied to the shape
   */
  constructor(
    input?: ShapeId,
    output?: ShapeId,
    errors?: ShapeId[],
    traits?: Record<string, unknown>
  ) {
    super('operation', traits);
    this.input = input;
    this.output = output;
    this.errors = errors;
  }

  /**
   * Set the input shape
   * @param inputId - The input shape ID
   */
  setInput(inputId: ShapeId): void {
    this.input = inputId;
  }

  /**
   * Get the input shape ID
   * @returns The input shape ID, or undefined if not set
   */
  getInput(): ShapeId | undefined {
    return this.input;
  }

  /**
   * Set the output shape
   * @param outputId - The output shape ID
   */
  setOutput(outputId: ShapeId): void {
    this.output = outputId;
  }

  /**
   * Get the output shape ID
   * @returns The output shape ID, or undefined if not set
   */
  getOutput(): ShapeId | undefined {
    return this.output;
  }

  /**
   * Add an error to the operation
   * @param errorId - The error shape ID
   */
  addError(errorId: ShapeId): void {
    this.errors ??= [];
    if (!this.errors.includes(errorId)) {
      this.errors.push(errorId);
    }
  }

  /**
   * Remove an error from the operation
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
  override toObject(): IOperationShape {
    const obj: IOperationShape = {
      type: 'operation',
    };
    if (this.input) {
      obj.input = this.input;
    }
    if (this.output) {
      obj.output = this.output;
    }
    if (this.errors && this.errors.length > 0) {
      obj.errors = [...this.errors];
    }
    if (this.traits && Object.keys(this.traits).length > 0) {
      obj.traits = { ...this.traits };
    }
    return obj;
  }
}
