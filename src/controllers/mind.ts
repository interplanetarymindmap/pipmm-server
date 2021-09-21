export default class Mind {
  notes: { [iid: string]: any };

  constructor(notes: { [iid: string]: any }) {
    this.notes = notes;
  }

  getIid(iid: string): { iid: string; note?: any; error?: string } {
    if (this.notes[iid]) {
      return { iid: iid, note: this.notes[iid] };
    } else {
      return { iid: iid, error: "Iid not found" };
    }
  }
}
