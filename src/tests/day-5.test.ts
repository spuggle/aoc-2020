import test from "ava";
import { partOne, BoardingPass, parse, generateBoardingPass } from "../solutions/day-5";

const input = "BFFFBBFRRR\nFFFBBBFRRR\nBBFFBBFRLL";
const parsedInput: [ string, string ][] = [
  [ "BFFFBBF", "RRR" ],
  [ "FFFBBBF", "RRR" ],
  [ "BBFFBBF", "RLL" ]
];

const testData: { [K: string]: BoardingPass } = {
  BFFFBBFRRR: { row: 70, column: 7, seatID: 567 },
  FFFBBBFRRR: { row: 14, column: 7, seatID: 119 },
  BBFFBBFRLL: { row: 102, column: 4, seatID: 820 }
};

test("Parse the input", tester => {
  const parseOutput = parse(input);

  tester.deepEqual(parseOutput, parsedInput);
});

test("Find the right boarding pass", tester => {
  const output: { [K: string]: BoardingPass } = {};

  for (const position of parsedInput) {
    const boardingPass = generateBoardingPass(...position as [ string, string ]);

    output[position.join("")] = boardingPass;
  }

  tester.deepEqual(output, testData);
});

test("[Part 1] Find the highest Seat ID", tester => {
  const highestSeatID = partOne(parsedInput);

  tester.is(highestSeatID, 820);
});