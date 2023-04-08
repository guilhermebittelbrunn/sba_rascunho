const sequelize = require('sequelize');
const db = require('../database/db');
const Aluno = db.define('Alunos', {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true,
    },
    nome: {
        type: sequelize.STRING(80),
        allowNull: true,
    },
    idade: {
        type: sequelize.INTEGER,
        allowNull: true,
    },
    turma: {
        type: sequelize.CHAR(2),
        defaultValue: '2A',
    },
});

module.exports = Aluno;
