const express = require('express');
const path = require('path');
const routerApi = require('./router/api');

const port = 4000;
const app = express();
const pathindex = path.join(__dirname, 'cliente');


app.use('/', express.static(pathindex));
app.use('/news', routerApi);

app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('Servidor rodando na porta: ' + port);
    }
})