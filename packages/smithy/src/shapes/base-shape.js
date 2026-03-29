/**
 * BaseShape - Base class for all Smithy shapes
 * @module shapes/base-shape
 */
/**
 * Base class for all Smithy shapes
 * Provides common functionality for shape manipulation
 */
export class BaseShape {
    /**
     * Create a new BaseShape
     * @param type - The shape type
     * @param traits - Optional traits applied to the shape
     */
    constructor(type, traits) {
        this.type = type;
        this.traits = traits;
    }
    /**
     * Get a trait value by trait ID
     * @param traitId - The trait ID to retrieve
     * @returns The trait value, or undefined if not found
     */
    getTrait(traitId) {
        return this.traits?.[traitId];
    }
    /**
     * Check if the shape has a specific trait
     * @param traitId - The trait ID to check
     * @returns True if the trait exists
     */
    hasTrait(traitId) {
        return this.traits !== undefined && traitId in this.traits;
    }
    /**
     * Add or update a trait
     * @param traitId - The trait ID
     * @param value - The trait value
     */
    setTrait(traitId, value) {
        this.traits ?? (this.traits = {});
        this.traits[traitId] = value;
    }
    /**
     * Remove a trait
     * @param traitId - The trait ID to remove
     * @returns True if the trait was removed, false if it didn't exist
     */
    removeTrait(traitId) {
        if (!this.traits || !(traitId in this.traits)) {
            return false;
        }
        delete this.traits[traitId];
        return true;
    }
    /**
     * Get all trait IDs
     * @returns Array of trait IDs
     */
    getTraitIds() {
        return this.traits ? Object.keys(this.traits) : [];
    }
    /**
     * Get all traits
     * @returns Record of all traits
     */
    getTraits() {
        return this.traits ? { ...this.traits } : {};
    }
    /**
     * Convert the shape to a plain object
     * @returns Plain object representation
     */
    toObject() {
        const obj = {
            type: this.type,
        };
        if (this.traits && Object.keys(this.traits).length > 0) {
            obj.traits = { ...this.traits };
        }
        return obj;
    }
}
//# sourceMappingURL=base-shape.js.map