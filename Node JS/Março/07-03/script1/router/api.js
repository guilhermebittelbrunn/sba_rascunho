const express = require('express');
const router = express.Router();
const Produto = require('../module/Produto');

router.delete('/:id', async(req,res)=>{

    let id = req.params.id
    console.log(id);
    const produto = await Produto.findByPk(id);

    try{
        await produto.destroy();
    }catch(err){
        return res.status(500).send(err);
    }

    res.send('Item apagado com sucesso');
    

})

router.get('/',async(req,res)=>{
    
    let produtos = await Produto.findAll();

    return res.send(produtos);

})



router.post('/', express.urlencoded({extended:true}), async(req,res)=>{
    console.log(req.body);

    await Produto.create({
        nome: req.body.nome,
        descricao: req.body.descricao,
        preco: req.body.preco
    })
    console.log('Item adicionado com sucesso');

    res.redirect('/')
})

module.exports = router;