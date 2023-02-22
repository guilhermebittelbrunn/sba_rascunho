const express = require('express');
const path = require('path');
const router = require('./router/api')
const app = express();
const port = 4000;

let pathindex = path.join(__dirname, 'cliente');

app.use('/', express.static(pathindex));
app.use('/api', router);

app.listen(port, (err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('Servidor rodando na porta: ' + port);
    }
})