/**
 * StructureShape - Represents a Smithy structure shape
 * @module shapes/structure
 */
import type { StructureShape as IStructureShape, MemberShape, ShapeId } from '../types';
import { BaseShape } from './base-shape';
/**
 * Represents a Smithy structure shape
 * Structures are fixed sets of named, typed members
 */
export declare class StructureShape extends BaseShape {
  members?: Record<string, MemberShape>;
  mixins?: ShapeId[];
  /**
   * Create a new StructureShape
   * @param members - Optional members of the structure
   * @param mixins - Optional mixins to apply
   * @param traits - Optional traits applied to the shape
   */
  constructor(
    members?: Record<string, MemberShape>,
    mixins?: ShapeId[],
    traits?: Record<string, unknown>
  );
  /**
   * Get a member by name
   * @param memberName - The member name
   * @returns The member shape, or undefined if not found
   */
  getMember(memberName: string): MemberShape | undefined;
  /**
   * Check if a member exists
   * @param memberName - The member name to check
   * @returns True if the member exists
   */
  hasMember(memberName: string): boolean;
  /**
   * Add or update a member
   * @param memberName - The member name
   * @param member - The member shape
   */
  setMember(memberName: string, member: MemberShape): void;
  /**
   * Remove a member
   * @param memberName - The member name to remove
   * @returns True if the member was removed, false if it didn't exist
   */
  removeMember(memberName: string): boolean;
  /**
   * Get all member names
   * @returns Array of member names
   */
  getMemberNames(): string[];
  /**
   * Get all members
   * @returns Record of all members
   */
  getMembers(): Record<string, MemberShape>;
  /**
   * Add a mixin
   * @param mixinId - The mixin shape ID
   */
  addMixin(mixinId: ShapeId): void;
  /**
   * Remove a mixin
   * @param mixinId - The mixin shape ID to remove
   * @returns True if the mixin was removed, false if it didn't exist
   */
  removeMixin(mixinId: ShapeId): boolean;
  /**
   * Get all mixins
   * @returns Array of mixin shape IDs
   */
  getMixins(): ShapeId[];
  /**
   * Convert the shape to a plain object
   * @returns Plain object representation
   */
  toObject(): IStructureShape;
}
//# sourceMappingURL=structure.d.ts.map
