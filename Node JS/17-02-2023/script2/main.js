const { ok } = require('assert');
const express = require('express');
const app = express();
const url = require('url');
// const fs = require('fs');
const path = require('path');


let imagepath = path.join(__dirname, 'imagem.jpg');
console.log(imagepath);

Teste = {
    ok: true
}

Carro = {
    marca: "Volkswagen",
    modelo: "Jetta",
    ano: 2018
}

// function readText(path){
//     fs.readFile(path, (err, data)=>{
//         if(err){
//             console.log(err);
//         }else{
//             return data;
//         }
//     })
// }

// fs.writeFile('text.txt', 'Hello World!', (err)=>{
//     if(err){throw err}
//     else{console.log('Arquivo criado com sucesso');}
// })


app.get('/teste',(req,res)=>{
    res.type('application/json');
    let y = url.parse(req.url).query;
    if (y == null){
        res.send(Teste);
    }else{
       res.send('socorro');
    }
    res.end();
})


app.get('/', (req,res)=>{
    res.type('html');
    res.send('<h1>Página principal</h1>');
})

app.get('/image', (req,res)=>{
    res.type('jpg');
    res.send(imagepath);
})


app.listen(4000, (err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('Servidor criado na porta: 4000')
    }
})

