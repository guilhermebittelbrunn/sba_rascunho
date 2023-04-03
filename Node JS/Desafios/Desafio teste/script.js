const fs = require('fs');
const jasper = require('node-jasper')({
    path: './reports', //Report path
    reports: {
        relatorio: {
            jasper: './reports/relatorio.jasper', //Doc.jasper path
            conn: 'in_memory_json',
        },
    },
});

const report = {
    report: 'relatorio', //File
    data: {},
    dataset: {
        teste: ['Guilherme', 'Ivan'],
    },
};

setTimeout(() => {
    let pdf = jasper.pdf(report);
    fs.writeFileSync('./teste.pdf', Buffer.from(pdf));
    console.log('Arquivo criado');
}, 1000);
