import { readFileSync } from "fs";

const input = readFileSync("input3.txt", "utf-8");

const matches = [...input.matchAll(/mul\(\d+,\d+\)|do\(\)|don't\(\)/g)];
let part1 = 0;
let part2 = 0;
let valid = true;
for (const match of matches) {
  if (match[0] === "do()") {
    valid = true;
  } else if (match[0] === "don't()") {
    valid = false;
  } else {
    part1 += match[0]
      .slice(4, -1)
      .split(",")
      .map(Number)
      .reduce((a, b) => a * b);
    if (valid) {
      part2 += match[0]
        .slice(4, -1)
        .split(",")
        .map(Number)
        .reduce((a, b) => a * b);
    }
  }
}
console.log("Part 1:", part1);
console.log("Part 2:", part2);
