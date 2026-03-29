/**
 * Comprehensive TypeScript type definitions for OpenAPI 3.0 specification
 * Based on the OpenAPI Specification 3.0.3
 * https://spec.openapis.org/oas/v3.0.3
 */

import { BaseDocument, ExtensionObject } from '@laag/core';

/**
 * The root document object of the OpenAPI document
 */
export interface OpenAPIDocument extends BaseDocument {
  /** REQUIRED. This string MUST be the semantic version number of the OpenAPI Specification version that the OpenAPI document uses */
  openapi: string;
  /** REQUIRED. Provides metadata about the API */
  info: InfoObject;
  /** REQUIRED. The available paths and operations for the API */
  paths: PathsObject;
  /** An array of Server Objects, which provide connectivity information to a target server */
  servers?: ServerObject[];
  /** An element to hold various schemas for the specification */
  components?: ComponentsObject;
  /** A declaration of which security mechanisms can be used across the API */
  security?: SecurityRequirementObject[];
  /** A list of tags used by the specification with additional metadata */
  tags?: TagObject[];
  /** Additional external documentation */
  externalDocs?: ExternalDocumentationObject;
}

/**
 * The object provides metadata about the API
 */
export interface InfoObject extends ExtensionObject {
  /** REQUIRED. The title of the API */
  title: string;
  /** REQUIRED. The version of the OpenAPI document */
  version: string;
  /** A short description of the API */
  description?: string;
  /** A URL to the Terms of Service for the API */
  termsOfService?: string;
  /** The contact information for the exposed API */
  contact?: ContactObject;
  /** The license information for the exposed API */
  license?: LicenseObject;
}

/**
 * Contact information for the exposed API
 */
export interface ContactObject extends ExtensionObject {
  /** The identifying name of the contact person/organization */
  name?: string;
  /** The URL pointing to the contact information */
  url?: string;
  /** The email address of the contact person/organization */
  email?: string;
}

/**
 * License information for the exposed API
 */
export interface LicenseObject extends ExtensionObject {
  /** REQUIRED. The license name used for the API */
  name: string;
  /** A URL to the license used for the API */
  url?: string;
}

/**
 * An object representing a Server
 */
export interface ServerObject extends ExtensionObject {
  /** REQUIRED. A URL to the target host */
  url: string;
  /** An optional string describing the host designated by the URL */
  description?: string;
  /** A map between a variable name and its value */
  variables?: Record<string, ServerVariableObject>;
}

/**
 * An object representing a Server Variable for server URL template substitution
 */
export interface ServerVariableObject extends ExtensionObject {
  /** REQUIRED. The default value to use for substitution */
  default: string;
  /** An enumeration of string values to be used if the substitution options are from a limited set */
  enum?: string[];
  /** An optional description for the server variable */
  description?: string;
}

/**
 * Holds the relative paths to the individual endpoints and their operations
 */
export type PathsObject = Record<string, PathItemObject | undefined> & ExtensionObject;

/**
 * Describes the operations available on a single path
 */
export interface PathItemObject extends ExtensionObject {
  /** Allows for an external definition of this path item */
  $ref?: string;
  /** An optional, string summary, intended to apply to all operations in this path */
  summary?: string;
  /** An optional, string description, intended to apply to all operations in this path */
  description?: string;
  /** A definition of a GET operation on this path */
  get?: OperationObject;
  /** A definition of a PUT operation on this path */
  put?: OperationObject;
  /** A definition of a POST operation on this path */
  post?: OperationObject;
  /** A definition of a DELETE operation on this path */
  delete?: OperationObject;
  /** A definition of a OPTIONS operation on this path */
  options?: OperationObject;
  /** A definition of a HEAD operation on this path */
  head?: OperationObject;
  /** A definition of a PATCH operation on this path */
  patch?: OperationObject;
  /** A definition of a TRACE operation on this path */
  trace?: OperationObject;
  /** An alternative server array to service all operations in this path */
  servers?: ServerObject[];
  /** A list of parameters that are applicable for all the operations under this path */
  parameters?: (ParameterObject | ReferenceObject)[];
}

/**
 * Describes a single API operation on a path
 */
