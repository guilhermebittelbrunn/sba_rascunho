const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../../utils/sequelize.cjs');

const Pedido = sequelize.define(
    'pedido',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        numero: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        obs: DataTypes.TEXT,
        dataEmissao: DataTypes.DATEONLY,
    },
    {
        //alter: true,
        //paranoid: true,
        freezeTableName: true,
        indexes: [
            {
                unique: true,
                fields: ['numero'],
            },
        ],
    }
);

const Cliente = require('./cliente.model.cjs');
const RC = require('./rc.model.cjs');
const TabelaPreco = require('./tabelaPreco.model.cjs');
const PerfilVenda = require('./perfilVenda.model.cjs');

Pedido.belongsTo(Cliente);
Pedido.belongsTo(RC);
Pedido.belongsTo(TabelaPreco);
Pedido.belongsTo(PerfilVenda);

const PedidoItem = require('./pedidoItem.model.cjs');
Pedido.hasMany(PedidoItem, {
    as: {
        plural: 'itens',
        singular: 'item',
    },
});

module.exports = Pedido;
