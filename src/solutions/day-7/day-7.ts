const bagDetailsSplitPattern = /((?<=\d |^)(?:\w+ \w+)(?= bags?)|\d+)/gu;
const shinyGoldBag = "shiny gold";

export function partOne(bags: Bags): number {
  let bagsThatAcceptGoldBag = 0;

  for (const [ bag, bagContents ] of Object.entries(bags)) {
    if (bag === shinyGoldBag) continue;
    if (hasGoldBag(bagContents, bags)) ++bagsThatAcceptGoldBag;
  }

  return bagsThatAcceptGoldBag;
}

export function partTwo(bags: Bags) {
  return getBagsWithinGoldBag(bags[shinyGoldBag], bags) - 1;
}

function hasGoldBag(bagContents: BagContents, bags: Bags): boolean {
  if (bagContents.hasOwnProperty(shinyGoldBag)) return true;

  return Object.keys(bagContents)
    .some(bagContent => hasGoldBag(bags[bagContent], bags));
}

function getBagsWithinGoldBag(bagContents: BagContents, bags: Bags): number {
  const bagContentEntries = Object.entries(bagContents);
  if (!bagContentEntries.length) return 1;

  return bagContentEntries
  // eslint-disable-next-line unicorn/no-reduce
    .reduce<number>((sum, [ bag, bagAmount ]) => {
    return sum + (getBagsWithinGoldBag(bags[bag], bags) * bagAmount);
  }, 1);
}

export function parse(input: string): Bags {
  const bagEntries = input.split("\n")
    .map(bagData => {
      const [ bagType, ...bagDetailData ] = bagData.match(bagDetailsSplitPattern) || [];

      const bagContents: BagContents = {};
      const bagEntry: [ string, BagContents ] = [ bagType, bagContents ];

      for (let index = bagDetailData.length - 1; index > 0; index -= 2) {
        bagContents[bagDetailData[index]] = Number(bagDetailData[index - 1]);
      }

      return bagEntry;
    });

  return Object.fromEntries(bagEntries);
}

interface Bags {
  [bag: string]: BagContents;
}

interface BagContents {
  [content: string]: number;
}