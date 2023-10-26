export enum periodo{
    Matutino, Vespertino, Noturno

}
export enum situacao{
    aprovado, reprovado
}

export interface Aluno{
    nome: string,
    periodo: periodo,
    idade: number,
    situacao: situacao
}


export const Alunos:Aluno[] = [
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
]