// //2018-02-06

require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const moment = require('moment');
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
const { Movie, Genre, Streaming } = require('./database/modules/index');
const { Op } = require('sequelize');
const sequelize = require('sequelize');
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYmI0OWNmMzQzYzU2MmRmYmM4YjczMTlmMmZmMmI3NyIsInN1YiI6IjY0Yzk4MWE5MDAxYmJkMDEyNmE3MjAxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZqK6DNET911i81ING_Q6emqC5yGF_TYDy_4Uc1YDGnY',
    },
};

// (async () => {
//     // const listIdByPopularPeople = [];
//     // const list = [];
//     // try {
//     //     await db.sync();
//     //     console.log('database conneted successfully');
//     //     try {
//     //         for (let index = 1; index <= 500; index++) {
//     //             const { data } = await axios.get(
//     //                 `https://api.themoviedb.org/3/person/popular?language=pt-BR&page=${index}`,
//     //                 options
//     //             );
//     //             data['results'].forEach((row) =>
//     //                 row['known_for'].forEach(
//     //                     (film) => film.media_type === 'movie' && listIdByPopularPeople.push(film.id)
//     //                 )
//     //             );
//     //             // console.log(x[1]);
//     //             // await filme.create(obj);
//     //             // genero_filme.setGenero_filme();
//     //             // console.log(`${obj.titulo} inserido`);
//     //             console.log(`Page ${index}`);
//     //         }
//     //         console.log('1', listIdByPopularPeople.length);
//     //         const filtedList = [...new Set(listIdByPopularPeople)];
//     //         console.log('2', filtedList.length);
//     //         // for (let index = 0; index < listIdByPopularPeople.length; index++) {
//     //         //     await sleep(1000);
//     //         //     const { data } = await axios.get(
//     //         //         `https://api.themoviedb.org/3/movie/${listIdByPopularPeople[index]}?language=pt-BR`,
//     //         //         options
//     //         //     );
//     //         //     list.push(data.original_title);
//     //         //     // const obj = {
//     //         //     //     titulo: data.title,
//     //         //     //     tmdbId: data.id,
//     //         //     //     descricao: data.overview,
//     //         //     //     lancamento: new Date(data.release_date),
//     //         //     //     nota: data.vote_average,
//     //         //     //     titulo_orig: data.original_title,
//     //         //     //     popularidade: 81.495,
//     //         //     //     imdb_id: data.imdb_id,
//     //         //     //     poster: data.poster_path,
//     //         //     //     backdrop: data.backdrop_path,
//     //         //     //     JSON: data,
//     //         //     // };
//     //         //     console.log(`${data.original_title} - ${list.length} de ${listIdByPopularPeople.length}`);
//     //         // }
//     //     } catch (err) {
//     //         console.log('err');
//     //     } finally {
//     //         console.log('list', list);
//     //         console.log('list', list.length);
//     //     }
//     // } catch (err) {
//     //     throw err;
//     // }
// })();

// //ADICIONA GENERO

(async () => {
    // try {
    //     // await db.sync();
    //     // console.log("database connected successfull");
    //     try {
    //         const { data } = await axios.get("https://api.themoviedb.org/3/genre/movie/list?language=pt", options);
    //         const { genres } = data;
    //         genres.forEach(async (genre) => {
    //             try {
    //                 await Genre.create({ ...genre, nome: genre.name });
    //                 console.log(`${genre.name} adicionado ao banco`);
    //             } catch (err) {
    //                 console.log(`Erro ao adicionar: ${err}`);
    //             }
    //         });
    //     } catch (err) {
    //         console.log(err);
    //     }
    // } catch (err) {
    //     console.log(`Error database: ${err}`);
    // }
})();

