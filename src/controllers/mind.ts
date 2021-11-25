import { NoteWrap } from "./types";

export default class Mind {
  notes: Map<String, NoteWrap>;

  constructor(_notes: Map<String, NoteWrap>) {
    this.notes = _notes;
  }

  getNoteWrap(iid: string): NoteWrap {
    let note = this.notes.get(iid);
    if (note) {
      return note;
    } else {
      return { iid: iid, cid: "", block: new Map<String, any>() };
    }
  }
}
