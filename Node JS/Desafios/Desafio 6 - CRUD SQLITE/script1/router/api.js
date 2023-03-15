const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');

router.get('/:categoria', productController.buscarProduto);

router.get('/', productController.exibirProdutos);

// router.put('/aumentar/:id', productController.aumentarPreco);

router.put('/alterar/', productController.alterarPreco);


// router.put('/diminuir/:id', productController.diminuirPreco);

router.post('/editar/:id', productController.editarProduto);

router.post('/', productController.adicionarProduto);

router.delete('/:id', productController.deletarProduto);


module.exports = router;