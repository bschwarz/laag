/**
 * Modernized TypeScript implementation of the OpenAPI/Swagger document interface.
 *
 * @fileoverview This module provides a comprehensive TypeScript implementation for
 * working with OpenAPI 3.0 specification documents. It includes full type safety,
 * validation, and utility methods for common operations.
 *
 * @module @laag/openapi/openapi
 * @since 2.0.0
 */

import type { ValidationResult } from '@laag/core';
import { LaagBase } from '@laag/core';
import {
  ComponentsObject,
  ContactObject,
  ExternalDocumentationObject,
  HttpMethod,
  InfoObject,
  LicenseObject,
  OpenAPIDocument,
  OperationObject,
  PathItemObject,
  PathsObject,
  ReferenceObject,
  RequestBodyObject,
  ResponseObject,
  SchemaObject,
  SecurityRequirementObject,
  ServerObject,
  TagObject,
} from './types.js';

/**
 * Main class for working with OpenAPI/Swagger documents.
 *
 * The Openapi class provides a comprehensive interface for creating, reading, and
 * manipulating OpenAPI 3.0 specification documents. It extends the LaagBase class
 * to provide common functionality while adding OpenAPI-specific methods and validation.
 *
 * Key features:
 * - Full TypeScript support with comprehensive type definitions
 * - Document validation according to OpenAPI 3.0 specification
 * - Utility methods for common operations (paths, operations, components)
 * - Extension property support (x-* properties)
 * - Backward compatibility with existing APIs
 *
 * @class Openapi
 * @extends LaagBase
 * @since 2.0.0
 *
 * @example
 * ```typescript
 * import { Openapi } from '@laag/openapi';
 *
 * // Create from object
 * const api = new Openapi({
 *   openapi: '3.0.2',
 *   info: { title: 'My API', version: '1.0.0' },
 *   paths: {}
 * });
 *
 * // Create from JSON string
 * const api2 = new Openapi('{"openapi":"3.0.2","info":{"title":"My API","version":"1.0.0"},"paths":{}}');
 *
 * // Add a path
 * api.appendPath('/users', {
 *   get: {
 *     summary: 'Get users',
 *     responses: { '200': { description: 'Success' } }
 *   }
 * });
 * ```
 */
export class Openapi extends LaagBase {
  private _docVersion: string = '3.0.2';
  private _basePath: string | null = null;
  private _baseUri: string = '';
  private _protocols: string[] = [];
  private _httpMethods: HttpMethod[] = ['get', 'post', 'put', 'delete', 'patch', 'head'];

  // Static HTTP status code mappings
  private static readonly statusCodeReason: Record<string, string> = {
    '200': 'OK',
    '201': 'Created',
    '202': 'Accepted',
    '203': 'Non-Authoritative Information',
    '204': 'No Content',
    '205': 'Reset Content',
    '206': 'Partial Content',
    '400': 'Bad Request',
    '401': 'Unauthorized',
    '403': 'Forbidden',
    '404': 'Not Found',
    '405': 'Method Not Allowed',
    '406': 'Not Acceptable',
    '409': 'Conflict',
    '410': 'Gone',
    '411': 'Length Required',
    '412': 'Precondition Failed',
    '413': 'Payload Too Large',
    '414': 'URI Too Long',
    '415': 'Unsupported Media Type',
    '416': 'Range Not Satisfiable',
    '417': 'Expectation Failed',
    '428': 'Precondition Required',
    '429': 'Too Many Requests',
    '431': 'Request Header Fields Too Large',
    '500': 'Internal Server Error',
    '502': 'Bad Gateway',
    '503': 'Service Unavailable',
    '504': 'Gateway Timeout',
    '505': 'HTTP Version Not Supported',
  };

  /**
   * Creates a new OpenAPI document instance.
   *
   * If no document is provided, a minimal valid OpenAPI document structure is created
   * with default values. If a document is provided but missing required fields,
   * they will be initialized with default values.
   *
   * @param doc - The OpenAPI document as a JSON string or object. If not provided,
   *              a minimal valid document structure is created.
   *
   * @throws {ParseError} When the provided string cannot be parsed as valid JSON.
   *
   * @example
   * ```typescript
   * // Create empty document with defaults
   * const api = new Openapi();
   *
   * // Create from existing document
   * const api2 = new Openapi({
   *   openapi: '3.0.2',
   *   info: { title: 'My API', version: '1.0.0' },
   *   paths: {
   *     '/users': {
   *       get: { responses: { '200': { description: 'Success' } } }
   *     }
   *   }
   * });
   *
   * // Create from JSON string
   * const jsonDoc = '{"openapi":"3.0.2","info":{"title":"API","version":"1.0.0"},"paths":{}}';
   * const api3 = new Openapi(jsonDoc);
   * ```
   */
  constructor(doc?: string | OpenAPIDocument) {
    super(doc);

    // Initialize with default OpenAPI document structure if empty or missing required fields
    this.doc.openapi ??= '3.0.2';
    this.doc.info ??= { title: '', version: '1.0.0' };
    this.doc.paths ??= {};
  }

