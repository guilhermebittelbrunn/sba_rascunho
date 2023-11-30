"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Aluno_1 = require("./interfaces/Aluno");
const Alunos_1 = require("./Alunos");
function filtrarAlunos(listAlunos, filtro) {
    const list = listAlunos.reduce((acc, aluno) => {
        if (!acc[aluno[filtro]]) {
            acc[aluno[filtro]] = [];
        }
        acc[aluno[filtro]].push(aluno);
        return acc;
    }, {});
    return list;
}
const alunoPeriodo = filtrarAlunos(Alunos_1.Alunos, "turno");
for (let key in alunoPeriodo) {
    const alunos = alunoPeriodo[key];
    alunos.forEach((aluno) => {
        console.log(`Aluno:${aluno.nome}, turno: ${Aluno_1.turno[aluno.turno]}`);
    });
    // console.log(`-----${turno[+key]}-----`);
    // console.table(alunoPeriodo[key]);
}
