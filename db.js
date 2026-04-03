import { Sequelize } from "sequelize";

const sequelize = new Sequelize("calculator_db", "burhanharoon", null, {
    // new Sequelize(database, username, password, options)
  host: "localhost",
  dialect: "postgres",
});

export default sequelize;
