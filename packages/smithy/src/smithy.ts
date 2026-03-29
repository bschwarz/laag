/**
 * Main Smithy class for working with AWS Smithy models
 * @module smithy
 */

import type { ValidationResult } from '@laag/core';
import { LaagBase, ParseError, ValidationError } from '@laag/core';
import { JavaScriptGenerator } from './generators/javascript-generator.js';
import { PythonGenerator } from './generators/python-generator.js';
import { TypeScriptGenerator } from './generators/typescript-generator.js';
import { JsonParser } from './parsers/json-parser.js';
import { ServiceManager } from './service-manager.js';
import { ShapeManager } from './shapes/shape-manager.js';
import { TraitManager } from './traits/trait-manager.js';
import type {
    GeneratorOptions,
    HttpBinding,
    OperationShape,
    ResourceShape,
    ServiceShape,
    Shape,
    ShapeId,
    ShapeType,
    SmithyModel
} from './types.js';
import { selectShapes, type SelectorMatch } from './utils/selector.js';
import { ModelValidator } from './validators/model-validator.js';
import { ShapeValidator } from './validators/shape-validator.js';

/**
 * Main class for working with Smithy models
 *
 * Provides a comprehensive API for parsing, validating, manipulating, and
 * serializing AWS Smithy models. Extends LaagBase to provide consistent
 * functionality across the laag library collection.
 *
 * @class Smithy
 * @extends LaagBase
 * @since 1.0.0
 *
 * @example
 * ```typescript
 * import { Smithy } from '@laag/smithy';
 *
 * // From JSON string
 * const smithy = new Smithy('{"smithy": "2.0", "shapes": {...}}');
 *
 * // From object
 * const smithy = new Smithy({ smithy: "2.0", shapes: {...} });
 *
 * // Access model properties
 * console.log(smithy.version);
 * console.log(smithy.metadata);
 *
 * // Work with shapes
 * const shape = smithy.getShape("example.weather#GetWeather");
 * const services = smithy.getServices();
 * ```
 */
export class Smithy extends LaagBase {
  private model: SmithyModel;
  private shapeManager: ShapeManager;
  private traitManager: TraitManager;
  private serviceManager: ServiceManager;
  private parser: JsonParser;
  private modelValidator: ModelValidator;

  /**
   * Create a new Smithy instance
   *
   * @param input - Smithy model as JSON string or object
   * @throws {ParseError} If the input cannot be parsed
   * @throws {ValidationError} If the model structure is invalid
   *
   * @example
   * ```typescript
   * // From JSON string
   * const smithy = new Smithy(jsonString);
   *
   * // From object
   * const smithy = new Smithy({
   *   smithy: "2.0",
   *   shapes: {
   *     "example.weather#Weather": {
   *       type: "service",
   *       version: "2006-03-01"
   *     }
   *   }
   * });
   * ```
   */
  constructor(input: SmithyModel | string) {
    // Parse the input first to get the model
    const parser = new JsonParser();
    let parsedModel: SmithyModel;

    try {
      parsedModel = parser.parse(input);
    } catch (error) {
      if (error instanceof ParseError) {
        throw error;
      }
      throw new ParseError('Failed to parse Smithy model', {
        originalError: error instanceof Error ? error.message : String(error),
      });
    }

    // Call parent constructor with the parsed model as BaseDocument
    super(parsedModel as unknown as Record<string, unknown>);

    // Store the model
    this.model = parsedModel;

    // Initialize parser and validator
    this.parser = parser;
    this.modelValidator = new ModelValidator();

    // Validate the model structure
    const validationResult = this.modelValidator.validate(this.model);
    if (!validationResult.valid) {
      const errorMessages = validationResult.errors?.map(e => e.message).join('; ') || 'Unknown error';
      throw new ValidationError(`Invalid Smithy model: ${errorMessages}`, 'model');
    }

    // Initialize managers
    this.shapeManager = new ShapeManager(this.model.shapes);
    this.traitManager = new TraitManager(this.model.shapes);
    this.serviceManager = new ServiceManager(this.shapeManager, this.traitManager);
  }

  /**
   * Get the Smithy version
   *
   * @returns The Smithy version string (e.g., "2.0")
   *
   * @example
   * ```typescript
   * const smithy = new Smithy(model);
   * console.log(smithy.version); // "2.0"
   * ```
   */
  get version(): string {
    return this.model.smithy;
  }

