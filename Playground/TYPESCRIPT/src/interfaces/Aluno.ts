export enum turno {
    "matutino",
    "vespertino",
    "noturno",
}

export enum situacao {
    "aprovado",
    "reprovado",
}

export default interface Aluno {
    nome: string;
    idade: number;
    turno: turno;
    situacao: situacao;
}
