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
import { LaagBase } from '@laag/core';
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
    constructor(doc) {
        var _a, _b, _c;
        super(doc);
        this._docVersion = '3.0.2';
        this._basePath = null;
        this._baseUri = '';
        this._protocols = [];
        this._httpMethods = ['get', 'post', 'put', 'delete', 'patch', 'head'];
        // Initialize with default OpenAPI document structure if empty or missing required fields
        (_a = this.doc).openapi ?? (_a.openapi = '3.0.2');
        (_b = this.doc).info ?? (_b.info = { title: '', version: '1.0.0' });
        (_c = this.doc).paths ?? (_c.paths = {});
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
    validate() {
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
        }
        else {
            if (!this.doc.info.title) {
                errors.push({
                    path: 'info.title',
                    message: 'Info title is required',
                    code: 'REQUIRED_FIELD_MISSING',
                });
            }
            if (!this.doc.info.version) {
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
            errors: errors,
        };
    }
    // HTTP Methods management
    get httpMethods() {
        return [...this._httpMethods];
    }
    set httpMethods(methods) {
        this._httpMethods = [...methods];
    }
    // Document version management
    get docVersion() {
        return this._docVersion;
    }
    set docVersion(value) {
        this._docVersion = value;
    }
    // Document retrieval methods
    getDefinition(format = 'js') {
        switch (format) {
            case 'js':
                return this.doc;
            case 'json':
                return JSON.stringify(this.doc);
            case 'prettyjson':
                return JSON.stringify(this.doc, null, 2);
            default:
                return this.doc;
        }
    }
    // Info object management
    get info() {
        return this.doc.info ?? {};
    }
    set info(value) {
        // Validate and filter valid properties
        const validKeys = ['title', 'description', 'termsOfService', 'contact', 'license', 'version'];
        const newValue = {};
        for (const [key, val] of Object.entries(value)) {
            if (validKeys.includes(key) || key.startsWith('x-')) {
                newValue[key] = val;
            }
        }
        this.doc.info = newValue;
    }
    get title() {
        return this.dictKeysExists(this.doc, 'info.title') ? this.doc.info.title : null;
    }
    set title(value) {
        var _a;
        (_a = this.doc).info ?? (_a.info = {});
        this.doc.info.title = value;
    }
    get description() {
        return this.dictKeysExists(this.doc, 'info.description')
            ? (this.doc.info.description ?? null)
            : null;
    }
    set description(value) {
        var _a;
        (_a = this.doc).info ?? (_a.info = {});
        this.doc.info.description = value;
    }
    get version() {
        return this.dictKeysExists(this.doc, 'info.version')
            ? this.doc.info.version
            : null;
    }
    set version(value) {
        var _a;
        (_a = this.doc).info ?? (_a.info = {});
        this.doc.info.version = value;
    }
    get termsOfService() {
        return this.dictKeysExists(this.doc, 'info.termsOfService')
            ? (this.doc.info.termsOfService ?? null)
            : null;
    }
    set termsOfService(value) {
        var _a;
        (_a = this.doc).info ?? (_a.info = {});
        this.doc.info.termsOfService = value;
    }
    get contact() {
        return this.dictKeysExists(this.doc, 'info.contact')
            ? (this.doc.info.contact ?? {})
            : {};
    }
    set contact(value) {
        var _a;
        const validKeys = ['name', 'url', 'email'];
        const newValue = {};
        for (const [key, val] of Object.entries(value)) {
            if (validKeys.includes(key) || key.startsWith('x-')) {
                newValue[key] = val;
            }
        }
        (_a = this.doc).info ?? (_a.info = {});
        this.doc.info.contact = newValue;
    }
    get license() {
        return this.dictKeysExists(this.doc, 'info.license')
            ? (this.doc.info.license ?? { name: '' })
            : { name: '' };
    }
    set license(value) {
        var _a;
        const validKeys = ['name', 'url'];
        const newValue = { name: '' }; // name is required
        for (const [key, val] of Object.entries(value)) {
            if (validKeys.includes(key) || key.startsWith('x-')) {
                newValue[key] = val;
            }
        }
        (_a = this.doc).info ?? (_a.info = {});
        this.doc.info.license = newValue;
    }
    // Servers management
    get servers() {
        return this.dictKeysExists(this.doc, 'servers') ? this.doc.servers : [];
    }
    set servers(value) {
        const validKeys = ['variables', 'url', 'description'];
        const ret = [];
        for (const server of value) {
            const newValue = { url: '' }; // url is required
            for (const [key, val] of Object.entries(server)) {
                if (validKeys.includes(key) || key.startsWith('x-')) {
                    newValue[key] = val;
                }
            }
            ret.push(newValue);
        }
        this.doc.servers = ret;
    }
    appendServer(value) {
        var _a;
        (_a = this.doc).servers ?? (_a.servers = []);
        this.doc.servers.push(value);
    }
    // Base URI and protocols (legacy compatibility)
    get baseUri() {
        return this._baseUri;
    }
    set baseUri(value) {
        this._baseUri = value;
    }
    get protocols() {
        return [...this._protocols];
    }
    set protocols(value) {
        this._protocols = [...value];
    }
    appendProtocol(value) {
        this._protocols.push(value);
    }
    // Paths management
    get paths() {
        return this.dictKeysExists(this.doc, 'paths') ? this.doc.paths : {};
    }
    set paths(value) {
        this.doc.paths = value;
    }
    appendPath(path, value) {
        var _a;
        const cleanPath = path.trim().startsWith('/') ? path.trim() : `/${path.trim()}`;
        (_a = this.doc).paths ?? (_a.paths = {});
        this.doc.paths[cleanPath] = value;
    }
    getPathNames() {
        const paths = Object.keys(this.doc.paths ?? {});
        return paths
            .filter(path => !path.startsWith('x-'))
            .sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }));
    }
    getPath(path) {
        return this.dictKeysExists(this.doc, `paths.${path}`)
            ? (this.doc.paths[path] ?? {})
            : {};
    }
    // Components management
    get components() {
        return this.dictKeysExists(this.doc, 'components')
            ? this.doc.components
            : {};
    }
    set components(value) {
        this.doc.components = value;
    }
    get componentsSchemas() {
        return this.dictKeysExists(this.doc, 'components.schemas')
            ? (this.doc.components.schemas ?? {})
            : {};
    }
    // Security management
    get security() {
        return this.dictKeysExists(this.doc, 'security')
            ? this.doc.security
            : [];
    }
    set security(value) {
        this.doc.security = value;
    }
    // Tags management
    get tags() {
        return this.dictKeysExists(this.doc, 'tags') ? this.doc.tags : [];
    }
    set tags(value) {
        const validKeys = ['name', 'description', 'externalDocs'];
        const newValue = { name: '' }; // name is required
        for (const [key, val] of Object.entries(value)) {
            if (validKeys.includes(key) || key.startsWith('x-')) {
                newValue[key] = val;
            }
        }
        this.doc.tags = [newValue];
    }
    // External docs management
    get externalDocs() {
        return this.dictKeysExists(this.doc, 'externalDocs')
            ? this.doc.externalDocs
            : { url: '' };
    }
    set externalDocs(value) {
        const validKeys = ['url', 'description'];
        const newValue = { url: '' }; // url is required
        for (const [key, val] of Object.entries(value)) {
            if (validKeys.includes(key) || key.startsWith('x-')) {
                newValue[key] = val;
            }
        }
        this.doc.externalDocs = newValue;
    }
    // Operation utility methods
    operationExists(path, verb) {
        const method = verb.toLowerCase();
        const pathItem = this.doc.paths?.[path];
        return !!pathItem?.[method];
    }
    pathExists(path) {
        return !!this.doc.paths?.[path];
    }
    getAllHttpMethods() {
        const methods = new Set();
        for (const pathItem of Object.values(this.doc.paths ?? {})) {
            if (pathItem) {
                for (const method of Object.keys(pathItem)) {
                    if (this.httpMethods.includes(method)) {
                        methods.add(method);
                    }
                }
            }
        }
        return Array.from(methods);
    }
    getStatusCodes(path, verb) {
        const method = verb.toLowerCase();
        const operation = this.doc.paths?.[path]?.[method];
        if (!operation?.responses) {
            return [];
        }
        const ret = [];
        for (const [statusCode, response] of Object.entries(operation.responses)) {
            if (statusCode === 'default')
                continue;
            const responseObj = response;
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
    getAllStatusCodes() {
        const codes = new Set();
        for (const path of this.getPathNames()) {
            for (const method of Object.keys(this.doc.paths[path] ?? {})) {
                if (this.httpMethods.includes(method)) {
                    for (const statusInfo of this.getStatusCodes(path, method)) {
                        codes.add(statusInfo.code);
                    }
                }
            }
        }
        return Array.from(codes);
    }
    // Operation ID management
    getOperationId(path, verb) {
        const method = verb.toLowerCase();
        const operation = this.doc.paths?.[path]?.[method];
        if (operation?.operationId) {
            return operation.operationId;
        }
        // Generate operation ID from path and method
        const pathSegment = path
            .replace('/', '')
            .split('/')
            .pop()
            ?.replace(/{([^}]*)}/g, '$1') ?? '';
        return method + pathSegment.charAt(0).toUpperCase() + pathSegment.slice(1);
    }
    setOperationId(path, verb, value) {
        const method = verb.toLowerCase();
        const pathItem = this.doc.paths?.[path];
        const operation = pathItem?.[method];
        if (operation) {
            operation.operationId = value;
            return value;
        }
        return '';
    }
    // Alias methods for compatibility
    getDisplayName(path, verb) {
        return this.getOperationId(path, verb);
    }
    setDisplayName(path, verb, value) {
        return this.setOperationId(path, verb, value);
    }
    getOperationIds() {
        const ret = [];
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
    getOperationRequestMedia(path, verb) {
        const method = verb.toLowerCase();
        const operation = this.doc.paths?.[path]?.[method];
        if (!operation)
            return [];
        let requestBody = operation.requestBody;
        // Handle $ref
        if (requestBody && '$ref' in requestBody) {
            const component = this.getComponentFromPath(requestBody.$ref);
            requestBody = component;
        }
        return requestBody?.content ? Object.keys(requestBody.content) : [];
    }
    getOperationResponseMedia(path, verb, code) {
        const method = verb.toLowerCase();
        const operation = this.doc.paths?.[path]?.[method];
        if (!operation)
            return [];
        const statusCode = code ?? this.getSuccessCode(path, verb);
        const response = operation.responses?.[statusCode];
        return response?.content ? Object.keys(response.content) : [];
    }
    getOperationResponse(path, verb, statusCode) {
        const method = verb.toLowerCase();
        const operation = this.doc.paths?.[path]?.[method];
        if (!operation)
            return {};
        return operation.responses?.[statusCode] ?? {};
    }
    getOperationRequest(path, verb) {
        const method = verb.toLowerCase();
        const operation = this.doc.paths?.[path]?.[method];
        if (!operation)
            return {};
        return operation.requestBody ?? {};
    }
    getOperationDescription(path, verb) {
        const method = verb.toLowerCase();
        const operation = this.doc.paths?.[path]?.[method];
        return operation?.description ?? '';
    }
    getOperationData(path, verb) {
        const method = verb.toLowerCase();
        const operation = this.doc.paths?.[path]?.[method];
        return operation ?? {};
    }
    isOperationDeprecated(path, verb) {
        const method = verb.toLowerCase();
        const operation = this.doc.paths?.[path]?.[method];
        return operation?.deprecated ?? false;
    }
    getSuccessCode(path, verb) {
        const codes = this.getStatusCodes(path, verb);
        for (const codeInfo of codes) {
            const code = parseInt(codeInfo.code);
            if (code >= 200 && code < 300) {
                return codeInfo.code;
            }
        }
        return '';
    }
    getBasePath() {
        return this._basePath;
    }
    // Component reference resolution
    getComponentFromPath(refPath) {
        const cleanPath = refPath.replace('#/', '');
        const parts = cleanPath.split('/');
        // Navigate through the document structure
        let current = this.doc;
        for (const part of parts) {
            if (!current || typeof current !== 'object' || !(part in current)) {
                // Component not found, return empty object
                return {};
            }
            current = current[part];
        }
        return current;
    }
    // Extension methods for root level
    get rootExtensions() {
        return this.getExtensions();
    }
    set rootExtensions(values) {
        this.setExtensions(values);
    }
    appendRootExtension(name, value) {
        if (name.startsWith('x-')) {
            this.doc[name] = value;
        }
    }
    // Extension methods for info level
    get infoExtensions() {
        return this.getExtensions('info');
    }
    set infoExtensions(values) {
        this.setExtensions(values, 'info');
    }
    appendInfoExtension(name, value) {
        if (name.startsWith('x-') && this.doc.info) {
            this.doc.info[name] = value;
        }
    }
    // Extension methods for paths level
    get pathsExtensions() {
        return this.getExtensions('paths');
    }
    set pathsExtensions(values) {
        this.setExtensions(values, 'paths');
    }
    appendPathsExtension(name, value) {
        if (name.startsWith('x-') && this.doc.paths) {
            this.doc.paths[name] = value;
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
    generateJsonSample(path, verb, type = 'request') {
        if (!this.operationExists(path, verb)) {
            return null;
        }
        let schema;
        if (type === 'request') {
            let requestBody = this.getOperationRequest(path, verb);
            // Resolve reference if needed
            if ('$ref' in requestBody && typeof requestBody.$ref === 'string') {
                requestBody = this.getComponentFromPath(requestBody.$ref);
            }
            const typedRequestBody = requestBody;
            if (!typedRequestBody?.content?.['application/json']?.schema) {
                return null;
            }
            schema = typedRequestBody.content['application/json'].schema;
        }
        else {
            const code = this.getSuccessCode(path, verb);
            const response = this.getOperationResponse(path, verb, code);
            if ('$ref' in response && typeof response.$ref === 'string') {
                const component = this.getComponentFromPath(response.$ref);
                if (!component?.content?.['application/json']?.schema) {
                    return null;
                }
                schema = component.content['application/json'].schema;
            }
            else if (!response?.content?.['application/json']?.schema) {
                return null;
            }
            else {
                schema = response.content['application/json'].schema;
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
    generateSchemaExample(schema) {
        if ('$ref' in schema && typeof schema.$ref === 'string') {
            const resolvedSchema = this.getComponentFromPath(schema.$ref);
            return this.generateSchemaExample(resolvedSchema);
        }
        // Handle allOf composition
        if (schema.allOf) {
            const combined = {};
            for (const subSchema of schema.allOf) {
                const example = this.generateSchemaExample(subSchema);
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
                return this.generateSchemaExample(schemas[0]);
            }
        }
        // Return example if provided
        if (schema.example !== undefined) {
            return schema.example;
        }
        // Generate based on type
        const obj = {};
        switch (schema.type) {
            case 'object':
                if (schema.properties) {
                    for (const [key, propSchema] of Object.entries(schema.properties)) {
                        obj[key] = this.generateSchemaExample(propSchema);
                    }
                }
                else if (schema.additionalProperties) {
                    obj['{property1}'] = this.generateSchemaExample(schema.additionalProperties);
                }
                return obj;
            case 'array':
                if (schema.items) {
                    return [this.generateSchemaExample(schema.items)];
                }
                return [];
            case 'string':
                if (schema.format === 'date')
                    return '2023-01-01';
                if (schema.format === 'date-time')
                    return '2023-01-01T00:00:00Z';
                if (schema.format === 'email')
                    return 'user@example.com';
                if (schema.format === 'uri')
                    return 'https://example.com';
                if (schema.format === 'uuid')
                    return '123e4567-e89b-12d3-a456-426614174000';
                if (schema.enum && schema.enum.length > 0)
                    return schema.enum[0];
                return 'string';
            case 'number':
            case 'integer':
                if (schema.enum && schema.enum.length > 0)
                    return schema.enum[0];
                if (schema.minimum !== undefined)
                    return schema.minimum;
                return schema.type === 'integer' ? 0 : 0.0;
            case 'boolean':
                return false;
            default:
                // Handle object without explicit type
                if (schema.properties) {
                    const obj = {};
                    for (const [key, propSchema] of Object.entries(schema.properties)) {
                        obj[key] = this.generateSchemaExample(propSchema);
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
    getCurlCommands(path, verb) {
        const results = [];
        const method = verb.toUpperCase();
        let dataOption = '';
        if (['POST', 'PUT', 'PATCH'].includes(method)) {
            const contentTypes = this.getOperationRequestMedia(path, verb);
            const contentType = contentTypes.length > 0 ? contentTypes[0] : 'application/json';
            dataOption = `-H "Content-Type: ${contentType}" -d '<request-payload>'`;
        }
        for (const server of this.servers) {
            const command = `curl -i -X ${method} "${server.url}${path}" -H "Authorization: <auth-token>" ${dataOption}`.trim();
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
    getPythonCode(path, verb) {
        let code = 'import requests\nimport json\n\n';
        // Add server URLs
        let count = 1;
        for (const server of this.servers) {
            code += `# Endpoint for '${server.description ?? 'Server ' + count}'\n`;
            if (count === 1) {
                code += `URL = '${server.url}${path}'\n`;
            }
            else {
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
        }
        else {
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
    getJavaScriptCode(path, verb, useAsync = true) {
        let code = '';
        if (useAsync) {
            code += 'async function makeRequest() {\n';
        }
        else {
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
        }
        else {
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
        }
        else {
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
    getTypeScriptCode(path, verb) {
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
        }
        else {
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
    generateTypeScriptInterface(obj, indent = '') {
        if (typeof obj !== 'object' || obj === null) {
            return '';
        }
        let result = '';
        const entries = Object.entries(obj);
        for (const [key, value] of entries) {
            const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `"${key}"`;
            if (Array.isArray(value)) {
                if (value.length > 0) {
                    const itemType = this.getTypeScriptType(value[0]);
                    result += `${indent}${safeKey}: ${itemType}[];\n`;
                }
                else {
                    result += `${indent}${safeKey}: any[];\n`;
                }
            }
            else if (typeof value === 'object' && value !== null) {
                result += `${indent}${safeKey}: {\n`;
                result += this.generateTypeScriptInterface(value, indent + '  ');
                result += `${indent}};\n`;
            }
            else {
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
    getTypeScriptType(value) {
        if (value === null)
            return 'null';
        if (typeof value === 'string')
            return 'string';
        if (typeof value === 'number')
            return 'number';
        if (typeof value === 'boolean')
            return 'boolean';
        if (Array.isArray(value))
            return 'any[]';
        if (typeof value === 'object')
            return 'object';
        return 'any';
    }
}
// Static HTTP status code mappings
Openapi.statusCodeReason = {
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
//# sourceMappingURL=openapi.js.map