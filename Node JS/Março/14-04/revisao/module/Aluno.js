const sequelize = require('sequelize');
const db = require('../db/db');

const Aluno = db.define('Alunos', {
    id: {
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: sequelize.STRING(90),
        allowNull: false
    },
    idade: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    situacao:{
        type: sequelize.STRING,
        allowNull: false
    },
    observacao: sequelize.STRING,
    periodo: sequelize.STRING
});


module.exports = Aluno;
