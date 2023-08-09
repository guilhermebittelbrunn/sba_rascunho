const moment = require('moment');
let dateStat = '2021-04-27';
dateStat = moment(dateStat, 'yyyy-MM-DD').add(14, 'd').format('yyyy-MM-DD');
console.log(dateStat);
