import {
  describe, expect, it,
} from 'vitest';

import ChunkingBehavior from '@/types/ChunkingBehavior';
import chunkText from '@/utilities/chunkText';

const hardSentenceBoundaryRegExp = /[.?!]/;
const softSentenceBoundaryRegExp = /[,;-]/;
const wordCharacterRegExp = /\w/;

const exampleInput = 'Unit tests are typically automated tests written and run by software developers to ensure that a section of an application meets its design and behaves as intended. In procedural programming, a unit could be an entire module, but it is more commonly an individual function or procedure. In object-oriented programming, a unit is often an entire interface, such as a class, or an individual method. By writing tests first for the smallest testable units, then the compound behaviors between those, one can build up comprehensive tests for complex applications.';

describe('chunkTest.ts', () => {
  it('returns an array containing only an empty string when an empty string is passed in as input', () => {
    expect(chunkText('', 1, ChunkingBehavior.sentenceBoundary, 1)).toStrictEqual(['']);
  });

  it('returns an array of strings whose lengths are less than or equal to "maxChunkSize." when "chunkingBehavior" is "Chunk Size"', () => {
    const maxChunkSize = 100;

    const chunks = chunkText(
      exampleInput,
      maxChunkSize,
      ChunkingBehavior.chunkSize,
      Infinity,
    );

    expect(chunks.every((chunk) => chunk.length <= maxChunkSize)).toBe(true);
  });

  it('returns an array of strings that all end on a hard sentence boundary when "chunkingBehavior" is "Sentence Boundary" and "balkingDistance" is high', () => {
    let chunks = chunkText(
      exampleInput,
      200,
      ChunkingBehavior.sentenceBoundary,
      Infinity,
    );

    // When testing to see that a chunk ends on a specific type of character the last character of
    // the last chunk cannot be guaranteed, so we test all chunks except the last.
    chunks = chunks.slice(0, -1);

    expect(
      chunks.every((chunk) => hardSentenceBoundaryRegExp.test(chunk.slice(-1))),
    ).toBe(true);
  });

  it('returns an array of strings that all end on either a hard or soft sentence boundary when "chunkingBehavior" is "Sentence Boundary" and "balkingDistance" is low', () => {
    let chunks = chunkText(
      exampleInput,
      200,
      ChunkingBehavior.sentenceBoundary,
      25,
    );

    chunks = chunks.slice(0, -1);

    expect(
      chunks.every((chunk) => {
        const lastCharacter = chunk.slice(-1);

        return hardSentenceBoundaryRegExp.test(lastCharacter)
          || softSentenceBoundaryRegExp.test(lastCharacter);
      }),
    );
  });

  it('returns an array of strings that can end on any character when "chunkingBehavior" is "Sentence Boundary" and "balkingDistance" is extremely low', () => {
    const chunks = chunkText(
      exampleInput,
      100,
      ChunkingBehavior.sentenceBoundary,
      1,
    );

    expect(
      chunks.every((chunk) => {
        const lastCharacter = chunk.slice(-1);

        return hardSentenceBoundaryRegExp.test(lastCharacter)
          || softSentenceBoundaryRegExp.test(lastCharacter);
      }),
    ).toBe(false);
  });

  it('returns an array of strings that all end on either a word character or a sentence boundary when "chunkingBehavior" is "Word Boundary" and "balkingDistance" is high', () => {
    const chunks = chunkText(
      exampleInput,
      50,
      ChunkingBehavior.wordBoundary,
      Infinity,
    );

    expect(
      chunks.every((chunk) => {
        const indexOfNextCharacter = exampleInput.indexOf(chunk) + chunk.length;

        if (indexOfNextCharacter > exampleInput.length - 1) {
          return true;
        }

        const nextCharacter = exampleInput.charAt(indexOfNextCharacter);

        return !wordCharacterRegExp.test(nextCharacter);
      }),
    ).toBe(true);
  });

  it('returns an array of strings that can end on any character when "chunkingBehavior" is "Word Boundary" and "balkingDistance" is extremely low', () => {
    const chunks = chunkText(
      exampleInput,
      50,
      ChunkingBehavior.wordBoundary,
      1,
    );

    expect(
      chunks.every((chunk) => {
        const indexOfNextCharacter = exampleInput.indexOf(chunk) + chunk.length;

        if (indexOfNextCharacter > exampleInput.length - 1) {
          return true;
        }

        const nextCharacter = exampleInput.charAt(indexOfNextCharacter);

        return !wordCharacterRegExp.test(nextCharacter);
      }),
    ).toBe(false);
  });
});
