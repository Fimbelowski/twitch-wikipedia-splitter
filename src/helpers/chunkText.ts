export default function chunkText(input: string) {
  if (input.length === 0) {
    return [''];
  }

  let remainingInput = input;
  const chunks: string[] = [];

  while (remainingInput.length > 0) {
    if (remainingInput.length > 500) {
      const substring = remainingInput.substring(0, 500);

      const end = substring.lastIndexOf(' ');
      chunks.push(substring.substring(0, end));
      remainingInput = remainingInput
        .substring(end)
        .trim();
    } else {
      chunks.push(remainingInput);
      break;
    }
  }

  return chunks;
}
