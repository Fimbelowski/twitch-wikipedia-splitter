export default function removeBracketsAndContents(
  input: string,
  openingBracket: string,
  closingBracket: string
) {
  let remainingInput = input;
  let bracketIndices: number[] = [];

  // Find all brackets within the input.
  remainingInput.split('').forEach((character, index) => {
    if (character === openingBracket || character === closingBracket) {
      bracketIndices.push(index);
    }
  });

  for (
    let i = 0;
    bracketIndices.length > 1 && i < bracketIndices.length;
    i += 1
  ) {
    const left = bracketIndices[i];
    const right = bracketIndices[i + 1];

    if (
      remainingInput[left] === openingBracket &&
      remainingInput[right] === closingBracket
    ) {
      remainingInput =
        remainingInput.slice(0, left) + remainingInput.slice(right + 1);

      bracketIndices.splice(i, 2);

      // All indices after right will be shifted after updating remainingInput and must be updated.
      // Alternatively, remainingInput could be iterated again.
      bracketIndices = bracketIndices.map((index) =>
        index > right ? index - (right - left + 1) : index
      );

      // Update i to reflect the new size of bracketIndices.
      i -= 2;
    }
  }

  return remainingInput;
}
