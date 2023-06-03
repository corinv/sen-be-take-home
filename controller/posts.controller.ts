import { NextFunction, Request, Response } from "express";
// import * as postService from "../service/posts.service";
import { SearchParams } from "../interfaces/posts.interface";
import { PostsService } from "../service/posts.service.js";

export class PostsController {
  constructor(private _postsService: PostsService) {}
  search = async (
    _req: Request<{}, {}, {}, SearchParams>,
    res: Response,
    _next: NextFunction
  ) => {
    console.log("todo");
    res.send(200);
    // TODO: Implement post searching
  };
}
