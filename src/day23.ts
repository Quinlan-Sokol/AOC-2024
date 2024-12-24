import { readFileSync } from "fs";

const lines = readFileSync("input23.txt", "utf-8").split("\n");
const allNodes = [...new Set<string>(lines.flatMap((line) => line.split("-")))];

const adjArray = new Array(allNodes.length)
  .fill(0)
  .map(() => new Array(allNodes.length).fill(0));
lines.forEach((line) => {
  const [from, to] = line.split("-");
  const fromIndex = allNodes.indexOf(from);
  const toIndex = allNodes.indexOf(to);
  adjArray[fromIndex][toIndex] = 1;
  adjArray[toIndex][fromIndex] = 1;
});

const triangles = new Set<string>();
for (let i = 0; i < allNodes.length; i++) {
  if (allNodes[i][0] !== "t") continue;
  for (let j = 0; j < allNodes.length; j++) {
    for (let k = 0; k < allNodes.length; k++) {
      if (adjArray[i][j] && adjArray[j][k] && adjArray[k][i]) {
        triangles.add([allNodes[i], allNodes[j], allNodes[k]].sort().join(""));
      }
    }
  }
}
console.log("Part 1:", triangles.size);

let maxClique: number[] = [];
for (let i = 0; i < allNodes.length; i++) {
  const clique = [i];
  const neighbors = adjArray[i]
    .map((val, index) => (val ? index : -1))
    .filter((val) => val !== -1);
  for (const neighbor of neighbors) {
    if (clique.every((node) => adjArray[node][neighbor])) {
      clique.push(neighbor);
    }
  }
  if (clique.length > maxClique.length) {
    maxClique = clique;
  }
}

console.log(
  "Part 2:",
  maxClique
    .map((i) => allNodes[i])
    .sort()
    .join(",")
);
