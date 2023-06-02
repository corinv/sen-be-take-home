import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', table => {
        table.increments('id');
        table.string('email');
        table.string('password');
        table.integer('password_attempt').defaultTo(0);
        table.boolean('is_blocked').defaultTo(false);
        table.timestamps(false, true);
    });
};

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users');
};