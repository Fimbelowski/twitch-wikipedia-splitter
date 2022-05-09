import { ChunkingBehaviors } from '../types/ChunkingBehaviors';
const hardSentenceBoundaryRegexp = /[.?!] /gm;
const softSentenceBoundaryRegexp = /[,;-] /gm;

export default function chunkText(
  input: string,
  maxChunkSize: number,
  chunkingBehavior: ChunkingBehaviors,
  balkingDistance: number
) {
  if (
    chunkingBehavior === ChunkingBehaviors.none
    || input.length === 0
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
      let matches: RegExpMatchArray[];

      if (hardSentenceBoundaryRegexp.test(rawChunk)) {
        matches = Array.from(rawChunk.matchAll(hardSentenceBoundaryRegexp));
        tentativeEndIndex = matches.pop().index;
        distance = 500 - tentativeEndIndex + 1;
      }

      if (
        distance > balkingDistance
        && softSentenceBoundaryRegexp.test(rawChunk)
      ) {
        matches = Array.from(rawChunk.matchAll(softSentenceBoundaryRegexp));
        tentativeEndIndex = matches.pop().index;
        distance = 500 - tentativeEndIndex + 1;
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
