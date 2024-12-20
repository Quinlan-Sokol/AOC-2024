import { readFileSync } from "fs";

const reports = readFileSync("input2.txt", "utf-8")
  .split("\n")
  .map((line) => line.split(" ").map(Number));

const isValid = (report: number[]) => {
  const cond1 = report
    .slice(1)
    .map((num, i) => num - report[i])
    .every((diff) => diff >= 0);
  const cond2 = report
    .slice(1)
    .map((num, i) => num - report[i])
    .every((diff) => diff <= 0);
  const cond3 = report
    .slice(1)
    .map((num, i) => num - report[i])
    .every((diff) => Math.abs(diff) >= 1 && Math.abs(diff) <= 3);
  return (cond1 || cond2) && cond3;
};

let part1 = reports.map(isValid).filter(Boolean).length;
console.log("Part 1:", part1);

let part2 = reports
  .map((report) =>
    Array.from(Array(report.length), (_, i) =>
      report.slice(0, i).concat(report.slice(i + 1)),
    ).some(isValid),
  )
  .filter(Boolean).length;
console.log("Part 2:", part2);
