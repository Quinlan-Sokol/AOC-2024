import { readFileSync } from "fs";

const input = readFileSync("input4.txt", "utf-8");

const grid = input
  .split("\n")
  .map((line) => Array.from(line).filter((c) => c !== "\r"));

let part1 = 0;
for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[y].length; x++) {
    const c = grid[y][x];
    if (c === "X") {
      for (const dir of [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
        [1, 1],
        [-1, -1],
        [1, -1],
        [-1, 1],
      ]) {
        let posX = x;
        let posY = y;
        const [dx, dy] = dir;
        for (let k = 0; k < 4; k++) {
          if (grid?.[posY]?.[posX] !== "XMAS"[k]) {
            break;
          }
          posX += dx;
          posY += dy;
          if (k === 3) {
            part1++;
          }
        }
      }
    }
  }
}
console.log("Part 1:", part1);

let part2 = 0;
for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[y].length; x++) {
    const c = grid[y][x];
    if (c === "A") {
      const tl = grid?.[y - 1]?.[x - 1];
      const tr = grid?.[y - 1]?.[x + 1];
      const bl = grid?.[y + 1]?.[x - 1];
      const br = grid?.[y + 1]?.[x + 1];
      if (
        (tl == "M" && tr == "M" && bl === "S" && br == "S") ||
        (tl == "S" && tr == "S" && bl === "M" && br == "M") ||
        (tl == "M" && tr == "S" && bl === "M" && br == "S") ||
        (tl == "S" && tr == "M" && bl === "S" && br == "M")
      ) {
        part2++;
      }
    }
  }
}
console.log("Part 2:", part2);
