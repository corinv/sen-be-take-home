import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        { id: 1, email: "user1@filament.ai", password: "Password1" }, // Password1
        { id: 2, email: "user2@filament.ai", password: "Password2" }, // Password2
    ]);
};
