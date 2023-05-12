export default function isMatchWithinBalkingDistance(
  match: RegExpMatchArray | undefined,
  maxChunkSize: number,
  balkingDistance: number
) {
  return (
    match?.index !== undefined &&
    maxChunkSize - match.index + 1 < balkingDistance
  );
}
