const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../../utils/sequelize.cjs');

const Usuario = sequelize.define(
    'usuario',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: DataTypes.STRING,
        nome: DataTypes.STRING,
        ativo: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        //alter: true,
        //paranoid: true,
        freezeTableName: true,
        indexes: [
            {
                unique: true,
                fields: ['username'],
            },
        ],
    }
);

const RC = require('./rc.model.cjs');
Usuario.belongsTo(RC);

module.exports = Usuario;
