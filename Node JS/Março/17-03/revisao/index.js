const csv = require('csv-parser');
const fs = require('fs');
const data_csv = [];

fs.createReadStream('./exemplo.csv')
    .pipe(
        csv({
            separator: ',',
        })
    )
    .on('data', (data) => {
        data_csv.push(data);
    })
    .on('end', () => {
        let lista_idade = data_csv.reduce((acc, p) => {
            let dec = Math.floor(parseInt(p['Age']) / 10);
            if (!acc[dec + '0']) {
                acc[dec + '0'] = [];
            }
            acc[dec + '0'].push(p);
            return acc;
        }, {});
        fs.writeFile('formatacao.txt', JSON.stringify(lista_idade), (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('formatacao.txt criado com sucesso!');
            }
        });
    })
    .on('error', (error) => {
        console.log(error);
    });

fs.readFile('./formatacao.txt', 'utf-8', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(JSON.parse(data));
    }
});
