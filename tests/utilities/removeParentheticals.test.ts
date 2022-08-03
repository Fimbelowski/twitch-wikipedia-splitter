import { describe, expect, it } from 'vitest';
import { removeParentheticals } from '../../src/utilities/removeParentheticals';

describe('removeParentheticals.ts', () => {
  it('returns an empty string when an empty string is passed in', () => {
    expect(removeParentheticals('')).toBe('');
  });

  it('returns a string as-is when no parentheses are present', () => {
    expect(removeParentheticals('Apple')).toBe('Apple');
  });

  it('removes parentheses and all text between them', () => {
    expect(removeParentheticals('foo(bar)')).toBe('foo');
    expect(removeParentheticals('foo(bar(baz))')).toBe('foo');
  });

  it('returns a string as-is when a parenthesis has no termination', () => {
    expect(removeParentheticals('foo(bar')).toBe('foo(bar');
    expect(removeParentheticals('foobar)')).toBe('foobar)');
  });
});