// // (async () => {
// //     let numberRegisters = 0;
// //     let textW = fs.createWriteStream('./ids.txt');
// //     let logs = fs.createWriteStream('./logs.txt');
// //     let dateStat = '2022-03-29';
// //     let dateEnd = moment(dateStat, 'yyyy-MM-DD').add(14, 'd').format('yyyy-MM-DD');
// //     console.log(`Start process with dates: ${dateStat} - ${dateEnd}`);
// //     try {
// //         while (moment(dateEnd, 'yyyy-MM-DD').format('yyyy-MM') != '2023-08') {
// //             const { data } = await axios.get(
// //                 `https://api.themoviedb.org/3/movie/changes?end_date=${dateEnd}&page=1&start_date=${dateStat}`,
// //                 options
// //             );
// //             // console.log(data);
// //             const { total_pages } = data;
// //             for (let i = 1; i < total_pages; i++) {
// //                 const res = await axios.get(
// //                     `https://api.themoviedb.org/3/movie/changes?end_date=${dateEnd}&page=${i}&start_date=${dateStat}`,
// //                     options
// //                 );
// //                 res['data']['results'].forEach((id) => {
// //                     textW.write(`"${id.id}",\n`);
// //                     numberRegisters++;
// //                 });
// //             }
// //             dateStat = moment(dateStat, 'yyyy-MM-DD').add(14, 'd').format('yyyy-MM-DD');
// //             dateEnd = moment(dateEnd, 'yyyy-MM-DD').add(14, 'd').format('yyyy-MM-DD');
// //             console.log(`Current date: ${dateStat}, list length: ${numberRegisters}`);
// //         }
// //     } catch (err) {
// //         console.log('err');
// //         logs.write(JSON.stringify(err));
// //     } finally {
// //         console.log(`end application, ds ${dateStat} - df ${dateEnd}`);
// //     }
// // })();

// //ADICIONA FILME
let count = 0;
let countPlat = 0;
(async () => {
    // await Movie.drop();
    fs.readFile('./ids/main.txt', 'utf-8', async (err, info) => {
        if (err) throw err;
        const dataset = JSON.parse(info);
        let list = [];
        for (let element of dataset) {
            list.push(`https://api.themoviedb.org/3/movie/${element}?language=pt-BR`);
            if (list.length === 100) {
                //métodos
                const allResponse = await axios.all(
                    list.map(async (endpoint) => {
                        try {
                            const res = await axios.get(endpoint, options);
                            return res.data;
                        } catch (err) {
                            fs.appendFileSync(
                                './logs.txt',
                                `${JSON.stringify({ path: err.request.path, status: err.response?.status })}, \n`
                            );
                            return false;
                        }
                    })
                );

                for (let objt of allResponse) {
                    if (typeof objt === 'object') {
                        if (objt['genres'].length > 0) {
                            // console.log(objt.title);
                            const newMovie = await Movie.create({
                                title: objt.title,
                                sinopse: objt.overview,
                                duration: objt.runtime,
                                original_title: objt.original_title,
                                vote: objt.vote_average,
                                count_votes: objt.vote_count,
                                release: objt.release_date,
                                score_popularity: objt.popularity,
                                porter_path: objt.poster_path,
                                backdrop_path: objt.backdrop_path,
                                adult: objt.adult,
                                idAPI: objt.id,
                                json: objt,
                            });

                            if (objt.overview) {
                                const res = await axios.get(
                                    `https://api.themoviedb.org/3/movie/${objt.id}/watch/providers`,
                                    options
                                );
                                if (res.data.results.BR) {
                                    if (res.data.results.BR.flatrate) {
                                        const listProviders = res.data.results.BR.flatrate.map((provider) => {
                                            return provider.provider_id;
                                        });

                                        const listStreamings = await Streaming.findAll({
                                            // raw: true,
                                            where: {
                                                id: {
                                                    [Op.in]: listProviders,
                                                },
                                            },
                                        });

                                        if (listStreamings.length > 0) {
                                            countPlat++;
                                            listStreamings.forEach(async (item) => {
                                                await newMovie.setStreamings([item]);
                                            });
                                        }
                                    }
                                }
                            }

                            objt['genres'].forEach(async (genre) => {
                                const newGenre = await Genre.findByPk(genre.id);
                                await newMovie.setGenres([newGenre]);
                                // console.log(`${objt.title} - ${newGenre.dataValues.id} - ${genre.id}`);
                            });
                            count++;
                        }
                    }
                }
                list = [];

                console.log(
                    `Index ${dataset.indexOf(element)}, ${count} items inseridos, ${
                        dataset.length
                    } total, ${countPlat} possuem plataforma`
                );
                await sleep(7000);
            }
        }
    });
})();

