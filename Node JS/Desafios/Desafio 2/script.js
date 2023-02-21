const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req,res)=>{
    res.set('text/html');
    res.send('<h1>Página Inicial</h1>');
})

app.get('/teste', (req,res)=>{
    let Teste = {
        ok: true
    }
    let query = req.query.ok;
    res.set('application/json');
    if(query === undefined){
        res.send(Teste);
    }else{
        Teste.ok = query;
        res.send(Teste);
    }
})




app.listen(PORT, (err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('Servidor rodando na porta: ' + PORT);
    }
})