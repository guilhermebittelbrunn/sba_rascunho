const sequelize = require('sequelize');
const db = require('../database/db');
const Product = db.define('Product', {
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: true,
    },
    title: {
        type: sequelize.STRING(50),
        allowNull: true,
    },
    description: {
        type: sequelize.STRING(90),
    },
    collection: {
        type: sequelize.CHAR(2),
        allowNull: true,
        defaultValue: 'AA',
    },
});

module.exports = Product;
