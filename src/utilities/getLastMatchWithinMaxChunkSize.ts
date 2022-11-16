export default function getLastMatchWithinMaxChunkSize(
  input: string,
  regExp: RegExp,
  maxChunkSize: number,
) {
  const matches = Array
    .from(input.matchAll(regExp))
    .filter((match) => match.index !== undefined && match.index + 1 < maxChunkSize);

  return matches.pop();
}
