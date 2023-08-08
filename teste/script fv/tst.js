const moment = require('moment');
let dateStat = '2012-10-05';
dateStat = moment(dateStat, 'yyyy-MM-DD').format('yyyy-MM');
console.log(dateStat);
