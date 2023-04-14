const axios = require('axios');

const numeral = require('numeral');
// require('numeral/locales');
// numeral.locale('pt-br');

axios.get('https://economia.awesomeapi.com.br/json/daily/USD').then((res) => {
    console.log(res.data[0].ask);
});
