import {
  describe,
  expect,
  it,
} from 'vitest';

import removeCitations from '@/utilities/removeCitations';

describe('removeCitations.ts', () => {
  it('should remove matching square brackets and everything between them', () => {
    expect(removeCitations('foo[1]')).toBe('foo');
  });

  it('should remove multiple sets of matching square brackets and everything between them', () => {
    expect(removeCitations('foo[1] bar[2]')).toBe('foo bar');
  });

  it('should not remove non-matching square brackets', () => {
    expect(removeCitations('foo]1[')).toBe('foo]1[');
  });
});
