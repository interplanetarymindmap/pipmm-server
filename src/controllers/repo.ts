import Mind from "./mind";
import * as fs from "fs";

export default class Repo {
  static minds: { [mid: string]: Mind };

  static loadMind(mid: string) {
    const path = "~/dev/ipmmRepo/repo.json";
    try {
      if (fs.existsSync(path)) {
        //console.log("Config already exists at " + configPath);
        let data = JSON.parse(fs.readFileSync(path, "utf8"));

        Repo.minds[mid] = new Mind(data);
        console.log("Mind loaded");
      }
      {
        console.log("Repo: " + path + " couldn't be found");
      }
    } catch (e) {
      console.log(e);
    }
  }

  static getIid(mid: string, iid: string) {
    if (Repo.minds[mid]) {
      return Repo.minds[mid].getIid(iid);
    } else {
      return { iid: iid, error: "Mid not found" };
    }
  }
}
