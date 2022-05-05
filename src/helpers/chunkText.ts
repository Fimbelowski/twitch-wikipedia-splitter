import { ChunkingBehaviors } from '../types/ChunkingBehaviors';

export default function chunkText(input: string, chunkingBehavior: ChunkingBehaviors) {
  if (chunkingBehavior === ChunkingBehaviors.none) {
    return [input];
  }

  if (input.length === 0) {
    return [''];
  }

  let remainingInput = input;
  const chunks: string[] = [];

  while (remainingInput.length > 0) {
    if (remainingInput.length > 500) {
      const rawChunk = remainingInput.substring(0, 500);
      let end = 500;

      if (chunkingBehavior === ChunkingBehaviors.wordBoundary) {
        end = rawChunk.lastIndexOf(' ');
      } else if (chunkingBehavior === ChunkingBehaviors.sentenceBoundary) {
        end = rawChunk.lastIndexOf('.') + 1;
      }

      chunks.push(rawChunk.substring(0, end));
      remainingInput = remainingInput
        .substring(end)
        .trim();
    } else {
      chunks.push(remainingInput);
      break;
    }
  }

  return chunks;
}
