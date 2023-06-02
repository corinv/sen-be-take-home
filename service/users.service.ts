import knex from "../knex";
// import * as authService from '../service/auth.service';
import { User } from "../interfaces/users.interface";
import { ApplicationError } from "../middleware/errors";

export const getUser = async (userId: number) => {
  const user = await knex("users").where({ id: userId }).first();
  if (!user) {
    throw new ApplicationError(
      `No user exists with id ${userId}`,
      "INTERNAL_ERROR",
      500
    );
  }
  return user;
};

export const update = async (userId: number, data: User) => {
  // TODO: Implement security around password
  await knex("users").where({ id: userId }).update(data);
  return getUser(userId);
};
