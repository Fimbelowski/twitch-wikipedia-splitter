import ChunkingBehavior from '@/types/ChunkingBehavior';
import ChunkingBehaviorUsingRegExp from '@/types/ChunkingBehaviorUsingRegExp';
import getChunkByChunkSize from './getChunkByChunkSize';

type RegExpByChunkingBehavior = Record<ChunkingBehaviorUsingRegExp, RegExp>;

const regExpByChunkingBehavior: RegExpByChunkingBehavior = {
  [ChunkingBehavior.wordBoundary]: /(?<=\b) /g,
  [ChunkingBehavior.softSentenceBoundary]: /(?<=[,;-] )/g,
  [ChunkingBehavior.hardSentenceBoundary]: /(?<=[.?!] )/g,
};

const chunkingBehaviorsByRestrictiveness: ChunkingBehaviorUsingRegExp[] = [
  ChunkingBehavior.hardSentenceBoundary,
  ChunkingBehavior.softSentenceBoundary,
  ChunkingBehavior.wordBoundary,
];

export default function getChunkByRegExpMatch(
  input: string,
  maxChunkSize: number,
  balkingDistance: number,
  chunkingBehavior: ChunkingBehaviorUsingRegExp,
): string {
  const regExp = regExpByChunkingBehavior[chunkingBehavior];

  const matches = Array
    .from(input.matchAll(regExp))
    .filter((match) => match.index !== undefined && match.index + 1 < maxChunkSize);

  const lastMatch = matches.pop();

  if (
    lastMatch?.index !== undefined
    && maxChunkSize - lastMatch.index + 1 < balkingDistance
  ) {
    return input.slice(0, lastMatch.index);
  }

  const currentChunkingBehaviorIndex = chunkingBehaviorsByRestrictiveness.indexOf(chunkingBehavior);

  const nextChunkingBehavior = chunkingBehaviorsByRestrictiveness[currentChunkingBehaviorIndex + 1];

  if (nextChunkingBehavior !== undefined) {
    return getChunkByRegExpMatch(
      input,
      maxChunkSize,
      balkingDistance,
      nextChunkingBehavior,
    );
  }

  return getChunkByChunkSize(input, maxChunkSize);
}
