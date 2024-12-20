import { readFileSync } from "fs";

const lines = readFileSync("input19.txt", "utf-8").split("\n");

const patterns = lines[0].split(", ");
const designs = lines.slice(2);
const memo = new Map<string, number>();

const countWays = (design: string): number => {
  if (design == "") return 1;
  if (memo.has(design)) return memo.get(design)!;
  let ways = 0;
  for (const p of patterns) {
    65;
    if (design.startsWith(p)) {
      ways += countWays(design.slice(p.length));
    }
  }
  memo.set(design, ways);
  return ways;
};

console.log("Part 1: ", designs.filter(countWays).length);
console.log(
  "Part 2: ",
  designs.map(countWays).reduce((a, b) => a + b, 0),
);
