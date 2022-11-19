import getLastMatchWithinMaxChunkSize from './getLastMatchWithinMaxChunkSize';
import getChunkByChunkSize from './getChunkByChunkSize';
import isMatchWithinBalkingDistance from './isMatchWithinBalkingDistance';

const wordBoundaryRegexp = /\b/g;

export default function getChunkByWordBoundary(
  input: string,
  maxChunkSize: number,
  balkingDistance: number,
) {
  const lastMatch = getLastMatchWithinMaxChunkSize(input, wordBoundaryRegexp, maxChunkSize);

  return isMatchWithinBalkingDistance(lastMatch, maxChunkSize, balkingDistance)
    ? input.slice(0, lastMatch?.index)
    : getChunkByChunkSize(input, maxChunkSize);
}
