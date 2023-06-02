import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.raw(
    "CREATE VIRTUAL TABLE posts USING FTS5(title, content, user_id, created_at, updated_at);"
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("posts");
}
