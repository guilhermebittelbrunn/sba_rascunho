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
    dataset: undefined,
};

setTimeout(() => {
    console.log('Conectado!');
}, 1000);
