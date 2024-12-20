import { readFileSync } from "fs";

const lines = readFileSync("input17.txt", "utf-8").split("\n");

let regA = parseInt(lines[0].split(": ")[1]);
let regB = parseInt(lines[1].split(": ")[1]);
let regC = parseInt(lines[2].split(": ")[1]);
const program = lines[4].split(": ")[1].split(",").map(Number);

const getCombo = (operand: number) => {
  if (operand === 4) {
    return regA;
  } else if (operand === 5) {
    return regB;
  } else if (operand === 6) {
    return regC;
  }
  return operand;
};

let i = 0;
const out: number[] = [];
while (0 <= i && i < program.length - 1) {
  const opcode = program[i];
  const operand = program[i + 1];
  switch (opcode) {
    case 0:
      regA = Math.floor(regA / 2 ** getCombo(operand));
      break;
    case 1:
      regB = regB ^ operand;
      break;
    case 2:
      regB = getCombo(operand) % 8;
      break;
    case 3:
      if (regA !== 0) {
        i = operand;
        i -= 2;
      }
      break;
    case 4:
      regB = regB ^ regC;
      break;
    case 5:
      out.push(getCombo(operand) % 8);
      break;
    case 6:
      regB = Math.floor(regA / 2 ** getCombo(operand));
      break;
    case 7:
      regC = Math.floor(regA / 2 ** getCombo(operand));
      break;
  }
  i += 2;
}
console.log(out.join(","));

let n = 0;
while (true) {
  if (n % 10000 === 0) {
    console.log(n);
  }
  let temp = n;
  let valid = true;
  for (const ins of [0, 3, 5, 4, 3, 0]) {
    temp = Math.floor(temp / 2 ** 3);
    if (temp % 8 !== ins) {
      valid = false;
      break;
    }
  }
  if (valid) {
    console.log(n);
    break;
  }
  n++;
}
