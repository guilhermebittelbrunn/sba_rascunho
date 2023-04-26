const sequelize = require('sequelize');
const db = new sequelize({
    dialect: 'sqlite',
    storage: './bancoteste.slite',
});

module.exports = db;
