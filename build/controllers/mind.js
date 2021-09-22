"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Mind {
    constructor(notes) {
        this.notes = notes;
    }
    getNoteWrap(iid) {
        if (this.notes[iid]) {
            return this.notes[iid];
        }
        else {
            return { iid: iid, cid: "", block: {} };
        }
    }
}
exports.default = Mind;
