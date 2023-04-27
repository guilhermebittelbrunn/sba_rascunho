const Product = require('../module/Products');

const controller = {
    get: async (req, res) => {
        console.log('Cheguei?');
        const { id } = req.params;
        const products = await Product.findAll({ where: { IdUser: id } });
        res.status(200).send(products);
    },
    post: async (req, res) => {
        console.log(req.body);
        try {
            await Product.create(req.body);
            return res.status(201).send({ ok: true });
        } catch (err) {
            return res.status(500).send(err);
        }
    },
};

module.exports = controller;
