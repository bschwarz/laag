/**
 * Type definitions for AWS Smithy models
 * @module types
 */
/**
 * Shape ID type - Format: namespace#ShapeName or ShapeName
 * Examples: "smithy.api#String", "example.weather#GetWeather"
 */
export type ShapeId = string;
/**
 * Smithy model version
 */
export type SmithyVersion = '1.0' | '2.0' | string;
/**
 * All possible Smithy shape types
 */
export type ShapeType =
  | 'blob'
  | 'boolean'
  | 'string'
  | 'byte'
  | 'short'
  | 'integer'
  | 'long'
  | 'float'
  | 'double'
  | 'bigInteger'
  | 'bigDecimal'
  | 'timestamp'
  | 'document'
  | 'list'
  | 'set'
  | 'map'
  | 'structure'
  | 'union'
  | 'service'
  | 'operation'
  | 'resource';
/**
 * Main Smithy model interface
 */
export interface SmithyModel {
  /** Smithy version (e.g., "2.0") */
  smithy: SmithyVersion;
  /** Optional metadata */
  metadata?: Record<string, unknown>;
  /** Shape definitions keyed by shape ID */
  shapes: Record<ShapeId, Shape>;
}
/**
 * Base shape interface - all shapes extend this
 */
export interface BaseShape {
  /** The type of the shape */
  type: ShapeType;
  /** Optional traits applied to the shape */
  traits?: Record<string, unknown>;
}
/**
 * Member shape - used in structures, unions, lists, and maps
 */
export interface MemberShape {
  /** Target shape ID */
  target: ShapeId;
  /** Optional traits applied to the member */
  traits?: Record<string, unknown>;
}
/**
 * Structure shape - represents a fixed set of named members
 */
export interface StructureShape extends BaseShape {
  type: 'structure';
  /** Named members of the structure */
  members?: Record<string, MemberShape>;
  /** Mixins to apply to this structure */
  mixins?: ShapeId[];
}
/**
 * Union shape - represents a tagged union
 */
export interface UnionShape extends BaseShape {
  type: 'union';
  /** Named members of the union */
  members?: Record<string, MemberShape>;
}
/**
 * Service shape - represents an API service
 */
export interface ServiceShape extends BaseShape {
  type: 'service';
  /** Service version */
  version: string;
  /** Operations bound to the service */
  operations?: ShapeId[];
  /** Resources bound to the service */
  resources?: ShapeId[];
  /** Common errors that all operations can return */
  errors?: ShapeId[];
  /** Shape ID renames */
  rename?: Record<ShapeId, string>;
}
/**
 * Operation shape - represents a service operation
 */
export interface OperationShape extends BaseShape {
  type: 'operation';
  /** Input structure */
  input?: ShapeId;
  /** Output structure */
  output?: ShapeId;
  /** Error structures */
  errors?: ShapeId[];
}
/**
 * Resource shape - represents a resource with lifecycle operations
 */
export interface ResourceShape extends BaseShape {
  type: 'resource';
  /** Resource identifiers */
  identifiers?: Record<string, ShapeId>;
  /** Resource properties */
  properties?: Record<string, ShapeId>;
  /** Create operation */
  create?: ShapeId;
  /** Put operation */
  put?: ShapeId;
  /** Read operation */
  read?: ShapeId;
  /** Update operation */
  update?: ShapeId;
  /** Delete operation */
  delete?: ShapeId;
  /** List operation */
  list?: ShapeId;
  /** Instance operations */
  operations?: ShapeId[];
  /** Collection operations */
  collectionOperations?: ShapeId[];
  /** Child resources */
  resources?: ShapeId[];
}
/**
 * List shape - represents an ordered collection
 */
export interface ListShape extends BaseShape {
  type: 'list';
  /** Member type */
  member: MemberShape;
}
/**
 * Set shape - represents an unordered collection of unique values
 */
export interface SetShape extends BaseShape {
  type: 'set';
  /** Member type */
  member: MemberShape;
}
/**
 * Map shape - represents a map of key-value pairs
 */
export interface MapShape extends BaseShape {
  type: 'map';
  /** Key type */
  key: MemberShape;
  /** Value type */
  value: MemberShape;
}
/**
 * Simple shape - represents primitive types
 */
export interface SimpleShape extends BaseShape {
  type:
    | 'blob'
    | 'boolean'
    | 'string'
    | 'byte'
    | 'short'
    | 'integer'
    | 'long'
    | 'float'
    | 'double'
    | 'bigInteger'
    | 'bigDecimal'
    | 'timestamp'
    | 'document';
}
/**
 * Discriminated union of all shape types
 */
export type Shape =
  | SimpleShape
  | ListShape
  | SetShape
  | MapShape
  | StructureShape
  | UnionShape
  | ServiceShape
  | OperationShape
  | ResourceShape;
/**
 * Base trait interface
 */
export interface Trait {
  /** Trait ID */
  id: string;
  /** Trait value */
  value: unknown;
}
/**
 * HTTP trait - defines HTTP binding for operations
 */
export interface HttpTrait extends Record<string, unknown> {
  /** HTTP method (GET, POST, PUT, DELETE, PATCH, etc.) */
  method: string;
  /** URI pattern */
  uri: string;
  /** HTTP status code for responses */
  code?: number;
}
/**
 * Required trait - marks a member as required
 */
export interface RequiredTrait {}
/**
 * Documentation trait - provides documentation for a shape
 */
export interface DocumentationTrait {
  /** Documentation text */
  value: string;
}
/**
 * HTTP error trait - marks an error structure with HTTP status code
 */
