import { readdirSync, readFileSync } from "fs";
import * as path from "path";
import { Benchmark } from "./util/Benchmark.js";

const solutionDays = readdirSync(getAbsolutePath("./solutions/"));

void runAllSolutions();

export async function runAllSolutions() {
  const solutionOutputs: SolutionOutputs = {};
  const optimizationOutputs: SolutionOutputs = {};

  for (const solutionDay of solutionDays) {
    const [
      { parse, ...problemSolutions },
      optimizedMethods
    ] = await Promise.all([
      import(getAbsolutePath(`./solutions/${solutionDay}/${solutionDay}.js`)) as Promise<SolutionMethods>,
      import(getAbsolutePath(`./solutions/${solutionDay}/${solutionDay}-optimized.js`))
        .catch(() => ({})) as Promise<OptimizedMethods>
    ]);

    const [ solutions, optimizations ] = [ problemSolutions, optimizedMethods ]
      .map(methods => Object.entries(methods)
        .filter(([ solutionName ]) => solutionName.startsWith("part")) as [ "partOne" | "partTwo", ProblemFunction ][]
      );

    if (!parse || !solutions.length) throw new Error(`Functions for ${solutionDay} not implemented properly!`);

    const rawSolutionInput = readFileSync(getAbsolutePath(`../inputs/${solutionDay}.txt`)).toString("utf8");
    const solutionInput = parse(rawSolutionInput);

    solutionOutputs[solutionDay] = getSolutionOutputs(solutions, solutionInput);
    if (optimizations.length) optimizationOutputs[solutionDay] = getSolutionOutputs(optimizations, solutionInput);
  }

  console.table(solutionOutputs);
  console.table(optimizationOutputs);
}

function getSolutionOutputs(solutions: ["partOne" | "partTwo", ProblemFunction][], solutionInput: unknown[]) {
  return Object.fromEntries(
    solutions
      .map(([ solutionName, solution ]) => {
        const solutionBenchmark = new Benchmark();

        solutionBenchmark.start();
        const answer = solution(solutionInput);
        solutionBenchmark.stop();

        return [ solutionName, `${answer.toString()} @ ${solutionBenchmark.display()}` ];
      })
  );
}

function getAbsolutePath(relativePath: string) {
  return path.join(__dirname, relativePath);
}

interface SolutionOutputs {
  [K: string]: {
    [K: string]: PartOutput;
  };
}

type ProblemFunction<T = unknown> = (...args: T[]) => unknown[];

interface SolutionMethods<T = unknown> {
  readonly partOne?: ProblemFunction<T>;
  readonly partTwo?: ProblemFunction<T>;
  readonly parse?: (input: string) => T[];
}

interface OptimizedMethods<T = unknown> {
  readonly [K: string]: ProblemFunction<T>;
}

type PartOutput = string;