import { readFileSync } from "fs";

const input = readFileSync("input20.txt", "utf-8");
const grid = input.split("\n").map((line) => line.split(""));

const directions = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

const start = [-1, -1];
const end = [-1, -1];
grid.forEach((row, y) => {
  row.forEach((cell, x) => {
    if (cell === "S") {
      start[0] = x;
      start[1] = y;
    } else if (cell === "E") {
      end[0] = x;
      end[1] = y;
    }
  });
});

const origMap = new Map<string, number>();
const firstPass = (
  pos: number[],
  picoseconds: number,
  visited: Set<string> = new Set<string>(),
) => {
  const [x, y] = pos;
  visited.add(`${x},${y}`);
  origMap.set(`${x},${y}`, picoseconds);
  if (x === end[0] && y === end[1]) {
    return picoseconds;
  }
  let minPico = Infinity;
  for (const [dx, dy] of directions) {
    const nx = x + dx;
    const ny = y + dy;
    if (!grid?.[ny]?.[nx]) continue;
    if (visited.has(`${nx},${ny}`)) continue;
    if (grid[ny][nx] === "#") continue;
    minPico = Math.min(
      minPico,
      firstPass([nx, ny], picoseconds + 1, new Set(visited)),
    );
  }
  return minPico;
};
firstPass(start, 0);

const origPico = origMap.get(`${end[0]},${end[1]}`)!;
const map = new Map<number, number>();

const cheatDis = 20;
for (const [k1, v1] of origMap.entries()) {
  for (let dx = -cheatDis; dx <= cheatDis; dx++) {
    for (let dy = -cheatDis; dy <= cheatDis; dy++) {
      if (Math.abs(dx) + Math.abs(dy) > cheatDis) continue;
      const nx = Number(k1.split(",")[0]) + dx;
      const ny = Number(k1.split(",")[1]) + dy;
      const k2 = `${nx},${ny}`;
      if (!origMap.has(k2)) continue;
      const v2 = origMap.get(k2)!;
      const totalPico = v1 + (origPico - v2) + Math.abs(dx) + Math.abs(dy);
      if (origPico - totalPico < 0) continue;
      map.set(origPico - totalPico, (map.get(origPico - totalPico) || 0) + 1);
    }
  }
}

console.log(
  [...map.entries()].filter(([k, _]) => k >= 100).reduce((a, b) => a + b[1], 0),
);
