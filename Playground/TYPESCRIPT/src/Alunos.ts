import Aluno, { situacao, turno } from "./interfaces/Aluno";

export const Alunos: Aluno[] = [
    {
        nome: "Guilherme",
        idade: 18,
        turno: turno.matutino,
        situacao: situacao.aprovado,
    },
    {
        nome: "Ivan",
        idade: 16,
        turno: turno.noturno,
        situacao: situacao.reprovado,
    },
    {
        nome: "Jessica",
        idade: 17,
        turno: turno.vespertino,
        situacao: situacao.aprovado,
    },
    {
        nome: "Camilly",
        idade: 18,
        turno: turno.matutino,
        situacao: situacao.aprovado,
    },
    {
        nome: "Roseli",
        idade: 15,
        turno: turno.vespertino,
        situacao: situacao.aprovado,
    },
    {
        nome: "Heloisa",
        idade: 19,
        turno: turno.noturno,
        situacao: situacao.aprovado,
    },
    {
        nome: "Matheus",
        idade: 19,
        turno: turno.vespertino,
        situacao: situacao.reprovado,
    },
];
