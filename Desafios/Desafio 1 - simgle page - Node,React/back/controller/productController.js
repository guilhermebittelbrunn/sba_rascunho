const Product = require('../module/Product');

const controller = {
    showProducts: async (req, res) => {
        const listProducts = await Product.findAll();
        res.send(listProducts);
    },
    createProduct: async (req, res) => {
        const { title, description, price, collection } = req.body;
        await Product.create({
            title,
            description,
            price,
            collection,
        });

        res.redirect('/product');
    },
};

module.exports = controller;
