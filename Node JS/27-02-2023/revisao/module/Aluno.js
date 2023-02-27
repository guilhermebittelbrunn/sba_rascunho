const mongoose = require('mongoose');

const alunoSchema = new mongoose.Schema({
    nome: {type: String, required:true},
    turma: String
})

const Aluno = mongoose.model('alunos', alunoSchema);

module.exports = Aluno