export default function chunkText(
  input: string,
  maxChunkSize: number,
  chunkingBehavior: string,
  balkingDistance: number
) {
  const hardSentenceBoundaryRegExp = /[.?!] /gm;
  const softSentenceBoundaryRegExp = /[,;-] /gm;

  if (
    chunkingBehavior === 'none'
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

    if (chunkingBehavior === 'sentenceBoundary') {
      let matches = Array.from(rawChunk.matchAll(hardSentenceBoundaryRegExp));
      let nextMatch = matches.pop();

      if (nextMatch !== undefined) {
        tentativeEndIndex = nextMatch.index || Infinity;
        distance = 500 - tentativeEndIndex + 1;
      }

      if (distance > balkingDistance) {
        matches = Array.from(rawChunk.matchAll(softSentenceBoundaryRegExp));
        nextMatch = matches.pop();

        if (nextMatch !== undefined) {
          tentativeEndIndex = nextMatch.index || Infinity;
          distance = 500 - tentativeEndIndex + 1;
        }
      }
    }

    if (
      chunkingBehavior === 'wordBoundary'
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