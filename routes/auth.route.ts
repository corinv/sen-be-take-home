import express from "express";
import * as controller from "../controller/auth.controller";

const authRouter = express.Router();

authRouter.post("/login", controller.authenticateUser);

export default authRouter;
