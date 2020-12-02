const PASSWORD_REGEX = /(\d+)-(\d+) (\w): (\w+)/u;

export function run(passwordDetails: PasswordDetails) {
  return [
    problem1(passwordDetails),
    problem2(passwordDetails)
  ];
}

function problem1(passwordDetails: PasswordDetails) {
  let validPasswords = 0;

  for (const [ lowerBound, higherBound, policyLetter, password ] of passwordDetails) {
    const letterRepetitions = password.split(policyLetter).length - 1;

    if (letterRepetitions >= lowerBound && letterRepetitions <= higherBound) ++validPasswords;
  }

  return validPasswords;
}

function problem2(passwordDetails: PasswordDetails) {
  let validPasswords = 0;

  for (const [ lowerBound, higherBound, policyLetter, password ] of passwordDetails) {
    const existsOnFirstIndex = password[lowerBound - 1] === policyLetter;
    const existsOnSecondIndex = password[higherBound - 1] === policyLetter;

    const bothAreNotSame = existsOnFirstIndex !== existsOnSecondIndex;
    const eitherExists = existsOnFirstIndex || existsOnSecondIndex;

    if (bothAreNotSame && eitherExists) ++validPasswords;
  }

  return validPasswords;
}

export function parse(inputs: string[]): PasswordDetails {
  return inputs
    .map(input => {
      const [ lowerBound, higherBound, policyLetter, password ] = PASSWORD_REGEX.exec(input)!.slice(1);

      return [ parseInt(lowerBound, 10), parseInt(higherBound, 10), policyLetter, password ];
    });
}

type PasswordDetails = [ number, number, string, string ][];