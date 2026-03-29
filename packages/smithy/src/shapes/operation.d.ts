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
export declare class OperationShape extends BaseShape {
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
  );
  /**
   * Set the input shape
   * @param inputId - The input shape ID
   */
  setInput(inputId: ShapeId): void;
  /**
   * Get the input shape ID
   * @returns The input shape ID, or undefined if not set
   */
  getInput(): ShapeId | undefined;
  /**
   * Set the output shape
   * @param outputId - The output shape ID
   */
  setOutput(outputId: ShapeId): void;
  /**
   * Get the output shape ID
   * @returns The output shape ID, or undefined if not set
   */
  getOutput(): ShapeId | undefined;
  /**
   * Add an error to the operation
   * @param errorId - The error shape ID
   */
  addError(errorId: ShapeId): void;
  /**
   * Remove an error from the operation
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
  toObject(): IOperationShape;
}
//# sourceMappingURL=operation.d.ts.map
