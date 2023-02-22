const express = require('express');
const path = require('path');

const app = express();
const port = 4000;

let pathindex = path.join(__dirname, 'cliente');

app.use('/', express.static(path.join(__dirname)));

app.get('/', (req,res)=>{
    res.send('teste');
})

app.listen(port, (err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('Servidor rodando na porta: ' + port);
        console.log(pathindex)
    }
})