  /**
   * Get the model metadata
   *
   * @returns The metadata object, or undefined if no metadata is present
   *
   * @example
   * ```typescript
   * const smithy = new Smithy(model);
   * console.log(smithy.metadata);
   * // { authors: ["example@example.com"] }
   * ```
   */
  get metadata(): Record<string, unknown> | undefined {
    return this.model.metadata;
  }

  /**
   * Get all shapes in the model
   *
   * @returns Map of shape IDs to shapes
   *
   * @example
   * ```typescript
   * const smithy = new Smithy(model);
   * const shapes = smithy.shapes;
   * for (const [shapeId, shape] of shapes) {
   *   console.log(shapeId, shape.type);
   * }
   * ```
   */
  get shapes(): Map<ShapeId, Shape> {
    return this.shapeManager.getAll();
  }

  /**
   * Get a shape by its ID
   *
   * @param shapeId - The shape ID to retrieve
   * @returns The shape, or undefined if not found
   *
   * @example
   * ```typescript
   * const smithy = new Smithy(model);
   * const shape = smithy.getShape("example.weather#GetWeather");
   * if (shape) {
   *   console.log(shape.type); // "operation"
   * }
   * ```
   */
  getShape(shapeId: ShapeId): Shape | undefined {
    return this.shapeManager.get(shapeId);
  }

  /**
   * Get all shapes of a specific type
   *
   * @param type - The shape type to filter by
   * @returns Array of shapes matching the type
   *
   * @example
   * ```typescript
   * const smithy = new Smithy(model);
   * const structures = smithy.getShapesByType("structure");
   * const services = smithy.getShapesByType("service");
   * ```
   */
  getShapesByType(type: ShapeType): Shape[] {
    return this.shapeManager.getByType(type);
  }

  /**
   * Add a shape to the model
   *
   * @param shapeId - The shape ID
   * @param shape - The shape to add
   *
   * @example
   * ```typescript
   * const smithy = new Smithy(model);
   * smithy.addShape("example.weather#Temperature", {
   *   type: "structure",
   *   members: {
   *     value: { target: "smithy.api#Float" }
   *   }
   * });
   * ```
   */
  addShape(shapeId: ShapeId, shape: Shape): void {
    this.shapeManager.add(shapeId, shape);
    // Update the model's shapes
    this.model.shapes[shapeId] = shape;
  }

  /**
   * Remove a shape from the model
   *
   * @param shapeId - The shape ID to remove
   * @returns True if the shape was removed, false if it didn't exist
   *
   * @example
   * ```typescript
   * const smithy = new Smithy(model);
   * const removed = smithy.removeShape("example.weather#OldShape");
   * console.log(removed); // true or false
   * ```
   */
  removeShape(shapeId: ShapeId): boolean {
    const removed = this.shapeManager.remove(shapeId);
    if (removed) {
      delete this.model.shapes[shapeId];
    }
    return removed;
  }

  /**
   * Check if a shape exists in the model
   *
   * @param shapeId - The shape ID to check
   * @returns True if the shape exists
   *
   * @example
   * ```typescript
   * const smithy = new Smithy(model);
   * if (smithy.hasShape("example.weather#GetWeather")) {
   *   console.log("Shape exists");
   * }
   * ```
   */
  hasShape(shapeId: ShapeId): boolean {
    return this.shapeManager.has(shapeId);
  }

  /**
   * Get all services in the model
   *
   * @returns Array of service shapes
   *
   * @example
   * ```typescript
   * const smithy = new Smithy(model);
   * const services = smithy.getServices();
   * for (const service of services) {
   *   console.log(service.version);
   * }
   * ```
   */
  getServices(): ServiceShape[] {
    return this.serviceManager.getServices();
  }

  /**
   * Get a specific service by its shape ID
   *
   * @param serviceId - The service shape ID
   * @returns The service shape, or undefined if not found
   *
   * @example
   * ```typescript
   * const smithy = new Smithy(model);
   * const service = smithy.getService("example.weather#Weather");
   * if (service) {
   *   console.log(service.version);
   * }
   * ```
   */
  getService(serviceId: ShapeId): ServiceShape | undefined {
    return this.serviceManager.getService(serviceId);
  }

