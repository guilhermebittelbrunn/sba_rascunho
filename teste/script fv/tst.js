const axios = require("axios");

const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYmI0OWNmMzQzYzU2MmRmYmM4YjczMTlmMmZmMmI3NyIsInN1YiI6IjY0Yzk4MWE5MDAxYmJkMDEyNmE3MjAxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZqK6DNET911i81ING_Q6emqC5yGF_TYDy_4Uc1YDGnY",
    },
};

// // axios
// //     .get("https://api.themoviedb.org/3/movie/11/watch/providers", options)
// //     .then((res) => {
// //         return res.data;
// //     })
// //     .then((data) => {
// //         console.log(data.results.BR || "false");
// //     })
// //     .catch((err) => {
// //         console.log(err);
// //     });

// const axios = require("axios");
// const cors = require("cors");
// const url = "https://image.tmdb.org/t/p/w200/esfuWSTkFr39ETpD9xvb0sduZt7.jpg";
// const options = {
//     method: "GET",
//     headers: {
//         accept: "application/json",
//         Authorization:
//             "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYmI0OWNmMzQzYzU2MmRmYmM4YjczMTlmMmZmMmI3NyIsInN1YiI6IjY0Yzk4MWE5MDAxYmJkMDEyNmE3MjAxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZqK6DNET911i81ING_Q6emqC5yGF_TYDy_4Uc1YDGnY",
//     },
// };

// (async () => {})();

// const express = require("express");
// const app = express();
// const sharp = require("sharp");
// const path = require("path");

// app.use(cors());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // app.use("*", express.use(path.join(__dirname)));
// app.get("/api", async (req, res) => {
//     const { data } = await axios.get(url, options);
//     res.send(toString(data));
//     // const buffer = Buffer.from(data, "binary");
//     // sharp(buffer).toFile("./imageteste.jpg", (err) => {
//     //     if (err) return console.log(err);
//     //     console.log(1);
//     // });
//     // res.send(buffer);
// });

// app.listen(1111, (err) => {
//     if (err) throw err;
//     console.log("on");
// });

const { Streaming } = require("./database/modules/index");

(async () => {
    const data = await Streaming.findAll({ raw: true });
    data.forEach((s) => {
        const json = JSON.parse(s.json);
        console.log(`Nome: ${s.icon_path}, path: https://image.tmdb.org/t/p/w200/${json.logo_path}`);
    });
})();
