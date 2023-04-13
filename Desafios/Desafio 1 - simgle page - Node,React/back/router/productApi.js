const express = require('express');
const cors = require('cors');
const productController = require('../controller/productController');
const productRounter = express.Router();

productRounter.use(express.urlencoded({ extended: true }));
productRounter.use(express.json());
productRounter.use(cors());

productRounter.post('/', productController.create);
productRounter.get('/', productController.show);
productRounter.delete('/:id', productController.delete);
productRounter.put('/:id');

module.exports = productRounter;
