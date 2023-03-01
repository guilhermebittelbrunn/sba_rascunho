const jwt = require('jsonwebtoken');

module.exports = function(req,res,next){

    const token = req.header('authorization-token');

    console.log(token);

    if(!token){
        res.status(403).send('Usuário sem permissão');
    }

    next();
}