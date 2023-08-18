const axios = require("axios");
const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYmI0OWNmMzQzYzU2MmRmYmM4YjczMTlmMmZmMmI3NyIsInN1YiI6IjY0Yzk4MWE5MDAxYmJkMDEyNmE3MjAxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZqK6DNET911i81ING_Q6emqC5yGF_TYDy_4Uc1YDGnY",
    },
};

(async () => {
    const { data } = axios.get(
        "https://api.themoviedb.org/3/watch/providers/movie?language=pt-BR&watch_region=BR",
        options
    );
    console.log(data);
})();
