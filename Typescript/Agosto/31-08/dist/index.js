'use strict';
var eturno;
(function (eturno) {
    eturno[(eturno['matutino'] = 0)] = 'matutino';
    eturno[(eturno['vespertino'] = 1)] = 'vespertino';
    eturno[(eturno['noturno'] = 2)] = 'noturno';
})(eturno || (eturno = {}));
const Alunos = [
    {
        nome: 'Guilherme',
        idade: 17,
        turno: eturno.vespertino,
    },
    {
        nome: 'Jessica',
        idade: 14,
        turno: eturno.vespertino,
    },
    {
        nome: 'Roseli',
        idade: 19,
        turno: eturno.matutino,
        lider: true,
    },
    {
        nome: 'Ivan',
        idade: 18,
        turno: eturno.noturno,
    },
    {
        nome: 'Camilly',
        idade: 19,
        turno: eturno.matutino,
    },
];
const alunosPorTurno = Alunos.reduce((acc, aluno) => {
    // const categoria = aluno.lider ? "Lider" : "Comum";
    const categoria = eturno[aluno['turno']];
    if (acc[categoria] === undefined) {
        acc[categoria] = [];
    }
    acc[categoria].push(Object.assign(Object.assign({}, aluno), { categoria }));
    return acc;
}, {});
for (let key in alunosPorTurno) {
    console.log(`--- ${key} ---`);
    console.table(alunosPorTurno[key]);
}
