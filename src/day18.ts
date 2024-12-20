import { readFileSync } from "fs";

const lines = readFileSync("input18.txt", "utf-8").split("\n");
const gridSize = 71;
const grid1: string[][] = Array.from({ length: gridSize }, () =>
  Array(gridSize).fill("."),
);
const grid2: string[][] = Array.from({ length: gridSize }, () =>
  Array(gridSize).fill("."),
);

interface Node {
  x: number;
  y: number;
  distance: number;
}

const bfs = (startX: number, startY: number, grid: string[][]) => {
  const queue: Node[] = [{ x: startX, y: startY, distance: 0 }];
  const visited: boolean[][] = Array.from({ length: gridSize }, () =>
    Array(gridSize).fill(false),
  );
  visited[startY][startX] = true;

  while (queue.length > 0) {
    const { x, y, distance } = queue.shift()!;
    if (x === gridSize - 1 && y === gridSize - 1) return distance;
    for (const [dx, dy] of [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ]) {
      const nx = x + dx;
      const ny = y + dy;
      if (!grid?.[ny]?.[nx]) continue;
      if (visited[ny][nx]) continue;
      if (grid[ny][nx] === "#") continue;
      visited[ny][nx] = true;
      queue.push({ x: nx, y: ny, distance: distance + 1 });
    }
  }
  return -1;
};

const limit = 1024;
let part2: string | undefined = undefined;
for (let i = 0; i < lines.length; i++) {
  const [x, y] = lines[i].split(",").map(Number);
  if (i < limit) {
    grid1[y][x] = "#";
  }
  grid2[y][x] = "#";
  if (!part2 && bfs(0, 0, grid2) === -1) {
    part2 = `${x},${y}`;
  }
}

console.log("Part 1:", bfs(0, 0, grid1));
console.log("Part 2:", part2);
