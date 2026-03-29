/**
 * AWS-specific trait implementations
 * @module traits/aws-traits
 */
import { MarkerTrait, ObjectTrait, StringTrait } from './base-trait.js';
/**
 * AWS API Gateway integration trait
 * @see https://smithy.io/2.0/aws/aws-core.html#aws-api-gateway-integration-trait
 */
export declare class AwsApiGatewayIntegrationTrait extends ObjectTrait<{
  type: string;
  uri?: string;
  httpMethod?: string;
  credentials?: string;
  requestParameters?: Record<string, string>;
  requestTemplates?: Record<string, string>;
  passthroughBehavior?: string;
  cacheNamespace?: string;
  cacheKeyParameters?: string[];
  responses?: Record<string, unknown>;
}> {
  constructor(value: {
    type: string;
    uri?: string;
    httpMethod?: string;
    credentials?: string;
    requestParameters?: Record<string, string>;
    requestTemplates?: Record<string, string>;
    passthroughBehavior?: string;
    cacheNamespace?: string;
    cacheKeyParameters?: string[];
    responses?: Record<string, unknown>;
  });
  /**
   * Get the integration type
   */
  getType(): string;
  /**
   * Get the integration URI
   */
  getUri(): string | undefined;
  /**
   * Get the HTTP method for the integration
   */
  getHttpMethod(): string | undefined;
}
/**
 * AWS IAM action trait - defines the IAM action for an operation
 * @see https://smithy.io/2.0/aws/aws-iam.html#aws-iam-action-trait
 */
export declare class AwsIamActionTrait extends StringTrait {
  constructor(action: string);
  /**
   * Get the IAM action name
   */
  getAction(): string;
  /**
   * Get the service prefix from the action
   */
  getServicePrefix(): string | undefined;
  /**
   * Get the action name without service prefix
   */
  getActionName(): string;
}
/**
 * AWS IAM resource trait - defines the IAM resource for an operation
 * @see https://smithy.io/2.0/aws/aws-iam.html#aws-iam-resource-trait
 */
export declare class AwsIamResourceTrait extends StringTrait {
  constructor(resource: string);
  /**
   * Get the IAM resource ARN pattern
   */
  getResource(): string;
}
/**
 * AWS auth trait - configures AWS authentication
 * @see https://smithy.io/2.0/aws/aws-auth.html
 */
export declare class AwsAuthTrait extends ObjectTrait<{
  sigv4?: {
    name: string;
  };
}> {
  constructor(value: {
    sigv4?: {
      name: string;
    };
  });
  /**
   * Get the SigV4 service name
   */
  getSigV4Name(): string | undefined;
  /**
   * Check if SigV4 is configured
   */
  hasSigV4(): boolean;
}
/**
 * AWS CloudFormation name trait - defines the CloudFormation resource name
 * @see https://smithy.io/2.0/aws/aws-cloudformation.html
 */
export declare class AwsCloudFormationNameTrait extends StringTrait {
  constructor(name: string);
  /**
   * Get the CloudFormation resource name
   */
  getName(): string;
}
/**
 * AWS SDK service ID trait - defines the AWS SDK service identifier
 * @see https://smithy.io/2.0/aws/aws-core.html#aws-api-service-trait
 */
export declare class AwsSdkServiceIdTrait extends StringTrait {
  constructor(serviceId: string);
  /**
   * Get the service ID
   */
  getServiceId(): string;
}
/**
 * AWS ARN reference trait - indicates a string contains an ARN
 * @see https://smithy.io/2.0/aws/aws-core.html#aws-api-arn-trait
 */
export declare class AwsArnReferenceTrait extends MarkerTrait {
  constructor();
}
/**
 * AWS ARN template trait - defines an ARN template for a resource
 * @see https://smithy.io/2.0/aws/aws-core.html#aws-api-arntemplate-trait
 */
export declare class AwsArnTemplateTrait extends StringTrait {
  constructor(template: string);
  /**
   * Get the ARN template
   */
  getTemplate(): string;
  /**
   * Extract placeholder names from the template
   */
  getPlaceholders(): string[];
}
/**
 * AWS control plane trait - marks an operation as a control plane operation
 * @see https://smithy.io/2.0/aws/aws-core.html
 */
export declare class AwsControlPlaneTrait extends MarkerTrait {
  constructor();
}
/**
 * AWS data plane trait - marks an operation as a data plane operation
 * @see https://smithy.io/2.0/aws/aws-core.html
 */
export declare class AwsDataPlaneTrait extends MarkerTrait {
  constructor();
}
/**
 * AWS client endpoint discovery trait - configures endpoint discovery
 * @see https://smithy.io/2.0/aws/aws-core.html#aws-api-clientendpointdiscovery-trait
 */
export declare class AwsClientEndpointDiscoveryTrait extends ObjectTrait<{
  operation: string;
  error?: string;
}> {
  constructor(value: { operation: string; error?: string });
  /**
   * Get the discovery operation
   */
  getOperation(): string;
  /**
   * Get the error shape for discovery failures
   */
  getError(): string | undefined;
}
/**
 * AWS client discovered endpoint trait - marks an operation as using discovered endpoints
 * @see https://smithy.io/2.0/aws/aws-core.html
 */
export declare class AwsClientDiscoveredEndpointTrait extends ObjectTrait<{
  required: boolean;
}> {
  constructor(required?: boolean);
  /**
   * Check if endpoint discovery is required
   */
  isRequired(): boolean;
}
/**
 * AWS protocol trait - defines the AWS protocol for a service
 * @see https://smithy.io/2.0/aws/protocols/
 */
export declare class AwsProtocolTrait extends StringTrait {
  constructor(protocol: string);
  /**
   * Get the protocol name
   */
  getProtocol(): string;
  /**
   * Check if this is a specific protocol
   */
  isProtocol(protocol: string): boolean;
}
//# sourceMappingURL=aws-traits.d.ts.map
