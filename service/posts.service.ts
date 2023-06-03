import { Knex } from "knex";
import { Post, PostMetadata } from "../interfaces/posts.interface.js";

export class PostsService {
  constructor(private knex: Knex) {}
  search(term: string | undefined, metadata: PostMetadata): Promise<Post[]> {
    const query = this.knex("posts").where(metadata);
    if (term) {
      query.where("content", "match", term);
    }
    return query;
  }
}
