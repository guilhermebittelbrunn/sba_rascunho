const User = require('../module/User');
const bcrypt = require('bcryptjs');

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
            let saveUser = await user.save();
            res.send(saveUser);
        }catch(err){
            console.log(err);
        }
    },
    login: async function(req,res){
        const login = await User.findOne({email: req.body.email});
        if(!login){
            res.status(400).send('E-mail ou senha inválido');
        }else{
            let SenhaEmailMatch = bcrypt.compareSync(req.body.password == login.password);
            if(!SenhaEmailMatch){
                return res.status(400).send('E-mail ou senha inválido');
            }
            res.send(`Bem-vindo ${login.nome}`);
        }
    },

    registerPage: function(req,res){
        res.render('register');
    },
    
    loginPage: function(req,res){
        res.render('login');
    }
}