'use strict';

//
// This file contains both the Swagger/OpenAPI interface
//

/** Class representing plantuml markdowns. */
class Openapi  {
    /**
    * Ingests the API specification and passes
    * @param {string} doc - The API specification file (e.g. Swagger) in JSON format
    */
    constructor(doc = null) {
        //
        // pre load in the paths since many methods rely on this
        //
        this._docVersion = '3.0.2';
        if (doc) {
            this.doc = JSON.parse(doc);
        } else {
            this.doc = {openapi: '', info: {title: '', version: ''}, paths: {}};
        }
        this.pathList = this.getPathNames();
    }
    /**
    * Retrieve the document version
    * @returns (String) - returns document version
    */
    get docVersion() {
        return this._docVersion;
    }
    /**
    * Sets the document version
    * @param (String) value - value of the doc version
    */
    set docVersion(value) {
        this._docVersion = value;
    }
    /**
    * Retrieve the defintion as a js object or in JSON
    * @param (String) format - type of format to return
    * @returns (Object, String) - returns representation of the defintion
    */
    getDefinition(format = 'js') {
        let doc;
        this.doc.openapi = this.docVersion;
        if (format === 'js') {
            doc = this.doc;
        } else if (format === 'json') {
            doc = JSON.stringify(this.doc);
        } else if (format === 'prettyjson') {
            doc = JSON.stringify(this.doc, null, 2);
        }

        return doc;
    }
    /**
    * Helper method to see if keys exist in an object
    * A variable number of args are passed in
    * @returns (Boolean) - returns boolean if nested keys exist
    */
    dictKeysExists() {
        let dict = {...arguments[0]};
        for (let i = 1; i < arguments.length; i++) {
            if (typeof dict[arguments[i]] === 'undefined') {
                return false;
            }
            dict = {...dict[arguments[i]]};
        }

        return true;
    }
    /**
    * This is a helper method that is used by the specific get*Extensions getters
    * @param (String) - what level from the doc root is this object.
    * @returns (Object) - returns in the form of {key1: value1, key2: value2 ... }
    */
    getExtensions(level = 'root') {
        let obj = {};
        let ret = {};
        //
        // root has special meaning, that it is at the root of the
        // document
        //
        obj = level === 'root' ? this.doc : this.doc[level];
        //
        // Extensions start with 'x-'
        //
        for (let E of Object.keys(obj).filter(x => x.startsWith('x-'))) {
            ret[E] = obj[E];
        }

        return ret;
    }
    /**
    * This is a helper method that is used by the specific set*Extensions setters
    * @param (String) - what level from the doc root is this object.
    */
    setExtensions(values, level = 'root') {
        let obj = {};
        //
        // root has special meaning, that it is at the root of the
        // document
        //
        obj = level === 'root' ? this.doc : this.doc[level];
        //
        // since this is a set operation, meaning a replace operation, then we 
        // need to delete any existing extensions first
        //
        for (const E of Object.keys(obj).filter(x => x.startsWith('x-'))) {
            delete(obj[E]);
        } 
        for (const [key, value] of Object.entries(values)) {
            //
            // extensions must start with x-. We are silent if it fails
            // here.
            //
            if (key.startsWith('x-')) {
                obj[key] = value;
            }
        }
        if (level === 'root') {
            this.doc = obj;
        } else {
            this.doc[level] = obj;
        }
    }
    /**
    * Retrieves the extensions at the root of the doc, and
    * @returns (Object) - returns in the form of {key1: value1, key2: value2 ... }
    */
    get rootExtensions() {
        return this.getExtensions();
    }
    /**
    * Sets (replaces) the extensions at the root of the doc
    * @param (Object) values - object of key/value pairs of extensions to add {key1: value1, key2: value2 ... }
    */
    set rootExtensions(values) {
        this.setExtensions(values);
    }
    /**
    * Appends am extensions at the root of the doc
    * @param (string) name - name of the extension
    * @param (string) value - value of the extension
    */
    appendRootExtension(name, value) {
        //
        // extensions must start with x-. We are silent if it fails
        // here.
        //
        if (name.startsWith('x-')) {
            this.doc[name] = value;
        }
    }
    /**
    * Retrieves the extensions at info object of the doc
    * @returns (Object) - returns in the form of {key1: value1, key2: value2 ... }
    */
    get infoExtensions() {
        return this.getExtensions('info');
    }
    /**
    * Sets (replaces) the extensions at the info object of the doc
    * @param (Object) values - object of key/value pairs of extensions to add {key1: value1, key2: value2 ... }
    */
    set infoExtensions(values) {

        this.setExtensions(values, 'info');
    }
    /**
    * Appends am extensions at the root of the doc
    * @param (string) name - name of the extension
    * @param (string) value - value of the extension
    */
    appendInfoExtension(name, value) {
        //
        // extensions must start with x-. We are silent if it fails
        // here.
        //
        if (name.startsWith('x-')) {
            this.doc.info[name] = value;
        }
    }
    /**
    * Retrieves the info object for the API from the openapi document
    * Note: info object is required
    * @returns (Object) - object with the params of the info object
    */
    get info() {
        return this.doc.info || {};
    }
    /**
    * Sets the info object for the API from the openapi document
    * @param (Object) value - object containing the info
    */
    set info(value) {
        //
        // We want to make sure what is passed in is valid params,
        // so we check and only save those that are valid
        //
        let newValue = {};
        for (let I of Object.keys(value)) {
            if (['title', 'description', 'termsOfService', 'contact', 'license', 'version'].includes(I)) {
                newValue[I] = value[I];
            } else if (I.startsWith('x-')) {
                newValue[I] = value[I];
            }
        }
        this.doc.info = newValue;
    }
    /**
    * Retrieves the title for the API from the openapi3 document
    * Note: info is a required object, but check anyways
    * @returns (String) - title for the definition
    */
    get title() {
        return this.dictKeysExists(this.doc, 'info', 'title') ? this.doc.info.title : null;
    }
    /**
    * Sets the title for the API from the openapi3 document
    * @param (String) value - the value to use for the title of the definition
    */
    set title(value) {
        this.doc.info.title = value;
    }
    /**
    * Retrieves the description for the API from the openapi3 document
    * @returns (String) - description for the definition
    */
    get description() {
        return this.dictKeysExists(this.doc, 'info', 'description') ? this.doc.info.description : null;
    }
    /**
    * Sets the description for the API from the openapi3 document
    * @param (String) value - the value to use for the description of the definition
    */
    set description(value) {
        this.doc.info.description = value;
    }
    /**
    * Retrieves the version for the API from the openapi3 document
    * @returns (String) - version for the definition
    */
    get version() {
        return this.dictKeysExists(this.doc, 'info', 'version') ? this.doc.info.version : null;
    }
    /**
    * Sets the version for the API from the openapi3 document
    * @param (String) value - the value to use for the version of the definition
    */
    set version(value) {
        this.doc.info.version = value;
    }
    /**
    * Retrieves the terms of service for the API from the openapi3 document
    * @returns (String) - terms of service
    */
    get termsOfService() {
        return this.dictKeysExists(this.doc, 'info', 'termsOfService') ? this.doc.info.termsOfService : null;
    }
    /**
    * Sets the terms of service for the API from the openapi3 document
    * @param (String) value - the value to use for the termsOfService of the definition
    */
    set termsOfService(value) {
        this.doc.info.termsOfService = value;
    }
    /**
    * Retrieves the contact object
    * @returns (Object) - the object with the contact information
    */
    get contact() {
        return this.dictKeysExists(this.doc, 'info', 'contact') ? this.doc.info.contact : {};
    }
    /**
    * Sets the contact object
    * @param (Object) value - the value to use for the contact object of the definition
    */
    set contact(value) {
        //
        // We want to make sure what is passed in is valid params,
        // so we check and only save those that are valid
        //
        let newValue = {};
        for (let I of Object.keys(value)) {
            if (['name', 'url', 'email'].includes(I)) {
                newValue[I] = value[I];
            } else if (I.startsWith('x-')) {
                newValue[I] = value[I];
            }
        }
        this.doc.info.contact = newValue;
    }
    /**
    * Retrieves the license object
    * @returns (Object) - Object with the license information
    */
    get license() {
        return this.dictKeysExists(this.doc, 'info', 'license') ? this.doc.info.license : {};
    }
    /**
    * Sets the license object
    * @param (Object) value - object containing license information
    */
    set license(value) {
        //
        // We want to make sure what is passed in is valid params,
        // so we check and only save those that are valid
        //
        let newValue = {};
        for (let I of Object.keys(value)) {
            if (['name', 'url'].includes(I)) {
                newValue[I] = value[I];
            } else if (I.startsWith('x-')) {
                newValue[I] = value[I];
            }
        }
        this.doc.info.license = newValue;
    }
    /**
    * Retrieves the servers array
    * @returns (Array) - returns array containing server information
    */
    get servers() {
        return this.dictKeysExists(this.doc, 'servers') ? this.doc.servers : [];
    }
    /**
    * Sets the servers array
    * @param (Array) value - an array of objects containing server information
    */
    set servers(value) {
        //
        // We want to make sure what is passed in is valid params,
        // so we check and only save those that are valid
        //
        let ret = [];
        for (let O of value) {
            let newValue = {};
            for (let I of Object.keys(O)) {
                if (['variables', 'url', 'description'].includes(I)) {
                    newValue[I] = O[I];
                } else if (I.startsWith('x-')) {
                    newValue[I] = O[I];
                }
            }
            ret.push(newValue);
        }
        this.doc.servers = ret;
    }
    /**
    * Appends a server
    * @param (Object) value - an object with the server info
    */
    appendServer(value) {
        this.doc.servers.push(value);
    }
    /**
    * Retrieves the paths object
    * @returns (Array) - returns object containing all of the path information
    */
    get paths() {
        return this.dictKeysExists(this.doc, 'paths') ? this.doc.paths : {};
    }
    /**
    * sets the paths object in it's native form
    * @param (Object) - the paths object
    */
    set paths(value) {
        this.doc.paths = value;
    }
    /**
    * Appends a path to the paths object
    * @param (String) pathname - name of the path (url)
    * @param (Object) value    - a path object with the path information
    */
    appendPath(path, value) {
        path = path.trim();
        if (!path.startsWith('/')) {
            path = '/'+path;
        }
        this.doc.paths[path] = value;
    }
   /**
    * Retrieves the extensions at paths object of the doc
    * @returns (Object) - returns in the form of {key1: value1, key2: value2 ... }
    */
    get pathsExtensions() {
        return this.getExtensions('paths');
    }
    /**
    * Sets (replaces) the extensions at the paths object of the doc
    * @param (Object) values - object of key/value pairs of extensions to add {key1: value1, key2: value2 ... }
    */
    set pathsExtensions(values) {

        this.setExtensions(values, 'paths');
    }
    /**
    * Appends am extensions at the root of the doc
    * @param (string) name - name of the extension
    * @param (string) value - value of the extension
    */
    appendPathsExtension(name, value) {
        //
        // extensions must start with x-. We are silent if it fails
        // here.
        //
        if (name.startsWith('x-')) {
            this.doc.paths[name] = value;
        }
    }
   /**
    * Gets all the possible unique set of HTTP methods from all of the operations
    * @returns (Array) - array of unique HTTP methods (verbs) across all operations
    */
    getAllHttpMethods() {
        let methods = new Set();

        for (let P of Object.keys(this.doc.paths)) {
            Object.keys(this.doc.paths[P]).forEach(item => methods.add(item));
        }
        let unique = Array.from(methods);
        return  unique.length > 0 ? unique : [];
    }
    /**
    * Gets all the paths, sorted by alpha and length
    * @returns (Array) - array of all of the paths (resources)
    */
    getPathNames() {
        const sf = function(a,b) {return a.localeCompare(b, 'en', {'sensitivity': 'base'});}
        const paths = Object.keys(this.doc.paths).sort(sf);
        return paths.length > 0 ? paths.filter(x => !x.startsWith('x-')) : [];
    }
    /**
    * Gets all the possible HTTP status codes for an operation
    * @param {string} path - the resource path for this operation
    * @param {string} verb - HTTP verb for this operation
    * @returns (Object) - Object with code, description and media for each status code
    */
    getStatusCodes(path, verb) {
        let doc = this.doc.paths;
        let ret = [];
        let d,m;

        // if (dictKeysExists(doc, path, verb, responses) doc[path] && doc[path][verb] && doc[path][verb].responses) {
        if (this.dictKeysExists(doc, path, verb, 'responses')) {
            for (let R of Object.keys(doc[path][verb].responses).sort()) {
                d = doc[path][verb].responses[R].description || '';
                m = doc[path][verb].responses[R].content ? Object.keys(doc[path][verb].responses[R].content) : [];
                ret.push({code: R, description: d, media: m});
            }
        }
        return ret.length > 0 ? ret : [];
    }
    /**
    * util function to get the operationId if exists, and generate one if it does not exist
    * If one doesn't exist, then it will construct based on the path and method, camel cased
    * @param {string} path - the path segment of the resource
    * @param {string} verb - the HTTP verb for this operation
    * @returns (String) - name of the operation ID associated with this operation
    */
    getOperationId(path, verb) {

        let v = verb.toLowerCase();

        if (this.operationExists(path, verb) && this.doc.paths[path][v].operationId) {
            return this.doc.paths[path][v].operationId;
        }

        let str = path.replace('/', '').split('/').pop().replace(/{([^}]*)}/g, '$1');
        
