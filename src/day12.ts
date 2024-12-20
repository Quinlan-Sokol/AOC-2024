import { readFileSync } from "fs";

const input = readFileSync("input12.txt", "utf-8");
const grid = input.split("\n").map((line) => line.split(""));
const gridCopy = grid.map((row) => row.slice());

const floodRegion = (
  x: number,
  y: number,
  plant: string,
  region: Set<string>,
) => {
  if (!gridCopy?.[y]?.[x]) return;
  if (gridCopy[y][x] != plant) return;
  region.add(`${x},${y}`);
  gridCopy[y][x] = ".";
  floodRegion(x + 1, y, plant, region);
  floodRegion(x - 1, y, plant, region);
  floodRegion(x, y + 1, plant, region);
  floodRegion(x, y - 1, plant, region);
};

const getPerimeter = (region: Set<string>, plant: string): Set<string> => {
  const perimeter = new Set<string>();
  for (const point of region) {
    const [x, y] = point.split(",").map(Number);
    if (grid[y + 1]?.[x] !== plant) perimeter.add(`${x},${y},+y`);
    if (grid[y - 1]?.[x] !== plant) perimeter.add(`${x},${y},-y`);
    if (grid[y]?.[x + 1] !== plant) perimeter.add(`${x},${y},+x`);
    if (grid[y]?.[x - 1] !== plant) perimeter.add(`${x},${y},-x`);
  }
  return perimeter;
};

const getSides = (perimeter: Set<string>): number => {
  const dirToPerp: Record<string, [number, number]> = {
    "+x": [0, 1],
    "-x": [0, 1],
    "+y": [1, 0],
    "-y": [1, 0],
  };
  let total = 0;
  ["+x", "-x", "+y", "-y"].forEach((dir) => {
    const [dx, dy] = dirToPerp[dir];
    const maybeSide = [...perimeter].filter(
      (point) => point.split(",")[2] == dir,
    );
    while (maybeSide.length) {
      const [ox, oy] = maybeSide.pop()!.split(",").slice(0, 2).map(Number);
      let x = ox;
      let y = oy;
      while (maybeSide.includes(`${x + dx},${y + dy},${dir}`)) {
        maybeSide.splice(maybeSide.indexOf(`${x + dx},${y + dy},${dir}`), 1);
        x += dx;
        y += dy;
      }
      x = ox;
      y = oy;
      while (maybeSide.includes(`${x - dx},${y - dy},${dir}`)) {
        maybeSide.splice(maybeSide.indexOf(`${x - dx},${y - dy},${dir}`), 1);
        x -= dx;
        y -= dy;
      }
      total++;
    }
  });
  return total;
};

let part1 = 0;
let part2 = 0;
for (let y = 0; y < gridCopy.length; y++) {
  for (let x = 0; x < gridCopy[y].length; x++) {
    if (gridCopy[y][x] != ".") {
      const region = new Set<string>();
      floodRegion(x, y, gridCopy[y][x], region);
      const area = region.size;
      const perimeter = getPerimeter(region, grid[y][x]);
      const sides = getSides(perimeter);
      part1 += area * perimeter.size;
      part2 += area * sides;
    }
  }
}
console.log("Part 1:", part1);
console.log("Part 2:", part2);
