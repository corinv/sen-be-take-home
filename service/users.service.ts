import { User, UserUpdate } from "../interfaces/users.interface";
import bcrypt from "bcrypt";
import {
  EmailAlreadyTakenError,
  TooManyPasswordAttemptsError,
  UserDoesNotExistError,
} from "./errors.js";
import { Knex } from "knex";

const PASSWORD_ATTEMPT_RESET_TIME = 300000; // 5 mins in ms, could be configurable
const PASSWORD_ATTEMPT_LIMIT = 5;
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
    await this.knex("users")
      .where({ id: userId })
      .update({
        ...newData,
        updated_at: new Date().toISOString(),
      });
    const user = await this.findById(userId);
    if (!user) {
      throw new UserDoesNotExistError();
    }
    return user;
  };

  validateCredentials = async (
    email: string,
    password: string
  ): Promise<User | undefined> => {
    const user = await this.findOne(
      {
        email: email.toLowerCase(),
      },
      false
    );

    if (!user) {
      return;
    }

    if (this.hasTooManyPasswordAttempts(user)) {
      throw new TooManyPasswordAttemptsError();
    }
    if (this.hasPasswordAttemptsReset(user)) {
      await this.resetPasswordAttempts(user.email);
    }

    if (
      !(user.password && (await this.passwordMatch(password, user.password)))
    ) {
      return;
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

  resetPasswordAttempts = async (email: string): Promise<void> => {
    await this.knex("users").where({ email }).update({
      password_attempt: 0,
      updated_at: new Date().toISOString(),
    });
  };

  incrementPasswordAttempts = async (email: string): Promise<void> => {
    await this.knex("users")
      .where({ email })
      .update({ updated_at: new Date().toISOString() })
      .increment("password_attempt");
  };

  hasPasswordAttemptsReset = (user: User): boolean => {
    // Cutting a corner here and reusing 'updated_at',
    // where actually a new datetime column should be used for this
    const sinceLastUpdate = Date.now() - new Date(user.updated_at).getTime();
    return sinceLastUpdate > PASSWORD_ATTEMPT_RESET_TIME;
  };

  hasTooManyPasswordAttempts = (user: User): boolean => {
    return (
      !this.hasPasswordAttemptsReset(user) &&
      user.password_attempt >= PASSWORD_ATTEMPT_LIMIT
    );
  };
}
