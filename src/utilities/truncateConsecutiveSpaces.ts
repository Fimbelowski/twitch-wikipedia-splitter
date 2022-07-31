export function truncateConsecutiveSpaces(input: string) {
  return input.replace(/ {2,}/gm, ' ');
}