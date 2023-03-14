const db = require('./db/db');
const Aluno = require('./module/Aluno');
const router_api = require('./router/api');
const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();

async function connection(){
    try{
        await db.sync();
        console.log('Banco conectado com sucesso');
    }catch(err){
        console.log(err);
    }
}

connection();

app.use('/', express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended:true}));
app.use(router_api);
app.listen(process.env.PORT, (err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('Servidor rodando na porta: ' + process.env.PORT);
    }
})
