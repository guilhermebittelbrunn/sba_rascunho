const sequelize = require('sequelize');
const db = require('../db/database');
const Product = db.define('product', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: sequelize.INTEGER,
    },
    title: {
        type: sequelize.STRING(50),
        allowNull: false,
    },
    description: {
        type: sequelize.STRING,
        defaultValue: 'description null',
    },
    price: {
        type: sequelize.DOUBLE,
        allowNull: false,
    },
    collection: {
        type: sequelize.CHAR(2),
        allowNull: false,
    },
});

module.exports = Product;
