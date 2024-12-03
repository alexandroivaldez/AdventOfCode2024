import * as fs from "fs";
import * as readline from "readline";

async function processFile(filePath: string): Promise<void> {
  const fileStream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const leftColumn: number[] = [];
  const rightColumn: number[] = [];

  for await (const line of rl) {
    const columns = line.trim().split(/\s+/);
    leftColumn.push(parseInt(columns[0], 10));
    rightColumn.push(parseInt(columns[1], 10));
  }

  leftColumn.sort((a, b) => a - b);
  rightColumn.sort((a, b) => a - b);

  const totalDifference = leftColumn.reduce((sum, leftValue, i) => {
    const rightValue = rightColumn[i];
    const difference = Math.abs(leftValue - rightValue);
    return sum + difference;
  }, 0);

  console.log("Total Difference:", totalDifference);
}

processFile("src/input.txt").catch(console.error);
