"use strict";
var turno;
(function (turno) {
    turno[turno["matutino"] = 0] = "matutino";
    turno[turno["vespertino"] = 1] = "vespertino";
    turno[turno["noturno"] = 2] = "noturno";
})(turno || (turno = {}));
var situacao;
(function (situacao) {
    situacao[situacao["aprovado"] = 0] = "aprovado";
    situacao[situacao["reprovado"] = 1] = "reprovado";
})(situacao || (situacao = {}));
const listaAlunos = [
    {
        nome: 'Guilherme',
        idade: 16,
        situacao: situacao.aprovado,
        turno: turno.matutino
    },
    {
        nome: 'Jessica',
        idade: 14,
        situacao: situacao.aprovado,
        turno: turno.matutino
    },
    {
        nome: 'Camilly',
        idade: 18,
        situacao: situacao.reprovado,
        turno: turno.vespertino
    },
    {
        nome: 'Ivan',
        idade: 19,
        situacao: situacao.reprovado,
        turno: turno.noturno
    },
    {
        nome: 'Roseli',
        idade: 18,
        situacao: situacao.aprovado,
        turno: turno.matutino
    },
    {
        nome: 'Heloisa',
        idade: 20,
        situacao: situacao.aprovado,
        turno: turno.noturno
    },
    {
        nome: 'Matheus',
        idade: 20,
        situacao: situacao.aprovado,
        turno: turno.vespertino
    },
];
function filtraAlunos(lista, filtro) {
    const listaNova = lista.reduce((acc, element) => {
        if (acc[element[filtro]] === undefined) {
            acc[element[filtro]] = [];
        }
        acc[element[filtro]].push(element);
        return acc;
    }, {});
    return listaNova;
}
const listaPorPeriodo = filtraAlunos(listaAlunos, 'turno');
const listaPorSituacao = filtraAlunos(listaAlunos, 'situacao');
for (let key in listaPorPeriodo) {
    console.log(`---${turno[+key]}---`);
    console.table(listaPorPeriodo[key]);
}
for (let key in listaPorSituacao) {
    console.log(`---${situacao[+key]}---`);
    console.table(listaPorSituacao[key]);
}
