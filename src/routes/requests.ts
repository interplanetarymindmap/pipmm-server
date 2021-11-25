import express from "express";
import controller from "../controllers/cids";
const router = express.Router();

//router.get("/posts", controller.getPosts);
router.get("/iids/:iids", controller.getCids);
router.put("/restore/:mid", controller.restore);
router.put("/update/:mid", controller.update);
//router.delete("/posts/:id", controller.deletePost);
//router.post("/posts", controller.addPost);

export = router;
