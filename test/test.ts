import path from "path";
import fs from "fs/promises";
import { map2source } from "../src/map2source";
async function t() {
  const temp = await fs.readFile(path.resolve(__dirname, "main.js.map"), "utf8");

  map2source(temp);
};

t()
