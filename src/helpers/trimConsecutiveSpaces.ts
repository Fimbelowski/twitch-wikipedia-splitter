export default function trimConsecutiveSpaces(input: string) {
  return input.replace(/ {2,}/gm, ' ');
}
