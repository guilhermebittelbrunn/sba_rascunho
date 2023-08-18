const { Sequelize, DataTypes } = require('sequelize');
const db = new Sequelize({
    dialect: 'sqlite',
    storage: './database/database.sqlite',
    logging: false,
    define: {
        freezeTableName: true,
    },
});

module.exports = { db, DataTypes };
