import { readFileSync } from "fs";

const input = readFileSync("src/input9.txt", "utf-8");

let front = 0;
let back = input.length - 1;
let total = 0;
let backQueue: number[] = [];
let pos = 0;
while (front < back) {
  const frontBlocks = parseInt(input[front]);
  const frontEmpty = parseInt(input[front + 1]);
  for (let i = 0; i < frontBlocks; i++) {
    total += pos * Math.floor(front / 2);
    pos++;
  }
  front += 2;
  for (let i = 0; i < frontEmpty; i++) {
    if (backQueue.length > 0) {
      total += pos * backQueue.shift()!;
      pos++;
    } else {
      backQueue.push(
        ...Array(parseInt(input[back])).fill(Math.floor(back / 2)),
      );
      i--;
      back -= 2;
    }
  }
}
// sort out extra front blocks
for (let i = 0; i < parseInt(input[front]); i++) {
  total += pos * Math.floor(front / 2);
  pos++;
}
// handle remaining back queue
for (let e of backQueue) {
  total += pos * e;
  pos++;
}

console.log("Part 1: ", total);
