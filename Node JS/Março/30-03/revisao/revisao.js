const numeral = require('numeral');

numeral.locale('pt-br');

let number = 1550.82;

console.log(numeral(number).format('1,0.000'));
