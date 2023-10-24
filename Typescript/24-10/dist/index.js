"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Aluno_1 = require("./Aluno");
function filtrarAlunos(listaAlunos, filtro) {
    return listaAlunos.reduce((acc, aluno) => {
        if (filtro in aluno) {
            if (acc[aluno[filtro]] === undefined) {
                acc[aluno[filtro]] = [];
            }
            acc[aluno[filtro]].push(aluno);
        }
        return acc;
    }, {});
}
const alunosPeriodo = filtrarAlunos(Aluno_1.Alunos, 'periodo');
for (let key in alunosPeriodo) {
    console.log(`--- ${Aluno_1.periodo[+key]} ---`);
    console.table(alunosPeriodo[key]);
}
