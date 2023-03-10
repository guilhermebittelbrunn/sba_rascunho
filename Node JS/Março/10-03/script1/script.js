const alunos = [
    {
        nome: 'Guilherme',
        idade: 20,
        periodo: 'matutino'
    },
    {
        nome: 'Jessica',
        idade: 19,
        periodo: 'matutino'
    },
    {
        nome: 'Roseli',
        idade: 15,
        periodo: 'noturno'
    },
    {
        nome: 'Ivan',
        idade: 21,
        periodo: 'vespertino'
    },
    {
        nome: 'Camilly',
        idade: 12,
        periodo: 'vespertino'
    },
    {
        nome: 'Heloisa',
        idade: 20,
        periodo: 'noturno'
    },

]

function agrupar(parametro) {
    return alunos.reduce((acc, aluno) => {
        if (!acc[aluno.parametro]) {
            acc[aluno.parametro] = [];
        }
        acc[aluno.parametro].push(aluno);
        return acc;
    }, {});
}



console.log('Lista de alunos por período:', agrupar('periodo'));