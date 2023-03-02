// const Carro = {
//     marca: 'Volkswagen',
//     modelo: 'Jetta',
//     ano: 2018
// }

// const {modelo, ano} = Carro;

// console.log(modelo + ano);


// const array1 = [10,20,30];
// const array2 = [...array1, 50, 60];
// const [primeiro,segundo] = array2

// console.log(array2);
// array1.push(40);
// console.log(array2);
// console.log(array1);
// console.log(primeiro);
// console.log(segundo);


const express = require('express');
const path = require('path');
const app = express();
const pathIndex = path.join(__dirname, 'public');
const fs = require('fs');
const ejs = require('ejs');

app.set('views', pathIndex);
app.set('view engine', 'ejs');

let lista = ['Tiago', 'Guilherme', 'Francisco'];

app.get('/lista', (req,res)=>{
    return res.send(lista)
});

app.use('/', express.static(pathIndex))



app.get('/text', (req, res) => {
    fs.readFile('./texto.txt', 'utf8', (err, data) => {
        if (err) { 
            return res.status(400).send('erro de qualquer coisa') 
        }
        res.send(data);
    })
})



app.listen(3000, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Servidor rodando na porta 3000');
    }
})

