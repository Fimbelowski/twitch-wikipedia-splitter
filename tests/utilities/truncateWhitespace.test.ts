import { truncateConsecutiveSpaces } from '../../src/utilities/truncateConsecutiveSpaces';
import { describe, expect, it } from 'vitest';

describe('truncateConsecutiveSpaces.ts', () => {
  it('should replace any amount of consecutive spaces with a single space.', () => {
    expect(truncateConsecutiveSpaces('foo  bar')).toBe('foo bar');
    expect(truncateConsecutiveSpaces('foo   bar')).toBe('foo bar');
    expect(truncateConsecutiveSpaces('foo                      bar')).toBe('foo bar');
  });
});