const express = require('express');
const router = express.Router();
const controller = require('../controller/userController');

router.get('/', (req,res)=>{
    res.render('index');
})
router.get('/register', controller.registerPage);
router.get('/login', controller.loginPage);

router.post('/register',express.urlencoded({extended:true}) ,controller.register);
router.post('/login', controller.login);

module.exports = router;