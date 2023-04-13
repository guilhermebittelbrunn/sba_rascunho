const Product = require('../module/Product');

const controller = {
    show: async (req, res) => {
        const listProducts = await Product.findAll();
        res.send(listProducts);
    },
    create: async (req, res) => {
        const { title, description, price, collection } = req.body;
        await Product.create({ title, description, price, collection });
        res.status(200).send(true);
    },
    delete: async (req, res) => {
        const { id } = req.params;
        try {
            Product.destroy({
                where: {
                    id: id,
                },
            });
            res.status(200).send(true);
        } catch (err) {
            return res.status(500).send(err);
        }
    },
    edit: async (req, res) => {
        const { title, description, price, collection } = req.body;
        await Product.update({ title, description, price, collection }, { where: { id: req.body.id } });
        res.status(200).send(true);
    },
};

module.exports = controller;
