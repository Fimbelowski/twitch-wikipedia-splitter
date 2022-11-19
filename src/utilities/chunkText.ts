import ChunkingBehavior from '@/types/ChunkingBehavior';
import getNextChunkByChunkSize from './getNextChunkByChunkSize';
import getNextChunkByHardSentenceBoundary from './getNextChunkByHardSentenceBoundary';
import getNextChunkBySoftSentenceBoundary from './getNextChunkBySoftSentenceBoundary';
import getNextChunkByWordBoundary from './getNextChunkByWordBoundary';

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
      nextChunk = getNextChunkByChunkSize(remainingInput, maxChunkSize);
    } else if (chunkingBehavior === ChunkingBehavior.wordBoundary) {
      nextChunk = getNextChunkByWordBoundary(remainingInput, maxChunkSize, balkingDistance);
    } else if (chunkingBehavior === ChunkingBehavior.softSentenceBoundary) {
      nextChunk = getNextChunkBySoftSentenceBoundary(remainingInput, maxChunkSize, balkingDistance);
    } else {
      nextChunk = getNextChunkByHardSentenceBoundary(remainingInput, maxChunkSize, balkingDistance);
    }

    chunks.push(nextChunk);

    remainingInput = remainingInput
      .slice(nextChunk.length)
      .trim();
  }

  return chunks;
}
