const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../../utils/sequelize.cjs');

const Colecao = sequelize.define(
    'colecao',
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
        descricao: DataTypes.STRING,
        ativo: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
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

module.exports = Colecao;
