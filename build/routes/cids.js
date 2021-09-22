"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const cids_1 = __importDefault(require("../controllers/cids"));
const router = express_1.default.Router();
//router.get("/posts", controller.getPosts);
router.get("/iids/:iids", cids_1.default.getCids);
module.exports = router;
