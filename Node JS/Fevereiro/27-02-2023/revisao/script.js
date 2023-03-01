//Package's
const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const port = 4000;
const app = express();
const apiRouter = require('./router/api');



//Conectt mongoDB
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/escola').then(res=>{
    console.log('Banco conectado com sucesso');
}).catch(err=>{
    console.log(err);
})

//EJS engine
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');

//Server

app.use('/alunos', apiRouter);
app.listen(port, (err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('Servidor rodando na porta: ' + port);
    }
})