export interface OperationObject extends ExtensionObject {
  /** A list of tags for API documentation control */
  tags?: string[];
  /** A short summary of what the operation does */
  summary?: string;
  /** A verbose explanation of the operation behavior */
  description?: string;
  /** Additional external documentation for this operation */
  externalDocs?: ExternalDocumentationObject;
  /** Unique string used to identify the operation */
  operationId?: string;
  /** A list of parameters that are applicable for this operation */
  parameters?: (ParameterObject | ReferenceObject)[];
  /** The request body applicable for this operation */
  requestBody?: RequestBodyObject | ReferenceObject;
  /** REQUIRED. The list of possible responses as they are returned from executing this operation */
  responses: ResponsesObject;
  /** A map of possible out-of band callbacks related to the parent operation */
  callbacks?: Record<string, CallbackObject | ReferenceObject>;
  /** Declares this operation to be deprecated */
  deprecated?: boolean;
  /** A declaration of which security mechanisms can be used for this operation */
  security?: SecurityRequirementObject[];
  /** An alternative server array to service this operation */
  servers?: ServerObject[];
}

/**
 * Allows referencing an external resource for extended documentation
 */
export interface ExternalDocumentationObject extends ExtensionObject {
  /** REQUIRED. The URL for the target documentation */
  url: string;
  /** A short description of the target documentation */
  description?: string;
}

/**
 * Describes a single operation parameter
 */
export interface ParameterObject extends ExtensionObject {
  /** REQUIRED. The name of the parameter */
  name: string;
  /** REQUIRED. The location of the parameter */
  in: 'query' | 'header' | 'path' | 'cookie';
  /** A brief description of the parameter */
  description?: string;
  /** Determines whether this parameter is mandatory */
  required?: boolean;
  /** Specifies that a parameter is deprecated and SHOULD be transitioned out of usage */
  deprecated?: boolean;
  /** Sets the ability to pass empty-valued parameters */
  allowEmptyValue?: boolean;
  /** Describes how the parameter value will be serialized depending on the type of the parameter value */
  style?: ParameterStyle;
  /** When this is true, parameter values of type array or object generate separate parameters for each value of the array or key-value pair of the map */
  explode?: boolean;
  /** Determines whether the parameter value SHOULD allow reserved characters */
  allowReserved?: boolean;
  /** The schema defining the type used for the parameter */
  schema?: SchemaObject | ReferenceObject;
  /** Example of the parameter's potential value */
  example?: unknown;
  /** Examples of the parameter's potential value */
  examples?: Record<string, ExampleObject | ReferenceObject>;
  /** A map containing the representations for the parameter */
  content?: Record<string, MediaTypeObject>;
}

/**
 * Parameter styles for serialization
 */
export type ParameterStyle =
  | 'matrix'
  | 'label'
  | 'form'
  | 'simple'
  | 'spaceDelimited'
  | 'pipeDelimited'
  | 'deepObject';

/**
 * Describes a single request body
 */
export interface RequestBodyObject extends ExtensionObject {
  /** A brief description of the request body */
  description?: string;
  /** REQUIRED. The content of the request body */
  content: Record<string, MediaTypeObject>;
  /** Determines if the request body is required in the request */
  required?: boolean;
}

/**
 * Each Media Type Object provides schema and examples for the media type identified by its key
 */
export interface MediaTypeObject extends ExtensionObject {
  /** The schema defining the content of the request, response, or parameter */
  schema?: SchemaObject | ReferenceObject;
  /** Example of the media type */
  example?: unknown;
  /** Examples of the media type */
  examples?: Record<string, ExampleObject | ReferenceObject>;
  /** A map between a property name and its encoding information */
  encoding?: Record<string, EncodingObject>;
}

/**
 * A single encoding definition applied to a single schema property
 */
export interface EncodingObject extends ExtensionObject {
  /** The Content-Type for encoding a specific property */
  contentType?: string;
  /** A map allowing additional information to be provided as headers */
  headers?: Record<string, HeaderObject | ReferenceObject>;
  /** Describes how a specific property value will be serialized depending on its type */
  style?: ParameterStyle;
  /** When this is true, property values of type array or object generate separate parameters for each value of the array, or key-value-pair of the map */
  explode?: boolean;
  /** Determines whether the parameter value SHOULD allow reserved characters */
  allowReserved?: boolean;
}

/**
 * A container for the expected responses of an operation
 */
export interface ResponsesObject
  extends Record<string, ResponseObject | ReferenceObject | undefined> {
  /** The documentation of responses other than the ones declared for specific HTTP response codes */
  default?: ResponseObject | ReferenceObject;
}

/**
 * Describes a single response from an API Operation
 */
export interface ResponseObject extends ExtensionObject {
  /** REQUIRED. A short description of the response */
  description: string;
  /** Maps a header name to its definition */
  headers?: Record<string, HeaderObject | ReferenceObject>;
  /** A map containing descriptions of potential response payloads */
  content?: Record<string, MediaTypeObject>;
  /** A map of operations links that can be followed from the response */
  links?: Record<string, LinkObject | ReferenceObject>;
}

