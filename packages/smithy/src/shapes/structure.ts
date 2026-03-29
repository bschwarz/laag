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
export class StructureShape extends BaseShape {
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
  ) {
    super('structure', traits);
    this.members = members;
    this.mixins = mixins;
  }

  /**
   * Get a member by name
   * @param memberName - The member name
   * @returns The member shape, or undefined if not found
   */
  getMember(memberName: string): MemberShape | undefined {
    return this.members?.[memberName];
  }

  /**
   * Check if a member exists
   * @param memberName - The member name to check
   * @returns True if the member exists
   */
  hasMember(memberName: string): boolean {
    return this.members !== undefined && memberName in this.members;
  }

  /**
   * Add or update a member
   * @param memberName - The member name
   * @param member - The member shape
   */
  setMember(memberName: string, member: MemberShape): void {
    this.members ??= {};
    this.members[memberName] = member;
  }

  /**
   * Remove a member
   * @param memberName - The member name to remove
   * @returns True if the member was removed, false if it didn't exist
   */
  removeMember(memberName: string): boolean {
    if (!this.members || !(memberName in this.members)) {
      return false;
    }
    delete this.members[memberName];
    return true;
  }

  /**
   * Get all member names
   * @returns Array of member names
   */
  getMemberNames(): string[] {
    return this.members ? Object.keys(this.members) : [];
  }

  /**
   * Get all members
   * @returns Record of all members
   */
  getMembers(): Record<string, MemberShape> {
    return this.members ? { ...this.members } : {};
  }

  /**
   * Add a mixin
   * @param mixinId - The mixin shape ID
   */
  addMixin(mixinId: ShapeId): void {
    this.mixins ??= [];
    if (!this.mixins.includes(mixinId)) {
      this.mixins.push(mixinId);
    }
  }

  /**
   * Remove a mixin
   * @param mixinId - The mixin shape ID to remove
   * @returns True if the mixin was removed, false if it didn't exist
   */
  removeMixin(mixinId: ShapeId): boolean {
    if (!this.mixins) {
      return false;
    }
    const index = this.mixins.indexOf(mixinId);
    if (index === -1) {
      return false;
    }
    this.mixins.splice(index, 1);
    return true;
  }

  /**
   * Get all mixins
   * @returns Array of mixin shape IDs
   */
  getMixins(): ShapeId[] {
    return this.mixins ? [...this.mixins] : [];
  }

  /**
   * Convert the shape to a plain object
   * @returns Plain object representation
   */
  override toObject(): IStructureShape {
    const obj: IStructureShape = {
      type: 'structure',
    };
    if (this.members && Object.keys(this.members).length > 0) {
      obj.members = { ...this.members };
    }
    if (this.mixins && this.mixins.length > 0) {
      obj.mixins = [...this.mixins];
    }
    if (this.traits && Object.keys(this.traits).length > 0) {
      obj.traits = { ...this.traits };
    }
    return obj;
  }
}
