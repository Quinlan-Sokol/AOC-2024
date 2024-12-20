import { readFileSync } from "fs";

interface Space {
  id: number;
  pos: number;
  size: number;
}

const insertBlock = (arr: Space[], block: Space) => {
  let i = 0;
  while (i < arr.length && arr[i].pos < block.pos) {
    i++;
  }
  arr.splice(i, 0, block);
};

const input = readFileSync("input9.txt", "utf-8");

const blocks: Space[] = [];
const empties: Space[] = [];

let id = 0;
let pos = 0;
for (let i = 0; i < input.length; i += 2) {
  const numBlocks = parseInt(input[i]);
  const numEmpty = parseInt(input[i + 1] ?? "0");
  blocks.push({ id, pos, size: numBlocks });
  pos += numBlocks;
  if (numEmpty > 0) {
    empties.push({ id: -1, pos, size: numEmpty });
    pos += numEmpty;
  }
  id++;
}

const compactedBlocks: Space[] = [];
for (let i = blocks.length - 1; i >= 0; i--) {
  for (let j = 0; j <= empties.length; j++) {
    if (j === empties.length || empties[j].pos > blocks[i].pos) {
      compactedBlocks.push(blocks[i]);
      break;
    }
    if (empties[j].size >= blocks[i].size) {
      const newBlock = {
        id: blocks[i].id,
        pos: empties[j].pos,
        size: blocks[i].size,
      };
      const newEmpty = {
        id: -1,
        pos: empties[j].pos + blocks[i].size,
        size: empties[j].size - blocks[i].size,
      };
      compactedBlocks.push(newBlock);
      empties.splice(j, 1);
      if (newEmpty.size > 0) {
        insertBlock(empties, newEmpty);
      }
      break;
    }
  }
}

let total = 0;
for (const { id, pos, size } of compactedBlocks) {
  total += id * (size * pos + (size * (size - 1)) / 2);
}
console.log("Part 2:", total);
