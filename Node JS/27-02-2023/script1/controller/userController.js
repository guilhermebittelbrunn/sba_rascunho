const User = require('../module/User');

module.exports = {

    register: async function (req,res){

        const user = new User({
            nome: req.body.nome,
            email: req.body.email,
            password: req.body.password
        })
        try{
            let saveUser = await user.save();
            res.send(saveUser);
        }catch(err){
            console.log(err);
        }
    },
    login: function(req,res){
        res.send('login')
    },

    registerPage: function(req,res){
        res.render('register');
    },
    
    loginPage: function(req,res){
        res.render('login');
    }
}