  /**
   * Get all operations for a service
   *
   * @param serviceId - The service shape ID
   * @returns Array of operation shapes
   *
   * @example
   * ```typescript
   * const smithy = new Smithy(model);
   * const operations = smithy.getOperations("example.weather#Weather");
   * for (const operation of operations) {
   *   console.log(operation.type); // "operation"
   * }
   * ```
   */
  getOperations(serviceId: ShapeId): OperationShape[] {
    return this.serviceManager.getOperations(serviceId);
  }

  /**
   * Get all resources for a service
   *
   * @param serviceId - The service shape ID
   * @returns Array of resource shapes
   *
   * @example
   * ```typescript
   * const smithy = new Smithy(model);
   * const resources = smithy.getResources("example.weather#Weather");
   * ```
   */
  getResources(serviceId: ShapeId): ResourceShape[] {
    return this.serviceManager.getResources(serviceId);
  }

  /**
   * Get HTTP binding information for an operation
   *
   * @param operationId - The operation shape ID
   * @returns HTTP binding information, or undefined if no HTTP trait is present
   *
   * @example
   * ```typescript
   * const smithy = new Smithy(model);
   * const binding = smithy.getHttpBinding("example.weather#GetWeather");
   * if (binding) {
   *   console.log(binding.method); // "GET"
   *   console.log(binding.uri);    // "/weather/{city}"
   * }
   * ```
   */
  getHttpBinding(operationId: ShapeId): HttpBinding | undefined {
    return this.serviceManager.getHttpBinding(operationId);
  }

  /**
   * Get all traits for a shape
   *
   * @param shapeId - The shape ID
   * @returns Map of trait IDs to trait values, or undefined if shape has no traits
   *
   * @example
   * ```typescript
   * const smithy = new Smithy(model);
   * const traits = smithy.getTraits("example.weather#GetWeather");
   * if (traits) {
   *   for (const [traitId, value] of traits) {
   *     console.log(traitId, value);
   *   }
   * }
   * ```
   */
  getTraits(shapeId: ShapeId): Map<string, unknown> | undefined {
    return this.traitManager.get(shapeId);
  }

  /**
   * Check if a shape has a specific trait
   *
   * @param shapeId - The shape ID
   * @param traitId - The trait ID to check
   * @returns True if the shape has the trait
   *
   * @example
   * ```typescript
   * const smithy = new Smithy(model);
   * if (smithy.hasTrait("example.weather#city", "smithy.api#required")) {
   *   console.log("City is required");
   * }
   * ```
   */
  hasTrait(shapeId: ShapeId, traitId: string): boolean {
    return this.traitManager.has(shapeId, traitId);
  }

  /**
   * Add a trait to a shape
   *
   * @param shapeId - The shape ID
   * @param traitId - The trait ID
   * @param value - The trait value
   * @throws {Error} If trait validation fails
   *
   * @example
   * ```typescript
   * const smithy = new Smithy(model);
   * smithy.addTrait("example.weather#GetWeather", "smithy.api#readonly", {});
   * smithy.addTrait("example.weather#GetWeather", "smithy.api#http", {
   *   method: "GET",
   *   uri: "/weather"
   * });
   * ```
   */
  addTrait(shapeId: ShapeId, traitId: string, value: unknown): void {
    this.traitManager.add(shapeId, traitId, value);

    // Update the model's shape traits
    const shape = this.model.shapes[shapeId];
    if (shape) {
      if (!shape.traits) {
        shape.traits = {};
      }
      shape.traits[traitId] = value;
    }
  }

