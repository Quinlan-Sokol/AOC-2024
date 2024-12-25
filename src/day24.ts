import { readFileSync } from "fs";

const input = readFileSync("input24.txt", "utf-8");
const [p1, p2] = input.split("\n\n");

type GateType = "AND" | "OR" | "XOR";
interface Gate {
  type: GateType;
  input1ID: string;
  input2ID: string;
  outputID: string;
  inputs: number[];
  output: number | undefined;
}

const processGate = (type: GateType, inputs: [number, number]): number => {
  switch (type) {
    case "AND":
      return inputs[0] & inputs[1];
    case "OR":
      return inputs[0] | inputs[1];
    case "XOR":
      return inputs[0] ^ inputs[1];
  }
};

const gates: Gate[] = [];
const inputIDToGates: Record<string, Gate[]> = {};
for (const line of p2.split("\n")) {
  const parts = line.split(" ");
  const gate: Gate = {
    type: parts[1] as GateType,
    input1ID: parts[0],
    input2ID: parts[2],
    outputID: parts[4],
    inputs: [],
    output: undefined,
  };
  gates.push(gate);
  if (inputIDToGates[gate.input1ID] === undefined) {
    inputIDToGates[gate.input1ID] = [];
  }
  inputIDToGates[gate.input1ID].push(gate);
  if (inputIDToGates[gate.input2ID] === undefined) {
    inputIDToGates[gate.input2ID] = [];
  }
  inputIDToGates[gate.input2ID].push(gate);
}

const updateGate = (gate: Gate, input: number) => {
  gate.inputs.push(input);
  if (gate.inputs.length < 2) return;
  gate.output = processGate(gate.type, gate.inputs as [number, number]);
  const gatesToUpdate = inputIDToGates[gate.outputID];
  if (!gatesToUpdate) return;
  for (const gateToUpdate of gatesToUpdate) {
    updateGate(gateToUpdate, gate.output);
  }
};

for (const line of p1.split("\n")) {
  const inputID = line.split(": ")[0];
  const value = parseInt(line.split(": ")[1]);
  const gatesToUpdate = inputIDToGates[inputID];
  if (!gatesToUpdate) continue;
  for (const gate of gatesToUpdate) {
    updateGate(gate, value);
  }
}

console.log(
  parseInt(
    gates
      .filter((gate) => gate.outputID[0] === "z")
      .sort((g1, g2) => g1.outputID.localeCompare(g2.outputID))
      .map((gate) => gate.output)
      .reverse()
      .join(""),
    2
  )
);

for (const gate of gates) {
  if (gate.type === "OR") {
    const inputGates = gates.filter(
      (g) => g.outputID === gate.input1ID || g.outputID === gate.input2ID
    );
    if (inputGates.length !== 2 || inputGates.some((g) => g.type !== "AND")) {
      // console.log(inputGates.filter((g) => g.type !== "AND"));
    }
    const outputGates = inputIDToGates[gate.outputID] ?? [];
    if (
      outputGates.length !== 2 ||
      !(
        (outputGates[0].type === "AND" && outputGates[1].type === "XOR") ||
        (outputGates[0].type === "XOR" && outputGates[1].type === "AND")
      )
    ) {
      // console.log(outputGates);
    }
  } else if (gate.type === "AND") {
    const outputGates = inputIDToGates[gate.outputID] ?? [];
    if (outputGates.length !== 1 || outputGates[0].type !== "OR") {
      // console.log(outputGates);
    }
    const inputGates = gates.filter(
      (g) => g.outputID === gate.input1ID || g.outputID === gate.input2ID
    );
    if (inputGates.length !== 2 && inputGates.length !== 0) {
      // console.log(outputGates);
    } else if (
      inputGates.length === 2 &&
      !(
        (inputGates[0].type === "OR" && inputGates[1].type === "XOR") ||
        (inputGates[0].type === "XOR" && inputGates[1].type === "OR")
      )
    ) {
      // console.log(inputGates);
    }
  }
}
