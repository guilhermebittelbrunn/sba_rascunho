const Animal = require('../module/animal');
const Consulta = require('../module/Consulta');
const Veterinario = require('../module/veterinario');
const ejs = require('ejs');

module.exports = {
    true: (req, res) => {
        res.send({ ok: true });
    },
    false: (req, res) => {
        res.send({ ok: false });
    },
    createAni: async (req, res) => {
        await Animal.create({
            nome: 'Douglas',
            especie: 'vira-lata',
        });
        res.status(200).send('Animal adicionado!');
    },
    createVet: async (req, res) => {
        await Veterinario.create({
            nome: 'Ricardo',
            cpf: '123456789',
        });
        res.status(200).send('Veterinario adicionado');
    },
    createCon: async (req, res) => {
        await Consulta.create({
            animalId: 1,
            veterinarioId: 1,
        });
        res.status(200).send('Consulta criada');
    },
    ejs: (req, res) => {
        res.render('../Views/index.ejs');
    },
};
