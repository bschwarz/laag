/**
 * Tests for AWS trait implementations
 */

import { describe, expect, test } from 'bun:test';
import {
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
} from '../../src/traits/aws-traits';

describe('AwsApiGatewayIntegrationTrait', () => {
  test('should create API Gateway integration trait', () => {
    const trait = new AwsApiGatewayIntegrationTrait({
      type: 'aws_proxy',
      uri: 'arn:aws:lambda:us-east-1:123456789012:function:MyFunction',
      httpMethod: 'POST',
    });

    expect(trait.getType()).toBe('aws_proxy');
    expect(trait.getUri()).toBe('arn:aws:lambda:us-east-1:123456789012:function:MyFunction');
    expect(trait.getHttpMethod()).toBe('POST');
  });

  test('should serialize to JSON', () => {
    const trait = new AwsApiGatewayIntegrationTrait({
      type: 'aws_proxy',
      uri: 'arn:aws:lambda:us-east-1:123456789012:function:MyFunction',
    });

    const json = trait.toJSON();
    expect(json).toHaveProperty('type', 'aws_proxy');
    expect(json).toHaveProperty('uri');
  });
});

describe('AwsIamActionTrait', () => {
  test('should create IAM action trait', () => {
    const trait = new AwsIamActionTrait('s3:GetObject');
    expect(trait.getAction()).toBe('s3:GetObject');
  });

  test('should extract service prefix', () => {
    const trait = new AwsIamActionTrait('s3:GetObject');
    expect(trait.getServicePrefix()).toBe('s3');
    expect(trait.getActionName()).toBe('GetObject');
  });

  test('should handle action without prefix', () => {
    const trait = new AwsIamActionTrait('GetObject');
    expect(trait.getServicePrefix()).toBeUndefined();
    expect(trait.getActionName()).toBe('GetObject');
  });

  test('should serialize to string', () => {
    const trait = new AwsIamActionTrait('s3:GetObject');
    expect(trait.toJSON()).toBe('s3:GetObject');
  });
});

describe('AwsIamResourceTrait', () => {
  test('should create IAM resource trait', () => {
    const trait = new AwsIamResourceTrait('arn:aws:s3:::bucket-name/*');
    expect(trait.getResource()).toBe('arn:aws:s3:::bucket-name/*');
  });

  test('should serialize to string', () => {
    const trait = new AwsIamResourceTrait('arn:aws:s3:::bucket-name/*');
    expect(trait.toJSON()).toBe('arn:aws:s3:::bucket-name/*');
  });
});

describe('AwsAuthTrait', () => {
  test('should create AWS auth trait', () => {
    const trait = new AwsAuthTrait({
      sigv4: { name: 's3' },
    });

    expect(trait.getSigV4Name()).toBe('s3');
    expect(trait.hasSigV4()).toBe(true);
  });

  test('should handle missing SigV4', () => {
    const trait = new AwsAuthTrait({});
    expect(trait.getSigV4Name()).toBeUndefined();
    expect(trait.hasSigV4()).toBe(false);
  });

  test('should serialize to JSON', () => {
    const trait = new AwsAuthTrait({ sigv4: { name: 's3' } });
    const json = trait.toJSON();
    expect(json).toEqual({ sigv4: { name: 's3' } });
  });
});

describe('AwsCloudFormationNameTrait', () => {
  test('should create CloudFormation name trait', () => {
    const trait = new AwsCloudFormationNameTrait('MyResource');
    expect(trait.getName()).toBe('MyResource');
  });

  test('should serialize to string', () => {
    const trait = new AwsCloudFormationNameTrait('MyResource');
    expect(trait.toJSON()).toBe('MyResource');
  });
});

describe('AwsSdkServiceIdTrait', () => {
  test('should create SDK service ID trait', () => {
    const trait = new AwsSdkServiceIdTrait('S3');
    expect(trait.getServiceId()).toBe('S3');
  });

  test('should serialize to string', () => {
    const trait = new AwsSdkServiceIdTrait('S3');
    expect(trait.toJSON()).toBe('S3');
  });
});

describe('AwsArnReferenceTrait', () => {
  test('should create ARN reference trait', () => {
    const trait = new AwsArnReferenceTrait();
    expect(trait.getId()).toBe('aws.api#arn');
  });

  test('should serialize to empty object', () => {
    const trait = new AwsArnReferenceTrait();
    expect(trait.toJSON()).toEqual({});
  });
});

