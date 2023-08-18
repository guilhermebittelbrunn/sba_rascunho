const btn = document.getElementById("btn");
const img = document.getElementById("img");

async function addImage() {
    const url = "";
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYmI0OWNmMzQzYzU2MmRmYmM4YjczMTlmMmZmMmI3NyIsInN1YiI6IjY0Yzk4MWE5MDAxYmJkMDEyNmE3MjAxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZqK6DNET911i81ING_Q6emqC5yGF_TYDy_4Uc1YDGnY",
        },
    };
    fetch("http://localhost:1111/api")
        .then((res) => {
            const obj = res.json();
            console.log(obj);
            return obj;
        })
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.log(err);
        });
}

btn.addEventListener("click", addImage);
