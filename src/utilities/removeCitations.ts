export default function removeCitations(input: string) {
  return input.replace(/\[[^\]]*\]/g, '');
}
