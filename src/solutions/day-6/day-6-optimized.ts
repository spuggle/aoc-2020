import { groupSplitPattern } from "./day-6";

const newlineSplitPattern = /\n/u;

export function partOneSelfOptimized(groups: string[]): number {
  let yesResponses = 0;

  for (const group of groups) {
    yesResponses += new Set(group.split(groupSplitPattern)).size;
  }

  return yesResponses;
}

export function partOneHelpOptimized(groups: string[]): number {
  let yesResponses = 0;

  for (const group of groups) {
    yesResponses += new Set(group.split(newlineSplitPattern).join("")).size;
  }

  return yesResponses;
}