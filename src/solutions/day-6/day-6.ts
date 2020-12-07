export const groupSplitPattern = /(?:\n|)+/u;

export function partOne(groups: string[]): number {
  return groups
    .map(group => new Set(group.split(groupSplitPattern)).size)
    // eslint-disable-next-line unicorn/no-reduce
    .reduce<number>((sum, responses) => sum + responses, 0);
}

export function partTwo(groups: string[]): number {
  return groups
    .map(group => {
      const groupMembers = group.split("\n");
      const answerOccurences = new Uint16Array(26);

      for (const groupMember of groupMembers) {
        for (const char of groupMember) ++answerOccurences[Number.parseInt(char, 36) - 10];
      }

      return answerOccurences
        .filter(occurences => occurences === groupMembers.length)
        .length;
    })
    // eslint-disable-next-line unicorn/no-reduce
    .reduce<number>((sum, responses) => sum + responses, 0);
}

export function parse(input: string) {
  return input
    .split("\n\n");
}