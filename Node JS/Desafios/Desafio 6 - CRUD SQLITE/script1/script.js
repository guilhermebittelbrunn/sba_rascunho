const db = require('./database/db');
const Produto = require('./module/Produto');
const express = require('express');
const app = express();
const routerApi = require('./router/api');
const path = require('path');

//Banco
db.sync().then(res=>{
    console.log('Banco conectado');
}).catch(err=>{
    console.log(err);
})

//Server

app.use(express.urlencoded({extended:true}));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/produto', routerApi);

app.listen(3000,(err)=>{
    if(err) console.log(err);
    else console.log('Servidor rodando na porta 3000');
})

