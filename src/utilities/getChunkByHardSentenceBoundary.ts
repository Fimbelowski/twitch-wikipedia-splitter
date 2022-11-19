import getChunkBySoftSentenceBoundary from './getChunkBySoftSentenceBoundary';
import getLastMatchWithinMaxChunkSize from './getLastMatchWithinMaxChunkSize';
import isMatchWithinBalkingDistance from './isMatchWithinBalkingDistance';

const hardSentenceBoundaryRegExp = /[.?!] /g;

export default function getChunkByHardSentenceBoundary(
  input: string,
  maxChunkSize: number,
  balkingDistance: number,
) {
  const lastMatch = getLastMatchWithinMaxChunkSize(input, hardSentenceBoundaryRegExp, maxChunkSize);

  return isMatchWithinBalkingDistance(lastMatch, maxChunkSize, balkingDistance)
    ? input.slice(0, (lastMatch?.index || Infinity) + 1)
    : getChunkBySoftSentenceBoundary(input, maxChunkSize, balkingDistance);
}
