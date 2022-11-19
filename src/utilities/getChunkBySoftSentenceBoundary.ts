import getLastMatchWithinMaxChunkSize from './getLastMatchWithinMaxChunkSize';
import getChunkByWordBoundary from './getChunkByWordBoundary';
import isMatchWithinBalkingDistance from './isMatchWithinBalkingDistance';

const softSentenceBoundaryRegExp = /[,;-] /g;

export default function getChunkBySoftSentenceBoundary(
  input: string,
  maxChunkSize: number,
  balkingDistance: number,
) {
  const lastMatch = getLastMatchWithinMaxChunkSize(input, softSentenceBoundaryRegExp, maxChunkSize);

  return isMatchWithinBalkingDistance(lastMatch, maxChunkSize, balkingDistance)
    ? input.slice(0, (lastMatch?.index || Infinity) + 1)
    : getChunkByWordBoundary(input, maxChunkSize, balkingDistance);
}
