import { readdirSync, readFileSync } from "fs";
import * as path from "path";

const CURRENT_DIRECTORY = import.meta.url.slice(5);

const solutionFiles = readdirSync(getAbsolutePath("./solutions"))
  .filter(solutionFile => solutionFile.endsWith(".js"));

await runAllSolutions();

export async function runAllSolutions() {
  for (const solutionFile of solutionFiles) {
    const [ solutionDay ] = solutionFile.split(".");

    const { parse, run } = await import(getAbsolutePath(`./solutions/${solutionFile}`)) as SolutionMethods;
    if (!parse || !run) throw new Error(`Functions for ${solutionDay} not implemented properly!`);

    const rawSolutionInput = readFileSync(getAbsolutePath(`../inputs/${solutionDay}.txt`)).toString("utf8");
    const solutionInput = parse(rawSolutionInput);
    const solutionOutput = run(solutionInput);

    console.log(`${solutionDay} solutions:`);
    solutionOutput.forEach((solution, i) => console.log(`    Solution ${i + 1}: `, solution));
  }
}

function getAbsolutePath(relativePath: string) {
  return path.join(CURRENT_DIRECTORY, "../", relativePath);
}

interface SolutionMethods<T = unknown> {
  readonly run?: (...args: T[]) => unknown[];
  readonly parse?: (input: string) => T;
}