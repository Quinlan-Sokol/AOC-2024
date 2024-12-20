import { readFileSync } from "fs";

const input = readFileSync("input10.txt", "utf-8");
const grid = input.split("\n").map((row) => row.split("").map(Number));

const traverse = (
  x: number,
  y: number,
  visited: Set<string> = new Set(),
  part2: boolean = false,
): number => {
  visited.add(`${x},${y}`);
  if (grid[y][x] === 9) {
    return 1;
  }
  const cur = grid[y][x];
  let score = 0;
  for (let [dx, dy] of [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ]) {
    const nx = x + dx;
    const ny = y + dy;
    if (
      grid[ny]?.[nx] &&
      grid[ny][nx] === cur + 1 &&
      (part2 || !visited.has(`${nx},${ny}`))
    ) {
      score += traverse(nx, ny, visited, part2);
    }
  }
  return score;
};

let part1 = 0;
let part2 = 0;
for (let x = 0; x < grid[0].length; x++) {
  for (let y = 0; y < grid.length; y++) {
    if (grid[y][x] === 0) {
      part1 += traverse(x, y);
      part2 += traverse(x, y, new Set(), true);
    }
  }
}
console.log("Part 1:", part1);
console.log("Part 2:", part2);
