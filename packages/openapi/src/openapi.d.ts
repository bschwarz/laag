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
import { ComponentsObject, ContactObject, ExternalDocumentationObject, HttpMethod, InfoObject, LicenseObject, OpenAPIDocument, OperationObject, PathItemObject, PathsObject, ReferenceObject, RequestBodyObject, ResponseObject, SchemaObject, SecurityRequirementObject, ServerObject, TagObject } from './types.js';
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
export declare class Openapi extends LaagBase {
    private _docVersion;
    private _basePath;
    private _baseUri;
    private _protocols;
    private _httpMethods;
    private static readonly statusCodeReason;
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
    constructor(doc?: string | OpenAPIDocument);
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
    validate(): ValidationResult;
    get httpMethods(): HttpMethod[];
    set httpMethods(methods: HttpMethod[]);
    get docVersion(): string;
    set docVersion(value: string);
    getDefinition(format?: 'js' | 'json' | 'prettyjson'): OpenAPIDocument | string;
    get info(): InfoObject;
    set info(value: InfoObject);
    get title(): string | null;
    set title(value: string);
    get description(): string | null;
    set description(value: string);
    get version(): string | null;
    set version(value: string);
    get termsOfService(): string | null;
    set termsOfService(value: string);
    get contact(): ContactObject;
    set contact(value: ContactObject);
    get license(): LicenseObject;
    set license(value: LicenseObject);
    get servers(): ServerObject[];
    set servers(value: ServerObject[]);
    appendServer(value: ServerObject): void;
    get baseUri(): string;
    set baseUri(value: string);
    get protocols(): string[];
    set protocols(value: string[]);
    appendProtocol(value: string): void;
    get paths(): PathsObject;
    set paths(value: PathsObject);
    appendPath(path: string, value: PathItemObject): void;
    getPathNames(): string[];
    getPath(path: string): PathItemObject;
    get components(): ComponentsObject;
    set components(value: ComponentsObject);
    get componentsSchemas(): Record<string, SchemaObject | ReferenceObject>;
    get security(): SecurityRequirementObject[];
    set security(value: SecurityRequirementObject[]);
    get tags(): TagObject[];
    set tags(value: TagObject[]);
    get externalDocs(): ExternalDocumentationObject;
    set externalDocs(value: ExternalDocumentationObject);
    operationExists(path: string, verb: string): boolean;
    pathExists(path: string): boolean;
    getAllHttpMethods(): HttpMethod[];
    getStatusCodes(path: string, verb: string): Array<{
        code: string;
        description: string;
        media: string[];
    }>;
    getAllStatusCodes(): string[];
    getOperationId(path: string, verb: string): string;
    setOperationId(path: string, verb: string, value: string): string;
    getDisplayName(path: string, verb: string): string;
    setDisplayName(path: string, verb: string, value: string): string;
    getOperationIds(): Array<{
        id: string;
        path: string;
        method: string;
    }>;
    getOperationRequestMedia(path: string, verb: string): string[];
    getOperationResponseMedia(path: string, verb: string, code?: string): string[];
    getOperationResponse(path: string, verb: string, statusCode: string): ResponseObject;
    getOperationRequest(path: string, verb: string): RequestBodyObject;
    getOperationDescription(path: string, verb: string): string;
    getOperationData(path: string, verb: string): OperationObject;
    isOperationDeprecated(path: string, verb: string): boolean;
    getSuccessCode(path: string, verb: string): string;
    getBasePath(): string | null;
    getComponentFromPath(refPath: string): unknown;
    get rootExtensions(): Record<string, unknown>;
    set rootExtensions(values: Record<string, unknown>);
    appendRootExtension(name: string, value: unknown): void;
    get infoExtensions(): Record<string, unknown>;
    set infoExtensions(values: Record<string, unknown>);
    appendInfoExtension(name: string, value: unknown): void;
    get pathsExtensions(): Record<string, unknown>;
    set pathsExtensions(values: Record<string, unknown>);
    appendPathsExtension(name: string, value: unknown): void;
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
    generateJsonSample(path: string, verb: string, type?: 'request' | 'response'): unknown;
    /**
     * Recursively generates example data from a JSON schema
     *
     * @param schema - The JSON schema to generate example from
     * @returns Generated example object
     */
    private generateSchemaExample;
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
    getCurlCommands(path: string, verb: string): Array<{
        command: string;
        description: string;
    }>;
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
    getPythonCode(path: string, verb: string): string;
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
    getJavaScriptCode(path: string, verb: string, useAsync?: boolean): string;
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
    getTypeScriptCode(path: string, verb: string): string;
    /**
     * Generates TypeScript interface definition from a sample object
     *
     * @param obj - The object to generate interface from
     * @param indent - Indentation string
     * @returns TypeScript interface properties as string
     */
    private generateTypeScriptInterface;
    /**
     * Gets TypeScript type for a value
     *
     * @param value - The value to get type for
     * @returns TypeScript type as string
     */
    private getTypeScriptType;
}
//# sourceMappingURL=openapi.d.ts.map