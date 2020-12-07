import { readFileSync } from "fs";
import { getAbsolutePath, getSolutions, Solutions } from "./util/loadSolutions";

void runAllSolutions();

export async function runAllSolutions() {
  const solutionOutputEntries = (await getSolutions())
    .map(([ solutionDay, { parse, ...problemSolutions } ]) => {
      const solutions = Object.entries(problemSolutions)
        .filter(([ solutionName ]) => solutionName.startsWith("part")) as Solutions;

      if (!parse || !solutions.length) throw new Error(`Functions for ${solutionDay} not implemented properly!`);

      const rawSolutionInput = readFileSync(getAbsolutePath(`../inputs/${solutionDay}.txt`)).toString("utf8");
      const solutionInput = parse(rawSolutionInput);

      return [ solutionDay, getSolutionOutputs(solutions, solutionInput) ];
    });

  console.table(Object.fromEntries(solutionOutputEntries));
}

function getSolutionOutputs(solutions: Solutions, solutionInput: (string | unknown)[]) {
  return Object.fromEntries(
    solutions
      .map(([ solutionName, solution ]) => [ solutionName, solution(solutionInput) ])
  ) as SolutionOutputs[string];
}

type SolutionOutputs = {
  [K: string]: {
    [K in "partOne" | "partTwo"]: number;
  };
};