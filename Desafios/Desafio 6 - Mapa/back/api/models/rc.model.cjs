const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../../utils/sequelize.cjs');

const RC = sequelize.define(
    'rc',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        codigo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nome: DataTypes.STRING,
        ativo: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        //alter: true,
        //paranoid: true,
        freezeTableName: true,
        indexes: [
            {
                unique: true,
                fields: ['codigo'],
            },
        ],
    }
);

const PerfilVenda = require('./perfilVenda.model.cjs');

RC.belongsToMany(PerfilVenda, {
    through: 'rc_perfilVenda',
    as: { singular: 'perfilVenda', plural: 'perfisVenda' },
});

module.exports = RC;
