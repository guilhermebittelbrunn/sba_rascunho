// // const moment = require("moment");
// // let dateStat = "2022-03-29";
// // dateStat = moment(dateStat, "yyyy-MM-DD").add(14, "d").format("yyyy-MM-DD");
// // console.log(dateStat);

const axios = require("axios");

const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYmI0OWNmMzQzYzU2MmRmYmM4YjczMTlmMmZmMmI3NyIsInN1YiI6IjY0Yzk4MWE5MDAxYmJkMDEyNmE3MjAxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZqK6DNET911i81ING_Q6emqC5yGF_TYDy_4Uc1YDGnY",
    },
};

axios
    .get("https://api.themoviedb.org/3/movie/11/watch/providers", options)
    .then((res) => {
        return res.data;
    })
    .then((data) => {
        console.log(data.results.BR || "false");
    })
    .catch((err) => {
        console.log(err);
    });

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

// function sleep(ms) {
//     return new Promise((resolve) => setTimeout(resolve, ms));
// }

// const list = [10, 20, 30, 40, 50, 60];

// // list.map(async (element) => {
// //     console.log(element);
// //     await sleep(2000);
// // });

// (async () => {
//     for (let element of list) {
//         console.log(element);
//         await sleep(2000);
//     }
// })();
