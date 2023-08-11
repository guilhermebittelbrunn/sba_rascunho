const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../../utils/sequelize.cjs');

const Preco = sequelize.define(
    'preco',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        preco: DataTypes.DECIMAL(6, 2),
    },
    {
        //paranoid: true,
        freezeTableName: true,
    }
);

const TabelaPreco = require('./tabelaPreco.model.cjs');
const Produto = require('./produto.model.cjs');

Preco.belongsTo(TabelaPreco);
Preco.belongsTo(Produto);

module.exports = Preco;
