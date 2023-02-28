const jwt = require('jsonwebtoken');

module.exports = function (req,res,next){
    const token = req.header('authorization-token');

    // console.log(token);
    // res.send(token);

    if(!token){
        return res.status(403).send('Usuário sem permissão');
    }

    // try{
    //     let tokenValidation = jwt.verify(token, process.env.TOKEN_KEY);
    //     req.user = tokenValidation;

    // }catch(err){
    //     return res.status(403).send('Usuário sem permissão');
    // }

    next();

}