const moment = require("moment");
let dateStat = "2022-03-29";
dateStat = moment(dateStat, "yyyy-MM-DD").add(14, "d").format("yyyy-MM-DD");
console.log(dateStat);
