const ENV = require('dotenv')
ENV.config()

const Sequelize = require("sequelize");
module.exports = new Sequelize(
    POSTGRES_INSTANCE
);