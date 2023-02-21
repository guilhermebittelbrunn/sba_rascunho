const express = require('express');
const app = express();
const port = 3000;


app.get('/', (req,res)=>{
    res.set('text/html');
    res.send('<h1>Página Inicial</h1>');
})

app.get('/teste', (req,res)=>{
    res.set('Application/json');
    let query = req.query.ok;
    if(query === undefined){
        res.send({ok: true});
    }else{
        res.send({ok: query});
    }
})

app.listen(port, (err)=>{
    if(err){
        console.log(err);
    }else{
        console.log(`Servidor rodando na porta: ${port}`);
    }
})