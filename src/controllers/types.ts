import Utils from "./utils";

export default class CidsResponse {
  cids: { [iid: string]: string };
  blocks: { [cid: string]: any };

  constructor(cids: { [iid: string]: string }, blocks: { [cid: string]: any }) {
    this.cids = cids;
    this.blocks = blocks;
  }
}

export interface NoteWrap {
  iid: string;
  cid: string;
  block: Map<String, any>;
}
