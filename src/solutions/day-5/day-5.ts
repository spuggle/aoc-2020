const seatPattern = /((?:F|B){7})((?:R|L){3})/ui;

const capacities = {
  rows: 127,
  columns: 7
} as const;

export function partOne(positions: Positions): number {
  return positions.reduce<number>((highestSeatID, [ rowPosition, columnPosition ]) => {
    const { seatID } = generateBoardingPass(rowPosition, columnPosition);

    return seatID > highestSeatID ? seatID : highestSeatID;
  }, 0);
}

type Positions = [string, string][];

export function partTwo(positions: Positions): number {
  const seatIDs = positions
    .map(position => generateBoardingPass(...position).seatID)
    .sort((idA, idB) => idA - idB);

  let selectedSeatID = seatIDs[0];

  for (const seatID of seatIDs.slice(1)) {
    if (seatID - selectedSeatID > 1) break;
    selectedSeatID = seatID;
  }

  return selectedSeatID + 1;
}

export function generateBoardingPass(rowPosition: string, columnPosition: string): BoardingPass {
  const row = getPositionAt(rowPosition, "rows");
  const column = getPositionAt(columnPosition, "columns");
  const seatID = (row * 8) + column;

  return { row, column, seatID };
}

export function parse(input: string): Positions {
  return input
    .split("\n")
    .map(position => (seatPattern.exec(position) || []).slice(1, 3)) as Positions;
}

function getPositionAt(positions: string, start: keyof typeof capacities) {
  const upperCharacter: UpperCharacters = start === "rows" ? "B" : "R";
  let lowerOffset = 0;
  let position = capacities[start] + 1;

  for (const rowPosition of positions) {
    position /= 2;
    if (rowPosition === upperCharacter) lowerOffset += position;
  }

  return position + lowerOffset - 1;
}

export interface BoardingPass {
  row: number;
  column: number;
  seatID: number;
}

type PositionCharacters = "F" | "B" | "R" | "L";
type UpperCharacters = Exclude<PositionCharacters, "F" | "L">;