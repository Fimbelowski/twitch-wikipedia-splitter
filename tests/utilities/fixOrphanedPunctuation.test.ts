import {
  describe,
  expect,
  it,
} from 'vitest';

import fixOrphanedPunctuation from '@/utilities/fixOrphanedPunctuation';

describe('fixOrphanedPunctuation.ts', () => {
  it('should replace a period preceded by a space with a period', () => {
    expect(fixOrphanedPunctuation('foo . bar')).toBe('foo. bar');
  });

  it('should replace a question mark preceded by a space with a period', () => {
    expect(fixOrphanedPunctuation('foo ? bar')).toBe('foo? bar');
  });

  it('should replace a exclamation point preceded by a space with a period', () => {
    expect(fixOrphanedPunctuation('foo ! bar')).toBe('foo! bar');
  });

  it('should replace a comma preceded by a space with a comma', () => {
    expect(fixOrphanedPunctuation('foo , bar')).toBe('foo, bar');
  });

  it('should replace a semicolon preceded by a space with a comma', () => {
    expect(fixOrphanedPunctuation('foo ; bar')).toBe('foo; bar');
  });

  it('should replace a hyphen preceded by a space with a comma', () => {
    expect(fixOrphanedPunctuation('foo - bar')).toBe('foo- bar');
  });
});
