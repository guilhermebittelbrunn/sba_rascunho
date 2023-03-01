const express = require('express');
const router = express.Router();
const userController = require('../controller/adminController');

router.get('/', userController, (req,res)=>{
    res.send('Área do admin');
})

router.get('/free', (req,res)=>{
    res.send('Área do usuário');
})

module.exports = router;