import { readFileSync } from "fs";

const dirs: [number, number][] = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
] as const;

interface Point {
  x: number;
  y: number;
}

interface Node {
  pos: Point;
  dist: number;
  path: Array<Point>;
  prevDir: [number, number];
}

const input = readFileSync("input16.txt", "utf-8");
const grid = input.split("\n").map((line) => line.split(""));

const start: Point = { x: -1, y: -1 };
const end: Point = { x: -1, y: -1 };
for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[y].length; x++) {
    if (grid[y][x] === "S") {
      start.x = x;
      start.y = y;
    }
    if (grid[y][x] === "E") {
      end.x = x;
      end.y = y;
    }
  }
}

const insert = (arr: Node[], node: Node) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].dist > node.dist) {
      arr.splice(i, 0, node);
      return;
    }
  }
  arr.push(node);
};

const dijkstra = (grid: string[][], start: Point, end: Point) => {
  const distance: Map<[number, number], number[][]> = new Map();
  dirs.forEach((dir) => {
    distance.set(
      dir,
      grid.map((row) => row.map(() => Infinity)),
    );
  });
  distance.get(dirs[0])![start.y][start.x] = 0;
  const queue: Node[] = [
    { pos: start, dist: 0, path: [start], prevDir: dirs[0] },
  ];
  let paths: Point[][] = [];

  let part1 = Infinity;
  while (queue.length > 0) {
    const { pos, dist, path, prevDir } = queue.shift()!;

    if (dist > distance.get(prevDir)![pos.y]![pos.x]!) {
      continue;
    } else {
      distance.get(prevDir)![pos.y]![pos.x] = dist;
    }

    if (pos.x === end.x && pos.y === end.y) {
      if (dist <= part1) {
        part1 = dist;
        paths.push(path);
      }
      continue;
    }

    for (const dir of dirs) {
      if (dir[0] === -prevDir[0] && dir[1] === -prevDir[1]) continue;
      const newPos = { x: pos.x + dir[0], y: pos.y + dir[1] };
      if (grid[newPos.y][newPos.x] === "#") continue;
      const cost = dir === prevDir ? 1 : 1001;
      if (dist + cost < distance.get(dir)![newPos.y][newPos.x]) {
        insert(queue, {
          pos: newPos,
          dist: dist + cost,
          path: [...path, pos],
          prevDir: dir,
        });
      }
    }
  }

  return {
    part1,
    part2:
      new Set(paths.flatMap((path) => path.map((p) => `${p.x},${p.y}`))).size +
      1,
  };
};

const { part1, part2 } = dijkstra(grid, start, end);
console.log("Part 1:", part1);
console.log("Part 2:", part2);
