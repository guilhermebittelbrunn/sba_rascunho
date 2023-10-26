"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Alunos = exports.situacao = exports.periodo = void 0;
var periodo;
(function (periodo) {
    periodo[periodo["Matutino"] = 0] = "Matutino";
    periodo[periodo["Vespertino"] = 1] = "Vespertino";
    periodo[periodo["Noturno"] = 2] = "Noturno";
})(periodo || (exports.periodo = periodo = {}));
var situacao;
(function (situacao) {
    situacao[situacao["aprovado"] = 0] = "aprovado";
    situacao[situacao["reprovado"] = 1] = "reprovado";
})(situacao || (exports.situacao = situacao = {}));
exports.Alunos = [
    {
        nome: 'Guilherme',
        periodo: periodo.Matutino,
        idade: 16,
        situacao: situacao.aprovado
    },
    {
        nome: 'Roseli',
        periodo: periodo.Matutino,
        idade: 14,
        situacao: situacao.aprovado
    },
    {
        nome: 'Jessica',
        periodo: periodo.Vespertino,
        idade: 18,
        situacao: situacao.aprovado
    },
    {
        nome: 'Ivan',
        periodo: periodo.Noturno,
        idade: 19,
        situacao: situacao.reprovado
    },
    {
        nome: 'Camilly',
        periodo: periodo.Vespertino,
        idade: 16,
        situacao: situacao.reprovado
    },
    {
        nome: 'Heloisa',
        periodo: periodo.Noturno,
        idade: 18,
        situacao: situacao.aprovado
    },
    {
        nome: 'Matheus',
        periodo: periodo.Matutino,
        idade: 17,
        situacao: situacao.aprovado
    },
];
