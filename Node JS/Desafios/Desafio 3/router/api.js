const express = require('express');
const bodyparser = require('body-parser');
const noticia = require('../modulo/noticia');
const router = express.Router();

router.get('/noticias' ,(req,res)=>{
    res.json(noticia.mostrarNoticias());
})


module.exports = router;