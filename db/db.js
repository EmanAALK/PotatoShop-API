const { Sequelize } = require("sequelize");

const db = new Sequelize({
  database: "plants.db",
  dialect: "sqlite",
  host: "localhost",
  operatorsAliases: "false",
});

module.exports = db;