  /**
   * Validate the OpenAPI document structure according to the OpenAPI 3.0 specification.
   *
   * This method checks for required fields and basic structural validity. It validates:
   * - Required root-level fields (openapi, info, paths)
   * - Required info object fields (title, version)
   * - Basic structure compliance
   *
   * @returns A validation result object containing the validation status and any errors found.
   *
   * @override
   * @since 2.0.0
   *
   * @example
   * ```typescript
   * const api = new Openapi({ openapi: '3.0.2', paths: {} }); // Missing info
   * const result = api.validate();
   *
   * console.log(result.valid); // false
   * console.log(result.errors);
   * // [{ path: 'info', message: 'Info object is required', code: 'REQUIRED_FIELD_MISSING' }]
   * ```
   */
  validate(): ValidationResult {
    const errors = [];

    // Check required fields
    if (!this.doc.openapi) {
      errors.push({
        path: 'openapi',
        message: 'OpenAPI version is required',
        code: 'REQUIRED_FIELD_MISSING',
      });
    }

    if (!this.doc.info) {
      errors.push({
        path: 'info',
        message: 'Info object is required',
        code: 'REQUIRED_FIELD_MISSING',
      });
    } else {
      if (!(this.doc.info as InfoObject).title) {
        errors.push({
          path: 'info.title',
          message: 'Info title is required',
          code: 'REQUIRED_FIELD_MISSING',
        });
      }
      if (!(this.doc.info as InfoObject).version) {
        errors.push({
          path: 'info.version',
          message: 'Info version is required',
          code: 'REQUIRED_FIELD_MISSING',
        });
      }
    }

    if (!this.doc.paths) {
      errors.push({
        path: 'paths',
        message: 'Paths object is required',
        code: 'REQUIRED_FIELD_MISSING',
      });
    }

    return {
      valid: errors.length === 0,
      errors: errors as ValidationResult['errors'],
    };
  }

  // HTTP Methods management
  get httpMethods(): HttpMethod[] {
    return [...this._httpMethods];
  }

  set httpMethods(methods: HttpMethod[]) {
    this._httpMethods = [...methods];
  }

  // Document version management
  get docVersion(): string {
    return this._docVersion;
  }

  set docVersion(value: string) {
    this._docVersion = value;
  }

  // Document retrieval methods
  getDefinition(format: 'js' | 'json' | 'prettyjson' = 'js'): OpenAPIDocument | string {
    switch (format) {
      case 'js':
        return this.doc as unknown as OpenAPIDocument;
      case 'json':
        return JSON.stringify(this.doc);
      case 'prettyjson':
        return JSON.stringify(this.doc, null, 2);
      default:
        return this.doc as unknown as OpenAPIDocument;
    }
  }

  // Info object management
  get info(): InfoObject {
    return (this.doc.info as InfoObject) ?? {};
  }

  set info(value: InfoObject) {
    // Validate and filter valid properties
    const validKeys = ['title', 'description', 'termsOfService', 'contact', 'license', 'version'];
    const newValue: Partial<InfoObject> = {};

    for (const [key, val] of Object.entries(value)) {
      if (validKeys.includes(key) || key.startsWith('x-')) {
        (newValue as Record<string, unknown>)[key] = val;
      }
    }

    this.doc.info = newValue as InfoObject;
  }

  get title(): string | null {
    return this.dictKeysExists(this.doc, 'info.title') ? (this.doc.info as InfoObject).title : null;
  }

  set title(value: string) {
    this.doc.info ??= {} as InfoObject;
    (this.doc.info as InfoObject).title = value;
  }

  get description(): string | null {
    return this.dictKeysExists(this.doc, 'info.description')
      ? ((this.doc.info as InfoObject).description ?? null)
      : null;
  }

  set description(value: string) {
    this.doc.info ??= {} as InfoObject;
    (this.doc.info as InfoObject).description = value;
  }

  get version(): string | null {
    return this.dictKeysExists(this.doc, 'info.version')
      ? (this.doc.info as InfoObject).version
      : null;
  }

  set version(value: string) {
    this.doc.info ??= {} as InfoObject;
    (this.doc.info as InfoObject).version = value;
  }

  get termsOfService(): string | null {
    return this.dictKeysExists(this.doc, 'info.termsOfService')
      ? ((this.doc.info as InfoObject).termsOfService ?? null)
      : null;
  }

  set termsOfService(value: string) {
    this.doc.info ??= {} as InfoObject;
    (this.doc.info as InfoObject).termsOfService = value;
  }

  get contact(): ContactObject {
    return this.dictKeysExists(this.doc, 'info.contact')
      ? ((this.doc.info as InfoObject).contact ?? {})
      : {};
  }

