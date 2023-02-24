const express = require('express');
const bodyparser = require('body-parser');
const noticia = require('../modulo/noticia');
const router = express.Router();

router.get('/noticias' ,(req,res)=>{
    res.json(JSON.stringify(noticia.mostrarNoticias()));
})

router.post('/noticias', bodyparser.json(), (req,res)=>{

    let titulo = req.body.titulo;
    let descricao = req.body.descricao;
    
    noticia.adicionarNoticia(titulo, descricao)

    res.send('Item adicionado');

})


router.delete('/noticias/:id', (req,res)=>{

    let id = req.params.id;

    noticia.apagarNoticia(id);

    res.send('Item apagado');

})

module.exports = router;