// // (async () => {
// //     const { data } = await axios.get('https://api.themoviedb.org/3/genre/tv/list?language=pt', options);
// //     let genres = await Genre.findAll({ attributes: ['id'], raw: true });
// //     genres = genres.map((genre) => genre.id);
// //     console.log(genres);
// //     data['genres'].map(async (genre) => {
// //         const index = genres.indexOf(genre.id);
// //         // index > 0 && (await Genre.create(genre));
// //         index < 0 && (await Genre.create(genre));
// //     });
// // })();

// // async function fecthData(id) {
// //     try {
// //         const data = await axios.get(`https://api.themoviedb.org/3/movie/${id}?language=pt-BR`, options);
// //         return data.status;
// //     } catch (err) {
// //         return err.response.status;
// //     }
// // }

// // (async () => {
// //     fs.readFile('./ids/teste.txt', 'utf-8', async (err, info) => {
// //         if (err) throw err;
// //         const requests = JSON.parse(info);
// //         const list = [];
// //         // // for (let request of requests) {
// //         // //     const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${request}?language=pt-BR`, options);
// //         // //     list.push(data.title);
// //         // // }
// //         const allDatas = await axios.all(
// //             requests.map(async (api) => {
// //                 try {
// //                     const res = await axios.get(`https://api.themoviedb.org/3/movie/${api}?language=pt-BR`, options);
// //                     return res.data.title;
// //                 } catch (err) {
// //                     if (err.response.status === 404) {
// //                         return 404;
// //                     }
// //                     return api;
// //                 }
// //             })
// //         );
// //         // const arr = [11, 12, 4, 13];
// //         // for (let item of arr) {
// //         //     console.log(await fecthData(item));
// //         // }
// //         const clean = allDatas.filter((data) => data);
// //         console.log(allDatas);
// //     });
// // })();

// //ADICIONA STREAMING
(async () => {
    // const listProviders = [119, 8, 337, 619, 167, 531, 384, 2, 307, 283, 10, 3, 68, 512, 478, 574, 300];
    // let sum = 0;
    // axios
    //     .get("https://api.themoviedb.org/3/watch/providers/movie?language=pt-BR&watch_region=BR", options)
    //     .then((res) => {
    //         return res.data;
    //     })
    //     .then((data) => {
    //         data.results.forEach((result) => {
    //             const obj = {
    //                 id: result.provider_id,
    //                 name: result.provider_name,
    //                 icon_path: result.provider_name.trim().replace(" ", "_"),
    //                 json: result,
    //             };
    //             // const index = listProviders.indexOf((provider) => {
    //             //     return provider == 8;
    //             // });
    //             const index = listProviders.findIndex((item) => item === obj.id);
    //             // console.log(obj.id);
    //             if (index > 0) {
    //                 Streaming.create(obj).then((res) => {
    //                     console.log(obj.name, " adicionado com sucesso");
    //                 });
    //                 sum++;
    //             }
    //         });
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })
    //     .finally(() => {
    //         console.log(sum);
    //     });
    // await Streaming.destroy({ where: { id: 307 } });
})();

//ADICIONA FILME PLATAFORMA
// (async () => {
//     try {
//         const idFilme = 13;
//         const res = await axios.get(`https://api.themoviedb.org/3/movie/${idFilme}?language=pt-BR`, options);
//         const objt = res.data;
//         const newMovie = await Movie.create({
//             title: objt.title,
//             sinopse: objt.overview,
//             duration: objt.runtime,
//             original_title: objt.original_title,
//             vote: objt.vote_average,
//             count_votes: objt.vote_count,
//             release: objt.release_date,
//             score_popularity: objt.popularity,
//             porter_path: objt.poster_path,
//             backdrop_path: objt.backdrop_path,
//             adult: objt.adult,
//             idAPI: 11,
//             json: objt,
//         });
//         const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${idFilme}/watch/providers`, options);
//         if (data.results.BR.flatrate) {
//             const listProviders = data.results.BR.flatrate.map((provider) => {
//                 return provider.provider_id;
//             });
//             const listStreamings = await Streaming.findAll({
//                 // raw: true,
//                 where: {
//                     id: {
//                         [Op.in]: listProviders,
//                     },
//                 },
//             });

//             if (listStreamings.length > 0) {
//                 listStreamings.forEach(async (item) => {
//                     await newMovie.setStreamings([item]);
//                 });
//             }
//         }
//     } catch (error) {
//         console.log(error);
//     }
// })();
