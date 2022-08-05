export default function fixOrphanedPunctuation(input: string) {
  return input.replace(/ ([.?!,;-])/g, '$1');
}
