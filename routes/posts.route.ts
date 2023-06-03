import { RequestHandler } from "express-serve-static-core";
import { PostsController } from "../controller/posts.controller";
import { AppRouter } from "../utils/appRouter.js";

export class PostsRouter extends AppRouter {
  constructor(controller: PostsController) {
    super();
    this.router.get("/search", controller.search as RequestHandler);
  }
}
