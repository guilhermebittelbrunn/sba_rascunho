const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');


router.put('/aumentar/:id', productController.aumentarPreco);

router.put('/diminuir/:id', productController.diminuirPreco);

router.post('/editar/:id', express.urlencoded({extended:true}), productController.editarProduto);

router.get('/:nome', productController.buscarProduto);

router.get('/', productController.exibirProdutos);

router.delete('/:id', productController.deletarProduto);

router.post('/', express.urlencoded({extended:true}), productController.adicionarProduto);


module.exports = router;