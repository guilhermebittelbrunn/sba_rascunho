const express = require('express');
const path = require('path');

const productRounter = require('./router/productApi');
const db = require('./db/database');
const Product = require('./module/Product');

const app = express();
const PORT = 4000;
const cors = require('cors');

(async () => {
    try {
        await db.sync();
        console.log('database connect with successfully!');
        app.use(cors());
        app.use('/product', productRounter);
        app.use(express.static(path.join(__dirname, '../front/public/index.html')));
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../front/public/index.html'));
        });

        app.listen(PORT, (err) => {
            if (err) return console.log(err);
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        return console.log(err);
    }
})();
