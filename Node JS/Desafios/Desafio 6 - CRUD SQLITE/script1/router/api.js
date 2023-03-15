const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');

router.get('/:categoria', productController.buscarProduto);

router.get('/', productController.exibirProdutos);

router.put('/', productController.alterarPreco);

router.post('/:id', productController.editarProduto);

router.post('/', productController.adicionarProduto);

router.delete('/:id', productController.deletarProduto);


module.exports = router;