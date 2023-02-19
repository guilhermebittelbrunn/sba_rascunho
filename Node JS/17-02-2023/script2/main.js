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


// app.get('/teste',(req,res)=>{
//     res.type('application/json');
//     let z = req.params.ok;
//     let y = url.parse(req.url).query;
//     if (y == null){
//         res.send(Teste);
//     }else{
//         let dados = req.params.ok;
//         Teste.ok = 333;
//         res.send(req.params.ok);
//     }
//     res.end();
// })

app.get("/teste", (req,res)=>{
    let a = req.query;
    let dado = req.query.ok;
    console.log(a, dado);
    if (dado == null){
        res.send(Teste);
    }else{
        Teste.ok = dado;
        res.send(Teste);
    }
    console.log(Teste);
    console.log(req.url);
    console.log(url.parse(req.url));
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

