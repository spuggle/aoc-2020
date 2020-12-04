export function partOne(inputNumbers: number[]): number {
  const selectedNumbers = getProductOfSumTo(2020, inputNumbers);
  if (!selectedNumbers) throw new Error("No solution found!");

  return selectedNumbers;
}

export function partTwo(inputNumbers: number[]): number {
  for (const inputNumber of inputNumbers) {
    const remainingValue = 2020 - inputNumber;

    const inputNumberSum = getProductOfSumTo(inputNumber, inputNumbers);
    if (inputNumbers.includes(remainingValue) && inputNumberSum) return remainingValue * inputNumberSum;

    const remainingValueSum = getProductOfSumTo(remainingValue, inputNumbers);
    if (inputNumbers.includes(inputNumber) && remainingValueSum) return inputNumber * remainingValueSum;
  }

  throw new Error("No solution found!");
}

function getProductOfSumTo(totalValue: number, inputNumbers: number[]): number | undefined {
  for (const inputNumber of inputNumbers) {
    const remainingValue = totalValue - inputNumber;

    if (inputNumbers.includes(remainingValue)) return inputNumber * remainingValue;
  }
}

export function parse(input: string) {
  return input
    .split("\n")
    .map(num => Number(num));
}