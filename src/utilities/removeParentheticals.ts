import removeBracketsAndContents from './removeBracketsAndContents';

export default function removeParentheticals(input: string) {
  return removeBracketsAndContents(input, '(', ')');
}
