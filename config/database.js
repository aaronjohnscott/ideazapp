const Sequelize = require("sequelize");
module.exports = new Sequelize(
    "postgres://aws_postgres:password@postgres-instance.cc7lmadkz4ln.us-east-2.rds.amazonaws.com:5432/IdeazApp"
);

