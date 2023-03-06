const express = require('express');
const router = express();
const controller = require('../controller/newsController');

router.get('/all', controller.exibirNoticias);

router.get('/sobre', (req,res)=>{
    res.send('teste2')
});

router.get('/adicionar', (req,res)=>{
    res.send('teste3')
});

router.post('/', express.urlencoded({extended:true}), controller.adicionarNoticia);

module.exports = router;