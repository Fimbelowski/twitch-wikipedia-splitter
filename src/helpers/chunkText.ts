import { ChunkingBehaviors } from '../types/ChunkingBehaviors';
const hardSentenceBoundaryRegExp = /[.?!] /gm;
const softSentenceBoundaryRegExp = /[,;-] /gm;

export default function chunkText(
  input: string,
  maxChunkSize: number,
  chunkingBehavior: ChunkingBehaviors,
  balkingDistance: number
) {
  if (
    chunkingBehavior === ChunkingBehaviors.none
    || input === ''
    ) {
    return [input];
  }

  let remainingInput = input.trim();
  const chunks: string[] = [];

  while (remainingInput.length > 0) {
    if (remainingInput.length <= maxChunkSize) {
      chunks.push(remainingInput);
      break;
    }

    const rawChunk = remainingInput.substring(0, maxChunkSize);
    let tentativeEndIndex = rawChunk.length - 1;
    let distance = Infinity;

    if (chunkingBehavior === ChunkingBehaviors.sentenceBoundary) {
      let matches = Array.from(rawChunk.matchAll(hardSentenceBoundaryRegExp));

      if (matches.length > 0) {
        tentativeEndIndex = matches.pop().index;
        distance = 500 - tentativeEndIndex + 1;
      }

      if (distance > balkingDistance) {
        matches = Array.from(rawChunk.matchAll(softSentenceBoundaryRegExp));

        if (matches.length > 0) {
          tentativeEndIndex = matches.pop().index;
          distance = 500 - tentativeEndIndex + 1;
        }
      }
    }

    if (
      chunkingBehavior === ChunkingBehaviors.wordBoundary
      || distance > balkingDistance
    ) {
      if (rawChunk.includes(' ')) {
        tentativeEndIndex = rawChunk.lastIndexOf(' ');
      }
    }

    chunks.push(rawChunk.substring(0, tentativeEndIndex + 1));
    remainingInput = remainingInput
      .substring(tentativeEndIndex + 1)
      .trim();
  }

  return chunks;
}
