import express from "express";
import * as controller from "../controller/posts.controller";

const postsRouter = express.Router();

postsRouter.get("/search", controller.search);

export default postsRouter;
