import { Request, Response, NextFunction, response } from "express";
import Repo from "./repo";
import { MindRepo } from "./types";

const getCids = async (req: Request, res: Response, next: NextFunction) => {
  console.log("here");
  let iids: string[] = req.params.iids.split(",");
  let response = Repo.getCidsResponse(iids);
  return res.status(200).json({
    data: response,
  });
};

// updating a post
const updateMind = async (req: Request, res: Response, next: NextFunction) => {
  // get the post id from the req.params
  let mid: string = req.params.mid;
  if (mid == "x") console.log("Valid!");
  //TODO check signature
  // get the data from req.body
  let mindRepo: MindRepo = req.body ?? null;
  Repo.loadMind(mid, mindRepo);
  // return response
  return res.status(200).json({
    message: "Good good",
  });
};

/*
// deleting a post
const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  // get the post id from req.params
  let id: string = req.params.id;
  // delete the post
  let response: AxiosResponse = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
  // return response
  return res.status(200).json({
    message: "post deleted successfully",
  });
};

// adding a post
const addPost = async (req: Request, res: Response, next: NextFunction) => {
  // get the data from req.body
  let title: string = req.body.title;
  let body: string = req.body.body;
  // add the post
  let response: AxiosResponse = await axios.post(`https://jsonplaceholder.typicode.com/posts`, {
    title,
    body,
  });
  // return response
  return res.status(200).json({
    message: response.data,
  });
};
*/
//export default { getPosts, getPost, updatePost, deletePost, addPost };
export default { getCids, updateMind };
