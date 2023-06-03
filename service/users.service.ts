import { User, UserUpdate } from "../interfaces/users.interface";
import bcrypt from "bcrypt";
import {
  EmailAlreadyTakenError,
  InvalidCredentialsError,
  UserDoesNotExistError,
} from "./errors.js";
import { Knex } from "knex";

// exported outside of service for seed-file
export const hashPassword = async (pass: string): Promise<string> => {
  const SALT_ROUNDS = 10;
  return bcrypt.hash(pass, SALT_ROUNDS);
};

export class UsersService {
  constructor(private knex: Knex) {}

  findById = async (userId: number): Promise<User | undefined> => {
    const user = await this.findOne({ id: userId });
    return user;
  };

  findOne = async (
    where: Partial<User>,
    hidePassword = true,
    trx: Knex.Transaction | null = null
  ): Promise<User | undefined> => {
    const query = this.knex("users").where(where).first();
    if (trx) {
      query.transacting(trx);
    }
    const user = await query;
    if (user && hidePassword) {
      delete user.password;
    }
    return user;
  };

  create = async (email: string, password: string): Promise<User> => {
    return this.knex.transaction(async (trx) => {
      email = email.toLowerCase();
      const existingUser = await this.findOne({ email }, true, trx);

      if (existingUser) {
        throw new EmailAlreadyTakenError();
      }

      await this.knex("users")
        .insert({
          email,
          password: await this.hashPassword(password),
        })
        .transacting(trx);

      const newUser = await this.findOne({ email }, true, trx);
      return newUser as User;
    });
  };

  update = async (userId: number, data: UserUpdate): Promise<User> => {
    const newData: UserUpdate = { ...data };
    if (newData.password) {
      newData.password = await this.hashPassword(newData.password);
    }
    await this.knex("users").where({ id: userId }).update(newData);
    const user = await this.findById(userId);
    if (!user) {
      throw new UserDoesNotExistError();
    }
    return user;
  };

  validateCredentials = async (
    email: string,
    password: string
  ): Promise<User> => {
    const user = await this.findOne(
      {
        email: email.toLowerCase(),
      },
      false
    );

    if (
      !user ||
      !(user.password && (await this.passwordMatch(password, user.password)))
    ) {
      throw new InvalidCredentialsError();
    }

    return user;
  };

  hashPassword = hashPassword;

  passwordMatch = async (
    provided: string,
    stored: string
  ): Promise<boolean> => {
    return bcrypt.compare(provided, stored);
  };
}
