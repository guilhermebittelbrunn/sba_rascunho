const express = require('express');
const mongose = require('mongoose');

const ejs = require('ejs');
const dotenv = require('dotenv').config();
const path = require('path');
const routerUser = require('./router/routerUser');
const routerAdmin = require('./router/routerAdmin');
const app = express();



//Banco
mongose.connect(process.env.MONGO_CONNECTION).then(res=>{
    console.log('Banco conectado');
}).catch(err=>{
    console.log(err);
})

//EJS

app.set('views', path.join(__dirname, 'client'));
app.set('view engine', 'ejs');


//Servidor
app.get('/', (req,res)=>{res.redirect('http://localhost:4000/user')});
app.use('/user', routerUser);
app.use('/admin', routerAdmin);

app.listen(process.env.PORT, (err)=>{
    if (err){
        console.log(err);
    }else{
        console.log('Servidor rodando na porta: ' + process.env.PORT);
    }
})