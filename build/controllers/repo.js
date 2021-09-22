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
    static loadMind(mid) {
        const path = "~/dev/ipmmRepo/repo.json";
        try {
            let fullPath = utils_1.default.resolveHome(path);
            if (fs.existsSync(fullPath)) {
                //console.log("Config already exists at " + configPath);
                let data = JSON.parse(fs.readFileSync(fullPath, "utf8"));
                Repo.minds[mid] = new mind_1.default(data);
                console.log("Mind loaded");
            }
            else {
                console.log("Repo: " + fullPath + " couldn't be found");
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    static getCidsResponse(iids) {
        let cids = {};
        let blocks = {};
        for (let iid of iids) {
            if (Repo.minds["x"]) {
                let noteWrap = Repo.minds["x"].getNoteWrap(iid);
                cids[iid] = noteWrap.cid;
                blocks[noteWrap.cid] = noteWrap.block;
            }
        }
        const cidsResponse = new types_1.default(cids, blocks);
        return cidsResponse;
    }
}
exports.default = Repo;
Repo.minds = {};
