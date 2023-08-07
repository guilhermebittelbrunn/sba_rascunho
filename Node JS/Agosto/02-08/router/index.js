const express = require('express');
const Router = express.Router();
const { movie, genre } = require('../controller/index');

Router.get('/genre/create', genre.post);
Router.get('/genre/', genre.postAll);
Router.get('/genre/:id', genre.getFilms);

Router.get('/movie/create', movie.post);
Router.get('/movie', movie.get);
Router.get('/movie/:id', movie.getGenre);

module.exports = Router;
