const express = require('express');
const router = express.Router();
const Produto = require('../module/Produto');
const productController = require('../controller/productController');


router.get('/', productController.exibirProdutos);

router.put('/aumentar/:id', productController.aumentarPreco);

router.put('/diminuir/:id', productController.diminuirPreco);

router.get('/:nome', productController.buscarProduto);

router.delete('/:id', productController.deletarProduto);

router.post('/', express.urlencoded({extended:true}), productController.adicionarProduto);


module.exports = router;