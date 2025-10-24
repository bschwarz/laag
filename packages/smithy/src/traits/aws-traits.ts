/**
 * AWS-specific trait implementations
 * @module traits/aws-traits
 */

import { MarkerTrait, ObjectTrait, StringTrait } from './base-trait.js';

/**
 * AWS API Gateway integration trait
 * @see https://smithy.io/2.0/aws/aws-core.html#aws-api-gateway-integration-trait
 */
export class AwsApiGatewayIntegrationTrait extends ObjectTrait<{
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
  }) {
    super('aws.apigateway#integration', value);
  }

  /**
   * Get the integration type
   */
  getType(): string {
    return this.value.type;
  }

  /**
   * Get the integration URI
   */
  getUri(): string | undefined {
    return this.value.uri;
  }

  /**
   * Get the HTTP method for the integration
   */
  getHttpMethod(): string | undefined {
    return this.value.httpMethod;
  }
}

/**
 * AWS IAM action trait - defines the IAM action for an operation
 * @see https://smithy.io/2.0/aws/aws-iam.html#aws-iam-action-trait
 */
export class AwsIamActionTrait extends StringTrait {
  constructor(action: string) {
    super('aws.iam#iamAction', action);
  }

  /**
   * Get the IAM action name
   */
  getAction(): string {
    return this.value;
  }

  /**
   * Get the service prefix from the action
   */
  getServicePrefix(): string | undefined {
    const parts = this.value.split(':');
    return parts.length > 1 ? parts[0] : undefined;
  }

  /**
   * Get the action name without service prefix
   */
  getActionName(): string {
    const parts = this.value.split(':');
    return parts.length > 1 ? (parts[1] ?? this.value) : this.value;
  }
}

/**
 * AWS IAM resource trait - defines the IAM resource for an operation
 * @see https://smithy.io/2.0/aws/aws-iam.html#aws-iam-resource-trait
 */
export class AwsIamResourceTrait extends StringTrait {
  constructor(resource: string) {
    super('aws.iam#iamResource', resource);
  }

  /**
   * Get the IAM resource ARN pattern
   */
  getResource(): string {
    return this.value;
  }
}

/**
 * AWS auth trait - configures AWS authentication
 * @see https://smithy.io/2.0/aws/aws-auth.html
 */
export class AwsAuthTrait extends ObjectTrait<{
  sigv4?: {
    name: string;
  };
}> {
  constructor(value: { sigv4?: { name: string } }) {
    super('aws.auth#awsAuth', value);
  }

  /**
   * Get the SigV4 service name
   */
  getSigV4Name(): string | undefined {
    return this.value.sigv4?.name;
  }

  /**
   * Check if SigV4 is configured
   */
  hasSigV4(): boolean {
    return this.value.sigv4 !== undefined;
  }
}

/**
 * AWS CloudFormation name trait - defines the CloudFormation resource name
 * @see https://smithy.io/2.0/aws/aws-cloudformation.html
 */
export class AwsCloudFormationNameTrait extends StringTrait {
  constructor(name: string) {
    super('aws.cloudformation#cfnName', name);
  }

  /**
   * Get the CloudFormation resource name
   */
  getName(): string {
    return this.value;
  }
}

/**
 * AWS SDK service ID trait - defines the AWS SDK service identifier
 * @see https://smithy.io/2.0/aws/aws-core.html#aws-api-service-trait
 */
export class AwsSdkServiceIdTrait extends StringTrait {
  constructor(serviceId: string) {
    super('aws.api#service', serviceId);
  }

  /**
   * Get the service ID
   */
  getServiceId(): string {
    return this.value;
  }
}

/**
 * AWS ARN reference trait - indicates a string contains an ARN
 * @see https://smithy.io/2.0/aws/aws-core.html#aws-api-arn-trait
 */
export class AwsArnReferenceTrait extends MarkerTrait {
  constructor() {
    super('aws.api#arn');
  }
}

/**
 * AWS ARN template trait - defines an ARN template for a resource
 * @see https://smithy.io/2.0/aws/aws-core.html#aws-api-arntemplate-trait
 */
export class AwsArnTemplateTrait extends StringTrait {
  constructor(template: string) {
    super('aws.api#arnTemplate', template);
  }

  /**
   * Get the ARN template
   */
  getTemplate(): string {
    return this.value;
  }

  /**
   * Extract placeholder names from the template
   */
  getPlaceholders(): string[] {
    const matches = this.value.matchAll(/\{([^}]+)\}/g);
    return Array.from(matches, m => m[1]).filter((param): param is string => param !== undefined);
  }
}

/**
 * AWS control plane trait - marks an operation as a control plane operation
 * @see https://smithy.io/2.0/aws/aws-core.html
 */
export class AwsControlPlaneTrait extends MarkerTrait {
  constructor() {
    super('aws.api#controlPlane');
  }
}

/**
 * AWS data plane trait - marks an operation as a data plane operation
 * @see https://smithy.io/2.0/aws/aws-core.html
 */
export class AwsDataPlaneTrait extends MarkerTrait {
  constructor() {
    super('aws.api#dataPlane');
  }
}

/**
 * AWS client endpoint discovery trait - configures endpoint discovery
 * @see https://smithy.io/2.0/aws/aws-core.html#aws-api-clientendpointdiscovery-trait
 */
export class AwsClientEndpointDiscoveryTrait extends ObjectTrait<{
  operation: string;
  error?: string;
}> {
  constructor(value: { operation: string; error?: string }) {
    super('aws.api#clientEndpointDiscovery', value);
  }

  /**
   * Get the discovery operation
   */
  getOperation(): string {
    return this.value.operation;
  }

  /**
   * Get the error shape for discovery failures
   */
  getError(): string | undefined {
    return this.value.error;
  }
}

/**
 * AWS client discovered endpoint trait - marks an operation as using discovered endpoints
 * @see https://smithy.io/2.0/aws/aws-core.html
 */
export class AwsClientDiscoveredEndpointTrait extends ObjectTrait<{
  required: boolean;
}> {
  constructor(required: boolean = false) {
    super('aws.api#clientDiscoveredEndpoint', { required });
  }

  /**
   * Check if endpoint discovery is required
   */
  isRequired(): boolean {
    return this.value.required;
  }
}

/**
 * AWS protocol trait - defines the AWS protocol for a service
 * @see https://smithy.io/2.0/aws/protocols/
 */
export class AwsProtocolTrait extends StringTrait {
  constructor(protocol: string) {
    super('aws.protocols#protocol', protocol);
  }

  /**
   * Get the protocol name
   */
  getProtocol(): string {
    return this.value;
  }

  /**
   * Check if this is a specific protocol
   */
  isProtocol(protocol: string): boolean {
    return this.value === protocol;
  }
}
