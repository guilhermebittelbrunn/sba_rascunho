const express = require('express');
const Router = express.Router();
const auth = require('../controller/authController');

Router.get('/', auth,(req,res)=>{
    
    res.send('bem vindo admin');

})

Router.get('/free', (req,res)=>{
    res.send('bem vindo usuário');
})

module.exports = Router;