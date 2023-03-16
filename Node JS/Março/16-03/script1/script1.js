const fs = require('fs');
const csv = require('csv-parser');

let data_csv = []

fs.createReadStream('./exemplo.csv')
    .pipe( csv({
        separator: ',',

    
    }))
    .on('data', (data) =>{
        data_csv.push(data);
    })
    .on('end', ()=>{
        console.log(data_csv);
    })
    .on('error' , (error)=>{
        console.log(error);
    })

