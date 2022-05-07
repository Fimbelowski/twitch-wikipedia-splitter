import { describe, expect, it } from 'vitest';
import trimConsecutiveSpaces from '../../../src/helpers/trimConsecutiveSpaces';

describe('trimConsecutiveSpaces', () => {
  it('should replace consecutive spaces with a single space when two or more consecutive spaces are present', () => {
    const expectedOutput = 'foo bar';

    expect(trimConsecutiveSpaces('foo  bar')).toBe(expectedOutput);
    expect(trimConsecutiveSpaces('foo   bar')).toBe(expectedOutput);
    expect(trimConsecutiveSpaces('foo                                        bar')).toBe(expectedOutput);
  });

  it('should return output that is identical to the input when no consecutive spaces are present', () => {
    expect(trimConsecutiveSpaces('foo bar')).toBe('foo bar');
    expect(trimConsecutiveSpaces('foobar')).toBe('foobar');
  });
});