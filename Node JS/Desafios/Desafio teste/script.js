const fs = require('fs');
const jasper = require('node-jasper')({
    path: './reports', //Report path
    reports: {
        relatorio: {
            jasper: './reports/relatorio.jasper', //Doc.jasper path
            jrxml: './reports/relatorio.jrxml', //Doc.jrxml path
            conn: 'in_memory_json',
        },
    },
});

const report = {
    report: 'relatorio', //File
    data: {
        nome: 'Guilherme',
        idade: 21,
        turma: '1A',
    },
    dataset: [
        {
            endereco: 'Rua ficticia, número inexistente, bairro imaginário',
            telefone: '(00) 0000-0000',
            Alunos: [
                {
                    nome: 'Guilherme',
                    idade: 20,
                    turma: '1A',
                },
                {
                    nome: 'Ivan',
                    idade: 18,
                    turma: '3B',
                },
                {
                    nome: 'Roseli',
                    idade: 21,
                    turma: '4A',
                },
                {
                    nome: 'Jessica',
                    idade: 17,
                    turma: '2B',
                },
                {
                    nome: 'Camilly',
                    idade: 15,
                    turma: '1B',
                },
                {
                    nome: 'Guilherme',
                    idade: 20,
                    turma: '1A',
                },
                {
                    nome: 'Ivan',
                    idade: 18,
                    turma: '3B',
                },
                {
                    nome: 'Roseli',
                    idade: 21,
                    turma: '4A',
                },
                {
                    nome: 'Jessica',
                    idade: 17,
                    turma: '2B',
                },
                {
                    nome: 'Camilly',
                    idade: 15,
                    turma: '1B',
                },
                {
                    nome: 'Guilherme',
                    idade: 20,
                    turma: '1A',
                },
                {
                    nome: 'Ivan',
                    idade: 18,
                    turma: '3B',
                },
                {
                    nome: 'Roseli',
                    idade: 21,
                    turma: '4A',
                },
                {
                    nome: 'Jessica',
                    idade: 17,
                    turma: '2B',
                },
                {
                    nome: 'Camilly',
                    idade: 15,
                    turma: '1B',
                },
                {
                    nome: 'Guilherme',
                    idade: 20,
                    turma: '1A',
                },
                {
                    nome: 'Ivan',
                    idade: 18,
                    turma: '3B',
                },
                {
                    nome: 'Roseli',
                    idade: 21,
                    turma: '4A',
                },
                {
                    nome: 'Jessica',
                    idade: 17,
                    turma: '2B',
                },
                {
                    nome: 'Camilly',
                    idade: 15,
                    turma: '1B',
                },
                {
                    nome: 'Guilherme',
                    idade: 20,
                    turma: '1A',
                },
                {
                    nome: 'Ivan',
                    idade: 18,
                    turma: '3B',
                },
                {
                    nome: 'Roseli',
                    idade: 21,
                    turma: '4A',
                },
                {
                    nome: 'Jessica',
                    idade: 17,
                    turma: '2B',
                },
                {
                    nome: 'Camilly',
                    idade: 15,
                    turma: '1B',
                },
                {
                    nome: 'Guilherme',
                    idade: 20,
                    turma: '1A',
                },
                {
                    nome: 'Ivan',
                    idade: 18,
                    turma: '3B',
                },
                {
                    nome: 'Roseli',
                    idade: 21,
                    turma: '4A',
                },
                {
                    nome: 'Jessica',
                    idade: 17,
                    turma: '2B',
                },
                {
                    nome: 'Camilly',
                    idade: 15,
                    turma: '1B',
                },
            ],
        },
    ],
};

setTimeout(() => {
    let pdf = jasper.pdf(report);
    fs.writeFileSync('./teste.pdf', Buffer.from(pdf));
    jasper.export(report, '');
    console.log('Arquivo criado');
}, 1000);
