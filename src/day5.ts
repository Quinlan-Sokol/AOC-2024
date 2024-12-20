import { readFileSync } from "fs";

const input = readFileSync("input5.txt", "utf-8");
const [first, second] = input.trim().split("\n\n");
const orderings = first.split("\n").map((ordering) => ordering.split("|"));
const pageUpdates = second
  .split("\n")
  .map((pageUpdate) => pageUpdate.split(","));

let part1 = 0;
let part2 = 0;
pageUpdates.forEach((pageUpdate) => {
  const sorted = Object.assign([], pageUpdate).sort((a, b) => {
    const ordering = orderings.find((ordering) => {
      return (
        (ordering[0] === a && ordering[1] === b) ||
        (ordering[0] === b && ordering[1] === a)
      );
    });
    if (ordering) {
      return ordering[0] === a ? -1 : 1;
    }
    return 0;
  });
  if (sorted.join("") === pageUpdate.join("")) {
    part1 += parseInt(pageUpdate[Math.floor(pageUpdate.length / 2)]);
  } else {
    part2 += parseInt(sorted[Math.floor(pageUpdate.length / 2)]);
  }
});

console.log("Part 1: ", part1);
console.log("Part 2: ", part2);
