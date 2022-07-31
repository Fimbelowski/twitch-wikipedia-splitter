import { removeLineTerminators } from '../../src/utilities/removeLineTerminators';
import { describe, expect, it } from 'vitest';

describe('removeLineTerminators.ts', () => {
  it('should replace newlines with whitespace', () => {
    expect(removeLineTerminators('foo\nbar\nbaz')).toBe('foo bar baz');
  });

  it('should replace carriage returns with whitespace', () => {
    expect(removeLineTerminators('foo\rbar\rbaz')).toBe('foo bar baz');
  });

  it('should replace newlines and carriage returns with whitespace', () => {
    expect(removeLineTerminators('foo\nbar\rbaz')).toBe('foo bar baz');
  });
});