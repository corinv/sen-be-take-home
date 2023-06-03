// With more time and a lib, we would use a proper DI container
// Rather than this manual composition
import { AuthController } from "./controller/auth.controller.js";
import { PostsController } from "./controller/posts.controller.js";
import { UsersController } from "./controller/users.controller.js";
import knex from "./knex";
import { AuthMiddleware } from "./middleware/auth.middleware.js";
import { AuthRouter } from "./routes/auth.route.js";
import { RootRouter } from "./routes/index.js";
import { PostsRouter } from "./routes/posts.route.js";
import { UsersRouter } from "./routes/users.route.js";
import { AuthService } from "./service/auth.service.js";
import { PostsService } from "./service/posts.service.js";
import { UsersService } from "./service/users.service.js";

const usersService = new UsersService(knex);
const authService = new AuthService(usersService);
const postsService = new PostsService();

const usersController = new UsersController(usersService);
const authController = new AuthController(authService);
const postsController = new PostsController(postsService);

const usersRouter = new UsersRouter(usersController);
const authRouter = new AuthRouter(authController);
const postsRouter = new PostsRouter(postsController);

const authMiddleware = new AuthMiddleware(authService);

const rootRouter = new RootRouter(
  authRouter,
  usersRouter,
  postsRouter,
  authMiddleware
);

export const router = rootRouter.toExpress();
