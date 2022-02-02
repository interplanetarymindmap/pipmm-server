import { Console } from "console";
import { Request, Response, NextFunction, response } from "express";
import Repo from "./repo";
import { NoteWrap } from "./types";
import Utils from "./utils";

const getCids = async (req: Request, res: Response, next: NextFunction) => {
  let iids: string[] = req.params.iids.split(",");
  let response = Repo.getCidsResponse(iids);
  return res.status(200).json({
    data: response,
  });
};

// Destroys current repo and replaces it by the new set of abstractions
const restore = async (req: Request, res: Response, next: NextFunction) => {
  // get the post id from the req.params
  let mid: string = req.params.mid;
  //TODO check signature

  let abstractions: Map<String, NoteWrap> = Utils.toMapOfNotes(req.body);
  Repo.restore(mid, abstractions);
  return res.status(200).json({
    message: "Repo destoryed and restored successfully with new abstractions",
  });
};

// Replaces abstraction
const update = async (req: Request, res: Response, next: NextFunction) => {
  // get the post id from the req.params
  let mid: string = req.params.mid;
  //TODO check signature
  let abstractions: Map<String, NoteWrap> = Utils.toMapOfNotes(req.body);
  Repo.update(mid, abstractions);

  return res.status(200).json({
    message: "Abstractions uploaded successfully!",
  });
};

export default { getCids, restore, update };
