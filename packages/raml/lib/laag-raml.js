'use strict';

//
// This file contains both the RAML interface
//
class Core {
    /**
    * Creates a Core object used by other classes
    */
    constructor() {
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
        // TODO - Need to check if RAML extensions (annotations) are 
        //        supported in nested objects
        //
        if (level != 'root') {
            return ret;
        }
        obj = level === 'root' ? this.doc : this.doc[level];
        //
        // Extensions (annotations) are wrapped in ()
        //
        let re = RegExp(/\((.*?)\)/);
        for (let E of Object.keys(obj)) {
            let match = E.match(re);
            if (match) {
                let keyStripped = match[1];
                console.log(keyStripped);
                ret[keyStripped] = obj[E];
            }
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
        // TODO - Need to check if RAML extensions (annotations) are 
        //        supported in nested objects
        //
        if (level != 'root') {
            return ret;
        }
        //
        // root has special meaning, that it is at the root of the
        // document
        //
        obj = level === 'root' ? this.doc : this.doc[level];
        //
        // since this is a set operation, meaning a replace operation, then we 
        // need to delete any existing extensions first
        //
        let re = RegExp(/\((.*?)\)/);
        for (let E of Object.keys(obj)) {
            let match = E.match(re);
            if (match) {
                delete(obj[E]);
            }
        }
        for (const [key, value] of Object.entries(values)) {
            let newKey = `(${key.replace("(", "",).replace(")","")})`;
            obj[newKey] = value;
        }
        if (level === 'root') {
            this.doc = obj;
        } else {
            this.doc[level] = obj;
        }
    }
}

class Raml extends Core {
    /**
    * Ingests the API specification
    * @param {string} doc - The API specification file (e.g. RAML) in JSON format
    */
    constructor(doc = null) {
        super();
        //
        // pre load in the paths since many methods rely on this
        //
        this._docVersion = '1.0';
        if (doc) {
            this.doc = JSON.parse(doc);
        } else {
            this.doc = {title: ''};
        }
        this.pathList = this.getPathNames();
        this._paths = {};
        //
        // These fields are present in OpenAPI, but not RAML, but we can get/set them
        // internally, but they won't show up in the definition output
        //
        this._servers = [];
        this._termsOfService = '';
        this._contact = {};
        this._license = {};
        this._pathAnnotations = {};
        this._tags = {};
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
        // this.doc.openapi = this.docVersion; TODO: check if there is a version in the document
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
        let newName = `(${name.replace("(", "",).replace(")","")})`;
        this.doc[newName] = value;
    }
    /**
    * Retrieves the extensions at info object of the doc
    * @returns (Object) - returns in the form of {key1: value1, key2: value2 ... }
    */
    get infoExtensions() {
        return {};
    }
    /**
    * Sets (replaces) the extensions at the info object of the doc
    * @param (Object) values - object of key/value pairs of extensions to add {key1: value1, key2: value2 ... }
    */
    set infoExtensions(values) {
        let obj = {};
    }
    /**
    * Appends am extensions at the root of the doc
    * @param (string) name - name of the extension
    * @param (string) value - value of the extension
    */
    appendInfoExtension(name, value) {
        let obj = {};
    }
    /**
    * Retrieves the info object for the API from the raml document
    * Note: RAML doesn't have a info object, but we provide a similar 
    *       response as with openapi
    * @returns (Object) - object with the params of the info object
    */
    get info() {
        let title = this.doc.title || '';
        let version = this.doc.version || '';
        let baseUri = this.doc.baseUri || '';
        let description = this.doc.description || '';
        return {title: title, description: description, version: version, baseUri: baseUri};
    }
    /**
    * Sets the info object for the API from the RAML document
    * @param (Object) value - object containing the info
    */
    set info(value) {
        //
        // We want to make sure what is passed in is valid params,
        // so we check and only save those that are valid
        //
        let newValue = {};
        for (let I of Object.keys(value)) {
            if (['title', 'description', 'baseUri', 'version'].includes(I)) {
                newValue[I] = value[I];
                this.doc[I] = value[I];
            }
        }
    }
    /**
    * Retrieves the title for the API from the RAML document
    * Note: info is a required object, but check anyways
    * @returns (String) - title for the definition
    */
    get title() {
        return this.dictKeysExists(this.doc, 'title') ? this.doc.title : null;
    }
    /**
    * Sets the title for the API from the RAML document
    * @param (String) value - the value to use for the title of the definition
    */
    set title(value) {
        this.doc.title = value;
    }
    /**
    * Retrieves the description for the API from the RAML document
    * @returns (String) - description for the definition
    */
    get description() {
        return this.dictKeysExists(this.doc, 'description') ? this.doc.description : null;
    }
    /**
    * Sets the description for the API from the RAML document
    * @param (String) value - the value to use for the description of the definition
    */
    set description(value) {
        this.doc.description = value;
    }
    /**
    * Retrieves the version for the API from the RAML document
    * @returns (String) - version for the definition
    */
    get version() {
        return this.dictKeysExists(this.doc, 'version') ? this.doc.version : null;
    }
    /**
    * Sets the version for the API from the RAML document
    * @param (String) value - the value to use for the version of the definition
    */
    set version(value) {
        this.doc.version = value;
    }
    /**
    * Retrieves the terms of service for the API from the RAML document
    * @returns (String) - terms of service
    */
    get termsOfService() {
        return this._termsOfService;
    }
    /**
    * Sets the terms of service for the API from the RAML document
    * @param (String) value - the value to use for the termsOfService of the definition
    */
    set termsOfService(value) {
        this._termsOfService = value;
    }
    /**
    * Retrieves the contact object
    * @returns (Object) - the object with the contact information
    */
    get contact() {
        return this._contact || {};
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
        this._contact = newValue;
    }
    /**
    * Retrieves the license object
    * @returns (Object) - Object with the license information
    */
    get license() {
        return this._license || {};
    }
    /**
    * Sets the license object
    * @param (Object) value - object containing license information
    */
    set license(value) {
        //
        // We want to make sure what is passed in is valid params,
        // so we check and only save those that are valid
        // Note: 'name' is required if license object exists, so 
        //       prepopulate in case it wasn't passed in
        //
        let newValue = {name: ''};
        for (let I of Object.keys(value)) {
            if (['name', 'url'].includes(I)) {
                newValue[I] = value[I];
            } else if (I.startsWith('x-')) {
                newValue[I] = value[I];
            }
        }
        this._license = newValue;
    }
    /**
    * Retrieves the servers array
    * @returns (Array) - returns array containing server information
    */
    get servers() {
        return this._servers || [];
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
            // url is required in servers, so pre populate in case wasn't passed in
            let newValue = {url: ''};
            for (let I of Object.keys(O)) {
                if (['variables', 'url', 'description'].includes(I)) {
                    newValue[I] = O[I];
                } else if (I.startsWith('x-')) {
                    newValue[I] = O[I];
                }
            }
            ret.push(newValue);
        }
        this._servers = ret;
    }
    /**
    * Appends a server
    * @param (Object) value - an object with the server info
    */
    appendServer(value) {
        this._servers.push(value);
    }
    /**
    * Retrieves the baseUri
    * @returns (String) - returns baseUri
    */
    get baseUri() {
        return this.doc.baseUri || '';
    }
    /**
    * Sets the baseUri value
    * @param (String) value - the value of the baseUri
    */
    set baseUri(value) {
        this.doc.baseUri = value;
    }
    /**
    * Retrieves the protocols array
    * @returns (Array) - returns protocols array
    */
    get protocols() {
        return this.doc.protocols || [];
    }
    /**
    * Sets the protocols value
    * @param (Array) value - the value of the protocols array
    */
    set protocols(value) {
        this.doc.protocols = value;
    }
    /**
    * Appends value to the protocols array
    * @param (String) value - the value of the protocol
    */
    appendProtocol(value) {
        let old = [...this.doc.protocols];
        old.push(value);
        this.doc.protocols = old;
    }
    /**
    * Sets the protocols value
    * @param (Array) value - the value of the protocols array
    */
    set protocols(value) {
        this.doc.protocols = value;
    }
    /**
    * Retrieves the paths object
    * @returns (Array) - returns object containing all of the path information
    */
    get paths() {
        
        for (const P of Object.keys(this.doc)) {
            if (P.trim().startsWith('/')) {
                this._paths[P] = this.doc[P];
            }
        }
        return this._paths;
    }
    /**
    * sets the paths object in it's native form
    * @param (Object) - the paths object
    */
    set paths(value) {
        this._paths = value;
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
        this.doc[path] = value;
    }
    //
    // pathsExtension doesn't really make sense, since there is not a paths
    // object in raml
    //
   /**
    * Retrieves the extensions at paths object of the doc
    * @returns (Object) - returns in the form of {key1: value1, key2: value2 ... }
    */
    get pathsExtensions() {
        return this._pathAnnotations;
    }
    /**
    * Sets (replaces) the extensions at the paths object of the doc
    * @param (Object) values - object of key/value pairs of extensions to add {key1: value1, key2: value2 ... }
    */
    set pathsExtensions(values) {

        let obj = {};
        for (const [key, value] of Object.entries(values)) {
            let newKey = `(${key.replace("(", "",).replace(")","")})`;
            obj[newKey] = value;
        }
        this._pathAnnotations = values;
    }
    /**
    * Appends am extensions at the root of the doc
    * @param (string) name - name of the extension
    * @param (string) value - value of the extension
    */
    appendPathsExtension(name, value) {
        //
        // extensions are in (). We are silent if it fails
        // here.
        //
        let newName = `(${name.replace("(", "",).replace(")","")})`;
        this._pathAnnotations[newName] = value;
    }
    /**
    * Gets all the paths, sorted by alpha and length
    * @returns (Array) - array of all of the paths (resources)
    */
    getPathNames() {
        const sf = function(a,b) {return a.localeCompare(b, 'en', {'sensitivity': 'base'});}
        const paths = Object.keys(this.doc).sort(sf);
        return paths.length > 0 ? paths.filter(x => x.trim().startsWith('/')) : [];
    }
    /**
    * Retrieves the paths object
    * @returns (String) - returns object containing the path information
    */
    getPath(path) {
        return this.dictKeysExists(this.doc, 'paths', path) ? this.doc.paths[path] : {};
    }
    /**
    * Retrieves the components object
    * @returns (Object) - returns object containing all of the components information
    */
    get components() {
        return this.dictKeysExists(this.doc, 'components') ? this.doc.components : {};
    }
    /**
    * sets the components object in it's native form
    * @param (Object) - the components object
    */
    set components(value) {
        this.doc.components = value;
    }
    /**
    * Retrieves the components schemas object
    * @returns (Object) - returns object containing all of the components information
    */
    get componentsSchemas() {
        return this.dictKeysExists(this.doc, 'components') ? this.doc.components : {};
    }
    /**
    * Retrieves the security object
    * @returns (Object) - returns object containing all of the security information
    */
    get security() {
        return this.dictKeysExists(this.doc, 'security') ? this.doc.security : {};
    }
    /**
    * sets the security object in it's native form
    * @param (Object) - the security object
    */
    set security(value) {
        this.doc.security = value;
    }
    /**
    * Retrieves the tags object
    * @returns (Object) - returns object containing all of the tags information
    */
    get tags() {
        return this._tags;
    }
    /**
    * sets the tags object in it's native form
    * @param (Object) - the tags object
    */
    set tags(value) {
        this._tags = value;
    }
    /**
    * Retrieves the externalDocs object
    * @returns (Object) - returns object containing all of the externalDocs information
    */
    get externalDocs() {
        return this.dictKeysExists(this.doc, 'externalDocs') ? this.doc.externalDocs : {};
    }
    /**
    * sets the externalDocs object in it's native form
    * @param (Object) - the externalDocs object
    */
    set externalDocs(value) {
        //
        // We want to make sure what is passed in is valid params,
        // so we check and only save those that are valid
        // Note: 'url' is required if license object exists, so 
        //       prepopulate in case it wasn't passed in
        //
        let newValue = {url: ''};
        for (let I of Object.keys(value)) {
            if (['url', 'description'].includes(I)) {
                newValue[I] = value[I];
            } else if (I.startsWith('x-')) {
                newValue[I] = value[I];
            }
        }
        this.doc.externalDocs = newValue;
    }
    /**
    * Gets all the possible unique set of HTTP methods from all of the operations
    * @returns (Array) - array of unique HTTP methods (verbs) across all operations
    */
    getAllHttpMethods() {
        let methods = new Set();

        for (let P of Object.keys(this.paths)) {
            Object.keys(this.paths[P]).forEach(item => methods.add(item));
        }
        let unique = Array.from(methods);
        return  unique.length > 0 ? unique : [];
    }
    /**
    * Gets all the possible HTTP status codes for an operation
    * @param {string} path - the resource path for this operation
    * @param {string} verb - HTTP verb for this operation
    * @returns (Object) - Object with code, description and media for each status code
    */
    getStatusCodes(path, verb) {
        let doc = this.doc;
        let ret = [];
        let d,m;

        // if (dictKeysExists(doc, path, verb, responses) doc[path] && doc[path][verb] && doc[path][verb].responses) {
        if (this.dictKeysExists(doc, path, verb, 'responses')) {
            for (let R of Object.keys(doc[path][verb].responses).filter(x => x != 'default').sort()) {
                d = doc[path][verb].responses[R].description || '';
                m = doc[path][verb].responses[R].body ? Object.keys(doc[path][verb].responses[R].body) : [];
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

        if (this.operationExists(path, verb) && this.doc[path][v].displayName) {
            return this.doc[path][v].displayName;
        }

        let str = path.replace('/', '').split('/').pop().replace(/{([^}]*)}/g, '$1');
        
        return v + str.charAt(0).toUpperCase() + str.substr(1);
    }
    /**
    * util function to set the operationId if exists
    * @param {string} path - the path segment of the resource
    * @param {string} verb - the HTTP verb for this operation
    * @param {string} value - the name/id for the operation
    * @returns (String) - name of the operation ID associated with this operation
    */
    setOperationId(path, verb, value) {

        let ret = '';
        let v = verb.toLowerCase();
        if (this.operationExists(path, verb)) {
            this.doc[path][v].displayName = value;
            ret = this.doc[path][v].displayName;
        }
        
        return ret;
    }
    /**
    * alias for getOperationId
    * @param {string} path - the path segment of the resource
    * @param {string} verb - the HTTP verb for this operation
    * @returns (String) - name of the operation ID associated with this operation
    */
    getDisplayName(path, verb) {
        
        return this.getOperationId(path, verb);
    }
    /**
    * alias for setOperationId
    * @param {string} path - the path segment of the resource
    * @param {string} verb - the HTTP verb for this operation
    * @param {string} value - the name/id for the operation
    * @returns (String) - name of the operation ID associated with this operation
    */
    setDisplayName(path, verb, value) {

        return this.setOperationId(path, verb, value);
    }
    /**
    * util to check if an operation (verb + path) exists in the definition
    * @param {string} path - the path segment of the resource
    * @param {string} verb - the HTTP verb for this operation
    */
    operationExists(path, verb) {
        let v = verb.toLowerCase();

        return (this.doc[path] && this.doc[path][v]) ? true : false;
    }
    /**
    * util to check if an path exists in the definition
    * @param {string} path - the path segment of the resource
    */
    pathExists(path) {
        return this.doc[path] ? true : false;
    }
    /**
    * gets the media types for an operation request
    * @param {string} path - the path segment of the resource
    * @param {string} verb - HTTP verb of the operation
    */
    getOperationRequestMedia(path, verb) {
        let ret = [];
        if (! this.operationExists(path, verb)) return [];
        
        if (this.dictKeysExists(this.doc[path][verb],'body')) {
            ret = Object.keys(this.doc[path][verb]['body']);
        }

        return ret;
    }
    /**
    * gets the description for an operation
    * @param {string} path - the path segment of the resource
    * @param {string} verb - HTTP verb of the operation
    */
    getOperationDescription(path, verb) {
        if (! this.operationExists(path, verb)) return '';
        return this.doc[path][verb]['description'] || '';
    }
    /**
    * gets base URL for the API. Will get first one if there are multiple servers specified
    * TODO (bschwarz) - this doesn't make sense for RAML
    */
    getBasePath() {
        return this.doc.servers ? this.doc.servers[0] : {};
    }
}
/** Class representing a header component */
class Header extends Core {
    static members = [];
    static getHeaders() {
        let obj = {};
        for (let H of Header.members) {
            obj[H.name] = H.getHeader();
        }
        return obj;
    }
    static deleteHeader(header) {
        let idx = Header.members.indexOf(header);
        if (idx > -1) {
            Header.members.splice(idx, 1);
            header = null;
        }
    }
    /**
    * Creates a Header object
    * @param {string} name - name of the header
    */
    constructor(name) {
        super();
        this.name = name;
        this.doc = {};
        this._required = false;
        this._deprecated = false;
        Header.members.push(this);
    }
    /**
    * gets the description for a component header
    */
    get description() {
        return this.doc.description || '';
    }
    /**
    * sets the description for a component header
    * @param {string} name - description of the header
    */
    set description(description) {
        return this.doc.description = description;
    }
    /**
    * gets the description for a component header
    */
    get required() {
        return this._required || false;
    }
    /**
    * sets the description for a component header
    * @param {string} flag - boolean if required or not
    */
    set required(flag) {
        if (typeof flag != "boolean"){
            throw new TypeError("value must be a boolean");
        }
        return this._required = flag;
    }
    /**
    * gets the deprecated header value
    */
    get deprecated() {
        return this._deprecated || false;
    }
    /**
    * sets the deprecated flag for a component header
    * @param {string} flag - boolean if deprecated or not
    */
    set deprecated(flag) {
        if (typeof flag != "boolean"){
            throw new TypeError("value must be a boolean");
        }
        return this._deprecated = flag;
    }
    /**
    * Retrieves the extensions for the Header
    * @returns (Object) - returns in the form of {key1: value1, key2: value2 ... }
    */
    get extensions() {
        return this.getExtensions();
    }
    /**
    * Sets (replaces) the extensions for a Header
    * @param (Object) values - object of key/value pairs of extensions to add {key1: value1, key2: value2 ... }
    */
    set extensions(values) {
        this.setExtensions(values);
    }
    /**
    * Retrieves datatype of the header
    * @returns (string) - returns in the form of {key1: value1, key2: value2 ... }
    */
    get type() {
        return this.doc.type || '';
    }
    /**
    * Sets (replaces) the datatype for a Header
    * @param (string) datatype - datatype of header
    */
    set type(datatype) {
        this.doc.type = datatype;
    }
    /**
    * Retrieves example for the header
    * @returns (string) - returns the example for the header
    */
    get example() {
        return this.doc.example || '';
    }
    /**
    * Sets (replaces) the example for a Header
    * @param (string) example - example of header
    */
    set example(example) {
        this.doc.example = example;
    }
    /**
    * Appends am extensions Header
    * @param (string) name - name of the extension
    * @param (string) value - value of the extension
    */
    appendRootExtension(name, value) {

        let newName = `(${name.replace("(", "",).replace(")","")})`;
        this.doc[newName] = value;
    }
    /**
    * gets the header object
    */
    getHeader() {
        let obj = {};
        obj[this.name] = this.doc;
        return obj;
    }
}
/** Class representing a header component */
//
// name and in are required parameters for this object
//
class Parameter extends Core {
    static members = [];
    static getParameters() {
        let obj = {};
        for (let H of Parameter.members) {
            obj[H.name] = H.getParameter();
        }
        return obj;
    }
    static deleteParameter(param) {
        let idx = Parameter.members.indexOf(param);
        if (idx > -1) {
            Parameter.members.splice(idx, 1);
            param = null;
        }
    }
    /**
    * Creates a Parameter object
    * @param {string} name - name of the parameter
    */
    constructor(name) {
        super();
        this.objname = name;
        this.doc = {};
        Parameter.members.push(this);
    }
    /**
    * gets the name of the parameter
    */
    get name() {
        return this.doc.name || '';
    }
    /**
    * sets the name for a component parameter
    * @param {string} name - name of the parameter
    */
    set name(name) {
        return this.doc.name = name;
    }
    /**
    * gets the in of the parameter
    */
    get in() {
        return this.doc.in || '';
    }
    /**
    * sets the name for a component parameter
    * @param {string} name - name of the parameter
    */
    set in(location) {
        return this.doc.in = location;
    }
    /**
    * gets the description for a component parameter
    * @param {string} name - name of the component header
    */
    get description() {
        return this.doc.description || '';
    }
    /**
    * sets the description for a component parameter
    * @param {string} name - description of the header
    */
    set description(description) {
        return this.doc.description = description;
    }
    /**
    * gets the required for a component parameter
    */
    get required() {
        return this.doc.required || false;
    }
    /**
    * sets the required for a component parameter
    * @param {string} name - required of the parameter
    */
    set required(flag) {
        if (typeof flag != "boolean"){
            throw new TypeError("value must be a boolean");
        }
        return this.doc.required = flag;
    }
    /**
    * gets the allowEmptyValue for a component parameter
    */
    get allowEmptyValue() {
        return this.doc.allowEmptyValue || '';
    }
    /**
    * sets the allowEmptyValue for a component parameter
    * @param {string} name - required of the parameter
    */
    set allowEmptyValue(flag) {
        if (typeof flag != "boolean"){
            throw new TypeError("value must be a boolean");
        }
        return this.doc.allowEmptyValue = flag;
    }
    /**
    * Retrieves the extensions for the parameter
    * @returns (Object) - returns in the form of {key1: value1, key2: value2 ... }
    */
    get extensions() {
        return this.getExtensions();
    }
    /**
    * Sets (replaces) the extensions for a parameter
    * @param (Object) values - object of key/value pairs of extensions to add {key1: value1, key2: value2 ... }
    */
    set extensions(values) {
        this.setExtensions(values);
    }
    /**
    * Appends am extensions parameter
    * @param (string) name - name of the extension
    * @param (string) value - value of the extension
    */
    appendRootExtension(name, value) {
        let newName = `(${name.replace("(", "",).replace(")","")})`;
        this.doc[newName] = value;
    }
    /**
    * gets the parameter object
    */
    getParameter() {
        let obj = {};
        obj[this.objname] = this.doc;
        return obj;
    }
}

module.exports = {
    Raml,
    Header,
    Parameter
};