const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const apiRouter = require('./routes/api');
const app = express();
const port = 3000;

//Conexão com o banco
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/escola').then(res=>{
    console.log('Banco conectado');
}).catch(err=>{
    console.log(err);
})

//EJS

app.set('views', path.join(__dirname,'/cliente/views'));
app.set('view engine', 'ejs');

//Conexão com servidor

app.use('/professores', apiRouter);
app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('Servidor rodando na porta: ' + port);
    }
})