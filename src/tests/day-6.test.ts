import test from "ava";
import { parse, partOne, partTwo, groupSplitPattern } from "../solutions/day-6/day-6";

const input = `abc

a
b
c

ab
ac

a
a
a
a

b`;
const parsedInput = [ "abc", "a\nb\nc", "ab\nac", "a\na\na\na", "b" ];
const parsedWorkingData = [ [ "a", "b", "c" ], [ "a", "b", "c" ], [ "a", "b", "a", "c" ], [ "a", "a", "a", "a" ], [ "b" ] ];

test("Parse the input", tester => {
  const parseOutput = parse(input);

  tester.deepEqual(parseOutput, parsedInput);
});

test("Test split regex", tester => {
  const splitGroups = parsedInput
    .map(group => group.split(groupSplitPattern));

  tester.deepEqual(splitGroups, parsedWorkingData);
});

test("[Part 1] Find the total number of 'Yes' responses of all groups", tester => {
  const groupResponses = partOne(parsedInput);

  tester.is(groupResponses, 11);
});

test("[Part 2] Find the total number of 'Yes' responses from everyone in each groups", tester => {
  const groupResponses = partTwo(parsedInput);

  tester.is(groupResponses, 6);
});