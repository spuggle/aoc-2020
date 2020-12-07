export function partOne(areaMap: AreaMap): number {
  // eslint-disable-next-line unicorn/no-reduce
  return areaMap.reduce<number>((treesEncountered, currentRow, rowNumber) => {
    const columnNumber = (rowNumber * 3) % currentRow.length;
    const hasEncounteredTree = currentRow[columnNumber] === "#";

    return hasEncounteredTree
      ? treesEncountered + 1
      : treesEncountered;
  }, 0);
}

export function partTwo(areaMap: AreaMap): number {
  return ([
    [ 1, 1 ],
    [ 3, 1 ],
    [ 5, 1 ],
    [ 7, 1 ],
    [ 1, 2 ]
  ] as Slope[])
    .map(slope => treesEncounteredInSlope(slope, areaMap))
    // eslint-disable-next-line unicorn/no-reduce
    .reduce<number>((product, treesEncountered) => product * treesEncountered, 1);
}

function treesEncounteredInSlope([ rightShift, downShift ]: Slope, areaMap: AreaMap): number {
  let treesEncountered = 0;

  for (let rowNumber = 0; rowNumber < areaMap.length; rowNumber += downShift) {
    const currentRow = areaMap[rowNumber];
    const columnNumber = ((rowNumber / downShift) * rightShift) % currentRow.length;
    const hasEncounteredTree = currentRow[columnNumber] === "#";

    if (hasEncounteredTree) ++treesEncountered;
  }

  return treesEncountered;
}


export function parse(input: string): AreaMap {
  return input
    .split("\n")
    .map(row => row.split(""));
}

type AreaMap = string[][];
type Slope = [ number, number ];