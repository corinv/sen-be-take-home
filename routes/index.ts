import { Response, Request, RequestHandler } from "express";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { PostsRouter } from "./posts.route.js";
import { UsersRouter } from "./users.route.js";
import { AuthRouter } from "./auth.route.js";
import { AppRouter } from "../utils/appRouter.js";
import HttpStatusCode from "../utils/httpStatusCode.enum.js";

const OKController = (_req: Request, res: Response) => {
  res.sendStatus(HttpStatusCode.OK);
};

export class RootRouter extends AppRouter {
  constructor(
    authRouter: AuthRouter,
    usersRouter: UsersRouter,
    postsRouter: PostsRouter,
    authMiddleware: AuthMiddleware
  ) {
    super({ mergeParams: true });

    const authenticate = authMiddleware.toExpress();

    this.router.get("", OKController as RequestHandler);
    this.router.use("/auth", authRouter.toExpress());
    this.router.use("/users", authenticate, usersRouter.toExpress());
    this.router.use("/posts", authenticate, postsRouter.toExpress());
  }
}
