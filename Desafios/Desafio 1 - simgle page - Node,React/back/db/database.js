const sequelize = require('sequelize');
const db = new sequelize({
    dialect: 'sqlite',
    storage: './products.sqlite',
});

module.exports = db;
