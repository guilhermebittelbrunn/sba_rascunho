const joi = require('@hapi/joi');


module.exports = {

    registerValidate: (data) => {
        const schema = joi.object({
            nome: joi.string().required().min(3),
            email: joi.string().required().min(10).max(40),
            password: joi.string().required().min(6).max(30)
        })
        return schema.validate(data);
    },

    loginValidate: (data) => {
        const schema = joi.object({
            email: joi.string().required().min(10),
            password: joi.string().required().min(6).max(30)
        })
        return schema.validate(data);
    }

}


