const express = require('express');
const Router = express.Router();
const controller = require('../controller/userController');

Router.get('/', controller.get);
Router.post('/', controller.post);
Router.post('/log', controller.postLogin);

module.exports = Router;