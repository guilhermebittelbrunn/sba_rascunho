const csv = require('csv-parser');
const fs = require('fs');
const result = [];

const formatter = Intl.DateTimeFormat('pt-BR', {
    dateStyle: "short"
})


fs.createReadStream('./forms.csv')
.pipe(csv({
    separator: ','
}))
.on('data', (data)=>{
    result.push(data);
})
.on('error', (error)=>{
    console.log(error);
})
.on('end', ()=>{
    result.forEach(element=>{
        element.Data = typeof Date.parse(new Date);
    })
    console.log(result[1]);
})


// let date_now = new Date();
// date_now = Date.parse(date_now);



// let objt = {

//     date_format: undefined

// }


// objt.date_format = formatter.format(date_now);
// console.log(objt);