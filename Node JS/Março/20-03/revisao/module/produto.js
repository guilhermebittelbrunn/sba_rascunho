const sequelize = require('sequelize');
const db = require('../db/db');

const Produto = db.define('Produtos', {
    codigo: {
        type: sequelize.INTEGER,
        primaryKey: true,
        allownull: false,
        autoIncrement: true,
    },
    titulo: {
        type: sequelize.STRING(30),
        allownull: false,
    },
    descricao: {
        type: sequelize.STRING(255),
    },
});

module.exports = Produto;
