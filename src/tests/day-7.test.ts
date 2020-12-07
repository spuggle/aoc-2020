import test from "ava";
import { parse, partOne, partTwo } from "../solutions/day-7/day-7.js";

const inputA = `
light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`
  .trim();
const inputB = `
shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.`
  .trim();

const parsedInputA = {
  "light red": { "bright white": 1, "muted yellow": 2 },
  "dark orange": { "bright white": 3, "muted yellow": 4 },
  "bright white": { "shiny gold": 1 },
  "muted yellow": { "shiny gold": 2, "faded blue": 9 },
  "shiny gold": { "dark olive": 1, "vibrant plum": 2 },
  "dark olive": { "faded blue": 3, "dotted black": 4 },
  "vibrant plum": { "faded blue": 5, "dotted black": 6 },
  "faded blue": {},
  "dotted black": {}
};
const parsedInputB = {
  "shiny gold": { "dark red": 2 },
  "dark red": { "dark orange": 2 },
  "dark orange": { "dark yellow": 2 },
  "dark yellow": { "dark green": 2 },
  "dark green": { "dark blue": 2 },
  "dark blue": { "dark violet": 2 },
  "dark violet": {}
};

test("Parse the input", tester => {
  const parseOutputA = parse(inputA);
  const parseOutputB = parse(inputB);

  tester.deepEqual(parseOutputA, parsedInputA);
  tester.deepEqual(parseOutputB, parsedInputB);
});

test("[Part 1] Find the number of bags that can store the shiny golden bag", tester => {
  const bagsThatCanStoreGoldBag = partOne(parsedInputA);

  tester.is(bagsThatCanStoreGoldBag, 4);
});

test("[Part 2] Find the number of bags that are stored in the shiny gold bag", tester => {
  const bagsWithinGoldBagA = partTwo(parsedInputA);
  const bagsWithinGoldBagB = partTwo(parsedInputB);

  tester.is(bagsWithinGoldBagB, 126, "Part 2 B failed");
  tester.is(bagsWithinGoldBagA, 32, "Part 2 A failed");
});