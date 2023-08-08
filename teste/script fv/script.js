require("dotenv").config();
const axios = require("axios");

const sequelize = require("sequelize");
const filme = require("./filme");
const genero_filme = require("./genero_filme");
const genero = require("./genero");
const db = require("./db_filmes");

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYmI0OWNmMzQzYzU2MmRmYmM4YjczMTlmMmZmMmI3NyIsInN1YiI6IjY0Yzk4MWE5MDAxYmJkMDEyNmE3MjAxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZqK6DNET911i81ING_Q6emqC5yGF_TYDy_4Uc1YDGnY",
    },
};

(async () => {
    const listIdByPopularPeople = [];
    const list = [];
    try {
        await db.sync();
        console.log("database conneted successfully");
        try {
            for (let index = 1; index <= 20; index++) {
                const { data } = await axios.get(
                    `https://api.themoviedb.org/3/person/popular?language=pt-BR&page=${index}`,
                    options
                );
                data["results"].forEach((row) =>
                    row["known_for"].forEach(
                        (film) => film.media_type === "movie" && listIdByPopularPeople.push(film.id)
                    )
                );
                // console.log(x[1]);
                // await filme.create(obj);
                // genero_filme.setGenero_filme();
                // console.log(`${obj.titulo} inserido`);
                console.log(`Page ${index}`);
            }

            for (let index = 0; index < listIdByPopularPeople.length; index++) {
                await sleep(300);
                const { data } = await axios.get(
                    `https://api.themoviedb.org/3/movie/${listIdByPopularPeople[index]}?language=pt-BR`,
                    options
                );
                list.push(data.original_title);

                // const obj = {
                //     titulo: data.title,
                //     tmdbId: data.id,
                //     descricao: data.overview,
                //     lancamento: new Date(data.release_date),
                //     nota: data.vote_average,
                //     titulo_orig: data.original_title,
                //     popularidade: 81.495,
                //     imdb_id: data.imdb_id,
                //     poster: data.poster_path,
                //     backdrop: data.backdrop_path,
                //     JSON: data,
                // };

                console.log(`${data.original_title} - ${list.length} de ${listIdByPopularPeople.length}`);
            }
        } catch (err) {
            console.log("err");
        } finally {
            console.log("list", list);
            console.log("list", list.length);
        }
    } catch (err) {
        throw err;
    }
})();

// (async () => {
//     try {
//         await db.sync();
//         console.log("database connected successfull");
//         try {
//             const { data } = await axios.get("https://api.themoviedb.org/3/genre/movie/list?language=pt", options);
//             const { genres } = data;
//             genres.forEach(async (genre) => {
//                 try {
//                     await genero.create({ ...genre, nome: genre.name });
//                     console.log(`${genre.name} adicionado ao banco`);
//                 } catch (err) {
//                     console.log(`Erro ao adicionar: ${err}`);
//                 }
//             });
//         } catch (err) {
//             console.log(err);
//         }
//     } catch (err) {
//         console.log(`Error database: ${err}`);
//     }
// })();
