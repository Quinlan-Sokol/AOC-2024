import { readFileSync } from "fs";

const pairs = readFileSync("src/input1.txt", "utf-8")
  .split("\n")
  .map((line) => line.split("   ").map(Number));
const { first, second } = pairs.reduce(
  ({ first, second }, cur) => {
    first.push(cur[0]);
    second.push(cur[1]);
    return { first, second };
  },
  { first: [] as number[], second: [] as number[] },
);
first.sort();
second.sort();
const part1 = first
  .map((k, i) => Math.abs(k - second[i]))
  .reduce((a, b) => a + b, 0);
console.log("Part 1:", part1);

let part2 = 0;
first.forEach((n) => {
  part2 += n * second.filter((k) => k === n).length;
});
console.log("Part 2:", part2);
