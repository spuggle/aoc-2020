import { readdirSync } from "fs";
import path from "path";

const solutionDays = readdirSync(getAbsolutePath("./solutions/"));

export async function getSolutions(): Promise<[string, SolutionMethods][]> {
  return Promise.all(
    solutionDays.map(async solutionDay => [
      solutionDay,
      await import(getAbsolutePath(`./solutions/${solutionDay}/${solutionDay}.js`))
    ] as [ string, SolutionMethods ])
  );
}

export function getAbsolutePath(relativePath: string): string {
  return path.join(__dirname, "..", relativePath);
}

export interface SolutionMethods {
  readonly partOne?: ProblemFunction;
  readonly partTwo?: ProblemFunction;
  readonly parse?: (input: string) => string[] | unknown[];
}

type ProblemFunction = (input: string[] | unknown[]) => number;

export type Solutions = [ "partOne" | "partTwo", ProblemFunction ][];