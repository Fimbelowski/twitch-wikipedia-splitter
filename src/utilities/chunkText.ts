import ChunkingBehavior from '@/types/ChunkingBehavior';
import getChunkByChunkSize from './getChunkByChunkSize';
import getChunkByRegExpMatch from './getChunkByRegExpMatch';

const wordBoundaryRegexp = /(?<=\b) /g;
const softSentenceBoundaryRegExp = /(?<=[,;-] )/g;
const hardSentenceBoundaryRegExp = /(?<=[.?!] )/g;

export default function chunkText(
  input: string,
  maxChunkSize: number,
  chunkingBehavior: string,
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
    } else if (chunkingBehavior === ChunkingBehavior.wordBoundary) {
      nextChunk = getChunkByRegExpMatch(
        remainingInput,
        maxChunkSize,
        balkingDistance,
        wordBoundaryRegexp,
        [],
      );
    } else if (chunkingBehavior === ChunkingBehavior.softSentenceBoundary) {
      nextChunk = getChunkByRegExpMatch(
        remainingInput,
        maxChunkSize,
        balkingDistance,
        softSentenceBoundaryRegExp,
        [wordBoundaryRegexp],
      );
    } else {
      nextChunk = getChunkByRegExpMatch(
        remainingInput,
        maxChunkSize,
        balkingDistance,
        hardSentenceBoundaryRegExp,
        [softSentenceBoundaryRegExp, wordBoundaryRegexp],
      );
    }

    chunks.push(nextChunk);

    remainingInput = remainingInput
      .slice(nextChunk.length)
      .trim();
  }

  return chunks;
}
