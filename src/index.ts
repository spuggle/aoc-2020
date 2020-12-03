import { readdirSync, readFileSync } from "fs";
import * as path from "path";
import { Benchmark } from "./util/Benchmark.js";

const solutionFiles = readdirSync(getAbsolutePath("./solutions"))
  .filter(solutionFile => solutionFile.endsWith(".js"));

void runAllSolutions();

export async function runAllSolutions() {
  const solutionOutputs: SolutionOutputs = {};

  for (const solutionFile of solutionFiles) {
    const [ solutionDay ] = solutionFile.split(".");

    const {
      parse,
      ...problemSolutions
    } = await import(getAbsolutePath(`./solutions/${solutionFile}`)) as SolutionMethods;

    const solutions = Object.entries(problemSolutions)
      .filter(([ solutionName ]) => solutionName.startsWith("part")) as [ "partOne" | "partTwo", ProblemFunction ][];

    if (!parse || !solutions.length) throw new Error(`Functions for ${solutionDay} not implemented properly!`);

    const rawSolutionInput = readFileSync(getAbsolutePath(`../inputs/${solutionDay}.txt`)).toString("utf8").split("\n");
    const solutionInput = parse(rawSolutionInput);

    solutionOutputs[solutionDay] = solutions.reduce<SolutionOutputs[string]>(
      (solutionOutput, [ solutionName, solution ]) => {
        const solutionBenchmark = new Benchmark();

        solutionBenchmark.start();
        const answer = solution(solutionInput);
        solutionBenchmark.stop();

        solutionOutput[solutionName] = {
          answer,
          timeTaken: solutionBenchmark.display()
        };

        return solutionOutput;
      }, {
        partOne: { answer: null, timeTaken: "" },
        partTwo: { answer: null, timeTaken: "" }
      }
    );
  }

  console.table(solutionOutputs);
}

function getAbsolutePath(relativePath: string) {
  return path.join(__dirname, relativePath);
}

interface SolutionOutputs {
  [K: string]: {
    partOne: PartOutput;
    partTwo: PartOutput;
  };
}

type ProblemFunction<T = unknown> = (...args: T[]) => unknown[];

interface SolutionMethods<T = unknown> {
  readonly problemOne?: ProblemFunction<T>;
  readonly problemTwo?: ProblemFunction<T>;
  readonly parse?: (input: string[]) => T;
}

interface PartOutput {
  answer: unknown;
  timeTaken: string;
}