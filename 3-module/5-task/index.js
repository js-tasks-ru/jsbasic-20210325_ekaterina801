function getMinMax(str) {
  let stringWithoutSpaces = str.split(' ').join();
  let itemsDividedByComma = stringWithoutSpaces.split(',');
  let numbersOnly = itemsDividedByComma
    .filter((item) => item !== '' && isFinite(item));

  let max = Math.max(...numbersOnly);
  let min = Math.min(...numbersOnly);

  return {min, max};
}
