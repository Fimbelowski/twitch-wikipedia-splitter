import ChunkingBehavior from '@/types/ChunkingBehavior';
import getChunkByChunkSize from './getChunkByChunkSize';
import getChunkByHardSentenceBoundary from './getChunkByHardSentenceBoundary';
import getChunkBySoftSentenceBoundary from './getChunkBySoftSentenceBoundary';
import getChunkByWordBoundary from './getChunkByWordBoundary';

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
      nextChunk = getChunkByWordBoundary(remainingInput, maxChunkSize, balkingDistance);
    } else if (chunkingBehavior === ChunkingBehavior.softSentenceBoundary) {
      nextChunk = getChunkBySoftSentenceBoundary(remainingInput, maxChunkSize, balkingDistance);
    } else {
      nextChunk = getChunkByHardSentenceBoundary(remainingInput, maxChunkSize, balkingDistance);
    }

    chunks.push(nextChunk);

    remainingInput = remainingInput
      .slice(nextChunk.length)
      .trim();
  }

  return chunks;
}
