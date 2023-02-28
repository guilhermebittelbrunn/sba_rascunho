const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    nome: {type: String, required:true},
    email: {type: String, required:true},
    password: {type: String, required:true},
    cratedAt: {type: Date, default: Date.now},
    admin: {type: Boolean, default: false}
})

module.exports = mongoose.model('User', userSchema);