// const arry_nmbs = [1,2,3,4,5,6,7,8,9,10]

// console.log(arry_nmbs);
// console.log(arry_nmbs.filter(item=>{
//     return item >= 5;
// }))

// console.log(arry_nmbs.map((item)=>{
//     return `${item} x ${10} = ${item * 10}`;
// }))

// console.log(arry_nmbs.reduce((item, total)=>{
//     total+= item
//     return total;
// },0))


const alunos = [
    {
        nome: "Guilherme",
        idade: 15,
        turma: 'A', 
        período: 'matutino' 
    },
    {
        nome: "Jessica",
        idade: 19,
        turma: 'B',
        período: 'vespertino'
    },
    {
        nome: "Camilly",
        idade: 17,
        turma: 'A',
        período: 'vespertino'
    },
    {
        nome: "Ivan",
        idade: 20,
        turma: 'B',
        período: 'matutino'
    },
    {
        nome: 'Roseli',
        idade: 15,
        turma: 'A',
        período: 'diurno'
    },
    {
        nome: 'Heloisa',
        turma: 'C',
        período: 'matutino'
    },
    {
        nome: 'Matheus',
        turma: 'C',
        período: 'matutino'
    }
]

// alunos.forEach(aluno => {
//     console.log(aluno);
// })

// console.log(alunos.filter(aluno => {
//     return aluno.idade < '19';
// }))

// console.log(alunos.map(aluno => {
//     return `Aluno ${aluno.nome} possui ${aluno.idade} anos`
// }))

// console.log("A idade média dos alunos é: " + alunos.reduce((total, aluno) => {
//     total += aluno.idade;
//     return total;
// }, 0) / alunos.length)


// function idadeTotalDaTurma(turma) {
//     let grupo = alunos.filter(aluno => {
//         return aluno.turma == turma;
//     }).reduce((total, aluno) => {
//         total += aluno.idade;
//         return total;
//     }, 0)
//     return grupo
// }

// function idadeTotalDaTurma2(turma){
//     let turma2 = alunos.reduce((total,aluno)=>{
//         if(aluno.turma == turma){
//             total += aluno.idade;
//         }
//         return total;
//     },0)
//     return turma2;
// }

// console.log(idadeTotalDaTurma2('A'));
// console.log(idadeTotalDaTurma('B'));


// console.log(alunos.reduce((total, aluno)=>{
//     total += aluno.idade;
//     return total;
// },0))

// console.log(alunos.filter(aluno=>{
//     return aluno.turma == 'B';
// }))


// alunos.forEach(aluno=>{
//     aluno.turma ?? 'C';
// })
// console.log(alunos)




// const idadeC = alunos
// .filter(aluno => aluno.turma == 'C')
// .reduce((acc, aluno)=>{
//     acc += aluno.idade ??  15;
//     return acc;
// },0)

// console.log(idadeC);

console.log(alunos);

const alunosPorPeríodo = alunos.reduce((acc,aluno)=>{
    if(!acc[aluno.período]){
        acc[aluno.período] = [];
    }

    !acc[aluno.período] ??


    acc[aluno.período].push(aluno);

    return acc;
}, {});

console.log(alunosPorPeríodo);



function agrupar(parametro){
    return alunos.reduce((acc,aluno)=>{

        if(!acc[aluno[parametro]]){
            acc[aluno[parametro]] = []
        }
    
        acc[aluno[parametro]].push(aluno);
        return acc;
    
    }, {})
}
console.log(agrupar('nome'));
console.log(agrupar('idade'));
console.log(agrupar('turma'));
console.log(agrupar('período'));