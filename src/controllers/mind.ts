import { NoteWrap } from "./types";

export default class Mind {
  notes: { [iid: string]: NoteWrap };

  constructor(notes: { [iid: string]: any }) {
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
