import test from "ava";
import { parse, partOne, partTwo } from "../solutions/day-1.js";

const input = [ "1721", "979", "366", "299", "675", "1456" ];
const parsedInput = [ 1721, 979, 366, 299, 675, 1456 ];

test("Parse the input", tester => {
  const parseOutput = parse(input);

  tester.deepEqual(parseOutput, parsedInput);
});

test("[Part 1] Find the correct solution", tester => {
  const solution = partOne(parsedInput);

  tester.is(solution, 514579);
});

test("[Part 2] Find the correct solution", tester => {
  const solution = partTwo(parsedInput);

  tester.is(solution, 241861950);
})