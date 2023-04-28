const express = require('express');
const Router = express.Router();
const productController = require('../controller/produtctController');

Router.get('/:id', productController.get);
Router.post('/', productController.post);
Router.delete('/:id', productController.delete);
Router.put('/', productController.put);
// Router.put();
// Router.delete();

module.exports = Router;
