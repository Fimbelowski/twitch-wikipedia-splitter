import ChunkingBehavior from '@/types/ChunkingBehavior';
import getChunkByChunkSize from './getChunkByChunkSize';
import getChunkByRegExpMatch from './getChunkByRegExpMatch';

const wordBoundaryRegexp = /(?<=\b) /g;
const softSentenceBoundaryRegExp = /(?<=[,;-] )/g;
const hardSentenceBoundaryRegExp = /(?<=[.?!] )/g;

const regExpOptions = [
  hardSentenceBoundaryRegExp,
  softSentenceBoundaryRegExp,
  wordBoundaryRegexp,
];

const chunkingBehaviorsUsingRegExp = [
  ChunkingBehavior.hardSentenceBoundary,
  ChunkingBehavior.softSentenceBoundary,
  ChunkingBehavior.wordBoundary,
];

export default function chunkText(
  input: string,
  maxChunkSize: number,
  chunkingBehavior: ChunkingBehavior,
  balkingDistance: number,
) {
  if (input === '') {
    return [input];
  }

  let remainingInput = input.trim();
  const chunks: string[] = [];

  while (remainingInput.length > 0) {
    if (remainingInput.length <= maxChunkSize) {
      chunks.push(remainingInput.trim());
      break;
    }

    let nextChunk: string;

    if (chunkingBehavior === ChunkingBehavior.none) {
      nextChunk = remainingInput;
    } else if (chunkingBehavior === ChunkingBehavior.chunkSize) {
      nextChunk = getChunkByChunkSize(remainingInput, maxChunkSize);
    } else {
      const chunkingBehaviorIndex = chunkingBehaviorsUsingRegExp.indexOf(chunkingBehavior);

      nextChunk = getChunkByRegExpMatch(
        remainingInput,
        maxChunkSize,
        balkingDistance,
        regExpOptions[chunkingBehaviorIndex],
        regExpOptions.slice(chunkingBehaviorIndex),
      );
    }

    chunks.push(nextChunk);

    remainingInput = remainingInput
      .slice(nextChunk.length)
      .trim();
  }

  return chunks;
}