        return v + str.charAt(0).toUpperCase() + str.substr(1);
    }
    /**
    * util to check if an operation (verb + path) exists in the definition
    * @param {string} path - the path segment of the resource
    * @param {string} verb - the HTTP verb for this operation
    */
    operationExists(path, verb) {
        let v = verb.toLowerCase();

        return (this.doc.paths[path] && this.doc.paths[path][v]) ? true : false;
    }
    /**
    * util to check if an path exists in the definition
    * @param {string} path - the path segment of the resource
    */
    pathExists(path) {
        return this.doc.paths[path] ? true : false;
    }
    /**
    * gets the media types for an operation request
    * @param {string} path - the path segment of the resource
    * @param {string} verb - HTTP verb of the operation
    */
    getOperationRequest(path, verb) {
        let ret = [];
        if (! this.operationExists(path, verb)) return [];
        
        if (this.doc.paths[path][verb]['requestBody']['content']) {
            ret = Object.keys(this.doc.paths[path][verb]['requestBody']['content']);
        }

        return ret
    }
    /**
    * gets the description for an operation
    * @param {string} path - the path segment of the resource
    * @param {string} verb - HTTP verb of the operation
    */
    getOpDescription(path, verb) {
        if (! this.operationExists(path, verb)) return '';

        let d = this.doc.paths[path][verb]['description'] ? this.doc.paths[path][verb]['description'] : '';
        return d.length <= 30 ? d : d.substr(0,29)+'...';
    }
    /**
    * gets base URL for the API. Will get first one if there are multiple servers specified
    * TODO (bschwarz) - this doesn't make sense for openapi3
    */
    getBasePath() {
        return this.doc.servers ? this.doc.servers[0] : {};
    }
}

module.exports.Openapi = Openapi;