const sequelize = require('sequelize');
const db = require('../database/db');
const User = db.define('user', {
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: sequelize.STRING,
        allowNull: false,
    },
});

module.exports = User;
