import { MindRepo, NoteWrap } from "./types";

export default class Mind {
  notes: MindRepo;

  constructor(notes: MindRepo) {
    this.notes = notes;
  }

  getNoteWrap(iid: string): NoteWrap {
    if (this.notes[iid]) {
      return this.notes[iid];
    } else {
      return { iid: iid, cid: "", block: {} };
    }
  }
}
