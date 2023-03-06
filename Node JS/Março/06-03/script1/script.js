//Packages
const express = require('express');
const mongoose = require('mongoose');
const joi = require('@hapi/joi');
const ejs = require('ejs');
const path = require('path');
const news_router = require('./router/news');
require('dotenv').config();


//Variables
const path_index = path.join(__dirname, 'public');
const app = express();

//Banco connection
mongoose.connect('mongodb+srv://guilherme:ZEDchuva123@cluster0.qyohwnh.mongodb.net/notices').then(res=>{
    console.log('Banco rodando');
}).catch(err=>{
    console.log(err);
})


//Server connection
app.use('/news', news_router);
app.use('/', express.static(path_index));
app.listen(process.env.port, (err)=>{
    if(err) console.log(err);
    else console.log('Servidor rodando na porta: ' + process.env.port);
})



