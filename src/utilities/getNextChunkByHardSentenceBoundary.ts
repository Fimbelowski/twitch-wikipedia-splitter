import getLastMatchWithinMaxChunkSize from './getLastMatchWithinMaxChunkSize';
import getNextChunkBySoftSentenceBoundary from './getNextChunkBySoftSentenceBoundary';
import isMatchWithinBalkingDistance from './isMatchWithinBalkingDistance';

const hardSentenceBoundaryRegExp = /[.?!] /g;

export default function getNextChunkByHardSentenceBoundary(
  input: string,
  maxChunkSize: number,
  balkingDistance: number,
) {
  const lastMatch = getLastMatchWithinMaxChunkSize(input, hardSentenceBoundaryRegExp, maxChunkSize);

  return isMatchWithinBalkingDistance(lastMatch, maxChunkSize, balkingDistance)
    ? input.slice(0, (lastMatch?.index || Infinity) + 1)
    : getNextChunkBySoftSentenceBoundary(input, maxChunkSize, balkingDistance);
}
