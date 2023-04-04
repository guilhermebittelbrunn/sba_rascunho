// const turma = ['Pedro', 'Gustavo', 'Felipe', 'Lucas', 'Isadora', 'Gabriela'];

// for (let aluno = 0; aluno < turma.length; aluno++) {
//     console.log(`${turma[aluno]} possui ${turma[aluno].length} letras`);
// }

// console.log('\n\n');

// for (let aluno of turma) {
//     console.log(`${aluno} possui ${aluno.length} letras`);
// }

// console.log('\n\n');

// turma.forEach(aluno=>{
//     console.log(`${aluno} possui ${aluno.length} letras`);
// })

const turma = [
    {
        nome: 'Gustavo',
        periodo: 'matutino',
        idade: 17,
        aprovado: true,
    },
    {
        nome: 'Lucas',
        periodo: 'vespertino',
        idade: 21,
        aprovado: true,
    },
    {
        nome: 'Pedro',
        periodo: 'matutino',
        idade: 18,
        aprovado: false,
    },
    {
        nome: 'Guilherme',
        periodo: 'matutino',
        idade: 16,
        aprovado: false,
    },
    {
        nome: 'Felipe',
        periodo: 'noturno',
        idade: 17,
        aprovado: true,
    },
];

// const turma_filtro = turma.reduce((acc, aluno) => {
//     // if (!acc[aluno.aprovado]) {
//     //     acc[aluno.aprovado] = [];
//     // }
//     // acc[aluno.aprovado].push(aluno);

//     acc[aluno.aprovado] || [];
//     return acc;
// }, {});

function filterReduce(list, param) {
    return list.reduce((acc, aluno) => {
        if (!acc[aluno[param]]) {
            acc[aluno[param]] = [];
        }
        acc[aluno[param]].push(aluno);
        return acc;
    }, {});
}
turma_filtro = filterReduce(turma, 'periodo');

console.log(turma_filtro);
