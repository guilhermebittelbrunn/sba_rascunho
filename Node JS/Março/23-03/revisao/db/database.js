const sequelize = require('sequelize');
const db = new sequelize({
    dialect: 'sqlite',
    storage: './db/db.sqlite',
});

module.exports = db;
