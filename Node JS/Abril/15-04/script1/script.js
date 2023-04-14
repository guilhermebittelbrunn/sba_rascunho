const axios = require('axios');

const numeral = require('numeral');
// require('numeral/locales');
// numeral.locale('pt-br');

// FETCH POST
const json = { ok: true };

const options = {
    method: 'POST',
    headers: new Headers({ 'content-type': 'application/json' }),
    body: JSON.stringify(json),
};

fetch('Api/adicionar', options).then((res) => {
    console.log('Enviado com sucesso');
});

// AXIOS POST
const obj = { ok: true };
axios.POST('https://economia.awesomeapi.com.br/json/daily/EUR', obj).then((res) => {
    console.log('Enviado com sucesso');
});
