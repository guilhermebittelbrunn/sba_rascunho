const express = require('express');
const Router = express.Router();
const controller_cidades = require('./database/controller/cidade.js');

Router.get('/', (req, res) => {
    res.send('hello world');
});

Router.get('/post', controller_cidades.post);
Router.get('/:id', controller_cidades.getByRC);

module.exports = Router;
