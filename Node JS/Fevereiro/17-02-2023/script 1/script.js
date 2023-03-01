const express = require('express');
const path = require('path');
const app = express();

let x = {
    ok: true,
}

let pathrequire = path.join(__dirname, 'cliente');

app.listen(3000, (err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('Servidor rodando na porta 3000')
        app.use(express.static(pathrequire));
        app.get('/teste' ,(req,res)=>{
            res.send(x)
        })
        app.get('/index', (req,res)=>{
            res.type("html");
            res.send("<h1>Página index</h1>");
        })
    }
})