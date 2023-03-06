const mongoose = require('mongoose');


const notice_schema = mongoose.Schema({
    title: {type: String, required:true},
    description: {type: String, required: true, minLenght: 10, maxLenght:300},
    creatAt: {type: Date, default: Date.now}
})

const Notice = mongoose.model('notices', notice_schema);


module.exports = Notice;