export default function getChunkByChunkSize(
  input: string,
  maxChunkSize: number,
) {
  return input
    .slice(0, maxChunkSize)
    .trim();
}
