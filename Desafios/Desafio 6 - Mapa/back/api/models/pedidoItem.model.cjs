const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../../utils/sequelize.cjs');

const PedidoItem = sequelize.define(
    'pedidoItem',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        obs: DataTypes.TEXT,
        quanti: DataTypes.INTEGER,
        precoOriginal: DataTypes.DECIMAL(6, 2),
        preco: DataTypes.DECIMAL(6, 2),
    },
    {
        //paranoid: true,
        freezeTableName: true,
        indexes: [
            // {
            //     unique: true,
            //     fields: ['numero'],
            //     // where: {
            //     //     deletedAt: {
            //     //         [Sequelize.Op.eq]: null,
            //     //     },
            //     // },
            // },
        ],
    }
);

const Produto = require('./produto.model.cjs');

PedidoItem.belongsTo(Produto);

module.exports = PedidoItem;
