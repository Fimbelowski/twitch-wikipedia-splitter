import { ChunkingBehaviors } from '../types/ChunkingBehaviors';

export default function chunkText(input: string, chunkingBehavior: ChunkingBehaviors, balkingDistance: number) {
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
      let end = rawChunk.length - 1;
      let distance = Infinity;

      if (chunkingBehavior === ChunkingBehaviors.sentenceBoundary) {
        let matches = Array.from(rawChunk.matchAll(/[.?!] /gm));

        if (/[.?!] /gm.test(rawChunk)) {
          end = matches.pop().index + 1;
          distance = 500 - end;
        }

        if (distance > balkingDistance && rawChunk.includes(', ')) {
          matches = Array.from(rawChunk.matchAll(/[,;-] /gm));

          end = matches.pop().index + 1;
          distance = 500 - end;
        }
      }

      if (chunkingBehavior === ChunkingBehaviors.wordBoundary || distance > balkingDistance) {
        if (rawChunk.includes(' ')) {
          end = rawChunk.lastIndexOf(' ');
        }
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
