const sequelize = require('sequelize');
const db = require('../database/db');
const User = db.define('Users', {
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        allowNull: true,
        primaryKey: true,
    },
    name: {
        type: sequelize.STRING(80),
        allowNull: true,
    },
    email: {
        type: sequelize.STRING(30),
        allowNull: true,
    },
    password: {
        type: sequelize.STRING(16),
        allowNull: true,
    },
    admin: {
        type: sequelize.BOOLEAN,
        defaultValue: false,
    },
});

module.exports = User;
