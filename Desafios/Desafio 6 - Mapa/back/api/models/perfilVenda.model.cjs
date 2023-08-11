const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../../utils/sequelize.cjs');

const PerfilVenda = sequelize.define(
    'perfilVenda',
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
        dataInicio: DataTypes.DATEONLY,
        dataFim: DataTypes.DATEONLY,
        qtdeMinima: DataTypes.INTEGER,
        valorMinimo: DataTypes.DECIMAL(6, 2),
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

const TabelaPreco = require('./tabelaPreco.model.cjs');
const Colecao = require('./colecao.model.cjs');

PerfilVenda.belongsTo(TabelaPreco);
PerfilVenda.belongsToMany(Colecao, {
    through: 'perfilVenda_colecao',
    as: { singular: 'colecao', plural: 'colecoes' },
});

module.exports = PerfilVenda;
