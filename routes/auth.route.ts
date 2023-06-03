import { RequestHandler } from "express-serve-static-core";
import { AuthController } from "../controller/auth.controller";
import { AppRouter } from "../utils/appRouter.js";

export class AuthRouter extends AppRouter {
  constructor(controller: AuthController) {
    super();
    this.router.post("/login", controller.login as RequestHandler);
    this.router.post("/signup", controller.signup as RequestHandler);
  }
}
