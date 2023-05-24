export default function truncateConsecutiveSpaces(input: string) {
  return input.replace(/ {2,}/g, ' ');
}