  /**
   * Validate the Smithy model
   *
   * Performs comprehensive validation including:
   * - Model structure validation
   * - Shape validation
   * - Trait validation
   * - Reference validation
   *
   * @returns Validation result with any errors found
   *
   * @example
   * ```typescript
   * const smithy = new Smithy(model);
   * const result = smithy.validate();
   * if (result.valid) {
   *   console.log("Model is valid");
   * } else {
   *   for (const error of result.errors) {
   *     console.error(error.message);
   *   }
   * }
   * ```
   */
  validate(): ValidationResult {
    const errors: Array<{ path: string; message: string; code: string }> = [];

    // Validate model structure
    const modelResult = this.modelValidator.validate(this.model);
    if (!modelResult.valid) {
      errors.push(...modelResult.errors);
    }

    // Validate each shape
    const shapeValidator = new ShapeValidator(new Set(this.shapeManager.getShapeIds()));
    for (const [shapeId, shape] of this.shapes) {
      const shapeResult = shapeValidator.validate(shapeId, shape);
      if (!shapeResult.valid) {
        errors.push(...shapeResult.errors);
      }
    }

    // Validate traits
    for (const [shapeId, shape] of this.shapes) {
      if (shape.traits) {
        for (const [traitId, value] of Object.entries(shape.traits)) {
          const traitResult = this.traitManager.validateTrait(traitId, value);
          if (!traitResult.valid) {
            const traitErrors = traitResult.errors?.map(e => ({
              path: `${shapeId}.traits.${traitId}`,
              message: e.message,
              code: e.code || 'TRAIT_VALIDATION_ERROR',
            })) || [];
            errors.push(...traitErrors);
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
   * Serialize the model to a JSON object
   *
   * @returns The Smithy model as a plain JavaScript object
   *
   * @example
   * ```typescript
   * const smithy = new Smithy(model);
   * const json = smithy.toJSON();
   * console.log(json.smithy); // "2.0"
   * ```
   */
  toJSON(): SmithyModel {
    return {
      smithy: this.model.smithy,
      ...(this.model.metadata && { metadata: this.model.metadata }),
      shapes: this.shapeManager.toObject(),
    };
  }

  /**
   * Serialize the model to a JSON string
   *
   * @param pretty - Whether to format the JSON with indentation
   * @returns The Smithy model as a JSON string
   *
   * @example
   * ```typescript
   * const smithy = new Smithy(model);
   *
   * // Compact JSON
   * const compact = smithy.toString();
   *
   * // Pretty-printed JSON
   * const pretty = smithy.toString(true);
   * ```
   */
  toString(pretty: boolean = false): string {
    return JSON.stringify(this.toJSON(), null, pretty ? 2 : 0);
  }

  /**
   * Select shapes using a Smithy selector
   *
   * Supports basic selector syntax:
   * - `*` - Select all shapes
   * - `structure` - Select all structures
   * - `[trait|required]` - Select shapes with required trait
   * - `[id|namespace = example]` - Select shapes in namespace
   *
   * @param selector - The selector string
   * @returns Array of matching shapes with their IDs
   *
   * @example
   * ```typescript
   * const smithy = new Smithy(model);
   *
   * // Select all structures
   * const structures = smithy.select("structure");
   *
   * // Select shapes with required trait
   * const required = smithy.select("[trait|required]");
   *
   * // Select all shapes
   * const all = smithy.select("*");
   * ```
   */
  select(selector: string): SelectorMatch[] {
    return selectShapes(selector, this.shapes);
  }

  /**
   * Generate TypeScript code from the model
   *
   * Generates TypeScript interfaces for structures and client classes for services.
   *
   * @param options - Generator options
   * @returns Generated TypeScript code
   *
   * @example
   * ```typescript
   * const smithy = new Smithy(model);
   * const code = smithy.generateTypeScript({
   *   includeComments: true,
   *   indent: 2
   * });
   * console.log(code);
   * ```
   */
  generateTypeScript(options?: GeneratorOptions): string {
    const generator = new TypeScriptGenerator(options);
    return generator.generate(this.toJSON(), options);
  }

  /**
   * Generate JavaScript code from the model
   *
   * Generates JavaScript classes for structures and client classes for services.
   *
   * @param options - Generator options
   * @returns Generated JavaScript code
   *
   * @example
   * ```typescript
   * const smithy = new Smithy(model);
   * const code = smithy.generateJavaScript({
   *   includeComments: true,
   *   outputFormat: 'class',
   *   indent: 2
   * });
   * console.log(code);
   * ```
   */
  generateJavaScript(options?: GeneratorOptions): string {
    const generator = new JavaScriptGenerator(options);
    return generator.generate(this.toJSON(), options);
  }

  /**
   * Generate Python code from the model
   *
   * Generates Python dataclasses for structures and client classes for services.
   *
   * @param options - Generator options
   * @returns Generated Python code
   *
   * @example
   * ```typescript
   * const smithy = new Smithy(model);
   * const code = smithy.generatePython({
   *   includeComments: true,
   *   indent: 4
   * });
   * console.log(code);
   * ```
   */
  generatePython(options?: GeneratorOptions): string {
    const generator = new PythonGenerator(options);
    return generator.generate(this.toJSON(), options);
  }
}
