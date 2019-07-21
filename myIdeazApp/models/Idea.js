const Sequelize = require("sequelize");
const db = require("../config/database");

const Idea = db.define("ideas", {
    userId: {
        type: Sequelize.INTEGER
    },
    idea: {
        type: Sequelize.STRING
    },
    genre: {
        type: Sequelize.STRING
    },
    keyword1: {
        type: Sequelize.STRING
    },
    keyword2: {
        type: Sequelize.STRING
    }
});


module.exports = Idea;