  set contact(value: ContactObject) {
    const validKeys = ['name', 'url', 'email'];
    const newValue: Partial<ContactObject> = {};

    for (const [key, val] of Object.entries(value)) {
      if (validKeys.includes(key) || key.startsWith('x-')) {
        (newValue as Record<string, unknown>)[key] = val;
      }
    }

    this.doc.info ??= {} as InfoObject;
    (this.doc.info as InfoObject).contact = newValue as ContactObject;
  }

  get license(): LicenseObject {
    return this.dictKeysExists(this.doc, 'info.license')
      ? ((this.doc.info as InfoObject).license ?? { name: '' })
      : { name: '' };
  }

  set license(value: LicenseObject) {
    const validKeys = ['name', 'url'];
    const newValue: Partial<LicenseObject> = { name: '' }; // name is required

    for (const [key, val] of Object.entries(value)) {
      if (validKeys.includes(key) || key.startsWith('x-')) {
        (newValue as Record<string, unknown>)[key] = val;
      }
    }

    this.doc.info ??= {} as InfoObject;
    (this.doc.info as InfoObject).license = newValue as LicenseObject;
  }

  // Servers management
  get servers(): ServerObject[] {
    return this.dictKeysExists(this.doc, 'servers') ? (this.doc.servers as ServerObject[]) : [];
  }

  set servers(value: ServerObject[]) {
    const validKeys = ['variables', 'url', 'description'];
    const ret: ServerObject[] = [];

    for (const server of value) {
      const newValue: Partial<ServerObject> = { url: '' }; // url is required

      for (const [key, val] of Object.entries(server)) {
        if (validKeys.includes(key) || key.startsWith('x-')) {
          (newValue as Record<string, unknown>)[key] = val;
        }
      }
      ret.push(newValue as ServerObject);
    }

    this.doc.servers = ret;
  }

  appendServer(value: ServerObject): void {
    this.doc.servers ??= [];
    (this.doc.servers as ServerObject[]).push(value);
  }

  // Base URI and protocols (legacy compatibility)
  get baseUri(): string {
    return this._baseUri;
  }

  set baseUri(value: string) {
    this._baseUri = value;
  }

  get protocols(): string[] {
    return [...this._protocols];
  }

  set protocols(value: string[]) {
    this._protocols = [...value];
  }

  appendProtocol(value: string): void {
    this._protocols.push(value);
  }

  // Paths management
  get paths(): PathsObject {
    return this.dictKeysExists(this.doc, 'paths') ? (this.doc.paths as PathsObject) : {};
  }

  set paths(value: PathsObject) {
    this.doc.paths = value;
  }

  appendPath(path: string, value: PathItemObject): void {
    const cleanPath = path.trim().startsWith('/') ? path.trim() : `/${path.trim()}`;
    this.doc.paths ??= {};
    (this.doc.paths as PathsObject)[cleanPath] = value;
  }

