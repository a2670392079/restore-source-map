import fs from "fs/promises";
import path from "path";

const MATCH_MAP = /\.map$/iu;
const MATCH_CODE = /\.(js|css)$/iu;
const FIND_SOURCE_FILE = /\/\/#\s*sourceMappingURL=([.\w]+map)/iu;
const FIND_SOURCE_BASE64 =
  /\/\*?\/?#\s*sourceMappingURL=([.\w\-/=;:]*)base64,([\w]+=)/iu;
const FIND_SOURCE_UENC =
  /\/\*?\/?#\s*sourceMappingURL=([.\w\-/=;:]+),([;:,.\-\w%]+)/iu;

const findMap = async (filepath: string, callback?: (evt: Event) => void) => {
  const input = await fs.readFile(filepath, "utf8");

  if (filepath.match(MATCH_MAP)) {
    return input;
  } else if (filepath.match(MATCH_CODE)) {
    if (input.match(FIND_SOURCE_BASE64)) {
      const sourceMappingMatch = FIND_SOURCE_BASE64.exec(input);
      if (sourceMappingMatch && sourceMappingMatch.length > 2) {
        const buf = Buffer.from(sourceMappingMatch[2], "base64");

        return buf.toString("utf8");
      }
    } else if (input.match(FIND_SOURCE_UENC)) {
      const sourceMappingMatch = FIND_SOURCE_UENC.exec(input);
      if (sourceMappingMatch && sourceMappingMatch.length > 2) {
        const buf = Buffer.from(sourceMappingMatch[2], "ascii");

        return buf.toString("utf8");
      }
    } else if (input.match(FIND_SOURCE_FILE)) {
      const sourceMappingMatch = FIND_SOURCE_FILE.exec(input);
      if (sourceMappingMatch && sourceMappingMatch.length > 1) {
      }

      // Since the sourceMappingURL is relative, try to find it from the same folder
      const mapFile = path.join(
        path.dirname(filepath),
        sourceMappingMatch?.[1] || ""
      );
      try {
        await fs.access(mapFile);
      } catch (error) {
        return false;
      }

      return await fs.readFile(mapFile, "utf8");
    }
  }

  return false;
};
