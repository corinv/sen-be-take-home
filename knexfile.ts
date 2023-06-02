import "dotenv/config";

const knexfile = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./knex/database.db3",
    },
    useNullAsDefault: true,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./knex/migrations",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./knex/seeds",
    },
  },
};

export default knexfile;
