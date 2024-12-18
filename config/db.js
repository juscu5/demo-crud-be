const { Sequelize } = require("sequelize");
const config = require("./config.json");

const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
  }
);

sequelize
  .authenticate()
  .then(() => console.log("Database connected."))
  .catch((err) => console.error("Unable to connect to the database:", err));

module.exports = sequelize;
