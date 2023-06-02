import { NextFunction, Request, Response } from "express";
// import * as authService from '../service/auth.service';
import { AuthParams } from "../interfaces/auth.interface";

export const authenticateUser = async (
  _req: Request<{}, {}, AuthParams>,
  _res: Response,
  _next: NextFunction
) => {
  // TODO: Implement user authentication
};
