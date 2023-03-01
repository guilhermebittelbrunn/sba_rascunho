const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.get('/', userController.indexPage);
router.get('/register', userController.registerPage);
router.get('/login', userController.loginPage);

router.post('/register', express.urlencoded({extended:true}), userController.registerUser);
router.post('/login', express.urlencoded({extended:true}), userController.loginUser);

module.exports = router;