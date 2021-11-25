export default class CidsResponse {
  cids: { [iid: string]: string };
  blocks: { [cid: string]: any };

  constructor(cids: { [iid: string]: string }, blocks: { [cid: string]: any }) {
    this.cids = cids;
    this.blocks = blocks;
  }
}

/*export interface NoteBlock {
  [key: string]: any;
}*/

export interface NoteWrap {
  iid: string;
  cid: string;
  block: { [key: string]: any };
}

/*export interface AbstractionsSet {
  [iid: string]: NoteWrap;
}*/
