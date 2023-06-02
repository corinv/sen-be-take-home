# Typescript BE Tech Test

## Prerequisites

- git
- Node.js v18+

## Installation

1. `npm install` - installs all the node dependencies
2. Create a `.env` with the following keys, and choose a `PORT` you want the server to use.

    ```env
    PORT=4001
    ```

## Commands

- `npm run dev` - Runs the DB migrations and concurrently compiles the typescript code and runs the compiled javascript code (can be used during dev setup).

**NOTE:** The DB migrations and seeds will initialise an SQLite database with tables containing some users and posts. Each time the seeds run they will delete and recreate the seed data for convenience during development.

## Tech stack

- Typescript
- Express
- Knex
- nodemon
- pino-pretty logging
- Eslint
- tsc
- Swagger

## Codebase explained

- The codebase includes a Typescript and express-based server backend. Database access goes through the `knex` query builder library and is configured to use an SQLite database (this will be created in the `knex/` directory).
- Database migrations live in `knex/migrations/` and are responsibile for initialising the database schema.
- Database seeds live in `knex/seeds/` and are responsible for adding some basic seed data to the database for ease of development.
- Project-local Express middleware lives in `middleware/`.
- Swagger definitions and related code live in `swagger/`.
- The server entrypoint is `index.ts`.
- The main server components are split across `routes/`, `controllers/`, and `services/`.

## Source control

It would be very helpful if you could push your solution up to a github or similar source code repository. However, if this is not possible then a .zip file containing the solution can be provided instead.

If using source control, please start by committing the unmodified source code as the first commit, then add your changes in subsequent commits.

## Your task

- You have been provided with a basic implementation of a server, however, several pieces of functionality remain to be implemented:
  - authentication: login and user session management
  - searching posts
- Your task is to implement these, or as much as you can, within the allocated time. We want to respect your time so please don't spend more than 3 or 4 hours on the task.
- Some supporting code for the authentication and posts search is in place, however, the implementation of the login, session auth and search needs to be written. Some comments marked with the `TODO` marker give the locations of incomplete functionality.
- Authentication
  - The login route is registered in `routes/auth.route.ts` and the user session middleware is registered in `middleware/auth.ts`.
  - A `users` table has been included in the migrations with relevant columns and seed data.
    - NOTE: You will likely need to update the user seed data in the process of implementing your solution.
  - A user should be able to use the login endpoint by supplying their `email` and `password` in order to start a session such that subsequent authenticated requests can be made without supplying these credentials again.
  - You may choose the libraries and approaches you use to implement secure authentication and credential storage as well as user sessions.
  - Account blocking and password attempt tracking are "nice-to-have" features for this task and can be considered low-priority; implementing login and user session authentication is the main goal.
- Searching posts
  - The posts search route is registered in `routes/posts.route.ts`.
  - A `posts` table has been included in the migrations with relevant columns and seed data.
  - It is a protected route and should require the user to be logged in to access.
  - The user should be able to search the content of posts for a search term as well as any other relevant metadata.
  - The endpoint should return the matching posts in its response.
  - It is not necessary to include Swagger for the search endpoint for this task.

## Good luck!
We are looking forward to what you submit, and please expect for us to discuss your implementation as part of the interview process and hear your explanations for the choices you made. We will also be particularly interested to hear about the topics which you would have liked to explore in greater detail, if you had more time.

If at any point you need any guidance or pointers, or if anything doesn't make sense, please get in touch. Otherwise please have fun and good luck!