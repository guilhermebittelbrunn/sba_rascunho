const sequelize = require('sequelize');
const db = new sequelize({
    dialect: 'sqlite',
    storage: './database/bancoteste.sqlite',
});

module.exports = db;
