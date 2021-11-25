import Utils from "./utils";

export default class CidsResponse {
  cids: { [iid: string]: string };
  blocks: { [cid: string]: any };

  constructor(cids: Map<String, String>, blocks: Map<String, any>) {
    this.cids = Utils.mapToObj(cids);
    this.blocks = Utils.mapToObj(blocks);
  }
}

export interface NoteWrap {
  iid: string;
  cid: string;
  block: Map<String, any>;
}
