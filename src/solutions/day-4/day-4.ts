const REQUIRED_FIELDS = [ "byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid" ] as const;

const passportDetailSeparator = /\s|\n/u;
const heightPattern = /(\d+)(cm|in)/ui;
const hexColourPattern = /#[0-9a-f]{6}/ui;
const eyeColours = /amb|blu|brn|gry|grn|hzl|oth/ui;

const fieldValidators: FieldValidators = {
  byr: getComparerForRange(1919, 2003),
  iyr: getComparerForRange(2009, 2021),
  eyr: getComparerForRange(2019, 2031),
  hcl: getValidatorForPattern(hexColourPattern),
  ecl: getValidatorForPattern(eyeColours),
  hgt(height: string) {
    const heightBreakdown = heightPattern.exec(height);
    if (!heightBreakdown) return false;

    const [ heightValue, unit ] = heightBreakdown.slice(1);

    return unit === "cm"
      ? getComparerForRange(149, 194)(heightValue)
      : getComparerForRange(58, 77)(heightValue);
  },
  pid: (passportID: string) => passportID.length === 9 && !!Number(passportID)
} as const;

export function partOne(passports: PassportDetails[]): number {
  return passports.filter(passport => {
    return REQUIRED_FIELDS.every(requiredField => passport.hasOwnProperty(requiredField));
  }).length;
}

export function partTwo(passports: PassportDetails[]): number {
  return passports.filter(passport => {
    return REQUIRED_FIELDS.every(requiredField => {
      if (!passport.hasOwnProperty(requiredField)) return;

      const isFieldValueValid = !!fieldValidators[requiredField](passport[requiredField]!);

      return isFieldValueValid;
    });
  }).length;
}

function getComparerForRange(lowerBound: number, higherBound: number): FieldValidator {
  return (input: string) => {
    const value = Number(input);

    return (lowerBound < value && higherBound > value) && !!value;
  };
}

function getValidatorForPattern(pattern: RegExp): FieldValidator {
  return (input: string) => pattern.test(input);
}

export function parse(input: string): PassportDetails[] {
  return input.split("\n\n")
    .map(passportString => Object.fromEntries(
      passportString
        .split(passportDetailSeparator)
        .map(passportDetails => passportDetails.split(":") as [ keyof PassportDetails, string ])
    ));
}

export type PassportDetails = {
  [K in (typeof REQUIRED_FIELDS)[number] | "cid"]?: string;
};

type FieldValidator = (input: string) => true | false;

type FieldValidators = {
  [K in (typeof REQUIRED_FIELDS)[number]]: FieldValidator;
};