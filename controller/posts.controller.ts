import { NextFunction, Request, Response } from "express";
// import * as postService from "../service/posts.service";
import { SearchParams } from "../interfaces/posts.interface";

export const search = async (
  _req: Request<{}, {}, {}, SearchParams>,
  _res: Response,
  _next: NextFunction
) => {
  // TODO: Implement post searching
};
