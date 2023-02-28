require('dotenv').config();
const express = require('express');
const userRouter = require('./router/user');
const adminRouter = require('./router/admin');
const app = express();
const mongoose = require('mongoose');
const path = require('path');

mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://guilherme:ZEDchuva123@cluster0.qyohwnh.mongodb.net/test').then(res=>{
    console.log('Banco rodando');
}).catch(err=>{
    console.log(err);
})

app.set('views', path.join(__dirname,'public'));
app.set('view engine', 'ejs');

app.get('/', (req,res)=>{res.render('index')});
app.use('/user', userRouter);
app.use('/admin', adminRouter); 
app.listen(process.env.PORT,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('Servidor rodando na porta: ' + process.env.PORT);
    }
})
