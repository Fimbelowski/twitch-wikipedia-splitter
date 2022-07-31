export function fixOrphanedPunctuation(input: string) {
  return input.replace(/ ([.,])/gm, '$1');
}