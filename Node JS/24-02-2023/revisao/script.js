const express = require('express');
const ejs = require('express');
const path = require('path');

const port = 4000;
const app = express();
const pathindex = path.join(__dirname, 'views');

let alunos = ['Guilherme', 'Jessica', 'Camilly', 'Arthur', 'Heloisa'];


app.set('views', pathindex);
app.set('view engine', 'ejs');

app.get('/', (req,res)=>{
    res.render('index', {alunos: alunos});
})

app.get('/sobre', (req,res)=>{
    res.render('sobre',  {titulo: 'Página sobre'});
})

app.listen(port, (err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('Servido rodando na porta:' + port);
    }
})