/**
 * The Header Object follows the structure of the Parameter Object
 */
export type HeaderObject = Omit<ParameterObject, 'name' | 'in'>;

/**
 * Example Object
 */
export interface ExampleObject extends ExtensionObject {
  /** Short description for the example */
  summary?: string;
  /** Long description for the example */
  description?: string;
  /** Embedded literal example */
  value?: unknown;
  /** A URL that points to the literal example */
  externalValue?: string;
}

/**
 * The Link object represents a possible design-time link for a response
 */
export interface LinkObject extends ExtensionObject {
  /** A relative or absolute URI reference to an OAS operation */
  operationRef?: string;
  /** The name of an existing, resolvable OAS operation, as defined with a unique operationId */
  operationId?: string;
  /** A map representing parameters to pass to an operation as specified with operationId or identified via operationRef */
  parameters?: Record<string, unknown>;
  /** A literal value or {expression} to use as a request body when calling the target operation */
  requestBody?: unknown;
  /** A description of the link */
  description?: string;
  /** A server object to be used by the target operation */
  server?: ServerObject;
}

/**
 * Adds metadata to a single tag that is used by the Operation Object
 */
export interface TagObject extends ExtensionObject {
  /** REQUIRED. The name of the tag */
  name: string;
  /** A short description for the tag */
  description?: string;
  /** Additional external documentation for this tag */
  externalDocs?: ExternalDocumentationObject;
}

/**
 * A simple object to allow referencing other components in the specification
 */
export interface ReferenceObject {
  /** REQUIRED. The reference string */
  $ref: string;
}

/**
 * The Schema Object allows the definition of input and output data types
 */
export interface SchemaObject extends ExtensionObject {
  // Core schema properties
  title?: string;
  multipleOf?: number;
  maximum?: number;
  exclusiveMaximum?: boolean;
  minimum?: number;
  exclusiveMinimum?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  maxItems?: number;
  minItems?: number;
  uniqueItems?: boolean;
  maxProperties?: number;
  minProperties?: number;
  required?: string[];
  enum?: unknown[];

  // Type-specific properties
  type?: 'null' | 'boolean' | 'object' | 'array' | 'number' | 'string' | 'integer';
  allOf?: (SchemaObject | ReferenceObject)[];
  oneOf?: (SchemaObject | ReferenceObject)[];
  anyOf?: (SchemaObject | ReferenceObject)[];
  not?: SchemaObject | ReferenceObject;
  items?: SchemaObject | ReferenceObject;
  properties?: Record<string, SchemaObject | ReferenceObject>;
  additionalProperties?: boolean | SchemaObject | ReferenceObject;
  description?: string;
  format?: string;
  default?: unknown;

  // OpenAPI-specific properties
  nullable?: boolean;
  discriminator?: DiscriminatorObject;
  readOnly?: boolean;
  writeOnly?: boolean;
  xml?: XMLObject;
  externalDocs?: ExternalDocumentationObject;
  example?: unknown;
  deprecated?: boolean;
}

/**
 * When request bodies or response payloads may be one of a number of different schemas, a discriminator object can be used to aid in serialization, deserialization, and validation
 */
export interface DiscriminatorObject {
  /** REQUIRED. The name of the property in the payload that will hold the discriminator value */
  propertyName: string;
  /** An object to hold mappings between payload values and schema names or references */
  mapping?: Record<string, string>;
}

/**
 * A metadata object that allows for more fine-tuned XML model definitions
 */
export interface XMLObject extends ExtensionObject {
  /** Replaces the name of the element/attribute used for the described schema property */
  name?: string;
  /** The URI of the namespace definition */
  namespace?: string;
  /** The prefix to be used for the name */
  prefix?: string;
  /** Declares whether the property definition translates to an attribute instead of an element */
  attribute?: boolean;
  /** MAY be used only for an array definition */
  wrapped?: boolean;
}

/**
 * Lists the required security schemes to execute this operation
 */
export interface SecurityRequirementObject {
  /** Each name MUST correspond to a security scheme which is declared in the Security Schemes under the Components Object */
  [name: string]: string[];
}

/**
 * Holds a set of reusable objects for different aspects of the OAS
 */
