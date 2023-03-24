const db = require('../db/db');
const Sequelize = require('sequelize');

const Veterinario = db.define(
    'veterinario',
    {
        nome: {
            type: Sequelize.STRING(),
            allownull: false,
        },
        cpf: {
            type: Sequelize.STRING(),
            allownull: false,
        },
    },
    {
        freezeTableName: true,
    }
);

module.exports = Veterinario;
