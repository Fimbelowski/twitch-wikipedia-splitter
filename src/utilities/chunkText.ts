import ChunkingBehavior from '@/types/ChunkingBehavior';
import getChunkByChunkSize from './getChunkByChunkSize';
import getChunkByRegExpMatch from './getChunkByRegExpMatch';

const chunkingBehaviorRegExpPairs = [
  {
    chunkingBehavior: ChunkingBehavior.hardSentenceBoundary,
    regExp: /(?<=[.?!] )/g,
  },
  {
    chunkingBehavior: ChunkingBehavior.softSentenceBoundary,
    regExp: /(?<=[,;-] )/g,
  },
  {
    chunkingBehavior: ChunkingBehavior.wordBoundary,
    regExp: /(?<=\b) /g,
  },
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
      const chunkingBehaviorIndex = chunkingBehaviorRegExpPairs.findIndex(
        (item) => item.chunkingBehavior === chunkingBehavior,
      );

      nextChunk = getChunkByRegExpMatch(
        remainingInput,
        maxChunkSize,
        balkingDistance,
        chunkingBehaviorRegExpPairs[chunkingBehaviorIndex].regExp,
        chunkingBehaviorRegExpPairs.slice(chunkingBehaviorIndex).map((item) => item.regExp),
      );
    }

    chunks.push(nextChunk);

    remainingInput = remainingInput
      .slice(nextChunk.length)
      .trim();
  }

  return chunks;
}
