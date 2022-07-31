export function removeCitations(input: string) {
  return input.replace(/\[[^\]]*\]/gm, '');
}