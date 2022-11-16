import getLastMatchWithinMaxChunkSize from './getLastMatchWithinMaxChunkSize';
import getNextChunkByWordBoundary from './getNextChunkByWordBoundary';
import isMatchWithinBalkingDistance from './isMatchWithinBalkingDistance';

const softSentenceBoundaryRegExp = /[,;-] /g;

export default function getNextChunkBySoftSentenceBoundary(
  input: string,
  maxChunkSize: number,
  balkingDistance: number,
) {
  const lastMatch = getLastMatchWithinMaxChunkSize(input, softSentenceBoundaryRegExp, maxChunkSize);

  return isMatchWithinBalkingDistance(lastMatch, maxChunkSize, balkingDistance)
    ? input.slice(0, (lastMatch?.index || Infinity) + 1)
    : getNextChunkByWordBoundary(input, maxChunkSize, balkingDistance);
}
