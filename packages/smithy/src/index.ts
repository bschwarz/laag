/**
 * @laag/smithy - TypeScript library for interfacing with AWS Smithy models
 * 
 * This library provides comprehensive support for working with AWS Smithy models,
 * including parsing, validation, manipulation, and code generation capabilities.
 * 
 * @example
 * ```typescript
 * import { Smithy } from '@laag/smithy';
 * 
 * // Create from JSON
 * const smithy = new Smithy({
 *   smithy: '2.0',
 *   shapes: {
 *     'example.weather#Weather': {
 *       type: 'service',
 *       version: '2006-03-01'
 *     }
 *   }
 * });
 * 
 * // Validate the model
 * const result = smithy.validate();
 * console.log(result.valid); // true
 * 
 * // Generate TypeScript code
 * const code = smithy.generateTypeScript();
 * console.log(code);
 * ```
 * 
 * @module @laag/smithy
 * @since 1.0.0-alpha.0
 * @author Brett Schwarz <brett.schwarz@gmail.com>
 * @license MIT
 */

// ============================================================================
// Main Smithy Class
// ============================================================================

/**
 * Main Smithy class for working with Smithy models
 * 
 * The primary interface for parsing, validating, and manipulating Smithy models.
 * Extends LaagBase to provide consistent functionality across the laag library collection.
 */
export { Smithy as default, Smithy } from './smithy.js';

// ============================================================================
// Managers
// ============================================================================

/**
 * Service manager for handling service-specific operations
 * 
 * Provides methods for working with Smithy services, operations, and resources.
 */
export { ServiceManager } from './service-manager.js';

/**
 * Shape manager for handling shape storage and queries
 * 
 * Manages the collection of shapes in a Smithy model with efficient lookup and filtering.
 */
export { ShapeManager } from './shapes/shape-manager.js';

/**
 * Trait manager for handling trait operations
 * 
 * Manages traits applied to shapes, including validation and standard trait accessors.
 */
export { TraitManager } from './traits/trait-manager.js';

// ============================================================================
// Shape Classes
// ============================================================================

/**
 * Base shape class that all shape types extend
 */
export { BaseShape } from './shapes/base-shape.js';

/**
 * Operation shape class for representing Smithy operations
 */
export { OperationShape } from './shapes/operation.js';

/**
 * Resource shape class for representing Smithy resources
 */
export { ResourceShape } from './shapes/resource.js';

/**
 * Service shape class for representing Smithy services
 */
export { ServiceShape } from './shapes/service.js';

/**
 * Structure shape class for representing Smithy structures
 */
export { StructureShape } from './shapes/structure.js';

// ============================================================================
// Trait Classes
// ============================================================================

// Base trait classes
export {
  ArrayTrait,
  BaseTrait,
  MarkerTrait,
  NumberTrait,
  ObjectTrait,
  ShapeReferenceTrait,
  StringTrait,
} from './traits/base-trait.js';

// HTTP trait classes
export {
  CorsTrait,
  HttpErrorTrait,
  HttpHeaderTrait,
  HttpLabelTrait,
  HttpPayloadTrait,
  HttpQueryTrait,
  HttpResponseCodeTrait,
  HttpTrait,
} from './traits/http-traits.js';

// AWS trait classes
export {
  AwsApiGatewayIntegrationTrait,
  AwsArnReferenceTrait,
  AwsArnTemplateTrait,
  AwsAuthTrait,
  AwsClientDiscoveredEndpointTrait,
  AwsClientEndpointDiscoveryTrait,
  AwsCloudFormationNameTrait,
  AwsControlPlaneTrait,
  AwsDataPlaneTrait,
  AwsIamActionTrait,
  AwsIamResourceTrait,
  AwsProtocolTrait,
  AwsSdkServiceIdTrait,
} from './traits/aws-traits.js';

// ============================================================================
// Validators
// ============================================================================

/**
 * Model validator for validating complete Smithy models
 * 
 * Validates model structure, version, and metadata according to Smithy specification.
 */
export { ModelValidator } from './validators/model-validator.js';

/**
 * Shape validator for validating individual shapes
 * 
 * Validates shape structure, references, and type-specific requirements.
 */
export { ShapeValidator } from './validators/shape-validator.js';

/**
 * Trait validator for validating trait applications
 * 
 * Validates trait values and ensures proper trait application to shapes.
 */
export { TraitValidator } from './validators/trait-validator.js';

// ============================================================================
// Parsers
// ============================================================================

/**
 * JSON parser for parsing Smithy JSON AST format
 * 
 * Parses Smithy models from JSON strings or objects with validation and error handling.
 */
export { JsonParser } from './parsers/json-parser.js';

// ============================================================================
// Code Generators
// ============================================================================

/**
 * JavaScript code generator
 * 
 * Generates JavaScript classes and client code from Smithy models.
 */
export { JavaScriptGenerator } from './generators/javascript-generator.js';

/**
 * Python code generator
 * 
 * Generates Python dataclasses and client code from Smithy models.
 */
export { PythonGenerator } from './generators/python-generator.js';

/**
 * TypeScript code generator
 * 
 * Generates TypeScript interfaces and client code from Smithy models.
 */
export { TypeScriptGenerator } from './generators/typescript-generator.js';

// ============================================================================
// Utilities
// ============================================================================

/**
 * Shape ID utilities for parsing and manipulating Smithy shape identifiers
 * 
 * @example
 * ```typescript
 * import { parseShapeId, createShapeId } from '@laag/smithy';
 * 
 * const parsed = parseShapeId('example.weather#GetWeather');
 * console.log(parsed.namespace); // 'example.weather'
 * console.log(parsed.name);      // 'GetWeather'
 * 
 * const shapeId = createShapeId('example.weather', 'GetWeather');
 * console.log(shapeId); // 'example.weather#GetWeather'
 * ```
 */
export { createShapeId, isAbsoluteShapeId, parseShapeId } from './utils/shape-id.js';

/**
 * Selector utilities for querying shapes using Smithy selector syntax
 * 
 * @example
 * ```typescript
 * import { Smithy, selectShapes } from '@laag/smithy';
 * 
 * const smithy = new Smithy(model);
 * 
 * // Select all structures
 * const structures = smithy.select('structure');
 * 
 * // Select shapes with specific traits
 * const readonlyOps = smithy.select('[trait|readonly]');
 * ```
 */
export {
  createSelectorQuery,
  isValidSelector,
  matchSelector,
  parseSelector,
  selectByNamespace,
  selectByTrait,
  selectByType,
  selectShapes,
  type SelectorContext,
  type SelectorMatch,
} from './utils/selector.js';

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * All TypeScript type definitions for Smithy models
 * 
 * Includes interfaces for SmithyModel, Shape types, Trait types, and utility types.
 * Provides full type safety when working with Smithy models.
 * 
 * @example
 * ```typescript
 * import type { SmithyModel, ServiceShape, OperationShape } from '@laag/smithy';
 * 
 * const model: SmithyModel = {
 *   smithy: '2.0',
 *   shapes: {
 *     'example.weather#Weather': {
 *       type: 'service',
 *       version: '2006-03-01'
 *     } as ServiceShape
 *   }
 * };
 * ```
 */
export * from './types.js';

// ============================================================================
// Package Metadata
// ============================================================================

/**
 * Package version
 */
export const version = '1.0.0-alpha.0';
