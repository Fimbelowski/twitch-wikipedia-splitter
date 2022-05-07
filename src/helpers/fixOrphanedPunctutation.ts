export default function fixOrphanedPunctuation(input: string) {
  return input.replace(/ {1,}([.,])/gm, '$1');
}
