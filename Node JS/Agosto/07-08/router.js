const express = require('express');
const Router = express.Router();
const { Car, User } = require('./database/module/index');

Router.get('/car/create', async (req, res) => {
    const { model, year, idUser } = req.query;
    try {
        const car = await Car.create({ model, year, idUser });
        res.send(car);
    } catch (err) {
        res.send(err).status(500);
    }
});
Router.get('/car/get/:code', async (req, res) => {
    const { code } = req.params;
    try {
        const car = await Car.findByPk(code, { include: [{ model: User, attributes: ['code', 'name'] }] });
        res.send(car);
    } catch (err) {
        console.log(err);
        res.send(err).status(500);
    }
});

Router.get('/user/create', async (req, res) => {
    const { name } = req.query;
    try {
        const user = await User.create({ name });
        res.send(user);
    } catch (err) {
        res.send(err).status(500);
    }
});

Router.get('/user/:code', async (req, res) => {
    const { code } = req.params;
    try {
        const user = await User.findByPk(code, { include: [{ model: Car, attibutes: ['id, model, year'] }] });
        res.send(user);
    } catch (err) {
        console.log(err);
        res.send(err).status(500);
    }
});

module.exports = Router;
