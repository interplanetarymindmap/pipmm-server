import { Request, Response, NextFunction, response } from "express";
import Repo from "./repo";

const getCids = async (req: Request, res: Response, next: NextFunction) => {
  let iids: string[] = req.params.iids.split(",");
  let response = Repo.getCidsResponse(iids);
  return res.status(200).json({
    data: response,
  });
};

/*
// updating a post
const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  // get the post id from the req.params
  let id: string = req.params.id;
  // get the data from req.body
  let title: string = req.body.title ?? null;
  let body: string = req.body.body ?? null;
  // update the post
  let response: AxiosResponse = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    ...(title && { title }),
    ...(body && { body }),
  });
  // return response
  return res.status(200).json({
    message: response.data,
  });
};

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
export default { getCids };
