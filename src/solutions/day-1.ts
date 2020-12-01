export function run(inputNumbers: number[]) {
  return [
    problem_1(inputNumbers),
    problem_2(inputNumbers)
  ]
    .map(soluction => soluction.reduce((product, num) => product * num));
}

export function problem_1(inputNumbers: number[]): number[] {
  const selectedNumbers = getSumTo(2020, inputNumbers);
  if (!selectedNumbers) throw new Error("No solution found!");

  return selectedNumbers;
}

export function problem_2(inputNumbers: number[]): number[] {
  for (const inputNumber of inputNumbers) {
    const remainingValue = 2020 - inputNumber;

    const inputNumberSum = getSumTo(inputNumber, inputNumbers);
    if (inputNumbers.includes(remainingValue) && inputNumberSum) return [ remainingValue, ...inputNumberSum ];

    const remainingValueSum = getSumTo(remainingValue, inputNumbers);
    if (inputNumbers.includes(inputNumber) && remainingValueSum) return [ inputNumber, ...remainingValueSum ]
  }

  throw new Error("No solution found!");
}

function getSumTo(totalValue: number, inputNumbers: number[]): number[] | undefined {
  for (const inputNumber of inputNumbers) {
    const remainingValue = totalValue - inputNumber;

    if (inputNumbers.includes(remainingValue)) return [ inputNumber, remainingValue ];
  }
}

export function parse(input: string) {
  return input
    .split("\n")
    .map(num => parseInt(num, 10));
}