import getChunkByChunkSize from './getChunkByChunkSize';

export default function getChunkByRegExpMatch(
  input: string,
  maxChunkSize: number,
  balkingDistance: number,
  regExp: RegExp,
  regExpFallbacks: RegExp[],
): string {
  const matches = Array
    .from(input.matchAll(regExp))
    .filter((match) => match.index !== undefined && match.index + 1 < maxChunkSize);

  const lastMatch = matches.pop();

  if (
    lastMatch?.index !== undefined
    && maxChunkSize - lastMatch.index + 1 < balkingDistance
  ) {
    return input.slice(0, lastMatch.index);
  }

  const nextRegExp = regExpFallbacks.shift();

  if (nextRegExp !== undefined) {
    return getChunkByRegExpMatch(
      input,
      maxChunkSize,
      balkingDistance,
      nextRegExp,
      regExpFallbacks,
    );
  }

  return getChunkByChunkSize(input, maxChunkSize);
}
