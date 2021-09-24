import Mind from "./mind";
import * as fs from "fs";
import Utils from "./utils";
import CidsResponse, { MindRepo, NoteWrap } from "./types";

export default class Repo {
  static minds: { [mid: string]: Mind } = {};

  static loadLocalMind(mid: string) {
    const path = "~/dev/ipmmRepo/repo.json";
    try {
      let fullPath = Utils.resolveHome(path);
      if (fs.existsSync(fullPath)) {
        //console.log("Config already exists at " + configPath);
        let data: { [iid: string]: NoteWrap } = JSON.parse(fs.readFileSync(fullPath, "utf8"));

        Repo.minds[mid] = new Mind(data);
        console.log("Mind loaded");
      } else {
        console.log("Repo: " + fullPath + " couldn't be found");
      }
    } catch (e) {
      console.log(e);
    }
  }

  static loadMind(mid: string, mindRepo: MindRepo) {
    try {
      Repo.minds[mid] = new Mind(mindRepo);
      console.log("Mind loaded");
    } catch (e) {
      console.log(e);
    }
  }

  static getCidsResponse(iids: string[]): CidsResponse {
    let cids: { [iid: string]: string } = {};
    let blocks: { [cid: string]: any } = {};

    for (let iid of iids) {
      if (Repo.minds["x"]) {
        let noteWrap = Repo.minds["x"].getNoteWrap(iid);
        cids[iid] = noteWrap.cid;
        blocks[noteWrap.cid] = noteWrap.block;
      }
    }

    const cidsResponse = new CidsResponse(cids, blocks);
    return cidsResponse;
  }
}
