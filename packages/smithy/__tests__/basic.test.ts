import { describe, expect, test } from 'bun:test';
import { version } from '../src/index';

describe('@laag/smithy', () => {
  test('should export version', () => {
    expect(version).toBeDefined();
    expect(typeof version).toBe('string');
  });
});
