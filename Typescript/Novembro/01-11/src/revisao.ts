enum turno{
    matutino, vespertino, noturno
}

enum situacao{
    aprovado, reprovado
}

interface Aluno{
    nome: string,
    idade: number,
    situacao: situacao,
    turno: turno,
}

const listaAlunos:Aluno[] = [
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
]


function filtraAlunos<T extends keyof Aluno>(lista:Aluno[], filtro:T){
    const listaNova = lista.reduce((acc:{[index:string]: Aluno[]},element:Aluno)=>{
        if(acc[element[filtro]] === undefined){
            acc[element[filtro]] = [];
        }
        acc[element[filtro]].push(element)
        return acc
    }, {})
    return listaNova
}

const listaPorPeriodo = filtraAlunos(listaAlunos, 'turno');
const listaPorSituacao = filtraAlunos(listaAlunos, 'situacao');

for(let key in listaPorPeriodo){
    console.log(`---${turno[+key]}---`);
    console.table(listaPorPeriodo[key]);
}

for(let key in listaPorSituacao){
    console.log(`---${situacao[+key]}---`);
    console.table(listaPorSituacao[key]);
}









