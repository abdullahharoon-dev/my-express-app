import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD || null,
  {
    // new Sequelize(database, username, password, options)
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },
);

export default sequelize;
