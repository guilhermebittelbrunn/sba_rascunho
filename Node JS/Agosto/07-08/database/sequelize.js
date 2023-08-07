require('dotenv').config();
const sequelize = require('sequelize');
const db = new sequelize({
    dialect: 'sqlite',
    storage: './database/database.sqlite',
    define: {
        freezeTableName: true,
    },
});

module.exports = db;