  getPathNames(): string[] {
    const paths = Object.keys(this.doc.paths ?? {});
    return paths
      .filter(path => !path.startsWith('x-'))
      .sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }));
  }

  getPath(path: string): PathItemObject {
    return this.dictKeysExists(this.doc, `paths.${path}`)
      ? ((this.doc.paths as PathsObject)[path] ?? {})
      : {};
  }

  // Components management
  get components(): ComponentsObject {
    return this.dictKeysExists(this.doc, 'components')
      ? (this.doc.components as ComponentsObject)
      : {};
  }

  set components(value: ComponentsObject) {
    this.doc.components = value;
  }

  get componentsSchemas(): Record<string, SchemaObject | ReferenceObject> {
    return this.dictKeysExists(this.doc, 'components.schemas')
      ? ((this.doc.components as ComponentsObject).schemas ?? {})
      : {};
  }

  // Security management
  get security(): SecurityRequirementObject[] {
    return this.dictKeysExists(this.doc, 'security')
      ? (this.doc.security as SecurityRequirementObject[])
      : [];
  }

  set security(value: SecurityRequirementObject[]) {
    this.doc.security = value;
  }

  // Tags management
  get tags(): TagObject[] {
    return this.dictKeysExists(this.doc, 'tags') ? (this.doc.tags as TagObject[]) : [];
  }

  set tags(value: TagObject[]) {
    const validKeys = ['name', 'description', 'externalDocs'];
    const newValue: Partial<TagObject> = { name: '' }; // name is required

    for (const [key, val] of Object.entries(value)) {
      if (validKeys.includes(key) || key.startsWith('x-')) {
        (newValue as Record<string, unknown>)[key] = val;
      }
    }

    this.doc.tags = [newValue as TagObject];
  }

  // External docs management
  get externalDocs(): ExternalDocumentationObject {
    return this.dictKeysExists(this.doc, 'externalDocs')
      ? (this.doc.externalDocs as ExternalDocumentationObject)
      : { url: '' };
  }

  set externalDocs(value: ExternalDocumentationObject) {
    const validKeys = ['url', 'description'];
    const newValue: Partial<ExternalDocumentationObject> = { url: '' }; // url is required

    for (const [key, val] of Object.entries(value)) {
      if (validKeys.includes(key) || key.startsWith('x-')) {
        (newValue as Record<string, unknown>)[key] = val;
      }
    }

    this.doc.externalDocs = newValue as ExternalDocumentationObject;
  }

  // Operation utility methods
  operationExists(path: string, verb: string): boolean {
    const method = verb.toLowerCase() as HttpMethod;
    const pathItem = (this.doc.paths as PathsObject)?.[path];
    return !!pathItem?.[method];
  }

  pathExists(path: string): boolean {
    return !!(this.doc.paths as PathsObject)?.[path];
  }

  getAllHttpMethods(): HttpMethod[] {
    const methods = new Set<HttpMethod>();

    for (const pathItem of Object.values((this.doc.paths as PathsObject) ?? {})) {
      if (pathItem) {
        for (const method of Object.keys(pathItem)) {
          if (this.httpMethods.includes(method as HttpMethod)) {
            methods.add(method as HttpMethod);
          }
        }
      }
    }

    return Array.from(methods);
  }

  getStatusCodes(
    path: string,
    verb: string
  ): Array<{ code: string; description: string; media: string[] }> {
    const method = verb.toLowerCase() as HttpMethod;
    const operation = (this.doc.paths as PathsObject)?.[path]?.[method] as OperationObject;

    if (!operation?.responses) {
      return [];
    }

    const ret: Array<{ code: string; description: string; media: string[] }> = [];

    for (const [statusCode, response] of Object.entries(operation.responses)) {
      if (statusCode === 'default') continue;

      const responseObj = response as ResponseObject;
      const description = responseObj.description ?? '';
      const media = responseObj.content ? Object.keys(responseObj.content) : [];

      ret.push({
        code: statusCode,
        description,
        media,
      });
    }

    return ret.sort((a, b) => a.code.localeCompare(b.code));
  }

  getAllStatusCodes(): string[] {
    const codes = new Set<string>();

    for (const path of this.getPathNames()) {
      for (const method of Object.keys((this.doc.paths as PathsObject)[path] ?? {})) {
        if (this.httpMethods.includes(method as HttpMethod)) {
          for (const statusInfo of this.getStatusCodes(path, method)) {
            codes.add(statusInfo.code);
          }
        }
      }
    }

    return Array.from(codes);
  }

  // Operation ID management
  getOperationId(path: string, verb: string): string {
    const method = verb.toLowerCase() as HttpMethod;
    const operation = (this.doc.paths as PathsObject)?.[path]?.[method] as OperationObject;

    if (operation?.operationId) {
      return operation.operationId;
    }

    // Generate operation ID from path and method
    const pathSegment =
      path
        .replace('/', '')
        .split('/')
        .pop()
        ?.replace(/{([^}]*)}/g, '$1') ?? '';
    return method + pathSegment.charAt(0).toUpperCase() + pathSegment.slice(1);
  }

  setOperationId(path: string, verb: string, value: string): string {
    const method = verb.toLowerCase() as HttpMethod;
    const pathItem = (this.doc.paths as PathsObject)?.[path];
    const operation = pathItem?.[method] as OperationObject;

    if (operation) {
      operation.operationId = value;
      return value;
    }

    return '';
  }

  // Alias methods for compatibility
  getDisplayName(path: string, verb: string): string {
    return this.getOperationId(path, verb);
  }

  setDisplayName(path: string, verb: string, value: string): string {
    return this.setOperationId(path, verb, value);
  }

  getOperationIds(): Array<{ id: string; path: string; method: string }> {
    const ret: Array<{ id: string; path: string; method: string }> = [];

    for (const path of this.getPathNames()) {
      for (const method of this.httpMethods) {
        if (this.operationExists(path, method)) {
          ret.push({
            id: this.getOperationId(path, method),
            path,
            method,
          });
        }
      }
    }

    return ret;
  }

  // Media type methods
  getOperationRequestMedia(path: string, verb: string): string[] {
    const method = verb.toLowerCase() as HttpMethod;
    const operation = (this.doc.paths as PathsObject)?.[path]?.[method] as OperationObject;

    if (!operation) return [];

    let requestBody = operation.requestBody as RequestBodyObject;

    // Handle $ref
    if (requestBody && '$ref' in requestBody) {
      const component = this.getComponentFromPath((requestBody as ReferenceObject).$ref);
      requestBody = component as RequestBodyObject;
    }

    return requestBody?.content ? Object.keys(requestBody.content) : [];
  }

  getOperationResponseMedia(path: string, verb: string, code?: string): string[] {
    const method = verb.toLowerCase() as HttpMethod;
    const operation = (this.doc.paths as PathsObject)?.[path]?.[method] as OperationObject;

    if (!operation) return [];

    const statusCode = code ?? this.getSuccessCode(path, verb);
    const response = operation.responses?.[statusCode] as ResponseObject;

    return response?.content ? Object.keys(response.content) : [];
  }

  getOperationResponse(path: string, verb: string, statusCode: string): ResponseObject {
    const method = verb.toLowerCase() as HttpMethod;
    const operation = (this.doc.paths as PathsObject)?.[path]?.[method] as OperationObject;

    if (!operation) return {} as ResponseObject;

    return (operation.responses?.[statusCode] as ResponseObject) ?? {};
  }

  getOperationRequest(path: string, verb: string): RequestBodyObject {
    const method = verb.toLowerCase() as HttpMethod;
    const operation = (this.doc.paths as PathsObject)?.[path]?.[method] as OperationObject;

    if (!operation) return {} as RequestBodyObject;

    return (operation.requestBody as RequestBodyObject) ?? {};
  }

  getOperationDescription(path: string, verb: string): string {
    const method = verb.toLowerCase() as HttpMethod;
    const operation = (this.doc.paths as PathsObject)?.[path]?.[method] as OperationObject;

    return operation?.description ?? '';
  }

  getOperationData(path: string, verb: string): OperationObject {
    const method = verb.toLowerCase() as HttpMethod;
    const operation = (this.doc.paths as PathsObject)?.[path]?.[method] as OperationObject;

    return operation ?? ({} as OperationObject);
  }

  isOperationDeprecated(path: string, verb: string): boolean {
    const method = verb.toLowerCase() as HttpMethod;
    const operation = (this.doc.paths as PathsObject)?.[path]?.[method] as OperationObject;

    return operation?.deprecated ?? false;
  }

  getSuccessCode(path: string, verb: string): string {
    const codes = this.getStatusCodes(path, verb);

    for (const codeInfo of codes) {
      const code = parseInt(codeInfo.code);
      if (code >= 200 && code < 300) {
        return codeInfo.code;
      }
    }

    return '';
  }

  getBasePath(): string | null {
    return this._basePath;
  }

  // Component reference resolution
  getComponentFromPath(refPath: string): unknown {
    const cleanPath = refPath.replace('#/', '');
    const parts = cleanPath.split('/');

    // Navigate through the document structure
    let current: Record<string, unknown> = this.doc as Record<string, unknown>;
    for (const part of parts) {
      if (!current || typeof current !== 'object' || !(part in current)) {
        // Component not found, return empty object
        return {};
      }
      current = current[part] as Record<string, unknown>;
    }

    return current;
  }

  // Extension methods for root level
  get rootExtensions(): Record<string, unknown> {
    return this.getExtensions() as Record<string, unknown>;
  }

  set rootExtensions(values: Record<string, unknown>) {
    this.setExtensions(values);
  }

  appendRootExtension(name: string, value: unknown): void {
    if (name.startsWith('x-')) {
      (this.doc as Record<string, unknown>)[name] = value;
    }
  }

  // Extension methods for info level
  get infoExtensions(): Record<string, unknown> {
    return this.getExtensions('info') as Record<string, unknown>;
  }

  set infoExtensions(values: Record<string, unknown>) {
    this.setExtensions(values, 'info');
  }

  appendInfoExtension(name: string, value: unknown): void {
    if (name.startsWith('x-') && this.doc.info) {
      (this.doc.info as Record<string, unknown>)[name] = value;
    }
  }

  // Extension methods for paths level
  get pathsExtensions(): Record<string, unknown> {
    return this.getExtensions('paths') as Record<string, unknown>;
  }

  set pathsExtensions(values: Record<string, unknown>) {
    this.setExtensions(values, 'paths');
  }

  appendPathsExtension(name: string, value: unknown): void {
    if (name.startsWith('x-') && this.doc.paths) {
      (this.doc.paths as Record<string, unknown>)[name] = value;
    }
  }

  // Sample generation methods

  /**
   * Generates sample JSON payload from either request or response schema
   *
   * @param path - The resource path for the operation
   * @param verb - The HTTP verb for the operation
   * @param type - Either 'request' or 'response'
   * @returns Sample JSON object or null if no schema found
   *
   * @example
   * ```typescript
   * const api = new Openapi(document);
   * const requestSample = api.generateJsonSample('/users', 'post', 'request');
   * const responseSample = api.generateJsonSample('/users', 'post', 'response');
   * ```
   */
  generateJsonSample(
    path: string,
    verb: string,
    type: 'request' | 'response' = 'request'
  ): unknown {
    if (!this.operationExists(path, verb)) {
      return null;
    }

    let schema: SchemaObject | undefined;

    if (type === 'request') {
      let requestBody = this.getOperationRequest(path, verb) as RequestBodyObject | ReferenceObject;

      // Resolve reference if needed
      if ('$ref' in requestBody && typeof requestBody.$ref === 'string') {
        requestBody = this.getComponentFromPath(requestBody.$ref) as RequestBodyObject;
      }

      const typedRequestBody = requestBody as RequestBodyObject;
      if (!typedRequestBody?.content?.['application/json']?.schema) {
        return null;
      }
      schema = typedRequestBody.content['application/json'].schema as SchemaObject;
    } else {
      const code = this.getSuccessCode(path, verb);
      const response = this.getOperationResponse(path, verb, code) as ResponseObject;

      if ('$ref' in response && typeof response.$ref === 'string') {
        const component = this.getComponentFromPath(response.$ref) as ResponseObject;
        if (!component?.content?.['application/json']?.schema) {
          return null;
        }
        schema = component.content['application/json'].schema as SchemaObject;
      } else if (!response?.content?.['application/json']?.schema) {
        return null;
      } else {
        schema = response.content['application/json'].schema as SchemaObject;
      }
    }

    return this.generateSchemaExample(schema);
  }

  /**
   * Recursively generates example data from a JSON schema
   *
   * @param schema - The JSON schema to generate example from
   * @returns Generated example object
   */
  private generateSchemaExample(schema: SchemaObject): unknown {
    if ('$ref' in schema && typeof schema.$ref === 'string') {
      const resolvedSchema = this.getComponentFromPath(schema.$ref) as SchemaObject;
      return this.generateSchemaExample(resolvedSchema);
    }

    // Handle allOf composition
    if (schema.allOf) {
      const combined: Record<string, unknown> = {};
      for (const subSchema of schema.allOf) {
        const example = this.generateSchemaExample(subSchema as SchemaObject);
        if (typeof example === 'object' && example !== null) {
          Object.assign(combined, example);
        }
      }
      return combined;
    }

    // Handle oneOf/anyOf - use first schema
    if (schema.oneOf || schema.anyOf) {
      const schemas = schema.oneOf ?? schema.anyOf;
      if (schemas && schemas.length > 0) {
        return this.generateSchemaExample(schemas[0] as SchemaObject);
      }
    }

    // Return example if provided
    if (schema.example !== undefined) {
      return schema.example;
    }

    // Generate based on type
    const obj: Record<string, unknown> = {};
    switch (schema.type) {
      case 'object':
        if (schema.properties) {
          for (const [key, propSchema] of Object.entries(schema.properties)) {
            obj[key] = this.generateSchemaExample(propSchema as SchemaObject);
          }
        } else if (schema.additionalProperties) {
          obj['{property1}'] = this.generateSchemaExample(
            schema.additionalProperties as SchemaObject
          );
        }
        return obj;

      case 'array':
        if (schema.items) {
          return [this.generateSchemaExample(schema.items as SchemaObject)];
        }
        return [];

      case 'string':
        if (schema.format === 'date') return '2023-01-01';
        if (schema.format === 'date-time') return '2023-01-01T00:00:00Z';
        if (schema.format === 'email') return 'user@example.com';
        if (schema.format === 'uri') return 'https://example.com';
        if (schema.format === 'uuid') return '123e4567-e89b-12d3-a456-426614174000';
        if (schema.enum && schema.enum.length > 0) return schema.enum[0];
        return 'string';

      case 'number':
      case 'integer':
        if (schema.enum && schema.enum.length > 0) return schema.enum[0];
        if (schema.minimum !== undefined) return schema.minimum;
        return schema.type === 'integer' ? 0 : 0.0;

      case 'boolean':
        return false;

      default:
        // Handle object without explicit type
        if (schema.properties) {
          const obj: Record<string, unknown> = {};
          for (const [key, propSchema] of Object.entries(schema.properties)) {
            obj[key] = this.generateSchemaExample(propSchema as SchemaObject);
          }
          return obj;
        }
        return null;
    }
  }

  /**
   * Generates curl command examples for an operation
   *
   * @param path - The resource path for the operation
   * @param verb - The HTTP verb for the operation
   * @returns Array of curl command objects with command and description
   *
   * @example
   * ```typescript
   * const api = new Openapi(document);
   * const curlCommands = api.getCurlCommands('/users', 'post');
   * console.log(curlCommands[0].command);
   * ```
   */
  getCurlCommands(path: string, verb: string): Array<{ command: string; description: string }> {
    const results: Array<{ command: string; description: string }> = [];
    const method = verb.toUpperCase();

    let dataOption = '';
    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      const contentTypes = this.getOperationRequestMedia(path, verb);
      const contentType = contentTypes.length > 0 ? contentTypes[0] : 'application/json';
      dataOption = `-H "Content-Type: ${contentType}" -d '<request-payload>'`;
    }

    for (const server of this.servers) {
      const command =
        `curl -i -X ${method} "${server.url}${path}" -H "Authorization: <auth-token>" ${dataOption}`.trim();
      results.push({
        command,
        description: server.description ?? '',
      });
    }

    return results;
  }

  /**
   * Generates Python code sample for an operation
   *
   * @param path - The resource path for the operation
   * @param verb - The HTTP verb for the operation
   * @returns Python code as a string
   *
   * @example
   * ```typescript
   * const api = new Openapi(document);
   * const pythonCode = api.getPythonCode('/users', 'post');
   * console.log(pythonCode);
   * ```
   */
  getPythonCode(path: string, verb: string): string {
    let code = 'import requests\nimport json\n\n';

    // Add server URLs
    let count = 1;
    for (const server of this.servers) {
      code += `# Endpoint for '${server.description ?? 'Server ' + count}'\n`;
      if (count === 1) {
        code += `URL = '${server.url}${path}'\n`;
      } else {
        code += `# URL = '${server.url}${path}'\n`;
      }
      count++;
    }

    // Add parameters
    code += '\n# Add query params here\n';
    code += 'params = {}\n\n';
    code += '# Add headers here\n';
    code += 'headers = {}\n\n';

    // Add request body if needed
    const requestSample = this.generateJsonSample(path, verb, 'request');
    if (requestSample) {
      code += '# Add request body here (see example below)\n';
      code += `data = ${JSON.stringify(requestSample, null, 2)}\n\n`;
      code += `response = requests.${verb.toLowerCase()}(url=URL, params=params, headers=headers, json=data)\n`;
    } else {
      code += `response = requests.${verb.toLowerCase()}(url=URL, params=params, headers=headers)\n`;
    }

    // Add response handling
    const responseSample = this.generateJsonSample(path, verb, 'response');
    if (responseSample) {
      code += '\n# Parse JSON response\n';
      code += 'if response.headers.get("content-type", "").startswith("application/json"):\n';
      code += '    data = response.json()\n';
      code += 'else:\n';
      code += '    data = response.text\n';
    }

    code += '\nstatus_code = response.status_code\n';
    code += 'print(f"Status: {status_code}")';

    return code;
  }

  /**
   * Generates JavaScript code sample for an operation
   *
   * @param path - The resource path for the operation
   * @param verb - The HTTP verb for the operation
   * @param useAsync - Whether to use async/await or promises
   * @returns JavaScript code as a string
   *
   * @example
   * ```typescript
   * const api = new Openapi(document);
   * const jsCode = api.getJavaScriptCode('/users', 'post', true);
   * console.log(jsCode);
   * ```
   */
  getJavaScriptCode(path: string, verb: string, useAsync: boolean = true): string {
    let code = '';

    if (useAsync) {
      code += 'async function makeRequest() {\n';
    } else {
      code += 'function makeRequest() {\n';
    }

    // Add server URL
    const server = this.servers[0];
    const baseUrl = server ? server.url : 'https://api.example.com';
    code += `  const url = '${baseUrl}${path}';\n\n`;

    // Add request configuration
    code += '  const config = {\n';
    code += `    method: '${verb.toUpperCase()}',\n`;
    code += '    headers: {\n';
    code += "      'Content-Type': 'application/json',\n";
    code += "      'Authorization': 'Bearer <your-token>'\n";
    code += '    }\n';

    // Add request body if needed
    const requestSample = this.generateJsonSample(path, verb, 'request');
    if (requestSample) {
      code += ',\n    body: JSON.stringify(';
      code += JSON.stringify(requestSample, null, 6).replace(/\n/g, '\n    ');
      code += ')\n';
    }

    code += '  };\n\n';

    // Add fetch call
    if (useAsync) {
      code += '  try {\n';
      code += '    const response = await fetch(url, config);\n';
      code += '    \n';
      code += '    if (!response.ok) {\n';
      code += '      throw new Error(`HTTP error! status: ${response.status}`);\n';
      code += '    }\n';
      code += '    \n';
      code += '    const data = await response.json();\n';
      code += '    console.log("Success:", data);\n';
      code += '    return data;\n';
      code += '  } catch (error) {\n';
      code += '    console.error("Error:", error);\n';
      code += '    throw error;\n';
      code += '  }\n';
    } else {
      code += '  return fetch(url, config)\n';
      code += '    .then(response => {\n';
      code += '      if (!response.ok) {\n';
      code += '        throw new Error(`HTTP error! status: ${response.status}`);\n';
      code += '      }\n';
      code += '      return response.json();\n';
      code += '    })\n';
      code += '    .then(data => {\n';
      code += '      console.log("Success:", data);\n';
      code += '      return data;\n';
      code += '    })\n';
      code += '    .catch(error => {\n';
      code += '      console.error("Error:", error);\n';
      code += '      throw error;\n';
      code += '    });\n';
    }

    code += '}\n\n';
    code += '// Call the function\n';
    if (useAsync) {
      code += 'makeRequest();';
    } else {
      code += 'makeRequest()\n';
      code += '  .then(result => console.log(result))\n';
      code += '  .catch(error => console.error(error));';
    }

    return code;
  }

  /**
   * Generates TypeScript code sample for an operation
   *
   * @param path - The resource path for the operation
   * @param verb - The HTTP verb for the operation
   * @returns TypeScript code as a string
   *
   * @example
   * ```typescript
   * const api = new Openapi(document);
   * const tsCode = api.getTypeScriptCode('/users', 'post');
   * console.log(tsCode);
   * ```
   */
  getTypeScriptCode(path: string, verb: string): string {
    let code = '';

    // Generate interfaces from request/response schemas
    const requestSample = this.generateJsonSample(path, verb, 'request');
    const responseSample = this.generateJsonSample(path, verb, 'response');

    if (requestSample) {
      code += 'interface RequestBody {\n';
      code += this.generateTypeScriptInterface(requestSample, '  ');
      code += '}\n\n';
    }

    if (responseSample) {
      code += 'interface ResponseBody {\n';
      code += this.generateTypeScriptInterface(responseSample, '  ');
      code += '}\n\n';
    }

    // Generate the function
    const operationId = this.getOperationId(path, verb);
    const functionName = operationId || `${verb.toLowerCase()}${path.replace(/[^a-zA-Z0-9]/g, '')}`;

    code += `async function ${functionName}(`;
    if (requestSample) {
      code += 'requestBody: RequestBody';
    }
    code += `): Promise<${responseSample ? 'ResponseBody' : 'any'}> {\n`;

    // Add server URL
    const server = this.servers[0];
    const baseUrl = server ? server.url : 'https://api.example.com';
    code += `  const url = '${baseUrl}${path}';\n\n`;

    // Add request configuration
    code += '  const config: RequestInit = {\n';
    code += `    method: '${verb.toUpperCase()}',\n`;
    code += '    headers: {\n';
    code += "      'Content-Type': 'application/json',\n";
    code += "      'Authorization': 'Bearer <your-token>'\n";
    code += '    }';

    if (requestSample) {
      code += ',\n    body: JSON.stringify(requestBody)';
    }

    code += '\n  };\n\n';

    // Add fetch call with error handling
    code += '  try {\n';
    code += '    const response = await fetch(url, config);\n';
    code += '    \n';
    code += '    if (!response.ok) {\n';
    code += '      throw new Error(`HTTP error! status: ${response.status}`);\n';
    code += '    }\n';
    code += '    \n';
    code += `    const data: ${responseSample ? 'ResponseBody' : 'any'} = await response.json();\n`;
    code += '    return data;\n';
    code += '  } catch (error) {\n';
    code += '    console.error("Error:", error);\n';
    code += '    throw error;\n';
    code += '  }\n';
    code += '}\n\n';

    // Add usage example
    code += '// Usage example:\n';
    if (requestSample) {
      code += 'const requestData: RequestBody = ';
      code += JSON.stringify(requestSample, null, 2) + ';\n';
      code += `${functionName}(requestData)\n`;
    } else {
      code += `${functionName}()\n`;
    }
    code += '  .then(result => console.log(result))\n';
    code += '  .catch(error => console.error(error));';

    return code;
  }

  /**
   * Generates TypeScript interface definition from a sample object
   *
   * @param obj - The object to generate interface from
   * @param indent - Indentation string
   * @returns TypeScript interface properties as string
   */
  private generateTypeScriptInterface(obj: unknown, indent: string = ''): string {
    if (typeof obj !== 'object' || obj === null) {
      return '';
    }

    let result = '';
    const entries = Object.entries(obj as Record<string, unknown>);

    for (const [key, value] of entries) {
      const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `"${key}"`;

      if (Array.isArray(value)) {
        if (value.length > 0) {
          const itemType = this.getTypeScriptType(value[0]);
          result += `${indent}${safeKey}: ${itemType}[];\n`;
        } else {
          result += `${indent}${safeKey}: any[];\n`;
        }
      } else if (typeof value === 'object' && value !== null) {
        result += `${indent}${safeKey}: {\n`;
        result += this.generateTypeScriptInterface(value, indent + '  ');
        result += `${indent}};\n`;
      } else {
        const type = this.getTypeScriptType(value);
        result += `${indent}${safeKey}: ${type};\n`;
      }
    }

    return result;
  }

  /**
   * Gets TypeScript type for a value
   *
   * @param value - The value to get type for
   * @returns TypeScript type as string
   */
  private getTypeScriptType(value: unknown): string {
    if (value === null) return 'null';
    if (typeof value === 'string') return 'string';
    if (typeof value === 'number') return 'number';
    if (typeof value === 'boolean') return 'boolean';
    if (Array.isArray(value)) return 'any[]';
    if (typeof value === 'object') return 'object';
    return 'any';
  }
}
