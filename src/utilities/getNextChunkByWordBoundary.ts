import getLastMatchWithinMaxChunkSize from './getLastMatchWithinMaxChunkSize';
import getNextChunkByChunkSize from './getNextChunkByChunkSize';
import isMatchWithinBalkingDistance from './isMatchWithinBalkingDistance';

const wordBoundaryRegexp = /\b/g;

export default function getNextChunkByWordBoundary(
  input: string,
  maxChunkSize: number,
  balkingDistance: number,
) {
  const lastMatch = getLastMatchWithinMaxChunkSize(input, wordBoundaryRegexp, maxChunkSize);

  return isMatchWithinBalkingDistance(lastMatch, maxChunkSize, balkingDistance)
    ? input.slice(0, lastMatch?.index)
    : getNextChunkByChunkSize(input, maxChunkSize);
}
