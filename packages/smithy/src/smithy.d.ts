/**
 * Main Smithy class for working with AWS Smithy models
 * @module smithy
 */
import type { ValidationResult } from '@laag/core';
import { LaagBase } from '@laag/core';
import type {
  GeneratorOptions,
  HttpBinding,
  OperationShape,
  ResourceShape,
  ServiceShape,
  Shape,
  ShapeId,
  ShapeType,
  SmithyModel,
} from './types.js';
import { type SelectorMatch } from './utils/selector.js';
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
export declare class Smithy extends LaagBase {
  private model;
  private shapeManager;
  private traitManager;
  private serviceManager;
  private parser;
  private modelValidator;
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
  constructor(input: SmithyModel | string);
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
  get version(): string;
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
  get metadata(): Record<string, unknown> | undefined;
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
  get shapes(): Map<ShapeId, Shape>;
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
  getShape(shapeId: ShapeId): Shape | undefined;
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
  getShapesByType(type: ShapeType): Shape[];
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
  addShape(shapeId: ShapeId, shape: Shape): void;
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
  removeShape(shapeId: ShapeId): boolean;
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
  hasShape(shapeId: ShapeId): boolean;
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
  getServices(): ServiceShape[];
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
  getService(serviceId: ShapeId): ServiceShape | undefined;
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
  getOperations(serviceId: ShapeId): OperationShape[];
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
  getResources(serviceId: ShapeId): ResourceShape[];
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
  getHttpBinding(operationId: ShapeId): HttpBinding | undefined;
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
  getTraits(shapeId: ShapeId): Map<string, unknown> | undefined;
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
  hasTrait(shapeId: ShapeId, traitId: string): boolean;
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
  addTrait(shapeId: ShapeId, traitId: string, value: unknown): void;
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
  validate(): ValidationResult;
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
  toJSON(): SmithyModel;
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
  toString(pretty?: boolean): string;
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
  select(selector: string): SelectorMatch[];
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
  generateTypeScript(options?: GeneratorOptions): string;
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
  generateJavaScript(options?: GeneratorOptions): string;
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
  generatePython(options?: GeneratorOptions): string;
}
//# sourceMappingURL=smithy.d.ts.map
