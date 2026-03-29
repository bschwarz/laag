/**
 * OperationShape - Represents a Smithy operation shape
 * @module shapes/operation
 */
import { BaseShape } from './base-shape';
/**
 * Represents a Smithy operation shape
 * Operations define service actions with input, output, and errors
 */
export class OperationShape extends BaseShape {
    /**
     * Create a new OperationShape
     * @param input - Optional input structure
     * @param output - Optional output structure
     * @param errors - Optional error structures
     * @param traits - Optional traits applied to the shape
     */
    constructor(input, output, errors, traits) {
        super('operation', traits);
        this.input = input;
        this.output = output;
        this.errors = errors;
    }
    /**
     * Set the input shape
     * @param inputId - The input shape ID
     */
    setInput(inputId) {
        this.input = inputId;
    }
    /**
     * Get the input shape ID
     * @returns The input shape ID, or undefined if not set
     */
    getInput() {
        return this.input;
    }
    /**
     * Set the output shape
     * @param outputId - The output shape ID
     */
    setOutput(outputId) {
        this.output = outputId;
    }
    /**
     * Get the output shape ID
     * @returns The output shape ID, or undefined if not set
     */
    getOutput() {
        return this.output;
    }
    /**
     * Add an error to the operation
     * @param errorId - The error shape ID
     */
    addError(errorId) {
        this.errors ?? (this.errors = []);
        if (!this.errors.includes(errorId)) {
            this.errors.push(errorId);
        }
    }
    /**
     * Remove an error from the operation
     * @param errorId - The error shape ID to remove
     * @returns True if the error was removed, false if it didn't exist
     */
    removeError(errorId) {
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
    getErrors() {
        return this.errors ? [...this.errors] : [];
    }
    /**
     * Convert the shape to a plain object
     * @returns Plain object representation
     */
    toObject() {
        const obj = {
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
//# sourceMappingURL=operation.js.map