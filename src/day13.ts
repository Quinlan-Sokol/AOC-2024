import { readFileSync } from "fs";

const input = readFileSync("input13.txt", "utf-8");

let tokens = 0;
for (const block of input.split("\n\n")) {
  const ax = parseInt(
    block.split("\n")[0].split(": ")[1].split(", ")[0].slice(2),
  );
  const ay = parseInt(
    block.split("\n")[0].split(": ")[1].split(", ")[1].slice(2),
  );
  const bx = parseInt(
    block.split("\n")[1].split(": ")[1].split(", ")[0].slice(2),
  );
  const by = parseInt(
    block.split("\n")[1].split(": ")[1].split(", ")[1].slice(2),
  );
  const x =
    parseInt(block.split("\n")[2].split(": ")[1].split(", ")[0].slice(2)) +
    10000000000000;
  const y =
    parseInt(block.split("\n")[2].split(": ")[1].split(", ")[1].slice(2)) +
    10000000000000;

  if (ax * by - bx * ay === 0) {
    console.log("no inverse");
  } else {
    const det = 1 / (ax * by - bx * ay);
    const ca = Math.round(det * (by * x - bx * y));
    const cb = Math.round(det * (-ay * x + ax * y));

    if (ax * ca + bx * cb === x && ay * ca + by * cb === y) {
      tokens += 3 * ca + cb;
    }
  }
}

console.log(tokens);
