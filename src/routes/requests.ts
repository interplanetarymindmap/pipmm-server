import express from "express";
import controller from "../controllers/cids";
const router = express.Router();

router.get("/iids/:iids", controller.getCids);
router.put("/restore/:mid", controller.restore);
router.put("/update/:mid", controller.update);
export = router;
