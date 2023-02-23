const express = require('express');
const mongoose = require('mongoose');

const port = 3000;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/alunos', (err, db)=>{
    console.log(err);
    console.log(db);
})



app.get('/', (req,res)=>{
    res.type('html');
    res.send('<h1>Página inicial</h1>');
})


app.get('/teste', (req,res)=>{
    let query = req.query.ok;
    res.type('json');
    if(query === undefined){
        res.send('{ok: true}');
    }else{
        res.send(`{ok: ${query}}`)
    }
})



app.listen(port, (err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('Servidor rodando na porta: ' + port);
    }
})