const { Sequelize, DataTypes } = require('sequelize');
const db = new Sequelize({
    dialect: 'sqlite',
    storage: './database/database.sqlite',
    define: {
        freezeTableName: true,
    },
});

module.exports = { db, DataTypes };