export interface HttpErrorTrait {
  /** HTTP status code */
  code: number;
}
/**
 * Readonly trait - marks an operation as readonly
 */
export interface ReadonlyTrait {}
/**
 * Idempotent trait - marks an operation as idempotent
 */
export interface IdempotentTrait {}
/**
 * Paginated trait - marks an operation as paginated
 */
export interface PaginatedTrait {
  /** Input token member name */
  inputToken?: string;
  /** Output token member name */
  outputToken?: string;
  /** Items member name */
  items?: string;
  /** Page size member name */
  pageSize?: string;
}
/**
 * HTTP label trait - binds a member to a URI label
 */
export interface HttpLabelTrait {}
/**
 * HTTP query trait - binds a member to a query string parameter
 */
export interface HttpQueryTrait {
  /** Query parameter name (defaults to member name) */
  value?: string;
}
/**
 * HTTP header trait - binds a member to an HTTP header
 */
export interface HttpHeaderTrait {
  /** Header name */
  value: string;
}
/**
 * HTTP payload trait - binds a member to the HTTP payload
 */
export interface HttpPayloadTrait {}
/**
 * Standard Smithy trait names
 */
export declare const SMITHY_TRAITS: {
  readonly HTTP: 'smithy.api#http';
  readonly HTTP_ERROR: 'smithy.api#httpError';
  readonly HTTP_LABEL: 'smithy.api#httpLabel';
  readonly HTTP_QUERY: 'smithy.api#httpQuery';
  readonly HTTP_HEADER: 'smithy.api#httpHeader';
  readonly HTTP_PAYLOAD: 'smithy.api#httpPayload';
  readonly REQUIRED: 'smithy.api#required';
  readonly DOCUMENTATION: 'smithy.api#documentation';
  readonly READONLY: 'smithy.api#readonly';
  readonly IDEMPOTENT: 'smithy.api#idempotent';
  readonly PAGINATED: 'smithy.api#paginated';
};
/**
 * Shape ID utilities
 */
export declare namespace ShapeIdUtils {
  /**
   * Parse a shape ID into namespace and name
   */
  function parse(shapeId: ShapeId): {
    namespace?: string;
    name: string;
  };
  /**
   * Create a shape ID from namespace and name
   */
  function create(namespace: string, name: string): ShapeId;
  /**
   * Check if a shape ID is absolute (has namespace)
   */
  function isAbsolute(shapeId: ShapeId): boolean;
  /**
   * Get the namespace from a shape ID
   */
  function getNamespace(shapeId: ShapeId): string | undefined;
  /**
   * Get the name from a shape ID
   */
  function getName(shapeId: ShapeId): string;
  /**
   * Compare two shape IDs for equality
   */
  function equals(a: ShapeId, b: ShapeId): boolean;
}
/**
 * Type guards for shape types
 */
export declare namespace ShapeGuards {
  /**
   * Check if a shape is a structure
   */
  function isStructure(shape: Shape): shape is StructureShape;
  /**
   * Check if a shape is a service
   */
  function isService(shape: Shape): shape is ServiceShape;
  /**
   * Check if a shape is an operation
   */
  function isOperation(shape: Shape): shape is OperationShape;
  /**
   * Check if a shape is a resource
   */
  function isResource(shape: Shape): shape is ResourceShape;
  /**
   * Check if a shape is a union
   */
  function isUnion(shape: Shape): shape is UnionShape;
  /**
   * Check if a shape is a list
   */
  function isList(shape: Shape): shape is ListShape;
  /**
   * Check if a shape is a set
   */
  function isSet(shape: Shape): shape is SetShape;
  /**
   * Check if a shape is a map
   */
  function isMap(shape: Shape): shape is MapShape;
  /**
   * Check if a shape is a simple type
   */
  function isSimple(shape: Shape): shape is SimpleShape;
  /**
   * Check if a shape is an aggregate type (has members)
   */
  function isAggregate(shape: Shape): shape is StructureShape | UnionShape;
  /**
   * Check if a shape is a collection type
   */
  function isCollection(shape: Shape): shape is ListShape | SetShape | MapShape;
}
/**
 * HTTP binding information extracted from traits
 */
export interface HttpBinding {
  /** HTTP method */
  method: string;
  /** URI pattern */
  uri: string;
  /** HTTP status code */
  code?: number;
  /** Request headers */
  headers?: Record<string, string>;
  /** Query parameters */
  queryParams?: Record<string, string>;
  /** URI labels */
  labels?: string[];
  /** Payload member name */
  payload?: string;
}
/**
 * Validation result type
 */
export interface ValidationResult {
  /** Whether validation passed */
  isValid: boolean;
  /** Validation errors */
  errors?: ValidationError[];
}
/**
 * Validation error
 */
export interface ValidationError {
  /** Error message */
  message: string;
  /** Path to the error location */
  path?: string;
  /** Error code */
  code?: string;
}
/**
 * Generator options for code generation
 */
export interface GeneratorOptions {
  /** Target namespace for generated code */
  namespace?: string;
  /** Include documentation comments */
  includeComments?: boolean;
  /** Include usage examples */
  includeExamples?: boolean;
  /** Output format */
  outputFormat?: 'module' | 'class' | 'functional';
  /** Indentation (spaces) */
  indent?: number;
}
/**
 * Selector query result
 */
export interface SelectorResult {
  /** Matching shapes */
  shapes: Shape[];
  /** Shape IDs of matching shapes */
  shapeIds: ShapeId[];
}
//# sourceMappingURL=types.d.ts.map
