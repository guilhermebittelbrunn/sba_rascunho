const express = require('express');
const api = express.Router();
const apiController = require('../controller/apiController');

api.get('/', apiController.showAll);
api.get('/create', apiController.create);
api.get('/read', apiController.read);
api.get('/delete', apiController.delete);
api.get('/update/:id', apiController.update);
api.get('/index', apiController.index);

module.exports = api;
