const express = require('express');
const api = express.Router();
const apiController = require('../controller/apiController');

api.get('/', apiController.true);

api.get('/false', apiController.false);

module.exports = api;
