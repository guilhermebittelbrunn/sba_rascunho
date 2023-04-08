const express = require('express');
const api = express.Router();
const apiController = require('../controller/apiController');

api.get('/', apiController.true);
api.get('/false', apiController.false);
api.get('/ani', apiController.createAni);
api.get('/vet', apiController.createVet);
api.get('/con', apiController.createCon);
api.get('/ejs', apiController.ejs);

module.exports = api;
