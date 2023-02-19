const express = require('express');
const app = express();
const PORT = 3000;

let Teste = {
    ok: true
}

app.get('/', (req,res)=>{
    res.set('text/html');
    res.send('<h1>Página Inicial</h1>');
})

app.get('/teste', (req,res)=>{
    let query = req.query.ok;
    if(query == null){
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