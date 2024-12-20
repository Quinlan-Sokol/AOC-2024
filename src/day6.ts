import { readFileSync } from "fs";
import { cloneDeep } from "lodash";

const input = readFileSync("input6.txt", "utf-8");
const grid = input.split("\n").map((line) => line.split(""));

type Direction = "up" | "down" | "left" | "right";
const dirToVec = {
  up: [0, -1],
  down: [0, 1],
  left: [-1, 0],
  right: [1, 0],
};

const nextDir = (dir: Direction): Direction => {
  return dir === "up"
    ? "right"
    : dir === "right"
      ? "down"
      : dir === "down"
        ? "left"
        : "up";
};

let start = [-1, -1];
let dir: Direction = "up";
grid.forEach((row, y) => {
  row.forEach((cell, x) => {
    if (cell === "^") {
      start = [x, y];
    }
  });
});

let part2 = 0;
const traverse = (
  pos: number[],
  dir: Direction,
  set: Set<string>,
  doObstacles = false,
) => {
  set.add(pos.map(String).join(",") + " " + dir);
  const newPos = [pos[0] + dirToVec[dir][0], pos[1] + dirToVec[dir][1]];
  if (!grid[newPos[1]]?.[newPos[0]]) {
    return;
  }
  if (set.has(newPos.map(String).join(",") + " " + dir)) {
    part2++;
    return;
  }
  if (grid[newPos[1]][newPos[0]] === "#") {
    traverse(
      [pos[0] + dirToVec[nextDir(dir)][0], pos[1] + dirToVec[nextDir(dir)][1]],
      nextDir(dir),
      set,
      doObstacles,
    );
  } else {
    if (
      doObstacles &&
      !(newPos[0] === start[0] && newPos[1] === start[1]) &&
      grid[newPos[1]][newPos[0]] === "." &&
      ![...set].find((e) => e.startsWith(newPos.map(String).join(",")))
    ) {
      grid[newPos[1]][newPos[0]] = "#";
      traverse(pos, nextDir(dir), cloneDeep(set), false);
      grid[newPos[1]][newPos[0]] = ".";
    }
    traverse(newPos, dir, set, doObstacles);
  }
};

const part1Set = new Set<string>();
traverse(start, dir, part1Set);
console.log("Part 1:", new Set([...part1Set].map((e) => e.split(" ")[0])).size);

const part2Set = new Set<string>();
traverse(start, dir, part2Set, true);
console.log("Part 2:", part2);
