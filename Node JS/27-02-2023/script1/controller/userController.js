const User = require('../module/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {

    register: async function (req,res){

        const newUser = await User.findOne({email: req.body.email});
        if(newUser){
            return res.status(400).send(`E-mail: ${req.body.email} já está em uso`);
        }
        const user = new User({
            nome: req.body.nome,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password)
        })
        try{
            await user.save();
            res.render('index', {titulo: 'Bem-vindo!'})
        }catch(err){
            res.send(err);
        }
    },

    login: async function(req,res){
        const login = await User.findOne({email: req.body.email});
        if(!login){
            return res.status(400).send('E-mail ou senha inválido');
        }else{
            let SenhaEmailMatch = bcrypt.compareSync(req.body.password, login.password);
            if(!SenhaEmailMatch){
                return res.status(400).send('E-mail ou senha inválido');
            }

            const token = jwt.sign({_id: login._id, email: login.email, admin: login.admin}, process.env.TOKEN_KEY, {expiresIn: 8000});

            console.log(token);
            res.header('authoriztion-token', token);
            console.log(req.header);
            res.render('index', {titulo: `Seja bem-vindo ${login.nome}!!`});
        }
    },

    registerPage: function(req,res){
        res.render('register');
    },
    
    loginPage: function(req,res){
        res.render('login');
    },

    indexPage: function(req,res){
        res.render('index', {titulo: 'Bem-vindo!'});   
    }
}