import { RequestHandler } from "express-serve-static-core";
import { UsersController } from "../controller/users.controller";
import { AppRouter } from "../utils/appRouter.js";

export class UsersRouter extends AppRouter {
  constructor(controller: UsersController) {
    super();
    this.router.get("/current", controller.getCurrent as RequestHandler);
    this.router.put("/current", controller.updateCurrent as RequestHandler);
  }
}
