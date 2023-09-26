const numeral = require('numeral');

const x = 5053.46;

console.log(numeral(x).format(0.0).replace(',', '.'));
