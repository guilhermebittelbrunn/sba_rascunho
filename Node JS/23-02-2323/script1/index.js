const ejs = require("ejs");
const express = require("express");
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

let alunos = [
    { nome: "Gustavo",  turma: "5A" },
    { nome: "Jessica",  turma: "3B" },
    { nome: "Douglas",  turma: "2A" }
]
app.set('views', './views');
app.set('view engine', "ejs");

app.get('/' ,(req,res)=>{
    res.render('index', {alunos});
})

app.get('/about', (req,res)=>{
    res.render('about')
})


app.listen(PORT, (err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('Servidor rodando na porta:' + PORT);
    }
})

// //FORMA 1
// for (let aluno = 0; aluno < alunos.length; aluno++){
//     console.log(alunos[aluno].turma);
// }

// //FORMA 2
// alunos.forEach((aluno)=>{
//     console.log(aluno.nome[0]);
//     console.log(aluno.turma);
// })

// //FORMA 3
// for (let aluno of alunos){
//     console.log(aluno.nome);
//     console.log(aluno.turma);
// }

