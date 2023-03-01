const User = require('../module/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validate = require('./validate');

module.exports = {

    registerUser: async (req,res)=>{

        const {error} = validate.registerValidate(req.body);

        if(error){
            return res.status(400).send(error.message)
        }

        let emailVerification = await User.findOne({email: req.body.email})
        if(emailVerification){
            return res.status(400).send('E-mail já em uso');
        }
        const salt = 10;
        let passwordCrypt = bcrypt.hashSync(req.body.password, salt);

        let user = new User({
            nome: req.body.nome,
            email: req.body.email,
            password: passwordCrypt
        })
        try{
            await user.save();
            res.send('Usuário adicionado com sucesso');
            // res.redirect('http://localhost:4000/user');
        }catch(err){
            console.log(err);
        }
    },

    loginUser: async (req,res)=>{

        const {error} = validate.loginValidate(req.body);

        if(error){
            return res.status(400).send(error.message)
        }

        let userVerification = await User.findOne({email: req.body.email})

        if(!userVerification){
            return res.status(400).send('E-mail e/ou senha incorretos');
        }

        let comparePassword = bcrypt.compareSync(req.body.password, userVerification.password);
        if(comparePassword == false){
            return res.status(400).send('E-mail e/ou senha incorretos');
        }else{

            let token = jwt.sign({_id: userVerification._id, nome: userVerification.nome, email: userVerification.email, admin: userVerification.admin}, process.env.TOKEN_KEY);
            res.header('authorization-token', token);
            res.send('usuário logado');
        }

    },

    indexPage: (req,res)=>{
        res.render('index')
    },

    loginPage: (req,res)=>{
        res.render('login')
    },

    registerPage: (req,res)=>{
        res.render('register')
    },
    


}


