import Mind from "./mind";
import * as fs from "fs";
import Utils from "./utils";
import CidsResponse, { NoteWrap } from "./types";

export default class Repo {
  static minds: { [mid: string]: Mind } = {};

  static loadLocalMind(mid: string) {
    const path = "~/dev/ipmmRepo/repo.json";
    try {
      let fullPath = Utils.resolveHome(path);
      if (fs.existsSync(fullPath)) {
        //console.log("Config already exists at " + configPath);
        // let data: { [iid: string]: NoteWrap } = JSON.parse(fs.readFileSync(fullPath, "utf8"));

        let data: Map<String, NoteWrap> = JSON.parse(fs.readFileSync(fullPath, "utf8"));

        Repo.minds[mid] = new Mind(data);
      } else {
        console.log("Repo: " + fullPath + " couldn't be found");
      }
    } catch (e) {
      console.log(e);
    }
  }

  static restore(mid: string, notes: Map<String, NoteWrap>) {
    try {
      Repo.minds[mid] = new Mind(notes);
    } catch (e) {
      console.log(e);
    }
  }
  static update(mid: string, notes: Map<String, NoteWrap>) {
    try {
      if (!Repo.minds[mid]) {
        Repo.restore(mid, notes);

        return;
      }
      const map = new Map([...Repo.minds[mid].notes.entries(), ...notes.entries()]);
      Repo.minds[mid] = new Mind(notes);
    } catch (e) {}
  }

  static getCidsResponse(iids: string[]): CidsResponse {
    let cids: { [iid: string]: string } = {};
    let blocks: { [iid: string]: any } = {};

    for (let iid of iids) {
      if (Repo.minds["x"]) {
        let noteWrap = Repo.minds["x"].getNoteWrap(iid);
        cids[iid] = noteWrap.cid;
        blocks[noteWrap.cid] = noteWrap.block;
      } else {
      }
    }
    const cidsResponse = new CidsResponse(cids, blocks);
    return cidsResponse;
  }
}
