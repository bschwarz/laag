/**
 * @laag/smithy - TypeScript library for interfacing with AWS Smithy models
 * @module @laag/smithy
 */

// Export managers
export { ServiceManager } from './service-manager.js';
export { ShapeManager } from './shapes/shape-manager.js';
export { TraitManager } from './traits/trait-manager.js';

// Export shape classes
export { BaseShape } from './shapes/base-shape.js';
export { OperationShape } from './shapes/operation.js';
export { ResourceShape } from './shapes/resource.js';
export { ServiceShape } from './shapes/service.js';
export { StructureShape } from './shapes/structure.js';

// Export trait classes
export {
    AwsApiGatewayIntegrationTrait, AwsArnReferenceTrait,
    AwsArnTemplateTrait, AwsAuthTrait, AwsClientDiscoveredEndpointTrait, AwsClientEndpointDiscoveryTrait, AwsCloudFormationNameTrait, AwsControlPlaneTrait,
    AwsDataPlaneTrait, AwsIamActionTrait,
    AwsIamResourceTrait, AwsProtocolTrait, AwsSdkServiceIdTrait
} from './traits/aws-traits.js';
export { BaseTrait } from './traits/base-trait.js';
export { HttpTrait as HttpTraitClass } from './traits/http-traits.js';

// Export validators
export { ModelValidator } from './validators/model-validator.js';
export { ShapeValidator } from './validators/shape-validator.js';
export { TraitValidator } from './validators/trait-validator.js';

// Export parsers
export { JsonParser } from './parsers/json-parser.js';

// Export utilities
export {
    createSelectorQuery,
    isValidSelector, matchSelector, parseSelector, selectByNamespace, selectByTrait, selectByType, selectShapes, type SelectorContext,
    type SelectorMatch
} from './utils/selector.js';
export { createShapeId, isAbsoluteShapeId, parseShapeId } from './utils/shape-id.js';

// Export all types
export * from './types.js';

export const version = '1.0.0-alpha.0';
