import removeBracketsAndContents from './removeBracketsAndContents';

export default function removeCitations(input: string) {
  return removeBracketsAndContents(input, '[', ']');
}
