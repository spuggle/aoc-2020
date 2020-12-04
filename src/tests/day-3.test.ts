import test from "ava";
import { parse, partOne, partTwo } from "../solutions/day-3.js";

const singleInput = `
..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`
  .trim();

const repeatedInput = `
..##.........##.........##.........##.........##.........##.......
#...#...#..#...#...#..#...#...#..#...#...#..#...#...#..#...#...#..
.#....#..#..#....#..#..#....#..#..#....#..#..#....#..#..#....#..#.
..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#
.#...##..#..#...##..#..#...##..#..#...##..#..#...##..#..#...##..#.
..#.##.......#.##.......#.##.......#.##.......#.##.......#.##.....
.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#
.#........#.#........#.#........#.#........#.#........#.#........#
#.##...#...#.##...#...#.##...#...#.##...#...#.##...#...#.##...#...
#...##....##...##....##...##....##...##....##...##....##...##....#
.#..#...#.#.#..#...#.#.#..#...#.#.#..#...#.#.#..#...#.#.#..#...#.#`
  .trim();

const parsedSingleInput = singleInput.split("\n").map(row => row.split(""));
const parsedRepeatedInput = repeatedInput.split("\n").map(row => row.split(""));

test("Parse the repeated input", tester => {
  const parseOutput = parse(repeatedInput);

  tester.deepEqual(parseOutput, parsedRepeatedInput);
});

test("Parse the single input", tester => {
  const parseOutput = parse(singleInput);

  tester.deepEqual(parseOutput, parsedSingleInput);
});

test("[Part 1] Find the correct number of trees encountered with repeated input", tester => {
  const solution = partOne(parsedRepeatedInput);

  tester.is(solution, 7);
});

test("[Part 1] Find the correct number of trees encountered with non-repeated input", tester => {
  const solution = partOne(parsedSingleInput);

  tester.is(solution, 7);
});

test("[Part 2] Find the correct product of number of trees encountered with repeated input", tester => {
  const solution = partTwo(parsedRepeatedInput);

  tester.is(solution, 336);
});

test("[Part 2] Find the correct product of number of trees encountered with non-repeated input", tester => {
  const solution = partTwo(parsedSingleInput);

  tester.is(solution, 336);
});