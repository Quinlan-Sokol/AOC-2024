import { readFileSync } from "fs";

const parts = readFileSync("input25.txt", "utf-8").split("\n\n");
const locks: [number, number, number, number, number][] = [];
const keys: [number, number, number, number, number][] = [];
parts.forEach((part) => {
  const isLock = part[0] === "#";
  const heights: [number, number, number, number, number] = [
    -1, -1, -1, -1, -1,
  ];
  part.split("\n").forEach((line) => {
    line.split("").forEach((char, index) => {
      if (char === "#") {
        heights[index] += 1;
      }
    });
  });
  if (isLock) {
    locks.push(heights);
  } else {
    keys.push(heights);
  }
});

let count = 0;
for (const key of keys) {
  for (const lock of locks) {
    if (key.every((keyHeight, index) => keyHeight + lock[index] <= 5)) {
      count += 1;
    }
  }
}

console.log(count);
