/**
 * Trait implementations and management
 * @module traits
 */

// Export trait manager
export { TraitManager } from './trait-manager.js';

// Export base trait classes
export {
  ArrayTrait,
  BaseTrait,
  MarkerTrait,
  NumberTrait,
  ObjectTrait,
  ShapeReferenceTrait,
  StringTrait,
} from './base-trait.js';

// Export HTTP trait classes
export {
  CorsTrait,
  HttpErrorTrait,
  HttpHeaderTrait,
  HttpLabelTrait,
  HttpPayloadTrait,
  HttpQueryTrait,
  HttpResponseCodeTrait,
  HttpTrait,
} from './http-traits.js';

// Export AWS trait classes
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
} from './aws-traits.js';
