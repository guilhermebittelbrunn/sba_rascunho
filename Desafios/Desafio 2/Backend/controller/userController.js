const User = require('../module/Users');

const controller = {
    get: async (req, res) => {
        const user = {
            email: '123@123.com',
            password: '123',
        };
        try {
            const findUser = await User.findAll({
                where: {
                    email: user.email,
                    password: user.password,
                },
            });
            res.send(findUser);
        } catch (error) {
            return res.status(400).send(error);
        }
    },
    getAll: async (req, res) => {
        try {
            const findUser = await User.findAll({});
            res.send(findUser);
        } catch (error) {
            return res.status(400).send(error);
        }
    },

    post: async (req, res) => {
        const { email, password, name } = req.body;
        console.log(email, password, name);
        try {
            const findUser = await User.findAll({ where: { email: email } });
            console.log(findUser);
            if (findUser.length) {
                return res.status(400).send('E-mail already in use');
            }
            await User.create({ email, password, name });
            res.status(203).send(`${name} created`);
        } catch (error) {
            return res.status(400).send(error);
        }
    },

    postLogin: async (req, res) => {
        const { email, password } = req.body;

        try {
            const findUser = await User.findAll({ where: { email, password } });
            console.log(findUser);
            if (findUser[0].id) {
                return res.status(200).send({ logged: true, user: findUser });
            }
            return res.status(400).send({ logged: false });
        } catch (error) {
            return res.status(400).send(error);
        }
    },
};

module.exports = controller;
