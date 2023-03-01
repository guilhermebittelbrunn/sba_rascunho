const mongoose = require('mongoose');

let professorSchema = new mongoose.Schema({
    nome: String,
    disciplina: {type: String, required:true},
    idade: Number
})

let Professor = mongoose.model('professores', professorSchema);


module.exports = Professor;


