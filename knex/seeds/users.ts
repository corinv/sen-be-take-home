import bcrypt from "bcrypt";
import { Knex } from "knex";

// TODO should be taken from users.service but knex can't resolve the dependency?
const hashPassword = async (pass: string): Promise<string> => {
  const SALT_ROUNDS = 10;
  return bcrypt.hash(pass, SALT_ROUNDS);
};

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users").del();

  // Inserts seed entries
  await knex("users").insert([
    {
      id: 1,
      email: "user1@filament.ai",
      password: await hashPassword("Password1"),
    }, // Password1
    {
      id: 2,
      email: "user2@filament.ai",
      password: await hashPassword("Password2"),
    }, // Password2
  ]);
}
