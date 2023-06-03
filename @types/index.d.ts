import { User, User as AppUser } from "../interfaces/users.interface";
import { Post } from "../interfaces/posts.interface";

declare module "knex/types/tables" {
  interface Tables {
    users: User;
    posts: Post;
  }
}

declare module "express" {
  interface Request {
    user?: Omit<User, "password">;
  }
}

// for passport
declare module "Express" {
  interface User extends Omit<AppUser, "password"> {}
}
