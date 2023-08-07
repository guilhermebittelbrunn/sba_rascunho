const sequelize = require('sequelize');
const { Genre, Movie, User } = require('../module/index');
const { yellow } = require('colors');
const db = new sequelize({
    dialect: 'sqlite',
    storage: './database/database.sqlite',
    logging: (text) => {
        console.log(yellow(text));
    },
});

module.exports = db;