describe('AwsArnTemplateTrait', () => {
  test('should create ARN template trait', () => {
    const trait = new AwsArnTemplateTrait('arn:aws:s3:::{bucketName}/*');
    expect(trait.getTemplate()).toBe('arn:aws:s3:::{bucketName}/*');
  });

  test('should extract placeholders', () => {
    const trait = new AwsArnTemplateTrait('arn:aws:s3:::{bucketName}/{key}');
    const placeholders = trait.getPlaceholders();
    expect(placeholders).toEqual(['bucketName', 'key']);
  });

  test('should handle template without placeholders', () => {
    const trait = new AwsArnTemplateTrait('arn:aws:s3:::bucket-name/*');
    expect(trait.getPlaceholders()).toEqual([]);
  });

  test('should serialize to string', () => {
    const trait = new AwsArnTemplateTrait('arn:aws:s3:::{bucketName}/*');
    expect(trait.toJSON()).toBe('arn:aws:s3:::{bucketName}/*');
  });
});

describe('AwsControlPlaneTrait', () => {
  test('should create control plane trait', () => {
    const trait = new AwsControlPlaneTrait();
    expect(trait.getId()).toBe('aws.api#controlPlane');
  });

  test('should serialize to empty object', () => {
    const trait = new AwsControlPlaneTrait();
    expect(trait.toJSON()).toEqual({});
  });
});

describe('AwsDataPlaneTrait', () => {
  test('should create data plane trait', () => {
    const trait = new AwsDataPlaneTrait();
    expect(trait.getId()).toBe('aws.api#dataPlane');
  });

  test('should serialize to empty object', () => {
    const trait = new AwsDataPlaneTrait();
    expect(trait.toJSON()).toEqual({});
  });
});

describe('AwsClientEndpointDiscoveryTrait', () => {
  test('should create client endpoint discovery trait', () => {
    const trait = new AwsClientEndpointDiscoveryTrait({
      operation: 'DescribeEndpoints',
      error: 'EndpointNotFoundError',
    });

    expect(trait.getOperation()).toBe('DescribeEndpoints');
    expect(trait.getError()).toBe('EndpointNotFoundError');
  });

  test('should handle missing error', () => {
    const trait = new AwsClientEndpointDiscoveryTrait({
      operation: 'DescribeEndpoints',
    });

    expect(trait.getOperation()).toBe('DescribeEndpoints');
    expect(trait.getError()).toBeUndefined();
  });

  test('should serialize to JSON', () => {
    const trait = new AwsClientEndpointDiscoveryTrait({
      operation: 'DescribeEndpoints',
    });

    const json = trait.toJSON();
    expect(json).toEqual({ operation: 'DescribeEndpoints' });
  });
});

describe('AwsClientDiscoveredEndpointTrait', () => {
  test('should create client discovered endpoint trait with required=true', () => {
    const trait = new AwsClientDiscoveredEndpointTrait(true);
    expect(trait.isRequired()).toBe(true);
  });

  test('should create client discovered endpoint trait with required=false', () => {
    const trait = new AwsClientDiscoveredEndpointTrait(false);
    expect(trait.isRequired()).toBe(false);
  });

  test('should default to required=false', () => {
    const trait = new AwsClientDiscoveredEndpointTrait();
    expect(trait.isRequired()).toBe(false);
  });

  test('should serialize to JSON', () => {
    const trait = new AwsClientDiscoveredEndpointTrait(true);
    const json = trait.toJSON();
    expect(json).toEqual({ required: true });
  });
});

describe('AwsProtocolTrait', () => {
  test('should create AWS protocol trait', () => {
    const trait = new AwsProtocolTrait('restJson1');
    expect(trait.getProtocol()).toBe('restJson1');
  });

  test('should check protocol type', () => {
    const trait = new AwsProtocolTrait('restJson1');
    expect(trait.isProtocol('restJson1')).toBe(true);
    expect(trait.isProtocol('restXml')).toBe(false);
  });

  test('should serialize to string', () => {
    const trait = new AwsProtocolTrait('restJson1');
    expect(trait.toJSON()).toBe('restJson1');
  });
});
