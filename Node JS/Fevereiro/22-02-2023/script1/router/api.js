const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const mural = require('../module/mural');

router.get('/noticias', (req,res)=>{
    res.json(JSON.stringify(mural.MostrarNoticias()));
})

router.post('/noticias', bodyParser.json(),(req,res)=>{

    let titulo = req.body.titulo;
    let descricao = req.body.descricao;

    mural.AdicionarNoticia(titulo,descricao);

    res.send('Noticia adicionada');

})

router.delete('/noticias/:id', (req,res)=>{

    let id = req.params.id;

    mural.ApagarNoticia(id);

    res.send('Noticia apagada');

})


router.put('/noticias/:id', (req,res)=>{
    let id = req.params.id;

    mural.AtualizarNoticia(id);

    res.send('Noticia atualizada')

})

module.exports = router;