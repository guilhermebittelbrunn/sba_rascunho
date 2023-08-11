const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../../utils/sequelize.cjs');

const Cidade = sequelize.define(
    'cidade',
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
        uf: DataTypes.STRING,
        area: DataTypes.DECIMAL(6, 2),
        geojson: DataTypes.JSON,
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

module.exports = Cidade;
