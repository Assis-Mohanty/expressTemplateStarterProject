"use strict";

require("dotenv").config();
import type { QueryInterface } from "sequelize";

module.exports = {
  development: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "qqqq",
    database: process.env.DB_NAME || "airbnb_dev",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql",
  },
  up: async (queryInterface: QueryInterface, Sequelize: any) => {
    // migration code
  },
  down: async (queryInterface: QueryInterface, Sequelize: any) => {
    // revert code
  },
};
