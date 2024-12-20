import { readFileSync } from "fs";

const dirMap: Record<string, [number, number]> = {
  "^": [0, -1],
  ">": [1, 0],
  v: [0, 1],
  "<": [-1, 0],
};

const input = readFileSync("input15.txt", "utf-8");
const grid = input
  .split("\n\n")[0]
  .split("\n")
  .map((row) => row.split(""));
const moves = input
  .split("\n\n")[1]
  .split("\n")
  .flatMap((move) => move.split(""));

let pos: [number, number] = [-1, -1];
for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[y].length; x++) {
    if (grid[y][x] === "@") {
      pos = [x, y];
    }
  }
}

const attemptPush = (pos: [number, number], dir: [number, number]): boolean => {
  const [x, y] = pos;
  const [dx, dy] = dir;
  if (!grid?.[y]?.[x] || grid[y + dy][x + dx] === "#") {
    return false;
  }
  if (grid[y + dy][x + dx] === ".") {
    grid[y + dy][x + dx] = grid[y][x];
    grid[y][x] = ".";
    return true;
  }
  const canPush = attemptPush([x + dx, y + dy], dir);
  if (canPush) {
    grid[y + dy][x + dx] = grid[y][x];
    grid[y][x] = ".";
  }
  return canPush;
};

for (const move of moves) {
  const [dx, dy] = dirMap[move];
  const [x, y] = pos;
  if (grid[y + dy][x + dx] === ".") {
    pos = [x + dx, y + dy];
    grid[y + dy][x + dx] = "@";
    grid[y][x] = ".";
  } else if (grid[y + dy][x + dx] === "#") {
  } else {
    const canPush = attemptPush(pos, dirMap[move]);
    if (canPush) {
      pos = [x + dx, y + dy];
      grid[y + dy][x + dx] = "@";
      grid[y][x] = ".";
    }
  }
}

let part1 = 0;
for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[y].length; x++) {
    if (grid[y][x] === "O") {
      part1 += 100 * y + x;
    }
  }
}
console.log("Part 1:", part1);
