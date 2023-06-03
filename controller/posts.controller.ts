import { NextFunction, Request, Response } from "express";
// import * as postService from "../service/posts.service";
import { PostMetadata, SearchParams } from "../interfaces/posts.interface";
import { PostsService } from "../service/posts.service.js";

export class PostsController {
  constructor(private postsService: PostsService) {}

  private parseMetadataFromParams(params: SearchParams): PostMetadata {
    const { title, user_id, created_at, updated_at } = params;
    const metadata: PostMetadata = {};

    if (title) metadata.title = title;
    if (user_id) {
      metadata.user_id = Number.parseInt(user_id);
    }
    if (created_at) {
      metadata.created_at = new Date(created_at);
    }
    if (updated_at) {
      metadata.updated_at = new Date(updated_at);
    }
    return metadata;
  }

  search = async (
    req: Request<{}, {}, {}, SearchParams>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { term } = req.query;
      const metadata = this.parseMetadataFromParams(req.query);

      const posts = await this.postsService.search(term, metadata);
      res.json(posts);
    } catch (err) {
      next(err);
    }
  };
}
