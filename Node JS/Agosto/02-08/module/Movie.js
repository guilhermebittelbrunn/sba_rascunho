const sequelize = require('sequelize');
const db = require('../database/db');
const Genre = require('./Genre');
const Movie = db.define('movie', {
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: sequelize.STRING,
        allowNull: false,
    },
});

Movie.belongsToMany(Genre, {
    through: {
        model: 'genre_movies',
    },
    foreignKey: 'idMovie',
    constraint: true,
});
Genre.belongsToMany(Movie, {
    through: {
        model: 'genre_movies',
    },
    foreignKey: 'idGenre',
    constraint: true,
});

module.exports = Movie;
