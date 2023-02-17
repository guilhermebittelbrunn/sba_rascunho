const express = require('express');
const app = express();

let x = {
    ok: true
}

app.get('/teste', (req,res)=>{
    res.send(x);
})

app.listen(3000, (err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('Servidor criado com sucesso');
    }
})
