export default function removeParentheticals(input: string) {
  let strippedInput = input;

  for (let i = strippedInput.length - 1; i > -1; i--) {
    const currentCharacter = strippedInput.charAt(i);
    let end = -1;

    if (currentCharacter === '(') {
      end = strippedInput.indexOf(')', i);

      if (end !== -1) {
        strippedInput = `${strippedInput.substring(0, i)}${strippedInput.substring(end + 1)}`
        i = strippedInput.length;
      }
    }
  }

  return strippedInput;
}