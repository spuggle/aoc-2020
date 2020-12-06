export const groupSplitPattern = /(?:\n|)+/u;

export function partOne(groups: string[]): number {
  return groups
    .map(group => new Set(group.split(groupSplitPattern)).size)
    .reduce<number>((sum, responses) => sum + responses, 0);
}

export function partTwo(groups: string[]): number {
  return groups
    .map(group => {
      const groupMembers = group.split("\n");
      const answerOccurences = new Uint16Array(26);

      for (const groupMember of groupMembers) {
        for (const char of groupMember) ++answerOccurences[parseInt(char, 36) - 10];
      }

      return answerOccurences
        .filter(occurences => occurences === groupMembers.length)
        .length;
    })
    .reduce<number>((sum, responses) => sum + responses, 0);
}

export function parse(input: string) {
  return input
    .split("\n\n");
}