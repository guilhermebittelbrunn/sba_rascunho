const { Movie, Genre } = require('../module/index');
const axios = require('axios');

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYmI0OWNmMzQzYzU2MmRmYmM4YjczMTlmMmZmMmI3NyIsInN1YiI6IjY0Yzk4MWE5MDAxYmJkMDEyNmE3MjAxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZqK6DNET911i81ING_Q6emqC5yGF_TYDy_4Uc1YDGnY',
    },
};

const controller = {
    post: async (req, res) => {
        try {
            // const genre = await Genre.create({ name: 'action' });
            // const movie = await Movie.create({ title: 'Star Wars' });
            // await movie.setGenres([genre]);
            const { data } = await axios.get(
                'https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=500',
                options
            );
            res.send(data);
        } catch (err) {
            console.log(err);
            res.send('err').status(500);
        }
    },
    get: async (req, res) => {
        const { id } = req.params;
        try {
            const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}?language=pt-BR`, options);
            const movie = await Movie.create({ title: data.original_title });
            data['genres'].forEach(async (genre) => {
                const genreFilm = await Genre.findByPk(genre.id);
                await movie.setGenres([genreFilm]);
            });
            res.send(movie);
        } catch (err) {
            console.log('err get', err);
            res.send('err get');
        }
    },
    getGenre: async (req, res) => {
        const { id } = req.params;
        const movie = await Movie.findByPk(id, {
            include: [
                {
                    model: Genre,
                    attributes: ['id', 'name'],
                },
            ],
        });
        res.send(movie);
    },
};

module.exports = controller;
