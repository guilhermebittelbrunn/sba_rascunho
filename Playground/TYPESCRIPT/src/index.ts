import Aluno, { turno } from "./interfaces/Aluno";
import { Alunos } from "./Alunos";

type accAluno = { [index: string]: Aluno[] };

function filtrarAlunos<T extends keyof Aluno>(listAlunos: Aluno[], filtro: T): accAluno {
    const list = listAlunos.reduce((acc: accAluno, aluno: Aluno) => {
        if (!acc[aluno[filtro]]) {
            acc[aluno[filtro]] = [];
        }
        acc[aluno[filtro]].push(aluno);
        return acc;
    }, {});
    return list;
}

const alunoPeriodo = filtrarAlunos(Alunos, "turno");

for (let key in alunoPeriodo) {
    const alunos = alunoPeriodo[key];
    alunos.forEach((aluno) => {
        console.log(`Aluno:${aluno.nome}, turno: ${turno[aluno.turno]}`);
    });

    // console.log(`-----${turno[+key]}-----`);
    // console.table(alunoPeriodo[key]);
}
