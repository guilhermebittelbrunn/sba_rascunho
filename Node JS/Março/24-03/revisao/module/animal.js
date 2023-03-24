const db = require('../db/db');
const Sequelize = require('sequelize');

const Animal = db.define(
    'animal',
    {
        nome: {
            type: Sequelize.STRING(30),
            allownull: false,
        },
        especie: {
            type: Sequelize.STRING,
            allownull: false,
        },
    },
    {
        freezeTableName: true,
    }
);

module.exports = Animal;
