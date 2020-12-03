import test from "ava";
import { PasswordDetails, parse, partOne, partTwo } from "../solutions/day-2.js";

const input = [ "1-3 a: abcde", "1-3 b: cdefg", "2-9 c: ccccccccc" ];
const parsedInput: PasswordDetails = [ [ 1, 3, "a", "abcde" ], [ 1, 3, "b", "cdefg" ], [ 2, 9, "c", "ccccccccc" ] ];

test("Parse the input", tester => {
  const parseOutput = parse(input);

  tester.deepEqual(parseOutput, parsedInput);
});

test("[Part 1] Find the correct number of correct passwords", tester => {
  const solution = partOne(parsedInput);

  tester.is(solution, 2);
});

test("[Part 2] Find the correct number of correct passwords", tester => {
  const solution = partTwo(parsedInput);

  tester.is(solution, 1);
});