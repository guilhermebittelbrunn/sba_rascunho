//2018-02-06

require("dotenv").config();
const axios = require("axios");
const fs = require("fs");
const moment = require("moment");
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
    // const listIdByPopularPeople = [];
    // const list = [];
    // try {
    //     await db.sync();
    //     console.log('database conneted successfully');
    //     try {
    //         for (let index = 1; index <= 500; index++) {
    //             const { data } = await axios.get(
    //                 `https://api.themoviedb.org/3/person/popular?language=pt-BR&page=${index}`,
    //                 options
    //             );
    //             data['results'].forEach((row) =>
    //                 row['known_for'].forEach(
    //                     (film) => film.media_type === 'movie' && listIdByPopularPeople.push(film.id)
    //                 )
    //             );
    //             // console.log(x[1]);
    //             // await filme.create(obj);
    //             // genero_filme.setGenero_filme();
    //             // console.log(`${obj.titulo} inserido`);
    //             console.log(`Page ${index}`);
    //         }
    //         console.log('1', listIdByPopularPeople.length);
    //         const filtedList = [...new Set(listIdByPopularPeople)];
    //         console.log('2', filtedList.length);
    //         // for (let index = 0; index < listIdByPopularPeople.length; index++) {
    //         //     await sleep(1000);
    //         //     const { data } = await axios.get(
    //         //         `https://api.themoviedb.org/3/movie/${listIdByPopularPeople[index]}?language=pt-BR`,
    //         //         options
    //         //     );
    //         //     list.push(data.original_title);
    //         //     // const obj = {
    //         //     //     titulo: data.title,
    //         //     //     tmdbId: data.id,
    //         //     //     descricao: data.overview,
    //         //     //     lancamento: new Date(data.release_date),
    //         //     //     nota: data.vote_average,
    //         //     //     titulo_orig: data.original_title,
    //         //     //     popularidade: 81.495,
    //         //     //     imdb_id: data.imdb_id,
    //         //     //     poster: data.poster_path,
    //         //     //     backdrop: data.backdrop_path,
    //         //     //     JSON: data,
    //         //     // };
    //         //     console.log(`${data.original_title} - ${list.length} de ${listIdByPopularPeople.length}`);
    //         // }
    //     } catch (err) {
    //         console.log('err');
    //     } finally {
    //         console.log('list', list);
    //         console.log('list', list.length);
    //     }
    // } catch (err) {
    //     throw err;
    // }
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

// (async () => {
//     let numberRegisters = 0;
//     let textW = fs.createWriteStream("./ids.txt");
//     let logs = fs.createWriteStream("./logs.txt");
//     let dateStat = "2022-03-29";
//     let dateEnd = "2022-04-12";
//     try {
//         while (moment(dateEnd, "yyyy-MM-DD").format("yyyy-MM") != "2023-08") {
//             const { data } = await axios.get(
//                 `https://api.themoviedb.org/3/movie/changes?end_date=${dateEnd}&page=1&start_date=${dateStat}`,
//                 options
//             );
//             // console.log(data);
//             const { total_pages } = data;
//             for (let i = 1; i < total_pages; i++) {
//                 const res = await axios.get(
//                     `https://api.themoviedb.org/3/movie/changes?end_date=${dateEnd}&page=${i}&start_date=${dateStat}`,
//                     options
//                 );
//                 res["data"]["results"].forEach((id) => {
//                     textW.write(`"${id.id}",\n`);
//                     numberRegisters++;
//                 });
//             }
//             dateStat = moment(dateStat, "yyyy-MM-DD").add(14, "d").format("yyyy-MM-DD");
//             dateEnd = moment(dateEnd, "yyyy-MM-DD").add(14, "d").format("yyyy-MM-DD");
//             console.log(`Current date: ${dateStat}, list length: ${numberRegisters}`);
//         }
//     } catch (err) {
//         console.log("err");
//         logs.write(JSON.stringify(err));
//     } finally {
//         console.log(`end application, ds ${dateStat} - df ${dateEnd}`);
//     }
// })();

const { Movie, Genre } = require("./database/modules/index");
// (async () => {
//     fs.createReadStream("./ids.txt")
//         .on("data", async (info) => {
//             await sleep(1000);
//             const { data } = axios.get(`https://api.themoviedb.org/3/movie/${info}?language=pt-BR`, options);
//             const obj = {
//                 title: data.title,
//                 sinopse: data.overview,
//                 original_title: data.original_title,
//                 vote: data.vote_average,
//                 count_votes: vote_count,
//                 release: data.release_date,
//                 score_popularity: data.popularity,
//                 porter_path: data.porter_path,
//                 backdrop_path: data.backdrop_path,
//                 adult: data.adult,
//                 json: data,
//             };
//             const newMovie = await Movie.create(obj);
//             data["genres"].forEach(async (genre) => {
//                 const newGenre = await findByPk(genre.id, { raw: true });
//                 newMovie.setGenres([newGenre]);
//             });
//         })
//         .on("err", (err) => {
//             console.log(`err to read file: ${err}`);
//         })
//         .on("end", () => {
//             console.log("end application");
//         });
// })();

(async () => {
    const { data } = await axios.get("https://api.themoviedb.org/3/genre/movie/list?language=pt", options);
    data["genres"].forEach(async (genre) => {
        await Genre.create(genre);
    });
})();
