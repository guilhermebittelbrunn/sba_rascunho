const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../../utils/sequelize.cjs');

const Produto = sequelize.define(
    'produto',
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
        // preco: {
        //     type: DataTypes.DECIMAL(6, 2),
        // },
        // data: DataTypes.DATEONLY,
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

const Colecao = require('./colecao.model.cjs');

Produto.belongsTo(Colecao);

module.exports = Produto;
