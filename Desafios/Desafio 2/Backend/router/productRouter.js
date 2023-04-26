const express = require('express');
const Router = express.Router();
const productController = require('../controller/produtctController');

Router.get('/', productController.get);
// Router.post();
// Router.put();
// Router.delete();

module.exports = Router;
