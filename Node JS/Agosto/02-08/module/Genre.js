const sequelize = require('sequelize');
const db = require('../database/db');
const Genre = db.define('genre', {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
    },
    name: {
        type: sequelize.STRING,
        allowNull: false,
    },
});

module.exports = Genre;
