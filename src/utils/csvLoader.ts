import fs from "fs";
import path from "path";

export const loadCSV = (filename: string): any[] => {
  const filePath = path.join(process.cwd(), "prisma", "csv", filename);
  const file = fs.readFileSync(filePath, "utf8");

  const [headerLine, ...lines] = file.split("\n").filter((l) => l.trim() !== "");

  const headers = headerLine.split(";").map((h) => h.trim());

  return lines.map((line) => {
    const values = line.split(";").map((v) => v.trim());
    return Object.fromEntries(headers.map((h, i) => [h, values[i]]));
  });
};