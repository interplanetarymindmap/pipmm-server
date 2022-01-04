"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mind_1 = __importDefault(require("./mind"));
const fs = __importStar(require("fs"));
const utils_1 = __importDefault(require("./utils"));
const types_1 = __importDefault(require("./types"));
class Repo {
    static loadLocalMind(mid) {
        const path = "~/dev/ipmmRepo/repo.json";
        try {
            let fullPath = utils_1.default.resolveHome(path);
            if (fs.existsSync(fullPath)) {
                //console.log("Config already exists at " + configPath);
                // let data: { [iid: string]: NoteWrap } = JSON.parse(fs.readFileSync(fullPath, "utf8"));
                let notes = JSON.parse(fs.readFileSync(fullPath, "utf8"));
                Repo.minds.set(mid, new mind_1.default(notes));
                //Repo.minds[mid] = new Mind(data);
            }
            else {
                console.log("Repo: " + fullPath + " couldn't be found");
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    static restore(mid, notes) {
        var _a;
        let originalNotesAmount = 0;
        if (Repo.minds.has(mid)) {
            originalNotesAmount = Repo.minds.get(mid).notes.size;
        }
        try {
            Repo.minds.set(mid, new mind_1.default(notes));
        }
        catch (e) {
            console.log(e);
        }
        let currentNotesAmount = (_a = Repo.minds.get(mid)) === null || _a === void 0 ? void 0 : _a.notes.size;
        console.log("MID " +
            mid +
            " had " +
            originalNotesAmount +
            " abstractions, now has " +
            currentNotesAmount);
    }
    static update(mid, notes) {
        try {
            if (!Repo.minds.has(mid)) {
                console.log("Mind " + mid + " does not exist yet. Creating it");
                Repo.restore(mid, notes);
                return;
            }
            const mergedNotes = new Map([
                ...Repo.minds.get(mid).notes.entries(),
                ...notes.entries(),
            ]);
            Repo.minds.get(mid).notes = mergedNotes;
        }
        catch (e) { }
    }
    static getCidsResponse(iids) {
        let cids = {};
        let blocks = {};
        for (let iid of iids) {
            //if (Repo.minds["x"]) {
            if (Repo.minds.has("x")) {
                let noteWrap = Repo.minds.get("x").getNoteWrap(iid);
                cids[iid] = noteWrap.cid;
                blocks[noteWrap.cid] = noteWrap.block;
            }
            else {
            }
        }
        const cidsResponse = new types_1.default(cids, blocks);
        return cidsResponse;
    }
}
exports.default = Repo;
Repo.minds = new Map();
