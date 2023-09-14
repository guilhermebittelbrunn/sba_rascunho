const { Movie, Streaming } = require('./database/modules/index');
const axios = require('axios');
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYmI0OWNmMzQzYzU2MmRmYmM4YjczMTlmMmZmMmI3NyIsInN1YiI6IjY0Yzk4MWE5MDAxYmJkMDEyNmE3MjAxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZqK6DNET911i81ING_Q6emqC5yGF_TYDy_4Uc1YDGnY',
    },
};

(async () => {
    const movies = await Movie.findAll({ raw: true, order: [['id', 'DESC']], attributes: ['idAPI'] });
    console.log(movies[0]);

    // const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${9612}?language=pt-BR`, options);
    // const newMovie = {
    //     title: data.title,
    //     sinopse: data.overview,
    //     duration: data.runtime,
    //     original_title: data.original_title,
    //     vote: data.vote_average,
    //     count_votes: data.vote_count,
    //     release: data.release_date,
    //     score_popularity: data.popularity,
    //     porter_path: data.poster_path,
    //     backdrop_path: data.backdrop_path,
    //     adult: data.adult,
    //     idAPI: data.id,
    //     json: data,
    // };
    const x = await Streaming.findByPk(119);
    x.icon_path = 'Amazon_Prime_Video';
    x.save();
    // console.log(newMovie);
})();
