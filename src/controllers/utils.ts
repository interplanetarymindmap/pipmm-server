import * as path from "path";
import * as fs from "fs";
import { NoteWrap } from "./types";

export default class Utils {
  static resolveHome = (filepath: string) => {
    if (filepath[0] === "~") {
      if (process.env.HOME)
        return path.join(process.env.HOME, filepath.slice(1));
      else
        throw new Error(
          "process.env.HOME does not exist. Unable to resolve ~ for " + filepath
        );
    }
    return filepath;
  };

  static toMapOfNotes(obj: any): Map<String, any> {
    let map = new Map<String, any>();
    for (var iid in obj) {
      map.set(iid, obj[iid]);
    }
    return map;
  }

  static mapToObj(map: Map<String, any>) {
    return Object.fromEntries(map);
  }
}
