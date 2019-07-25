const ENV = require('dotenv')
ENV.config()

const Sequelize = require("sequelize");
module.exports = new Sequelize(
    process.env.POSTGRES_INSTANCE
);
