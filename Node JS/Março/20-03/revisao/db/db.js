const sequelize = require('sequelize');
const db = new sequelize({
    dialect: 'sqlite',
    storage: './database',
});

module.exports = db;
