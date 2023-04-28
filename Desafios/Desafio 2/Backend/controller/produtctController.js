const Product = require('../module/Products');

const controller = {
    get: async (req, res) => {
        const { id } = req.params;
        const products = await Product.findAll({ where: { IdUser: id } });
        res.status(200).send(products);
    },
    post: async (req, res) => {
        try {
            await Product.create(req.body);
            return res.status(201).send({ ok: true });
        } catch (err) {
            return res.status(500).send(err);
        }
    },
    delete: async (req, res) => {
        const { id } = req.params;
        try {
            await Product.destroy({ where: { id: id } });
            return res.status(200).send('Product deleted');
        } catch (err) {
            return res.status(400).send('Product not found');
        }
    },
    put: async (req, res) => {
        const { body } = req;
        try {
            await Product.update(
                { title: body.title, description: body.description, collection: body.collection },
                { where: { id: body.id } }
            );
            return res.status(200).send(true);
        } catch (err) {
            return res.status(400).send(err);
        }
    },
};

module.exports = controller;
