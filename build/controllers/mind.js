"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Mind {
    constructor(_notes) {
        this.notes = new Map();
        this.notes = _notes;
    }
    getNoteWrap(iid) {
        let note = this.notes.get(iid);
        if (note) {
            return note;
        }
        else {
            return { iid: iid, cid: "", block: new Map() };
        }
    }
}
exports.default = Mind;
