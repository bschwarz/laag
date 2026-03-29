/**
 * ShapeManager - Manages shape storage, retrieval, and queries
 * @module shapes/shape-manager
 */
import { ShapeGuards } from '../types';
/**
 * Manages shapes in a Smithy model
 * Provides methods for storing, retrieving, and querying shapes
 */
export class ShapeManager {
    /**
     * Create a new ShapeManager
     * @param shapes - Initial shapes as a record
     */
    constructor(shapes = {}) {
        this.shapes = new Map(Object.entries(shapes));
    }
    /**
     * Get a shape by its ID
     * @param shapeId - The shape ID to retrieve
     * @returns The shape, or undefined if not found
     */
    get(shapeId) {
        return this.shapes.get(shapeId);
    }
    /**
     * Get all shapes
     * @returns Map of all shapes keyed by shape ID
     */
    getAll() {
        return new Map(this.shapes);
    }
    /**
     * Get all shapes of a specific type
     * @param type - The shape type to filter by
     * @returns Array of shapes matching the type
     */
    getByType(type) {
        const result = [];
        for (const shape of this.shapes.values()) {
            if (shape.type === type) {
                result.push(shape);
            }
        }
        return result;
    }
    /**
     * Add a shape to the manager
     * @param shapeId - The shape ID
     * @param shape - The shape to add
     */
    add(shapeId, shape) {
        this.shapes.set(shapeId, shape);
    }
    /**
     * Remove a shape from the manager
     * @param shapeId - The shape ID to remove
     * @returns True if the shape was removed, false if it didn't exist
     */
    remove(shapeId) {
        return this.shapes.delete(shapeId);
    }
    /**
     * Check if a shape exists
     * @param shapeId - The shape ID to check
     * @returns True if the shape exists
     */
    has(shapeId) {
        return this.shapes.has(shapeId);
    }
    /**
     * Resolve a target shape ID to its shape
     * Follows member references to get the actual shape
     * @param shapeId - The shape ID to resolve
     * @returns The resolved shape, or undefined if not found
     */
    resolveTarget(shapeId) {
        return this.get(shapeId);
    }
    /**
     * Get members of a structure or union shape
     * @param shapeId - The structure or union shape ID
     * @returns Map of member names to member shapes, or undefined if not a structure/union
     */
    getMembers(shapeId) {
        const shape = this.get(shapeId);
        if (!shape) {
            return undefined;
        }
        if (ShapeGuards.isStructure(shape) || ShapeGuards.isUnion(shape)) {
            const members = shape.members;
            if (!members) {
                return new Map();
            }
            return new Map(Object.entries(members));
        }
        return undefined;
    }
    /**
     * Find all shapes that have a specific trait
     * @param traitId - The trait ID to search for
     * @returns Array of shapes that have the trait
     */
    findShapesByTrait(traitId) {
        const result = [];
        for (const shape of this.shapes.values()) {
            if (shape.traits && traitId in shape.traits) {
                result.push(shape);
            }
        }
        return result;
    }
    /**
     * Get the shape hierarchy for a shape
     * Returns an array of shape IDs representing the inheritance chain
     * For structures with mixins, returns the mixin chain
     * @param shapeId - The shape ID to get hierarchy for
     * @returns Array of shape IDs in the hierarchy (from base to derived)
     */
    getShapeHierarchy(shapeId) {
        const hierarchy = [shapeId];
        const shape = this.get(shapeId);
        if (!shape) {
            return hierarchy;
        }
        // For structures, follow mixins
        if (ShapeGuards.isStructure(shape)) {
            const mixins = shape.mixins;
            if (mixins && mixins.length > 0) {
                // Recursively get hierarchy for each mixin
                for (const mixin of mixins) {
                    const mixinHierarchy = this.getShapeHierarchy(mixin);
                    // Add mixin hierarchy before current shape (base classes first)
                    hierarchy.unshift(...mixinHierarchy);
                }
            }
        }
        return hierarchy;
    }
    /**
     * Get all shape IDs
     * @returns Array of all shape IDs
     */
    getShapeIds() {
        return Array.from(this.shapes.keys());
    }
    /**
     * Get the count of shapes
     * @returns Number of shapes in the manager
     */
    size() {
        return this.shapes.size;
    }
    /**
     * Clear all shapes
     */
    clear() {
        this.shapes.clear();
    }
    /**
     * Convert shapes to a plain object
     * @returns Record of shapes keyed by shape ID
     */
    toObject() {
        const result = {};
        for (const [id, shape] of this.shapes.entries()) {
            result[id] = shape;
        }
        return result;
    }
}
//# sourceMappingURL=shape-manager.js.map