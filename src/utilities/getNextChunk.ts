import ChunkingBehavior from '@/types/ChunkingBehavior';
import getNextChunkByChunkSize from './getNextChunkByChunkSize';
import getNextChunkByHardSentenceBoundary from './getNextChunkByHardSentenceBoundary';
import getNextChunkBySoftSentenceBoundary from './getNextChunkBySoftSentenceBoundary';
import getNextChunkByWordBoundary from './getNextChunkByWordBoundary';

export default function getNextChunk(
  input: string,
  maxChunkSize: number,
  chunkingBehavior: string,
  balkingDistance: number,
) {
  if (chunkingBehavior === ChunkingBehavior.none) {
    return input;
  }

  if (chunkingBehavior === ChunkingBehavior.chunkSize) {
    return getNextChunkByChunkSize(input, maxChunkSize);
  }

  if (chunkingBehavior === ChunkingBehavior.wordBoundary) {
    return getNextChunkByWordBoundary(input, maxChunkSize, balkingDistance);
  }

  if (chunkingBehavior === ChunkingBehavior.softSentenceBoundary) {
    return getNextChunkBySoftSentenceBoundary(input, maxChunkSize, balkingDistance);
  }

  return getNextChunkByHardSentenceBoundary(input, maxChunkSize, balkingDistance);
}
