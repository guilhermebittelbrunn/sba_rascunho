const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const todo = require('../todo/todo.js');


router.get('/todos', (req,res)=>{
    
    res.json(JSON.stringify(todo.listarAtividades()))

})

router.post('/novo', bodyParser.json(),(req,res)=>{

    let titulo = req.body.titulo;

    todo.adicionarAtividade(titulo);

    res.send('Post adicionado');

    
})

router.delete('/deletar', bodyParser.json() ,(req,res)=>{

    let id = req.bodyParser.id;

    todo.deletarAtividade(id);

    console.log('teste log')

    res.send('Item deletado');

})


module.exports = router;