export interface ComponentsObject extends ExtensionObject {
  /** An object to hold reusable Schema Objects */
  schemas?: Record<string, SchemaObject | ReferenceObject>;
  /** An object to hold reusable Response Objects */
  responses?: Record<string, ResponseObject | ReferenceObject>;
  /** An object to hold reusable Parameter Objects */
  parameters?: Record<string, ParameterObject | ReferenceObject>;
  /** An object to hold reusable Example Objects */
  examples?: Record<string, ExampleObject | ReferenceObject>;
  /** An object to hold reusable Request Body Objects */
  requestBodies?: Record<string, RequestBodyObject | ReferenceObject>;
  /** An object to hold reusable Header Objects */
  headers?: Record<string, HeaderObject | ReferenceObject>;
  /** An object to hold reusable Security Scheme Objects */
  securitySchemes?: Record<string, SecuritySchemeObject | ReferenceObject>;
  /** An object to hold reusable Link Objects */
  links?: Record<string, LinkObject | ReferenceObject>;
  /** An object to hold reusable Callback Objects */
  callbacks?: Record<string, CallbackObject | ReferenceObject>;
}

/**
 * Defines a security scheme that can be used by the operations
 */
export interface SecuritySchemeObject extends ExtensionObject {
  /** REQUIRED. The type of the security scheme */
  type: 'apiKey' | 'http' | 'oauth2' | 'openIdConnect';
  /** A short description for security scheme */
  description?: string;
  /** REQUIRED for apiKey. The name of the header, query or cookie parameter to be used */
  name?: string;
  /** REQUIRED for apiKey. The location of the API key */
  in?: 'query' | 'header' | 'cookie';
  /** REQUIRED for http. The name of the HTTP Authorization scheme to be used in the Authorization header */
  scheme?: string;
  /** A hint to the client to identify how the bearer token is formatted */
  bearerFormat?: string;
  /** REQUIRED for oauth2. An object containing configuration information for the flow types supported */
  flows?: OAuthFlowsObject;
  /** REQUIRED for openIdConnect. OpenId Connect URL to discover OAuth2 configuration values */
  openIdConnectUrl?: string;
}

/**
 * Allows configuration of the supported OAuth Flows
 */
export interface OAuthFlowsObject extends ExtensionObject {
  /** Configuration for the OAuth Implicit flow */
  implicit?: OAuthFlowObject;
  /** Configuration for the OAuth Resource Owner Password flow */
  password?: OAuthFlowObject;
  /** Configuration for the OAuth Client Credentials flow */
  clientCredentials?: OAuthFlowObject;
  /** Configuration for the OAuth Authorization Code flow */
  authorizationCode?: OAuthFlowObject;
}

/**
 * Configuration details for a supported OAuth Flow
 */
export interface OAuthFlowObject extends ExtensionObject {
  /** REQUIRED for implicit, authorizationCode. The authorization URL to be used for this flow */
  authorizationUrl?: string;
  /** REQUIRED for password, clientCredentials, authorizationCode. The token URL to be used for this flow */
  tokenUrl?: string;
  /** The URL to be used for obtaining refresh tokens */
  refreshUrl?: string;
  /** REQUIRED. The available scopes for the OAuth2 security scheme */
  scopes: Record<string, string>;
}

/**
 * A map of possible out-of band callbacks related to the parent operation
 */
export type CallbackObject = Record<string, PathItemObject | undefined> & ExtensionObject;

/**
 * HTTP methods supported by OpenAPI
 */
export type HttpMethod = 'get' | 'put' | 'post' | 'delete' | 'options' | 'head' | 'patch' | 'trace';

/**
 * Valid HTTP status codes (as strings to match OpenAPI spec)
 */
export type HttpStatusCode =
  | '200'
  | '201'
  | '202'
  | '203'
  | '204'
  | '205'
  | '206'
  | '207'
  | '208'
  | '226'
  | '300'
  | '301'
  | '302'
  | '303'
  | '304'
  | '305'
  | '307'
  | '308'
  | '400'
  | '401'
  | '402'
  | '403'
  | '404'
  | '405'
  | '406'
  | '407'
  | '408'
  | '409'
  | '410'
  | '411'
  | '412'
  | '413'
  | '414'
  | '415'
  | '416'
  | '417'
  | '418'
  | '421'
  | '422'
  | '423'
  | '424'
  | '425'
  | '426'
  | '428'
  | '429'
  | '431'
  | '451'
  | '500'
  | '501'
  | '502'
  | '503'
  | '504'
  | '505'
  | '506'
  | '507'
  | '508'
  | '510'
  | '511'
  | 'default';

/**
 * Common media types used in OpenAPI specifications
 */
export type MediaType =
  | 'application/json'
  | 'application/xml'
  | 'application/x-www-form-urlencoded'
  | 'multipart/form-data'
  | 'text/plain'
  | 'text/html'
  | 'application/octet-stream'
  | string; // Allow custom media types
