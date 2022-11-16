import getNextChunk from './getNextChunk';

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

    const nextChunk = getNextChunk(remainingInput, maxChunkSize, chunkingBehavior, balkingDistance);
    chunks.push(nextChunk);

    remainingInput = remainingInput
      .slice(nextChunk.length)
      .trim();
  }

  return chunks;
}
