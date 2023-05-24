const sequelize = require('sequelize');
const db = new sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false,
});

module.exports = db;
