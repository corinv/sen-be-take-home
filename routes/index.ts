import express, { Response, Request } from "express";
import { authenticate } from "../middleware/auth";
import usersRouter from "./users.route";
import authRouter from "./auth.route";
import postsRouter from "./posts.route";

const router = express.Router({ mergeParams: true });

router.get("", (_req: Request, res: Response) => res.sendStatus(200));
router.use("/auth", authRouter);
router.use("/users", authenticate, usersRouter);
router.use("/posts", authenticate, postsRouter);

export default router;
