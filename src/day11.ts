import { readFileSync } from "fs";

const input = readFileSync("input11.txt", "utf-8");
const rocks = input.split(" ").map(Number);

const seen = new Map<string, number>();

const applyRule = (rock: number, depth: number = 0): number => {
  if (depth === 75) {
    return 1;
  }

  let result = 0;
  if (seen.has(`${rock}, ${depth}`)) {
    result = seen.get(`${rock}, ${depth}`)!;
  } else if (rock === 0) {
    result = applyRule(1, depth + 1);
  } else {
    const str = String(rock);
    if (str.length % 2 === 0) {
      result =
        applyRule(parseInt(str.slice(0, str.length / 2)), depth + 1) +
        applyRule(parseInt(str.slice(str.length / 2)), depth + 1);
    } else {
      result = applyRule(rock * 2024, depth + 1);
    }
  }
  seen.set(`${rock}, ${depth}`, result);
  return result;
};

let total = 0;
for (const rock of rocks) {
  total += applyRule(rock);
}
console.log(total);
