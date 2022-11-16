export default function getNextChunkByChunkSize(
  input: string,
  maxChunkSize: number,
) {
  return input
    .slice(0, maxChunkSize)
    .trim();
}
