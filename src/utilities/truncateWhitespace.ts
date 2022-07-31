export function truncateWhitespace(input: string) {
  return input.replace(/ {2,}/gm, ' ');
}