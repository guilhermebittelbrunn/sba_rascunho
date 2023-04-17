const axios = require('axios');

// const moeda = axios.get('https://economia.awesomeapi.com.br/json/last/USD').then((res) => {
//     return res.data;
// });

// console.log(moeda);
let moeda = 0;

async function buscarValor() {
    // const apiData = await fetch('https://economia.awesomeapi.com.br/json/last/USD');
    // const dataJson = await apiData.json();

    await fetch('https://economia.awesomeapi.com.br/json/last/USD')
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            moeda = data;
        });

    console.log(moeda);
}

(async () => {
    await buscarValor();
    console.log(moeda);
})();
