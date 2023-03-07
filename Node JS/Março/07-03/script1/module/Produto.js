const Sequelize = require('sequelize');
const db = require('../database/db');

const Produto = db.define('produto', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.STRING(40)
    },
    preco:{
        type: Sequelize.DECIMAL
    }
})

module.exports = Produto;