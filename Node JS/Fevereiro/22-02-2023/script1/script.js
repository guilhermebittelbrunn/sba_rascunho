const express = require('express');
const path = require('path');
const app = express();
const apiRouter = require('./router/api');
const PORT = 4000;
const indexpath = path.join(__dirname, 'cliente');


app.use('/', express.static(indexpath));
app.use('/cliente', apiRouter);


app.listen(PORT, (err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('Servidor rodando na porta: ' + PORT);
    }
})