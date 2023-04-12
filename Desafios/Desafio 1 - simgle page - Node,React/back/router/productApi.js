const express = require('express');
const cors = require('cors');
const productController = require('../controller/productController');
const productRounter = express.Router();

productRounter.use(express.urlencoded({ extended: true }));
productRounter.use(express.json());
productRounter.use(cors());

productRounter.post('/', productController.createProduct);
productRounter.get('/', productController.showProducts);
productRounter.delete('/:id');
productRounter.put('/:id');

module.exports = productRounter;
