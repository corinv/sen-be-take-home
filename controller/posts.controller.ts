import { NextFunction, Request, Response } from "express";
// import * as postService from "../service/posts.service";
import { SearchParams } from "../interfaces/posts.interface";

export const search = async (req: Request<{}, {}, {}, SearchParams>, res: Response, next: NextFunction) => {
    // TODO: Implement post searching
}