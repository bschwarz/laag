/**
 * Type definitions for AWS Smithy models
 * @module types
 */
/**
 * Standard Smithy trait names
 */
export const SMITHY_TRAITS = {
    HTTP: 'smithy.api#http',
    HTTP_ERROR: 'smithy.api#httpError',
    HTTP_LABEL: 'smithy.api#httpLabel',
    HTTP_QUERY: 'smithy.api#httpQuery',
    HTTP_HEADER: 'smithy.api#httpHeader',
    HTTP_PAYLOAD: 'smithy.api#httpPayload',
    REQUIRED: 'smithy.api#required',
    DOCUMENTATION: 'smithy.api#documentation',
    READONLY: 'smithy.api#readonly',
    IDEMPOTENT: 'smithy.api#idempotent',
    PAGINATED: 'smithy.api#paginated',
};
/**
 * Shape ID utilities
 */
// eslint-disable-next-line @typescript-eslint/no-namespace
export var ShapeIdUtils;
(function (ShapeIdUtils) {
    /**
     * Parse a shape ID into namespace and name
     */
    function parse(shapeId) {
        const parts = shapeId.split('#');
        if (parts.length === 2 && parts[1]) {
            return { namespace: parts[0], name: parts[1] };
        }
        return { name: shapeId };
    }
    ShapeIdUtils.parse = parse;
    /**
     * Create a shape ID from namespace and name
     */
    function create(namespace, name) {
        return `${namespace}#${name}`;
    }
    ShapeIdUtils.create = create;
    /**
     * Check if a shape ID is absolute (has namespace)
     */
    function isAbsolute(shapeId) {
        return shapeId.includes('#');
    }
    ShapeIdUtils.isAbsolute = isAbsolute;
    /**
     * Get the namespace from a shape ID
     */
    function getNamespace(shapeId) {
        return parse(shapeId).namespace;
    }
    ShapeIdUtils.getNamespace = getNamespace;
    /**
     * Get the name from a shape ID
     */
    function getName(shapeId) {
        return parse(shapeId).name;
    }
    ShapeIdUtils.getName = getName;
    /**
     * Compare two shape IDs for equality
     */
    function equals(a, b) {
        return a === b;
    }
    ShapeIdUtils.equals = equals;
})(ShapeIdUtils || (ShapeIdUtils = {}));
/**
 * Type guards for shape types
 */
// eslint-disable-next-line @typescript-eslint/no-namespace
export var ShapeGuards;
(function (ShapeGuards) {
    /**
     * Check if a shape is a structure
     */
    function isStructure(shape) {
        return shape.type === 'structure';
    }
    ShapeGuards.isStructure = isStructure;
    /**
     * Check if a shape is a service
     */
    function isService(shape) {
        return shape.type === 'service';
    }
    ShapeGuards.isService = isService;
    /**
     * Check if a shape is an operation
     */
    function isOperation(shape) {
        return shape.type === 'operation';
    }
    ShapeGuards.isOperation = isOperation;
    /**
     * Check if a shape is a resource
     */
    function isResource(shape) {
        return shape.type === 'resource';
    }
    ShapeGuards.isResource = isResource;
    /**
     * Check if a shape is a union
     */
    function isUnion(shape) {
        return shape.type === 'union';
    }
    ShapeGuards.isUnion = isUnion;
    /**
     * Check if a shape is a list
     */
    function isList(shape) {
        return shape.type === 'list';
    }
    ShapeGuards.isList = isList;
    /**
     * Check if a shape is a set
     */
    function isSet(shape) {
        return shape.type === 'set';
    }
    ShapeGuards.isSet = isSet;
    /**
     * Check if a shape is a map
     */
    function isMap(shape) {
        return shape.type === 'map';
    }
    ShapeGuards.isMap = isMap;
    /**
     * Check if a shape is a simple type
     */
    function isSimple(shape) {
        const simpleTypes = [
            'blob',
            'boolean',
            'string',
            'byte',
            'short',
            'integer',
            'long',
            'float',
            'double',
            'bigInteger',
            'bigDecimal',
            'timestamp',
            'document',
        ];
        return simpleTypes.includes(shape.type);
    }
    ShapeGuards.isSimple = isSimple;
    /**
     * Check if a shape is an aggregate type (has members)
     */
    function isAggregate(shape) {
        return shape.type === 'structure' || shape.type === 'union';
    }
    ShapeGuards.isAggregate = isAggregate;
    /**
     * Check if a shape is a collection type
     */
    function isCollection(shape) {
        return shape.type === 'list' || shape.type === 'set' || shape.type === 'map';
    }
    ShapeGuards.isCollection = isCollection;
})(ShapeGuards || (ShapeGuards = {}));
//# sourceMappingURL=types.js.map