// // const moment = require("moment");
// // let dateStat = "2022-03-29";
// // dateStat = moment(dateStat, "yyyy-MM-DD").add(14, "d").format("yyyy-MM-DD");
// // console.log(dateStat);

// const axios = require('axios');

// const options = {
//     method: 'GET',
//     headers: {
//         accept: 'application/json',
//         Authorization:
//             'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYmI0OWNmMzQzYzU2MmRmYmM4YjczMTlmMmZmMmI3NyIsInN1YiI6IjY0Yzk4MWE5MDAxYmJkMDEyNmE3MjAxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZqK6DNET911i81ING_Q6emqC5yGF_TYDy_4Uc1YDGnY',
//     },
// };

// axios
//     .get('https://image.tmdb.org/t/p/w500/zqkmTXzjkAgXmEWLRsY4UpTWCeo.jpg', options)
//     .then((res) => {
//         return res.data;
//     })
//     .then((data) => {
//         console.log(data);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

// const dataset = [];
// let list = [];

// dataset[400] = 1;

// for (let element of dataset) {
//     list.push(element);
//     if (list.length === 50) {
//         //métodos
//         console.log(1);
//         list = [];
//     }
// }

const fs = require('fs');

fs.appendFileSync('./logs.txt', '{ok:true}');
