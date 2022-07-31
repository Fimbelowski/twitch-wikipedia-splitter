export function removeLineTerminators(input: string) {
  return input.replace(/[\n\r]/gm, ' ');
}