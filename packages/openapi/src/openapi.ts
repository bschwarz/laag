/**
 * Modernized TypeScript implementation of the OpenAPI/Swagger document interface
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
 * Main class for working with OpenAPI/Swagger documents
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
   * Creates an OpenAPI document instance
   * @param doc - The OpenAPI document as a string (JSON) or object
   */
  constructor(doc?: string | OpenAPIDocument) {
    super(doc);

    // Initialize with default OpenAPI document structure if empty
    if (!this.doc.openapi) {
      this.doc = {
        openapi: '3.0.2',
        info: { title: '', version: '1.0.0' },
        paths: {},
      };
    }
  }

  /**
   * Validate the OpenAPI document structure
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
    return this.dictKeysExists(this.doc, 'info', 'title')
      ? (this.doc.info as InfoObject).title
      : null;
  }

  set title(value: string) {
    this.doc.info ??= {} as InfoObject;
    (this.doc.info as InfoObject).title = value;
  }

  get description(): string | null {
    return this.dictKeysExists(this.doc, 'info', 'description')
      ? ((this.doc.info as InfoObject).description ?? null)
      : null;
  }

  set description(value: string) {
    this.doc.info ??= {} as InfoObject;
    (this.doc.info as InfoObject).description = value;
  }

  get version(): string | null {
    return this.dictKeysExists(this.doc, 'info', 'version')
      ? (this.doc.info as InfoObject).version
      : null;
  }

  set version(value: string) {
    this.doc.info ??= {} as InfoObject;
    (this.doc.info as InfoObject).version = value;
  }

  get termsOfService(): string | null {
    return this.dictKeysExists(this.doc, 'info', 'termsOfService')
      ? ((this.doc.info as InfoObject).termsOfService ?? null)
      : null;
  }

  set termsOfService(value: string) {
    this.doc.info ??= {} as InfoObject;
    (this.doc.info as InfoObject).termsOfService = value;
  }

  get contact(): ContactObject {
    return this.dictKeysExists(this.doc, 'info', 'contact')
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
    return this.dictKeysExists(this.doc, 'info', 'license')
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
    return this.dictKeysExists(this.doc, 'paths', path)
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
    return this.dictKeysExists(this.doc, 'components', 'schemas')
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

    if (!this.dictKeysExists(this.doc, ...parts)) {
      // Component not found, return empty object
      return {};
    }

    let current: Record<string, unknown> = this.doc as Record<string, unknown>;
    for (const part of parts) {
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
}
