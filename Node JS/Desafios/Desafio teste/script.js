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
    data: {},
    dataset: {
        Turmas: [
            {
                turma: '1A',
                quantidade: 12,
            },
            {
                turma: '1B',
                quantidade: 15,
            },
            {
                turma: '2A',
                quantidade: 23,
            },
            {
                turma: '2B',
                quantidade: 8,
            },
            {
                turma: '2A',
                quantidade: 23,
            },
            {
                turma: '2B',
                quantidade: 8,
            },
            {
                turma: '2A',
                quantidade: 23,
            },
            {
                turma: '2B',
                quantidade: 8,
            },
        ],
        Alunos: [
            {
                nome: 'Guilherme',
                idade: 20,
                turma: '2A',
                notas: [10, 20, 30],
                aprovado: true,
            },
            {
                nome: 'Jessica',
                idade: 17,
                turma: '5A',
                notas: [30, 20, 30],
                aprovado: true,
            },
            {
                nome: 'Ivan',
                idade: 21,
                turma: '3B',
                notas: [10, 10, 20],
                aprovado: false,
            },
            {
                nome: 'Guilherme',
                idade: 20,
                turma: '2A',
                notas: [10, 20, 30],
                aprovado: true,
            },
            {
                nome: 'Jessica',
                idade: 17,
                turma: '5A',
                notas: [30, 20, 30],
                aprovado: true,
            },
            {
                nome: 'Ivan',
                idade: 21,
                turma: '3B',
                notas: [10, 10, 20],
                aprovado: false,
            },
            {
                nome: 'Guilherme',
                idade: 20,
                turma: '2A',
                notas: [10, 20, 30],
                aprovado: true,
            },
            {
                nome: 'Jessica',
                idade: 17,
                turma: '5A',
                notas: [30, 20, 30],
                aprovado: true,
            },
            {
                nome: 'Ivan',
                idade: 21,
                turma: '3B',
                notas: [10, 10, 20],
                aprovado: false,
            },
            {
                nome: 'Guilherme',
                idade: 20,
                turma: '2A',
                notas: [10, 20, 30],
                aprovado: true,
            },
            {
                nome: 'Jessica',
                idade: 17,
                turma: '5A',
                notas: [30, 20, 30],
                aprovado: true,
            },
            {
                nome: 'Ivan',
                idade: 21,
                turma: '3B',
                notas: [10, 10, 20],
                aprovado: false,
            },
            {
                nome: 'Guilherme',
                idade: 20,
                turma: '2A',
                notas: [10, 20, 30],
                aprovado: true,
            },
            {
                nome: 'Jessica',
                idade: 17,
                turma: '5A',
                notas: [30, 20, 30],
                aprovado: true,
            },
            {
                nome: 'Ivan',
                idade: 21,
                turma: '3B',
                notas: [10, 10, 20],
                aprovado: false,
            },
        ],
    },
};

setTimeout(() => {
    let pdf = jasper.pdf(report);
    fs.writeFileSync('./teste.pdf', Buffer.from(pdf));
    jasper.export(report, '');
    console.log('Arquivo criado');
}, 1000);
