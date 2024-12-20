import { readFileSync } from "fs";
import { cloneDeep } from "lodash";

const lines = readFileSync("input7.txt", "utf-8").split("\n");

const solve = (
  result: number,
  nums: number[],
  part2: boolean = false,
): boolean => {
  if (nums.length === 1) {
    return nums[0] === result;
  }
  const first = nums.shift()!;
  const second = nums.shift()!;
  return (
    solve(result, [first + second, ...nums], part2) ||
    solve(result, [first * second, ...nums], part2) ||
    (part2 &&
      solve(result, [parseInt(String(first) + String(second)), ...nums], part2))
  );
};

let part1 = 0;
let part2 = 0;
lines.forEach((line) => {
  const result = parseInt(line.split(": ")[0]);
  const nums = line.split(": ")[1].split(" ").map(Number);
  if (solve(result, cloneDeep(nums))) {
    part1 += result;
  }
  if (solve(result, cloneDeep(nums), true)) {
    part2 += result;
  }
});
console.log("Part 1:", part1);
console.log("Part 2:", part2);
