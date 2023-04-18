const fs = require('fs');
const csv = require('csv-parser');

let info = [];

fs.createReadStream('./form.csv')
    .pipe(csv({ separator: ',' }))
    .on('data', (data) => {
        info.push(data);
    })
    .on('error', (error) => {
        console.log(error);
    })
    .on('end', (end) => {
        console.log(info);
    });
