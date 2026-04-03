import { DataTypes } from "sequelize";
import sequelize from "../db.js";

// sequelize.define() → creates model
// DataTypes.FLOAT → numbers
// DataTypes.STRING → text

const History = sequelize.define("History", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  value1: {
    type: DataTypes.FLOAT,
  },
  value2: {
    type: DataTypes.FLOAT,
  },
  operation: {
    type: DataTypes.STRING,
  },
  result: {
    type: DataTypes.FLOAT,
  },
});

export default History;