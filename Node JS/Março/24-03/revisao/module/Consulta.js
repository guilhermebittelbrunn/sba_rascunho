const Sequelize = require('sequelize');
const db = require('../db/db');
const Animal = require('./animal');
const Veterinario = require('./veterinario');

const Consulta = db.define(
    'consulta',
    {
        date: {
            type: Sequelize.DATE,
            default: new Date(),
        },
    },
    {
        freezeTableName: true,
        indexes: [
            {
                unique: true,
                fields: ['id', 'id'],
            },
        ],
    }
);

Consulta.belongsTo(Animal);
Consulta.belongsTo(Veterinario);

module.exports = Consulta;
