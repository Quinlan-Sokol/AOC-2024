import { readFileSync } from "fs";

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

interface Robot {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const input = readFileSync("input14.txt", "utf-8");

const width = 101;
const height = 103;

const printGrid = (robots: Robot[]) => {
  const grid = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => "░"),
  );
  for (const robot of robots) {
    grid[robot.y][robot.x] = "▓";
  }
  console.log(grid.map((row) => row.join("")).join("\n"));
};

const proximity = (robots: Robot[]) => {
  let distances = 0;
  for (let i = 0; i < robots.length; i++) {
    for (let j = 0; j < robots.length; j++) {
      distances += Math.sqrt(
        (robots[i].x - robots[j].x) ** 2 + (robots[i].y - robots[j].y) ** 2,
      );
    }
  }
  return distances / robots.length ** 2;
};

const robots: Robot[] = [];
for (const line of input.split("\n")) {
  robots.push({
    x: parseInt(line.split(" ")[0].split("=")[1].split(",")[0]),
    y: parseInt(line.split(" ")[0].split("=")[1].split(",")[1]),
    vx: parseInt(line.split(" ")[1].split("=")[1].split(",")[0]),
    vy: parseInt(line.split(" ")[1].split("=")[1].split(",")[1]),
  });
}

let minProximity = Infinity;
for (let k = 0; k < 100000; k++) {
  for (const robot of robots) {
    robot.x = mod(robot.x + robot.vx, width);
    robot.y = mod(robot.y + robot.vy, height);
  }
  const p = proximity(robots);
  if (p < minProximity) {
    minProximity = p;
    console.log(`After ${k + 1} seconds:`);
    console.log("Proximity:", p);
    printGrid(robots);
    console.log();
  }
}

const halfWidth = Math.floor(width / 2);
const halfHeight = Math.floor(height / 2);
const q1 = robots.filter(({ x, y }) => x < halfWidth && y < halfHeight).length;
const q2 = robots.filter(({ x, y }) => x > halfWidth && y < halfHeight).length;
const q3 = robots.filter(({ x, y }) => x < halfWidth && y > halfHeight).length;
const q4 = robots.filter(({ x, y }) => x > halfWidth && y > halfHeight).length;
console.log("Part 1:", q1 * q2 * q3 * q4);
