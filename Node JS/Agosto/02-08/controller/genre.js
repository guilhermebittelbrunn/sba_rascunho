const { Genre, Movie } = require('../module/index');
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
            await Genre.create({ name: 'Cartoon' });
            res.send('Item created');
        } catch (err) {
            console.log(err);
            res.send('err').status(500);
        }
    },
    postAll: async (req, res) => {
        try {
            const { data } = await axios.get('https://api.themoviedb.org/3/genre/movie/list?language=pt', options);
            console.log(data);

            data['genres'].forEach(async (genre) => {
                await Genre.create(genre);
            });
            const genres = await Genre.findAll();
            res.send(genres);
        } catch (err) {
            res.send(err);
        }
    },
    getFilms: async (req, res) => {
        const { id } = req.params;
        const genre = await Genre.findByPk(id, {
            include: [
                {
                    model: Movie,
                    attributes: ['id', 'title'],
                },
            ],
        });
        res.send(genre);
    },
};

module.exports = controller;
