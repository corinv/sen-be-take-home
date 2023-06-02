import { User } from '../interfaces/users.interface';
import { Post } from '../interfaces/posts.interface';

declare module 'knex/types/tables' {
    interface Tables {
        users: User;
        posts: Post;
    }
}

declare module 'express' {
    interface Request {
        user?: {
            id: number;
            iat: number;
            exp: number;
        };
    }
}
