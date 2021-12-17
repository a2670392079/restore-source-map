import path from "path";
import SourceMap from "source-map";
import fs from "fs/promises";
import { constants, accessSync } from "fs";


const win32AndPosixBasename = (pathStr:string) => {
    if(pathStr.includes('\\')){
        return path.win32.basename(pathStr);
    }else{
        return path.posix.basename(pathStr);
    }
}

interface Map2SourceOptions {
  preserve?: boolean;
}

interface SaveSourceOpts {
  fileName: string;
  sourcePath?: string;
  fileType?: string;
  content: string;
}

const cleanFileName = (fileName = "") => {
  fileName = fileName.replace("//", "/");
  return (fileName.match(/[\w\-. /]+/giu) || []).join("");
};

function fsExistsSync(path: string) {
  try {
    accessSync(path, constants.F_OK);
  } catch (e) {
    return false;
  }
  return true;
}

const saveSource = async (opt: SaveSourceOpts, basePath?: string) => {
  const { content, fileName, sourcePath = "sources" } = opt;
  const paths = sourcePath
    .replace("//", "/")
    .split("/")
    .filter((s) => s);
  let tempPath = basePath ?? __dirname;
  try {
    for (let i = 0; i < paths.length; i++) {
      tempPath = tempPath + "/" + paths[i];
      if (!fsExistsSync(tempPath)) {
        await fs.mkdir(tempPath);
      }
    }
  } catch (e) {
    console.log(`file path create error:`, e);
  }
  console.log(sourcePath);
  const tempName = fileName.endsWith(".js") ? fileName : fileName + ".js";
  fs.writeFile(path.resolve(tempPath, tempName), content, "utf-8");
};

const PATH_REG = /(\w+:\/\/)([^/:]+)(:\d*)?([/s/S]*)/;
const getPath = (webpackPath: string) => {
  return path.dirname(webpackPath.replace("webpack://", ""));
};

const map2source = async (
  map: string,
  target?: string,
  opts?: Map2SourceOptions
) => {
  const { preserve = true } = opts ?? {};
  const consumer = await new SourceMap.SourceMapConsumer(map);
  //   const sources = new Array<SourceObj>(consumer.sources.length);
  // console.log(consumer);
  for (let i = 0; i < consumer.sources.length; i++) {
    const source = consumer.sources[i];
    console.log(source);
    const fileName = cleanFileName(win32AndPosixBasename(source));
    const content =
      consumer.sourceContentFor(source) ?? `// can not get source code`;
    const sourcePath = preserve ? getPath(source) : "";
    saveSource({ sourcePath, fileName, content }, target);
  }
};

export { map2source };
