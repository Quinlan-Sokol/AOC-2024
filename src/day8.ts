import { readFileSync } from "fs";

interface Point {
  x: number;
  y: number;
}

const grid = readFileSync("input8.txt", "utf-8")
  .split("\n")
  .map((line) => line.split(""));

const antennas: Map<string, Point[]> = new Map();

for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[y].length; x++) {
    const c = grid[y][x];
    if (c === ".") {
      continue;
    }
    if (!antennas.has(c)) {
      antennas.set(c, []);
    }
    antennas.get(c)!.push({ x, y });
  }
}

const antinodes1: Set<string> = new Set();
const antinodes2: Set<string> = new Set();
for (let k of antennas.keys()) {
  const points = antennas.get(k)!;
  if (points.length > 1) {
    points.forEach((point) => {
      antinodes2.add(`${point.x},${point.y}`);
    });
  }
  for (let p1 of points!) {
    for (let p2 of points!) {
      if (p1 === p2) {
        continue;
      }
      const diffX = p1.x - p2.x;
      const diffY = p1.y - p2.y;
      let x = p1.x;
      let y = p1.y;
      let i = 0;
      while (grid[y + diffY]?.[x + diffX]) {
        x += diffX;
        y += diffY;
        if (i === 0) {
          antinodes1.add(`${x},${y}`);
        }
        i++;
        antinodes2.add(`${x},${y}`);
        grid[y][x] = "#";
      }
      i = 0;
      x = p2.x;
      y = p2.y;
      while (grid[y - diffY]?.[x - diffX]) {
        x -= diffX;
        y -= diffY;
        if (i === 0) {
          antinodes1.add(`${x},${y}`);
        }
        i++;
        antinodes2.add(`${x},${y}`);
        grid[y][x] = "#";
      }
    }
  }
}
console.log("Part 1:", antinodes1.size);
console.log("Part 2:", antinodes2.size);
