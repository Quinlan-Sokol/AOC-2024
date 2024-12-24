import { readFileSync } from "fs";

const input = readFileSync("input22.txt", "utf-8");
const numbers = input.split("\n").map(Number);

const mod = (n: number, m: number) => ((n % m) + m) % m;

const map = new Map<string, number>();

const mix = (a: number, b: number) => a ^ b;
const prune = (n: number) => mod(n, 16777216);

for (let i = 0; i < numbers.length; i++) {
  const diffs: number[] = [];
  const seen = new Set<string>();
  let prev: number = numbers[i] % 10;
  for (let k = 0; k < 2000; k++) {
    const s1 = prune(mix(numbers[i], numbers[i] * 64));
    const s2 = prune(mix(s1, Math.floor(s1 / 32)));
    numbers[i] = prune(mix(s2, s2 * 2048));

    diffs.push((numbers[i] % 10) - prev);
    prev = numbers[i] % 10;
    if (diffs.length === 4) {
      const key = diffs.join(",");
      diffs.shift();
      if (seen.has(key)) continue;
      seen.add(key);
      map.set(key, (map.get(key) ?? 0) + prev);
    }
  }
}
console.log(
  "Part 1:",
  numbers.reduce((a, b) => a + b, 0)
);
console.log("Part 2:", [...map.entries()].sort((a, b) => b[1] - a[1])[0][1]);
