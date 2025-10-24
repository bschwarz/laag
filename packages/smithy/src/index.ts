/**
 * @laag/smithy - TypeScript library for interfacing with AWS Smithy models
 * @module @laag/smithy
 */

// ============================================================================
// Main Smithy Class
// ============================================================================

export { Smithy as default, Smithy } from './smithy.js';

// ============================================================================
// Managers
// ============================================================================

export { ServiceManager } from './service-manager.js';
export { ShapeManager } from './shapes/shape-manager.js';
export { TraitManager } from './traits/trait-manager.js';

// ============================================================================
// Shape Classes
// ============================================================================

export { BaseShape } from './shapes/base-shape.js';
export { OperationShape } from './shapes/operation.js';
export { ResourceShape } from './shapes/resource.js';
export { ServiceShape } from './shapes/service.js';
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

export { ModelValidator } from './validators/model-validator.js';
export { ShapeValidator } from './validators/shape-validator.js';
export { TraitValidator } from './validators/trait-validator.js';

// ============================================================================
// Parsers
// ============================================================================

export { JsonParser } from './parsers/json-parser.js';

// ============================================================================
// Code Generators
// ============================================================================

export { JavaScriptGenerator } from './generators/javascript-generator.js';
export { PythonGenerator } from './generators/python-generator.js';
export { TypeScriptGenerator } from './generators/typescript-generator.js';

// ============================================================================
// Utilities
// ============================================================================

// Shape ID utilities
export { createShapeId, isAbsoluteShapeId, parseShapeId } from './utils/shape-id.js';

// Selector utilities
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

export * from './types.js';

// ============================================================================
// Package Metadata
// ============================================================================

export const version = '1.0.0-alpha.0';
