const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../../utils/sequelize.cjs');

const Cliente = sequelize.define(
    'cliente',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        codigo: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
        },
        cpfcnpj: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
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
            {
                unique: true,
                fields: ['cpfcnpj'],
            },
        ],
    }
);

module.exports = Cliente;
