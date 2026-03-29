/**
 * Base trait class for Smithy traits
 * @module traits/base-trait
 */
/**
 * Base class for all Smithy traits
 * Provides common functionality for trait implementations
 */
export class BaseTrait {
    /**
     * Create a new trait
     * @param id - The trait ID
     * @param value - The trait value
     */
    constructor(id, value) {
        this.id = id;
        this.value = value;
    }
    /**
     * Get the trait as a plain object
     * @returns Object representation of the trait
     */
    toObject() {
        return {
            id: this.id,
            value: this.value,
        };
    }
    /**
     * Get the trait value
     * @returns The trait value
     */
    getValue() {
        return this.value;
    }
    /**
     * Get the trait ID
     * @returns The trait ID
     */
    getId() {
        return this.id;
    }
    /**
     * Convert trait to JSON
     * @returns JSON representation
     */
    toJSON() {
        return this.value;
    }
    /**
     * Convert trait to string
     * @returns String representation
     */
    toString() {
        return `${this.id}: ${JSON.stringify(this.value)}`;
    }
}
/**
 * Marker trait - a trait with no value (empty object)
 */
export class MarkerTrait extends BaseTrait {
    constructor(id) {
        super(id, {});
    }
    /**
     * Marker traits always return an empty object
     */
    toJSON() {
        return {};
    }
}
/**
 * String trait - a trait with a string value
 */
export class StringTrait extends BaseTrait {
    constructor(id, value) {
        super(id, value);
        this.value = value;
    }
    getValue() {
        return this.value;
    }
    toJSON() {
        return this.value;
    }
}
/**
 * Number trait - a trait with a numeric value
 */
export class NumberTrait extends BaseTrait {
    constructor(id, value) {
        super(id, value);
        this.value = value;
    }
    getValue() {
        return this.value;
    }
    toJSON() {
        return this.value;
    }
}
/**
 * Object trait - a trait with an object value
 */
export class ObjectTrait extends BaseTrait {
    constructor(id, value) {
        super(id, value);
        this.value = value;
    }
    getValue() {
        return this.value;
    }
    toJSON() {
        return this.value;
    }
}
/**
 * Array trait - a trait with an array value
 */
export class ArrayTrait extends BaseTrait {
    constructor(id, value) {
        super(id, value);
        this.value = value;
    }
    getValue() {
        return this.value;
    }
    toJSON() {
        return this.value;
    }
}
/**
 * Shape reference trait - a trait that references another shape
 */
export class ShapeReferenceTrait extends BaseTrait {
    constructor(id, value) {
        super(id, value);
        this.value = value;
    }
    getValue() {
        return this.value;
    }
    getShapeId() {
        return this.value;
    }
    toJSON() {
        return this.value;
    }
}
//# sourceMappingURL=base-trait.js.map